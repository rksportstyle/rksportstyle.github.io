# Site RK Sport Style — regras do projeto

Catálogo de camisas de futebol (somente catálogo: sem carrinho, pagamento ou cadastro de clientes).
Site publicado: https://rksportstyle.github.io — os arquivos-fonte ficam em `_projeto/`.

## Disponibilidade (só duas condições para o público)
- **Pronta entrega** (`status: "disponivel"`): camisas em estoque. Novas e antigas aparecem juntas.
- **Sob encomenda** (`status: "encomenda"`).
- Não existe mais seção "Novidades" ou "Recém-chegadas". Não recriar.
- Cadastrar como pronta entrega ou sob encomenda **conforme a orientação do dono**. Sem orientação: sob encomenda, e avisar.

## Padrão obrigatório de imagens (todas as camisas, atuais e futuras)
Sempre que chegarem fotos novas:
1. Identificar clube e modelo pelo que está visível (não inventar temporada, patrocinador ou detalhe).
2. Agrupar frente, costas e detalhes da mesma camisa. Não misturar titular/reserva, temporadas, masculina/feminina, jogador/torcedor. Em dúvida: separar e pedir conferência.
3. Remover o fundo por completo, com transparência real (canal alfa): fundo externo, espaços entre braços e corpo, entre mangas e corpo, interior da gola, espaços entre manequim e camisa.
4. Preservar escudos, patrocinadores, logos, golas, costuras, texturas e números. Sem halos, bordas, manchas ou pixels residuais.
5. Conferir cada imagem ampliada sobre fundo verde antes de publicar.
6. Padronizar: PNG mestre 1200×1200 transparente, camisa centralizada ocupando ~88% do quadro, sem cortar extremidades.
   No site: `img/c/RK-NNN.webp` (frente) e `img/c/RK-NNN-costas.webp` (costas), 1000×1000 com alfa, mais cópia `.jpg` em `jpg/c/` (fundo #F0F0EE) só para iPhones muito antigos.
7. Associar frente e costas ao mesmo produto (galeria). Fotos de detalhe com marca d'água de fornecedor não vão para o site.
8. Se uma foto não permitir remoção perfeita (ex.: mão do manequim sobre a camisa), **não reconstruir detalhes**: manter a versão segura e separar para aprovação do dono.

Ferramentas usadas: `_projeto/ferramentas/` (rembg isnet-general-use + correção de fundo por cor; manequim escuro tratado à parte).

## Outras regras
- Nunca exibir códigos internos (RK-001…) ao público; só no painel.
- Não inventar CNPJ, endereço, e-mail ou dados empresariais.
- Antes de mudar visual, ler os dados atuais do `index.html` publicado (o painel salva ali) para não perder estoque/preços.
- Não usar laranja; identidade preto, branco, cinza e prata.
