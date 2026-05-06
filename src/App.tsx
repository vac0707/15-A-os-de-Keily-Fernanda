import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, MapPin, Calendar, Clock, Shirt, Gift, ChevronLeft, ChevronRight, Music, Heart, MailOpen } from 'lucide-react';

// --- Constants & Data ---
const EVENT_DATE = new Date('2026-05-09T18:00:00');
const MUSIC_URL = "https://res.cloudinary.com/dcnynnstm/video/upload/v1773717165/Marta_Albarracin_-_Quince_A%C3%B1os_sbr0ab.mp3";
const COVER_IMAGE = "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/02_VIC.jpg_py7axq.jpg";
const BG_PATTERN = "https://res.cloudinary.com/dcnynnstm/image/upload/v1773723965/497927484_1363051325167172_558942534762591556_n_w2cdp4.jpg";

const GALLERY_IMAGES = [
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/01_VIC.jpg_g2tske.jpg",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09544s.jpg_dwdlnw.jpg",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09638.JPG_kffzn9.jpg",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100769/DSC09613.JPG_arpeeo.jpg",
  "https://res.cloudinary.com/dcnynnstm/image/upload/v1778100771/DSC09450sdsdsd.jpg_kqq8lg.jpg"
];

// --- Sub-components ---

const StarBackground = () => {
  const [stars, setStars] = useState<{ id: number, left: string, top: string, size: string, duration: string }[]>([]);

  useEffect(() => {
    const starCount = 60;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-celestial-dark">
      <div 
        className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BG_PATTERN})`, mixBlendMode: 'soft-light' }}
      />
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            '--duration': star.duration
          } as any}
        />
      ))}
      <motion.div 
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 z-1"
      >
        <div className="w-full h-full relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-silver-bright via-silver to-transparent opacity-20 blur-xl" />
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(192,192,192,0.5)]">
            <path 
              d="M50 10 A40 40 0 1 0 90 50 A35 35 0 1 1 50 10 Z" 
              fill="url(#moonGradient)"
            />
            <defs>
              <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="50%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

const MusicPlayer = ({ isPlaying, setIsPlaying, audioRef }: { isPlaying: boolean, setIsPlaying: (v: boolean) => void, audioRef: React.RefObject<HTMLAudioElement | null> }) => {
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={togglePlay}
        className="group relative w-12 h-12 flex items-center justify-center bg-celestial-dark/60 backdrop-blur-md rounded-full silver-border hover:scale-110 transition-transform active:scale-95"
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Pause className="w-5 h-5 text-silver-bright" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
            >
              <Play className="w-5 h-5 text-silver-bright fill-silver-bright" />
            </motion.div>
          )}
        </AnimatePresence>
        {isPlaying && (
          <div className="absolute -inset-1 rounded-full bg-silver/20 animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        mins: Math.floor((difference / 1000 / 60) % 60),
        secs: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const Item = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white/5 border border-white/10">
        <span className="text-2xl md:text-3xl font-serif-cinzel text-white font-bold">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] text-silver opactiy-60">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex gap-4 justify-center">
      <Item value={timeLeft.days} label="Días" />
      <Item value={timeLeft.hours} label="Horas" />
      <Item value={timeLeft.mins} label="Minutos" />
      <Item value={timeLeft.secs} label="Segundos" />
    </div>
  );
};

const GallerySlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const next = () => setIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] overflow-hidden photo-frame">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={GALLERY_IMAGES[index]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Gallery ${index}`}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-celestial-dark/60" />
      
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm silver-border text-white/70 hover:text-white transition-colors">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-sm silver-border text-white/70 hover:text-white transition-colors">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {GALLERY_IMAGES.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-300 rounded-full ${i === index ? 'w-6 bg-silver-bright' : 'w-2 bg-silver/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

const WelcomeGate = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-celestial-dark overflow-hidden"
    >
      <StarBackground />
      
      <div className="relative z-10 text-center space-y-12 px-6">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-block"
        >
          <div className="absolute -inset-12 bg-silver/10 blur-3xl rounded-full" />
          <div className="relative glass-card p-12 md:p-16 border-silver/30 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-8"
            >
              <MailOpen className="w-12 h-12 text-silver mx-auto opacity-60" />
              <div className="space-y-4">
                <h2 className="font-serif-cinzel text-silver text-sm tracking-[0.6em] uppercase">Estás Invitado</h2>
                <h1 className="font-cursive text-5xl md:text-7xl text-silver-bright text-shine leading-tight">Keily Fernanda</h1>
              </div>
              
              <button 
                onClick={onOpen}
                className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-serif-cinzel font-bold tracking-widest text-sm transition duration-300 ease-out border-2 border-silver rounded-full shadow-md text-silver hover:text-celestial-dark"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-silver-bright group-hover:translate-x-0 ease">
                   ABRIR RECUERDO
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-silver transition-all duration-300 transform group-hover:translate-x-full ease">
                  ¡ABRIR INVITACIÓN!
                </span>
                <span className="relative invisible text-silver">¡ABRIR INVITACIÓN!</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-silver"
        >
          Haz clic para entrar a este mundo mágico
        </motion.p>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-silver/30 overflow-x-hidden">
      <audio ref={audioRef} src={MUSIC_URL} loop />
      
      <AnimatePresence mode="wait">
        {!isInvitationOpen && (
          <WelcomeGate onOpen={handleOpenInvitation} />
        )}
      </AnimatePresence>

      <div className={`${!isInvitationOpen ? 'h-screen overflow-hidden' : ''}`}>
        <StarBackground />
        {isInvitationOpen && <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} />}

        <main className={`relative z-10 transition-all duration-1000 ${isInvitationOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        
        {/* --- Hero Section --- */}
        <section className="h-screen flex flex-col items-center justify-center px-4 overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-celestial-dark/60 via-celestial-dark/10 to-celestial-dark z-10" />
            <img 
              src={COVER_IMAGE} 
              alt="Keily Fernanda"
              className="w-full h-full object-cover grayscale-[10%] opacity-70"
            />
          </motion.div>

          <div className="z-20 text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col items-center"
            >
              <span className="ornament-text mb-2">✧ ───────── ✧</span>
              <span className="font-serif-cinzel text-silver uppercase tracking-[0.5em] text-xs md:text-base">
                Mis Dulces
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-serif-cinzel italic text-5xl md:text-8xl text-silver-bright text-shine leading-tight py-4"
            >
              15 Años de Keily Fernanda
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex items-center justify-center gap-4 text-silver/80 font-serif-cinzel text-lg md:text-2xl"
            >
              <div className="h-[1px] w-12 bg-silver/30" />
              <span>Mis 15 Años</span>
              <div className="h-[1px] w-12 bg-silver/30" />
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 z-20 opacity-50"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase font-sans tracking-widest text-silver">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-silver to-transparent" />
            </div>
          </motion.div>
        </section>

        {/* --- Poem Section --- */}
        <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-12"
          >
            <div className="relative inline-block">
                <Heart className="w-10 h-10 text-silver mx-auto opacity-40" />
                <div className="absolute -inset-4 bg-silver/5 blur-xl rounded-full" />
            </div>
            <p className="font-serif-playfair text-xl md:text-2xl leading-relaxed italic text-silver px-4 border-l-2 border-silver pl-8 max-w-lg mx-auto">
              “Esta noche tan especial y largamente soñada, donde 15 estrellas bajarán del cielo y me abrirán las puertas a un mundo nuevo; guardaré en mi corazón todos los recuerdos vividos desde mi primera mirada hasta hoy.”
            </p>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-silver/30 to-transparent mx-auto" />
          </motion.div>
        </section>

        {/* --- Family Section --- */}
        <section className="py-32 relative overflow-hidden bg-celestial-glow/10 border-y silver-border">
          <div className="max-w-5xl mx-auto px-6 space-y-16 text-center">
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
            >
                <span className="ornament-text">✧ ───────── ✧</span>
                <p className="font-cursive text-4xl md:text-5xl text-silver/80">
                    Tenemos el agrado de invitar a celebrar los
                </p>
                <h2 className="font-serif-cinzel text-5xl md:text-7xl text-silver-bright tracking-widest">XV AÑOS</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative z-10 text-left md:text-center">
                {/* Parents */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
                >
                    <div className="space-y-2">
                        <h3 className="font-sans text-[11px] text-silver tracking-[0.2em] uppercase opacity-60">Padres</h3>
                    </div>
                    <div className="space-y-2 font-serif-playfair text-lg md:text-xl text-white leading-relaxed">
                        <p>Victor César Sobrevilla Villa</p>
                        <p>América Ccorahua Quispe</p>
                    </div>
                </motion.div>

                {/* Padrinos */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
                >
                    <div className="space-y-2">
                        <h3 className="font-sans text-[11px] text-silver tracking-[0.2em] uppercase opacity-60">Padrinos</h3>
                    </div>
                    <div className="space-y-2 font-serif-playfair text-lg md:text-xl text-white leading-relaxed">
                        <p>Percy Cuadros Aparco</p>
                        <p>Nery Sobrevilla Villa</p>
                    </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* --- Countdown & Calendar --- */}
        <section className="py-32 px-6 text-center space-y-20">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="space-y-10"
          >
            <h2 className="font-serif-cinzel text-silver text-base tracking-[0.6em] uppercase">Faltan Sólo</h2>
            <Countdown />
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative inline-block"
          >
            <div className="relative bg-white text-celestial-dark p-10 md:p-14 space-y-4 rounded-sm shadow-2xl">
                <div className="font-sans text-sm tracking-[0.3em] uppercase border-b border-celestial-dark/20 pb-4 mb-4">
                MAYO 2026
                </div>
                <div className="flex flex-col items-center">
                <span className="font-sans text-lg tracking-[0.5em] mb-1 font-bold">SÁBADO</span>
                <span className="font-serif-cinzel text-7xl md:text-[7rem] leading-none font-bold">09</span>
                </div>
            </div>
          </motion.div>
        </section>

        {/* --- Event Details --- */}
        <section className="py-32 px-6 max-w-6xl mx-auto space-y-24">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Main Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 flex flex-col items-center text-center space-y-8"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full silver-border bg-silver/5">
                <MapPin className="w-8 h-8 text-silver" />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-serif-cinzel text-2xl text-silver-bright tracking-[0.2em]">RECEPCIÓN</h3>
                <div className="h-px w-16 bg-silver/30 mx-auto" />
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                    <p className="font-serif-playfair text-4xl text-white">Casa Verde</p>
                    <p className="font-sans text-xs text-silver/60 tracking-widest">SÁBADO 09 DE MAYO</p>
                </div>
                
                <div className="flex items-center justify-center gap-8 py-4 border-y silver-border/50">
                  <div className="flex flex-col items-center gap-1">
                    <Clock className="w-5 h-5 text-silver/70" />
                    <span className="font-serif-cinzel text-lg">6:00 PM</span>
                  </div>
                  <div className="w-px h-10 bg-silver/20" />
                  <div className="flex flex-col items-center gap-1">
                    <Calendar className="w-5 h-5 text-silver/70" />
                    <span className="font-serif-cinzel text-lg">09/05/26</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full max-w-xs gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/51916770853?text=Hola%20Keily%2C%20confirmo%20mi%20asistencia%20a%20tu%20fiesta%20de%2015%20a%C3%B1os.%20%C2%A1Muchas%20gracias%21" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-silver-bright text-celestial-dark font-serif-cinzel font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(192,192,192,0.3)] hover:shadow-[0_0_30px_rgba(192,192,192,0.5)] transition-all"
                >
                  CONFIRMAR ASISTENCIA <Music className="w-4 h-4 ml-1" />
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.app.goo.gl/jf7Q7dc7DuF9wTF97" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-celestial-glow border border-silver/30 text-silver-bright font-serif-cinzel font-bold text-sm tracking-widest hover:bg-silver/10 transition-all text-center"
                >
                  VER UBICACIÓN <MapPin className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* Side Info */}
            <div className="grid grid-rows-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 flex items-center gap-8 group hover:bg-celestial-glow/20 transition-colors"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full silver-border bg-silver/5 group-hover:scale-110 transition-transform">
                  <Shirt className="w-8 h-8 text-silver" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-cinzel text-xs text-silver tracking-[0.3em] uppercase opacity-70">Código de Vestimenta</h3>
                  <p className="font-serif-playfair text-2xl text-silver-bright">Sport Elegante</p>
                  <p className="text-[10px] text-silver/40 uppercase tracking-[0.1em]">Hombres y Mujeres</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-8 flex items-center gap-8 group hover:bg-celestial-glow/20 transition-colors"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full silver-border bg-silver/5 group-hover:scale-110 transition-transform">
                  <Gift className="w-8 h-8 text-silver" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-cinzel text-xs text-silver tracking-[0.3em] uppercase opacity-70">Presente</h3>
                  <p className="font-serif-playfair text-2xl text-silver-bright">Todos: Llevar Regalo</p>
                  <p className="text-[10px] text-silver/40 uppercase tracking-[0.1em]">A tu elección</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Gallery Section --- */}
        <section className="py-32 px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-16"
          >
            <div className="space-y-4">
                <div className="h-px w-24 bg-silver/20 mx-auto" />
                <h2 className="font-cursive text-6xl md:text-8xl text-silver-bright text-shine">Galería</h2>
                <p className="font-serif-cinzel text-[10px] tracking-[0.6em] text-silver uppercase opacity-60">Instantes de Magia</p>
            </div>
            <GallerySlider />
          </motion.div>
        </section>

        {/* --- Footer --- */}
        <section className="py-40 px-6 text-center space-y-16 bg-gradient-to-t from-black to-transparent">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h3 className="font-cursive text-6xl text-silver-bright">¡Gracias por ser parte de mi historia!</h3>
            <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 md:w-32 bg-silver/20" />
                <Heart className="w-6 h-6 text-silver fill-silver animate-pulse" />
                <div className="h-px w-16 md:w-32 bg-silver/20" />
            </div>
          </motion.div>
          
          <div className="space-y-2 opacity-30">
            <p className="font-serif-cinzel text-[10px] tracking-[1em] text-silver uppercase">Keily Fernanda</p>
            <p className="font-sans text-[8px] tracking-[0.2em] text-silver uppercase text-center">Mis 15 Años • 2026</p>
          </div>
        </section>

      </main>
      </div>

      {/* Ornament Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-[5]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-paper.png')` }} />
    </div>
  );
}
