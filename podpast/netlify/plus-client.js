/* Client side of Plus. Included in index.html on podpast.dev only; the free demo on miklatgames.fun leaves it out.
   Requires: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js">
             <script src="https://cdn.jsdelivr.net/npm/@elevenlabs/client/dist/lib.umd.min.js"> */
const PLUS_CFG = { supabaseUrl: window.SUPABASE_URL, anonKey: window.SUPABASE_ANON_KEY, checkout: window.STRIPE_PAYMENT_LINK, fn: '/.netlify/functions/agent-session' };
const sb = window.supabase && supabase.createClient(PLUS_CFG.supabaseUrl, PLUS_CFG.anonKey);

async function plusSignIn(email) { const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href } }); if (error) throw error; }
async function plusSession() { const { data } = await sb.auth.getSession(); return data.session; }
async function plusCheckout() { const s = await plusSession(); if (!s) throw new Error('sign in first'); location.href = `${PLUS_CFG.checkout}?client_reference_id=${s.user.id}&prefilled_email=${encodeURIComponent(s.user.email)}`; }

let convo = null, t0 = 0;
async function plusTalk(figureId, onStatus) {
  const s = await plusSession(); if (!s) return onStatus('signin');
  const r = await fetch(PLUS_CFG.fn, { method: 'POST', headers: { authorization: 'Bearer ' + s.access_token, 'content-type': 'application/json' }, body: JSON.stringify({ figure: figureId }) });
  if (r.status === 402) return onStatus('upgrade');
  if (!r.ok) return onStatus('error');
  const { url, minutesLeft, mode } = await r.json();
  onStatus('connecting', { minutesLeft, mode });
  t0 = Date.now();
  convo = await ElevenLabsClient.Conversation.startSession({ signedUrl: url, connectionType: 'websocket',
    onConnect: () => onStatus('live', { minutesLeft, mode }),
    onDisconnect: () => plusEnd(s),
    onModeChange: (m) => onStatus(m.mode === 'speaking' ? 'speaking' : 'listening'),
    onError: () => onStatus('error') });
  // hard stop at the cap so a long call can't overrun the meter
  setTimeout(() => convo && convo.endSession(), Math.max(30, minutesLeft * 60) * 1000);
}
async function plusEnd(s) {
  if (!convo) return; const seconds = (Date.now() - t0) / 1000; convo = null;
  await fetch(PLUS_CFG.fn, { method: 'POST', headers: { authorization: 'Bearer ' + s.access_token, 'content-type': 'application/json' }, body: JSON.stringify({ action: 'meter', seconds }) });
}
