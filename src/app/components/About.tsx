import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────── 
   Helper Component — Row Interactive SVG Visualizer
   ─────────────────────────────────────────────────────── */
function RowVisualizer({ index, isHovered }: { index: number; isHovered: boolean }) {
  if (index === 0) {
    // Engineering Excellence — spinning gears network
    return (
      <svg className="w-12 h-12 text-purple-400/80 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" viewBox="0 0 100 100">
        <motion.g 
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }} 
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }} 
          style={{ originX: '50px', originY: '50px' }}
        >
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 50 10 L 50 20 M 50 80 L 50 90 M 10 50 L 20 50 M 80 50 L 90 50 M 22 22 L 29 29 M 71 71 L 78 78 M 22 78 L 29 71 M 71 22 L 78 29" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </motion.g>
        <motion.g 
          animate={isHovered ? { rotate: -360 } : { rotate: 0 }} 
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }} 
          style={{ originX: '50px', originY: '50px' }}
        >
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 50 35 L 50 40 M 50 60 L 50 65 M 35 50 L 40 50 M 60 50 L 65 50" stroke="currentColor" strokeWidth="1.5" />
        </motion.g>
      </svg>
    );
  }
  
  if (index === 1) {
    // Product Development — target radar scan sweep
    return (
      <svg className="w-12 h-12 text-blue-400/80 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <motion.line 
          x1="50" y1="5" x2="50" y2="95" 
          stroke="currentColor" strokeWidth="0.5" 
          animate={isHovered ? { opacity: [0.3, 1, 0.3] } : {}} 
          transition={{ duration: 1.5, repeat: Infinity }} 
        />
        <motion.line 
          x1="5" y1="50" x2="95" y2="50" 
          stroke="currentColor" strokeWidth="0.5"
          animate={isHovered ? { opacity: [0.3, 1, 0.3] } : {}} 
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} 
        />
        <motion.circle 
          cx="50" cy="50" r="10" 
          fill="none" stroke="#60a5fa" strokeWidth="1.5"
          animate={isHovered ? { scale: [0.8, 1.3, 0.8], opacity: [0.6, 1, 0.6] } : {}} 
          transition={{ duration: 2, repeat: Infinity }} 
        />
      </svg>
    );
  }
  
  if (index === 2) {
    // Creative Technology — fluid morphing sine wave path
    return (
      <svg className="w-12 h-12 text-emerald-400/80 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" viewBox="0 0 100 100">
        <motion.path 
          d="M 10 50 C 30 20, 40 80, 50 50 C 60 20, 70 80, 90 50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={isHovered ? { 
            d: [
              "M 10 50 C 30 10, 40 90, 50 50 C 60 10, 70 90, 90 50",
              "M 10 50 C 30 90, 40 10, 50 50 C 60 90, 70 10, 90 50",
              "M 10 50 C 30 10, 40 90, 50 50 C 60 10, 70 90, 90 50"
            ] 
          } : {}} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
        />
        <circle cx="50" cy="50" r="3.5" fill="#34d399" />
      </svg>
    );
  }
  
  // Scalable Systems — distributed server nodes wireframe
  return (
    <svg className="w-12 h-12 text-orange-400/80 drop-shadow-[0_0_8px_rgba(249,115,22,0.3)]" viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
      <line x1="20" y1="20" x2="50" y2="75" stroke="currentColor" strokeWidth="0.5" />
      <line x1="80" y1="20" x2="50" y2="75" stroke="currentColor" strokeWidth="0.5" />
      <motion.circle 
        cx="20" cy="20" r="4.5" fill="#fb923c" 
        animate={isHovered ? { scale: [1, 1.4, 1] } : {}} 
        transition={{ duration: 1.5, repeat: Infinity }} 
      />
      <motion.circle 
        cx="80" cy="20" r="4.5" fill="#fb923c" 
        animate={isHovered ? { scale: [1, 1.4, 1] } : {}} 
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} 
      />
      <motion.circle 
        cx="50" cy="75" r="4.5" fill="#f97316" 
        animate={isHovered ? { scale: [1, 1.4, 1] } : {}} 
        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }} 
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────── 
   Helper Component — Interactive capability Row
   ─────────────────────────────────────────────────────── */
interface PrincipleRowProps {
  principle: { num: string; title: string; description: string };
  index: number;
  isMobile: boolean;
}

function PrincipleRow({ principle, index, isMobile }: PrincipleRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const words = principle.title.split(' ');
  const firstWord = words[0].toUpperCase();
  const remainingWords = words.slice(1).join(' ').toUpperCase();

  const accents = ['#a855f7', '#3b82f6', '#10b981', '#f97316'];
  const accent = accents[index];

  const telemetry = [
    { label: 'THREAD_LATENCY', val: '4ms' },
    { label: 'USER_COMPLIANCE', val: '100%' },
    { label: 'SYS_INTEGRITY', val: '99.9%' },
    { label: 'NODE_COUNT', val: '12_HOST' }
  ];

  return (
    <motion.div
      className="relative group transition-all duration-500 border-b border-white/[0.04] bg-white/[0.005] hover:bg-white/[0.015] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: isMobile ? "-60px" : "0px 0px -25px 0px" }}
      transition={{ duration: 0.8, delay: isMobile ? 0.05 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={isMobile ? {} : { x: 8 }}
    >
      {!isMobile && <div className="anchor-crosshair pointer-events-none" />}
      
      {/* Soft color-coordinated hover gradient spotlight backing */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: `radial-gradient(circle at 10% 50%, ${accent}0a 0%, transparent 60%)`
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 sm:gap-12 py-10 sm:py-12 px-4 sm:px-8">
        
        {/* Index + dynamic outline typography title */}
        <div className="w-full sm:w-[45%] flex flex-col gap-2">
          <span className="mono-metadata font-bold" style={{ color: accent }}>
            [{principle.num} // MODEL_NODE]
          </span>
          <h4 className="text-white font-extrabold tracking-tight transition-all duration-300" style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.8rem)', lineHeight: 1.15 }}>
            {isHovered ? (
              <span className="flex flex-wrap gap-x-2">
                <span className="text-white">{firstWord}</span>
                <span 
                  className="text-outline-watermark font-black"
                  style={{ WebkitTextStroke: `1px ${accent}` }}
                >
                  {remainingWords}
                </span>
              </span>
            ) : (
              principle.title
            )}
          </h4>
        </div>

        {/* Description & active terminal metadata logs */}
        <div className="w-full sm:w-[42%] flex flex-col gap-3">
          <p className="text-zinc-200 leading-relaxed font-light" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
            {principle.description}
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="mono-metadata text-[0.62rem] opacity-70">
              [ STATUS: ACTIVE_STABLE // {telemetry[index].label}: {telemetry[index].val} ]
            </span>
          </div>
        </div>

        {/* Interactive SVG graphic reveals itself on hover */}
        {!isMobile && (
          <div className="w-[10%] flex justify-end items-center relative h-12 pr-2 select-none pointer-events-none">
            <RowVisualizer index={index} isHovered={isHovered} />
          </div>
        )}

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── 
   MAIN EXPORT — About Methodology Split Layout
   ─────────────────────────────────────────────────────── */
export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateAmbiance = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleAmbiance = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const principles = [
    {
      num: '01',
      title: 'Engineering Excellence',
      description: 'Crafting scalable, maintainable systems with modern architecture patterns.'
    },
    {
      num: '02',
      title: 'Product Development',
      description: 'Building user-centric products that solve real problems with elegant solutions.'
    },
    {
      num: '03',
      title: 'Creative Technology',
      description: 'Pushing boundaries with experimental interfaces and immersive experiences.'
    },
    {
      num: '04',
      title: 'Scalable Systems',
      description: 'Designing robust infrastructure that grows with user needs.'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 px-4 sm:px-8 bg-transparent overflow-hidden">
      {/* Background ambiance with scroll-based rotation (disabled on mobile for performance) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full opacity-10 blur-[100px]"
        style={isMobile ? {
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)'
        } : {
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          rotate: rotateAmbiance,
          scale: scaleAmbiance
        }}
      />

      {/* Static orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)'
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-16">
        {/* ── Section intro — split layout ── */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-20 sm:mb-32">
          <motion.div
            className="max-w-2xl"
            initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "-50px" : "0px 0px -20px 0px" }}
            transition={isMobile ? { duration: 1, type: "spring", stiffness: 50 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Section label — editorial line + text */}
            <motion.div
              className="section-label mb-8 sm:mb-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 sm:w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 tracking-widest uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>
                About
              </span>
            </motion.div>

            {/* Massive heading — left-aligned */}
            <motion.h2
              className="mb-8 sm:mb-12 tracking-tight"
              style={{
                fontSize: 'clamp(2.2rem, 7vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: '#ffffff'
              }}
              initial={isMobile ? { opacity: 0, y: 50, scale: 0.9 } : { opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
              transition={isMobile ? { duration: 1, delay: 0.1 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              BUILDING THE
              <br />
              <span className="text-blue-400">FUTURE</span> OF WEB
            </motion.h2>

            <div className="space-y-6 px-1 sm:px-0">
              <motion.p
                className="text-gray-300 leading-relaxed text-[0.95rem] sm:text-[1.1rem] md:text-[1.3rem] lg:text-[1.6rem]"
                style={{ fontWeight: 300 }}
                initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: 10 }}
                whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
                transition={isMobile ? { delay: 0.2 } : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                I specialize in creating <span className="text-white font-medium">immersive digital experiences</span> that
                blend cutting-edge technology with intuitive design.
              </motion.p>

              <motion.p
                className="text-gray-400 leading-relaxed text-[0.85rem] sm:text-[0.95rem] md:text-[1.15rem] lg:text-[1.4rem]"
                style={{ fontWeight: 300 }}
                initial={isMobile ? { opacity: 0, x: -20 } : { opacity: 0, y: 10 }}
                whileInView={isMobile ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
                transition={isMobile ? { delay: 0.4 } : { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                From architecting scalable full-stack applications to crafting pixel-perfect interfaces,
                I focus on delivering <span className="text-blue-400">high-performance solutions</span> that
                push the boundaries of what's possible on the web.
              </motion.p>
            </div>
          </motion.div>

          {/* Photo composition — preserved */}
          <motion.div
            className="relative w-full max-w-[280px] h-[360px] sm:max-w-[320px] sm:h-[420px] lg:w-[400px] lg:h-[500px] shrink-0 group mt-8 lg:mt-0"
            initial={isMobile ? { opacity: 0, scale: 0.8, rotate: -5 } : { opacity: 0, scale: 0.98, y: 15 }}
            whileInView={isMobile ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
            transition={isMobile ? { duration: 1, type: "spring", stiffness: 50, delay: 0.3 } : { duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={isMobile ? {} : { scale: 1.05, rotate: 2 }}
          >
            {/* Matte background frame — no glassmorphism */}
            <div
              className="absolute inset-x-0 bottom-0 top-14 sm:top-20 z-0 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.06) 0%, rgba(168, 85, 247, 0.04) 100%)',
                borderBottom: '1px solid rgba(255,255,255,0.06)'
              }}
            />

            {/* The transparent image */}
            <img
              src="/tr_image.png"
              alt="Aryan Thakur"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[110%] object-contain object-bottom drop-shadow-[0_-10px_20px_rgba(59,130,246,0.15)] transition-all duration-700 z-10 pointer-events-none"
            />

            {/* Subtle boundary strip */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent z-20" />
          </motion.div>
        </div>

        {/* ── Principles — editorial split layout ── */}
        <div className="relative mt-20 sm:mt-32 cinematic-spotlight">
          {/* Main split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* Left Sticky Column — Towing Visual Anchor (Gen-Z Tilted Glass Blueprint Layout Re-integrated) */}
            {!isMobile && (
              <div className="lg:col-span-4 sticky top-28 z-20 select-none py-6">
                {/* Outer tilted card wrapper */}
                <motion.div 
                  className="w-full rounded-2xl border border-blue-500/25 bg-blue-500/[0.04] backdrop-blur-[3px] py-8 px-6 flex flex-col justify-between min-h-[440px] relative shadow-[0_0_40px_rgba(59,130,246,0.06)] hover:border-blue-400/40 hover:bg-blue-500/[0.07] hover:shadow-[0_0_50px_rgba(59,130,246,0.12)] transition-all duration-500 group"
                  style={{ rotate: '-2.5deg' }}
                  whileHover={{ rotate: '-1.5deg', y: -4 }}
                >
                  {/* Digital crosshair anchors */}
                  <div className="anchor-crosshair pointer-events-none" />
                  
                  {/* Neon pulsing glow backdrop inside card */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-blue-500/10 blur-[40px] group-hover:bg-blue-500/15 transition-all duration-500 pointer-events-none z-0" />
                  
                  {/* Sweeping laser coordinate scanning line */}
                  <motion.div 
                    className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-60 z-10 pointer-events-none"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />

                  {/* Vertical background watermark inside card */}
                  <div 
                    className="absolute text-outline-watermark text-[8rem] opacity-[0.08] -right-8 top-16 -z-10 tracking-widest uppercase origin-center select-none pointer-events-none font-black"
                    style={{ transform: 'rotate(90deg)', WebkitTextStroke: '1px rgba(96,165,250,0.15)' }}
                  >
                    ENGINE
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Technical specifications tag */}
                      <div className="flex justify-between items-center mb-6">
                        <span className="mono-metadata text-blue-400 font-extrabold text-[0.65rem] tracking-widest">
                          [ SYSTEM // METHODOLOGY ]
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span className="text-[0.55rem] font-mono text-white/30">REV: v1.4</span>
                        </div>
                      </div>

                      <h3 className="text-white text-4.5xl font-black tracking-tighter leading-none uppercase mb-6">
                        THE CORE
                        <br />
                        <span className="font-extrabold text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">ENGINE</span>
                      </h3>
                      
                      <p className="text-white/60 text-xs leading-relaxed max-w-[240px] font-light">
                        Every digital architecture is constructed with strict compliance to high-performance guidelines, visual equilibrium, and modular scalability.
                      </p>
                    </div>
                    
                    {/* Live system telemetry blocks inside card */}
                    <div className="mt-8 pt-6 border-t border-white/5 space-y-3 z-10">
                      <div className="flex justify-between items-center text-[0.6rem] font-mono">
                        <span className="text-white/40">SYS_INTEGRITY:</span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          [ BULLETPROOF ]
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-[0.6rem] font-mono">
                        <span className="text-white/40">NODE_LATENCY:</span>
                        <span className="text-blue-300 font-semibold">[ ACTIVE_OK ]</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-[0.6rem] font-mono">
                        <span className="text-white/40">COORDINATES:</span>
                        <span className="text-zinc-300">28.57° N , 77.22° E</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Right Column — Upgraded Gen-Z Blueprint Glass Capability Rows */}
            <div className="lg:col-span-8 space-y-0">
              {/* Top border line */}
              <div className="editorial-guideline-x" />

              {principles.map((principle, index) => (
                <PrincipleRow 
                  key={principle.title} 
                  principle={principle} 
                  index={index} 
                  isMobile={isMobile} 
                />
              ))}
            </div>

          </div>
        </div>

        {/* ── Bottom statement — floating text, no container, anchored ── */}
        <motion.div
          className="mt-24 sm:mt-36 text-center px-4 relative py-6"
          initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
          transition={isMobile ? { duration: 0.8, delay: 0.3 } : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          <p
            className="text-zinc-300 max-w-3xl mx-auto text-[0.95rem] sm:text-[1.15rem] md:text-[1.35rem] leading-relaxed font-light"
          >
            Every project is an opportunity to <span className="text-blue-400 font-semibold">innovate</span>,
            <span className="text-purple-400 font-semibold"> experiment</span>, and create
            something <span className="text-white font-semibold">extraordinary</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
