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

  const gridY = useTransform(scrollYProgress, [0, 1], ['0px', '60px']);

  const skillCategories = [
    {
      category: 'Frontend',
      color: 'from-blue-500 to-cyan-500',
      skills: ['React', 'TypeScript', 'Next.js', 'Motion', 'Tailwind CSS', 'WebGL']
    },
    {
      category: 'Backend',
      color: 'from-purple-500 to-pink-500',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs']
    },
    {
      category: 'DevOps',
      color: 'from-orange-500 to-red-500',
      skills: ['Docker', 'AWS', 'CI/CD', 'Vercel', 'Git', 'Linux']
    },
    {
      category: 'Creative',
      color: 'from-green-500 to-emerald-500',
      skills: ['GSAP', 'Three.js', 'WebXR', 'Canvas API', 'SVG Animation', 'Shaders']
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-32 px-4 sm:px-8 bg-transparent overflow-hidden">
      {/* Animated grid background with scroll parallax (disabled on mobile) */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={isMobile ? {
          backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        } : {
          backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          y: gridY
        }}
      />

      {/* Static glowing orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl"
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-24 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-6 sm:mb-8 backdrop-blur-xl border border-emerald-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-200 tracking-wider uppercase text-[0.7rem] sm:text-[0.75rem]" style={{ letterSpacing: '0.15em' }}>
              Tech Stack
            </span>
          </motion.div>

          <motion.h2
            className="mb-4 sm:mb-6 tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #10b981 0%, #60a5fa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, rotateX: 45 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            CAPABILITIES
          </motion.h2>

          <p 
            className="text-gray-400 max-w-2xl mx-auto text-[0.95rem] sm:text-[1.1rem] md:text-[1.25rem]"
          >
            Modern technologies powering next-generation experiences
          </p>
        </motion.div>

        {/* Skills modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-2 sm:px-0">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: isMobile ? 0.05 : catIndex * 0.15 }}
            >
              {/* Card container */}
              <div className="relative h-full rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 overflow-hidden">
                {/* Animated gradient overlay (disabled on mobile) */}
                {!isMobile && (
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br ${category.color}`}
                    transition={{ duration: 0.5 }}
                  />
                )}

                {/* Glow effect (disabled on mobile) */}
                {!isMobile && (
                  <motion.div
                    className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${category.color} blur-[60px] opacity-0 group-hover:opacity-30`}
                    transition={{ duration: 0.7 }}
                  />
                )}

                {/* Content */}
                <div className="relative">
                  {/* Category header */}
                  <div className="mb-6">
                    <motion.div
                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${category.color} mb-4`}
                      whileHover={isMobile ? {} : { scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-white uppercase tracking-wider" style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        {category.category}
                      </span>
                    </motion.div>

                    <div className={`h-1 w-16 bg-gradient-to-r ${category.color} rounded-full`} />
                  </div>

                  {/* Skills list */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        className="group/skill relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: isMobile ? 0.02 : catIndex * 0.15 + skillIndex * 0.05 }}
                      >
                        <motion.div
                          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                          whileHover={isMobile ? {} : { 
                            x: 10,
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)'
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Skill indicator */}
                          <motion.div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: skillIndex * 0.2
                            }}
                          />

                          {/* Skill name */}
                          <span className="text-gray-300 group-hover/skill:text-white transition-colors text-[0.9rem] sm:text-[0.95rem]">
                            {skill}
                          </span>

                          {/* Hover line (disabled on mobile) */}
                          {!isMobile && (
                            <motion.div
                              className={`ml-auto h-0.5 w-0 group-hover/skill:w-8 bg-gradient-to-r ${category.color} rounded-full`}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent (disabled on mobile) */}
                {!isMobile && (
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>

              {/* External glow (disabled on mobile) */}
              {!isMobile && (
                <motion.div
                  className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${category.color} blur-xl opacity-0 group-hover:opacity-20`}
                  transition={{ duration: 0.7 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-12 sm:mt-16 text-center px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm max-w-full">
            <motion.div
              className="flex gap-1 shrink-0"
              animate={{
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blue-400"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </motion.div>
            <span className="text-gray-400 text-[0.8rem] sm:text-[0.9rem] leading-snug text-left sm:text-center">
              Constantly learning and adapting to emerging technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
