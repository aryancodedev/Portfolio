import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, Target, Palette, MapPin, Hand } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────── 
   Project Data — Upgraded with Real-World Specifications
   ─────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'GOALFORGE',
    tagline: 'PRODUCTIVITY OPERATING SYSTEM',
    description: 'A developer-focused productivity workspace combining visual goal-tracking trackers, dynamic task velocity boards, and unified team roadmap databases.',
    tags: ['React.js', 'TypeScript', 'Supabase', 'Framer Motion', 'Tailwind CSS'],
    accent: '#3b82f6',
    accentRgb: '59, 130, 246',
    link: 'https://goalforge-seven.vercel.app/',
  },
  {
    title: 'NAIN AUR NAQSH',
    tagline: 'LUXURY BRAND & DESIGN STUDIO',
    description: 'A luxury brand and creative web studio platform featuring kinetic typography reveals, interactive image reveal slides, and premium custom cursors.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS', 'Custom Cursor'],
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    link: 'https://nain-aur-naqsh.vercel.app/',
  },
  {
    title: 'RENTIT',
    tagline: 'RESPONSIVE REAL-ESTATE PLATFORM',
    description: 'A responsive real-estate listing search engine designed for property exploration, structured listing browsing, pricing trackers, and clean maps listings.',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Express.js'],
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    link: 'https://rent-it-fit.vercel.app/',
  },
  {
    title: 'GESTURE CONTROLLED',
    tagline: 'AI COMPUTER VISION INTERACTION',
    description: 'An AI-powered system utilizing computer vision hand-tracking keypoint skeletons to control web browsers and execute scrolling, zooming, or clicking gestures.',
    tags: ['Python', 'MediaPipe HandLandmarker', 'OpenCV', 'WebSocket'],
    accent: '#f97316',
    accentRgb: '249, 115, 22',
    link: 'https://drive.google.com/file/d/1ijalBnEyO086epHgDg2v50sDJTjRiHA2/view?usp=sharing',
  },
];

/* ─────────────────────────────────────────────────────── 
   Premium CTA Link
   ─────────────────────────────────────────────────────── */
function ProjectLink({ href }: { href: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="project-cta inline-flex items-center gap-2 group/link relative py-3 px-6 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-[4px] hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300"
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      <span className="text-white/80 text-[0.85rem] font-bold tracking-widest uppercase transition-colors duration-300 group-hover/link:text-white">
        View Live Site
      </span>
      <ArrowUpRight className="w-4 h-4 text-white/40 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────────────── 
   MAIN EXPORT — Experimental Cinematic Projects Exhibition
   ─────────────────────────────────────────────────────── */
export function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Global mouse tracking coordinates for layered parallax depth
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const xVal = (e.clientX / window.innerWidth - 0.5) * 35;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 35;
      setMousePos({ x: xVal, y: yVal });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set up vertical scroll tracking across the 400vh range
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out X translations with highly responsive, low-mass spring physics (instant reaction, zero input lag, velvet smooth notches)
  const xTranslationRaw = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const x = useSpring(xTranslationRaw, { stiffness: 140, damping: 28, mass: 0.25 });

  // Pinned Title text parallax scaling
  const textXRaw = useTransform(scrollYProgress, [0, 1], ['5%', '-45%']);
  const textX = useSpring(textXRaw, { stiffness: 120, damping: 26 });

  // GPU-Accelerated static color overlays with opacity cross-fading (zero browser repaints at 60fps)
  const opacity1 = useTransform(scrollYProgress, [0, 0.33], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.33, 0.66], [0, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.33, 0.66, 1], [0, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.66, 1], [0, 1]);

  return (
    <section 
      ref={containerRef} 
      id="projects-section" 
      className="relative bg-[#030212]"
      style={{ height: isMobile ? 'auto' : '400vh' }}
    >
      {/* Volumetric GPU-Composited background ambient pointer lights (follows mouse coords on desktop) */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, transparent 60%)',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
              opacity: opacity1
            }}
          />
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, transparent 60%)',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
              opacity: opacity2
            }}
          />
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 60%)',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
              opacity: opacity3
            }}
          />
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, transparent 60%)',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
              opacity: opacity4
            }}
          />
        </div>
      )}

      {/* Sticky top exhibition wrapper */}
      <div className={isMobile ? "relative py-20 px-4" : "sticky top-0 h-screen w-full overflow-hidden flex items-center z-10"}>
        
        {/* Dynamic sliding track promoted to dedicated GPU compositor layer */}
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={isMobile ? "flex flex-col gap-24" : "flex h-full w-[400vw] flex-row gpu-accelerated"}
        >

          {/* ═══════════════════════════════════════════════════════
             SCENE 1: GOALFORGE (Cyberpunk Productivity World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20 border-r border-white/[0.02]"}>
            {/* Massive background sticky parallax typography */}
            {!isMobile && (
              <motion.div 
                style={{ x: textX, y: mousePos.y * -0.5 }}
                className="absolute left-0 text-[18rem] font-black select-none pointer-events-none text-outline-watermark opacity-[0.07] tracking-widest leading-none z-0 whitespace-nowrap"
              >
                GOALFORGE OS
              </motion.div>
            )}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Content Panel */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="mono-metadata text-blue-400 font-extrabold tracking-widest text-[0.8rem]">
                  [ 01 // SPRINT_ENGINE ]
                </span>
                <h3 className="text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  GOAL<br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #3b82f6' }}>FORGE</span>
                </h3>
                <span className="text-blue-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[0].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[0].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-blue-400 bg-blue-500/10 py-1 px-3.5 rounded-full border border-blue-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ProjectLink href={projects[0].link} />
                </div>
              </div>

              {/* Interactive 3D Mock-Dashboard blueprint graphic */}
              <div className="lg:col-span-6 flex justify-center items-center h-[350px] md:h-[450px]">
                <motion.div 
                  style={isMobile ? {} : { x: mousePos.x * 0.8, y: mousePos.y * 0.8, rotateX: mousePos.y * -0.2, rotateY: mousePos.x * 0.2 }}
                  className="w-full max-w-md rounded-2xl border border-blue-500/25 bg-blue-500/[0.03] backdrop-blur-[3px] py-8 px-6 flex flex-col justify-between h-[85%] shadow-[0_0_50px_rgba(59,130,246,0.06)] relative overflow-hidden group"
                >
                  <div className="anchor-crosshair" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Telemetry settings header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '10s' }} />
                      <span className="mono-metadata text-blue-400 font-extrabold">
                        [ SYSTEM // GOAL_VELOCITY ]
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-white/30">SUPABASE: ACTIVE</span>
                  </div>

                  {/* Task Roadmap mockup */}
                  <div className="flex flex-col gap-3.5 my-auto">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-blue-950/20 border border-blue-500/15 rounded p-2 flex flex-col justify-between min-h-[75px]">
                        <span className="text-[0.48rem] font-mono text-white/30 uppercase">[ BACKLOG ]</span>
                        <span className="text-[0.56rem] font-mono text-white/80 font-bold truncate">Setup DB Schema</span>
                      </div>
                      
                      <div className="bg-blue-950/20 border border-blue-400/30 rounded p-2 flex flex-col justify-between min-h-[75px]">
                        <span className="text-[0.48rem] font-mono text-blue-300 uppercase">[ DEV_SPEED ]</span>
                        <span className="text-[0.56rem] font-mono text-blue-300 font-bold truncate">Framer Physics</span>
                      </div>

                      <div className="bg-emerald-950/10 border border-emerald-500/25 rounded p-2 flex flex-col justify-between min-h-[75px]">
                        <span className="text-[0.48rem] font-mono text-emerald-400 uppercase">[ COMPLETED ]</span>
                        <span className="text-[0.56rem] font-mono text-emerald-400 font-bold line-through truncate">Vercel Pipeline</span>
                      </div>
                    </div>

                    {/* Progress tracking gauge */}
                    <div className="h-24 w-full rounded border border-white/5 bg-white/[0.01] flex items-center justify-between p-3.5 relative overflow-hidden">
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[0.55rem] font-mono text-blue-400 font-extrabold uppercase">SPRINT_COMPLETION</span>
                        <div className="text-[0.48rem] font-mono text-zinc-500">
                          <div>SPRINT: #04_ACTIVE</div>
                          <div>VELOCITY: +8.4 PTS</div>
                        </div>
                      </div>

                      {/* SVG active circular gauge */}
                      <div className="relative w-14 h-14 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="28" cy="28" r="22" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                          <motion.circle 
                            cx="28" cy="28" r="22" 
                            fill="transparent" stroke="#3b82f6" strokeWidth="4" 
                            strokeDasharray="138" 
                            initial={{ strokeDashoffset: 138 }}
                            whileInView={{ strokeDashoffset: 138 * (1 - 0.84) }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.8, ease: "easeOut" }}
                          />
                        </svg>
                        <span className="absolute text-[0.58rem] font-mono font-bold text-white">84%</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[0.58rem] font-mono">
                    <span className="text-white/40">SYS_INTEGRITY: STABLE</span>
                    <div className="relative w-3 h-3 flex items-center justify-center">
                      <span className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-60" />
                      <span className="relative w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
             SCENE 2: NAIN AUR NAQSH (Luxury Editorial World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20 border-r border-white/[0.02]"}>
            {!isMobile && (
              <motion.div 
                style={{ x: textX, y: mousePos.y * -0.5 }}
                className="absolute left-0 text-[18rem] font-black select-none pointer-events-none text-outline-watermark opacity-[0.07] tracking-widest leading-none z-0 whitespace-nowrap"
              >
                NAIN AUR NAQSH
              </motion.div>
            )}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Content Panel */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="mono-metadata text-purple-400 font-extrabold tracking-widest text-[0.8rem]">
                  [ 02 // VISUAL_CORE ]
                </span>
                <h3 className="text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  NAIN AUR<br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #a855f7' }}>NAQSH</span>
                </h3>
                <span className="text-purple-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[1].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[1].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[1].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-purple-400 bg-purple-500/10 py-1 px-3.5 rounded-full border border-purple-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ProjectLink href={projects[1].link} />
                </div>
              </div>

              {/* Interactive Editorial Typography Swatch card */}
              <div className="lg:col-span-6 flex justify-center items-center h-[350px] md:h-[450px]">
                <motion.div 
                  style={isMobile ? {} : { x: mousePos.x * 0.8, y: mousePos.y * 0.8, rotateX: mousePos.y * -0.2, rotateY: mousePos.x * 0.2 }}
                  className="w-full max-w-md rounded-2xl border border-purple-500/25 bg-purple-500/[0.03] backdrop-blur-[3px] py-8 px-6 flex flex-col justify-between h-[85%] shadow-[0_0_50px_rgba(168,85,247,0.06)] relative overflow-hidden group"
                >
                  <div className="anchor-crosshair" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Header details */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-400" />
                      <span className="mono-metadata text-purple-400 font-extrabold">
                        [ STUDIO // LAYOUT_CORE ]
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-white/30">GSAP: RENDERED</span>
                  </div>

                  {/* Simulated Color palette Swatches */}
                  <div className="flex flex-col gap-3.5 my-auto">
                    <div className="h-28 w-full rounded border border-purple-500/20 bg-purple-500/[0.01] flex flex-col justify-between p-3.5 relative overflow-hidden">
                      <div className="flex justify-between items-center z-10">
                        <span className="text-[0.55rem] font-mono text-purple-300 font-bold uppercase">BRANDING_COLORS</span>
                        <span className="text-[0.48rem] font-mono text-white/30">PALETTE.HEX</span>
                      </div>

                      <div className="flex gap-2.5 justify-center z-10 my-1">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-6 rounded bg-[#ffffff] border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
                          <span className="text-[0.45rem] font-mono text-white/50">#FFFFFF</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-6 rounded bg-[#a855f7] border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.3)]" />
                          <span className="text-[0.45rem] font-mono text-white/50">#A855F7</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-12 h-6 rounded bg-[#030212] border border-white/5" />
                          <span className="text-[0.45rem] font-mono text-white/50">#030212</span>
                        </div>
                      </div>

                      {/* Golden ratio vector sweep overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </svg>
                      </div>

                      <div className="flex justify-between text-[0.48rem] font-mono text-zinc-400 z-10 pt-1 border-t border-white/5">
                        <span>TYPOGRAPHY: SYSTEM_SANS</span>
                        <span className="text-purple-300 font-bold">WEIGHT: 900 (BLACK)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[0.58rem] font-mono">
                    <span className="text-white/40">FOCAL_LENGTH: 85MM</span>
                    <div className="relative w-3 h-3 flex items-center justify-center">
                      <span className="absolute w-2 h-2 bg-purple-500 rounded-full animate-ping opacity-60" />
                      <span className="relative w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
             SCENE 3: RENTIT (Luxury Architectural Space World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20 border-r border-white/[0.02]"}>
            {!isMobile && (
              <motion.div 
                style={{ x: textX, y: mousePos.y * -0.5 }}
                className="absolute left-0 text-[18rem] font-black select-none pointer-events-none text-outline-watermark opacity-[0.07] tracking-widest leading-none z-0 whitespace-nowrap"
              >
                RENTIT PLATFORM
              </motion.div>
            )}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Content Panel */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="mono-metadata text-emerald-400 font-extrabold tracking-widest text-[0.8rem]">
                  [ 03 // GEOGRAPHIC_PROPERTIES ]
                </span>
                <h3 className="text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  RENT<br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #10b981' }}>IT</span>
                </h3>
                <span className="text-emerald-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[2].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[2].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[2].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-emerald-400 bg-emerald-500/10 py-1 px-3.5 rounded-full border border-emerald-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ProjectLink href={projects[2].link} />
                </div>
              </div>

              {/* Interactive property listing filter card */}
              <div className="lg:col-span-6 flex justify-center items-center h-[350px] md:h-[450px]">
                <motion.div 
                  style={isMobile ? {} : { x: mousePos.x * 0.8, y: mousePos.y * 0.8, rotateX: mousePos.y * -0.2, rotateY: mousePos.x * 0.2 }}
                  className="w-full max-w-md rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.03] backdrop-blur-[3px] py-8 px-6 flex flex-col justify-between h-[85%] shadow-[0_0_50px_rgba(16,185,129,0.06)] relative overflow-hidden group"
                >
                  <div className="anchor-crosshair" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Header status details */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span className="mono-metadata text-emerald-400 font-extrabold">
                        [ EXPLORER // PROPERTY_BROWSER ]
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-white/30">DB: CONNECTED</span>
                  </div>

                  {/* Simulated property exploration cards */}
                  <div className="flex flex-col gap-3.5 my-auto">
                    <div className="h-28 w-full rounded border border-emerald-500/20 bg-emerald-500/[0.01] flex flex-col justify-between p-3.5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:18px_18px] opacity-5 pointer-events-none" />
                      
                      <div className="flex justify-between items-center z-10">
                        <span className="text-[0.55rem] font-mono text-emerald-400 font-bold uppercase">SEARCH_FILTERS</span>
                        <span className="text-[0.45rem] font-mono text-white/40">LOC: JAIPUR</span>
                      </div>

                      {/* Property parameters blocks */}
                      <div className="flex justify-between gap-1 z-10 my-1">
                        <div className="bg-emerald-950/25 border border-emerald-500/20 p-1.5 rounded flex-1 text-center">
                          <span className="text-[0.42rem] font-mono text-white/40 block">TYPE</span>
                          <span className="text-[0.58rem] font-mono text-emerald-300 font-bold">Apartment</span>
                        </div>
                        <div className="bg-emerald-950/25 border border-emerald-500/20 p-1.5 rounded flex-1 text-center">
                          <span className="text-[0.42rem] font-mono text-white/40 block">BEDS</span>
                          <span className="text-[0.58rem] font-mono text-emerald-300 font-bold">3 BHK Flat</span>
                        </div>
                        <div className="bg-emerald-950/25 border border-emerald-500/20 p-1.5 rounded flex-1 text-center">
                          <span className="text-[0.42rem] font-mono text-white/40 block">PRICE</span>
                          <span className="text-[0.58rem] font-mono text-emerald-300 font-bold">$2,400 /mo</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[0.48rem] font-mono text-zinc-400 z-10 pt-1 border-t border-white/5">
                        <span>MAP PIN: ⊕ Jaipur North</span>
                        <span className="text-emerald-400 font-bold">AVAILABLE PLOTS: 48</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[0.58rem] font-mono">
                    <span className="text-white/40">RENDER_LATENCY: 5ms</span>
                    <div className="relative w-3 h-3 flex items-center justify-center">
                      <span className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-60" />
                      <span className="relative w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
             SCENE 4: GESTURE CONTROLLED (AI Computer Vision World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20"}>
            {!isMobile && (
              <motion.div 
                style={{ x: textX, y: mousePos.y * -0.5 }}
                className="absolute left-0 text-[18rem] font-black select-none pointer-events-none text-outline-watermark opacity-[0.07] tracking-widest leading-none z-0 whitespace-nowrap"
              >
                GESTURE CONTROL
              </motion.div>
            )}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Content Panel */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="mono-metadata text-orange-400 font-extrabold tracking-widest text-[0.8rem]">
                  [ 04 // AI_CV_SYSTEMS ]
                </span>
                <h3 className="text-white font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  GESTURE<br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #f97316' }}>CONTROL</span>
                </h3>
                <span className="text-orange-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[3].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[3].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[3].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-orange-400 bg-orange-500/10 py-1 px-3.5 rounded-full border border-orange-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <ProjectLink href={projects[3].link} />
                </div>
              </div>

              {/* Interactive CV joint tracking radar card */}
              <div className="lg:col-span-6 flex justify-center items-center h-[350px] md:h-[450px]">
                <motion.div 
                  style={isMobile ? {} : { x: mousePos.x * 0.8, y: mousePos.y * 0.8, rotateX: mousePos.y * -0.2, rotateY: mousePos.x * 0.2 }}
                  className="w-full max-w-md rounded-2xl border border-orange-500/25 bg-orange-500/[0.03] backdrop-blur-[3px] py-8 px-6 flex flex-col justify-between h-[85%] shadow-[0_0_50px_rgba(249,115,22,0.06)] relative overflow-hidden group"
                >
                  <div className="anchor-crosshair" />
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Header telemetry details */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Hand className="w-4 h-4 text-orange-400" />
                      <span className="mono-metadata text-orange-400 font-extrabold">
                        [ CAMERA // MEDIAPIPE_TRACKER ]
                      </span>
                    </div>
                    <span className="text-[0.62rem] font-mono text-white/30">WEBCAM_ACTIVE</span>
                  </div>

                  {/* Hand skeletal joint mapping sweep visualizer */}
                  <div className="flex flex-col gap-3.5 my-auto">
                    <div className="h-28 w-full rounded border border-orange-500/20 bg-orange-500/[0.01] flex flex-col justify-between p-3.5 relative overflow-hidden">
                      {/* Sweeping sonar radar pulsing backdrops */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                        <div className="absolute w-24 h-24 border border-orange-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                        <div className="absolute w-12 h-12 border border-orange-500/15 rounded-full animate-pulse" />
                      </div>

                      {/* Hand tracking skeleton SVG */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
                        <svg className="w-[85%] h-[85%] text-orange-400" viewBox="0 0 100 100">
                          <path d="M 50 85 L 50 65 M 50 65 L 30 45 L 25 25 M 50 65 L 45 40 L 42 18 M 50 65 L 58 40 L 58 15 M 50 65 L 70 45 L 75 25 M 50 65 L 75 70 L 85 60" fill="none" stroke="currentColor" strokeWidth="0.75" />
                          
                          <circle cx="50" cy="85" r="1.5" fill="#f97316" />
                          <circle cx="50" cy="65" r="1.5" fill="#f97316" />
                          <circle cx="30" cy="45" r="1.5" fill="#ffedd5" />
                          <circle cx="25" cy="25" r="1.5" fill="#f97316" />
                          <circle cx="45" cy="40" r="1.5" fill="#ffedd5" />
                          <circle cx="42" cy="18" r="1.5" fill="#f97316" />
                          <circle cx="58" cy="40" r="1.5" fill="#ffedd5" />
                          <circle cx="58" cy="15" r="1.5" fill="#f97316" />
                          <circle cx="70" cy="45" r="1.5" fill="#ffedd5" />
                          <circle cx="75" cy="25" r="1.5" fill="#f97316" />
                        </svg>
                      </div>

                      <div className="flex justify-between items-center z-10">
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
                          <span className="text-[0.55rem] font-mono text-white/80 font-bold uppercase tracking-wider">
                            GESTURE: PINCH_SCROLL
                          </span>
                        </div>
                        <span className="text-[0.5rem] font-mono text-orange-400 bg-orange-500/10 px-1 py-0.5 rounded border border-orange-500/20">
                          CONFIDENCE: 98.7%
                        </span>
                      </div>

                      {/* Websocket stream settings */}
                      <div className="flex justify-between items-center z-10 px-1 pt-1 border-t border-white/5">
                        <span className="text-[0.45rem] font-mono text-zinc-400">CV: OpenCV / websocket</span>
                        <span className="text-orange-400 font-bold text-[0.45rem] font-mono">LATENCY: 8.2ms</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[0.58rem] font-mono">
                    <span className="text-white/40">SYS_TELEMETRY: RUNNING</span>
                    <div className="relative w-3 h-3 flex items-center justify-center">
                      <span className="absolute w-2 h-2 bg-orange-500 rounded-full animate-ping opacity-60" />
                      <span className="relative w-1.5 h-1.5 bg-orange-400 rounded-full" />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
