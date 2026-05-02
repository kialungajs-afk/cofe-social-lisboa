# Contexto do Projeto: Café Social Lisboa

Este ficheiro guarda toda a informação crucial, diretrizes de design e histórico de marca da cafeteria "Café Social Lisboa", servindo como base de conhecimento (System Prompt/Instructions) automática para qualquer agente de IA que interaja com este código agora e no futuro.

## 1. Informação da Marca & Links Úteis
- **Nome:** Café Social Lisboa (ou Café Social Eatery Lisboa)
- **Conceito:** Café de especialidade, All-day brunch, pastelaria fresca, comida para partilhar, vinhos naturais e cerveja artesanal. O lema é *"Comer. Beber. Socializar."*
- **Morada:** Rua Pinto Ferreira 32 B, Lisboa, Portugal
- **Contacto / WhatsApp:** +351 913 045 989
- **Google Maps:** [https://maps.app.goo.gl/gfusJ11VjKVVg7up9](https://maps.app.goo.gl/gfusJ11VjKVVg7up9)
- **Linktree (Geral):** [https://linktr.ee/cafe.social.lisboa](https://linktr.ee/cafe.social.lisboa)
- **Instagram:** [https://www.instagram.com/cafesocialeatery.lx](https://www.instagram.com/cafesocialeatery.lx)
- **Delivery (Bolt Food):** [https://food.bolt.eu/pt-PT/386/p/47221-caf%C3%A9-social](https://food.bolt.eu/pt-PT/386/p/47221-caf%C3%A9-social)
- **Menu Oficial PDF:** [Google Drive Link](https://drive.google.com/file/d/1vsYFO2kC6MLFH7eCXRztkWRlzyD1I0QO/view)

## 2. Resumo do Menu Oficial (Source of Truth)
Qualquer texto de menu gerado no website deve ter como base estes itens reais do restaurante:
- **Pequeno-Almoço / Brunch (8h-12h / Dia inteiro):** Shakshuka, Tosta Avo-Ovo, Tosta aberta de salmão fumado, Social Eggs, Tacos de pequeno-almoço, Panquecas fofas, Rabanadas (french toast).
- **Almoço / Jantar para Partilhar (12h-21h30):** Húmus estilo libanês, Camarão pil-pil, Bolinhos de queijo feta, Churros de falafel, Halloumi frito.
- **Pratos Principais:** Hambúrguer social, Caril de peixe, Frango à Libanesa, Taco de porco preto.
- **Doces / Sobremesas:** Baklava de pistáchio, Tiramisù, Cheesecake de abóbora, Mousse de chocolate.
- **Café / Bebidas:** Espresso, Latte Tiramisù, Flat white, Matcha latte, Cerveja "On the tap" (Pilsner, IPA), Vinhos Naturais, Cocktails.

## 3. Diretrizes de Design e UI/UX (Obrigatório seguir)
O design atual foi minuciosamente ajustado para afastar a aparência de um template gerico e para refletir um estilo editorial, maduro e premium ("Apple Glassmorphism").
- **Linguagem:** Português de Portugal (PT-PT), copywriting envolvente, elegante, não intrusivo.
- **Estética "Apple Glassmorphism":**
  - **Arredondamento Expresso:** Usar sempre cantos visivelmente arredondados (`rounded-[3rem]`, `rounded-[2.5rem]` ou `rounded-full`) para cartões, secções e imagens. Nada de caixas com cantos a 90 graus.
  - **Vidro Fosco:** Grande uso da técnica de backdrop blur (`bg-white/40 backdrop-blur-2xl` ou `3xl`) com contornos muito subtis (`border-white/60`) e sombras de grande raio (`shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]`).
  - **Fundos Abstratos:** Ao invés de fundos brancos planos e secos, introduziram-se "orbs" ou manchas flutuantes (`bg-caramel/10 blur-[120px] rounded-full absolute`) atrás do vidro fosco para conferir profundidade estética.
- **Cores Oficiais (Terracotta & Cream):**
  - `--color-coffee-50` (`#FDFBF7`) para fundos claros luminosos.
  - `--color-coffee-900` (`#1A1A1A` ou `#2C241E`) para contrastes profundos num modo "dark-cinematic".
  - `--color-caramel` (`#D17A4A`) e `--color-caramel-dark` (`#A65D35`) para highlights e badges.
- **Tipografia Escultural:**
  - `Cormorant Garamond`: A fonte serifada deve dominar os Títulos gigantes (ex: *Comer. Beber. Socializar.*) para dar uma identidade de revista de alta roda.
  - `Montserrat`: Usada apenas para navegação, descrições secundárias e Labels (com grande espaçamento: `tracking-[0.3em] font-medium uppercase text-[10px]`).
- **Clean e Sem-Emojis:** A marca é requintada. Proibido uso de emojis (evitar ☕🥞). Usamos substitutos tipográficos artísticos absolutos: `✦`, hífens e parênteses rectos para reviews como `[ 5 / 5 ]`.

## 4. Componentes e Estrutura Arquitetural a Manter
- **NavBar "Apple Pill":** O header não é um bloco colado ao topo a 100% da largura. É uma pílula/cápsula com botões centrada, flutuante e com blur-glass effect.
- **Menu Carrossel / Slider Inercial:** Em vez de blocos horizontais rígidos, o Menu é um "Slider" nativo que reage ao touch do telemóvel e trackpad (utilities do Tailwind: `.hide-scrollbar snap-x snap-mandatory flex`).
- **InfoMarquee:** Faixa escura rodapé animada infinitamente via React Motion transmitindo palavras-chave (CAFÉ DE ESPECIALIDADE ✦ BRUNCH ✦ LISBOA).
- **Smooth Scroll Exato:** Usa biblioteca `Lenis` para que a navegação e o `react-motion` de parallax acompanhem de forma super fluida, bloqueando engasgos nativos de browsers.
- **Minimalistic Interactive Contact Badge:** O botão flutuante de baixo é uma cápsula (Glass) que ao fazer hover desliza/expande a palavra "Contacto" e leva ao WhatsApp (`wa.me`).

## 5. Histórico e Tarefas Concluídas a [Abril de 2026]
1. Migração do design "Rise&Grind Base" para o "Café Social Lisboa".
2. Tradução Integral PT-PT de alta performance de copy.
3. Transição Estética 1: Implementação da marca, cores Terracota/Crema.
4. Transição Estética 2: Upgrade Master para UI Cinematográfica + Animações.
5. Upgrade "Apple Glass Style": Mudança das bordas de imagens (remoção de quadros secos) para cartões de cantos curvos extra-grandes e implementação do layout de blur (Glassmorphism).
6. Slider do Menu Mágico: Integração das descrições ativas e literais do PDF original Menu do café, conectando com imagens de Unsplash fidedignas (Shakshuka, Vinhos naturais, Húmus). Fixes no URL do Google Drive e Bolt Food aplicados com sucesso.

***
**NOTA RIGOROSA PARA AGENTE IA:** Utilize SEMPRE este `AGENTS.md` como norte para cores, raios de contorno, tipo de interatividade e dados reais. Qualquer novo desenvolvimento que viole estas regras desvirtuará o intenso trabalho de harmonização e luxo feito na marca do Utilizador.
