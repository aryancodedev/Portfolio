import { motion, useScroll, useTransform } from 'motion/react';
import { Mail, Github, Linkedin, MessageCircle, ArrowUpRight, Send } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function Contact() {
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

  const y1 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      url: 'https://github.com/aryancodedev',
      color: 'from-gray-500 to-gray-700',
      hoverColor: 'rgba(156, 163, 175, 0.2)'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/in/aryanthakur2307/',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'rgba(59, 130, 246, 0.2)'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      url: 'https://wa.me/918950918229',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'rgba(34, 197, 94, 0.2)'
    },
    {
      name: 'Email',
      icon: <Mail className="w-6 h-6" />,
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=aryanthakur2307@gmail.com',
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'rgba(168, 85, 247, 0.2)'
    }
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-20 sm:py-32 px-4 sm:px-8 bg-transparent overflow-hidden">
      {/* Ambient effects with parallax (Optimized) */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
        style={isMobile ? {
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)'
        } : {
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
          y: y1
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
        style={isMobile ? {
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)'
        } : {
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
          y: y2
        }}
      />

      {/* Static Scanlines */}
      <motion.div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.1) 0px, transparent 1px, transparent 2px)',
        }}
      />

      {/* Additional static orb */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)' }}
      />

      <motion.div 
        className="relative z-10 max-w-6xl mx-auto w-full" 
        style={isMobile ? { scale: 1 } : { scale }}
      >
        <motion.div
          className="text-center mb-12 sm:mb-20 px-4"
          initial={isMobile ? { opacity: 0, y: 60 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "-50px" : "0px 0px -20px 0px" }}
          transition={isMobile ? { duration: 1, type: "spring", stiffness: 50 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 sm:mb-12 backdrop-blur-xl border border-green-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
            }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(16, 185, 129, 0.2)',
                '0 0 40px rgba(16, 185, 129, 0.3)',
                '0 0 20px rgba(16, 185, 129, 0.2)',
              ]
            }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-green-400"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-green-200 tracking-wider uppercase text-[0.7rem] sm:text-[0.75rem]" style={{ letterSpacing: '0.15em' }}>
              Available for Projects
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="mb-6 sm:mb-8 tracking-tight"
            style={{
              fontSize: 'clamp(2.2rem, 9vw, 8rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={isMobile ? { opacity: 0, scale: 0.8, rotateX: 20 } : { opacity: 0, scale: 0.98, y: 15 }}
            whileInView={isMobile ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? { duration: 1.2, delay: 0.2 } : { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            LET'S CREATE
            <br />
            SOMETHING EPIC
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-[0.95rem] sm:text-[1.1rem] md:text-[1.4rem]"
            style={{ fontWeight: 300 }}
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={isMobile ? { delay: 0.4 } : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Have an ambitious project in mind? Let's build the future together.
          </motion.p>
        </motion.div>

        {/* Contact card */}
        <motion.div
          className="max-w-3xl mx-auto mb-16 px-2 sm:px-0"
          initial={isMobile ? { opacity: 0, y: 60, scale: 0.95 } : { opacity: 0, y: 20, scale: 0.99 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -25px 0px" }}
          transition={isMobile ? { duration: 1, delay: 0.3, type: "spring", stiffness: 50 } : { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative p-6 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl overflow-hidden">
            {/* Static background */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.3), transparent 70%)'
              }}
            />

            {/* Static Grid overlay */}
            <motion.div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }}
            />

            <div className="relative">
              {/* Email CTA */}
              <motion.a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aryanthakur2307@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/email block mb-8"
                initial={isMobile ? { opacity: 0, x: -30 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={isMobile ? { duration: 0.8, delay: 0.5 } : { duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={isMobile ? {} : { scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 sm:p-8 gap-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover/email:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                    <motion.div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0"
                      whileHover={isMobile ? {} : { rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-gray-400 mb-1 text-[0.8rem] sm:text-[0.85rem]">
                        Primary Contact
                      </p>
                      <p className="text-white break-all sm:break-normal" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', fontWeight: 600 }}>
                        aryanthakur2307@gmail.com
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="absolute top-6 right-6 sm:relative sm:top-auto sm:right-auto w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover/email:translate-x-1 group-hover/email:-translate-y-1 transition-transform shrink-0" />
                </div>
              </motion.a>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="text-gray-500 uppercase tracking-wider text-[0.7rem] sm:text-[0.75rem]">or connect via</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Social links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative"
                    initial={isMobile ? { opacity: 0, y: 30, rotateX: 20 } : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? {
                      delay: 0.05,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    } : {
                      delay: 0.4 + index * 0.08,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={isMobile ? { scale: 1.01 } : { scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="relative p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col items-center gap-2 sm:gap-3 overflow-hidden">
                      {/* Hover glow (disabled on mobile) */}
                      {!isMobile && (
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover/social:opacity-100"
                          style={{ backgroundColor: link.hoverColor }}
                          transition={{ duration: 0.3 }}
                        />
                      )}

                      {/* Icon */}
                      <motion.div
                        className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center shrink-0`}
                        whileHover={isMobile ? {} : { rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="text-white scale-75 sm:scale-100 flex items-center justify-center">
                          {link.icon}
                        </div>
                      </motion.div>

                      {/* Name */}
                      <span className="relative text-gray-300 group-hover/social:text-white transition-colors text-[0.8rem] sm:text-[0.9rem] font-medium">
                        {link.name}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center"
          initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "0px 0px -10px 0px" }}
          transition={isMobile ? { delay: 0.6, duration: 0.8 } : { duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm max-w-full">
            <motion.div
              className="w-2 h-2 rounded-full bg-blue-400 shrink-0"
              animate={{
                opacity: [1, 0.3, 1],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="text-gray-500 text-[0.75rem] sm:text-[0.85rem] leading-normal text-left sm:text-center">
              © 2026 Aryan Thakur. Crafted with precision.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
