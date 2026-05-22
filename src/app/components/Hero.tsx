import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronDown, FileText, ArrowUpRight } from 'lucide-react';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
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

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Glowing badge */}
          <motion.button
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[4]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-12 backdrop-blur-xl border border-blue-500/20 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
              boxShadow: '0 0 30px rgba(96, 165, 250, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.05)'
            }}
            animate={{
              boxShadow: [
                '0 0 30px rgba(96, 165, 250, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.05)',
                '0 0 50px rgba(96, 165, 250, 0.3), inset 0 0 40px rgba(96, 165, 250, 0.08)',
                '0 0 30px rgba(96, 165, 250, 0.2), inset 0 0 30px rgba(96, 165, 250, 0.05)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-200 tracking-wider uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
              Available for opportunities
            </span>
          </motion.button>

          {/* Main title */}
          <motion.h1
            className="mb-8 tracking-tight"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              fontWeight: 800,
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 80px rgba(96, 165, 250, 0.3)'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            ARYAN THAKUR
          </motion.h1>

          {/* Role badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {['FULL STACK DEVELOPER', 'FRONTEND ENGINEER', 'CREATIVE TECHNOLOGIST'].map((role, i) => (
              <motion.div
                key={role}
                className="px-6 py-3 rounded-lg backdrop-blur-sm border border-white/10"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  fontSize: 'clamp(0.7rem, 1.5vw, 0.95rem)',
                  letterSpacing: '0.1em',
                  fontWeight: 600
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: 'rgba(96, 165, 250, 0.5)',
                  boxShadow: '0 0 30px rgba(96, 165, 250, 0.3)'
                }}
              >
                <span className="text-blue-100">{role}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="max-w-3xl mx-auto text-gray-300 leading-relaxed mb-12"
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              fontWeight: 300,
              letterSpacing: '0.02em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            "Building immersive digital products, intelligent systems, and futuristic web experiences through modern engineering."
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 [@media(max-height:700px)]:hidden"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-blue-300 tracking-widest uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}>
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-blue-400" />
        </motion.div>
      </motion.div>

      {/* Static Grid overlay for performance */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }}
      />
    </section>
  );
}
