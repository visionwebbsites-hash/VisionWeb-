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

## Backlog priorizado
- P0: Receber e publicar depoimentos reais (endpoint POST /api/testimonials já existe; basta aprovar no banco `approved: true`).
- P1: Substituir placeholder restante se a cliente enviar mais fotos (ex.: foto da fachada).
- P1: Formulário de contato/leads no site (backend POST /api/leads pronto).
- P2: Pixel Meta/Google Ads + GA4 para campanhas de tráfego pago.
- P2: Versão em produção otimizada (build) e domínio próprio.
