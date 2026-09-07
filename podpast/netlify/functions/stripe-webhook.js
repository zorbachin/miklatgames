// Stripe → entitlement. Verifies the signature, then upserts the profile row.
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

exports.handler = async (event) => {
  let ev;
  try {
    ev = stripe.webhooks.constructEvent(event.body, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) { return { statusCode: 400, body: 'bad signature' }; }

  const o = ev.data.object;
  const upsert = async (row) => { const { error } = await db.from('profiles').upsert({ ...row, updated_at: new Date().toISOString() }); if (error) throw error; };

  try {
    switch (ev.type) {
      case 'checkout.session.completed': {
        // client_reference_id carries the Supabase user id; the subscription state arrives in the next event
        await upsert({ user_id: o.client_reference_id, email: o.customer_details?.email, stripe_customer: o.customer, status: 'trialing' });
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const { data } = await db.from('profiles').select('user_id').eq('stripe_customer', o.customer).single();
        if (data) await upsert({ user_id: data.user_id, status: o.status, period_end: new Date(o.current_period_end * 1000).toISOString() });
        break;
      }
      case 'invoice.paid': {
        // new billing period: reset the live-minutes meter
        const { data } = await db.from('profiles').select('user_id').eq('stripe_customer', o.customer).single();
        if (data) await upsert({ user_id: data.user_id, status: 'active', minutes_used: 0 });
        break;
      }
    }
    return { statusCode: 200, body: 'ok' };
  } catch (e) { return { statusCode: 500, body: e.message }; }
};
