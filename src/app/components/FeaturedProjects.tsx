import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowUpRight, Target, Palette, MapPin, Hand } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────── 
   Project Data — Upgraded with Real-World Specifications
   ─────────────────────────────────────────────────────── */
const projects = [
  {
    title: 'PREMIUM CLIENT PORTFOLIO',
    tagline: 'CUSTOM PROFESSIONAL WEB ARCHITECTURE',
    description: 'Designed and developed a custom portfolio website for a client with a strong focus on premium UI, fluid animations, responsive layouts, and a modern visual identity. The project emphasizes performance, clean interactions, and a polished browsing experience while delivering a fully customized personal brand presence.',
    tags: ['Next.js', 'React', 'Framer Motion', 'Tailwind CSS', 'Javascript'],
    accent: '#38bdf8',
    accentRgb: '58, 189, 248',
    link: 'https://mudgal-portfolio.vercel.app/',
    image: '/PremiumPortfolio_thumb.png',
    highlights: [
      'Custom UI/UX Design',
      'Responsive Across All Devices',
      'Premium Animations & Transitions',
      'Performance Optimized',
      'Modern Frontend Development',
      'Clean Information Architecture',
      'Production-Ready Deployment'
    ]
  },
  {
    title: 'NAIN AUR NAQSH',
    tagline: 'LUXURY BRAND & DESIGN STUDIO',
    description: 'A luxury brand and creative web studio platform featuring kinetic typography reveals, interactive image reveal slides, and polished motion details.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    accent: '#a855f7',
    accentRgb: '168, 85, 247',
    link: 'https://nain-aur-naqsh.vercel.app/',
    image: '/NainAurNaqsh_thumb.png',
  },
  {
    title: 'GESTURE CONTROLLED',
    tagline: 'AI COMPUTER VISION INTERACTION',
    description: 'An AI-powered system utilizing computer vision hand-tracking keypoint skeletons to control web browsers and execute scrolling, zooming, or clicking gestures.',
    tags: ['Python', 'MediaPipe HandLandmarker', 'OpenCV', 'WebSocket'],
    accent: '#f97316',
    accentRgb: '249, 115, 22',
    link: 'https://drive.google.com/file/d/1ijalBnEyO086epHgDg2v50sDJTjRiHA2/view?usp=sharing',
    image: '',
  },
  {
    title: 'RENTIT',
    tagline: 'RESPONSIVE REAL-ESTATE PLATFORM',
    description: 'A responsive real-estate listing search engine designed for property exploration, structured listing browsing, pricing trackers, and clean maps listings.',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'MongoDB', 'Express.js'],
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    link: 'https://rent-it-fit.vercel.app/',
    image: '/RentIt_thumb.png',
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
   Browser Preview Component
   ─────────────────────────────────────────────────────── */
function BrowserPreview({ src, href, title, accentRgb, objectLeft }: { src?: string, href: string, title: string, accentRgb: string, objectLeft?: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block w-full max-w-2xl rounded-xl border bg-[#0a0a0a] overflow-hidden group cursor-pointer"
      style={{
        borderColor: `rgba(${accentRgb}, 0.2)`,
        boxShadow: `0 20px 50px rgba(${accentRgb}, 0.05)`,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95, rotateX: 5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: `0 30px 60px rgba(${accentRgb}, 0.15)`,
        borderColor: `rgba(${accentRgb}, 0.4)`
      }}
    >
      {/* Browser Bar */}
      <div className="h-8 border-b bg-white/[0.02] flex items-center px-4 gap-2" style={{ borderColor: `rgba(${accentRgb}, 0.1)` }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-red-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-yellow-500/80 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/20 group-hover:bg-green-500/80 transition-colors" />
        </div>
        <div className="mx-auto bg-white/5 rounded-md px-3 py-0.5 text-[0.6rem] font-mono text-white/40 max-w-[200px] truncate">
          {href.replace(/^https?:\/\//, '').split('/')[0]}
        </div>
      </div>

      {/* Preview Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        {src ? (
          <img
            src={src}
            alt={`${title} preview`}
            className={`w-full h-full object-cover ${objectLeft ? 'object-left' : 'object-center'} transition-all duration-700 group-hover:brightness-110 group-hover:scale-105`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-4 relative overflow-hidden transition-all duration-700 group-hover:scale-105">
            <div className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50" style={{ background: `radial-gradient(circle at center, rgba(${accentRgb}, 0.4) 0%, transparent 70%)` }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border flex items-center justify-center shadow-lg" style={{ borderColor: `rgba(${accentRgb}, 0.4)`, backgroundColor: `rgba(${accentRgb}, 0.1)` }}>
                <svg className="w-5 h-5 ml-1" style={{ color: `rgb(${accentRgb})` }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs tracking-widest font-mono font-bold" style={{ color: `rgba(${accentRgb}, 0.9)` }}>
                  [ PROJECT_DEMO ]
                </span>
                <span className="text-[0.6rem] font-mono text-white/40">AI_CV_SYSTEMS // OFFLINE_RECORDING</span>
              </div>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <div className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
            {src ? 'View Live Website' : 'Watch Demo Video'} <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
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
      className="relative bg-transparent"
      style={{ height: isMobile ? 'auto' : '400vh' }}
    >
      {/* Volumetric GPU-Composited background ambient pointer lights (follows mouse coords on desktop) */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, rgba(58, 189, 248, 0.16) 0%, transparent 60%)',
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
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.16) 0%, transparent 60%)',
              x: mousePos.x * 1.5,
              y: mousePos.y * 1.5,
              opacity: opacity3
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.16) 0%, transparent 60%)',
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
             SCENE 1: PREMIUM CLIENT PORTFOLIO (Real Client Work)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20 border-r border-white/[0.02]"}>
            {!isMobile && (
              <motion.div
                style={{ x: textX, y: mousePos.y * -0.5 }}
                className="absolute left-0 text-[18rem] font-black select-none pointer-events-none text-outline-watermark opacity-[0.07] tracking-widest leading-none z-0 whitespace-nowrap"
              >
                CLIENT PORTFOLIO
              </motion.div>
            )}

            <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Content Panel - Styled for extra visual prominence */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="mono-metadata text-sky-400 font-extrabold tracking-widest text-[0.8rem]">
                  [ 01 // FEATURED_CLIENT_WORK ]
                </span>
                <h3 className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  <span style={{
                    background: '#fcfcfc',
                    backgroundImage: 'linear-gradient(90deg, rgba(252, 252, 252, 1) 0%, rgba(186, 230, 253, 1) 33%, rgba(125, 211, 252, 1) 58%, rgba(56, 189, 248, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    PREMIUM
                  </span>
                  <br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #38bdf8' }}>PORTFOLIO</span>
                </h3>
                <span className="text-sky-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[0].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.05rem] max-w-xl">
                  {projects[0].description}
                </p>

                {/* Highlights List - specific visual prominence element */}
                <div className="flex flex-col gap-2.5 mt-2 bg-white/[0.02] border border-white/5 rounded-xl p-4 backdrop-blur-[2px]">
                  <span className="text-[0.7rem] uppercase tracking-widest text-sky-400 font-bold font-mono">
                    Project Highlights
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-zinc-400 font-light">
                    {projects[0].highlights?.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                  {projects[0].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-sky-400 bg-sky-500/10 py-1 px-3.5 rounded-full border border-sky-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Browser Preview - styled larger/wider */}
              <div className="lg:col-span-7 flex justify-center items-center w-full">
                <BrowserPreview
                  src={projects[0].image}
                  href={projects[0].link}
                  title={projects[0].title}
                  accentRgb={projects[0].accentRgb}
                />
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
                <h3 className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  <span style={{
                    background: '#fcfcfc',
                    backgroundImage: 'linear-gradient(90deg,rgba(252, 252, 252, 1) 0%, rgba(222, 192, 250, 1) 33%, rgba(212, 173, 249, 1) 58%, rgba(168, 85, 247, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    NAIN AUR
                  </span>
                  <br />
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

              </div>

              {/* Interactive Browser Preview */}
              <div className="lg:col-span-6 flex justify-center items-center w-full">
                <BrowserPreview
                  src={projects[1].image}
                  href={projects[1].link}
                  title={projects[1].title}
                  accentRgb={projects[1].accentRgb}
                />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
             SCENE 3: GESTURE CONTROLLED (AI Computer Vision World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20 border-r border-white/[0.02]"}>
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
                  [ 03 // AI_CV_SYSTEMS ]
                </span>
                <h3 className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  <span style={{
                    background: '#fcfcfc',
                    backgroundImage: 'linear-gradient(90deg,rgba(252, 252, 252, 1) 0%, rgba(251, 207, 177, 1) 35%, rgba(250, 158, 95, 1) 71%, rgba(249, 115, 22, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    GESTURE
                  </span>
                  <br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #f97316' }}>CONTROL</span>
                </h3>
                <span className="text-orange-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[2].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[2].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[2].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-orange-400 bg-orange-500/10 py-1 px-3.5 rounded-full border border-orange-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Interactive Browser Preview */}
              <div className="lg:col-span-6 flex justify-center items-center w-full">
                <BrowserPreview
                  src={projects[2].image}
                  href={projects[2].link}
                  title={projects[2].title}
                  accentRgb={projects[2].accentRgb}
                />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════
             SCENE 4: RENTIT (Luxury Architectural Space World)
             ═══════════════════════════════════════════════════════ */}
          <div className={isMobile ? "w-full" : "w-screen h-full flex-shrink-0 flex items-center justify-center relative overflow-hidden px-8 lg:px-20"}>
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
                  [ 04 // GEOGRAPHIC_PROPERTIES ]
                </span>
                <h3 className="font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 6.5rem)' }}>
                  <span style={{
                    background: '#fcfcfc',
                    backgroundImage: 'linear-gradient(90deg, rgba(252, 252, 252, 1) 0%, rgba(112, 255, 207, 1) 35%, rgba(79, 247, 191, 1) 86%, rgba(11, 224, 153, 1) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                  }}>
                    RENT
                  </span>
                  <br />
                  <span className="text-outline-watermark" style={{ WebkitTextStroke: '2px #10b981' }}>IT</span>
                </h3>
                <span className="text-emerald-300 font-mono text-[0.72rem] tracking-wider font-bold">
                  {projects[3].tagline}
                </span>
                <p className="text-zinc-300 leading-relaxed font-light text-[0.95rem] md:text-[1.1rem] max-w-xl">
                  {projects[3].description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {projects[3].tags.map(tag => (
                    <span key={tag} className="text-[0.68rem] font-mono font-bold text-emerald-400 bg-emerald-500/10 py-1 px-3.5 rounded-full border border-emerald-500/20">
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Interactive Browser Preview */}
              <div className="lg:col-span-6 flex justify-center items-center w-full">
                <BrowserPreview
                  src={projects[3].image}
                  href={projects[3].link}
                  title={projects[3].title}
                  accentRgb={projects[3].accentRgb}
                />
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
