// SHUK SHOPPER headless harness — loads the real game script with DOM stubs
const fs = require('fs');
const html = fs.readFileSync('/home/user/miklatgames/shukshopper/index.html', 'utf8');
const m = html.match(/<script>\n('use strict';[\s\S]*?)<\/script>/);
if (!m) { console.error('script extraction failed'); process.exit(1); }
let src = m[1];

// ---- stubs ----
const els = {};
function el(id) {
  if (!els[id]) els[id] = {
    id, textContent: '', innerHTML: '', hidden: true, href: '',
    style: {}, classList: { add(){}, remove(){}, toggle(){} },
    addEventListener(){}, getAttribute(){ return null; }, setAttribute(){},
  };
  return els[id];
}
const ctx2d = new Proxy({}, { get: (t, p) => {
  if (p === 'createLinearGradient') return () => ({ addColorStop(){} });
  if (p === 'getImageData') return (x,y,w,h) => ({ data: new Uint8ClampedArray(w*h*4) });
  if (p === 'putImageData') return () => {};
  if (p === 'measureText') return () => ({ width: 0 });
  return typeof t[p] !== 'undefined' ? t[p] : (() => {});
}, set: () => true });
const canvas = { getContext: () => ctx2d, width: 390, height: 780, style: {},
  parentElement: { getBoundingClientRect: () => ({ width: 390, height: 780 }) } };

global.document = {
  documentElement: { lang: '', dir: '' },
  hidden: false,
  getElementById: id => id === 'cv' ? canvas : el(id),
  querySelectorAll: () => [],
  createElement: tag => tag === 'canvas'
    ? { width: 0, height: 0, getContext: () => ctx2d } : el('x'),
  addEventListener(){},
  body: {},
};
global.window = { addEventListener(){}, devicePixelRatio: 2 };
global.navigator = { language: 'en', vibrate: null };
global.location = { search: SEARCH, origin: 'https://miklatgames.fun' };
global.localStorage = { getItem: () => null, setItem(){}, removeItem(){} };
global.performance = { now: () => Date.now() };
global.getComputedStyle = () => ({ fontFamily: 'sans-serif' });
let rafCb = null;
global.requestAnimationFrame = cb => { rafCb = cb; return 1; };
global.cancelAnimationFrame = () => {};
global.URLSearchParams = URLSearchParams;
global.Image = class { set src(v) { this._src = v; /* never loads: simulates 404 */ } };
global.setInterval = () => 0;
global.__timeouts = [];
global.setTimeout = (fn, ms) => { __timeouts.push({ fn, ms }); return __timeouts.length; };
global.clearTimeout = () => {};

// expose internals
src += `\n;module.exports = { get G(){return G;}, set G(v){G=v;}, get running(){return running;}, set running(v){running=v;},
  reset, update, draw, spawnRow, collect, hit, advanceZone, newList, curZone, gameOver, start, go,
  ZONES, ZONE_FALLBACK_DIST, keyMagenta, ART, T, I18N, get beatTarget(){return beatTarget;},
  _timeouts: __timeouts };`;
const Module = require('module');
const mod = new Module('game', null);
mod._compile(src, '/tmp/sstest/game.js');
module.exports = { game: mod.exports, els };
