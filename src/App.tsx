import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, MapPin, Calendar, Clock, Shirt, Gift, ChevronLeft, ChevronRight, Music, Heart, MailOpen, Send, Copy, Check, Users, Sparkles, Utensils, PartyPopper, Camera, Crown, Smartphone, Facebook, Youtube } from 'lucide-react';

// --- Constants & Data ---
const EVENT_DATE = new Date('2027-05-09T18:00:00');
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

const StarRain = () => {
  const [items, setItems] = useState<{ id: number; left: string; delay: string; duration: string; size: string; opacity: string }[]>([]);

  useEffect(() => {
    const count = 35;
    const newItems = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -15}s`,
      duration: `${Math.random() * 10 + 8}s`,
      size: `${Math.random() * 3 + 1.5}px`,
      opacity: `${Math.random() * 0.5 + 0.3}`
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 z-[15] pointer-events-none overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="star-fall"
          style={{
            left: item.left,
            width: item.size,
            height: item.size,
            '--duration': item.duration,
            '--max-opacity': item.opacity,
            animationDelay: item.delay
          } as any}
        />
      ))}
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

const ITINERARY_ITEMS = [
  {
    time: "06:00 p.m.",
    title: "Ingreso & Recepción Celestial",
    description: "Recepción especial de nuestros queridos invitados, asignación de mesas personalizadas y bienvenida bajo un ambiente estrellado de ensueño.",
    icon: Users
  },
  {
    time: "06:45 p.m.",
    title: "Sesión de Fotos y Agradecimientos",
    description: "Capturamos fotos hermosas junto a la quinceañera antes del inicio del protocolo formal. ¡Llega temprano para asegurar tu foto!",
    icon: Camera
  },
  {
    time: "07:30 p.m.",
    title: "Ceremonia de la Zapatilla & Cambio de Corona",
    description: "Un momento cargado de tradición y simbolismo: la coronación de Keily Fernanda y el cambio de zapato que representa su feliz paso a la juventud.",
    icon: Crown
  },
  {
    time: "08:00 p.m.",
    title: "El Vals de Honor de Ensueño",
    description: "El instante más emotivo de la noche: la entrada solemne y el baile del vals con su amado padre, seguidos por momentos de vals con familiares y chambelanes.",
    icon: Sparkles
  },
  {
    time: "08:30 p.m.",
    title: "Brindis de Honor y Palabras",
    description: "Nuestros padrinos y queridos padres ofrecerán discursos de orgullo, seguidos de un brindis grupal levantando copas por su brillante porvenir.",
    icon: Heart
  },
  {
    time: "09:00 p.m.",
    title: "Exquisita Cena de Gala",
    description: "Disfrutaremos de un banquete excepcional, preparado con muchísimo afecto para celebrar juntos mientras compartimos anécdotas felices.",
    icon: Utensils
  },
  {
    time: "10:15 p.m.",
    title: "Corte Tradicional de la Torta",
    description: "Keily soplará las velas de sus quince años rodeada del cántico de sus invitados y compartiendo hermosas sonrisas.",
    icon: Sparkles
  },
  {
    time: "10:45 p.m.",
    title: "Apertura de la Pista de Baile",
    description: "La música se apodera de la noche. Se encienden las luces del escenario principal para dar inicio oficial a la fiesta que guardaremos en el corazón.",
    icon: Music
  },
  {
    time: "11:30 p.m.",
    title: "¡MEGA HORA LOCA NEÓN CELESTIAL!",
    description: "¡La hora del máximo júbilo! Prepárate para cotillón retroiluminado, luces LED, antifaces fluorescentes, globos gigantes y los ritmos más encendidos de la noche.",
    icon: PartyPopper
  },
  {
    time: "02:00 a.m.",
    title: "Fin de Fiesta & Despedida",
    description: "Agradecemos de corazón a todos por habernos acompañado en esta noche celestial mágica e inolvidable.",
    icon: Users
  }
];

const Itinerary = () => {
  return (
    <section className="py-32 px-4 max-w-5xl mx-auto space-y-20 relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-[20%] left-[-10%] w-72 h-72 rounded-full bg-silver/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-72 h-72 rounded-full bg-silver/5 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-silver/30 to-transparent" />
          <h2 className="font-serif-cinzel text-4xl md:text-6xl text-silver-bright tracking-[0.25em] uppercase text-shine font-bold">
            Itinerario
          </h2>
          <span className="font-cursive text-2xl md:text-3xl text-silver/60">El camino de una noche mágica</span>
          <p className="font-serif-cinzel text-[10px] tracking-[0.4em] text-silver uppercase opacity-40">Horarios & Momentos Especiales</p>
          <div className="h-1 w-1 bg-silver shadow-[0_0_8px_white] rounded-full mt-2" />
        </motion.div>
      </div>

      <div className="relative max-w-3xl mx-auto pr-2 md:pr-0 pl-16 md:pl-24">
        {/* Modern glowing central line */}
        <div className="absolute left-[38px] md:left-[46px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-silver/40 via-silver-bright/20 to-silver/5 shadow-[0_0_10px_rgba(255,255,255,0.05)]" />

        <div className="space-y-16">
          {ITINERARY_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 50 }}
                className="relative group cursor-default"
              >
                {/* Glowing Side Indicator Line on hover */}
                <div className="absolute left-[-26px] md:left-[-34px] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-transparent group-hover:bg-silver-bright transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />

                {/* Animated Timeline Connector/Icon */}
                <motion.div 
                  whileHover={{ scale: 1.25, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="absolute left-[-42px] md:-left-50px top-1.5 w-10 h-10 rounded-full bg-celestial-dark border border-silver/30 group-hover:border-white flex items-center justify-center text-silver group-hover:text-silver-bright shadow-[0_0_15px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300 z-10"
                >
                  <motion.div
                    animate={item.title.includes("HORA LOCA") ? { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] } : {}}
                    transition={item.title.includes("HORA LOCA") ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                </motion.div>

                {/* Card representation */}
                <div className="relative bg-white/5 hover:bg-white/[0.08] p-6 md:p-8 rounded-md border border-white/5 hover:border-silver/30 transition-all duration-500 shadow-md hover:shadow-2xl hover:-translate-y-1 ml-4 select-none">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconComponent className="w-16 h-16 text-silver-bright" />
                  </div>

                  <div className="space-y-3 relative z-10">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-serif-cinzel text-[11px] font-extrabold tracking-[0.2em] text-silver-bright bg-white/10 border border-silver/20 px-3 py-1 rounded-sm shadow-sm group-hover:bg-silver-bright group-hover:text-celestial-dark transition-colors duration-300">
                        {item.time}
                      </span>
                      {item.title.includes("HORA LOCA") && (
                        <span className="text-[10px] font-sans font-bold tracking-widest text-yellow-300 bg-yellow-400/10 border border-yellow-400/30 px-2 py-0.5 rounded-sm animate-pulse">
                          VIP MOMENT
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-serif-playfair text-xl md:text-2xl text-white group-hover:text-silver-bright transition-colors font-bold tracking-wide mt-2">
                      {item.title}
                    </h3>
                    
                    <p className="font-sans text-xs md:text-sm text-silver/70 max-w-xl leading-relaxed duration-300 group-hover:text-silver-bright/90">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GiftList = () => {
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const bankAccounts = [
    {
      bank: "Banco BCP (Soles)",
      accountNumber: "193-98765432-0-12",
      cci: "002-193-0098765432012-14",
      holder: "América Ccorahua Quispe"
    },
    {
      bank: "Banco Interbank (Soles)",
      accountNumber: "200-3098765432",
      cci: "003-200-003098765432-45",
      holder: "Victor César Sobrevilla Villa"
    }
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <div className="h-px w-24 bg-silver/20 mx-auto" />
        <h2 className="font-serif-cinzel text-3xl md:text-5xl text-silver-bright tracking-widest uppercase text-shine">Mesa de Regalos</h2>
        <p className="font-serif-playfair italic text-sm text-silver/80 max-w-xl mx-auto">
          &ldquo;Tu presencia es mi mayor regalo, pero si deseas hacerme un detalle especial, aquí tienes algunas opciones que me ayudarán muchísimo.&rdquo;
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Cash Envelopes Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 flex flex-col items-center text-center justify-between space-y-8"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full silver-border bg-silver/5">
            <Gift className="w-8 h-8 text-silver" />
          </div>

          <div className="space-y-4">
            <h3 className="font-serif-cinzel text-lg text-silver-bright tracking-widest font-bold">LLUVIA DE SOBRES</h3>
            <p className="font-sans text-sm text-silver/70 leading-relaxed max-w-sm">
              Consiste en depositar tu presente de aprecio en efectivo dentro de un sobre cerrado el día de la fiesta. Tendremos un cofre especial de cristal en el ingreso del salón de recepción para recibirlos.
            </p>
          </div>

          <div className="w-full h-px bg-silver/10" />
          <div className="font-serif-playfair text-silver italic text-xs opacity-70">
            &ldquo;Cada pequeña muestra de cariño y buenos deseos será incalculable.&rdquo;
          </div>
        </motion.div>

        {/* Bank Transfers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 flex flex-col justify-between space-y-8"
        >
          <div className="flex items-center gap-4 border-b border-silver/10 pb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-silver/5">
              <Sparkles className="w-6 h-6 text-silver" />
            </div>
            <div>
              <h3 className="font-serif-cinzel text-base text-silver-bright tracking-wider font-bold">CUENTAS BANCARIAS</h3>
              <p className="font-sans text-[10px] text-silver/50 uppercase">Transferencias de confianza</p>
            </div>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((acc, index) => (
              <div key={index} className="space-y-2 bg-white/5 p-4 rounded-md border border-white/5 text-sm">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span className="font-serif-cinzel text-silver-bright font-bold text-xs">{acc.bank}</span>
                  <span className="text-[10px] text-silver/60 uppercase">Titular: {acc.holder}</span>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-silver/50">Nro Cuenta:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-silver-bright select-all">{acc.accountNumber}</span>
                      <button
                        onClick={() => handleCopy(acc.accountNumber, `${acc.bank}-n`)}
                        className="p-1 hover:text-white text-silver/50 transition-colors"
                        title="Copiar número de cuenta"
                      >
                        {copiedBank === `${acc.bank}-n` ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-silver/50">Nro CCI:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-silver-bright text-[11px] select-all">{acc.cci}</span>
                      <button
                        onClick={() => handleCopy(acc.cci, `${acc.bank}-cci`)}
                        className="p-1 hover:text-white text-silver/50 transition-colors"
                        title="Copiar CCI"
                      >
                        {copiedBank === `${acc.bank}-cci` ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {copiedBank && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-green-400 font-sans tracking-wider"
              >
                ¡Copiado al portapapeles exitosamente!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

interface GuestComment {
  id: string;
  name: string;
  comment: string;
  date: string;
}

const Guestbook = () => {
  const [comments, setComments] = useState<GuestComment[]>([]);
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initialWishes: GuestComment[] = [
    {
      id: "1",
      name: "Tía Nery Sobrevilla Villa",
      comment: "¡Felicidades mi hermosa Keily! Que este hermoso primer peldaño de tu juventud esté siempre alumbrado por la luz protectora del cielo y la bendición de Dios. Te amamos inmensamente.",
      date: "2027-05-06"
    },
    {
      id: "2",
      name: "Percy Cuadros Aparco (Padrino)",
      comment: "Un honor inmenso acompañarte como padrino en esta noche mágica. Sigue adelante siempre con esa hermosa esencia, querida ahijada. ¡Felicidades por tus quince!",
      date: "2027-05-06"
    },
    {
      id: "3",
      name: "Familia Sobrevilla Villa",
      comment: "Que esta noche tan soñada sea el hermoso comienzo de una vida fabulosa, llena de triunfos, salud y sonrisas eternas. ¡Felices 15 años Keily!",
      date: "2027-05-06"
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("keily_quince_guestbook");
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(initialWishes);
      }
    } else {
      setComments(initialWishes);
      localStorage.setItem("keily_quince_guestbook", JSON.stringify(initialWishes));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Por favor, ingresa tu nombre.");
      return;
    }
    if (!commentText.trim()) {
      setError("Por favor, escribe tus buenos deseos.");
      return;
    }

    setSubmitting(true);

    const newComment: GuestComment = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: commentText.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem("keily_quince_guestbook", JSON.stringify(updated));

    setName("");
    setCommentText("");
    setSubmitting(false);
  };

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <div className="h-px w-24 bg-silver/20 mx-auto" />
        <h2 className="font-cursive text-6xl md:text-8xl text-silver-bright text-shine pb-2">Libro de Visitas</h2>
        <p className="font-serif-cinzel text-[10px] tracking-[0.6em] text-silver uppercase opacity-60">Déjame tus Buenos Deseos para Siempre</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Form Container */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 p-8 rounded-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif-cinzel text-lg text-white font-bold tracking-wider">FIRMAR LIBRO</h3>
            <p className="font-sans text-xs text-silver/65">Escribe unas palabras para la quinceañera</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-silver">Nombre o Familia</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Familia Sobrevilla Ccorahua"
                className="w-full bg-celestial-dark border border-white/15 px-4 py-3 text-silver-bright text-sm rounded-sm focus:outline-none focus:border-silver transition-colors"
                maxLength={50}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wider text-silver">Mensaje y Buenos Deseos</label>
              <textarea 
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Escribe tus buenos deseos..."
                className="w-full bg-celestial-dark border border-white/15 px-4 py-3 text-silver-bright text-sm rounded-sm focus:outline-none focus:border-silver transition-colors resize-none"
                maxLength={180}
              />
              <div className="flex justify-between text-[10px] text-silver/40">
                <span>Máx. 180 caracteres</span>
                <span>{commentText.length}/180</span>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-4 bg-silver-bright text-celestial-dark font-serif-cinzel font-bold text-sm tracking-widest hover:bg-white transition-all rounded-sm cursor-pointer"
            >
              ENVIAR MENSAJE <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Comments List Container */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <div className="text-center py-12 text-silver/55 font-serif-playfair italic">
              Aún no hay mensajes. ¡Sé el primero en firmar el libro!
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {comments.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/5 border-l-2 border-silver border-y border-r border-white/5 p-6 space-y-2 relative group hover:bg-white/[0.08] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-serif-cinzel font-bold text-sm text-silver-bright">
                      {item.name}
                    </span>
                    <span className="font-mono text-[9px] text-silver/40">
                      {item.date}
                    </span>
                  </div>
                  <p className="font-serif-playfair italic text-silver/80 text-sm leading-relaxed">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

const CreatorCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-md mx-auto relative p-[1.5px] rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-500/30 via-silver/30 to-blue-500/30 shadow-[0_0_35px_rgba(34,211,238,0.15)] group"
    >
      {/* Dynamic glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-transparent to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur" />
      
      {/* Translucent glassmorphism container */}
      <div className="relative bg-black/75 backdrop-blur-2xl p-8 rounded-2xl border border-white/10 space-y-6 text-center select-none">
        {/* Glow ambient circle */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="space-y-2">
          <span className="font-serif-cinzel text-[10px] tracking-[0.4em] text-cyan-400 font-bold uppercase block">
            Diseñador Digital
          </span>
          <h4 className="font-serif-cinzel text-2xl md:text-3xl font-extrabold text-white tracking-widest text-shine">
            VAC CREATIVO
          </h4>
          <p className="font-sans text-xs md:text-sm text-silver/80 italic font-medium px-4">
            &ldquo;Invitaciones virtuales y diseño gráfico en general&rdquo;
          </p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Social media connections */}
        <div className="flex items-center justify-center gap-4">
          {/* WhatsApp with auto-filled message */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/51932350348?text=Hola%20VAC%20Creativo%2C%20vi%20la%20invitaci%C3%B3n%20virtual%20de%20Keily%20y%20me%20encant%C3%B3.%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tus%20dise%C3%B1os%20de%20invitaciones."
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
            title="WhatsApp"
          >
            <Send className="w-5 h-5" />
          </motion.a>

          {/* TikTok Account representation using Music Icon */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.tiktok.com/@vaccreative"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
            title="TikTok"
          >
            <Music className="w-5 h-5" />
          </motion.a>

          {/* Facebook */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.facebook.com/VAC.Creativo"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
            title="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </motion.a>

          {/* YouTube */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.youtube.com/@VACCreative"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all cursor-pointer"
            title="YouTube"
          >
            <Youtube className="w-5 h-5" />
          </motion.a>
        </div>

        <div className="text-[10px] text-cyan-500/50 uppercase tracking-[0.2em] font-sans font-semibold">
          Invitaciones Premium & Branding
        </div>
      </div>
    </motion.div>
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
        <StarRain />
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
                MAYO 2027
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
                    <span className="font-serif-cinzel text-lg">09/05/27</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full max-w-xs gap-4">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/51932350348?text=Hola%20Keily%2C%20confirmo%20mi%20asistencia%20a%20tu%20fiesta%20de%2015%20a%C3%B1os.%20%C2%A1Muchas%20gracias%21" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-silver-bright text-celestial-dark font-serif-cinzel font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(192,192,192,0.3)] hover:shadow-[0_0_30px_rgba(192,192,192,0.5)] transition-all cursor-pointer"
                >
                  CONFIRMAR ASISTENCIA <Music className="w-4 h-4 ml-1" />
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.app.goo.gl/jf7Q7dc7DuF9wTF97" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-celestial-glow border border-silver/30 text-silver-bright font-serif-cinzel font-bold text-sm tracking-widest hover:bg-silver/10 transition-all text-center cursor-pointer"
                >
                  VER UBICACIÓN <MapPin className="w-4 h-4" />
                </motion.a>

                <div className="w-full pt-4 border-t border-silver/10 space-y-3">
                  <p className="font-serif-cinzel text-[10px] tracking-[0.25em] text-silver/60 uppercase text-center">Añadir al Calendario</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <motion.a 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("15 Años de Keily Fernanda")}&dates=20270509T230000Z/20270510T070000Z&details=${encodeURIComponent("¡Te espero en mi maravillosa noche de quince años celestial! No olvides confirmar tu asistencia al +51 932 350 348.")}&location=${encodeURIComponent("Casa Verde")}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-3 py-3 rounded-md bg-white/5 border border-white/10 hover:border-silver/30 text-silver-bright font-serif-cinzel font-bold text-[10px] tracking-wider transition-all text-center cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" /> GOOGLE
                    </motion.a>

                    <button 
                      onClick={() => {
                        const icsLines = [
                          "BEGIN:VCALENDAR",
                          "VERSION:2.0",
                          "CALSCALE:GREGORIAN",
                          "METHOD:PUBLISH",
                          "BEGIN:VEVENT",
                          "UID:keily_fernanda_15_anos_2027",
                          "DTSTAMP:20270509T180000Z",
                          "DTSTART:20270509T230000Z",
                          "DTEND:20270510T070000Z",
                          "SUMMARY:15 Años de Keily Fernanda",
                          "DESCRIPTION:¡Te espero en mi maravillosa noche de quince años celestial! No olvides confirmar tu asistencia. Celular: +51 932 350 348.",
                          "LOCATION:Casa Verde",
                          "END:VEVENT",
                          "END:VCALENDAR"
                        ];
                        const icsContent = icsLines.join("\r\n");
                        const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "quinceanos_keily_fernanda.ics";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                      }}
                      className="inline-flex items-center justify-center gap-2 px-3 py-3 rounded-md bg-white/5 border border-white/10 hover:border-silver/30 text-silver-bright font-serif-cinzel font-bold text-[10px] tracking-wider transition-all text-center cursor-pointer"
                    >
                      <Smartphone className="w-3.5 h-3.5" /> iPHONE
                    </button>
                  </div>
                </div>
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

        {/* --- Itinerary Section --- */}
        <Itinerary />

        {/* --- Gift List Section --- */}
        <GiftList />

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

        {/* --- Guestbook Section --- */}
        <Guestbook />

        {/* --- Footer --- */}
        <section className="py-40 px-6 text-center space-y-20 bg-gradient-to-t from-black to-transparent">
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
          
          {/* Elegant Translucent Creator Card (VAC Creativo) */}
          <div className="pt-8">
            <CreatorCard />
          </div>
          
          <div className="space-y-2 opacity-30 pt-4">
            <p className="font-serif-cinzel text-[10px] tracking-[1em] text-silver uppercase">Keily Fernanda</p>
            <p className="font-sans text-[8px] tracking-[0.2em] text-silver uppercase text-center">Mis 15 Años • 2027</p>
          </div>
        </section>

      </main>
      </div>

      {/* Ornament Overlay */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-[5]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/black-paper.png')` }} />
    </div>
  );
}
