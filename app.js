/* RK SPORT STYLE — catálogo digital + painel administrativo
   Os dados ficam no bloco <script id="rk-dados"> do index.html. O painel (#admin) só salva para quem
   tem permissão de edição do site: ele gera um novo index.html com os dados e publica uma nova versão.
   Códigos internos (RK-001…) existem só no painel; o público nunca os vê. */
(function () {
  "use strict";

  var RK_TEMPLATE = "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>RK Sport Style<\/title>\n<meta name=\"description\" content=\"RK Sport Style: catálogo de camisetas de futebol de clubes e seleções. Veja o que está disponível e consulte pelo WhatsApp.\">\n<meta name=\"theme-color\" content=\"#ffffff\">\n<meta name=\"format-detection\" content=\"telephone=no\">\n<link rel=\"icon\" type=\"image/png\" href=\"img/icone-192.png\">\n<link rel=\"apple-touch-icon\" href=\"img/icone-180.png\">\n<meta property=\"og:type\" content=\"website\">\n<meta property=\"og:locale\" content=\"pt_BR\">\n<meta property=\"og:site_name\" content=\"RK Sport Style\">\n<meta property=\"og:title\" content=\"RK Sport Style · Catálogo de camisetas de futebol\">\n<meta property=\"og:description\" content=\"Camisas de clubes e seleções. Veja o que está pronto para entrega e consulte pelo WhatsApp.\">\n<meta property=\"og:image\" content=\"https://rksportstyle.github.io/img/compartilhar.jpg\">\n<meta property=\"og:image:width\" content=\"1200\">\n<meta property=\"og:image:height\" content=\"630\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">\n<link rel=\"stylesheet\" href=\"app.css\">\n<link rel=\"preload\" href=\"fonts/anton-latin-400-normal.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>\n<\/head>\n<body>\n<noscript><p style=\"padding:24px;color:#0b0b0c;background:#fff;font:16px sans-serif\">Para ver o catálogo, ative o JavaScript do navegador.<\/p><\/noscript>\n<a class=\"pular\" href=\"#conteudo\">Pular para o conteúdo<\/a>\n\n<header class=\"topo\" id=\"topo\">\n  <div class=\"envelope barra\">\n    <button type=\"button\" class=\"topo-icone topo-menu\" id=\"abrir-menu\" aria-label=\"Abrir menu de categorias\" aria-controls=\"gaveta\" aria-expanded=\"false\">\n      <svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><path d=\"M4 7h16M4 12h16M4 17h10\"/><\/svg>\n    <\/button>\n    <a class=\"marca\" href=\"#inicio\" aria-label=\"RK Sport Style, página inicial\">\n      <img src=\"img/rk_full_escuro.png\" alt=\"\" width=\"46\" height=\"36\">\n      <span aria-hidden=\"true\">RK Sportstyle<\/span>\n    <\/a>\n    <nav class=\"topo-nav\" aria-label=\"Principal\">\n      <a class=\"topo-link\" href=\"#pronta-entrega\">Pronta entrega<\/a>\n      <a class=\"topo-link\" href=\"#sob-encomenda\">Sob encomenda<\/a>\n      <button type=\"button\" class=\"topo-link\" id=\"botao-categorias\" aria-expanded=\"false\" aria-controls=\"megamenu\">Categorias\n        <svg class=\"icone seta\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"/><\/svg>\n      <\/button>\n    <\/nav>\n    <form class=\"busca busca-topo\" id=\"busca-form\" role=\"search\" data-busca>\n      <label class=\"so-leitor\" for=\"busca-topo\">Pesquisar camisetas, clubes, seleções ou jogadores<\/label>\n      <svg class=\"icone lupa\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-3.5-3.5\"/><\/svg>\n      <input type=\"search\" id=\"busca-topo\" placeholder=\"Buscar clube, seleção ou jogador\" autocomplete=\"off\" enterkeyhint=\"search\">\n    <\/form>\n    <button type=\"button\" class=\"topo-icone abrir-busca\" id=\"abrir-busca\" aria-label=\"Pesquisar\" aria-controls=\"busca-form\" aria-expanded=\"false\">\n      <svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.8\" aria-hidden=\"true\"><circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m20 20-3.5-3.5\"/><\/svg>\n    <\/button>\n    <a class=\"topo-wa\" data-wa href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">\n      <svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1c-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z\"/><\/svg>\n      <span class=\"wa-texto\">WhatsApp<\/span><span class=\"so-leitor\"> (abre em nova aba)<\/span>\n    <\/a>\n  <\/div>\n  <div class=\"megamenu\" id=\"megamenu\" hidden>\n    <div class=\"envelope\" id=\"megamenu-conteudo\"><\/div>\n  <\/div>\n<\/header>\n\n<!-- menu do celular -->\n<dialog class=\"gaveta\" id=\"gaveta\" aria-label=\"Menu\">\n  <div class=\"gaveta-topo\">\n    <img src=\"img/rk_full_escuro.png\" alt=\"RK Sport Style\" width=\"51\" height=\"40\">\n    <button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button>\n  <\/div>\n  <nav class=\"gaveta-corpo\" id=\"gaveta-corpo\" aria-label=\"Categorias\"><\/nav>\n<\/dialog>\n\n<main id=\"inicio\">\n  <span id=\"conteudo\" tabindex=\"-1\"><\/span>\n  <div id=\"vista\"><\/div>\n<\/main>\n\n<footer class=\"rodape\">\n  <div class=\"envelope\">\n    <div class=\"rodape-grade\">\n      <div class=\"rodape-marca\">\n        <img src=\"img/rk_full_escuro.png\" alt=\"Logo da RK Sport Style\" width=\"82\" height=\"64\">\n        <p>Camisetas de clubes e seleções para quem vive o futebol. Escolha a sua no catálogo e fale com a gente pelo WhatsApp.<\/p>\n        <div class=\"rodape-botoes\">\n          <a class=\"botao pequeno\" data-wa href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">WhatsApp<span class=\"so-leitor\"> (abre em nova aba)<\/span><\/a>\n          <a class=\"botao contorno pequeno\" data-ig href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">Instagram<span class=\"so-leitor\"> (abre em nova aba)<\/span><\/a>\n        <\/div>\n      <\/div>\n      <nav aria-labelledby=\"rod-cat\"><h2 class=\"rodape-titulo\" id=\"rod-cat\">Categorias<\/h2><ul class=\"rodape-lista\" id=\"rodape-categorias\"><\/ul><\/nav>\n      <nav aria-labelledby=\"rod-cat2\"><h2 class=\"rodape-titulo\" id=\"rod-cat2\">Catálogo<\/h2>\n        <ul class=\"rodape-lista\">\n          <li><a href=\"#pronta-entrega\">Pronta entrega<\/a><\/li>\n          <li><a href=\"#sob-encomenda\">Sob encomenda<\/a><\/li>\n          <li><a href=\"#todas\">Todas as camisetas<\/a><\/li>\n        <\/ul>\n      <\/nav>\n      <div>\n        <h2 class=\"rodape-titulo\">Como funciona<\/h2>\n        <p class=\"rodape-texto\">Este site é um <b>catálogo digital<\/b>: não vendemos pelo site. Escolha o modelo, toque em <b>Consultar pelo WhatsApp<\/b> e combinamos disponibilidade, tamanho, valor e entrega por lá.<\/p>\n      <\/div>\n    <\/div>\n    <div class=\"rodape-base\">\n      <nav class=\"links-legais\" aria-label=\"Documentos legais\">\n        <a href=\"#privacidade\">Privacidade<\/a>\n        <a href=\"#termos\">Termos de uso<\/a>\n        <a href=\"#trocas\">Trocas e devoluções<\/a>\n        <a href=\"#cookies\">Cookies<\/a>\n      <\/nav>\n      <small>© 2026 RK Sport Style · Fotos ilustrativas. Marcas, nomes e escudos de clubes pertencem aos seus titulares.<\/small>\n    <\/div>\n  <\/div>\n<\/footer>\n\n<!-- visualização da camisa -->\n<dialog class=\"ficha\" id=\"ficha\" aria-labelledby=\"ficha-nome\">\n  <nav class=\"ficha-menu\" aria-label=\"Menu do catálogo\">\n    <a class=\"fm-marca\" href=\"#inicio\"><img src=\"img/rk_full_escuro.png\" alt=\"RK Sport Style: página inicial\" width=\"809\" height=\"631\"><\/a>\n    <div class=\"fm-links\">\n      <a href=\"#inicio\">Início<\/a>\n      <a href=\"#pronta-entrega\">Pronta entrega<\/a>\n      <a href=\"#sob-encomenda\">Sob encomenda<\/a>\n      <button type=\"button\" data-ficha-categorias>Categorias<\/button>\n    <\/div>\n  <\/nav>\n  <div class=\"corpo\">\n    <div class=\"vitrine\">\n      <img id=\"ficha-img\" src=\"data:,\" alt=\"\">\n      <button type=\"button\" class=\"nav ant\" id=\"ficha-ant\" aria-label=\"Camiseta anterior\"><svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" aria-hidden=\"true\"><path d=\"m15 5-7 7 7 7\"/><\/svg><\/button>\n      <button type=\"button\" class=\"nav prox\" id=\"ficha-prox\" aria-label=\"Próxima camiseta\"><svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" aria-hidden=\"true\"><path d=\"m9 5 7 7-7 7\"/><\/svg><\/button>\n      <div class=\"miniaturas\" id=\"ficha-fotos\"><\/div>\n    <\/div>\n    <div class=\"info\">\n      <div class=\"topo-info\">\n        <span class=\"selo\" id=\"ficha-status\"><\/span>\n        <button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button>\n      <\/div>\n      <p class=\"etiqueta\" id=\"ficha-cat\"><\/p>\n      <h2 id=\"ficha-nome\"><\/h2>\n      <p class=\"sub\" id=\"ficha-sub\"><\/p>\n      <div class=\"preco-grande\" id=\"ficha-preco\"><\/div>\n      <dl id=\"ficha-dados\"><\/dl>\n      <p class=\"aviso-status\" id=\"ficha-aviso-status\"><\/p>\n      <div class=\"cta\">\n        <a class=\"botao\" id=\"ficha-wa\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">\n          <svg class=\"icone\" viewBox=\"0 0 24 24\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z\"/><\/svg>\n          Consultar pelo WhatsApp<span class=\"so-leitor\"> (abre em nova aba)<\/span>\n        <\/a>\n      <\/div>\n      <p class=\"aviso\" id=\"ficha-wa-aviso\" hidden><\/p>\n      <p class=\"aviso\">Foto ilustrativa do modelo. Nada é comprado pelo site.<\/p>\n    <\/div>\n  <\/div>\n<\/dialog>\n\n<!-- filtros no celular -->\n<dialog class=\"gaveta gaveta-filtros\" id=\"gaveta-filtros\" aria-labelledby=\"t-filtros\">\n  <div class=\"gaveta-topo\"><h2 id=\"t-filtros\">Filtros<\/h2><button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button><\/div>\n  <div class=\"gaveta-corpo\" id=\"filtros-celular\"><\/div>\n  <div class=\"gaveta-rodape\"><button type=\"button\" class=\"botao\" id=\"aplicar-filtros\">Ver camisetas<\/button><\/div>\n<\/dialog>\n\n<!-- aviso de cookies -->\n<section class=\"cookies\" id=\"aviso-cookies\" aria-labelledby=\"cookies-titulo\" hidden>\n  <h2 id=\"cookies-titulo\">Sua privacidade<\/h2>\n  <p>Usamos só o armazenamento <strong>essencial<\/strong> para lembrar a sua escolha. Não usamos cookies de estatística nem de publicidade; se um dia usarmos, só com a sua permissão. <a href=\"#privacidade\">Saiba mais<\/a>.<\/p>\n  <div class=\"acoes-cookie\">\n    <button type=\"button\" class=\"botao pequeno\" data-consentir=\"tudo\">Aceitar todos<\/button>\n    <button type=\"button\" class=\"botao contorno pequeno\" data-consentir=\"essenciais\">Só essenciais<\/button>\n    <a class=\"botao contorno pequeno\" href=\"#cookies\">Personalizar<\/a>\n  <\/div>\n<\/section>\n\n<dialog class=\"doc\" id=\"dlg-cookies\" aria-labelledby=\"t-cookies\">\n  <div class=\"doc-topo\"><h2 id=\"t-cookies\">Preferências de cookies<\/h2><button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button><\/div>\n  <div class=\"doc-corpo\">\n    <p>Escolha o que este site pode usar no seu navegador. Você pode mudar isso quando quiser pelo link no rodapé.<\/p>\n    <div class=\"categoria\"><div class=\"linha-cat\"><span>Essenciais<\/span><span class=\"etiqueta\">Sempre ativos<\/span><\/div><p>Guardam só a sua escolha sobre cookies (chave <code>rk_consentimento<\/code>). Não identificam você.<\/p><\/div>\n    <div class=\"categoria\"><label class=\"linha-cat chave\" for=\"ck-estatistica\"><span>Estatística<\/span><input type=\"checkbox\" id=\"ck-estatistica\"><\/label><p>Medem visitas para melhorar o site. <b>Nenhuma ferramenta desta categoria está ativa.<\/b><\/p><\/div>\n    <div class=\"categoria\"><label class=\"linha-cat chave\" for=\"ck-marketing\"><span>Marketing<\/span><input type=\"checkbox\" id=\"ck-marketing\"><\/label><p>Permitiriam anúncios personalizados. <b>Nenhuma ferramenta desta categoria está ativa.<\/b><\/p><\/div>\n    <div class=\"acoes-doc\">\n      <button type=\"button\" class=\"botao pequeno\" id=\"salvar-cookies\">Salvar minhas escolhas<\/button>\n      <button type=\"button\" class=\"botao contorno pequeno\" data-consentir=\"essenciais\">Só essenciais<\/button>\n      <button type=\"button\" class=\"botao contorno pequeno\" data-consentir=\"tudo\">Aceitar todos<\/button>\n    <\/div>\n    <p class=\"status-msg\" id=\"status-cookies\" role=\"status\"><\/p>\n  <\/div>\n<\/dialog>\n\n<dialog class=\"doc\" id=\"dlg-privacidade\" aria-labelledby=\"t-privacidade\">\n  <div class=\"doc-topo\"><h2 id=\"t-privacidade\">Política de privacidade<\/h2><button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button><\/div>\n  <div class=\"doc-corpo\">\n    <p class=\"atualizado\">Última atualização: <span data-empresa=\"atualizado\"><\/span><\/p>\n    <p>Como a RK Sport Style trata dados pessoais neste catálogo e no atendimento pelo WhatsApp, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).<\/p>\n    <h3>1. Responsável<\/h3>\n    <p>Controlador: RK Sport Style<span data-se=\"razao\"> (<span data-empresa=\"razao\"><\/span>)<\/span><span data-se=\"cnpj\">, CNPJ <span data-empresa=\"cnpj\"><\/span><\/span><span data-se=\"endereco\">, endereço <span data-empresa=\"endereco\"><\/span><\/span>. Contato sobre seus dados: <span data-se=\"whatsapp\">WhatsApp <span data-cfg=\"whatsapp-texto\"><\/span> ou <\/span>Instagram <span data-cfg=\"instagram-texto\">@rk_sportstyle<\/span><span data-se=\"email\"> ou e-mail <span data-empresa=\"email\"><\/span><\/span>.<\/p>\n    <h3>2. O que este site coleta<\/h3>\n    <ul>\n      <li><b>Nada para navegar:<\/b> o catálogo não tem cadastro, formulário, carrinho nem pagamento. Pesquisa e filtros funcionam só no seu aparelho.<\/li>\n      <li><b>Sua escolha sobre cookies:<\/b> guardada no armazenamento local do seu navegador, sem identificar você.<\/li>\n      <li><b>Dados técnicos de acesso:<\/b> o serviço que hospeda a página pode registrar dados técnicos (como IP, data e navegador) para funcionamento e segurança, conforme as regras desse provedor.<\/li>\n      <li><b>Sem rastreadores:<\/b> o site não usa Google Analytics, Meta Pixel nem carrega scripts ou fontes de terceiros.<\/li>\n    <\/ul>\n    <h3>3. Atendimento pelo WhatsApp<\/h3>\n    <p>Ao tocar em “Consultar pelo WhatsApp”, o aplicativo abre com uma mensagem pronta sobre a camiseta. Nada é enviado até você mandar a mensagem. A partir daí, a RK recebe seu número, nome de perfil e o que você escrever, e usa esses dados só para responder, combinar e entregar o pedido e cumprir obrigações legais (LGPD, art. 7º, II e V). As conversas também são tratadas pelo WhatsApp (Meta), conforme a política dele.<\/p>\n    <h3>4. Compartilhamento<\/h3>\n    <p>Somente com quem for necessário para concluir um pedido: <span data-empresa=\"parceiros\"><\/span>. Não vendemos dados pessoais.<\/p>\n    <h3>5. Guarda e segurança<\/h3>\n    <p>Guardamos dados de atendimento apenas pelo tempo necessário para o pedido, a garantia e as obrigações legais. Nunca pedimos senhas, e dados de pagamento não devem ser enviados em mensagem aberta.<\/p>\n    <h3>6. Seus direitos<\/h3>\n    <p>Você pode pedir confirmação, acesso, correção, eliminação, portabilidade, informação sobre compartilhamento e revogação de consentimento (art. 18 da LGPD) pelos canais do item 1, e pode reclamar à ANPD.<\/p>\n    <h3>7. Mudanças<\/h3>\n    <p>Atualizações desta política serão publicadas aqui, com a data.<\/p>\n  <\/div>\n<\/dialog>\n\n<dialog class=\"doc\" id=\"dlg-termos\" aria-labelledby=\"t-termos\">\n  <div class=\"doc-topo\"><h2 id=\"t-termos\">Termos de uso<\/h2><button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button><\/div>\n  <div class=\"doc-corpo\">\n    <p class=\"atualizado\">Última atualização: <span data-empresa=\"atualizado\"><\/span><\/p>\n    <h3>1. O que é este site<\/h3>\n    <p>Um catálogo digital da RK Sport Style<span data-se=\"razao\"> (<span data-empresa=\"razao\"><\/span>)<\/span><span data-se=\"cnpj\">, CNPJ <span data-empresa=\"cnpj\"><\/span><\/span>. <b>Não há venda pelo site<\/b>: não existe carrinho, pagamento nem cadastro. Pedidos são combinados pelo WhatsApp.<\/p>\n    <h3>2. Informações dos produtos<\/h3>\n    <p>As fotos são <b>ilustrativas<\/b> do modelo. “Pronta entrega” indica camiseta em estoque, pronta para entrega, e “Sob encomenda” indica modelo que pode ser pedido, com prazo e valor confirmados no WhatsApp. Disponibilidade, tamanhos, preço final, frete e prazo são informados antes da compra (arts. 30 e 31 do Código de Defesa do Consumidor). Em caso de diferença, vale o que for confirmado no atendimento.<\/p>\n    <h3>3. Marcas de terceiros<\/h3>\n    <p>Nomes, escudos e marcas de clubes, seleções, competições e patrocinadores pertencem aos seus titulares e aparecem só para identificar os produtos. <span data-empresa=\"licenca\"><\/span><\/p>\n    <h3>4. Responsabilidades<\/h3>\n    <ul>\n      <li>A RK informa de forma clara as condições de cada produto antes da compra e respeita os direitos do consumidor.<\/li>\n      <li>Quem usa o site se compromete a não usá-lo para fins ilegais e a informar dados corretos no atendimento.<\/li>\n    <\/ul>\n    <h3>5. Propriedade intelectual<\/h3>\n    <p>A marca e a logo RK Sport Style pertencem à RK Sport Style e não podem ser usadas comercialmente sem autorização.<\/p>\n    <h3>6. Lei aplicável<\/h3>\n    <p>Legislação brasileira, incluindo o Código de Defesa do Consumidor. Disputas podem ser levadas ao foro do domicílio do consumidor.<\/p>\n  <\/div>\n<\/dialog>\n\n<dialog class=\"doc\" id=\"dlg-trocas\" aria-labelledby=\"t-trocas\">\n  <div class=\"doc-topo\"><h2 id=\"t-trocas\">Trocas e devoluções<\/h2><button type=\"button\" class=\"fechar\" data-fechar>Fechar<\/button><\/div>\n  <div class=\"doc-corpo\">\n    <p class=\"atualizado\">Última atualização: <span data-empresa=\"atualizado\"><\/span><\/p>\n    <p>Na RK Sport Style, o tamanho é confirmado com você <b>antes<\/b> de fechar o pedido. Mandamos as medidas e tiramos todas as dúvidas para você escolher com segurança.<\/p>\n    <h3>1. Troca por tamanho ou gosto<\/h3>\n    <p><b>Não fazemos troca nem devolução por tamanho escolhido ou por gosto.<\/b> Como o tamanho é conferido junto com você antes do pedido, confirme as medidas com calma antes de fechar.<\/p>\n    <h3>2. Produto com defeito de fabricação<\/h3>\n    <p>Se a peça chegar com defeito de fabricação, avise a gente <b>assim que perceber<\/b>, com fotos do defeito. Fazemos a <b>troca<\/b> pela mesma peça ou, se não houver reposição, a <b>devolução do valor<\/b>. Nesses casos, o frete é por nossa conta.<\/p>\n    <h3>3. Produto diferente do combinado<\/h3>\n    <p>Se chegar um modelo ou tamanho diferente do que foi confirmado com você, o erro é nosso: corrigimos sem custo.<\/p>\n    <h3>4. Como pedir<\/h3>\n    <p>Fale com a gente pelo <span data-se=\"whatsapp\">WhatsApp <span data-cfg=\"whatsapp-texto\"><\/span> ou pelo <\/span>Instagram <span data-cfg=\"instagram-texto\">@rk_sportstyle<\/span>, informando o pedido e enviando fotos da peça.<\/p>\n    <p>Os seus direitos previstos no Código de Defesa do Consumidor continuam garantidos.<\/p>\n  <\/div>\n<\/dialog>\n\n<!-- painel administrativo: só funciona para a conta dona do site -->\n<div class=\"painel\" id=\"painel\" hidden><\/div>\n<dialog class=\"editor\" id=\"editor\" aria-labelledby=\"editor-titulo\"><\/dialog>\n\n<div class=\"contato-flutuante\" id=\"contato-flutuante\">\n  <a class=\"flut-bt flut-ig\" data-ig href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Instagram @rk_sportstyle (abre em nova aba)\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.9\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4.2\"/><circle cx=\"17.4\" cy=\"6.6\" r=\"1.1\" fill=\"currentColor\" stroke=\"none\"/><\/svg><span class=\"flut-dica\" aria-hidden=\"true\">Instagram<\/span><\/a>\n  <a class=\"flut-bt flut-wa\" data-wa href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\" aria-label=\"Falar no WhatsApp (abre em nova aba)\"><svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z\"/><\/svg><span class=\"flut-dica\" aria-hidden=\"true\">WhatsApp<\/span><\/a>\n<\/div>\n<div class=\"aviso-flut\" id=\"aviso-flut\" role=\"status\" aria-live=\"polite\" hidden><\/div>\n<script type=\"application/json\" id=\"rk-dados\">/*RK_DADOS*/<\/script>\n<script src=\"app.js\"><\/script>\n<\/body>\n<\/html>\n";

  var $ = function (id) { return document.getElementById(id); };
  /* ---------------- compatibilidade: janelas (dialog), gap em flex e WebP */
  var raiz = document.documentElement;
  (function () {
    var nativo = typeof window.HTMLDialogElement === "function" && typeof HTMLDialogElement.prototype.showModal === "function";
    if (nativo && !window.__rkSemDialog) return;
    raiz.className += " sem-dialog";
    var pilha = [], fundo = document.createElement("div");
    fundo.className = "dlg-fundo"; fundo.hidden = true; document.body.appendChild(fundo);
    function evento(nome, cancelavel) { var ev; try { ev = new Event(nome, { cancelable: !!cancelavel }); } catch (e) { ev = document.createEvent("Event"); ev.initEvent(nome, false, !!cancelavel); } return ev; }
    function atualizar() {
      fundo.hidden = !pilha.length;
      fundo.style.zIndex = String(1000 + Math.max(0, pilha.length - 1) * 2);
      pilha.forEach(function (d, i) { d.style.zIndex = String(1001 + i * 2); });
      if (pilha.length) { if (raiz.className.indexOf("dlg-aberto") < 0) raiz.className += " dlg-aberto"; }
      else raiz.className = raiz.className.replace(/\s*dlg-aberto/g, "");
    }
    Array.prototype.forEach.call(document.querySelectorAll("dialog"), function (d) {
      try { Object.defineProperty(d, "open", { configurable: true, get: function () { return d.hasAttribute("open"); }, set: function (v) { if (v) d.setAttribute("open", ""); else d.removeAttribute("open"); } }); } catch (e) {}
      d.showModal = d.show = function () {
        if (d.hasAttribute("open")) return;
        d.setAttribute("open", ""); d.setAttribute("aria-modal", "true"); if (!d.getAttribute("role")) d.setAttribute("role", "dialog");
        pilha.push(d); atualizar();
        var f = d.querySelector("[autofocus], [data-fechar], button, a[href], input, select, textarea");
        if (f) { try { f.focus(); } catch (e) {} }
      };
      d.close = function () {
        if (!d.hasAttribute("open")) return;
        d.removeAttribute("open"); var i = pilha.indexOf(d); if (i > -1) pilha.splice(i, 1); atualizar();
        d.dispatchEvent(evento("close"));
      };
    });
    fundo.addEventListener("click", function () { var d = pilha[pilha.length - 1]; if (d) d.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
    document.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && pilha.length) { var d = pilha[pilha.length - 1]; if (d.dispatchEvent(evento("cancel", true))) d.close(); }
    });
  })();
  (function () {
    var t = document.createElement("div"); t.style.display = "flex"; t.style.flexDirection = "column"; t.style.rowGap = "1px";
    t.appendChild(document.createElement("div")); t.appendChild(document.createElement("div"));
    document.body.appendChild(t); var tem = t.scrollHeight === 1; document.body.removeChild(t);
    if (!tem) raiz.className += " sem-gap-flex";
  })();
  var SEM_WEBP = !!window.__rkSemWebp;
  if (SEM_WEBP) raiz.className += " sem-webp";
  function caminhoImg(c) { return SEM_WEBP && c && c.indexOf("data:") !== 0 ? c.replace(/\.webp$/, ".jpg") : c; }
  (function () {
    if (SEM_WEBP) return;
    var t = new Image();
    t.onerror = trocar; t.onload = function () { if (!(t.width > 0)) trocar(); };
    t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
    function trocar() {
      SEM_WEBP = true; raiz.className += " sem-webp";
      Array.prototype.forEach.call(document.querySelectorAll("[data-bg]"), function (el) { el.setAttribute("data-bg", caminhoImg(el.getAttribute("data-bg"))); });
      Array.prototype.forEach.call(document.querySelectorAll(".miniatura"), function (el) { if (el.style.backgroundImage) el.style.backgroundImage = el.style.backgroundImage.replace(/\.webp/g, ".jpg"); });
      Array.prototype.forEach.call(document.querySelectorAll("img"), function (el) { var s = el.getAttribute("src") || ""; if (/\.webp$/.test(s)) el.setAttribute("src", s.replace(/\.webp$/, ".jpg")); });
    }
  })();

  var DADOS;
  try { DADOS = JSON.parse($("rk-dados").textContent); }
  catch (e) { DADOS = { config: {}, produtos: [] }; console.error("Dados do catálogo inválidos", e); }
  var MSG_PADRAO = "Olá! Tenho interesse na camiseta {nome}. Poderia me passar mais informações?\n{link}";
  normalizar(DADOS);

  var STATUS = { disponivel: "Pronta entrega", encomenda: "Sob encomenda", indisponivel: "Indisponível" };
  var ORDEM_STATUS = { disponivel: 0, encomenda: 1, indisponivel: 2 };
  var GRUPOS = { brasileiro: "Clube brasileiro", estrangeiro: "Clube estrangeiro", selecao: "Seleção", classificar: "A classificar" };
  var POR_PAGINA = 60;
  var DIAS_NOVIDADE = 45;

  (function () {
    var m = document.querySelector('meta[name="rk-site"]');
    if (m && window.top !== window.self) {
      /* proteção contra clickjacking: o site não funciona dentro de outra página */
      document.body.innerHTML = '<p style="font:16px sans-serif;padding:24px"><a href="' + location.href.replace(/"/g, "%22") + '" target="_top" rel="noopener">Abrir o site da RK Sport Style</a></p>';
      throw new Error("RK: exibição dentro de outro site bloqueada");
    }
  })();
  function normalizar(d) {
    d.config = d.config || {};
    d.produtos = d.produtos || [];
    d.conferencia = d.conferencia || [];
    var c = d.config;
    if (!c.mensagem || /\(código \{codigo\}\)/.test(c.mensagem) || c.mensagem === "Olá! Tenho interesse na camisa {nome}. Poderia me passar mais informações?\n{link}") c.mensagem = MSG_PADRAO;
    if (c.urlSite === undefined) c.urlSite = "";
    /* segurança: só aceita caminhos de imagem do próprio site ou fotos enviadas pelo painel */
    var IMG_OK = /^img\/[a-z0-9_\/.-]+\.(webp|jpe?g|png)$/i, DATA_OK = /^data:image\/(png|jpe?g|webp);base64,[a-z0-9+\/=]+$/i;
    c.whatsapp = String(c.whatsapp || "").replace(/\D/g, "").slice(0, 15);
    c.instagram = /^[a-z0-9._]{1,30}$/i.test(String(c.instagram || "").replace(/^@/, "")) ? String(c.instagram).replace(/^@/, "") : "";
    if (c.urlSite && !/^https:\/\/[^\s"'<>]+$/i.test(c.urlSite)) c.urlSite = "";
    d.conferencia.forEach(function (x) { if (x.ref && !IMG_OK.test(x.ref)) x.ref = ""; });
    d.produtos.forEach(function (p) {
      if (["disponivel", "encomenda", "indisponivel"].indexOf(p.status) < 0) p.status = "encomenda";
      p.imgs = (p.imgs || []).filter(function (im) { return im && ((im.c && IMG_OK.test(im.c)) || (im.data && DATA_OK.test(im.data))); });
      if (p.nome === undefined) p.nome = "";
      if (p.oculto === undefined) p.oculto = false;
      if (p.novidade === undefined) p.novidade = false;
      if (p.criado === undefined) p.criado = null;
      if (p.qtd === undefined) p.qtd = null;
      if (p.conferir === undefined) p.conferir = "";
      if (!p.comp) p.comp = [];
      if (!p.tamanhos) p.tamanhos = [];
      if (!p.imgs) p.imgs = [];
    });
  }

  /* ---------------- utilidades */
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function norm(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function slug(s) { return norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function moeda(v) { return (typeof v === "number" && isFinite(v)) ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : ""; }
  function lerPreco(t) {
    t = String(t || "").replace(/[^\d,.]/g, "");
    if (!t) return null;
    if (t.indexOf(",") > -1) t = t.replace(/\./g, "").replace(",", ".");
    var v = parseFloat(t);
    return isFinite(v) ? Math.round(v * 100) / 100 : null;
  }
  function soDigitos(s) { return String(s || "").replace(/\D/g, ""); }
  function reduzMovimento() { return matchMedia("(prefers-reduced-motion: reduce)").matches; }
  function rolarPara(y) { try { window.scrollTo({ top: y, behavior: reduzMovimento() ? "auto" : "smooth" }); } catch (e) { window.scrollTo(0, y); } }
  var SETA = '<svg class="icone seta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true" style="width:16px;height:16px"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';

  function nomeProduto(p) { return p.nome || p.clube || "Camisa de futebol"; }
  function detalhes(p) {
    var d = [];
    if (p.modelo) d.push(p.modelo);
    if (p.tipo) d.push(p.tipo);
    if (p.costas) d.push("Costas: " + p.costas);
    return d.join(" · ");
  }
  function nomeCompleto(p) {
    var n = nomeProduto(p);
    if (p.modelo && n.indexOf(p.modelo) < 0) n += " " + p.modelo;
    var extra = [p.tipo, p.costas ? "costas " + p.costas : ""].filter(Boolean).join(", ");
    return extra ? n + " (" + extra + ")" : n;
  }
  /* endereço público da camisa, sem o código interno */
  function chavePublica(p) {
    var n = parseInt(String(p.id).replace(/\D/g, ""), 10) || 0, h = (n * 2654435761) >>> 0;
    return "camisa-" + (slug(nomeProduto(p)) || "modelo") + "-" + (h % 1679616).toString(36);
  }
  function eNovidade(p) {
    if (p.novidade) return true;
    return !!(p.criado && (Date.now() - p.criado) < DIAS_NOVIDADE * 864e5);
  }

  /* ---------------- imagens */
  var SPRITE_COLS = 8;
  function htmlMini(img, classe) {
    if (!img) return "";
    classe = "miniatura" + (classe ? " " + classe : "");
    if (img.data) return '<img class="' + classe + (img.real ? " real" : "") + '" src="' + img.data + '" alt="" loading="lazy" decoding="async">';
    if (img.c && img.cel == null) return '<img class="' + classe + (img.real ? " real" : "") + '" src="' + caminhoImg(img.c) + '" alt="" loading="lazy" decoding="async">';
    var col = img.cel % SPRITE_COLS, lin = Math.floor(img.cel / SPRITE_COLS);
    var px = col / (SPRITE_COLS - 1) * 100, py = lin / (SPRITE_COLS - 1) * 100;
    return '<div class="' + classe + '" data-bg="' + caminhoImg("img/s/s" + img.sp + ".webp") + '" style="background-size:' + SPRITE_COLS * 100 + "% " + SPRITE_COLS * 100 + "%;background-position:" + px.toFixed(4) + "% " + py.toFixed(4) + '%"></div>';
  }
  function srcGrande(img) { return img ? (img.data || caminhoImg(img.c)) : ""; }
  var observador = "IntersectionObserver" in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (e) {
      if (e.isIntersecting) { carregarFundo(e.target); observador.unobserve(e.target); }
    });
  }, { rootMargin: "400px 0px" }) : null;
  var fundosProntos = {};
  function carregarFundo(el) {
    var url = el.getAttribute("data-bg"); el.removeAttribute("data-bg");
    el.style.backgroundImage = "url(" + url + ")";
    if (fundosProntos[url]) { el.className += " pronta"; return; }
    var im = new Image();
    im.onload = im.onerror = function () { fundosProntos[url] = 1; Array.prototype.forEach.call(document.querySelectorAll(".miniatura:not(.pronta)"), function (x) { if (x.style.backgroundImage.indexOf(url) > -1) x.className += " pronta"; }); };
    im.src = url;
  }
  function ativarMiniaturas(raiz) {
    (raiz || document).querySelectorAll(".miniatura[data-bg]").forEach(function (el) {
      if (observador) observador.observe(el);
      else carregarFundo(el);
    });
    if (typeof iniciarRevelar === "function") iniciarRevelar(raiz);
  }

  /* ---------------- categorias */
  function montarCategorias(dados) {
    var c = dados.config || {}, d = c.destaques || {};
    var dBr = d.brasil || [], dInt = d.internacionais || [], dSel = d.selecoes || [];
    var ligas = c.ligas || [], comps = c.competicoes || [];
    function igual(a, b) { return norm(a) === norm(b); }
    function em(lista, v) { return lista.some(function (x) { return igual(x, v); }); }
    function clubes(grupo, dest, filtroExtra) {
      var n = {};
      (dados.produtos || []).forEach(function (p) { if (p.grupo === grupo && p.clube && !p.oculto && (!filtroExtra || filtroExtra(p))) n[p.clube] = (n[p.clube] || 0) + 1; });
      var lista = Object.keys(n).sort(function (x, y) {
        var dx = dest.findIndex(function (t) { return igual(t, x); }), dy = dest.findIndex(function (t) { return igual(t, y); });
        if (dx < 0) dx = 999; if (dy < 0) dy = 999;
        return dx - dy || n[y] - n[x] || x.localeCompare(y, "pt-BR");
      });
      return lista.map(function (t) { return { id: slug(t), nome: t, f: function (p) { return igual(p.clube, t); } }; });
    }
    return [
      { id: "pronta", nome: "Pronta entrega", f: function (p) { return p.status === "disponivel"; }, subs: [] },
      { id: "brasil", nome: "Brasil", f: function (p) { return p.grupo === "brasileiro"; },
        subs: [{ id: "brasileirao", nome: "Brasileirão", f: function () { return true; } }].concat(clubes("brasileiro", dBr)) },
      { id: "europa", nome: "Europa", f: function (p) { return p.grupo === "estrangeiro" && em(ligas, p.liga); },
        subs: ligas.map(function (l) { return { id: slug(l), nome: l, f: function (p) { return igual(p.liga, l); } }; }) },
      { id: "internacionais", nome: "Clubes internacionais", f: function (p) { return p.grupo === "estrangeiro"; }, subs: clubes("estrangeiro", dInt) },
      { id: "selecoes", nome: "Seleções", f: function (p) { return p.grupo === "selecao"; }, subs: clubes("selecao", dSel) },
      { id: "competicoes", nome: "Competições", f: function (p) { return (p.comp || []).length > 0; },
        subs: comps.map(function (k) { return { id: slug(k), nome: k, f: function (p) { return (p.comp || []).some(function (x) { return igual(x, k); }); } }; }) },
      { id: "outros", nome: "Outros modelos", f: function (p) { return p.grupo === "classificar"; }, subs: [] }
    ];
  }
  var CATS = montarCategorias(DADOS);
  function cat(id) { return CATS.filter(function (c) { return c.id === id; })[0] || null; }
  function sub(c, id) { return c && id ? c.subs.filter(function (s) { return s.id === id; })[0] || null : null; }

  /* ---------------- dados públicos */
  function visiveis() {
    var ind = !!DADOS.config.mostrarIndisponiveis;
    return DADOS.produtos.filter(function (p) { return !p.oculto && p.imgs && p.imgs.length && (ind || p.status !== "indisponivel"); });
  }
  function ordenar(lista, modo) {
    var l = lista.slice();
    l.sort(function (a, b) {
      if (modo === "az") return nomeProduto(a).localeCompare(nomeProduto(b), "pt-BR");
      if (modo === "recentes") return (b.criado || 0) - (a.criado || 0) || (ORDEM_STATUS[a.status] - ORDEM_STATUS[b.status]);
      return (ORDEM_STATUS[a.status] - ORDEM_STATUS[b.status]) || ((a.grupo === "classificar") - (b.grupo === "classificar")) || ((b.criado || 0) - (a.criado || 0)) || a.id.localeCompare(b.id);
    });
    return l;
  }
  function bate(p, q) {
    if (!q) return true;
    var alvo = norm([nomeProduto(p), p.clube, p.liga, p.modelo, p.tipo, p.costas, (p.comp || []).join(" "), STATUS[p.status], p.grupo === "selecao" ? "selecao" : "", p.grupo === "brasileiro" ? "brasil" : ""].join(" "));
    return norm(q).split(/\s+/).every(function (t) { return alvo.indexOf(t) > -1; });
  }
  function contagens(lista) {
    var c = { disponivel: 0, encomenda: 0, indisponivel: 0 };
    lista.forEach(function (p) { c[p.status]++; });
    return c;
  }

  /* ---------------- cards */
  var listaAtual = [];
  function cartao(p) {
    var nome = nomeProduto(p), det = detalhes(p), tams = (p.tamanhos || []);
    var rotulo = "Ver modelo: " + nome + (det ? ", " + det : "") + ", " + STATUS[p.status] + (tams.length ? ", tamanhos " + tams.join(", ") : "") + (typeof p.preco === "number" ? ", " + moeda(p.preco) : "");
    return '<div class="cartao" data-id="' + p.id + '">' +
      '<div class="foto"><span class="selo ' + p.status + '">' + STATUS[p.status] + "</span>" + htmlMini(p.imgs[0]) + (p.imgs.length > 1 ? '<span class="n-fotos" aria-hidden="true">' + (p.imgs.length === 2 ? "Frente e costas" : p.imgs.length + " fotos") + "</span>" : "") + '<span class="dica" aria-hidden="true">Ver modelo</span></div>' +
      '<div class="info"><h3 class="nome">' + esc(nome) + "</h3>" +
      (det ? '<p class="det">' + esc(det) + "</p>" : "") +
      (tams.length ? '<p class="tam">Tam. ' + esc(tams.join(" · ")) + "</p>" : "") + "</div>" +
      '<div class="rodape-cartao"><span class="preco">' + esc(moeda(p.preco)) + '</span><button type="button" class="ver" aria-label="' + esc(rotulo) + '">Ver modelo ' + SETA + "</button></div></div>";
  }
  function grade(lista, limite, idMais) {
    var h = '<div class="grade">' + lista.slice(0, limite).map(cartao).join("") + "</div>";
    if (idMais && lista.length > limite) h += '<div class="mais"><button type="button" class="botao contorno" data-mais="' + idMais + '">Carregar mais</button><p>Mostrando ' + limite + " de " + lista.length + "</p></div>";
    return h;
  }

  /* ---------------- estado e rotas */
  var estado = { vista: "inicio", cat: null, sub: null, q: "", disp: "todas", tams: [], ordem: "disp", limite: POR_PAGINA, preset: null };
  function limparEstado() { estado = { vista: "inicio", cat: null, sub: null, q: "", disp: "todas", tams: [], ordem: "disp", limite: POR_PAGINA, preset: null }; }
  var PRESETS = {
    "pronta-entrega": { titulo: "Pronta entrega", disp: "disponivel", texto: "Em estoque, prontas para entrega imediata." },
    "sob-encomenda": { titulo: "Sob encomenda", disp: "encomenda", texto: "Modelos que você pode encomendar. Prazo e valor são confirmados pelo WhatsApp." },
    "todas": { titulo: "Todas as camisetas", disp: "todas", texto: "O catálogo completo da RK." }
  };

  /* ---------------- página inicial */
  var casa = { cat: "", clube: "", lim: 12, limDisp: 8 };
  var ABAS_CASA = [["", "Todos"], ["brasil", "Brasileirão"], ["internacionais", "Clubes internacionais"], ["selecoes", "Seleções"], ["competicoes", "Competições"], ["outros", "Outros modelos"]];
  /* ---------------- destaque principal (campanha) */
  /* só produtos cadastrados no catálogo, com frente e costas da MESMA peça; clubes nunca repetem em sequência */
  var VITRINE_IDS = ["RK-201", "RK-075", "RK-246", "RK-118", "RK-022", "RK-110", "RK-122", "RK-021", "RK-301", "RK-130", "RK-162", "RK-325", "RK-217", "RK-041", "RK-066", "RK-173"];
  var VITRINE_RETRO = { "RK-201": 1, "RK-246": 1, "RK-022": 1, "RK-021": 1, "RK-301": 1, "RK-325": 1, "RK-041": 1 };
  var CARR_TEMPO = 2500;
  var GRUPO_NOME = { brasileiro: "Clube brasileiro", estrangeiro: "Clube internacional", selecao: "Seleção" };
  function slidesVitrine() {
    var vis = visiveis(), lista = [];
    /* primeiro as peças a pronta entrega (aprovadas no painel), depois a seleção do catálogo */
    ordenar(vis.filter(function (x) { return x.status === "disponivel"; }), "disp").forEach(function (p) { lista.push(p); });
    VITRINE_IDS.forEach(function (id) { var p = vis.filter(function (x) { return x.id === id; })[0]; if (p && p.imgs.length && lista.indexOf(p) < 0) lista.push(p); });
    /* o mesmo clube nunca fica em sequência (nem na volta do último para o primeiro) */
    for (var volta = 0; volta < 3; volta++) for (var i = 1; i <= lista.length && lista.length > 2; i++) {
      var a = lista[i - 1], b = lista[i % lista.length];
      if (a.clube === b.clube) { for (var j = i + 1; j < lista.length; j++) if (lista[j].clube !== a.clube) { var t = lista.splice(j, 1)[0]; lista.splice(i % lista.length, 0, t); break; } }
    }
    return lista;
  }
  function rotuloSlide(p) { return p.status === "disponivel" ? "Pronta entrega" : (VITRINE_RETRO[p.id] ? "Retrô" : (GRUPO_NOME[p.grupo] || "")); }
  function htmlCarrossel() {
    var sl = slidesVitrine(); if (!sl.length) return "";
    function dois(n) { return (n < 10 ? "0" : "") + n; }
    return '<div class="carrossel" id="carrossel" role="region" aria-roledescription="carrossel" aria-label="Camisas em destaque" style="--tempo:' + CARR_TEMPO + 'ms">' +
      '<div class="carr-palco"><span class="carr-luz" aria-hidden="true"></span><span class="carr-chao" aria-hidden="true"></span>' + sl.map(function (p, i) {
        var f = p.imgs[0], c = p.imgs[1];
        function im(x, cls, pri) { return '<img class="' + cls + '" src="' + caminhoImg(x.c) + '" alt="" width="' + (x.w || 640) + '" height="' + (x.h || 640) + '" decoding="async"' + (pri ? ' fetchpriority="high"' : (i > 1 ? ' loading="lazy"' : "")) + ">"; }
        return '<button type="button" class="carr-slide' + (i === 0 ? " ativo" : "") + (c ? " com-costas" : "") + (p.status === "disponivel" ? " pronta" : "") + '" data-ficha="' + p.id + '" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " de " + sl.length + ": " + esc(nomeProduto(p)) + (c ? ", frente e costas" : "") + '. Ver modelo"' + (i ? ' aria-hidden="true" tabindex="-1"' : "") + ">" +
          (c ? im(c, "carr-costas", false) : "") + im(f, "carr-frente", i === 0) + "</button>";
      }).join("") + "</div>" +
      '<div class="carr-barra"><p class="carr-leg"><span class="carr-n">' + dois(1) + '<i> / ' + dois(sl.length) + '</i></span><span class="carr-txt"><b class="carr-clube">' + esc(nomeProduto(sl[0])) + '</b><span class="carr-tipo">' + esc(rotuloSlide(sl[0])) + (sl[0].imgs[1] ? " · Frente e costas" : "") + "</span></span></p>" +
      '<div class="carr-ctrl"><button type="button" class="carr-bt" data-carr="ant" aria-label="Camisa anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>' +
      '<button type="button" class="carr-bt" data-carr="pausa" aria-label="Pausar carrossel"><svg class="i-pausa" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg><svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg></button>' +
      '<button type="button" class="carr-bt" data-carr="prox" aria-label="Próxima camisa"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button></div></div>' +
      '<div class="carr-pontos">' + sl.map(function (p, i) { return '<button type="button" data-carr-ir="' + i + '" aria-label="Mostrar camisa ' + (i + 1) + ": " + esc(nomeProduto(p)) + '"' + (i === 0 ? ' aria-current="true"' : "") + "><span></span></button>"; }).join("") + "</div></div>";
  }
  var carr = { i: 0, pausado: false };
  function iniciarCarrossel() {
    var el = $("carrossel"); if (!el) return;
    carr.i = 0;
    carr.pausado = reduzMovimento();
    el.classList.toggle("parado", carr.pausado);
    atualizarPausa(el);
    el.addEventListener("mouseenter", function () { el.classList.add("segura"); });
    el.addEventListener("mouseleave", function () { el.classList.remove("segura"); });
    el.addEventListener("focusin", function () { el.classList.add("segura"); });
    el.addEventListener("focusout", function (e) { if (!el.contains(e.relatedTarget)) el.classList.remove("segura"); });
    el.addEventListener("animationend", function (e) { if (e.animationName === "carr-tempo" && e.target.parentNode && e.target.parentNode.getAttribute("aria-current") === "true") irSlide(carr.i + 1); });
    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-carr]"), d = e.target.closest("[data-carr-ir]");
      if (b) {
        var a = b.getAttribute("data-carr");
        if (a === "pausa") { carr.pausado = !carr.pausado; el.classList.toggle("parado", carr.pausado); atualizarPausa(el); }
        else irSlide(carr.i + (a === "prox" ? 1 : -1), true);
      } else if (d) irSlide(+d.getAttribute("data-carr-ir"), true);
    });
    var x0 = null, palco = el.querySelector(".carr-palco");
    palco.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    palco.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) irSlide(carr.i + (dx < 0 ? 1 : -1), true);
    }, { passive: true });
    document.addEventListener("visibilitychange", function () { el.classList.toggle("oculto-aba", document.hidden); });
  }
  function atualizarPausa(el) {
    var b = el.querySelector('[data-carr="pausa"]'); if (!b) return;
    b.setAttribute("aria-label", carr.pausado ? "Reproduzir carrossel" : "Pausar carrossel");
    b.setAttribute("aria-pressed", String(carr.pausado));
  }
  function irSlide(n, manual) {
    var el = $("carrossel"); if (!el) return;
    var sl = el.querySelectorAll(".carr-slide"), pts = el.querySelectorAll("[data-carr-ir]"), total = sl.length;
    if (!total) return;
    var antes = carr.i;
    n = (n + total) % total;
    if (n === antes) return;
    var volta = manual && (n < antes ? !(antes === total - 1 && n === 0) : (antes === 0 && n === total - 1));
    var foco = manual && el.contains(document.activeElement) && document.activeElement.classList.contains("carr-slide");
    el.classList.toggle("voltando", !!volta);
    Array.prototype.forEach.call(sl, function (s, k) {
      var on = k === n;
      s.classList.toggle("ativo", on);
      s.classList.toggle("saindo", k === antes);
      if (on) { s.removeAttribute("aria-hidden"); s.removeAttribute("tabindex"); }
      else { s.setAttribute("aria-hidden", "true"); s.setAttribute("tabindex", "-1"); }
    });
    /* pré-carrega a próxima */
    Array.prototype.forEach.call(sl[(n + 1) % total].querySelectorAll("img"), function (im) { im.removeAttribute("loading"); });
    Array.prototype.forEach.call(sl[n].querySelectorAll("img"), function (im) { im.removeAttribute("loading"); });
    Array.prototype.forEach.call(pts, function (p, k) { if (k === n) p.setAttribute("aria-current", "true"); else p.removeAttribute("aria-current"); });
    var p = slidesVitrine()[n];
    el.querySelector(".carr-n").innerHTML = (n + 1 < 10 ? "0" : "") + (n + 1) + "<i> / " + (total < 10 ? "0" : "") + total + "</i>";
    if (p) { el.querySelector(".carr-clube").textContent = nomeProduto(p); el.querySelector(".carr-tipo").textContent = rotuloSlide(p) + (p.imgs[1] ? " · Frente e costas" : ""); }
    var leg = el.querySelector(".carr-leg"); leg.classList.remove("troca"); void leg.offsetWidth; leg.classList.add("troca");
    carr.i = n;
    if (foco) sl[n].focus();
  }
  /* cabeçalho escuro enquanto está sobre o destaque */
  function topoSobreDestaque() {
    var t = $("topo"), hero = document.querySelector(".hero-rk");
    if (!t) return;
    t.classList.toggle("sobre-hero", !!hero && hero.getBoundingClientRect().bottom > (t.offsetHeight || 60));
  }
  window.addEventListener("scroll", topoSobreDestaque, { passive: true });

  /* revelar suavemente durante a rolagem */
  var revelador = ("IntersectionObserver" in window) ? new IntersectionObserver(function (ents) {
    ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visivel"); revelador.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }) : null;
  function iniciarRevelar(raiz) {
    var alvos = (raiz || document).querySelectorAll(".secao-cabeca, .grade .cartao, .faixa-contato, .filtros-casa, .aviso-vazio");
    var animar = revelador && !reduzMovimento();
    Array.prototype.forEach.call(alvos, function (el, k) {
      if (el.classList.contains("revelar")) return;
      if (!animar) return;
      var r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 800) && r.bottom > 0) return; /* já na tela: aparece direto */
      el.classList.add("revelar");
      if (el.classList.contains("cartao")) el.style.setProperty("--d", ((k % 4) * 60) + "ms");
      revelador.observe(el);
    });
  }
  function subsCasa(k) { return k ? k.subs.filter(function (s) { return s.id !== "brasileirao"; }) : []; }
  function catalogoCasa() {
    var vis = visiveis(), k = cat(casa.cat), s = null;
    if (k && casa.clube) s = subsCasa(k).filter(function (x) { return x.id === casa.clube; })[0] || null;
    var lista = vis.filter(function (p) { return p.status !== "disponivel" && (!k || k.f(p)) && (!s || s.f(p)); });
    if (!k && casa.clube) { var t = casa.clube; lista = lista.filter(function (p) { return slug(p.clube) === t; }); }
    return ordenar(lista, "disp");
  }
  function htmlSeletorClube(vis) {
    var k = cat(casa.cat), base = vis.filter(function (p) { return p.status !== "disponivel"; }), h;
    function opt(id, nome, n) { return '<option value="' + id + '"' + (casa.clube === id ? " selected" : "") + ">" + esc(nome) + " (" + n + ")</option>"; }
    if (k) {
      var subs = subsCasa(k).map(function (s) { return [s, base.filter(k.f).filter(s.f).length]; }).filter(function (x) { return x[1]; });
      if (!subs.length) return "";
      h = '<option value="">' + (k.id === "competicoes" ? "Todas as competições" : "Todos os clubes") + "</option>" + subs.map(function (x) { return opt(x[0].id, x[0].nome, x[1]); }).join("");
    } else {
      h = '<option value="">Todos os clubes e seleções</option>';
      [["brasil", "Brasil"], ["internacionais", "Clubes internacionais"], ["selecoes", "Seleções"]].forEach(function (g) {
        var kk = cat(g[0]), itens = subsCasa(kk).map(function (s) { return [s, base.filter(kk.f).filter(s.f).length]; }).filter(function (x) { return x[1]; });
        if (itens.length) h += '<optgroup label="' + g[1] + '">' + itens.map(function (x) { return opt(x[0].id, x[0].nome, x[1]); }).join("") + "</optgroup>";
      });
    }
    return '<label class="so-leitor" for="casa-clube">' + (k && k.id === "competicoes" ? "Filtrar por competição" : "Filtrar por clube") + '</label><select class="seletor" id="casa-clube">' + h + "</select>";
  }
  function htmlCatalogoCasa() {
    var vis = visiveis(), lista = catalogoCasa();
    var abas = ABAS_CASA.filter(function (a) { return !a[0] || vis.some(function (p) { return p.status !== "disponivel" && cat(a[0]).f(p); }); });
    var h = '<div class="filtros-casa"><div class="abas-casa" role="group" aria-label="Categoria">' +
      abas.map(function (a) { return '<button type="button" data-casa-cat="' + a[0] + '" aria-pressed="' + (casa.cat === a[0]) + '">' + a[1] + "</button>"; }).join("") +
      '</div><div class="clube-casa">' + htmlSeletorClube(vis) + "</div></div>" +
      '<p class="contagem" aria-live="polite">' + lista.length + (lista.length === 1 ? " modelo" : " modelos") + "</p>";
    h += lista.length ? grade(lista, casa.lim, "casa") : '<p class="vazio-curto">Nenhum modelo nesta seleção. <a href="#todas">Ver todas as camisetas</a></p>';
    return h;
  }
  function htmlInicio() {
    var vis = visiveis();
    var disp = ordenar(vis.filter(function (p) { return p.status === "disponivel"; }), "disp");
    listaAtual = disp.concat(catalogoCasa());
    var h = '<section class="abertura hero-rk" aria-labelledby="t-abertura">' +
      '<div class="hero-fundo" aria-hidden="true"><span class="hf-textura"></span><span class="hf-velocidade"></span><span class="hf-logo"></span><span class="hf-faixa"></span></div>' +
      '<div class="envelope abertura-grade">' +
      '<div class="abertura-texto"><p class="etiqueta"><span class="traco" aria-hidden="true"></span>RK Sportstyle · Camisas de futebol</p>' +
      '<h1 id="t-abertura"><span>Sua paixão.</span> <span class="prata">Seu estilo.</span></h1>' +
      '<p class="lead">Camisas de clubes e seleções — dos modelos atuais aos clássicos que marcaram época.</p>' +
      '<div class="abertura-acoes"><a class="botao pequeno botao-prata" href="#catalogo" data-rolar="catalogo">Ver catálogo ' + SETA + '</a><a class="botao contorno pequeno botao-claro" data-wa href="#" target="_blank" rel="noopener noreferrer"><svg class="icone" viewBox="0 0 24 24" aria-hidden="true" style="width:18px;height:18px"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>Falar no WhatsApp<span class="so-leitor"> (abre em nova aba)</span></a></div></div>' +
      htmlCarrossel() +
      "</div></section>" +
      '<div class="borda-hero" aria-hidden="true"></div>';
    h += '<div class="envelope">';
    /* disponíveis */
    h += '<section class="secao" id="camisetas" aria-labelledby="t-disp"><div class="secao-cabeca"><div><p class="etiqueta">Em estoque, entrega imediata</p><h2 id="t-disp">Pronta entrega</h2></div>' +
      (disp.length ? '<span class="contagem">' + disp.length + (disp.length === 1 ? " modelo" : " modelos") + "</span>" : "") + "</div>";
    h += disp.length ? grade(disp, casa.limDisp, "disp") :
      '<div class="aviso-vazio"><p><b>Estoque a pronta entrega em conferência.</b> Estamos confirmando cada peça antes de publicar. Para saber o que já está disponível, fale com a gente.</p><a class="link-seta" data-wa href="#" target="_blank" rel="noopener noreferrer">Falar no WhatsApp ' + SETA + '<span class="so-leitor"> (abre em nova aba)</span></a></div>';
    h += "</section>";
    /* sob encomenda */
    h += '<section class="secao" id="catalogo" aria-labelledby="t-enc"><div class="secao-cabeca"><div><p class="etiqueta">Prazo e valor confirmados pelo WhatsApp</p><h2 id="t-enc">Catálogo sob encomenda</h2></div></div>' +
      '<div id="catalogo-casa">' + htmlCatalogoCasa() + "</div></section>";
    /* contato */
    h += '<section class="faixa-contato" aria-labelledby="t-contato"><div><h2 id="t-contato">Não encontrou a sua?</h2><p>Fale com a gente. Procuramos o modelo para você.</p></div>' +
      '<a class="botao pequeno" data-wa href="#" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp<span class="so-leitor"> (abre em nova aba)</span></a></section>';
    h += "</div>";
    return h;
  }
  function atualizarCatalogoCasa(foco) {
    var el = $("catalogo-casa"); if (!el) return;
    el.innerHTML = htmlCatalogoCasa(); ativarMiniaturas(el);
    var vis = visiveis(), disp = ordenar(vis.filter(function (p) { return p.status === "disponivel"; }), "disp");
    listaAtual = disp.concat(catalogoCasa());
    if (foco) { var f = el.querySelector(foco); if (f) f.focus(); }
  }

  /* ---------------- resultados (categoria, busca, disponibilidade) */
  function filtrarResultados() {
    var vis = visiveis(), k = cat(estado.cat), s = sub(k, estado.sub), pre = PRESETS[estado.preset];
    var base = vis.filter(function (p) { return (!k || k.f(p)) && (!s || s.f(p)) && (!pre || !pre.f || pre.f(p)) && bate(p, estado.q); });
    var lista = base.filter(function (p) {
      if (estado.disp !== "todas" && p.status !== estado.disp) return false;
      if (estado.tams.length && !estado.tams.some(function (t) { return (p.tamanhos || []).indexOf(t) > -1; })) return false;
      return true;
    });
    return { base: base, lista: ordenar(lista, estado.ordem) };
  }
  var ramosAbertos = {};
  function htmlFiltros(r, prefixo) {
    var vis = visiveis(), h = '<div class="filtro-grupo"><span class="etiqueta" id="' + prefixo + '-fc">Categorias</span><nav class="arvore" aria-labelledby="' + prefixo + '-fc">';
    h += '<a href="#todas"' + (!estado.cat && estado.preset === "todas" && !estado.q ? ' aria-current="page"' : "") + '><span>Todas as camisetas</span><span class="n">' + vis.length + "</span></a>";
    CATS.forEach(function (k) {
      var n = vis.filter(k.f).length;
      if (!n) return;
      var atual = estado.cat === k.id && !estado.sub;
      var subs = k.subs.map(function (s) { var m = vis.filter(k.f).filter(s.f).length; return m ? '<a href="#c-' + k.id + "--" + s.id + '"' + (estado.cat === k.id && estado.sub === s.id ? ' aria-current="page"' : "") + "><span>" + esc(s.nome) + '</span><span class="n">' + m + "</span></a>" : ""; }).join("");
      if (subs) {
        var aberto = estado.cat === k.id || ramosAbertos[k.id], idr = prefixo + "-r-" + k.id;
        h += '<div class="ramo"><button type="button" class="abrir-ramo" data-ramo="' + k.id + '" aria-expanded="' + !!aberto + '" aria-controls="' + idr + '"><span class="so-leitor">Subcategorias de ' + esc(k.nome) + '</span></button><a href="#c-' + k.id + '"' + (atual ? ' aria-current="page"' : "") + "><span>" + esc(k.nome) + '</span><span class="n">' + n + '</span></a></div><div class="sub" id="' + idr + '"' + (aberto ? "" : " hidden") + ">" + subs + "</div>";
      } else {
        h += '<a href="#c-' + k.id + '"' + (atual ? ' aria-current="page"' : "") + "><span>" + esc(k.nome) + '</span><span class="n">' + n + "</span></a>";
      }
    });
    h += "</nav></div>";
    var c = contagens(r.base);
    var ops = [["todas", "Todas", r.base.length], ["disponivel", "Pronta entrega", c.disponivel], ["encomenda", "Sob encomenda", c.encomenda]];
    if (DADOS.config.mostrarIndisponiveis) ops.push(["indisponivel", "Indisponível", c.indisponivel]);
    h += '<div class="filtro-grupo"><span class="etiqueta" id="' + prefixo + '-fd">Disponibilidade</span><div class="opcoes-filtro" role="group" aria-labelledby="' + prefixo + '-fd">' +
      ops.map(function (o) { return '<button type="button" data-disp="' + o[0] + '" aria-pressed="' + (estado.disp === o[0]) + '">' + o[1] + " (" + o[2] + ")</button>"; }).join("") + "</div></div>";
    var tams = {}; r.base.forEach(function (p) { (p.tamanhos || []).forEach(function (t) { tams[t] = 1; }); });
    var ordemTam = ["PP", "P", "M", "G", "GG", "XG", "XGG"];
    var lt = Object.keys(tams).sort(function (a, b) { var ia = ordemTam.indexOf(a), ib = ordemTam.indexOf(b); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b, "pt-BR", { numeric: true }); });
    if (lt.length) h += '<div class="filtro-grupo"><span class="etiqueta" id="' + prefixo + '-ft">Tamanho</span><div class="opcoes-filtro" role="group" aria-labelledby="' + prefixo + '-ft">' +
      lt.map(function (t) { return '<button type="button" data-tam="' + esc(t) + '" aria-pressed="' + (estado.tams.indexOf(t) > -1) + '">' + esc(t) + "</button>"; }).join("") + "</div></div>";
    return h;
  }
  function htmlResultados() {
    var r = filtrarResultados(), k = cat(estado.cat), s = sub(k, estado.sub), pre = PRESETS[estado.preset];
    listaAtual = r.lista;
    var titulo = estado.q ? "“" + estado.q + "”" : (s ? s.nome : (k ? k.nome : (pre ? pre.titulo : "Catálogo")));
    var texto = estado.q ? "Resultado da pesquisa" + (k ? " em " + k.nome : "") + "." : (pre ? pre.texto : (k && k.id === "pronta" ? PRESETS["pronta-entrega"].texto : ""));
    var trilha = '<p class="trilha"><a href="#inicio">Início</a><span aria-hidden="true">/</span>' + (k ? (s ? '<a href="#c-' + k.id + '">' + esc(k.nome) + '</a><span aria-hidden="true">/</span><span>' + esc(s.nome) + "</span>" : "<span>" + esc(k.nome) + "</span>") : "<span>" + esc(estado.q ? "Pesquisa" : (pre ? pre.titulo : "Catálogo")) + "</span>") + "</p>";
    var nFiltros = (estado.disp !== "todas" ? 1 : 0) + estado.tams.length;
    var h = '<div class="envelope resultados"><aside class="lateral" aria-label="Filtros">' + htmlFiltros(r, "fl") + "</aside><section aria-labelledby=\"t-res\">" + trilha +
      '<div class="res-cabeca"><div><h1 id="t-res">' + esc(titulo) + '</h1><p class="total">' + r.lista.length + (r.lista.length === 1 ? " camiseta" : " camisetas") + (texto ? " · " + esc(texto) : "") + "</p></div>" +
      '<div class="res-ferramentas"><button type="button" class="botao contorno pequeno botao-filtros" id="abrir-filtros">Filtros' + (nFiltros ? " (" + nFiltros + ")" : "") + "</button>" +
      '<label class="so-leitor" for="f-ordem">Ordenar</label><select class="seletor" id="f-ordem"><option value="disp"' + (estado.ordem === "disp" ? " selected" : "") + '>Pronta entrega primeiro</option><option value="recentes"' + (estado.ordem === "recentes" ? " selected" : "") + '>Mais recentes</option><option value="az"' + (estado.ordem === "az" ? " selected" : "") + ">Nome A–Z</option></select></div></div>";
    if (nFiltros || estado.q) {
      h += '<div class="filtros-ativos">' + (estado.q ? '<button type="button" data-tirar="q" aria-label="Remover pesquisa ' + esc(estado.q) + '">' + esc(estado.q) + " ✕</button>" : "") +
        (estado.disp !== "todas" ? '<button type="button" data-tirar="disp" aria-label="Remover filtro ' + STATUS[estado.disp] + '">' + STATUS[estado.disp] + " ✕</button>" : "") +
        estado.tams.map(function (t) { return '<button type="button" data-tirar-tam="' + esc(t) + '" aria-label="Remover tamanho ' + esc(t) + '">Tam. ' + esc(t) + " ✕</button>"; }).join("") + "</div>";
    }
    if (estado.disp === "encomenda" || (k && false)) h += '<p class="faixa-info">Modelos sob encomenda: o prazo e o valor são confirmados pelo WhatsApp.</p>';
    h += '<h2 class="so-leitor">Camisetas</h2>';
    h += r.lista.length ? grade(r.lista, estado.limite, "res") :
      '<div class="vazio"><strong>Nada encontrado</strong><span>Tente outro nome de time, seleção ou jogador, ou fale com a gente pelo WhatsApp: podemos procurar o modelo para você.</span><a class="botao contorno pequeno" href="#todas">Ver todas as camisetas</a></div>';
    h += "</section></div>";
    return h;
  }

  /* ---------------- render */
  function render(rolar) {
    var vista = $("vista");
    vista.innerHTML = estado.vista === "inicio" ? htmlInicio() : htmlResultados();
    ativarMiniaturas(vista);
    $("busca-topo").value = estado.q;
    if (estado.q) abrirBusca(true, true);
    marcarNavegacao();
    configurarContatos();
    if (estado.vista === "inicio") iniciarCarrossel();
    topoSobreDestaque();
    if (rolar) window.scrollTo(0, 0);
  }
  function marcarNavegacao() {
    document.querySelectorAll(".topo-nav a").forEach(function (a) {
      var h = a.getAttribute("href").slice(1);
      if (estado.preset === h && !estado.cat && !estado.q) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  function irResultados(mudar) {
    var antes = estado.vista;
    estado.vista = "resultados"; estado.limite = POR_PAGINA;
    mudar();
    render(antes !== "resultados" || true);
  }

  /* ---------------- menus (computador e celular) e rodapé */
  function linksCategoria(k, vis, limite) {
    var base = vis.filter(k.f), itens = k.subs.map(function (s) { var m = base.filter(s.f).length; return m ? '<li><a href="#c-' + k.id + "--" + s.id + '"><span>' + esc(s.nome) + '</span><span class="n">' + m + "</span></a></li>" : ""; }).filter(Boolean);
    if (limite && itens.length > limite) return itens.slice(0, limite).join("") + '<li><a class="ver-todos" href="#c-' + k.id + '"><span>Ver todos os ' + itens.length + " de " + esc(k.nome) + "</span></a></li>";
    return itens.join("");
  }
  function montarMenus() {
    var vis = visiveis(), c = contagens(vis), nov = vis.filter(eNovidade).length;
    var atalhos = [["#pronta-entrega", "Pronta entrega", c.disponivel], ["#sob-encomenda", "Sob encomenda", c.encomenda], ["#todas", "Todas as camisetas", vis.length]];
    function col(ids) {
      return ids.map(function (id) {
        var k = cat(id), n = vis.filter(k.f).length; if (!n) return "";
        return '<div class="mega-bloco"><h3><a href="#c-' + k.id + '">' + esc(k.nome) + "</a></h3><ul>" + linksCategoria(k, vis, ids.length > 1 ? 7 : 12) + "</ul></div>";
      }).join("");
    }
    var outros = cat("outros"), nOut = vis.filter(outros.f).length;
    $("megamenu-conteudo").innerHTML = '<div class="mega-grade"><div class="mega-col"><div class="mega-destaque">' +
      atalhos.filter(function (a) { return a[2] || a[0] === "#pronta-entrega"; }).map(function (a) { return '<a href="' + a[0] + '"><b>' + a[1] + "</b><span>" + (a[2] ? a[2] + (a[2] === 1 ? " modelo" : " modelos") : "Em breve") + "</span></a>"; }).join("") +
      (nOut ? '<a href="#c-outros"><b>Outros modelos</b><span>' + nOut + " modelos</span></a>" : "") + "</div></div>" +
      '<div class="mega-col">' + col(["brasil"]) + "</div>" +
      '<div class="mega-col">' + col(["europa", "competicoes"]) + "</div>" +
      '<div class="mega-col">' + col(["internacionais", "selecoes"]) + "</div></div>";
    var g = '<div class="gaveta-atalhos">' + atalhos.filter(function (a) { return a[2] || a[0] === "#pronta-entrega"; }).map(function (a) { return '<a href="' + a[0] + '"><b>' + a[1] + "</b><span>" + a[2] + " modelos</span></a>"; }).join("") + '</div><div class="acordeao">';
    CATS.forEach(function (k) {
      if (k.id === "pronta") return;
      var n = vis.filter(k.f).length; if (!n) return;
      var lks = linksCategoria(k, vis);
      g += lks ? '<details><summary>' + esc(k.nome) + '<span class="n">' + n + '</span></summary><ul><li><a href="#c-' + k.id + '"><span>Ver tudo em ' + esc(k.nome) + '</span><span class="n">' + n + "</span></a></li>" + lks + "</ul></details>"
        : '<details><summary>' + esc(k.nome) + '<span class="n">' + n + '</span></summary><ul><li><a href="#c-' + k.id + '"><span>Ver modelos</span><span class="n">' + n + "</span></a></li></ul></details>";
    });
    g += '</div><div style="display:grid;gap:10px;margin-top:20px"><a class="botao" data-wa href="#" target="_blank" rel="noopener noreferrer">WhatsApp<span class="so-leitor"> (abre em nova aba)</span></a><a class="botao contorno" data-ig href="#" target="_blank" rel="noopener noreferrer">Instagram<span class="so-leitor"> (abre em nova aba)</span></a></div>';
    $("gaveta-corpo").innerHTML = g;
    $("rodape-categorias").innerHTML = CATS.filter(function (k) { return vis.filter(k.f).length; }).map(function (k) { return '<li><a href="#c-' + k.id + '">' + esc(k.nome) + "</a></li>"; }).join("");
  }
  var mega = $("megamenu"), botaoCat = $("botao-categorias");
  function abrirMega(abrir) {
    mega.hidden = !abrir; botaoCat.setAttribute("aria-expanded", String(abrir));
  }
  botaoCat.addEventListener("click", function () { abrirMega(mega.hidden); if (!mega.hidden) { var a = mega.querySelector("a"); if (a) a.focus(); } });
  mega.addEventListener("click", function (e) { if (e.target.closest("a")) abrirMega(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !mega.hidden) { abrirMega(false); botaoCat.focus(); } });
  document.addEventListener("click", function (e) { if (!mega.hidden && !e.target.closest("#megamenu") && !e.target.closest("#botao-categorias")) abrirMega(false); });
  var gaveta = $("gaveta");
  $("abrir-menu").addEventListener("click", function () { gaveta.showModal(); $("abrir-menu").setAttribute("aria-expanded", "true"); });
  gaveta.addEventListener("close", function () { $("abrir-menu").setAttribute("aria-expanded", "false"); });
  gaveta.addEventListener("click", function (e) { if (e.target === gaveta || e.target.closest("[data-fechar]") || e.target.closest('a[href^="#"]')) gaveta.close(); });

  /* ---------------- pesquisa no celular (ícone abre o campo) */
  var topo = $("topo"), botaoBusca = $("abrir-busca");
  function abrirBusca(abrir, semFoco) {
    if (abrir) { if (topo.className.indexOf("buscando") < 0) topo.className += " buscando"; }
    else topo.className = topo.className.replace(/\s*buscando/g, "");
    botaoBusca.setAttribute("aria-expanded", String(!!abrir));
    if (abrir && !semFoco) { try { $("busca-topo").focus(); } catch (e) {} }
  }
  botaoBusca.addEventListener("click", function () { abrirBusca(botaoBusca.getAttribute("aria-expanded") !== "true"); });
  $("busca-topo").addEventListener("keydown", function (e) { if ((e.key === "Escape" || e.key === "Esc") && !this.value) { abrirBusca(false); botaoBusca.focus(); } });

  /* ---------------- eventos públicos */
  var tBusca;
  function aoBuscar(valor, imediato) {
    clearTimeout(tBusca);
    tBusca = setTimeout(function () {
      var q = valor.trim();
      if (!q && estado.vista === "inicio") return;
      if (!q) { estado.q = ""; definirHash("todas"); estado.preset = "todas"; render(); return; }
      estado.q = q; estado.cat = null; estado.sub = null; estado.preset = null; estado.disp = "todas"; estado.tams = [];
      var focoId = document.activeElement && document.activeElement.id;
      irResultados(function () {});
      definirHash("");
      if (focoId === "busca-inicio" || focoId === "busca-topo") { var b = $("busca-topo"); b.focus(); b.setSelectionRange(b.value.length, b.value.length); }
    }, imediato ? 0 : 220);
  }
  document.addEventListener("input", function (e) { if (e.target.id === "busca-topo" || e.target.id === "busca-inicio") aoBuscar(e.target.value); });
  document.addEventListener("submit", function (e) {
    var f = e.target.closest("[data-busca]"); if (!f) return;
    e.preventDefault(); aoBuscar(f.querySelector("input").value, true);
    setTimeout(function () { var v = $("vista").querySelector(".resultados"); if (v) rolarPara(0); }, 30);
  });
  $("vista").addEventListener("click", function (e) {
    var sg = e.target.closest("[data-buscar]");
    if (sg) { e.preventDefault(); aoBuscar(sg.getAttribute("data-buscar"), true); return; }
    var card = e.target.closest(".cartao");
    if (card) { abrirFicha(card.getAttribute("data-id")); return; }
    var fs = e.target.closest("[data-ficha]");
    if (fs) { abrirFicha(fs.getAttribute("data-ficha")); return; }
    var ab = e.target.closest("[data-casa-cat]");
    if (ab) { casa.cat = ab.getAttribute("data-casa-cat"); casa.clube = ""; casa.lim = 12; atualizarCatalogoCasa('[data-casa-cat="' + casa.cat + '"]'); return; }
    var rl = e.target.closest("[data-rolar]");
    if (rl) { e.preventDefault(); var alvoR = $(rl.getAttribute("data-rolar")); if (alvoR) rolarPara(alvoR.getBoundingClientRect().top + window.pageYOffset - 70); return; }
    var m = e.target.closest("[data-mais]");
    if (m) {
      var tipo = m.getAttribute("data-mais"), grd = m.parentNode.previousElementSibling, antes;
      if (tipo === "casa") { antes = casa.lim; casa.lim += 24; atualizarCatalogoCasa(); grd = $("catalogo-casa").querySelector(".grade"); }
      else if (tipo === "disp") { antes = casa.limDisp; casa.limDisp += 24; render(); grd = $("camisetas").querySelector(".grade"); }
      else { antes = estado.limite; estado.limite += POR_PAGINA; render(); grd = $("vista").querySelector(".grade"); }
      if (grd && grd.children[antes]) grd.children[antes].querySelector(".ver").focus();
      return;
    }
    tratarFiltro(e, false);
  });
  function tratarFiltro(e, celular) {
    var rb = e.target.closest("[data-ramo]");
    if (rb) {
      var id = rb.getAttribute("data-ramo"), ab = rb.getAttribute("aria-expanded") !== "true";
      ramosAbertos[id] = ab; rb.setAttribute("aria-expanded", String(ab));
      document.getElementById(rb.getAttribute("aria-controls")).hidden = !ab;
      return true;
    }
    var d = e.target.closest("[data-disp]"), t = e.target.closest("[data-tam]"), x = e.target.closest("[data-tirar]"), xt = e.target.closest("[data-tirar-tam]");
    if (!(d || t || x || xt)) return false;
    if (d) estado.disp = d.getAttribute("data-disp");
    if (t) { var v = t.getAttribute("data-tam"), i = estado.tams.indexOf(v); if (i > -1) estado.tams.splice(i, 1); else estado.tams.push(v); }
    if (x) { var k = x.getAttribute("data-tirar"); if (k === "q") { estado.q = ""; if (!estado.cat && !estado.preset) { estado.preset = "todas"; definirHash("todas"); } } else estado.disp = "todas"; }
    if (xt) estado.tams.splice(estado.tams.indexOf(xt.getAttribute("data-tirar-tam")), 1);
    estado.limite = POR_PAGINA;
    var foco = (d || t) ? ((d ? '[data-disp="' + d.getAttribute("data-disp") + '"]' : '[data-tam="' + t.getAttribute("data-tam") + '"]')) : null;
    render();
    if (celular) { $("filtros-celular").innerHTML = htmlFiltros(filtrarResultados(), "fm"); }
    if (foco) { var alvo = (celular ? $("filtros-celular") : $("vista").querySelector(".lateral")).querySelector(foco); if (alvo) alvo.focus(); }
    return true;
  }
  $("vista").addEventListener("change", function (e) {
    if (e.target.id === "f-ordem") { estado.ordem = e.target.value; render(); $("f-ordem").focus(); }
    if (e.target.id === "casa-clube") { casa.clube = e.target.value; casa.lim = 12; atualizarCatalogoCasa("#casa-clube"); }
  });
  var gFiltros = $("gaveta-filtros");
  document.addEventListener("click", function (e) {
    if (e.target.closest("#abrir-filtros")) { $("filtros-celular").innerHTML = htmlFiltros(filtrarResultados(), "fm"); gFiltros.showModal(); }
  });
  gFiltros.addEventListener("click", function (e) {
    if (e.target === gFiltros || e.target.closest("[data-fechar]") || e.target.closest("#aplicar-filtros") || e.target.closest('a[href^="#"]')) { gFiltros.close(); return; }
    tratarFiltro(e, true);
  });

  /* ---------------- WhatsApp e Instagram */
  function linkWhats(msg) {
    var n = soDigitos(DADOS.config.whatsapp);
    if (n.length < 10) return null;
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(msg);
  }
  function linkInstagram() { var u = (DADOS.config.instagram || "").replace(/^@/, ""); return u ? "https://instagram.com/" + encodeURIComponent(u) : null; }
  function mensagemProduto(p) {
    var url = enderecoPublico();
    var link = url ? url.replace(/#.*$/, "") + "#" + chavePublica(p) : "";
    return (DADOS.config.mensagem || MSG_PADRAO).replace(/\{nome\}/g, nomeCompleto(p)).replace(/\{codigo\}/g, p.id)
      .replace(/\{status\}/g, STATUS[p.status].toLowerCase()).replace(/\{link\}/g, link).replace(/\n+$/, "").trim();
  }
  function enderecoPublico() {
    var h = location.hostname || "";
    if (/^https:$/.test(location.protocol) && h && !/claude|anthropic|localhost|127\.0\.0\.1/.test(h)) return location.origin + location.pathname;
    return (DADOS.config.urlSite || "").trim();
  }
  function formatarFone(n) { var m = n.match(/^55(\d{2})(\d{4,5})(\d{4})$/); return m ? "(" + m[1] + ") " + m[2] + "-" + m[3] : "+" + n; }
  function configurarContatos() {
    var geral = linkWhats("Olá! Vim pelo catálogo da RK Sport Style e quero mais informações."), ig = linkInstagram(), n = soDigitos(DADOS.config.whatsapp);
    /* o WhatsApp abre SEMPRE uma conversa no WhatsApp; sem número cadastrado (Painel > Configurações), o botão avisa e não leva a outro lugar */
    document.querySelectorAll("[data-wa]").forEach(function (a) {
      if (geral) { a.href = geral; a.removeAttribute("data-sem-numero"); a.removeAttribute("title"); }
      else { a.href = "#"; a.setAttribute("data-sem-numero", ""); a.title = "Número do WhatsApp em configuração"; }
    });
    document.querySelectorAll("[data-ig]").forEach(function (a) { if (ig) a.href = ig; else a.hidden = true; });
    document.querySelectorAll('[data-cfg="instagram-texto"]').forEach(function (el) { var u = (DADOS.config.instagram || "").replace(/^@/, ""); if (u) el.textContent = "@" + u; });
    aplicarCondicionais();
    document.querySelectorAll('[data-cfg="whatsapp-texto"]').forEach(function (el) {
      if (n.length >= 10) { el.textContent = formatarFone(n); el.classList.remove("pendente"); }
      else { el.textContent = "[a preencher: número do WhatsApp]"; el.classList.add("pendente"); }
    });
  }

  /* trechos que só aparecem quando a informação foi cadastrada (nada de espaço reservado) */
  function aplicarCondicionais() {
    var emp = DADOS.config.empresa || {}, n = soDigitos(DADOS.config.whatsapp);
    document.querySelectorAll("[data-se]").forEach(function (el) {
      var k = el.getAttribute("data-se");
      el.hidden = !(k === "whatsapp" ? n.length >= 10 : String(emp[k] || "").trim());
    });
  }
  /* WhatsApp ainda sem número: avisa em vez de abrir outro site */
  var tAviso = null;
  function avisoFlutuante(txt, comInstagram) {
    var el = $("aviso-flut"); if (!el) return;
    var ig = linkInstagram(), u = (DADOS.config.instagram || "").replace(/^@/, "");
    el.innerHTML = esc(txt) + (comInstagram && ig ? ' Enquanto isso, fale com a gente no <a href="' + esc(ig) + '" target="_blank" rel="noopener noreferrer">Instagram @' + esc(u) + "</a>." : "");
    el.hidden = false; el.classList.add("visivel");
    clearTimeout(tAviso); tAviso = setTimeout(function () { el.classList.remove("visivel"); setTimeout(function () { el.hidden = true; }, 300); }, 6000);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-sem-numero]");
    if (!a) return;
    e.preventDefault();
    avisoFlutuante("O número do WhatsApp da RK está sendo configurado.", true);
  }, true);

  /* ---------------- visualização da camisa */
  var ficha = $("ficha"), fichaAtual = null, fotoAtual = 0, focoAntesFicha = null;
  function produto(id) { for (var i = 0; i < DADOS.produtos.length; i++) if (DADOS.produtos[i].id === id) return DADOS.produtos[i]; return null; }
  function porChave(ch) { var v = visiveis(); for (var i = 0; i < v.length; i++) if (chavePublica(v[i]) === ch) return v[i]; return null; }
  function rotuloCategoria(p) {
    if (p.grupo === "brasileiro") return "Brasil" + (p.clube ? " · " + p.clube : "");
    if (p.grupo === "selecao") return "Seleções" + (p.clube ? " · " + p.clube : "");
    if (p.grupo === "estrangeiro") return (p.liga || "Clubes internacionais");
    return "Outros modelos";
  }
  function abrirFicha(id, semHash) {
    var p = produto(id); if (!p || p.oculto) return;
    fichaAtual = p; fotoAtual = 0;
    var st = $("ficha-status"); st.className = "selo " + p.status; st.textContent = STATUS[p.status];
    $("ficha-cat").textContent = rotuloCategoria(p);
    $("ficha-nome").textContent = nomeProduto(p);
    $("ficha-sub").textContent = detalhes(p);
    $("ficha-preco").textContent = moeda(p.preco);
    var linhas = [];
    if (p.modelo) linhas.push(["Modelo / temporada", esc(p.modelo)]);
    if (p.tipo) linhas.push(["Tipo", esc(p.tipo)]);
    if (p.costas) linhas.push(["Nome e número", esc(p.costas)]);
    if (p.comp.length) linhas.push(["Competição", esc(p.comp.join(", "))]);
    linhas.push(["Tamanhos", p.tamanhos.length ? '<div class="tamanhos">' + p.tamanhos.map(function (t) { return "<span>" + esc(t) + "</span>"; }).join("") + "</div>" : "Consulte pelo WhatsApp"]);
    linhas.push(["Disponibilidade", STATUS[p.status]]);
    if (typeof p.preco !== "number") linhas.push(["Valor", "Consulte pelo WhatsApp"]);
    if (p.obs) linhas.push(["Observação", esc(p.obs)]);
    $("ficha-dados").innerHTML = linhas.map(function (l) { return "<dt>" + l[0] + "</dt><dd>" + l[1] + "</dd>"; }).join("");
    $("ficha-aviso-status").textContent = p.status === "disponivel" ? "Em estoque para pronta entrega. Confirme o tamanho pelo WhatsApp." :
      p.status === "encomenda" ? "Modelo sob encomenda: o prazo e o valor são confirmados pelo WhatsApp." : "Modelo temporariamente indisponível. Pergunte pelo WhatsApp se ele volta.";
    var wa = linkWhats(mensagemProduto(p)), aviso = $("ficha-wa-aviso"), botao = $("ficha-wa");
    if (wa) { botao.href = wa; botao.hidden = false; botao.removeAttribute("data-sem-numero"); aviso.hidden = true; }
    else {
      botao.href = "#"; botao.hidden = false; botao.setAttribute("data-sem-numero", "");
      aviso.hidden = false;
      aviso.textContent = "O número do WhatsApp da loja está sendo configurado.";
    }
    mostrarFoto();
    var i = listaAtual.indexOf(p);
    atualizarSetas();
    var jaAberta = ficha.open;
    if (!ficha.open) { focoAntesFicha = document.activeElement; ficha.showModal(); }
    /* passar de uma camisa para outra não empilha o histórico: o "voltar" sai da ficha de uma vez */
    if (!semHash) definirHash(chavePublica(p), !jaAberta);
  }
  function mostrarFoto() {
    var imgs = fichaAtual.imgs || [], img = imgs[fotoAtual], el = $("ficha-img");
    el.src = srcGrande(img) || "data:,";
    el.alt = "Foto ilustrativa: camiseta " + nomeCompleto(fichaAtual) + (imgs.length > 1 ? " (foto " + (fotoAtual + 1) + " de " + imgs.length + ")" : "");
    if (img && img.w) { el.width = img.w; el.height = img.h; } else { el.removeAttribute("width"); el.removeAttribute("height"); }
    $("ficha-fotos").innerHTML = imgs.length > 1 ? imgs.map(function (im, k) {
      return '<button type="button" data-foto="' + k + '" aria-current="' + (k === fotoAtual) + '" aria-label="Ver foto ' + (k + 1) + '"><img src="' + esc(srcGrande(im)) + '" alt=""></button>';
    }).join("") : "";
    atualizarSetas();
  }
  /* setas: primeiro passam pelas fotos da mesma camisa (frente/costas), depois vão para a camisa vizinha */
  function atualizarSetas() {
    if (!fichaAtual) return;
    var n = (fichaAtual.imgs || []).length, i = listaAtual.indexOf(fichaAtual);
    var temAnt = fotoAtual > 0 || i > 0, temProx = fotoAtual < n - 1 || (i > -1 && i < listaAtual.length - 1);
    var a = $("ficha-ant"), b = $("ficha-prox");
    a.hidden = !temAnt; b.hidden = !temProx;
    a.setAttribute("aria-label", fotoAtual > 0 ? (n === 2 ? "Ver a frente" : "Foto anterior") : "Camiseta anterior");
    b.setAttribute("aria-label", fotoAtual < n - 1 ? (n === 2 ? "Ver as costas" : "Próxima foto") : "Próxima camiseta");
  }
  function passo(d) {
    if (!fichaAtual) return;
    var n = (fichaAtual.imgs || []).length, f = fotoAtual + d;
    if (f >= 0 && f < n) { fotoAtual = f; mostrarFoto(); return; }
    var i = listaAtual.indexOf(fichaAtual), q = listaAtual[i + d];
    if (i < 0 || !q) return;
    abrirFicha(q.id);
    if (d < 0 && (q.imgs || []).length > 1) { fotoAtual = q.imgs.length - 1; mostrarFoto(); }
  }
  $("ficha-fotos").addEventListener("click", function (e) { var b = e.target.closest("[data-foto]"); if (b) { fotoAtual = +b.getAttribute("data-foto"); mostrarFoto(); } });
  function vizinho(d) { var i = listaAtual.indexOf(fichaAtual); var q = listaAtual[i + d]; if (q) abrirFicha(q.id); }
  $("ficha-ant").addEventListener("click", function () { passo(-1); });
  $("ficha-prox").addEventListener("click", function () { passo(1); });
  ficha.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") passo(-1); if (e.key === "ArrowRight") passo(1); });
  (function () {
    var x0 = null, v = ficha.querySelector(".vitrine"); if (!v) return;
    v.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    v.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 45) passo(dx < 0 ? 1 : -1); }, { passive: true });
  })();
  ficha.querySelector("[data-fechar]").addEventListener("click", function () { ficha.close(); });
  /* menu dentro da ficha: leva direto para outra parte do catálogo */
  var saidaPeloMenu = false;
  ficha.querySelector(".ficha-menu").addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']"), c = e.target.closest("[data-ficha-categorias]");
    if (a) {
      e.preventDefault();
      var h = a.getAttribute("href").slice(1);
      saidaPeloMenu = true; ficha.close();
      if (h === "inicio") { definirHash("", false); limparEstado(); render(true); }
      else { definirHash(h, false); lerHash(); window.scrollTo(0, 0); }
      return;
    }
    if (c) {
      saidaPeloMenu = true; ficha.close();
      var bt = $("abrir-menu"), bc = $("botao-categorias");
      setTimeout(function () { if (bt && bt.offsetParent) bt.click(); else if (bc) bc.click(); }, 30);
    }
  });
  ficha.addEventListener("click", function (e) { if (e.target === ficha) ficha.close(); });
  ficha.addEventListener("close", function () {
    if (/^#camisa-/.test(location.hash)) definirHash(hashDaVista());
    if (saidaPeloMenu) { saidaPeloMenu = false; window.scrollTo(0, 0); return; }
    var alvo = fichaAtual && document.querySelector('.cartao[data-id="' + fichaAtual.id + '"] .ver');
    try { (alvo || focoAntesFicha || document.body).focus(); } catch (e) {}
  });

  /* ---------------- endereço (#) */
  var JANELAS = { privacidade: "dlg-privacidade", termos: "dlg-termos", trocas: "dlg-trocas", cookies: "dlg-cookies" };
  var mudandoHash = false;
  function hashDaVista() {
    if (estado.vista === "inicio") return "";
    if (estado.cat) return "c-" + estado.cat + (estado.sub ? "--" + estado.sub : "");
    return estado.preset || "";
  }
  function definirHash(h, empilhar) {
    mudandoHash = true;
    try { var url = location.pathname + location.search + (h ? "#" + h : ""); if (empilhar) history.pushState(null, "", url); else history.replaceState(null, "", url); }
    catch (e) { location.hash = h; }
    setTimeout(function () { mudandoHash = false; }, 0);
  }
  function lerHash(primeira) {
    var h = decodeURIComponent(location.hash.replace(/^#/, ""));
    Object.keys(JANELAS).forEach(function (k) { var d = $(JANELAS[k]); if (d.open && k !== h) d.close(); });
    if (gaveta.open) gaveta.close();
    if (gFiltros.open) gFiltros.close();
    if (!mega.hidden) abrirMega(false);
    if (h === "admin") { abrirPainel(); return; }
    if (JANELAS[h]) { abrirDoc(h); return; }
    if (/^camisa-/.test(h)) {
      var p = porChave(h);
      if (primeira || !$("vista").innerHTML) render();
      if (p) abrirFicha(p.id, true);
      return;
    }
    if (ficha.open) ficha.close();
    if (!h || h === "inicio" || h === "conteudo") { if (h === "conteudo") return; limparEstado(); render(!primeira); return; }
    var c = h.match(/^c-([a-z0-9-]+?)(?:--([a-z0-9-]+))?$/);
    if (c && cat(c[1])) { irResultados(function () { estado.cat = c[1]; estado.sub = c[2] || null; estado.preset = null; estado.q = ""; estado.disp = "todas"; estado.tams = []; estado.ordem = "disp"; }); return; }
    if (PRESETS[h]) { irResultados(function () { estado.preset = h; estado.cat = null; estado.sub = null; estado.q = ""; estado.disp = PRESETS[h].disp; estado.tams = []; estado.ordem = PRESETS[h].ordem || "disp"; }); return; }
    if (primeira) render();
  }
  window.addEventListener("hashchange", function () { if (!mudandoHash) lerHash(); });
  window.addEventListener("popstate", function () { if (!/^#camisa-/.test(location.hash) && ficha.open) ficha.close(); else lerHash(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]'); if (!a) return;
    var h = a.getAttribute("href").slice(1);
    if (JANELAS[h]) { e.preventDefault(); if (ficha.open) ficha.close(); definirHash(h, true); abrirDoc(h); return; }
    if (h === "inicio") { e.preventDefault(); limparEstado(); definirHash("", true); render(true); return; }
    if (a.getAttribute("href") === location.hash && h !== "admin") { e.preventDefault(); lerHash(); window.scrollTo(0, 0); }
  });

  var origemFocoDoc = null;
  function abrirDoc(nome) {
    var d = $(JANELAS[nome]); if (!d) return;
    if (!$("vista").innerHTML) render();
    if (nome === "cookies") preencherCookies();
    if (!d.open) { origemFocoDoc = document.activeElement; d.showModal(); d.querySelector("[data-fechar]").focus(); }
  }
  Object.keys(JANELAS).forEach(function (k) {
    var d = $(JANELAS[k]);
    d.querySelector("[data-fechar]").addEventListener("click", function () { d.close(); });
    d.addEventListener("click", function (ev) { if (ev.target === d) d.close(); });
    d.addEventListener("close", function () {
      if (location.hash === "#" + k) definirHash(hashDaVista());
      if (origemFocoDoc && document.contains(origemFocoDoc)) { try { origemFocoDoc.focus({ preventScroll: true }); } catch (e) {} }
    });
  });

  /* ---------------- dados da empresa */
  var PENDENTE = { razao: "nome empresarial", cnpj: "CNPJ", endereco: "endereço", email: "e-mail de atendimento", parceiros: "parceiros de entrega e pagamento", licenca: "origem dos produtos", troca_cortesia: "regra de troca por tamanho ou gosto", prazo_reembolso: "prazo de reembolso" };
  function preencherEmpresa() {
    var emp = DADOS.config.empresa || {};
    document.querySelectorAll("[data-empresa]").forEach(function (el) {
      var k = el.getAttribute("data-empresa"), v = String(emp[k] || "").trim();
      if (v) { el.textContent = v; el.classList.remove("pendente"); return; }
      if (!PENDENTE[k]) { el.textContent = ""; return; }
      el.textContent = "[a preencher: " + PENDENTE[k] + "]"; el.classList.add("pendente");
    });
    aplicarCondicionais();
  }

  /* ---------------- consentimento de cookies */
  var consentimento = (function () {
    var CHAVE = "rk_consentimento", atual = null, fila = { estatistica: [], marketing: [] };
    try { var v = JSON.parse(localStorage.getItem(CHAVE) || "null"); if (v && v.v === 1) atual = v; } catch (e) {}
    return {
      escolhido: function () { return !!atual; },
      permite: function (c) { return !!(atual && atual[c]); },
      quandoPermitir: function (c, fn) { if (atual && atual[c]) fn(); else fila[c].push(fn); },
      gravar: function (est, mkt) {
        atual = { v: 1, estatistica: !!est, marketing: !!mkt, quando: new Date().toISOString() };
        try { localStorage.setItem(CHAVE, JSON.stringify(atual)); } catch (e) {}
        ["estatistica", "marketing"].forEach(function (c) { if (atual[c]) while (fila[c].length) { try { fila[c].shift()(); } catch (e) {} } });
      }
    };
  })();
  window.rkConsentimento = consentimento;
  function preencherCookies() { $("ck-estatistica").checked = consentimento.permite("estatistica"); $("ck-marketing").checked = consentimento.permite("marketing"); $("status-cookies").textContent = ""; }
  function decidir(est, mkt, msg) {
    consentimento.gravar(est, mkt); $("aviso-cookies").hidden = true;
    var dc = $("dlg-cookies"); if (dc.open) { $("status-cookies").textContent = msg; setTimeout(function () { dc.close(); }, 700); }
  }
  document.querySelectorAll("[data-consentir]").forEach(function (b) {
    b.addEventListener("click", function () { var t = b.getAttribute("data-consentir") === "tudo"; decidir(t, t, t ? "Tudo permitido. Escolha salva." : "Só o essencial. Escolha salva."); });
  });
  $("salvar-cookies").addEventListener("click", function () { decidir($("ck-estatistica").checked, $("ck-marketing").checked, "Escolhas salvas."); });
  if (!consentimento.escolhido()) $("aviso-cookies").hidden = false;

  /* =====================================================================
     PAINEL ADMINISTRATIVO (os códigos RK aparecem só aqui)
     ===================================================================== */
  var painel = $("painel"), editor = $("editor");
  var adm = null;
  var TIPOS = ["Manga curta", "Manga longa", "Retrô", "Treino", "Goleiro", "Feminina", "Infantil", "Polo", "Edição especial"];
  var TAMANHOS = ["PP", "P", "M", "G", "GG", "XG", "XGG", "2", "4", "6", "8", "10", "12", "14", "16"];
  function clonar(o) { return JSON.parse(JSON.stringify(o)); }
  function usarCapacidade(nome) {
    if (!window.claude || typeof window.claude.use !== "function") return Promise.resolve(null);
    return Promise.race([window.claude.use(nome), new Promise(function (r) { setTimeout(function () { r(null); }, 12000); })]).catch(function () { return null; });
  }
  function htmlRestrito(msg) { return '<div class="restrito"><p class="etiqueta">Painel RK</p><h2>Acesso restrito</h2><p>' + msg + '</p><a class="botao contorno" href="#inicio">Voltar ao catálogo</a></div>'; }
  /* Onde o painel publica: no Claude (artifact) ou no GitHub Pages (site independente) */
  function repoGithub() {
    var c = (DADOS.config.github || "").trim();
    if (c && c.indexOf("/") > 0) return { dono: c.split("/")[0], repo: c.split("/")[1], ramo: DADOS.config.githubRamo || "main" };
    var h = location.hostname || "";
    if (/\.github\.io$/i.test(h)) {
      var dono = h.split(".")[0], seg = (location.pathname.split("/")[1] || "");
      return { dono: dono, repo: seg || h, ramo: DADOS.config.githubRamo || "main" };
    }
    return null;
  }
  var GH_CHAVE = "rk_gh_acesso";
  function lerToken() { try { localStorage.removeItem(GH_CHAVE); return sessionStorage.getItem(GH_CHAVE) || ""; } catch (e) { return ""; } }
  /* limite de tentativas: 5 erros em 10 minutos bloqueiam por 2 minutos */
  var tentativasLogin = [];
  function bloqueioLogin() {
    var agora = Date.now(); tentativasLogin = tentativasLogin.filter(function (t) { return agora - t < 600000; });
    if (tentativasLogin.length < 5) return 0;
    var resta = 120000 - (agora - tentativasLogin[tentativasLogin.length - 1]);
    return resta > 0 ? Math.ceil(resta / 1000) : 0;
  }
  /* painel do site independente fecha sozinho após 20 min sem uso */
  var tInativo = null;
  function vigiarInatividade() {
    if (!adm || !adm.artifact || adm.artifact.nome !== "github") return;
    clearTimeout(tInativo);
    tInativo = setTimeout(function () {
      if (!adm || painel.hidden) return;
      esquecerToken(); adm = null; telaLoginGithub(repoGithub(), "Sessão encerrada por inatividade. Entre de novo.");
    }, 20 * 60 * 1000);
  }
  ["pointerdown", "keydown"].forEach(function (ev) { document.addEventListener(ev, function () { if (adm && !painel.hidden) vigiarInatividade(); }, { passive: true }); });
  function esquecerToken() { try { sessionStorage.removeItem(GH_CHAVE); localStorage.removeItem(GH_CHAVE); } catch (e) {} }
  function gh(rp, token, caminho, opcoes) {
    opcoes = opcoes || {};
    var h = { "Accept": "application/vnd.github+json", "Authorization": "Bearer " + token };
    if (opcoes.body) h["Content-Type"] = "application/json";
    return fetch("https://api.github.com/repos/" + encodeURIComponent(rp.dono) + "/" + encodeURIComponent(rp.repo) + caminho, { method: opcoes.method || "GET", headers: h, body: opcoes.body, cache: "no-store" })
      .then(function (r) { return r.text().then(function (t) { var j = null; try { j = JSON.parse(t); } catch (e) {} if (!r.ok) { var er = new Error((j && j.message) || ("HTTP " + r.status)); er.status = r.status; throw er; } return j; }); });
  }
  function base64Utf8(s) {
    var bytes;
    if (window.TextEncoder) bytes = new TextEncoder().encode(s);
    else { var u = unescape(encodeURIComponent(s)); bytes = new Array(u.length); for (var i = 0; i < u.length; i++) bytes[i] = u.charCodeAt(i); }
    var bin = "", PASSO = 0x8000;
    for (var k = 0; k < bytes.length; k += PASSO) bin += String.fromCharCode.apply(null, Array.prototype.slice.call(bytes, k, k + PASSO));
    return btoa(bin);
  }
  function destinoGithub(rp, token) {
    return {
      nome: "github",
      publish: function (html) {
        return gh(rp, token, "/contents/index.html?ref=" + encodeURIComponent(rp.ramo)).then(function (atual) {
          return gh(rp, token, "/contents/index.html", { method: "PUT", body: JSON.stringify({ message: "Catálogo atualizado pelo painel", content: base64Utf8(html), sha: atual && atual.sha, branch: rp.ramo }) });
        }).catch(function (e) {
          var code = e.status === 401 ? "not_writer" : e.status === 403 || e.status === 404 ? "not_granted" : e.status === 409 || e.status === 422 ? "conflict" : "upstream_error";
          throw { code: code, message: e.message };
        });
      }
    };
  }
  function iniciarAdm(destino) {
    adm = { rascunho: clonar(DADOS), mudou: new Set(), excluidos: new Set(), sel: new Set(), pagina: 0, f: { q: "", status: "", grupo: "", soMudou: false }, artifact: destino, aba: (DADOS.conferencia || []).some(function (c) { return c.status === "pendente"; }) ? "conf" : "estoque", cfgMudou: false };
    recuperarRascunho(); renderPainel(); vigiarInatividade();
  }
  function telaLoginGithub(rp, erro) {
    painel.innerHTML = '<div class="restrito"><p class="etiqueta">Painel RK</p><h2>Entrar no painel</h2>' +
      '<p>Use a chave de acesso do GitHub da conta dona do site. Ela fica só neste aparelho e nunca vai para o código do site.</p>' +
      '<form id="gh-login" class="form-painel" style="text-align:left;max-width:420px;margin:0 auto" novalidate>' +
      '<div class="campo"><label for="gh-token">Chave de acesso</label><input type="password" id="gh-token" autocomplete="current-password" required></div>' +
      '<p class="ajuda">Por segurança, a chave vale só enquanto esta aba estiver aberta e o painel fecha sozinho após 20 minutos sem uso.</p>' +
      '<p class="status-msg" id="gh-msg" role="alert">' + esc(erro || "") + '</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="submit" class="botao pequeno">Entrar</button><a class="botao contorno pequeno" href="#inicio">Voltar ao catálogo</a></div></form></div>';
    $("gh-token").focus();
    $("gh-login").addEventListener("submit", function (e) {
      e.preventDefault();
      var tk = $("gh-token").value.trim(), msg = $("gh-msg");
      if (!tk) { msg.textContent = "Cole a chave de acesso."; return; }
      var espera = bloqueioLogin();
      if (espera) { msg.textContent = "Muitas tentativas. Aguarde " + espera + " s e tente de novo."; return; }
      msg.textContent = "Verificando…";
      gh(rp, tk, "").then(function (info) {
        if (!info || !info.permissions || !info.permissions.push) throw { status: 403 };
        tentativasLogin = []; try { sessionStorage.setItem(GH_CHAVE, tk); localStorage.removeItem(GH_CHAVE); } catch (er) {}
        iniciarAdm(destinoGithub(rp, tk));
      }).catch(function (er) {
        if (er && (er.status === 401 || er.status === 403 || er.status === 404)) tentativasLogin.push(Date.now());
        msg.textContent = er && er.status === 401 ? "Chave inválida ou expirada." : er && (er.status === 403 || er.status === 404) ? "Essa chave não tem permissão para alterar este site." : "Não foi possível verificar agora. Confira a internet e tente de novo.";
      });
    });
  }
  function abrirPainel() {
    painel.hidden = false; document.body.style.overflow = "hidden";
    if (adm) { renderPainel(); return; }
    painel.innerHTML = '<div class="restrito"><p class="etiqueta">Painel RK</p><h2>Verificando acesso…</h2></div>';
    var rp = repoGithub();
    if (rp) {
      var tk = lerToken();
      if (!tk) { telaLoginGithub(rp); return; }
      gh(rp, tk, "").then(function (info) {
        if (!info || !info.permissions || !info.permissions.push) throw { status: 403 };
        iniciarAdm(destinoGithub(rp, tk));
      }).catch(function () { esquecerToken(); telaLoginGithub(rp, "Entre de novo com a chave de acesso."); });
      return;
    }
    Promise.all([usarCapacidade("user"), usarCapacidade("artifact")]).then(function (r) {
      var user = r[0], artifact = r[1];
      var pode = !user ? Promise.resolve(false) : Promise.resolve(user.canEdit ? user.canEdit() : false).then(function (ce) { return ce || (user.isOwner ? user.isOwner() : false); }).catch(function () { return false; });
      pode.then(function (ok) {
        if (!ok || !artifact) { painel.innerHTML = htmlRestrito("Esta área é só para quem administra o catálogo."); return; }
        iniciarAdm(artifact);
      });
    });
  }
  function fecharPainel() {
    if (adm && totalPendencias()) { var b = $("adm-aviso-saida"); if (b && b.hidden) { b.hidden = false; b.focus(); return; } }
    painel.hidden = true; document.body.style.overflow = "";
    if (location.hash === "#admin") definirHash(hashDaVista());
    if (!$("vista").innerHTML) render();
  }
  function totalPendencias() { return adm.mudou.size + adm.excluidos.size + (adm.cfgMudou ? 1 : 0); }
  function renderPainel() {
    painel.innerHTML = '<div class="painel-topo"><div class="envelope"><div><p class="etiqueta">RK Sport Style</p><h2>Painel do catálogo</h2></div>' +
      '<div class="lado"><span class="pendencias" id="adm-pend" role="status"></span><button type="button" class="botao contorno pequeno" id="adm-sair">Ver catálogo</button>' + (adm.artifact && adm.artifact.nome === "github" ? '<button type="button" class="botao contorno pequeno" id="adm-logout">Sair</button>' : "") + '<button type="button" class="botao pequeno" id="adm-salvar">Salvar e publicar</button></div></div>' +
      '<div class="envelope"><p class="aviso-painel" id="adm-aviso-saida" tabindex="-1" hidden>Você tem alterações não publicadas. Toque em <b>Salvar e publicar</b> para o site mostrar as mudanças, ou em <b>Ver catálogo</b> de novo para sair sem salvar.</p><p class="status-msg" id="adm-status" role="status"></p>' +
      '<div class="abas" role="tablist"><button type="button" role="tab" id="aba-conf" aria-controls="painel-conf" aria-selected="' + (adm.aba === "conf") + '">Conferência de estoque</button><button type="button" role="tab" id="aba-estoque" aria-controls="painel-estoque" aria-selected="' + (adm.aba === "estoque") + '">Estoque</button><button type="button" role="tab" id="aba-camisas" aria-controls="painel-camisas" aria-selected="' + (adm.aba === "camisas") + '">Catálogo completo</button><button type="button" role="tab" id="aba-config" aria-controls="painel-config" aria-selected="' + (adm.aba === "config") + '">Configurações</button></div></div></div>' +
      '<div class="envelope"><div class="aba" id="painel-conf" role="tabpanel" aria-labelledby="aba-conf"' + (adm.aba === "conf" ? "" : " hidden") + '></div><div class="aba" id="painel-estoque" role="tabpanel" aria-labelledby="aba-estoque"' + (adm.aba === "estoque" ? "" : " hidden") + '></div><div class="aba" id="painel-camisas" role="tabpanel" aria-labelledby="aba-camisas"' + (adm.aba === "camisas" ? "" : " hidden") + '></div><div class="aba" id="painel-config" role="tabpanel" aria-labelledby="aba-config"' + (adm.aba === "config" ? "" : " hidden") + "></div></div>";
    renderConferencia(); renderEstoque(); renderLista(); renderConfig(); atualizarPendencias();
    $("adm-sair").addEventListener("click", fecharPainel);
    if ($("adm-logout")) $("adm-logout").addEventListener("click", function () { esquecerToken(); adm = null; painel.hidden = true; document.body.style.overflow = ""; definirHash(hashDaVista()); });
    $("adm-salvar").addEventListener("click", publicar);
    $("aba-conf").addEventListener("click", function () { adm.aba = "conf"; renderPainel(); $("aba-conf").focus(); });
    $("aba-estoque").addEventListener("click", function () { adm.aba = "estoque"; renderPainel(); $("aba-estoque").focus(); });
    $("aba-camisas").addEventListener("click", function () { adm.aba = "camisas"; renderPainel(); $("aba-camisas").focus(); });
    $("aba-config").addEventListener("click", function () { adm.aba = "config"; renderPainel(); $("aba-config").focus(); });
  }
  /* ----- conferência de estoque: foto de referência (só no painel) x PNG original do catálogo */
  var CONF_ROT = { exata: "Correspondência exata", provavel: "Correspondência provável", nao: "Não encontrada", manual: "Escolhida por você" };
  var conf = { f: "pendente", escolher: null, busca: "" };
  function contaAprovadas(pid) { return adm.rascunho.conferencia.filter(function (c) { return c.candidato === pid && c.status === "aprovada"; }).length; }
  function renderConferencia() {
    var el = $("painel-conf"); if (!el) return;
    var L = adm.rascunho.conferencia;
    var n = { todas: L.length, pendente: 0, aprovada: 0, rejeitada: 0, exata: 0, provavel: 0, nao: 0 };
    L.forEach(function (c) { n[c.status]++; n[c.confianca === "manual" ? "provavel" : c.confianca]++; });
    var lista = L.filter(function (c) { return conf.f === "todas" || c.status === conf.f || (conf.f === "nao" && c.confianca === "nao"); });
    var ORD = { exata: 0, provavel: 1, manual: 1, nao: 2 };
    lista = lista.slice().sort(function (x, y) { return ORD[x.confianca] - ORD[y.confianca] || x.id.localeCompare(y.id); });
    var filtros = [["pendente", "Aguardando você", n.pendente], ["aprovada", "Aprovadas", n.aprovada], ["rejeitada", "Rejeitadas", n.rejeitada], ["nao", "Não encontradas", n.nao], ["todas", "Todas", n.todas]];
    var h = '<div class="estq-resumo"><div><b>' + L.length + '</b><span>modelos identificados (foto + vídeo)</span></div><div><b>' + n.exata + '</b><span>correspondências exatas</span></div><div><b>' + n.provavel + '</b><span>prováveis</span></div><div><b>' + n.nao + '</b><span>não encontradas</span></div><div><b>' + n.aprovada + '</b><span>aprovadas (disponíveis)</span></div></div>' +
      '<p class="ajuda-estq">A <b>foto de referência</b> é a sua foto do estoque e aparece só aqui no painel. No site vai sempre o <b>PNG original</b> do catálogo. Ao <b>aprovar</b>, o PNG fica DISPONÍVEL; ao <b>rejeitar</b>, nada muda no site. Se você souber qual PNG é a camiseta, use <b>Escolher PNG</b>.</p>' +
      '<div class="abas-casa conf-filtros" role="group" aria-label="Filtrar conferência">' + filtros.map(function (f) { return '<button type="button" data-cf="' + f[0] + '" aria-pressed="' + (conf.f === f[0]) + '">' + f[1] + " (" + f[2] + ")</button>"; }).join("") + "</div>" +
      '<div class="conf-lista">' + (lista.length ? lista.map(cartaoConf).join("") : '<p class="ajuda-estq">Nada aqui.</p>') + "</div>";
    el.innerHTML = h; ativarMiniaturas(el);
    if (conf.escolher) resultadosEscolha();
    el.onclick = function (e) {
      var b;
      if ((b = e.target.closest("[data-cf]"))) { conf.f = b.getAttribute("data-cf"); conf.escolher = null; renderConferencia(); var x = el.querySelector('[data-cf="' + conf.f + '"]'); if (x) x.focus(); return; }
      var card = e.target.closest("[data-conf]"); if (!card) return;
      var c = adm.rascunho.conferencia.filter(function (x) { return x.id === card.getAttribute("data-conf"); })[0];
      if (e.target.closest("[data-aprovar]")) {
        var p = acharRasc(c.candidato); if (!p) { status("O PNG " + c.candidato + " não existe mais no catálogo."); return; }
        c.status = "aprovada"; p.status = "disponivel"; if (c.tamanhos && c.tamanhos.length && !p.tamanhos.length) p.tamanhos = c.tamanhos.slice(); if (c.qtd && p.qtd == null) p.qtd = c.qtd; marcar(p.id); adm.cfgMudou = true; atualizarPendencias();
        renderConferencia(); renderEstoque(); status("Aprovada: " + (p.clube || p.id) + " (" + p.id + ") agora está DISPONÍVEL. Preencha tamanhos e preço na aba Estoque."); return;
      }
      if (e.target.closest("[data-rejeitar]") || e.target.closest("[data-desfazer]")) {
        var era = c.status === "aprovada"; c.status = e.target.closest("[data-desfazer]") ? "pendente" : "rejeitada"; adm.cfgMudou = true;
        if (era && c.candidato && !contaAprovadas(c.candidato)) { var q = acharRasc(c.candidato); if (q) { q.status = "encomenda"; marcar(q.id); } }
        atualizarPendencias(); renderConferencia(); renderEstoque(); return;
      }
      if (e.target.closest("[data-escolher]")) { conf.escolher = c.id; conf.busca = c.clube || ""; renderConferencia(); var bi = $("conf-busca"); if (bi) bi.focus(); return; }
      if (e.target.closest("[data-cancelar-escolha]")) { conf.escolher = null; renderConferencia(); return; }
      if ((b = e.target.closest("[data-usar-png]"))) {
        if (c.status === "aprovada" && c.candidato && c.candidato !== b.getAttribute("data-usar-png")) { c.status = "pendente"; if (!contaAprovadas(c.candidato)) { var r = acharRasc(c.candidato); if (r) { r.status = "encomenda"; marcar(r.id); } } }
        c.candidato = b.getAttribute("data-usar-png"); c.confianca = c.confianca === "exata" ? "exata" : "manual"; c.status = "pendente"; conf.escolher = null; adm.cfgMudou = true; atualizarPendencias();
        renderConferencia(); status("PNG " + c.candidato + " escolhido. Confira e toque em Aprovar."); return;
      }
    };
  }
  function cartaoConf(c) {
    var p = c.candidato ? acharRasc(c.candidato) : null;
    var png = p ? '<div class="conf-img png">' + htmlMini(p.imgs[0]) + '<span class="conf-leg">PNG original · ' + p.id + "</span></div>" : '<div class="conf-img vazio-png"><span>Sem PNG correspondente no arquivo</span></div>';
    var acoes = "";
    if (c.status === "aprovada") acoes = '<span class="conf-ok">✓ Aprovada: disponível no site</span><button type="button" class="botao contorno pequeno" data-desfazer>Desfazer</button>';
    else if (p) acoes = '<button type="button" class="botao pequeno" data-aprovar>Aprovar</button><button type="button" class="botao contorno pequeno" data-rejeitar>Rejeitar</button>';
    else if (c.status !== "rejeitada") acoes = '<button type="button" class="botao contorno pequeno" data-rejeitar>Marcar como conferida</button>';
    if (c.status === "rejeitada") acoes = '<span class="conf-rej">Rejeitada · não aparece no site</span><button type="button" class="botao contorno pequeno" data-desfazer>Reabrir</button>';
    acoes += '<button type="button" class="botao contorno pequeno" data-escolher>' + (p ? "Escolher outro PNG" : "Escolher PNG") + "</button>";
    var h = '<article class="conf-item ' + c.confianca + " st-" + c.status + '" data-conf="' + c.id + '">' +
      '<div class="conf-imgs">' + (c.ref ? '<div class="conf-img"><img src="' + esc(c.ref) + '" alt="Foto de referência ' + c.id + '" loading="lazy"><span class="conf-leg">Sua foto · referência</span></div>' : '<div class="conf-img vazio-png"><span>Visto no vídeo do pedido</span></div>') + '<span class="conf-seta" aria-hidden="true">→</span>' + png + "</div>" +
      '<div class="conf-info"><span class="conf-selo ' + c.confianca + '">' + CONF_ROT[c.confianca] + "</span>" +
      "<h3>" + esc(c.clube || "Clube não identificado") + "</h3><p class=\"conf-modelo\">" + esc(c.modelo) + "</p>" +
      '<dl><dt>Temporada estimada</dt><dd>' + esc(c.temporada) + "</dd>" + (c.tamanhos && c.tamanhos.length ? "<dt>Tamanhos (pedido)</dt><dd>" + esc(c.tamanhos.join(", ")) + " · " + (c.qtd || c.tamanhos.length) + (c.qtd === 1 ? " peça" : " peças") + "</dd>" : "<dt>Unidades vistas na foto</dt><dd>" + c.unidadesFoto + " <small>(confirme no estoque)</small></dd>") + '<dt>Análise</dt><dd>' + esc(c.motivo) + "</dd></dl>" +
      '<div class="conf-acoes">' + acoes + "</div>" +
      (conf.escolher === c.id ? '<div class="conf-escolha"><div class="campo"><label for="conf-busca">Pesquisar PNG no catálogo</label><input type="search" id="conf-busca" value="' + esc(conf.busca) + '" placeholder="Ex.: Flamengo, Santos, RK-080"></div><div id="conf-res"></div><button type="button" class="link-mini" data-cancelar-escolha>Cancelar</button></div>' : "") +
      "</div></article>";
    return h;
  }
  function resultadosEscolha() {
    var inp = $("conf-busca"), el = $("conf-res"); if (!inp || !el) return;
    function mostrar() {
      var q = norm(conf.busca);
      var achados = q ? adm.rascunho.produtos.filter(function (p) { var alvo = norm([p.id, p.nome, p.clube, p.modelo, p.liga, p.sug].join(" ")); return q.split(/\s+/).every(function (t) { return alvo.indexOf(t) > -1; }); }).slice(0, 40) : [];
      el.innerHTML = achados.length ? '<div class="conf-opcoes">' + achados.map(function (p) { return '<button type="button" data-usar-png="' + p.id + '" aria-label="Usar ' + p.id + '"><span class="estq-foto">' + htmlMini(p.imgs[0]) + "</span><small>" + p.id + "</small></button>"; }).join("") + "</div>" : (q ? '<p class="ajuda-estq">Nada encontrado.</p>' : "");
      ativarMiniaturas(el);
    }
    var t; inp.oninput = function () { clearTimeout(t); t = setTimeout(function () { conf.busca = inp.value; mostrar(); }, 250); };
    mostrar();
  }

  /* ----- estoque: camisetas de pronta entrega, edição rápida de tamanhos, preço e quantidade */
  var TAM_RAPIDO = ["PP", "P", "M", "G", "GG", "XG", "XGG"];
  var estq = { q: "", busca: "", conf: false };
  function renderEstoque() {
    var el = $("painel-estoque"); if (!el) return;
    var todas = adm.rascunho.produtos.filter(function (p) { return p.status === "disponivel"; });
    var lista = todas.filter(function (p) {
      if (estq.conf && !p.conferir && p.tamanhos.length && typeof p.preco === "number") return false;
      if (!estq.q) return true;
      var alvo = norm([p.id, p.nome, p.clube, p.modelo, p.costas].join(" "));
      return norm(estq.q).split(/\s+/).every(function (t) { return alvo.indexOf(t) > -1; });
    });
    var semTam = todas.filter(function (p) { return !p.tamanhos.length; }).length, semPreco = todas.filter(function (p) { return typeof p.preco !== "number"; }).length;
    var pecas = todas.reduce(function (s, p) { return s + (p.qtd || 0); }, 0), nConf = todas.filter(function (p) { return p.conferir; }).length;
    var h = '<div class="estq-resumo"><div><b>' + todas.length + '</b><span>modelos em estoque</span></div><div><b>' + pecas + '</b><span>peças</span></div><div><b>' + semTam + '</b><span>sem tamanho</span></div><div><b>' + semPreco + '</b><span>sem preço</span></div><div><b>' + nConf + '</b><span>para conferir</span></div></div>' +
      '<p class="ajuda-estq">Toque nos tamanhos que você tem, digite o preço e a quantidade. As mudanças aparecem no site depois de <b>Salvar e publicar</b>. Quando acabar, toque em <b>Esgotou</b>: a camiseta volta para o catálogo sob encomenda.</p>' +
      '<div class="filtros-painel"><label class="so-leitor" for="estq-q">Pesquisar no estoque</label><input type="search" id="estq-q" placeholder="Pesquisar no estoque…" value="' + esc(estq.q) + '">' +
      '<label class="chave"><input type="checkbox" id="estq-conf"' + (estq.conf ? " checked" : "") + '> Só as que faltam informação</label>' +
      '<button type="button" class="botao pequeno" id="estq-nova">Cadastrar camiseta nova</button></div>' +
      '<details class="estq-add"' + (estq.busca ? " open" : "") + '><summary>Já está no catálogo? Mover uma camiseta do sob encomenda para o estoque</summary><div class="campo"><label for="estq-busca">Pesquisar no catálogo</label><input type="search" id="estq-busca" placeholder="Ex.: Flamengo 2024, Messi…" value="' + esc(estq.busca) + '"></div><div id="estq-res"></div></details>' +
      '<div class="estq-lista">' + (lista.length ? lista.map(linhaEstoque).join("") : '<p class="ajuda-estq">Nenhuma camiseta aqui.</p>') + "</div>";
    el.innerHTML = h; ativarMiniaturas(el); resultadosMover();
    var tq;
    $("estq-q").addEventListener("input", function (e) { clearTimeout(tq); tq = setTimeout(function () { estq.q = e.target.value; renderEstoque(); var q = $("estq-q"); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }, 250); });
    $("estq-conf").addEventListener("change", function (e) { estq.conf = e.target.checked; renderEstoque(); $("estq-conf").focus(); });
    $("estq-nova").addEventListener("click", function () { abrirEditor(null, "disponivel"); });
    var tb;
    $("estq-busca").addEventListener("input", function (e) { clearTimeout(tb); tb = setTimeout(function () { estq.busca = e.target.value; resultadosMover(); }, 250); });
    el.querySelector(".estq-lista").addEventListener("click", function (e) {
      var row = e.target.closest("[data-estq]"); if (!row) return;
      var p = acharRasc(row.getAttribute("data-estq")), b;
      if ((b = e.target.closest("[data-t]"))) {
        var t = b.getAttribute("data-t"), i = p.tamanhos.indexOf(t);
        if (i > -1) p.tamanhos.splice(i, 1); else { p.tamanhos.push(t); p.tamanhos.sort(function (a, c) { return TAM_RAPIDO.indexOf(a) - TAM_RAPIDO.indexOf(c); }); }
        b.setAttribute("aria-pressed", String(i < 0)); marcar(p.id); atualizarAlertas(row, p); return;
      }
      if (e.target.closest("[data-esgotou]")) { p.status = "encomenda"; marcar(p.id); renderEstoque(); status(p.id + " saiu do estoque e voltou para o catálogo sob encomenda."); return; }
      if (e.target.closest("[data-conferido]")) { p.conferir = ""; marcar(p.id); renderEstoque(); return; }
      if (e.target.closest("[data-editar-estq]")) abrirEditor(p.id);
    });
    el.querySelector(".estq-lista").addEventListener("change", function (e) {
      var row = e.target.closest("[data-estq]"); if (!row) return;
      var p = acharRasc(row.getAttribute("data-estq"));
      if (e.target.hasAttribute("data-preco")) {
        var txt = e.target.value.trim(), v = lerPreco(txt);
        if (txt && v === null) { e.target.setAttribute("aria-invalid", "true"); status("Preço inválido em " + p.id + ". Use só números, como 199,90."); return; }
        e.target.removeAttribute("aria-invalid"); p.preco = v; e.target.value = v === null ? "" : v.toFixed(2).replace(".", ",");
      }
      if (e.target.hasAttribute("data-qtd")) { var q = parseInt(e.target.value, 10); p.qtd = isFinite(q) && q >= 0 ? q : null; if (p.qtd === 0) { p.status = "encomenda"; marcar(p.id); renderEstoque(); status(p.id + " ficou com 0 peças e voltou para o catálogo sob encomenda."); return; } }
      marcar(p.id); atualizarAlertas(row, p);
    });
  }
  function alertasEstoque(p) {
    var a = [];
    if (!p.imgs.length) a.push("Falta foto (não aparece no site)");
    if (!p.tamanhos.length) a.push("Falta tamanho");
    if (typeof p.preco !== "number") a.push("Falta preço");
    return a;
  }
  function atualizarAlertas(row, p) { var a = row.querySelector(".estq-alertas"); a.textContent = alertasEstoque(p).join(" · "); row.className = "estq-item" + (alertasEstoque(p).length || p.conferir ? " pendente-estq" : ""); }
  function linhaEstoque(p) {
    var nome = p.nome || p.clube || "Sem nome", al = alertasEstoque(p);
    return '<div class="estq-item' + (al.length || p.conferir ? " pendente-estq" : "") + '" data-estq="' + p.id + '">' +
      '<div class="estq-foto' + (p.imgs.length ? "" : " sem-foto") + '">' + (p.imgs.length ? htmlMini(p.imgs[0]) : '<button type="button" data-editar-estq>+ Foto</button>') + "</div>" +
      '<div class="estq-info"><div class="estq-nome"><b>' + esc(nome) + "</b>" + (p.modelo ? " <span>" + esc(p.modelo) + "</span>" : "") + ' <code>' + p.id + "</code></div>" +
      (p.conferir ? '<p class="estq-conferir">⚠ ' + esc(p.conferir) + ' <button type="button" class="link-mini" data-conferido>Já conferi</button></p>' : "") +
      '<div class="estq-campos"><div class="estq-tams" role="group" aria-label="Tamanhos de ' + p.id + '">' + TAM_RAPIDO.concat(p.tamanhos.filter(function (t) { return TAM_RAPIDO.indexOf(t) < 0; })).map(function (t) { return '<button type="button" data-t="' + esc(t) + '" aria-pressed="' + (p.tamanhos.indexOf(t) > -1) + '">' + esc(t) + "</button>"; }).join("") + "</div>" +
      '<label class="estq-campo"><span>R$</span><input type="text" inputmode="decimal" data-preco value="' + (typeof p.preco === "number" ? p.preco.toFixed(2).replace(".", ",") : "") + '" placeholder="0,00" aria-label="Preço de ' + p.id + '"></label>' +
      '<label class="estq-campo qtd"><span>Qtd.</span><input type="number" min="0" inputmode="numeric" data-qtd value="' + (p.qtd == null ? "" : p.qtd) + '" aria-label="Quantidade de ' + p.id + '"></label></div>' +
      '<p class="estq-alertas" aria-live="polite">' + al.join(" · ") + "</p></div>" +
      '<div class="estq-acoes"><button type="button" class="botao contorno pequeno" data-editar-estq aria-label="Editar ' + p.id + '">Editar</button><button type="button" class="botao contorno pequeno" data-esgotou aria-label="Esgotou ' + p.id + '">Esgotou</button></div></div>';
  }
  function resultadosMover() {
    var el = $("estq-res"); if (!el) return;
    var q = norm(estq.busca);
    if (!q) { el.innerHTML = ""; return; }
    var achados = adm.rascunho.produtos.filter(function (p) { if (p.status === "disponivel") return false; var alvo = norm([p.id, p.nome, p.clube, p.modelo, p.costas, p.tipo, p.liga].join(" ")); return q.split(/\s+/).every(function (t) { return alvo.indexOf(t) > -1; }); }).slice(0, 24);
    el.innerHTML = achados.length ? '<div class="estq-mover">' + achados.map(function (p) { return '<button type="button" data-mover="' + p.id + '"><span class="estq-foto">' + htmlMini(p.imgs[0]) + '</span><span>' + esc(p.nome || p.clube || "Sem nome") + (p.modelo ? " · " + esc(p.modelo) : "") + "<small>" + p.id + "</small></span><b>Tenho em estoque</b></button>"; }).join("") + "</div>" : '<p class="ajuda-estq">Nada encontrado.</p>';
    ativarMiniaturas(el);
    el.onclick = function (e) {
      var b = e.target.closest("[data-mover]"); if (!b) return;
      var p = acharRasc(b.getAttribute("data-mover")); p.status = "disponivel"; marcar(p.id);
      estq.busca = ""; renderEstoque(); status(p.id + " foi para o estoque. Agora marque os tamanhos e o preço.");
    };
  }
  function hashDados(d) { var s = JSON.stringify(d), h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }
  function guardarRascunho() { try { sessionStorage.setItem("rk_rascunho", JSON.stringify({ base: hashDados(DADOS), d: adm.rascunho, mudou: Array.from(adm.mudou), excl: Array.from(adm.excluidos), cfg: adm.cfgMudou })); } catch (e) {} }
  function atualizarPendencias() {
    var n = totalPendencias(), el = $("adm-pend");
    if (el) el.textContent = n ? n + (n === 1 ? " alteração não publicada" : " alterações não publicadas") : "Tudo publicado";
    if (n) guardarRascunho(); else { try { sessionStorage.removeItem("rk_rascunho"); } catch (e) {} }
  }
  function recuperarRascunho() {
    try {
      var s = JSON.parse(sessionStorage.getItem("rk_rascunho") || "null"); if (!s) return;
      if (hashDados(s.d) === hashDados(DADOS)) { sessionStorage.removeItem("rk_rascunho"); return; }
      if (s.base !== hashDados(DADOS)) { adm.recuperavel = s; return; }
      adm.rascunho = s.d; normalizar(adm.rascunho); adm.mudou = new Set(s.mudou); adm.excluidos = new Set(s.excl); adm.cfgMudou = !!s.cfg;
    } catch (e) {}
  }
  function filtrarAdm() {
    var f = adm.f;
    return adm.rascunho.produtos.filter(function (p) {
      if (f.status === "oculto") { if (!p.oculto) return false; }
      else if (f.status && p.status !== f.status) return false;
      if (f.grupo && p.grupo !== f.grupo) return false;
      if (f.soMudou && !adm.mudou.has(p.id)) return false;
      if (f.q) { var alvo = norm([p.id, p.nome, p.clube, p.liga, p.modelo, p.tipo, p.costas, p.sug, GRUPOS[p.grupo]].join(" ")); if (!norm(f.q).split(/\s+/).every(function (t) { return alvo.indexOf(t) > -1; })) return false; }
      return true;
    });
  }
  function renderLista() {
    var el = $("painel-camisas"); if (!el) return;
    var lista = filtrarAdm(), POR = 50, pags = Math.max(1, Math.ceil(lista.length / POR));
    if (adm.pagina >= pags) adm.pagina = pags - 1;
    var pagina = lista.slice(adm.pagina * POR, adm.pagina * POR + POR);
    var todos = adm.rascunho.produtos, c = contagens(todos);
    var nOc = todos.filter(function (p) { return p.oculto; }).length, nCl = todos.filter(function (p) { return p.grupo === "classificar"; }).length;
    var h = (adm.recuperavel ? '<p class="aviso-painel">Há alterações de uma sessão anterior que não chegaram a ser publicadas. <button type="button" class="botao pequeno" id="adm-recuperar">Recuperar alterações</button> <button type="button" class="botao contorno pequeno" id="adm-descartar">Descartar</button></p>' : "") +
      '<p class="aviso-painel">' + todos.length + " camisas · <b>" + c.disponivel + "</b> disponíveis · <b>" + c.encomenda + "</b> sob encomenda · <b>" + c.indisponivel + "</b> indisponíveis · <b>" + nOc + "</b> ocultas · <b>" + nCl + "</b> a classificar</p>" +
      '<div class="filtros-painel"><label class="so-leitor" for="adm-q">Pesquisar camisas cadastradas</label><input type="search" id="adm-q" placeholder="Pesquisar por time, código, nome nas costas…" value="' + esc(adm.f.q) + '">' +
      '<label class="so-leitor" for="adm-fs">Filtrar disponibilidade</label><select id="adm-fs"><option value="">Toda disponibilidade</option>' + Object.keys(STATUS).map(function (k) { return '<option value="' + k + '"' + (adm.f.status === k ? " selected" : "") + ">" + STATUS[k] + "</option>"; }).join("") + '<option value="oculto"' + (adm.f.status === "oculto" ? " selected" : "") + ">Ocultas</option></select>" +
      '<label class="so-leitor" for="adm-fg">Filtrar categoria</label><select id="adm-fg"><option value="">Todas as categorias</option>' + Object.keys(GRUPOS).map(function (k) { return '<option value="' + k + '"' + (adm.f.grupo === k ? " selected" : "") + ">" + GRUPOS[k] + "</option>"; }).join("") + "</select>" +
      '<label class="chave"><input type="checkbox" id="adm-fm"' + (adm.f.soMudou ? " checked" : "") + "> Só alteradas</label>" +
      '<button type="button" class="botao pequeno" id="adm-nova">Nova camisa</button></div>' +
      '<div class="lote" id="adm-lote"' + (adm.sel.size ? "" : " hidden") + '><b id="adm-nsel">' + adm.sel.size + ' selecionadas</b><span>Marcar como:</span>' +
      '<button type="button" class="botao pequeno" data-lote="disponivel">Disponível</button><button type="button" class="botao contorno pequeno" data-lote="encomenda">Sob encomenda</button><button type="button" class="botao contorno pequeno" data-lote="indisponivel">Indisponível</button>' +
      '<button type="button" class="botao contorno pequeno" data-ocultar="1">Ocultar</button><button type="button" class="botao contorno pequeno" data-ocultar="0">Mostrar</button>' +
      '<button type="button" class="botao contorno pequeno perigo" id="adm-lote-excluir">Excluir</button><button type="button" class="botao contorno pequeno" id="adm-lote-limpar">Limpar seleção</button>' +
      '<div class="confirmar" id="adm-lote-conf" hidden><span>Excluir as camisas selecionadas do catálogo? Isso só vale depois de publicar.</span><div class="opcoes"><button type="button" class="botao pequeno" id="adm-lote-conf-sim">Sim, excluir</button><button type="button" class="botao contorno pequeno" id="adm-lote-conf-nao">Cancelar</button></div></div></div>' +
      '<div class="tabela-envelope"><table class="lista"><caption class="so-leitor">Camisas cadastradas (' + lista.length + ")</caption><thead><tr>" +
      '<th scope="col"><input type="checkbox" id="adm-todas" aria-label="Selecionar todas desta página"></th><th scope="col">Foto</th><th scope="col">Código</th><th scope="col">Produto</th><th scope="col">Categoria</th><th scope="col">Disponibilidade</th><th scope="col">Preço</th><th scope="col"><span class="so-leitor">Ações</span></th></tr></thead><tbody>' +
      pagina.map(function (p) {
        return '<tr data-id="' + p.id + '"' + (adm.mudou.has(p.id) ? ' class="mudou"' : "") + '><td><input type="checkbox" data-sel="' + p.id + '" aria-label="Selecionar ' + p.id + '"' + (adm.sel.has(p.id) ? " checked" : "") + "></td>" +
          '<td><div class="mini">' + htmlMini(p.imgs[0]) + "</div></td><td><code>" + p.id + "</code>" + (p.oculto ? '<div class="sug">Oculta</div>' : "") + (p.conferir ? '<div class="sug">⚠ Conferir</div>' : "") + "</td>" +
          "<td>" + (p.nome || p.clube ? esc(p.nome || p.clube) : "<i>A classificar</i>") + (p.costas ? '<div class="sug">' + esc(p.costas) + "</div>" : "") + (p.grupo === "classificar" && p.sug ? '<div class="sug">Sugestão: ' + esc(p.sug) + "</div>" : "") + "</td>" +
          "<td>" + esc(GRUPOS[p.grupo]) + (p.liga ? '<div class="sug">' + esc(p.liga) + "</div>" : "") + "</td>" +
          '<td><label class="so-leitor" for="st-' + p.id + '">Disponibilidade de ' + p.id + '</label><select id="st-' + p.id + '" data-status="' + p.id + '">' + Object.keys(STATUS).map(function (k) { return '<option value="' + k + '"' + (p.status === k ? " selected" : "") + ">" + STATUS[k] + "</option>"; }).join("") + "</select></td>" +
          "<td>" + esc(moeda(p.preco)) + '</td><td><button type="button" class="botao contorno pequeno" data-editar="' + p.id + '" aria-label="Editar ' + p.id + '">Editar</button></td></tr>';
      }).join("") + "</tbody></table></div>" +
      '<div class="paginacao"><button type="button" class="botao contorno pequeno" id="adm-ant"' + (adm.pagina ? "" : " disabled") + '>Anterior</button><span>Página ' + (adm.pagina + 1) + " de " + pags + " · " + lista.length + ' camisas</span><button type="button" class="botao contorno pequeno" id="adm-prox"' + (adm.pagina < pags - 1 ? "" : " disabled") + ">Próxima</button></div>";
    el.innerHTML = h;
    ativarMiniaturas(el);
    var tq;
    $("adm-q").addEventListener("input", function (e) { clearTimeout(tq); tq = setTimeout(function () { adm.f.q = e.target.value; adm.pagina = 0; renderLista(); var q = $("adm-q"); q.focus(); q.setSelectionRange(q.value.length, q.value.length); }, 200); });
    $("adm-fs").addEventListener("change", function (e) { adm.f.status = e.target.value; adm.pagina = 0; renderLista(); $("adm-fs").focus(); });
    $("adm-fg").addEventListener("change", function (e) { adm.f.grupo = e.target.value; adm.pagina = 0; renderLista(); $("adm-fg").focus(); });
    $("adm-fm").addEventListener("change", function (e) { adm.f.soMudou = e.target.checked; adm.pagina = 0; renderLista(); $("adm-fm").focus(); });
    $("adm-nova").addEventListener("click", function () { abrirEditor(null); });
    $("adm-ant").addEventListener("click", function () { adm.pagina--; renderLista(); $("adm-ant").focus(); });
    $("adm-prox").addEventListener("click", function () { adm.pagina++; renderLista(); $("adm-prox").focus(); });
    if ($("adm-recuperar")) $("adm-recuperar").addEventListener("click", function () { var s = adm.recuperavel; adm.rascunho = s.d; normalizar(adm.rascunho); adm.mudou = new Set(s.mudou); adm.excluidos = new Set(s.excl); adm.cfgMudou = !!s.cfg; adm.recuperavel = null; renderPainel(); });
    if ($("adm-descartar")) $("adm-descartar").addEventListener("click", function () { adm.recuperavel = null; try { sessionStorage.removeItem("rk_rascunho"); } catch (e) {} renderLista(); });
    $("adm-todas").addEventListener("change", function (e) { pagina.forEach(function (p) { e.target.checked ? adm.sel.add(p.id) : adm.sel.delete(p.id); }); renderLista(); $("adm-todas").focus(); });
    el.querySelector("tbody").addEventListener("change", function (e) {
      var s = e.target.getAttribute("data-sel");
      if (s) { e.target.checked ? adm.sel.add(s) : adm.sel.delete(s); $("adm-lote").hidden = !adm.sel.size; $("adm-nsel").textContent = adm.sel.size + " selecionadas"; return; }
      var st = e.target.getAttribute("data-status");
      if (st) { acharRasc(st).status = e.target.value; marcar(st); e.target.closest("tr").classList.add("mudou"); }
    });
    el.querySelector("tbody").addEventListener("click", function (e) { var b = e.target.closest("[data-editar]"); if (b) abrirEditor(b.getAttribute("data-editar")); });
    el.querySelectorAll("[data-lote]").forEach(function (b) {
      b.addEventListener("click", function () { var v = b.getAttribute("data-lote"), n = adm.sel.size; adm.sel.forEach(function (id) { var p = acharRasc(id); if (p) { p.status = v; marcar(id); } }); adm.sel.clear(); renderLista(); status(STATUS[v] + " aplicado em " + n + " camisas. Toque em Salvar e publicar."); });
    });
    el.querySelectorAll("[data-ocultar]").forEach(function (b) {
      b.addEventListener("click", function () { var v = b.getAttribute("data-ocultar") === "1", n = adm.sel.size; adm.sel.forEach(function (id) { var p = acharRasc(id); if (p) { p.oculto = v; marcar(id); } }); adm.sel.clear(); renderLista(); status(n + " camisas " + (v ? "ocultadas" : "voltaram a aparecer") + ". Toque em Salvar e publicar."); });
    });
    $("adm-lote-excluir").addEventListener("click", function () { $("adm-lote-conf").hidden = false; $("adm-lote-conf-sim").focus(); });
    $("adm-lote-conf-nao").addEventListener("click", function () { $("adm-lote-conf").hidden = true; });
    $("adm-lote-conf-sim").addEventListener("click", function () { var n = adm.sel.size; adm.sel.forEach(excluir); adm.sel.clear(); renderLista(); status(n + " camisas excluídas do rascunho."); });
    $("adm-lote-limpar").addEventListener("click", function () { adm.sel.clear(); renderLista(); });
  }
  function acharRasc(id) { for (var i = 0; i < adm.rascunho.produtos.length; i++) if (adm.rascunho.produtos[i].id === id) return adm.rascunho.produtos[i]; return null; }
  function marcar(id) { adm.mudou.add(id); atualizarPendencias(); }
  function excluir(id) { adm.rascunho.produtos = adm.rascunho.produtos.filter(function (p) { return p.id !== id; }); adm.mudou.delete(id); adm.excluidos.add(id); atualizarPendencias(); }
  function status(msg) { var s = $("adm-status"); if (s) s.textContent = msg; }

  /* ----- editor */
  function valoresExistentes(campo) { var s = {}; adm.rascunho.produtos.forEach(function (p) { if (p[campo]) s[p[campo]] = 1; }); return Object.keys(s).sort(function (a, b) { return a.localeCompare(b, "pt-BR"); }); }
  function proximoId() {
    var max = 0;
    adm.rascunho.produtos.concat(DADOS.produtos).concat(Array.from(adm.excluidos).map(function (id) { return { id: id }; })).forEach(function (p) { var n = parseInt(String(p.id).replace(/\D/g, ""), 10); if (n > max) max = n; });
    return "RK-" + String(max + 1).padStart(3, "0");
  }
  var edicao = null;
  function abrirEditor(id, statusInicial) {
    var novo = !id, p = novo ? { id: proximoId(), nome: "", clube: "", grupo: "classificar", liga: "", comp: [], modelo: "", tipo: "", costas: "", tamanhos: [], preco: null, status: statusInicial || "encomenda", oculto: false, novidade: false, criado: Date.now(), obs: "", sug: "", imgs: [], qtd: null, conferir: "" } : clonar(acharRasc(id));
    edicao = { p: p, novo: novo };
    var r = adm.rascunho, comps = r.config.competicoes || [];
    function opcoes(lista, atual, attr) { return lista.concat((atual || []).filter(function (x) { return lista.indexOf(x) < 0; })).map(function (v) { return '<button type="button" ' + attr + '="' + esc(v) + '" aria-pressed="' + ((atual || []).indexOf(v) > -1) + '">' + esc(v) + "</button>"; }).join(""); }
    editor.innerHTML = '<div class="doc-topo"><h2 id="editor-titulo">' + (novo ? "Nova camisa" : "Editar " + p.id) + '</h2><button type="button" class="fechar" data-fechar>Fechar</button></div><div class="doc-corpo"><form class="form-painel" id="form-ed" novalidate>' +
      (p.conferir ? '<p class="aviso-painel">⚠ ' + esc(p.conferir) + "</p>" : "") +
      (p.sug ? '<p class="aviso-painel">Sugestão da classificação automática: <b>' + esc(p.sug) + '</b>. Confira a foto antes de usar. <button type="button" class="botao contorno pequeno" id="ed-usar-sug">Usar sugestão</button></p>' : "") +
      '<div class="campo"><span class="rotulo" id="r-imgs">Fotos</span><div class="imagens" id="ed-imgs" aria-labelledby="r-imgs"></div>' +
      '<label class="botao contorno pequeno" for="ed-arquivo" style="justify-self:start">Adicionar fotos</label><input type="file" id="ed-arquivo" accept="image/*" multiple class="so-leitor"><span class="ajuda">As fotos novas são reduzidas para até 1000 px e salvas junto com o site, sem cortar nem distorcer. A primeira foto é a capa.</span></div>' +
      '<div class="campo"><label for="ed-nome">Nome do produto (opcional)</label><input type="text" id="ed-nome" value="' + esc(p.nome) + '" placeholder="Se vazio, usa o nome do clube ou seleção"><span class="ajuda">Ex.: “Flamengo Retrô 2009”. É o nome que aparece no card e na mensagem do WhatsApp.</span></div>' +
      '<div class="linha2"><div class="campo"><label for="ed-clube">Clube ou seleção</label><input type="text" id="ed-clube" list="ed-l-clubes" value="' + esc(p.clube) + '"><datalist id="ed-l-clubes">' + valoresExistentes("clube").map(function (v) { return '<option value="' + esc(v) + '">'; }).join("") + "</datalist></div>" +
      '<div class="campo"><label for="ed-grupo">Categoria</label><select id="ed-grupo">' + Object.keys(GRUPOS).map(function (k) { return '<option value="' + k + '"' + (p.grupo === k ? " selected" : "") + ">" + GRUPOS[k] + "</option>"; }).join("") + "</select></div></div>" +
      '<div class="linha2"><div class="campo"><label for="ed-liga">Liga (clubes estrangeiros)</label><input type="text" id="ed-liga" list="ed-l-ligas" value="' + esc(p.liga) + '"><datalist id="ed-l-ligas">' + (r.config.ligas || []).concat(valoresExistentes("liga")).filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (v) { return '<option value="' + esc(v) + '">'; }).join("") + '</datalist><span class="ajuda">Ligas da lista de Europa aparecem na categoria Europa.</span></div>' +
      '<div class="campo"><label for="ed-modelo">Modelo ou temporada</label><input type="text" id="ed-modelo" value="' + esc(p.modelo) + '" placeholder="Ex.: 2024/25 titular"></div></div>' +
      '<div class="linha2"><div class="campo"><label for="ed-tipo">Tipo de camisa</label><input type="text" id="ed-tipo" list="ed-l-tipos" value="' + esc(p.tipo) + '"><datalist id="ed-l-tipos">' + TIPOS.map(function (v) { return '<option value="' + v + '">'; }).join("") + "</datalist></div>" +
      '<div class="campo"><label for="ed-costas">Nome e número nas costas</label><input type="text" id="ed-costas" value="' + esc(p.costas) + '" placeholder="Ex.: MESSI 10"></div></div>' +
      '<div class="campo"><span class="rotulo" id="r-tam">Tamanhos disponíveis</span><div class="opcoes" role="group" aria-labelledby="r-tam" id="ed-tams">' + opcoes(TAMANHOS, p.tamanhos, "data-tam") + "</div>" +
      '<div style="display:flex;gap:8px"><label class="so-leitor" for="ed-tam-novo">Outro tamanho</label><input type="text" id="ed-tam-novo" placeholder="Outro tamanho" style="max-width:180px;background:var(--grafite);border:1px solid var(--linha);border-radius:10px;padding:8px 12px;color:var(--branco)"><button type="button" class="botao contorno pequeno" id="ed-tam-add">Adicionar</button></div></div>' +
      '<div class="linha2"><div class="campo"><label for="ed-preco">Preço (R$)</label><input type="text" id="ed-preco" inputmode="decimal" value="' + (typeof p.preco === "number" ? p.preco.toFixed(2).replace(".", ",") : "") + '" placeholder="Deixe vazio para “consulte”"></div>' +
      '<div class="campo"><span class="rotulo" id="r-st">Disponibilidade</span><div class="opcoes" role="radiogroup" aria-labelledby="r-st" id="ed-status">' + Object.keys(STATUS).map(function (k) { return '<button type="button" role="radio" data-st="' + k + '" aria-checked="' + (p.status === k) + '">' + STATUS[k] + "</button>"; }).join("") + "</div></div></div>" +
      '<div class="campo"><label for="ed-qtd">Quantidade em estoque (só aparece no painel)</label><input type="number" min="0" id="ed-qtd" value="' + (p.qtd == null ? "" : p.qtd) + '" style="max-width:160px"></div>' +
      '<div class="linha2"><label class="chave"><input type="checkbox" id="ed-oculto"' + (p.oculto ? " checked" : "") + '> Ocultar temporariamente do site</label></div>' +
      '<div class="campo"><span class="rotulo" id="r-comp">Competições (só se aparecer na camisa)</span><div class="opcoes" role="group" aria-labelledby="r-comp" id="ed-comp">' + opcoes(comps, p.comp, "data-comp") + "</div></div>" +
      '<div class="campo"><label for="ed-obs">Observação pública (opcional)</label><textarea id="ed-obs" maxlength="200">' + esc(p.obs) + "</textarea></div>" +
      '<p class="status-msg" id="ed-msg" role="alert"></p>' +
      '<div class="acoes-editor">' + (novo ? "<span></span>" : '<button type="button" class="botao contorno pequeno perigo" id="ed-excluir">Excluir camisa</button>') + '<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="botao contorno pequeno" data-fechar>Cancelar</button><button type="submit" class="botao pequeno">' + (novo ? "Adicionar ao catálogo" : "Aplicar alterações") + "</button></div></div>" +
      '<div class="confirmar" id="ed-conf" hidden><span>Excluir esta camisa do catálogo? Isso só vale depois de publicar.</span><div class="opcoes"><button type="button" class="botao pequeno" id="ed-conf-sim">Sim, excluir</button><button type="button" class="botao contorno pequeno" id="ed-conf-nao">Cancelar</button></div></div>' +
      "</form></div>";
    renderImgsEditor();
    editor.querySelectorAll("[data-fechar]").forEach(function (b) { b.addEventListener("click", function () { editor.close(); }); });
    $("ed-tams").addEventListener("click", function (e) { var b = e.target.closest("[data-tam]"); if (b) b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); });
    $("ed-comp").addEventListener("click", function (e) { var b = e.target.closest("[data-comp]"); if (b) b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true")); });
    $("ed-status").addEventListener("click", function (e) { var b = e.target.closest("[data-st]"); if (!b) return; $("ed-status").querySelectorAll("[data-st]").forEach(function (x) { x.setAttribute("aria-checked", String(x === b)); }); });
    $("ed-tam-add").addEventListener("click", function () { var v = $("ed-tam-novo").value.trim(); if (!v) return; var b = document.createElement("button"); b.type = "button"; b.setAttribute("data-tam", v); b.setAttribute("aria-pressed", "true"); b.textContent = v; $("ed-tams").appendChild(b); $("ed-tam-novo").value = ""; });
    if ($("ed-usar-sug")) $("ed-usar-sug").addEventListener("click", function () { var s = p.sug.split(" (")[0].trim(); $("ed-clube").value = s; var k = adm.rascunho.produtos.filter(function (q) { return q.clube && norm(q.clube) === norm(s); })[0]; if (k) { $("ed-grupo").value = k.grupo; $("ed-liga").value = k.liga || ""; } $("ed-clube").focus(); });
    $("ed-arquivo").addEventListener("change", function (e) { adicionarFotos(e.target.files); e.target.value = ""; });
    if ($("ed-excluir")) {
      $("ed-excluir").addEventListener("click", function () { $("ed-conf").hidden = false; $("ed-conf-sim").focus(); });
      $("ed-conf-nao").addEventListener("click", function () { $("ed-conf").hidden = true; $("ed-excluir").focus(); });
      $("ed-conf-sim").addEventListener("click", function () { excluir(p.id); editor.close(); renderLista(); renderEstoque(); status(p.id + " excluída do rascunho. Toque em Salvar e publicar."); });
    }
    $("form-ed").addEventListener("submit", function (e) { e.preventDefault(); aplicarEditor(); });
    editor.showModal();
    (novo ? $("ed-nome") : editor.querySelector("[data-fechar]")).focus();
  }
  function renderImgsEditor() {
    var imgs = edicao.p.imgs;
    $("ed-imgs").innerHTML = imgs.length ? imgs.map(function (im, k) {
      return '<figure><div class="moldura"><img src="' + esc(srcGrande(im)) + '" alt="Foto ' + (k + 1) + '" loading="lazy"></div>' +
        '<div class="opcoes">' + (k ? '<button type="button" data-capa="' + k + '" aria-label="Usar foto ' + (k + 1) + ' como capa">Capa</button>' : '<span class="etiqueta">Capa</span>') +
        '<button type="button" data-remover="' + k + '" aria-label="Remover foto ' + (k + 1) + '">Remover</button></div></figure>';
    }).join("") : '<span class="ajuda">Nenhuma foto ainda.</span>';
    $("ed-imgs").onclick = function (e) {
      var c = e.target.closest("[data-capa]"), r = e.target.closest("[data-remover]");
      if (c) { var k = +c.getAttribute("data-capa"); imgs.unshift(imgs.splice(k, 1)[0]); renderImgsEditor(); }
      if (r) { imgs.splice(+r.getAttribute("data-remover"), 1); renderImgsEditor(); }
    };
  }
  function adicionarFotos(arquivos) {
    var msg = $("ed-msg"); msg.textContent = "Preparando fotos…";
    Promise.all(Array.prototype.slice.call(arquivos || []).map(otimizarFoto)).then(function (res) {
      res.forEach(function (r) { if (r) edicao.p.imgs.push(r); });
      msg.textContent = res.filter(Boolean).length + " foto(s) adicionada(s).";
      renderImgsEditor();
    }).catch(function () { msg.textContent = "Não foi possível ler uma das fotos. Use PNG, JPG ou WebP."; });
  }
  function otimizarFoto(arq) {
    return new Promise(function (ok, erro) {
      if (!/^image\//.test(arq.type)) { ok(null); return; }
      var url = URL.createObjectURL(arq), img = new Image();
      img.onload = function () {
        var M = 1000, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, M / Math.max(w, h));
        var cv = document.createElement("canvas"); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
        var ctx = cv.getContext("2d"); ctx.fillStyle = "#f0f0ee"; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        var data = cv.toDataURL("image/jpeg", 0.86); /* JPEG abre em qualquer celular, inclusive iPhones antigos */
        URL.revokeObjectURL(url); ok({ data: data, w: cv.width, h: cv.height });
      };
      img.onerror = function () { URL.revokeObjectURL(url); erro(); };
      img.src = url;
    });
  }
  function aplicarEditor() {
    var p = edicao.p, msg = $("ed-msg");
    p.nome = $("ed-nome").value.trim();
    p.clube = $("ed-clube").value.trim(); p.grupo = $("ed-grupo").value; p.liga = $("ed-liga").value.trim();
    p.modelo = $("ed-modelo").value.trim(); p.tipo = $("ed-tipo").value.trim(); p.costas = $("ed-costas").value.trim(); p.obs = $("ed-obs").value.trim();
    p.oculto = $("ed-oculto").checked; p.novidade = false;
    var qv = parseInt($("ed-qtd").value, 10); p.qtd = isFinite(qv) && qv >= 0 ? qv : null;
    p.tamanhos = Array.prototype.map.call($("ed-tams").querySelectorAll('[aria-pressed="true"]'), function (b) { return b.getAttribute("data-tam"); });
    p.comp = Array.prototype.map.call($("ed-comp").querySelectorAll('[aria-pressed="true"]'), function (b) { return b.getAttribute("data-comp"); });
    var st = $("ed-status").querySelector('[aria-checked="true"]'); p.status = st ? st.getAttribute("data-st") : "encomenda";
    var precoTxt = $("ed-preco").value.trim(); p.preco = lerPreco(precoTxt);
    if (precoTxt && p.preco === null) { msg.textContent = "Preço inválido. Use só números, como 199,90."; $("ed-preco").focus(); return; }
    var semFoto = !p.imgs.length;
    if (p.grupo !== "classificar" && !p.clube) { msg.textContent = "Informe o clube ou a seleção, ou escolha a categoria “A classificar”."; $("ed-clube").focus(); return; }
    if (p.grupo !== "classificar") p.sug = "";
    if (edicao.novo) adm.rascunho.produtos.unshift(p);
    else { var i = adm.rascunho.produtos.findIndex(function (q) { return q.id === p.id; }); adm.rascunho.produtos[i] = p; }
    marcar(p.id); editor.close(); renderLista(); renderEstoque();
    status((edicao.novo ? "Camisa " + p.id + " adicionada" : p.id + " atualizada") + (semFoto ? ". Ela só aparece no site depois de ter uma foto." : ". Toque em Salvar e publicar para aparecer no site."));
  }

  /* ----- configurações */
  function renderConfig() {
    var el = $("painel-config"); if (!el) return;
    var c = adm.rascunho.config, emp = c.empresa || {}, d = c.destaques || {};
    function campo(id, rot, val, ajuda, tipo) { return '<div class="campo"><label for="' + id + '">' + rot + '</label><input type="' + (tipo || "text") + '" id="' + id + '" value="' + esc(val || "") + '">' + (ajuda ? '<span class="ajuda">' + ajuda + "</span>" : "") + "</div>"; }
    el.innerHTML = '<form class="form-painel" id="form-cfg" novalidate><h3>Contato</h3>' +
      '<div class="linha2">' + campo("cf-wa", "Número do WhatsApp", c.whatsapp, "Com DDI e DDD, só números. Ex.: 5511999998888", "tel") + campo("cf-ig", "Instagram", c.instagram, "Sem o @") + "</div>" +
      campo("cf-url", "Endereço público do site", c.urlSite, "O link que você divulga. Vai junto na mensagem do WhatsApp e abre direto a camisa escolhida.", "url") +
      '<div class="campo"><label for="cf-msg">Mensagem automática do WhatsApp</label><textarea id="cf-msg">' + esc(c.mensagem || "") + '</textarea><span class="ajuda">{nome} = nome da camisa · {link} = link direto para a camisa no site.</span></div>' +
      '<h3>Catálogo</h3><label class="chave"><input type="checkbox" id="cf-ind"' + (c.mostrarIndisponiveis ? " checked" : "") + "> Mostrar camisas indisponíveis no site (com a etiqueta “Indisponível”)</label>" +
      campo("cf-dbr", "Clubes brasileiros em destaque", (d.brasil || []).join(", "), "Separados por vírgula. Viram subcategorias de Brasil.") +
      campo("cf-dint", "Clubes internacionais em destaque", (d.internacionais || []).join(", "), "Separados por vírgula.") +
      campo("cf-dsel", "Seleções em destaque", (d.selecoes || []).join(", "), "Separadas por vírgula.") +
      campo("cf-ligas", "Ligas da categoria Europa", (c.ligas || []).join(", "), "Separadas por vírgula.") +
      campo("cf-comps", "Competições", (c.competicoes || []).join(", "), "Separadas por vírgula.") +
      '<h3>Dados da empresa (rodapé e políticas)</h3><div class="linha2">' + campo("cf-razao", "Nome empresarial", emp.razao) + campo("cf-cnpj", "CNPJ", emp.cnpj) + "</div>" +
      campo("cf-end", "Endereço", emp.endereco, "Exigido pelo Decreto 7.962/2013 para quem oferta produtos pela internet.") +
      '<div class="linha2">' + campo("cf-email", "E-mail de atendimento", emp.email, "", "email") + campo("cf-parc", "Parceiros de entrega e pagamento", emp.parceiros) + "</div>" +
      campo("cf-lic", "Origem dos produtos (frase dos Termos)", emp.licenca, "Ex.: “Vendemos somente produtos originais.” Só escreva o que for verdade.") +
      '<div class="linha2">' + campo("cf-troca", "Regra de troca por tamanho ou gosto", emp.troca_cortesia) + campo("cf-prazo", "Prazo de reembolso", emp.prazo_reembolso) + "</div>" +
      '<p class="status-msg" id="cf-msg-st" role="alert"></p><div><button type="submit" class="botao pequeno">Aplicar configurações</button></div></form>';
    $("form-cfg").addEventListener("submit", function (e) {
      e.preventDefault();
      var wa = soDigitos($("cf-wa").value);
      if (wa && (wa.length < 12 || wa.length > 13)) { $("cf-msg-st").textContent = "O número do WhatsApp precisa ter DDI 55 + DDD + número (12 ou 13 dígitos)."; $("cf-wa").focus(); return; }
      var url = $("cf-url").value.trim();
      if (url && !/^https:\/\//.test(url)) { $("cf-msg-st").textContent = "O endereço do site precisa começar com https://"; $("cf-url").focus(); return; }
      function lista(id) { return $(id).value.split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
      c.whatsapp = wa; c.instagram = $("cf-ig").value.trim().replace(/^@/, ""); c.urlSite = url;
      c.mensagem = $("cf-msg").value.trim() || MSG_PADRAO;
      c.mostrarIndisponiveis = $("cf-ind").checked;
      c.destaques = { brasil: lista("cf-dbr"), internacionais: lista("cf-dint"), selecoes: lista("cf-dsel") };
      c.ligas = lista("cf-ligas"); c.competicoes = lista("cf-comps");
      c.empresa = { razao: $("cf-razao").value.trim(), cnpj: $("cf-cnpj").value.trim(), endereco: $("cf-end").value.trim(), email: $("cf-email").value.trim(), parceiros: $("cf-parc").value.trim(), licenca: $("cf-lic").value.trim(), troca_cortesia: $("cf-troca").value.trim(), prazo_reembolso: $("cf-prazo").value.trim(), atualizado: new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }) };
      adm.cfgMudou = true; atualizarPendencias();
      $("cf-msg-st").textContent = "Configurações aplicadas. Toque em Salvar e publicar para valer no site.";
    });
  }

  /* ----- publicar */
  function montarIndex(dados) {
    var json = JSON.stringify(dados).replace(/</g, "\\u003c").split(String.fromCharCode(8232)).join("\\u2028").split(String.fromCharCode(8233)).join("\\u2029");
    return RK_TEMPLATE.replace("/*RK_DADOS*/", function () { return json; });
  }
  var publicando = false;
  function publicar() {
    if (publicando) return;
    if (!totalPendencias()) { status("Não há alterações para publicar."); return; }
    if (!RK_TEMPLATE) { status("Erro: o modelo da página não está disponível. Peça ajuda ao Claude."); return; }
    var html = montarIndex(adm.rascunho);
    if (html.length > 15 * 1024 * 1024) { status("O site ficou grande demais para salvar (fotos novas demais). Remova algumas fotos novas e tente de novo."); return; }
    publicando = true;
    var b = $("adm-salvar"); b.setAttribute("aria-disabled", "true"); b.textContent = "Publicando…";
    status("Publicando no site…"); guardarRascunho();
    var tentativa = 0;
    (function enviar() {
      adm.artifact.publish(html).then(function () {
        if (adm.artifact.nome === "github") {
          DADOS = clonar(adm.rascunho); adm.mudou.clear(); adm.excluidos.clear(); adm.cfgMudou = false; atualizarPendencias();
          publicando = false; b.removeAttribute("aria-disabled"); b.textContent = "Salvar e publicar";
          status("Publicado! O site atualiza em cerca de 1 minuto. Depois, recarregue a página para ver.");
          return;
        }
        status("Publicado! O site está sendo atualizado…");
        try { sessionStorage.setItem("rk_publicado", "1"); } catch (e) {}
      }).catch(function (err) {
        var code = err && err.code;
        if (code === "upstream_error" && tentativa++ < 1) { setTimeout(enviar, 1200 + Math.random() * 800); return; }
        publicando = false; b.removeAttribute("aria-disabled"); b.textContent = "Salvar e publicar";
        status({
          conflict: "O site foi atualizado em outra janela. A página vai recarregar; suas alterações ficam guardadas para recuperar.",
          not_writer: "Esta conta não tem permissão para alterar o site.", not_granted: "Esta conta não tem permissão para alterar o site.",
          rate_limited: "Muitas publicações seguidas. Espere um minuto e tente de novo.",
          too_large: "O site ficou grande demais para salvar. Remova algumas fotos novas e tente de novo."
        }[code] || "Não foi possível publicar agora. Suas alterações continuam aqui; tente de novo em instantes.");
      });
    })();
  }
  window.addEventListener("beforeunload", function (e) { if (adm && totalPendencias() && !publicando) { e.preventDefault(); e.returnValue = ""; } });

  /* ---------------- início */
  preencherEmpresa();
  montarMenus();
  configurarContatos();
  try { if (sessionStorage.getItem("rk_publicado")) { sessionStorage.removeItem("rk_publicado"); sessionStorage.removeItem("rk_rascunho"); } } catch (e) {}
  lerHash(true);
  if (!$("vista").innerHTML) render();
  configurarContatos();
})();
