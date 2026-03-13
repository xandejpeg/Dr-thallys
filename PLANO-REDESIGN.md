# PLANO DE REDESIGN — Dr. Thallys Henrique Alves

## Objetivo
Criar um site visualmente **novo e impactante** usando o mesmo conteúdo (textos, fotos, seções).
O design atual é genérico demais ("cara de template médico"). O novo deve parecer feito sob medida,
com personalidade própria, elegante mas sem parecer gerado por IA.

---

## O QUE MUDA (resumo visual)

| Aspecto | ATUAL | NOVO |
|---------|-------|------|
| **Hero** | Grid 2 colunas (texto + foto) com fundo gradiente verde sólido | Hero fullscreen com foto como background, overlay escuro com gradiente, texto centralizado por cima — impacto cinematográfico |
| **Fontes** | Playfair Display + DM Sans (duas serifadas-parecidas, sem contraste) | **Inter** (corpo, moderna e limpa) + **Instrument Serif** (headings, elegante e única) |
| **Cores** | Verdes escuros + dourado genérico | Verdes mantidos mas com **gradientes mais ousados**, dourado substituído por **off-white/cream** como accent, menos dourado |
| **Cards** | Todos brancos com borda e sombra (genérico) | Sem bordas visíveis, sombras mínimas, hover com **elevação suave + linha accent** |
| **Seção Sobre** | Grid 2 colunas com 2 imagens stacked | Layout **assimétrico** — uma imagem grande com texto fluindo ao lado, dados em destaque com números grandes |
| **Pilares** | 3 cards idênticos com ícone + texto | **Horizontal** — número grande à esquerda, ícone+texto à direita, separados por linha fina |
| **Consulta (Steps)** | 5 cards em grid com ícone circular | **Timeline vertical** com linha conectando os passos, alternando lado |
| **Indicações** | 2 cards (sim/não) lado a lado | Cards com **ícones maiores**, design mais clean, sem gradientes de fundo |
| **Galeria** | Grid 4 colunas com hover zoom | **Masonry-style** mais orgânico, hover com overlay escuro + texto sutil |
| **FAQ** | Grid 2 colunas (texto fixo + accordion) | Accordion **full-width**, simples e limpo, sem o bloco de texto ao lado |
| **CTA** | Foto com overlay verde | **Sem foto** — fundo verde escuro sólido com tipografia gigante e espaço negativo |
| **Contato** | Grid com cards + mapa | Mapa **full-width** embaixo, info cards simplificados em cima |
| **Footer** | Grid 4 colunas escuro | **Minimalista** — logo + social + links em uma só linha, créditos embaixo |
| **Nav** | Links horizontais, glassmorphism ao scroll | Mais simples — **sem animação excessiva**, apenas opacidade sutil no scroll |
| **Botões** | Pill shape com gradiente e shimmer | **Retangulares com cantos arredondados suaves** (8px), sem gradiente, cor sólida, hover com darkening |
| **Section tags** | Pill com borda dourada | **Texto simples** em caps com dash/traço antes, sem background |
| **Animações** | AOS fade-up genérico em tudo | **Reduce** — só fade-in suave com intersection observer, sem AOS, animações mais sutis |
| **Espaçamento** | Denso, muita informação visível | **Mais whitespace**, seções mais respiradas, padding generoso |
| **Preloader** | Logo com glow dourado em fundo escuro | **Remover** — desnecessário, site carrega rápido |

---

## CONTEÚDO PRESERVADO (não muda)
- Todos os textos (hero, sobre, contexto, pilares, consulta, indicações, FAQ, CTA, contato)
- Todas as fotos (assets/images/*)
- Logo (assets/logo/*)
- Links de WhatsApp, Instagram, Waze
- Google Maps embed
- Google Analytics
- Meta tags / SEO
- Páginas de privacidade e termos

---

## FOTOS DISPONÍVEIS (19 fotos)
- **IMG_7150-Edit.jpg** — Hero atual (jaleco, principal)
- **IMG_7031-Edit.jpg** — Sobre principal (jaleco)
- **IMG_7049-Edit.jpg** — Sobre secundária (terno)
- **IMG_7042-Edit.jpg** — Galeria grande
- **IMG_7019, 7036, 7122, 7087** — Galeria menores
- **IMG_7076-Edit.jpg** — CTA background
- **Não usadas**: IMG_6966, 6972, 6987, 6991, 7022, 7034, 7094, 7139, 7148, 7180

**Plano de uso das fotos não usadas:**
- **IMG_7180** ou **IMG_7139** → novo hero background (fullscreen)
- **IMG_7094** → seção contexto como background sutil
- **IMG_6972, 6987** → galeria (mais variedade)

---

## ARQUIVOS ALTERADOS

### 1. `index.html` — Reestruturação completa
- Remover preloader
- Trocar Google Fonts para Inter + Instrument Serif
- Remover AOS library (CSS e JS)
- Hero: reestruturar para background image + overlay + texto centralizado
- Sobre: reestruturar layout assimétrico
- Pilares: layout horizontal
- Consulta: timeline vertical
- FAQ: full-width sem sidebar
- CTA: remover imagem, fundo sólido
- Footer: simplificar para single row
- Section tags: simplificar markup

### 2. `css/style.css` — Reescrita completa (~2000 linhas)
- Novas variáveis (cores, fontes, espaçamento)
- Hero fullscreen com background image
- Layout assimétrico sobre
- Timeline vertical para consulta
- Cards sem borda, sombra mínima
- Botões retangulares sólidos
- Tipografia com mais contraste heading/body
- Mais whitespace entre seções
- Animações com CSS puro (opacity + transform via IntersectionObserver)
- Responsivo refeito para novos layouts

### 3. `js/main.js` — Simplificar
- Remover initPreloader
- Remover AOS init
- Adicionar IntersectionObserver simples para fade-in
- Manter: nav scroll, FAQ accordion, smooth scroll, copy endereço
- Simplificar código

---

## ORDEM DE EXECUÇÃO

1. **HTML** — reestruturar todo o index.html com novo markup
2. **CSS** — reescrever style.css completamente do zero
3. **JS** — simplificar main.js
4. **Testar** — verificar no browser
5. **Commit** — branch experimental/fonts

---

## REFERÊNCIA DE DESIGN
Inspiração: sites médicos premium como Dr. Dennis Gross, Hims, membrane.com
— Clean, muito whitespace, tipografia forte, fotos grandes, menos decoração, menos "UI elements"
