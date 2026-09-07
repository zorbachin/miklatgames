// Signed ElevenLabs agent session for a paid user, plus the minutes meter.
// POST { figure } → { url, minutesLeft, mode:'voice'|'text' }
// POST { action:'meter', seconds } → { minutesUsed }
const { createClient } = require('@supabase/supabase-js');
const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const CAP_MIN = 30;
const FIGURES = ['franklin', 'washington', 'abigail', 'phillis', 'salomon', 'tisquantum'];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: '' };
  const jwt = (event.headers.authorization || '').replace('Bearer ', '');
  const { data: { user } } = await db.auth.getUser(jwt);
  if (!user) return { statusCode: 401, body: 'sign in first' };

  const { data: p } = await db.from('profiles').select('*').eq('user_id', user.id).single();
  const paid = p && ['trialing', 'active'].includes(p.status);
  const body = JSON.parse(event.body || '{}');

  if (body.action === 'meter') {
    if (!paid) return { statusCode: 403, body: '' };
    const used = (p.minutes_used || 0) + Math.max(0, Number(body.seconds) || 0) / 60;
    await db.from('profiles').update({ minutes_used: used }).eq('user_id', user.id);
    return { statusCode: 200, body: JSON.stringify({ minutesUsed: used }) };
  }

  if (!paid) return { statusCode: 402, body: JSON.stringify({ upgrade: true }) };
  if (!FIGURES.includes(body.figure)) return { statusCode: 400, body: 'unknown figure' };
  const agentId = process.env['ELEVENLABS_AGENT_' + body.figure.toUpperCase()];
  if (!agentId) return { statusCode: 503, body: 'agent not configured' };

  const minutesLeft = Math.max(0, CAP_MIN - (p.minutes_used || 0));
  const mode = minutesLeft > 0.5 ? 'voice' : 'text';
  // Private agents need a signed URL minted server-side with the API key.
  const r = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`, { headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY } });
  if (!r.ok) return { statusCode: 502, body: 'elevenlabs: ' + r.status };
  const { signed_url } = await r.json();
  return { statusCode: 200, body: JSON.stringify({ url: signed_url, minutesLeft, mode }) };
};
