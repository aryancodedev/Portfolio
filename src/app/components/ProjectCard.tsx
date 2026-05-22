import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  icon: React.ReactNode;
  index: number;
  link: string;
}

export function ProjectCard({ title, description, tags, gradient, icon, index, link }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  const cardVariants = {
    initial: isMobile 
      ? { opacity: 0, y: 80, rotateX: 10 } 
      : { opacity: 0, y: 25 },
    animate: isMobile 
      ? { opacity: 1, y: 0, rotateX: 0 } 
      : { opacity: 1, y: 0 },
  };

  const cardViewport = {
    once: true,
    margin: isMobile ? "-100px" : "0px 0px -20px 0px"
  };

  const cardTransition = {
    duration: isMobile ? 0.8 : 1.0,
    delay: isMobile ? 0.05 : index * 0.12,
    ...(isMobile ? { type: "spring", stiffness: 60 } : { ease: [0.16, 1, 0.3, 1] })
  };

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      ref={cardRef as any}
      className="relative group cursor-pointer block"
      initial="initial"
      whileInView="animate"
      viewport={cardViewport}
      transition={cardTransition}
      variants={cardVariants}
      whileHover={isMobile ? { scale: 1.01 } : { scale: 1.02, rotateY: 2 }}
      style={isMobile ? {} : { y, rotateY }}
    >
      {/* Main card */}
      <div className="relative h-[460px] sm:h-[520px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10">
        {/* Static gradient background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{ background: gradient }}
        />

        {/* Glassmorphic overlay */}
        <div className="absolute inset-0 backdrop-blur-xl bg-black/40" />

        {/* Static Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />

        {/* Glow effect on hover */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${gradient.split(',')[0].replace('linear-gradient(135deg', '').trim()}, transparent 70%)`,
              filter: 'blur(60px)'
            }}
          />
        )}

        {/* Content */}
        <div className="relative h-full p-6 sm:p-8 md:p-12 flex flex-col justify-between">
          {/* Icon */}
          <motion.div
            className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={isMobile ? {} : { scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="scale-75 sm:scale-100 flex items-center justify-center">
              {icon}
            </div>
          </motion.div>

          <div>
            {/* Title */}
            <motion.h3
              className="mb-3 sm:mb-6 tracking-tight"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: '#ffffff'
              }}
            >
              {title}
            </motion.h3>

            {/* Description */}
            <p
              className="mb-4 sm:mb-8 text-gray-300 leading-relaxed max-w-xl text-[0.9rem] sm:text-[1.05rem] md:text-[1.2rem]"
            >
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-full backdrop-blur-sm border border-white/10 text-blue-200 text-[0.75rem] sm:text-[0.85rem]"
                  style={{
                    background: 'rgba(96, 165, 250, 0.1)',
                    letterSpacing: '0.05em'
                  }}
                  initial={isMobile ? { opacity: 0, scale: 0.8 } : { opacity: 0, y: 8 }}
                  whileInView={isMobile ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -20px 0px" }}
                  transition={
                    isMobile 
                      ? { delay: 0.02 } 
                      : { duration: 0.6, delay: index * 0.12 + i * 0.03, ease: [0.16, 1, 0.3, 1] }
                  }
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="group/btn inline-flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-white/20 backdrop-blur-sm overflow-hidden relative cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.05)' }}
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative text-white tracking-wide text-[0.85rem] sm:text-[0.95rem]">
                View Project
              </span>
              <ArrowUpRight className="relative w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </motion.div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 opacity-20 pointer-events-none">
          <motion.div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at top right, ${gradient.split(',')[1]?.trim() || 'rgba(168, 85, 247, 0.4)'}, transparent 70%)`
            }}
          />
        </div>
      </div>

      {/* Floating sparkle on hover (Disabled on mobile) */}
      {!isMobile && (
        <motion.div
          className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-8 h-8 text-blue-400" />
        </motion.div>
      )}
    </motion.a>
  );
}
