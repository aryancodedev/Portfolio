import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronDown, FileText, ArrowUpRight } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    setTimeout(() => setIsLoaded(true), 300);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-transparent">
      {/* Mobile-only responsive desktop disclaimer badge */}
      {isMobile && (
        <div className="absolute top-6 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-[92%] max-w-[280px]">
          <div 
            onClick={() => {
              const viewportMeta = document.querySelector('meta[name="viewport"]');
              if (viewportMeta) {
                viewportMeta.setAttribute('content', 'width=1280');
              }
              setIsMobile(false);
            }}
            className="text-center py-1.5 px-3.5 rounded-full border border-blue-500/20 bg-blue-950/40 backdrop-blur-md shadow-[0_2px_10px_rgba(59,130,246,0.05)] flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-900/50 transition-colors"
          >
            <span className="w-1.2 h-1.2 rounded-full bg-blue-400 animate-pulse shrink-0" style={{ boxShadow: '0 0 6px #60a5fa' }} />
            <span className="text-[0.68rem] font-mono font-extrabold text-blue-300 tracking-wider uppercase whitespace-nowrap">
              [ BEST VIEWED ON DESKTOP ]
            </span>
          </div>
        </div>
      )}

      {/* Invisible structural lanes - left and right guidelines */}
      {!isMobile && (
        <>
          <div className="editorial-guideline-y left-[10%]" />
          <div className="editorial-guideline-y right-[10%]" />

          {/* Subtle horizontal alignment bounds */}
          <div className="absolute top-[10%] left-[10%] right-[10%] h-[1px] bg-white/[0.04]" />
          <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[1px] bg-white/[0.04]" />

          {/* Monospaced corner coordinates */}
          <div className="absolute top-[5%] left-[10%] pl-4 mono-metadata">
            [ AT // CORE_SYS_V1.2 ]
          </div>
          <div className="absolute top-[5%] right-[10%] pr-4 text-right mono-metadata">
            [ STATUS // ACTIVE_OPPORTUNITIES ]
          </div>
          <div className="absolute bottom-[5%] left-[10%] pl-4 mono-metadata">
            [ LOC // 28.57° N , 77.22° E ]
          </div>
          <div className="absolute bottom-[5%] right-[10%] pr-4 text-right mono-metadata">
            [ SOURCE // CORE_PORTFOLIO ]
          </div>

          {/* Visual crosshair corners */}
          <div className="absolute top-[10%] left-[10%] anchor-crosshair" />
          <div className="absolute top-[10%] right-[10%] anchor-crosshair" />
          <div className="absolute bottom-[10%] left-[10%] anchor-crosshair" />
          <div className="absolute bottom-[10%] right-[10%] anchor-crosshair" />
        </>
      )}

      {/* Giant slow-moving aesthetic outline watermarks for parallax depth */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute text-outline-watermark select-none pointer-events-none text-[12rem] lg:text-[14rem] opacity-[0.25]"
            style={{
              left: '4%',
              top: '55%',
              fontFamily: 'system-ui',
              rotate: -90,
              transformOrigin: 'left top',
            }}
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          >
            CORE // OS
          </motion.div>
          <motion.div
            className="absolute text-outline-watermark select-none pointer-events-none text-[12rem] lg:text-[14rem] opacity-[0.25]"
            style={{
              right: '-6%',
              top: '15%',
              fontFamily: 'system-ui',
              rotate: 90,
              transformOrigin: 'right top',
            }}
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          >
            CREATIVE
          </motion.div>
        </>
      )}

      {/* Static gradient orbs for performance */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%)',
          rotateX,
          rotateY,
        }}
      />

      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Additional floating orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Main content with spotlight reading mask to dim particles directly behind typography */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center cinematic-spotlight">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 30 : 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status indicator — Refined premium micro-glow status badge */}
          <motion.button
            onClick={() => {
              const sections = document.querySelectorAll('section');
              // Find the contact section by scrolling to the last section or by ID
              const contactSec = document.getElementById('contact-section') || sections[sections.length - 1];
              contactSec?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 mb-7 cursor-pointer relative overflow-hidden rounded-lg border border-white/10 bg-[#07110c]/90 backdrop-blur-md shadow-[0_14px_28px_rgba(0,0,0,0.22)] transition-all duration-300 group hover:border-emerald-400/28 hover:bg-[#08140f]/95 hover:shadow-[0_18px_36px_rgba(0,0,0,0.28)]"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          >
            <span className="absolute inset-y-0 left-0 w-[2px] bg-gradient-to-b from-emerald-300 via-emerald-400 to-transparent opacity-90" />
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 pl-3.5 pr-4 py-2.5">
              <motion.div
                className="relative flex h-3 w-3 items-center justify-center"
                animate={{ opacity: [1, 0.35, 1], scale: [1, 0.92, 1] }}
                transition={{ duration: 1.15, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="absolute h-full w-full rounded-full bg-emerald-400/15" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(52,211,153,0.1)]" />
              </motion.div>

              <div className="flex flex-col items-start leading-none">
                <span className="text-[0.53rem] uppercase tracking-[0.32em] text-white/38 group-hover:text-white/50 transition-colors duration-300">
                  shell
                </span>
                <span className="mt-1 text-[0.68rem] sm:text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-white/85 group-hover:text-white transition-colors duration-300">
                  open for work
                </span>
              </div>
            </div>

            <div className="relative z-10 hidden sm:flex items-center pr-3 text-[0.58rem] uppercase tracking-[0.24em] text-white/30 group-hover:text-emerald-300/70 transition-colors duration-300">
              ready
            </div>
          </motion.button>

          {/* Stacked Solid/Outline Creative Title */}
          <motion.h1
            className="mb-8 tracking-tight font-black flex flex-col items-center justify-center select-none"
            initial={{ opacity: 0, y: isMobile ? 40 : 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontSize: 'clamp(3rem, 11vw, 9.5rem)',
                lineHeight: 0.85,
                background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              ARYAN
            </span>
            <span
              className="text-outline-watermark mt-2"
              style={{
                fontSize: 'clamp(3rem, 11vw, 9.5rem)',
                lineHeight: 0.85,
                letterSpacing: '0.06em',
                WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.25)',
              }}
            >
              THAKUR
            </span>
          </motion.h1>

          {/* Roles — flowing inline text */}
          <motion.p
            className="mb-8 sm:mb-12 px-4 sm:px-0 text-center font-semibold"
            style={{
              fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)',
              letterSpacing: '0.2em',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            FULL STACK DEVELOPER{' '}
            <span className="text-blue-400 mx-2 sm:mx-3 font-bold">—</span>{' '}
            FRONTEND ENGINEER{' '}
            <span className="text-purple-400 mx-2 sm:mx-3 font-bold">—</span>{' '}
            CREATIVE TECHNOLOGIST
          </motion.p>

          {/* Tagline - High legibility contrast */}
          <motion.p
            className="max-w-3xl mx-auto text-zinc-100 leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0 font-light"
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.35rem)',
              letterSpacing: '0.02em',
              textShadow: '0 2px 20px rgba(3, 2, 18, 0.9)'
            }}
            initial={{ opacity: 0, y: isMobile ? 20 : 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Building immersive digital products, intelligent systems, and futuristic web experiences through modern engineering.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 [@media(max-height:700px)]:hidden"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-white/40 tracking-widest uppercase font-medium" style={{ fontSize: '0.65rem', letterSpacing: '0.25em' }}>
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>

      {/* Static Grid overlay for performance */}
      <motion.div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />
    </section>
  );
}
