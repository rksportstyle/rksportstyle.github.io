# Projeto do site RK Sport Style

Esta pasta guarda os arquivos-fonte usados para gerar o site publicado (`index.html`, `app.js` e `app.css` na raiz).
Ela existe para que qualquer ajuste futuro de visual seja feito a partir da versão atual, sem perder nada.

- `fonte/` — código e estilos (`app.src.js`, `index.template.html` e os arquivos `.css`).
- `testes/` — testes automáticos de responsividade, funcionamento e segurança.
- `build.py` — monta os arquivos do site a partir da pasta `fonte/`.

Os dados do catálogo (camisas, preços, estoque, conferência) ficam dentro do `index.html` publicado
e são alterados pelo painel em `https://rksportstyle.github.io/#admin`.
Antes de qualquer mudança de visual, os dados atuais devem ser lidos desse `index.html` para não serem perdidos.
