// Headless logic check for podpast/index.html — run: node podpast/assets/test.js
const fs=require('fs');const vm=require('vm');const path=require('path');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const src=html.slice(html.indexOf('<script>')+8,html.lastIndexOf('</script>'));
const cut=src.indexOf('/* ===== PODPAST ENGINE');
const ctx={console,Buffer};vm.createContext(ctx);
vm.runInContext(src.slice(0,cut),ctx);          // content + media (pure data)
// pull answer() + bandBeats() out of the engine without a DOM
const app=src.slice(cut);
const grab=(name)=>{const i=app.indexOf('function '+name);let d=0,j=app.indexOf('{',i);for(let k=j;k<app.length;k++){if(app[k]==='{')d++;if(app[k]==='}'){d--;if(d===0)return app.slice(i,k+1);}}};
vm.runInContext('var S={band:"scholar"};'+grab('answer')+grab('bandBeats')+';this.answer=answer;this.bandBeats=bandBeats;this.S=S;',ctx);
let pass=0,fail=0;const ok=(c,m)=>{if(c)pass++;else{fail++;console.log('FAIL:',m);}};
const G=vm.runInContext("({FIGURES,ERAS,BG,PORTRAITS,AUDIO,AUDIO_BASE,PLACES,PLACE_NAME,TOKENS,ROUTES,TRACKS,ERA_TRAIL,LAND})",ctx);const F=G.FIGURES,E=G.ERAS;ctx.BG=G.BG;
ok(E[0].figs.every(id=>F[id]),'era1 figures exist');
for(const f of Object.values(F)){
  ok(f.born<f.died&&f.died<2000,f.id+' dates');
  ok(f.beats.length>=9,f.id+' >=9 beats');
  ok(f.beats.every(b=>['all','scholar','adult'].includes(b.min)&&ctx.BG[b.bg]&&b.e&&b.c&&b.t),f.id+' beat shape');
  const allW=f.beats.filter(b=>b.min==='all').map(b=>b.t.split(/\s+/).length).reduce((a,b)=>a+b,0);
  ok(allW>=200&&allW<=520,f.id+' explorer word count '+allW);
  const schW=f.beats.filter(b=>b.min!=='adult').map(b=>b.t.split(/\s+/).length).reduce((a,b)=>a+b,0);
  ok(schW>=280&&schW<=620,f.id+' scholar word count '+schW);
  ok(f.checks.mc.opts.length===4&&f.checks.mc.a===0,f.id+' mc');
  ok(f.checks.order.length===4,f.id+' order');
  ok(f.canon.length>=8&&f.canon.every(c=>c.q.length&&c.a.length>40),f.id+' canon');
  // retrieval: every canon entry reachable by its first keyword
  for(const c of f.canon){const r=ctx.answer(f,'Tell me about '+c.q[0]+'?');ok(r.hit&&r.text===c.a,f.id+' retrieval '+c.q[0]);}
  // boundary
  const r=ctx.answer(f,'What did you think about 1999?');ok(!r.hit&&/died in/.test(r.text),f.id+' boundary year');
  const r2=ctx.answer(f,'What is your opinion of the moon landing?');ok(!r2.hit&&/won’t invent/.test(r2.text),f.id+' refuses unknown');
  // band filtering
  ctx.S.band='explorer';const eb=ctx.bandBeats(f);ok(eb.every(b=>b.min==='all'),f.id+' explorer band');
  ok(eb.filter(b=>b.text!==b.t).length>=5,f.id+' explorer has kid text on >=5 beats');
  ctx.S.band='adult';ok(ctx.bandBeats(f).length===f.beats.length,f.id+' adult gets all');
  ctx.S.band='scholar';ok(ctx.bandBeats(f).every(b=>b.min!=='adult'),f.id+' scholar excludes adult');
}
// media + board
for(const f of Object.values(F)){
  ok(/^data:image\/webp;base64,[A-Za-z0-9+\/=]{5000,}$/.test(G.PORTRAITS[f.id]||''),f.id+' portrait data uri');
  ok(Buffer.from((G.PORTRAITS[f.id]||'').split(',')[1]||'','base64').slice(0,4).toString()==='RIFF',f.id+' portrait is RIFF/WebP');
  ok(Array.isArray(G.AUDIO[f.id])&&G.AUDIO[f.id].length===f.beats.length,f.id+' one clip per beat');
  ok((G.AUDIO[f.id]||[]).every(u=>/^\d{6}_[0-9a-f-]{36}$/.test(u)),f.id+' clip ids well-formed');
  ok(G.TOKENS.some(t=>t.fig===f.id),f.id+' has a board token');
  ok(Array.isArray(G.ROUTES[f.id])&&G.ROUTES[f.id].length>=3,f.id+' has a journey');
  ctx.S.band='scholar';ok(ctx.bandBeats(f).every(b=>Number.isInteger(b.i)&&f.beats[b.i].t===b.t),f.id+' beat index maps to clip');
}
ok(/^https:\/\/[^ ]+_$/.test(G.AUDIO_BASE),'audio base url');
ok(new Set(G.AUDIO_BASE&&Object.values(G.AUDIO).flat()).size===64,'64 unique clips (one per beat)');
const allPlaces=new Set([...G.TOKENS.map(t=>t.at),...Object.values(G.ROUTES).flat(),...G.TRACKS.map(t=>t.at),...G.ERA_TRAIL]);
for(const p of allPlaces)ok(Array.isArray(G.PLACES[p])&&Math.abs(G.PLACES[p][0])<=180&&Math.abs(G.PLACES[p][1])<=90,'place '+p);
for(const t of G.TOKENS)ok(G.PLACE_NAME[t.at],'token home named '+t.at);
ok(/^M[\d.,LZM]+$/.test(G.LAND)&&G.LAND.length>40000,'land path present');
const near=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
for(let i=0;i<G.TOKENS.length;i++)for(let j=i+1;j<G.TOKENS.length;j++)ok(near(G.TOKENS[i],G.TOKENS[j])>=34,'tokens do not overlap '+G.TOKENS[i].fig+'/'+G.TOKENS[j].fig);
for(const t of G.TOKENS)ok(t.x>195+16&&t.x<630-16&&t.y>85+16&&t.y<275-28,'token in atlantic view '+t.fig);
// specific canon spot-checks
ok(/Yorktown/.test(ctx.answer(F.salomon,'How did you help at Yorktown?').text),'salomon yorktown');
ok(/Remember the Ladies/.test(ctx.answer(F.abigail,'what did you write about women?').text),'abigail ladies');
ok(/1865|slavery/.test(ctx.answer(F.phillis,'did you see the end of slavery in 1865?').text),'phillis boundary 1865');
console.log(`${pass} passed, ${fail} failed`);process.exit(fail?1:0);
