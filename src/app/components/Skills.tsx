import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export function Skills() {
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

  const skillCategories = [
    {
      category: 'Frontend',
      accent: '#3b82f6',
      accentRgb: '59, 130, 246',
      skills: ['React', 'TypeScript', 'Next.js', 'Motion', 'Tailwind CSS', 'WebGL']
    },
    {
      category: 'Backend',
      accent: '#a855f7',
      accentRgb: '168, 85, 247',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs']
    },
    {
      category: 'DevOps',
      accent: '#f97316',
      accentRgb: '249, 115, 22',
      skills: ['Docker', 'AWS', 'CI/CD', 'Vercel', 'Git', 'Linux']
    },
    {
      category: 'Creative',
      accent: '#10b981',
      accentRgb: '16, 185, 129',
      skills: ['GSAP', 'Three.js', 'WebXR', 'Canvas API', 'SVG Animation', 'Shaders']
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 px-4 sm:px-8 bg-transparent overflow-hidden">
      {/* Ambient orbs — subtle, no grid pattern */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-2 sm:px-6 lg:px-16">
        {/* ── Header — editorial label + massive heading ── */}
        <motion.div
          className="mb-16 sm:mb-24"
          initial={isMobile ? { opacity: 0, y: 50 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "-50px" : "0px 0px -20px 0px" }}
          transition={isMobile ? { duration: 1 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Section label */}
          <motion.div
            className="section-label mb-8 sm:mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-8 sm:w-12 h-[1px] bg-white/20" />
            <span className="text-white/40 tracking-widest uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.2em' }}>
              Capabilities
            </span>
          </motion.div>

          {/* Massive heading */}
          <motion.h2
            className="tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1,
              color: '#ffffff'
            }}
            initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, y: 20, scale: 0.98 }}
            whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 0.8, delay: 0.1 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            TECH STACK
          </motion.h2>
        </motion.div>

        {/* ── Skill categories — premium digital kinetic marquees ── */}
        <div className="relative tech-bands cinematic-spotlight">
          {/* Top structural guideline */}
          <div className="editorial-guideline-x" />

          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              className="relative tech-band skills-active-band group py-8 lg:py-10"
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-60px" : "0px 0px -25px 0px" }}
              transition={{ duration: 0.8, delay: isMobile ? 0.05 : catIndex * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Corner structural intersection crosshairs */}
              {!isMobile && <div className="anchor-crosshair" />}

              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 px-4 sm:px-8">
                
                {/* Monospace Code + Category Name Left Panel */}
                <div className="shrink-0 lg:w-[260px] xl:w-[300px] flex flex-col gap-1 z-10 bg-[#030212]/80 backdrop-blur-[2px] pr-4">
                  <span className="mono-metadata text-zinc-500 font-medium block">
                    [ LAYER_0{catIndex + 1} // {category.category.toUpperCase()}_ENGINE ]
                  </span>
                  <h3
                    className="font-black tracking-tighter transition-colors duration-300"
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      color: category.accent,
                      lineHeight: 1.15
                    }}
                  >
                    {category.category}
                  </h3>
                </div>

                {/* Skills Infinite Scrolling Marquee Track */}
                <div className="flex-1 overflow-hidden relative py-2 select-none">
                  {/* Vignette fade bounds on sides */}
                  <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#030212] to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#030212] to-transparent z-10 pointer-events-none" />
                  
                  <div className={`flex gap-12 whitespace-nowrap ${catIndex % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
                    {/* Render thrice to guarantee gapless scrolling on ultra-wide screens */}
                    {[...category.skills, ...category.skills, ...category.skills].map((skill, skillIndex) => (
                      <div key={`${skill}-${skillIndex}`} className="flex items-center gap-12 whitespace-nowrap">
                        <motion.span
                          className="tech-skill font-black text-zinc-100/35 group-hover:text-zinc-100/70 transition-colors duration-500 uppercase tracking-widest text-[1.1rem] sm:text-[1.3rem] block cursor-pointer"
                          whileHover={{ scale: 1.1, color: category.accent }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        >
                          {skill}
                        </motion.span>
                        <span className="text-white/10 text-xs select-none">/</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Intersecting horizontal guidelines */}
              <div className="editorial-guideline-x mt-8 lg:mt-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
