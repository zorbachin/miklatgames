// MIKLAT DIGGER headless harness — loads the real game script with DOM stubs.
// load(search, store) returns a fresh game instance; store is a plain object
// backing the localStorage stub (so wallet/museum tests use real read/write paths).
const fs = require('fs');
const Module = require('module');
const html = fs.readFileSync('/home/user/miklatgames/miklatdigger/index.html', 'utf8');
const m = html.match(/<script>\n('use strict';[\s\S]*?)<\/script>/);
if (!m) { console.error('script extraction failed'); process.exit(1); }
const baseSrc = m[1];

function makeEl(id) {
  return {
    id, textContent: '', _innerHTML: '', hidden: true, href: '', disabled: false,
    className: '', children: [],
    get innerHTML() { return this._innerHTML; },
    set innerHTML(v) { this._innerHTML = v; if (v === '') this.children = []; },
    style: {}, classList: { add(){}, remove(){}, toggle(){} },
    listeners: {},
    addEventListener(ev, fn) { (this.listeners[ev] = this.listeners[ev] || []).push(fn); },
    appendChild(c) { this.children.push(c); },
    getAttribute(){ return null; }, setAttribute(){},
  };
}
const ctx2d = new Proxy({}, { get: (t, p) => {
  if (p === 'createLinearGradient') return () => ({ addColorStop(){} });
  if (p === 'measureText') return () => ({ width: 0 });
  return typeof t[p] !== 'undefined' ? t[p] : (() => {});
}, set: () => true });

function def(name, value) {
  Object.defineProperty(globalThis, name, { value, writable: true, configurable: true });
}

let loadCount = 0;
function load(search = '', store = {}) {
  const els = {};
  const el = id => els[id] || (els[id] = makeEl(id));
  const canvas = { getContext: () => ctx2d, width: 390, height: 780, style: {},
    parentElement: { getBoundingClientRect: () => ({ width: 390, height: 780 }) } };
  def('document', {
    documentElement: { lang: '', dir: '' },
    hidden: false,
    getElementById: id => id === 'cv' ? canvas : el(id),
    querySelectorAll: () => [],
    createElement: () => makeEl('dyn' + (loadCount++)),
    addEventListener(){},
    body: {},
  });
  def('window', { addEventListener(){}, devicePixelRatio: 2 });
  def('navigator', { language: 'en' });
  def('location', { search, origin: 'https://miklatgames.fun' });
  def('localStorage', {
    getItem: k => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: k => { delete store[k]; },
  });
  def('performance', { now: () => Date.now() });
  def('getComputedStyle', () => ({ fontFamily: 'sans-serif' }));
  def('requestAnimationFrame', () => 1);
  def('cancelAnimationFrame', () => {});
  def('setInterval', () => 0);
  const timeouts = [];
  def('setTimeout', (fn, ms) => { timeouts.push({ fn, ms }); return timeouts.length; });
  def('clearTimeout', () => {});

  let src = baseSrc;
  src += `\n;module.exports={
    get G(){return G;}, set G(v){G=v;},
    get P(){return P;}, set P(v){P=v;},
    get running(){return running;}, set running(v){running=v;},
    get mode(){return mode;}, set mode(v){mode=v;},
    get grid(){return grid;}, get artAt(){return artAt;}, get scorps(){return scorps;},
    get falls(){return falls;}, get tele(){return tele;}, get genRow(){return genRow;},
    get beatTarget(){return beatTarget;}, get RNG(){return RNG;},
    reset,ensureRows,dig,update,draw,gravityScan,updateFalls,startBrush,rub,finishBrush,
    checkSet,gameOver,start,setDepth,burstPipe,paintShop,paintMuseum,paintMenuLines,
    wGet,wSet,wAdd,wRaw,museum,sets,meta,daily,best,STRATA,VAL,BAND,COLS,SHOP,
    maxCoffee,digCost,dayNum,mulberry32,T,I18N,show,hideAll,toast};`;
  const mod = new Module('game' + (loadCount++), null);
  mod._compile(src, '/tmp/mdgtest/game.js');
  return { g: mod.exports, els, store, timeouts };
}
module.exports = { load };
