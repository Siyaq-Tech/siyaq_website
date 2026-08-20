import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { staggerContainer, fadeInUp } from '../lib/animations';

/* ── Animated Wavy Tech Background ────────────────────────────── */
const WavyTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      time += 0.001; // Slower, elegant movement like Jet
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lines = 35; // More lines for a denser, detailed topographic look
      
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        const progress = i / lines;
        // Base y position for the line, covering vertical space smoothly
        const yBase = (canvas.height * 0.15) + (progress * canvas.height * 0.7);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          // Complex organic curves using multiple sine waves
          const wave1 = Math.sin(x * 0.002 + time + i * 0.1) * 70;
          const wave2 = Math.sin(x * 0.003 - time * 0.8 + i * 0.05) * 45;
          const wave3 = Math.sin(x * 0.001 + time * 1.5) * 90;
          
          // Perspective effect (lines get flatter towards edges)
          const perspectiveModifier = Math.sin(progress * Math.PI);
          
          const y = yBase + (wave1 + wave2 + wave3) * perspectiveModifier;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Gradient that fades nicely on the edges, clearer and sharper
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        
        // Much clearer opacity, maxing out at 0.15 in the center
        const maxOpacity = 0.04 + (Math.sin(progress * Math.PI) * 0.12);
        gradient.addColorStop(0.5, `rgba(0, 0, 0, ${maxOpacity})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5; // Clearer lines
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #f9f9f9 100%)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100 mix-blend-multiply" />
      {/* Light gradient overlay to mask the bottom and top edges smoothly */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfdfd]/40 via-transparent to-[#F9F9F9]"></div>
    </div>
  );
};

/* ── Animated Counter ─────────────────────────────────────────── */
interface CounterProps {
  value: string;  /* e.g. "5+", "2", "100%" */
  label: string;
}

const CounterStat: React.FC<CounterProps> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const [triggered, setTriggered] = useState(false);

  /* Parse: extract number & suffix ("5+" → { num: 5, suffix: "+" }) */
  const match = value.match(/^(\d+)(.*)$/);
  const targetNum = match ? parseInt(match[1], 10) : 0;
  const suffix    = match ? match[2] : value;

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTriggered(true);
        observer.disconnect();

        /* Ease-out counting animation */
        const duration = 2500;         // ms
        const start    = performance.now();

        const tick = (now: number) => {
          const elapsed  = now - start;
          const progress = Math.min(elapsed / duration, 1);
          /* Ease-out cubic */
          const eased    = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(eased * targetNum);
          setDisplay(current === targetNum ? value : String(current) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetNum, suffix, triggered, value]);

  return (
    <div ref={ref} className="text-center py-8 border-t border-b border-gray-200">
      <div
        key={display}
        className="text-3xl md:text-4xl font-medium text-black mb-2 counter-animate tabular-nums"
      >
        {display}
      </div>
      <div className="text-xs text-gray-500 font-medium uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
};

/* ── Hero Section ─────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section
      id="home"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-screen flex items-center bg-[#F9F9F9] overflow-hidden pt-20"
    >
      {/* Tech wavy background */}
      <WavyTechBackground />

      {/* Content sits above */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full pointer-events-none"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium text-black leading-[1.1] mb-6"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-10 py-4 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-colors text-center"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#services"
              className="w-full sm:w-auto px-10 py-4 bg-white border border-gray-200 text-black text-sm font-medium hover:border-black transition-colors text-center"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Stats — animated counters */}
        <motion.div
          variants={staggerContainer}
          className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto"
        >
          <motion.div variants={fadeInUp}>
            <CounterStat value={t.hero.stat1Value} label={t.hero.stat1Label} />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CounterStat value={t.hero.stat2Value} label={t.hero.stat2Label} />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <CounterStat value={t.hero.stat3Value} label={t.hero.stat3Label} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
