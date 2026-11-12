const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:8771/';
let falhas = 0; const ok = (c, m) => { if (!c) falhas++; console.log((c ? 'PASSOU ' : 'FALHOU ') + m); };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1280, height: 860 } });
  await ctx.addInitScript(() => { try { localStorage.setItem('rk_consentimento', JSON.stringify({ v: 1, estatistica: false, marketing: false })); } catch (e) {} });
  await ctx.route(BASE, async r => { const res = await r.fetch(); let t = await res.text(); t = t.replace('"config":{', '"config":{"github":"teste/rk",'); r.fulfill({ response: res, body: t }); });
  await ctx.route('https://api.github.com/**', async r => {
    const h = r.request().headers().authorization;
    if (h !== 'Bearer CHAVE-BOA') return r.fulfill({ status: 401, contentType: 'application/json', body: '{"message":"Bad credentials"}', headers: { 'access-control-allow-origin': '*' } });
    return r.fulfill({ status: 200, contentType: 'application/json', body: '{"permissions":{"push":true}}', headers: { 'access-control-allow-origin': '*' } });
  });
  const p = await ctx.newPage();
  await p.goto(BASE); await p.waitForTimeout(500);
  const meta = await p.evaluate(() => (document.querySelector('meta[http-equiv="Content-Security-Policy"]') || {}).content || '');
  ok(/script-src 'self'/.test(meta) && /object-src 'none'/.test(meta) && /base-uri 'self'/.test(meta), 'política de segurança de conteúdo (CSP) ativa no site');
  await p.evaluate(() => { const s = document.createElement('script'); s.textContent = 'window.__inj = 1'; document.body.appendChild(s); const i = document.createElement('img'); i.src = 'x'; i.setAttribute('onerror', 'window.__inj2 = 1'); document.body.appendChild(i); }); await p.waitForTimeout(300);
  ok(await p.evaluate(() => !window.__inj && !window.__inj2), 'CSP bloqueia scripts injetados na página');
  ok(!(await p.content()).match(/ghp_|github_pat_|Bearer /), 'nenhuma chave/senha no código público');
  await p.goto(BASE + '#admin'); await p.waitForTimeout(500);
  for (let i = 0; i < 5; i++) { await p.fill('#gh-token', 'ERRADA' + i); await p.click('#gh-login button[type=submit]'); await p.waitForTimeout(250); }
  await p.fill('#gh-token', 'CHAVE-BOA'); await p.click('#gh-login button[type=submit]'); await p.waitForTimeout(300);
  ok(/Muitas tentativas/.test(await p.textContent('#gh-msg')) && await p.locator('#adm-salvar').count() === 0, 'após 5 chaves erradas, o login fica bloqueado por um tempo');
  ok(await p.locator('#gh-lembrar').count() === 0, 'chave não pode ser lembrada para sempre no aparelho');
  const p2 = await ctx.newPage(); await p2.goto(BASE + '#admin'); await p2.waitForTimeout(500);
  await p2.fill('#gh-token', 'CHAVE-BOA'); await p2.click('#gh-login button[type=submit]'); await p2.waitForTimeout(500);
  ok(await p2.isVisible('#adm-salvar') && !(await p2.evaluate(() => localStorage.getItem('rk_gh_acesso'))), 'chave certa entra; fica só na sessão da aba');
  const f = await b.newPage(); await f.goto('http://127.0.0.1:8774/'); await f.waitForTimeout(1200);
  ok(await f.frames()[1].evaluate(() => document.querySelectorAll('.cartao').length) === 0, 'site não funciona dentro de página de terceiros (clickjacking)');
  const ext = await p.evaluate(() => [...document.querySelectorAll('a[target="_blank"]')].every(a => /noopener/.test(a.rel)));
  ok(ext, 'links externos com noopener');
  console.log('FALHAS: ' + falhas); await b.close();
})();
