# PRD — Senhorita M · Espaço de Beleza (Site Institucional One-Page)

## Declaração original do problema
Site institucional premium, moderno e altamente profissional para o salão SENHORITA M — ESPAÇO DE BELEZA (Av. Madre Benvenuta, 1548 — Santa Mônica, Florianópolis — SC · Instagram @senhoritamsalao · WhatsApp (48) 99211-8889). Objetivo principal: CONVERTER visitantes de campanhas de tráfego pago em clientes via ação "AGENDAR PELO WHATSAPP". Regras absolutas: somente fotos reais da cliente (nunca IA/stock), paleta rose terracota + branco + neutros (proibidos rosa bebê, neon, magenta, roxo, verde, azul), nada de informações inventadas (preços, depoimentos, horários), mobile-first, rápido, SEO local.

## Arquitetura
- Frontend: React 19 + Tailwind + framer-motion + Lenis (smooth scroll). One-page em `/app/frontend/src/components/` (Header, Hero, TrustBar, Marquee, About, Services, Results, Space, Differentials, Testimonials, Location, FinalCta, Footer, FloatingWhatsApp, PhotoSlot, Reveal). Conteúdo centralizado em `/app/frontend/src/data/site.js`.
- Backend: FastAPI `/app/backend/server.py` — `/api/health`, `GET/POST /api/testimonials` (aprovação via campo `approved`), `POST /api/leads` (contatos futuros). MongoDB via MONGO_URL.
- Imagens reais otimizadas em `/app/frontend/public/images/` (13 arquivos, ~1,5 MB total).

## Personas
- Visitante de anúncio (mulher, Florianópolis, mobile): quer entender rápido quem é o salão, ver resultados reais e agendar em 1 toque.
- Cliente recorrente: quer achar WhatsApp/Instagram/endereço rapidamente.

## Requisitos núcleo (estáticos)
Header com logo + nav + CTA; Hero "BELEZA QUE VALORIZA A SUA ESSÊNCIA"; barra de confiança (4 itens); Sobre; Serviços (Nail Designer 9 itens, Cabeleireira 4, Cílios 4, Sobrancelhas 2 — sem preços); Resultados com ANTES/DEPOIS + galeria; Nosso Espaço (3 fotos); Diferenciais (4); Depoimentos (estrutura vazia, sem inventar); Localização com Google Maps; CTA final; botão flutuante WhatsApp com mensagem pré-preenchida "Olá! Vim pelo site da Senhorita M e gostaria de agendar um horário. 😊"; footer com © 2026; SEO local (title/description/keywords).

## Implementado (04/09/2026)
- Site one-page completo com todas as 12 seções + botão flutuante, exatamente com os textos do briefing.
- 13 fotos reais da cliente integradas (logo, 2 interiores, expositor de esmaltes, editorial, ANTES/DEPOIS, 4 resultados de cabelo, 2 resultados de unhas), otimizadas (max 1600px, JPEG progressivo q82).
- Hero com reveal mascarado linha a linha, parallax sutil, selo da marca; marquee editorial lento; capítulos numerados 01–07; paleta terracota #B05B4B + creme #FDFBF7 + espresso #2C1810; Cormorant Garamond + Plus Jakarta Sans.
- Backend FastAPI: health, testimonials (com aprovação), leads. Sem auth.
- WhatsApp: wa.me/5548992118889 com mensagem pré-preenchida em todos os CTAs. Maps embed + "Como chegar". Instagram linkado.
- SEO: title, meta description, keywords locais, lang pt-BR, favicon com a logo.
- Verificado: curl nos 4 endpoints, 13 imagens HTTP 200, screenshots desktop (todas as seções) e mobile (menu overlay, navegação suave, sem overflow horizontal). Bug corrigido: overlay do menu mobile preso pelo backdrop-blur do header.

## Atualizações (04/09/2026 — segundo ciclo, aprovado pelo cliente anterior mantido intacto)
- Nova categoria de serviços "Estética Corporal" (Drenagem Linfática, Massagem Modeladora, Massagem Relaxante, Massagem Terapêutica, Shiatsu, Ventosaterapia) como card em destaque full-width.
- Nova seção "Maquiagem" (capítulo 04, fundo espresso) com as 2 fotos reais de maquiagem — usadas exclusivamente ali.
- Antes & Depois virou carrossel (embla) com 3 abas independentes: Cabelo (par real existente), Manicure (par real novo: unhas-antes/unhas-depois), Sobrancelhas (sem fotos enviadas — espaços reservados "Foto real em breve", sem inventar imagens). Setas + indicadores; swipe no mobile.
- Foto real da fachada adicionada na seção Localização com legenda "Reconheça nosso espaço"; mapa agora em largura total abaixo.
- Seção de depoimentos substituída pelas 4 avaliações reais fornecidas (Helena Scheunemann, Pollyana Rosa, Vanuza Gomes, Scheila Maria Fernandes de Oliveira), todas 5 estrelas; grid no desktop e carrossel com dots no mobile.
- Capítulos renumerados 01–08 após inserção de Maquiagem. Nenhuma outra parte aprovada foi alterada.

## Atualizações (05/09/2026 — terceiro ciclo, apenas acréscimos)
- Sobrancelhas: par real ANTES/DEPOIS adicionado à aba Sobrancelhas do carrossel (sobrancelhas-antes.jpg / sobrancelhas-depois.jpg) — placeholders removidos dessa aba.
- Maquiagem: 2 novas fotos reais acrescentadas (maquiagem-3.jpg, maquiagem-4.jpg), total 4 na galeria; fundo da seção alterado de espresso (#2C1810) para o rose terracota da marca (gradiente #C06C5C → #B05B4B → #7F3B2E), a pedido do cliente.
- Cabelo: 1 nova foto de resultado (cabelo-extra-1.jpg) acrescentada na aba Cabelo do carrossel, abaixo do par antes/depois (via campo `extras` em BEFORE_AFTER).
- ATENÇÃO: o cliente mencionou 6 fotos, mas apenas 5 chegaram — a 2ª foto de cabelo (FOTO 6) NÃO foi recebida.
- Nenhuma parte aprovada foi removida ou alterada além do pedido.

## Atualizações (05/09/2026 — quarto ciclo)
- Google Tag Manager instalado globalmente em `/app/frontend/public/index.html`: snippet principal no topo do `<head>` (após charset) e snippet `<noscript>` imediatamente após `<body>`. Container ID: GTM-TG65Q8W9. Verificado: `dataLayer` ativo e `gtm.js?id=GTM-TG65Q8W9` carregando; site renderiza normalmente.

## Atualizações (06/09/2026 — diagnóstico do Preview)
- Cliente relatou Preview travado em "carregando/salvando". Diagnóstico: nenhum erro de JS, build ou rota; GTM íntegro e não-bloqueante (async). Causa real: compilação a frio do dev server webpack na primeira visita após restart (feito para aplicar o GTM em public/index.html). Correção: restart do frontend + aquecimento da compilação. Preview responde em ~0,1-0,2s. GTM-TG65Q8W9 mantido.

## Atualizações (06/09/2026 — quinto ciclo)
- Seção exclusiva "Maquiagem" removida (componente Makeup.jsx deletado, import/uso removidos do App.js).
- Maquiagem adicionada como categoria de serviço (card próprio em Serviços, item "Maquiagem", ícone Sparkles).
- As 4 fotos reais de maquiagem (maquiagem-1..4.jpg) movidas para a galeria da seção Resultados, intercaladas com cabelo e unhas — nenhuma foto apagada.
- Capítulos renumerados 01–07 após remoção da seção.
- Bug corrigido durante a tarefa: edições paralelas no Services.jsx se anularam e deixaram a categoria sem ícone (tela branca); corrigido e verificado em desktop e mobile.

## Atualizações (08/09/2026 — sexto ciclo)
- Avaliações: removidas Vanuza Gomes e Scheila Maria Fernandes de Oliveira; adicionadas Daiane Oderdenge Sodré e Livian Gaia (textos exatos fornecidos). Helena e Pollyana mantidas.
- Antes & Depois: 8 novas fotos reais adicionadas como novos pares no carrossel — Cabelo ganhou "Mechas e Iluminação" (mechas-iluminacao-antes/depois) e "Transformação de Cabelos" (transformacao-antes/depois); Sobrancelhas ganhou "Design de Sobrancelhas" (design-sobrancelhas-antes/depois); Manicure ganhou "Manicure" (manicure-antes/depois). Cada par novo exibe legenda com o nome do procedimento. Pares antigos mantidos; setas e dots ativos nas 3 abas.

## Backlog priorizado
- P1: Pixel Meta/Google Ads + GA4 (GTM já instalado — falta configurar tags no painel).
- P2: Domínio próprio + build de produção.
