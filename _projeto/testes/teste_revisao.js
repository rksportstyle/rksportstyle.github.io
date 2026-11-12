const { chromium, devices } = require('playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:8770/';
let falhas = 0;
const ok = (c, m) => { if (!c) falhas++; console.log((c ? 'PASSOU ' : 'FALHOU ') + m); };
const visitante = `window.claude={use:async n=>n==='user'?{canEdit:()=>false,isOwner:()=>false}:null};try{localStorage.setItem('rk_consentimento',JSON.stringify({v:1,estatistica:false,marketing:false}))}catch(e){}`;
const dono = `window.claude={use:async n=>n==='user'?{canEdit:()=>true,isOwner:()=>true}:n==='artifact'?{publish:async h=>{window.__pub=h;return{version:'v9'}}}:null};try{localStorage.setItem('rk_consentimento',JSON.stringify({v:1,estatistica:false,marketing:false}))}catch(e){}`;
async function rolarTudo(p) { const H = await p.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 350) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40); } await p.waitForTimeout(1200); await p.evaluate(() => scrollTo(0, 0)); }
(async () => {
  const b = await chromium.launch(); const erros = [];
  const ctx = await b.newContext({ viewport: { width: 1366, height: 900 }, bypassCSP: true }); await ctx.addInitScript(visitante);
  const p = await ctx.newPage(); p.on('pageerror', e => erros.push(String(e))); p.on('console', m => { if (m.type() === 'error') erros.push(m.text()); });
  const refs = []; p.on('request', r => { if (/img\/(ref|e)\//.test(r.url())) refs.push(r.url()); });
  await p.goto(BASE); await p.waitForTimeout(900);
  // catálogo
  const d = await p.evaluate(() => JSON.parse(document.getElementById('rk-dados').textContent));
  const disp = d.produtos.filter(x => x.status === 'disponivel').map(x => x.id).sort();
  ok(JSON.stringify(disp) === '["RK-215","RK-298"]', 'disponíveis = só as aprovadas pelo dono no painel (' + disp + ')');
  ok(d.produtos.find(x => x.id === 'RK-213').status === 'encomenda' && d.produtos.find(x => x.id === 'RK-333').status === 'encomenda', 'Arsenal RK-213 e Barcelona RK-333 continuam fora de disponíveis');
  const C = id => d.conferencia.find(c => c.id === id);
  ok(C('C-13').status === 'rejeitada' && C('C-53').clube === 'Arsenal' && C('C-36').status === 'aprovada' && C('C-33').status === 'aprovada', 'conferência preservada com as aprovações do dono');
  ok(d.produtos.length === 276 && new Set(d.produtos.map(x => x.id)).size === 276, '276 produtos, sem IDs duplicados');
  ok(!d.produtos.some(x => x.imgs.some(i => /img\/(e|ref)\//.test(i.c || ''))), 'nenhuma foto física (sacola) como imagem pública');
  ok(await p.locator('#camisetas .cartao').count() === 2, 'seção Disponíveis mostra as 2 aprovadas');
  // tema e destaque
  const cores = await p.evaluate(() => ({ body: getComputedStyle(document.body).backgroundColor, hero: getComputedStyle(document.querySelector('.hero-rk')).backgroundColor, h1: getComputedStyle(document.querySelector('#t-abertura span')).color, laranja: getComputedStyle(document.querySelector('#t-abertura .prata')).color, topo: document.getElementById('topo').classList.contains('sobre-hero') }));
  ok(cores.body === 'rgb(255, 255, 255)' && cores.hero === 'rgb(7, 7, 7)' && cores.h1 === 'rgb(244, 244, 242)' && cores.laranja === 'rgb(201, 204, 210)', 'destaque preto com título branco e laranja; resto do site branco ' + JSON.stringify(cores));
  ok(cores.topo, 'cabeçalho escuro sobre o destaque');
  ok(/Sua paixão\.\s*Seu estilo\./i.test(await p.textContent('#t-abertura')) && await p.locator('.hero-rk .botao', { hasText: 'Ver catálogo' }).count() === 1 && await p.locator('.hero-rk .botao', { hasText: 'Falar no WhatsApp' }).count() === 1, 'chamada, subtítulo e os dois botões');
  // carrossel
  const sl = await p.$$eval('.carr-slide', e => e.map(x => ({ id: x.dataset.ficha, imgs: [...x.querySelectorAll('img')].map(i => ({ cls: i.className, src: i.getAttribute('src') })) })));
  ok(sl.length >= 12, 'carrossel com ' + sl.length + ' camisas');
  ok(sl.every(s => { const pr = d.produtos.find(x => x.id === s.id); if (!pr || pr.oculto) return false; const f = s.imgs.find(i => i.cls === 'carr-frente'), c = s.imgs.find(i => i.cls === 'carr-costas'); return f && f.src === pr.imgs[0].c && (!c || c.src === pr.imgs[1].c); }), 'todas são produtos cadastrados; frente e costas são as fotos originais da MESMA peça');
  ok(sl.filter(s => s.imgs.length === 2).length >= sl.length - 1, 'frente e costas sempre que a peça tem as duas fotos');
  ok(sl[0].id === 'RK-215' && sl[1].id === 'RK-298' && await p.locator('.carr-slide.pronta').count() === 2, 'peças a pronta entrega abrem o carrossel com selo');
  const clubes = sl.map(s => d.produtos.find(x => x.id === s.id).clube);
  ok(clubes.every((c, i) => c !== clubes[(i + 1) % clubes.length]) && new Set(sl.map(s => s.id)).size === sl.length, 'nenhuma camisa ou clube repetido em sequência');
  const grupos = new Set(sl.map(s => d.produtos.find(x => x.id === s.id).grupo));
  ok(grupos.has('brasileiro') && grupos.has('estrangeiro') && grupos.has('selecao'), 'alterna clubes brasileiros, internacionais e seleções');
  const ids = sl.map(s => s.id);
  await p.mouse.move(5, 5); await p.waitForTimeout(2900);
  ok(await p.locator('.carr-slide.ativo').getAttribute('data-ficha') === ids[1], 'avança sozinho em ~2,5 s');
  await p.click('[data-carr="prox"]'); await p.waitForTimeout(300);
  ok(await p.locator('.carr-slide.ativo').getAttribute('data-ficha') === ids[2] && /03/.test(await p.textContent('.carr-n')), 'seta próxima');
  await p.click('[data-carr="ant"]'); await p.click('[data-carr="ant"]'); await p.click('[data-carr="ant"]'); await p.waitForTimeout(200);
  ok(await p.locator('.carr-slide.ativo').getAttribute('data-ficha') === ids[ids.length - 1], 'seta anterior volta do primeiro para o último');
  await p.click('[data-carr="pausa"]'); const ativo = await p.locator('.carr-slide.ativo').getAttribute('data-ficha');
  await p.mouse.move(5, 5); await p.waitForTimeout(3200);
  ok(await p.locator('.carr-slide.ativo').getAttribute('data-ficha') === ativo && await p.getAttribute('[data-carr="pausa"]', 'aria-label') === 'Reproduzir carrossel', 'pausar para o carrossel');
  await p.click('[data-carr-ir="3"]'); await p.waitForTimeout(200);
  ok(await p.locator('[data-carr-ir="3"]').getAttribute('aria-current') === 'true', 'indicadores levam à camisa');
  ok(await p.locator('.carr-slide[aria-hidden="true"]').count() === sl.length - 1, 'slides ocultos fora da leitura de tela');
  await p.click('.carr-slide.ativo'); await p.waitForTimeout(500);
  ok(await p.isVisible('#ficha') && /camisa-/.test(await p.evaluate(() => location.hash)), 'clicar na camisa abre a ficha');
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  // botões e links
  await p.click('.abertura-acoes a[data-rolar]'); await p.waitForTimeout(900);
  ok(await p.evaluate(() => Math.abs(document.getElementById('catalogo').getBoundingClientRect().top) < 140), 'Ver catálogo rola até o catálogo');
  const wa = await p.$$eval('a[data-wa]', e => e.map(a => ({ h: a.getAttribute('href'), pend: a.hasAttribute('data-sem-numero') })));
  ok(wa.length >= 3 && wa.every(x => !/instagram/.test(x.h) && (x.pend ? x.h === '#' : /^https:\/\/wa\.me\/\d{10,}/.test(x.h))), 'WhatsApp nunca aponta para o Instagram (' + wa.length + ' botões)');
  const pops = []; p.context().on('page', x => pops.push(x.url()));
  await p.click('.hero-rk [data-wa]'); await p.waitForTimeout(400);
  ok(pops.length === 0 && await p.isVisible('#aviso-flut'), 'sem número cadastrado: avisa e não abre outro site');
  ok(await p.isVisible('.contato-flutuante .flut-wa') && await p.isVisible('.contato-flutuante .flut-ig') && await p.getAttribute('.flut-ig', 'href') === 'https://instagram.com/rk_sportstyle', 'botões flutuantes de WhatsApp e Instagram (@rk_sportstyle)');
  const rod = await p.textContent('footer');
  ok(!/CNPJ|Endereço|e-mail|preencher/i.test(rod), 'rodapé sem CNPJ, endereço, e-mail ou espaços reservados');
  const tr = await p.evaluate(() => { const t = document.querySelector('.borda-hero'); return t && getComputedStyle(t).backgroundImage; });
  ok(/linear-gradient/.test(tr || ''), 'transição discreta entre o destaque preto e a área clara');
  ok(await p.evaluate(() => document.getElementById('topo').offsetHeight) <= 46, 'cabeçalho compacto (' + await p.evaluate(() => document.getElementById('topo').offsetHeight) + 'px)');
  for (const h of ['#pronta-entrega', '#sob-encomenda', '#todas', '#c-brasil', '#c-selecoes']) { await p.goto(BASE + h); await p.waitForTimeout(300); ok(await p.locator('.res-cabeca h1').count() === 1, 'rota ' + h); }
  await p.goto(BASE + '#pronta-entrega'); await p.waitForTimeout(300);
  ok(await p.locator('#vista .cartao').count() === 2, 'página Disponíveis lista só as 2 confirmadas');
  // revelar + acessibilidade estável
  await p.goto(BASE); await p.waitForTimeout(800);
  const escondidos = await p.evaluate(() => document.querySelectorAll('.revelar:not(.visivel)').length);
  await rolarTudo(p);
  ok(escondidos > 0 && await p.evaluate(() => document.querySelectorAll('.revelar:not(.visivel)').length) === 0, 'elementos aparecem suavemente na rolagem (' + escondidos + ')');
  await p.addScriptTag({ path: 'node_modules/axe-core/axe.min.js' });
  const ax = await p.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] })).violations.map(v => v.id + '(' + v.nodes.slice(0, 2).map(n => n.target.join(' ')).join(',') + ')'));
  ok(ax.length === 0, 'WCAG 2.2 AA na página inicial clara ' + ax.join('; '));
  ok(refs.length === 0, 'visitante nunca carrega fotos de referência');
  // movimento reduzido
  const rc = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' }); await rc.addInitScript(visitante);
  const r = await rc.newPage(); await r.goto(BASE); await r.waitForTimeout(3500);
  ok(await r.locator('.carr-slide.ativo').getAttribute('data-ficha') === ids[0] && await r.evaluate(() => document.getElementById('carrossel').classList.contains('parado')), 'movimento reduzido: carrossel não gira sozinho');
  ok(await r.evaluate(() => document.querySelectorAll('.revelar').length) === 0, 'movimento reduzido: sem animação de rolagem');
  // telas
  for (const [nome, dev] of [['iPhone SE', devices['iPhone SE']], ['iPhone 13', devices['iPhone 13']], ['Pixel 7', devices['Pixel 7']], ['Galaxy S9+', devices['Galaxy S9+']], ['iPad (gen 7)', devices['iPad (gen 7)']], ['iPad Pro 11', devices['iPad Pro 11']]]) {
    const c = await b.newContext({ ...dev }); await c.addInitScript(visitante); const m = await c.newPage();
    await m.goto(BASE); await m.waitForTimeout(700); await m.click('[data-carr="pausa"]').catch(()=>{});
    const s = await m.evaluate(() => ({ ov: document.documentElement.scrollWidth - innerWidth, car: document.getElementById('carrossel').getBoundingClientRect(), bt: [...document.querySelectorAll('.carr-bt')].map(x => x.getBoundingClientRect().height) }));
    ok(s.ov <= 0 && s.car.right <= dev.viewport.width + 1 && s.bt.every(h => h >= 43.5), nome + ': sem rolagem lateral, carrossel inteiro, botões ≥44px');
    await m.locator('.carr-palco').evaluate(e => { const t = (x) => new Touch({ identifier: 1, target: e, clientX: x, clientY: 200 }); e.dispatchEvent(new TouchEvent('touchstart', { touches: [t(300)], changedTouches: [t(300)] })); e.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [t(120)] })); }).catch(() => {});
    await m.waitForTimeout(200);
    if (dev.hasTouch) ok(/02 \//.test(await m.textContent('.carr-n')), nome + ': deslizar troca a camisa');
    await c.close();
  }
  for (const w of [1024, 1366, 1920]) { const pg = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage(); await pg.goto(BASE); await pg.waitForTimeout(500); ok(await pg.evaluate(() => document.documentElement.scrollWidth <= innerWidth), w + 'px sem rolagem lateral'); }
  // painel
  const dc = await b.newContext({ viewport: { width: 1366, height: 900 } }); await dc.addInitScript(dono); const pd = await dc.newPage(); pd.on('pageerror', e => erros.push(String(e)));
  await pd.goto(BASE + '#admin'); await pd.waitForTimeout(900);
  ok(await pd.isVisible('#painel-conf'), 'painel do dono abre na Conferência');
  ok(await pd.locator('.conf-item').count() >= 40, 'conferência carrega as peças do pedido');
  const vc = await (await b.newContext()).newPage(); await vc.addInitScript(visitante); await vc.goto(BASE + '#admin'); await vc.waitForTimeout(600);
  ok(await vc.locator('#painel-conf').count() === 0 && await vc.locator('#adm-salvar').count() === 0, 'visitante não acessa o painel');
  ok(erros.length === 0, 'sem erros de JavaScript ' + erros.join(' / '));
  console.log('FALHAS: ' + falhas); await b.close();
})();
