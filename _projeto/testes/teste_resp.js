const { chromium, devices } = require('playwright');
const BASE = 'http://127.0.0.1:8771/';
let falhas = 0; const ok = (c, m) => { if (!c) falhas++; console.log((c ? 'PASSOU ' : 'FALHOU ') + m); };
const semCookie = `try{localStorage.setItem('rk_consentimento',JSON.stringify({v:1,estatistica:false,marketing:false}))}catch(e){}`;
const LARG = [375, 390, 430, 768, 1024, 1366, 1920];
async function checar(p, rot, w) {
  const r = await p.evaluate(() => {
    const vw = innerWidth, fora = [];
    document.querySelectorAll('body *').forEach(e => {
      if (!e.offsetParent && getComputedStyle(e).position !== 'fixed') return;
      if (e.closest('dialog:not([open]), [hidden], .megamenu[hidden], .so-leitor, .vitrine-abertura, .abas-casa')) return;
      const b = e.getBoundingClientRect(); if (b.width && (b.right > vw + 1 || b.left < -1) && !e.closest('.palco, .hero-fundo')) fora.push((e.className || e.tagName).toString().slice(0, 40) + ':' + Math.round(b.left) + '-' + Math.round(b.right));
    });
    const tam = [...document.querySelectorAll('p, span, a, button, h3, dd, dt, li, label')].filter(e => e.offsetParent && e.textContent.trim() && !e.closest('.so-leitor')).map(e => parseFloat(getComputedStyle(e).fontSize)).filter(v => v > 0);
    return { rol: document.documentElement.scrollWidth > vw, fora: fora.slice(0, 5), nfora: fora.length, minFonte: Math.min(...tam) };
  });
  ok(!r.rol && r.nfora === 0, `${w}px ${rot}: sem nada para fora da tela` + (r.nfora ? ' -> ' + r.fora.join(' | ') : ''));
  ok(r.minFonte >= 10, `${w}px ${rot}: menor fonte ${r.minFonte}px`);
}
(async () => {
  const b = await chromium.launch(); const erros = [];
  for (const w of LARG) {
    const mob = w < 768, tab = w >= 768 && w <= 1024;
    const ctx = await b.newContext({ viewport: { width: w, height: mob ? 844 : tab ? (w === 768 ? 1024 : 768) : 900 }, isMobile: w < 1100, hasTouch: w < 1100, deviceScaleFactor: 1 });
    await ctx.addInitScript(semCookie);
    const p = await ctx.newPage(); p.on('pageerror', e => erros.push(w + ' ' + e)); p.on('console', m => { if (m.type() === 'error') erros.push(w + ' ' + m.text()); });
    await p.goto(BASE); await p.waitForTimeout(1600);
    await p.screenshot({ path: `../shots3/${w}_inicio.png` });
    await checar(p, 'início', w);
    await p.goto(BASE + '#c-internacionais'); await p.waitForTimeout(900);
    const cols = await p.evaluate(() => { const g = document.querySelector('#vista .grade'); return getComputedStyle(g).gridTemplateColumns.split(' ').length; });
    const esperado = w <= 430 ? 2 : w === 768 ? [3, 4] : w === 1024 ? [3, 4] : w === 1366 ? [4] : [5];
    ok(Array.isArray(esperado) ? esperado.includes(cols) : cols === esperado, `${w}px: grade com ${cols} colunas`);
    await p.screenshot({ path: `../shots3/${w}_categoria.png` });
    await checar(p, 'categoria', w);
    // pesquisa
    if (!(await p.isVisible('#busca-topo'))) await p.click('#abrir-busca'); await p.fill('#busca-topo', 'flamengo'); await p.waitForTimeout(500);
    ok(await p.locator('#vista .cartao').count() >= 10, `${w}px: pesquisa funciona`);
    // menu
    if (w < 900) { await p.click('#abrir-menu'); await p.waitForTimeout(250); ok(await p.evaluate(() => document.getElementById('gaveta').open), `${w}px: menu do celular abre`); await p.screenshot({ path: `../shots3/${w}_menu.png` }); await p.keyboard.press('Escape'); }
    else { await p.click('#botao-categorias'); await p.waitForTimeout(250); ok(await p.isVisible('#megamenu'), `${w}px: menu Categorias abre`); await p.screenshot({ path: `../shots3/${w}_menu.png` }); await p.keyboard.press('Escape'); }
    // filtros
    await p.goto(BASE + '#c-brasil'); await p.waitForTimeout(600);
    if (w < 900) { await p.click('#abrir-filtros'); await p.waitForTimeout(200); await p.click('#filtros-celular [data-disp="encomenda"]'); await p.click('#aplicar-filtros'); }
    else await p.click('.lateral [data-disp="encomenda"]');
    await p.waitForTimeout(200);
    ok(await p.locator('.filtros-ativos [data-tirar="disp"]').count() === 1, `${w}px: filtro aplica`);
    // ficha
    await p.click('#vista .cartao .foto', { force: true }); await p.waitForTimeout(500);
    const f = await p.evaluate(() => { const i = document.getElementById('ficha-img').getBoundingClientRect(), n = document.getElementById('ficha-nome').getBoundingClientRect(), wa = document.getElementById('ficha-wa').getBoundingClientRect(); return { sobre: n.top < i.bottom - 1 && n.left < i.right - 1, waVis: wa.bottom <= innerHeight + 1 && wa.height >= 44, imgOk: i.width > 100 && i.height > 100 }; });
    ok(!f.sobre && f.imgOk, `${w}px: camisa aberta sem sobreposição`);
    ok(f.waVis, `${w}px: botão do WhatsApp visível e grande (≥44px)`);
    await p.screenshot({ path: `../shots3/${w}_ficha.png` });
    await checar(p, 'camisa aberta', w);
    await ctx.close();
  }
  // aparelhos reais (emulação de iPhone e Android)
  for (const nome of ['iPhone SE', 'iPhone 13', 'iPhone 15 Pro Max', 'Pixel 7', 'Galaxy S9+', 'iPad (gen 7)', 'iPad Pro 11']) {
    const d = devices[nome]; if (!d) { console.log('sem perfil ' + nome); continue; }
    const { defaultBrowserType, ...cfg } = d;
    const ctx = await b.newContext(cfg); await ctx.addInitScript(semCookie);
    const p = await ctx.newPage(); p.on('pageerror', e => erros.push(nome + ' ' + e));
    await p.goto(BASE); await p.waitForTimeout(1000);
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth) && await p.locator('.cartao').count() > 0, `${nome}: abre sem rolagem lateral`);
    await ctx.close();
  }
  ok(erros.length === 0, 'sem erros de JavaScript ' + erros.slice(0, 5).join(' / '));
  console.log('FALHAS: ' + falhas); await b.close();
})();
