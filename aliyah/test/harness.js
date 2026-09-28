// ALIYAH headless harness — loads the real game script with DOM stubs (pattern: shukshopper/test)
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const m = html.match(/<script>\n('use strict';[\s\S]*?)<\/script>/);
if (!m) { console.error('script extraction failed'); process.exit(1); }
let src = m[1];
const SEARCH = process.env.SEARCH || '';
const WW = +(process.env.W || 390), HH = +(process.env.H || 780);

const els = {};
function el(id) {
  if (!els[id]) els[id] = {
    id, textContent: '', innerHTML: '', hidden: true, href: '', value: '', placeholder: '', dataset: {},
    style: {}, classList: { _s: new Set(), add(c){this._s.add(c);}, remove(c){this._s.delete(c);}, toggle(c,f){f?this._s.add(c):this._s.delete(c);}, contains(c){return this._s.has(c);} },
    _h: {}, addEventListener(t,f){ (this._h[t]=this._h[t]||[]).push(f); }, click(){ (this._h.click||[]).forEach(f=>f()); },
    getAttribute(){ return null; }, setAttribute(){}, appendChild(){}, closest(){ return null; },
  };
  return els[id];
}
const ctx2d = new Proxy({}, { get: (t, p) => {
  if (p === 'createLinearGradient') return () => ({ addColorStop(){} });
  if (p === 'measureText') return () => ({ width: 0 });
  if (p === 'roundRect') return () => {};
  return typeof t[p] !== 'undefined' ? t[p] : (() => {});
}, set: () => true });
const canvas = { getContext: () => ctx2d, width: WW, height: HH, style: {},
  parentElement: { getBoundingClientRect: () => ({ width: WW, height: HH }) } };
global.document = {
  documentElement: { lang: '', dir: '' }, hidden: false,
  getElementById: id => id === 'cv' ? canvas : (id === 'hcGap' || id === 'hcFam') ? { getContext: () => ctx2d } : el(id),
  querySelectorAll: () => [], createElement: () => ({ className: '', textContent: '' }),
  addEventListener(){}, body: {},
};
global.window = { addEventListener(){}, devicePixelRatio: 2 };
global.navigator = { language: 'en' };
global.location = { search: SEARCH, origin: 'https://miklatgames.fun', protocol: 'https:' };
const store = {};
global.localStorage = { getItem: k => (k in store ? store[k] : null), setItem(k, v){ store[k] = String(v); }, removeItem(k){ delete store[k]; } };
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = () => 1;
global.URLSearchParams = URLSearchParams;
global.setInterval = () => 0;
const timeouts = [];
global.setTimeout = (fn, ms) => { timeouts.push({ fn, ms }); return timeouts.length; };
global.clearTimeout = () => {};
global.flushTimeouts = () => { while (timeouts.length) timeouts.shift().fn(); };

src += `\n;module.exports = { get SCREEN(){return SCREEN;}, get CUR(){return CUR;}, SAVE, MISSIONS, RUN, ORDER, CHAPTERS, WORDS, I18N, T,
  startMission, finishMission, chapterUnlocked, missionUnlocked, nextMissionId, shareGrid, totalStars, bubbles, mapTap, IN, heldSide,
  get lastResult(){return lastResult;}, get lang(){return lang;}, set lang(v){lang=v;}, get W(){return W;}, get H(){return H;}, get beatTarget(){return beatTarget;},
  updateParts, PARTS, save, drawMap, drawHero, geo, applyLang, newJourney, els: null };`;
const Module = require('module');
const mod = new Module('game', null);
mod._compile(src, __dirname + '/game.js');
module.exports = { g: mod.exports, els, store, timeouts };
