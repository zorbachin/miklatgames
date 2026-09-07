# Podpast Plus — the seam between the free game and the paid conversation

Two Netlify Functions and one client module. Everything else is hosted services.

```
browser (index.html)                 Netlify Functions (podpast.dev)         Hosted
────────────────────                 ───────────────────────────────         ──────
Supabase magic-link sign-in ───────────────────────────────────────────────▶ Supabase Auth
"Start free trial" ─────▶ Stripe Checkout (Payment Link, client_reference_id = user id)
                                     stripe-webhook.js ◀──────────────────── Stripe (customer.subscription.*)
                                       └─ upserts profiles{user_id, stripe_customer, status, minutes_used, period_end}
"Talk to Franklin" ─────▶ agent-session.js ─┬─ verifies Supabase JWT
                                            ├─ checks profiles.status = active|trialing, minutes_used < 30
                                            └─ returns ElevenLabs signed URL for that figure's agent
browser opens the ElevenLabs Conversation over WebSocket; on end, POSTs duration → agent-session.js (action=meter)
```

## Environment (set in Netlify → Site settings → Environment)
| Key | Where from |
|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | Supabase project → Settings → API (service key stays server-side only) |
| `SUPABASE_ANON_KEY` | same page; this one ships in the client |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe → Developers → API keys / Webhooks |
| `STRIPE_PRICE_PLUS` | the $5/mo price id (create with a 7-day trial) |
| `ELEVENLABS_API_KEY` | ElevenLabs → Profile → API keys (needs Agents on the plan) |
| `ELEVENLABS_AGENT_<FIGURE>` | one agent id per figure: FRANKLIN, WASHINGTON, ABIGAIL, PHILLIS, SALOMON, TISQUANTUM (built from `../assets/agents.json`) |

## Supabase table
```sql
create table profiles (
  user_id uuid primary key references auth.users(id),
  email text,
  stripe_customer text,
  status text default 'free',          -- free | trialing | active | past_due | canceled
  minutes_used numeric default 0,
  period_end timestamptz,
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "own row" on profiles for select using (auth.uid() = user_id);
```

## Minutes rule
30 live minutes per billing period on Plus. `agent-session` refuses a new session at ≥ 30 and the client falls back to text mode (same agent, text only, cheaper). The meter resets when Stripe sends `invoice.paid` for the new period.

## Deploy
Copy `functions/` into the podpast.dev site's `netlify/functions/` (or point `netlify.toml` here), `npm i stripe @supabase/supabase-js` at the site root, push, set the env vars. Register the Stripe webhook at `https://podpast.dev/.netlify/functions/stripe-webhook` for `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`.
