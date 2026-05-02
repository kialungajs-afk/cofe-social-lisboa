import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// --- Animation Utilities ---
const ease = [0.22, 1, 0.36, 1]; 

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 1.4, ease, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const ParallaxImg = ({ src, alt, className, overlay = false }: { src: string, alt: string, className?: string, overlay?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden w-full h-full ${className}`}>
      <motion.img
        style={{ y, scale: 1.15 }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      {overlay && <div className="absolute inset-0 bg-black/40 transition-opacity duration-1000"></div>}
    </div>
  );
};

// --- Cinematic Marquee (Barra Animada Profissional) ---
const InfoMarquee = () => {
  return (
    <div className="py-5 bg-caramel-dark/90 backdrop-blur-xl border-y border-white/20 overflow-hidden flex whitespace-nowrap z-20 relative">
      <motion.div
        className="flex items-center text-white uppercase tracking-[0.3em] font-light text-xs"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-8 text-white/50">✦</span>
            CAFÉ DE ESPECIALIDADE
            <span className="mx-8 text-white/50">✦</span>
            BRUNCH ALL-DAY
            <span className="mx-8 text-white/50">✦</span>
            VINHOS NATURAIS
            <span className="mx-8 text-white/50">✦</span>
            LISBOA
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-coffee-900 font-sans selection:bg-caramel selection:text-white relative overflow-x-hidden">
      
      {/* Abstract Ambient Background Orbs for Glassmorphism Context */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-caramel/10 rounded-full blur-[100px] opacity-70 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#D6CFC4]/30 rounded-full blur-[120px] opacity-70 pointer-events-none z-0"></div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-caramel z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Cinematic Glass Navbar - Apple Style */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] max-w-5xl rounded-full px-6 md:px-10 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] border border-black/5 ${isScrolled ? 'bg-white/40 backdrop-blur-2xl' : 'bg-transparent border-transparent shadow-none'}`}>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3 cursor-pointer">
            <span className={`font-serif text-2xl tracking-widest uppercase transition-colors duration-700 ${isScrolled ? 'text-coffee-900' : 'text-white'}`}>
              C.S.
            </span>
          </div>
          
          <div className={`hidden md:flex items-center gap-10 text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-700 ${isScrolled ? 'text-coffee-900' : 'text-white'}`}>
            {['Sobre', 'O Menu', 'Takeaway', 'Visitas'].map((item, index) => (
              <a key={item} href={`#section-${index}`} className="relative overflow-hidden group py-2">
                <span className="block transition-transform duration-700 ease-out group-hover:-translate-y-full">{item}</span>
                <span className="absolute inset-0 flex items-center text-caramel transition-transform duration-700 ease-out translate-y-full group-hover:translate-y-0">{item}</span>
              </a>
            ))}
          </div>

          <a href="https://drive.google.com/file/d/1vsYFO2kC6MLFH7eCXRztkWRlzyD1I0QO/view" target="_blank" rel="noreferrer" className={`hidden md:inline-block px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.3em] font-medium border transition-all duration-700 ${isScrolled ? 'bg-coffee-900 text-white border-coffee-900 hover:bg-caramel hover:border-caramel' : 'bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white hover:text-black'}`}>
            Ver Menu
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden text-xs uppercase tracking-widest ${isScrolled ? 'text-coffee-900' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'FECHAR' : 'MENU'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1A1A1A]">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80&w=2000" 
            alt="Café em Lisboa" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
        </motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white mt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, ease }}
            className="flex flex-col items-center"
          >
            <span className="flex items-center justify-center gap-4 text-white/90 tracking-[0.4em] uppercase text-[10px] mb-8 bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
              Lisboa Eatery
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-light leading-[1.05] mb-10 text-balance tracking-tight">
              Comer. Beber. <br/><span className="italic text-white">Socializar.</span>
            </h1>
            <p className="text-base md:text-xl text-white/80 mb-14 max-w-xl mx-auto font-light tracking-widest uppercase text-[11px] leading-relaxed">
              O seu novo ponto de encontro de café de especialidade e brunch, no coração do bairro.
            </p>
            <motion.a 
              href="#section-0" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/50 shadow-xl text-white px-10 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] hover:bg-white flex hover:text-black transition-all duration-700"
            >
              Descobrir <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <InfoMarquee />

      {/* About Section - Glassmorphism Update */}
      <section id="section-0" className="py-32 md:py-48 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-24">
            <span className="text-caramel uppercase tracking-[0.3em] text-[10px] mb-6 block">Nosso Manifesto</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif max-w-5xl mx-auto leading-[1.2] text-coffee-900 font-light text-balance">
              Mais do que café. Um espaço que combina comida <span className="italic text-caramel-dark">de excelência</span> e bebidas <span className="italic text-caramel-dark">perfeitas</span>.
            </h2>
            <div className="w-px h-24 bg-coffee-900/20 mx-auto mt-16"></div>
          </FadeUp>

          <div className="grid md:grid-cols-12 gap-10 md:gap-0 items-center">
            <FadeUp delay={0.2} className="md:col-span-6 relative z-20 md:pr-10">
              <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-10 md:p-14 rounded-[3rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)]">
                <p className="text-coffee-900/80 text-lg md:text-xl leading-[1.8] font-light mb-8">
                  Situado no centro de Lisboa, o Café Social nasceu da paixão profunda por juntar pessoas à volta da mesa. O nosso espaço foi desenhado para ser a sua segunda casa — seja para um expresso rápido, um brunch tranquilo ou aquele canto perfeito para ler.
                </p>
                <p className="text-coffee-900/80 text-lg md:text-xl leading-[1.8] font-light">
                  Acreditamos num serviço de café executado com mestria, acompanhado por um menu que cruza a tradição com os clássicos intemporais.
                </p>
                <p className="text-coffee-900 uppercase tracking-[0.3em] text-[10px] font-bold mt-10">
                  Rua Pinto Ferreira, Lisboa
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.4} className="md:col-span-6 relative h-[60vh] md:h-[80vh] w-full rounded-[3rem] overflow-hidden shadow-2xl md:-ml-10 z-10 border-4 border-white/50">
              <ParallaxImg 
                src="https://images.unsplash.com/photo-1495474472205-51f7d4c00f68?auto=format&fit=crop&q=80&w=1200" 
                alt="Aesthetic Brunch Plate" 
                className=""
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Menu / Offerings Section - Apple Carousel */}
      <section id="section-1" className="py-32 relative text-coffee-900 overflow-hidden">
        {/* Subtle Dark Orb background adjustment for this section */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl z-[-1]"></div>
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-caramel/5 rounded-full blur-[100px] z-[-2]"></div>

        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-2 md:px-0">
            <div>
              <span className="text-caramel tracking-[0.3em] uppercase text-[10px] mb-6 block">Experiência Gastronómica</span>
              <h2 className="text-5xl md:text-7xl font-serif font-light">O Menu</h2>
            </div>
            <a href="https://drive.google.com/file/d/1vsYFO2kC6MLFH7eCXRztkWRlzyD1I0QO/view" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] bg-white/50 backdrop-blur-md rounded-full shadow-sm border border-black/5 px-8 py-3.5 hover:bg-white hover:shadow-md transition-all duration-500">
              Menu Completo <ArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </FadeUp>
        </div>

        {/* Carousel / Slider - "Sera para avançar" com Glassmorphism */}
        <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 md:px-[calc((100vw-1280px)/2+24px)] pb-12 pt-4 w-full">
          {[
            { title: "Café de Especialidade", desc: "Do Espresso duplo ao Latte Tiramisù. Extraído com precisão para destacar as notas puras do grão.", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" },
            { title: "Brunch All-Day", desc: "Shakshuka, Tosta Avo-Ovo, e Panquecas Fofas. O conforto puro, perfeitamente servido a qualquer hora.", img: "https://images.unsplash.com/photo-1525351484163-1218861e6056?auto=format&fit=crop&q=80&w=800" },
            { title: "Para Partilhar", desc: "Húmus estilo libanês, Halloumi frito, Camarão pil-pil e Churros de falafel. Momentos incríveis à mesa.", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" },
            { title: "Pratos Principais", desc: "Frango à Libanesa, Hambúrguer Social ou Caril de Peixe. Sabores intensos para o seu almoço.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800" },
            { title: "Doces & Sobremesas", desc: "Baklava de pistáchio, Cheesecake de abóbora e Tiramisù clássico. O final perfeito ou a pura indulgência.", img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800" },
            { title: "Bebidas & Beers", desc: "Cerveja artesanal na pressão, matcha lattes e cocktails. A transição perfeita para o seu final da tarde.", img: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800" }
          ].map((item, i) => (
            <div key={i} className="snap-center shrink-0 w-[85vw] md:w-[420px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group cursor-pointer hover:bg-white/60 transition-colors duration-500">
              <div className="w-full h-[320px] rounded-[2.5rem] overflow-hidden relative transform-gpu">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-serif text-coffee-900 mb-3">{item.title}</h3>
                <p className="text-coffee-900/60 font-light text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Delivery / Takeaway Section - Glass Variant */}
      <section id="section-2" className="py-32 md:py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            
            <FadeUp delay={0.2} className="order-1 relative z-20 space-y-12">
              <div>
                <span className="text-caramel tracking-[0.3em] uppercase text-[10px] mb-6 block bg-caramel/10 inline-block px-4 py-1.5 rounded-full">Sabores em Casa</span>
                <h2 className="text-5xl md:text-7xl font-serif font-light mb-10 text-coffee-900 leading-tight">
                  <span className="italic text-caramel">Takeaway</span> <br />& Delivery.
                </h2>
              </div>

              <div className="bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-xl space-y-10">
                <p className="text-coffee-900/80 text-lg leading-[1.8] font-light">
                  A magia do Café Social não precisa de ficar restrita ao nosso espaço. Desfrute da nossa especialidade onde quer que esteja através dos nossos parceiros oficiais.
                </p>
                
                <div className="pt-4 border-t border-coffee-900/10">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-coffee-900/60 block mb-4">Plataforma Oficial</span>
                  <div className="flex items-center justify-between group">
                    <h3 className="text-3xl font-serif text-coffee-900">Bolt Food</h3>
                    <a href="https://food.bolt.eu/pt-PT/386/p/47221-caf%C3%A9-social" target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-white/50 backdrop-blur-md border border-coffee-900/20 rounded-full group-hover:bg-caramel group-hover:text-white transition-all duration-500 shadow-sm">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp className="order-2 relative h-[60vh] md:h-[70vh] w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/50 z-10 md:-ml-8">
              <ParallaxImg 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200" 
                alt="Minimal Delivery Vibe" 
                className=""
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Community / Testimonials Cinematic Glass Grid */}
      <section className="py-32 md:py-48 relative overflow-hidden bg-[#1A1A1A] text-white">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-caramel-dark/20 blur-[150px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FadeUp className="text-center mb-24">
            <span className="text-white/50 uppercase tracking-[0.3em] text-[10px] mb-6 block bg-white/10 w-max mx-auto px-4 py-1.5 rounded-full border border-white/10">A Nossa Comunidade</span>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-balance max-w-4xl mx-auto">
              O Que Dizem de Nós
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "João P.", text: "O melhor brunch de Lisboa! O café é de especialidade real e os ovos benedict estavam perfeitos. Sem dúvida o meu sítio de eleição." },
              { name: "Sarah L.", text: "Such a beautiful aesthetic and the vibe is so chill. Found my new favorite spot to grab an oat flat white in Lisbon." },
              { name: "Miguel S.", text: "Espaço muito agradável para trabalhar ou estar com amigos. As bowls são divinais e a playlist cria toda a atmosfera." },
            ].map((review, i) => (
              <FadeUp key={i} delay={i * 0.15} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-12 rounded-[2.5rem] hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="text-[10px] tracking-[0.3em] text-caramel mb-8 bg-caramel/10 border border-caramel/20 w-fit px-3 py-1 rounded-full">[ 5 / 5 ]  ✦</div>
                  <p className="text-white/80 text-lg leading-[1.8] font-light italic mb-10">"{review.text}"</p>
                </div>
                <div className="uppercase tracking-[0.3em] text-[10px] font-bold text-white/50">
                  — {review.name}
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-20 text-center">
            <a href="https://www.google.com/search?q=google+reviews+cafe+social" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white hover:text-caramel transition-colors duration-500 border-b border-transparent hover:border-caramel pb-1">
              Ler todas as avaliações
            </a>
          </FadeUp>
        </div>
      </section>

      <InfoMarquee />

      {/* Visit Us & Footer */}
      <section id="section-3" className="pt-32 pb-12 relative overflow-hidden bg-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 mb-40 items-center">
            <FadeUp className="lg:col-span-5 relative z-20">
              <div className="bg-white/60 backdrop-blur-3xl border border-white/60 p-10 md:p-14 rounded-[3rem] shadow-xl">
                <h2 className="text-4xl md:text-5xl font-serif font-light mb-12 text-coffee-900 border-b border-coffee-900/10 pb-8">
                  Onde Nos<br/><span className="italic text-caramel">Encontrar.</span>
                </h2>
                
                <div className="space-y-10">
                  <div className="group">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-coffee-900/50 mb-2 block">Morada</h4>
                    <p className="text-coffee-900 text-lg font-light leading-relaxed">Rua Pinto Ferreira 32 B<br/>Lisboa, Portugal</p>
                  </div>
                  <div className="group">
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-coffee-900/50 mb-2 block">Horário</h4>
                    <p className="text-coffee-900 text-lg font-light leading-relaxed">Aberto todos os dias.<br/>Siga no Instagram para mais.</p>
                  </div>
                  
                  <div className="pt-8 flex">
                    <a href="https://maps.app.goo.gl/gfusJ11VjKVVg7up9" target="_blank" rel="noreferrer" className="inline-block bg-coffee-900 text-white rounded-full px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-caramel transition-all duration-500 shadow-md">
                      Abrir no GPS
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="lg:col-span-7 h-[60vh] md:h-[80vh] w-full rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white/50 -mt-10 lg:mt-0 lg:-ml-12 z-10">
              <img 
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200" 
                alt="Café Context Vibe" 
                className="w-full h-full object-cover grayscale-[10%]"
                referrerPolicy="no-referrer"
              />
            </FadeUp>
          </div>

          {/* Minimal Editorial Footer */}
          <div className="pt-16 border-t border-coffee-900/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-serif text-3xl md:text-5xl font-light tracking-wide text-coffee-900">Café Social</span>
              <p className="tracking-[0.3em] uppercase text-[9px] font-bold text-caramel-dark bg-caramel/10 inline-block px-3 py-1 rounded-full border border-caramel/20 w-fit">Eat • Drink • Socialize</p>
            </div>
            
            <div className="flex gap-4 md:gap-8 text-[10px] uppercase tracking-[0.3em] font-medium">
              <a href="https://www.instagram.com/cafesocialeatery.lx" target="_blank" rel="noreferrer" className="relative group overflow-hidden bg-white/60 px-5 py-2.5 rounded-full border border-black/5 hover:border-caramel/30 transition-colors">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Instagram</span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-caramel">Instagram</span>
              </a>
              <a href="https://linktr.ee/cafe.social.lisboa" target="_blank" rel="noreferrer" className="relative group overflow-hidden bg-white/60 px-5 py-2.5 rounded-full border border-black/5 hover:border-caramel/30 transition-colors">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">Links</span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-caramel">Links</span>
              </a>
            </div>
          </div>
          
          <div className="mt-16 text-center md:text-left text-[10px] uppercase tracking-[0.2em] font-light text-coffee-900/40">
            <p>© {new Date().getFullYear()} CAFÉ SOCIAL LISBOA. PORTUGAL.</p>
          </div>
        </div>
      </section>

      {/* Minimalistic Interactive Contact Badge - Glassmorphism */}
      <motion.a 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        href="https://wa.me/351913045989?text=Olá%20Café%20Social!" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 group flex items-center justify-center"
        title="Fale Connosco"
      >
        <div className="backdrop-blur-2xl bg-white/40 border border-white/60 text-coffee-900 px-6 py-4 md:px-8 md:py-4 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center gap-3 overflow-hidden transition-all duration-700 hover:pr-10 hover:bg-caramel hover:border-caramel hover:text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Contacto</span>
          <ArrowUpRight className="w-4 h-4 translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
        </div>
      </motion.a>
    </div>
  );
}
