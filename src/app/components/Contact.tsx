import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────── 
   Helper Component — React Magnetic Cursor Hover Pull
   ─────────────────────────────────────────────────────── */
function MagneticElement({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull radius: 120px
    const radius = 120;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < radius) {
      // Smoothly attract towards cursor coordinates (up to 30px)
      const strength = 0.32;
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── 
   MAIN EXPORT — Cinematic Gen-Z Contact Finale
   ─────────────────────────────────────────────────────── */
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

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/aryancodedev',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aryanthakur2307/',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/918950918229',
    },
  ];

  return (
    <section ref={sectionRef} id="contact-section" className="relative min-h-screen flex items-center py-20 sm:py-32 px-4 sm:px-8 bg-transparent overflow-hidden">
      
      {/* Cinematic slowly moving infinite background marquee */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 flex items-center select-none opacity-[0.035]">
          <div className="animate-marquee-left flex whitespace-nowrap text-[12rem] font-black text-outline-watermark tracking-widest uppercase">
            CREATE // CONNECT // TRANSMIT // BUILD // FUTURE // CREATE // CONNECT // TRANSMIT // BUILD // FUTURE // 
          </div>
        </div>
      )}

      {/* Ambient glowing radial light orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0"
        style={isMobile ? {
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)'
        } : {
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%)',
          y: y1
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none z-0"
        style={isMobile ? {
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)'
        } : {
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
          y: y2
        }}
      />
      
      {/* Rotating credit compass watermark */}
      {!isMobile && (
        <motion.div
          className="absolute text-outline-watermark text-[25rem] opacity-[0.12] -bottom-24 -right-24 -z-10 pointer-events-none select-none"
          style={{
            fontFamily: 'monospace',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.01)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          ⊕
        </motion.div>
      )}

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-2 sm:px-6 lg:px-16 cinematic-spotlight">

        {/* Double widescreen frame top bar */}
        {!isMobile && (
          <div className="space-y-1 mb-16">
            <div className="editorial-guideline-x" />
            <div className="editorial-guideline-x opacity-30" />
          </div>
        )}

        {/* Section label */}
        <motion.div
          className="section-label mb-8 sm:mb-12"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w-8 sm:w-12 h-[1px] bg-white/20" />
          <span className="mono-metadata text-purple-400 font-semibold" style={{ letterSpacing: '0.25em' }}>
            [ SECTION // OFFLINE_CREDITS ]
          </span>
        </motion.div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column — Large CTA Title + Meta Block */}
          <div className="lg:col-span-6 w-full flex flex-col justify-between min-h-[350px]">
            <div>
              {/* Asymmetrical Layered Kinetic Typography Headline */}
              <motion.h2
                className="mb-8 tracking-tight flex flex-col items-start select-none z-10"
                initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-black text-white leading-none text-[clamp(2.5rem,5.5vw,4.8rem)]">
                  LET'S
                </span>
                
                <span 
                  className="text-outline-watermark leading-none font-black text-[clamp(2.5rem,5.5vw,4.8rem)] my-2"
                  style={{ 
                    WebkitTextStroke: '2px #3b82f6', 
                    textShadow: '0 0 35px rgba(59,130,246,0.15)',
                    letterSpacing: '0.04em'
                  }}
                >
                  CREATE
                </span>

                <span className="font-light italic text-zinc-400 leading-none text-[clamp(1.8rem,4.2vw,3.6rem)] font-serif pl-6 relative">
                  something
                </span>

                <span 
                  className="font-black text-white leading-none text-[clamp(2rem,4.2vw,3.6rem)] mt-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.15)] tracking-tighter"
                >
                  EXTRAORDINARY
                </span>
              </motion.h2>

              <motion.p
                className="text-zinc-300 leading-relaxed font-light mb-12 max-w-md"
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
                initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                Have an ambitious project, creative endeavor, or complex integration in mind? Let's construct the future together.
              </motion.p>
            </div>

            {/* Bottom-left monospaced tech metadata stack (PRESERVED EXACTLY UNTOUCHED) */}
            {!isMobile && (
              <motion.div
                className="mono-metadata space-y-2 border-l border-white/5 pl-4 text-xs pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div>[ LOC: JAIPUR, INDIA ]</div>
                <div>[ TIMEZONE: GMT+5:30 // CURRENT ]</div>
                <div>[ INBOX_FREQ: GENERALLY &lt; 24HR ]</div>
                <div>[ AVAILABILITY: CORE_OPEN ]</div>
              </motion.div>
            )}
          </div>

          {/* Right Column — Magnetic Interactive Contact options */}
          <div className="lg:col-span-6 w-full space-y-12 sm:space-y-16">

            {/* Direct Email Transmission Block (Magnetic & Glow interactive Swatch) */}
            <motion.div
              className="relative py-8 border-b border-white/[0.04] group/email"
              initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {!isMobile && <div className="anchor-crosshair pointer-events-none" />}

              <p className="mono-metadata text-blue-400 font-extrabold mb-5 tracking-widest">
                [ DIRECT_TRANSMISSION // ACTIVE_SECURE ]
              </p>

              <MagneticElement>
                <motion.a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aryanthakur2307@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="email-oversized group/link inline-flex flex-col gap-2 py-3.5 px-6 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:bg-blue-500/[0.04] hover:border-blue-500/30 shadow-[0_0_30px_rgba(255,255,255,0.01)] hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-all duration-500 relative"
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(59,130,246,0.04)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none" />

                  <div className="flex items-center gap-4 relative z-10">
                    <span
                      className="text-white group-hover/link:text-blue-400 transition-colors duration-500 break-all font-light"
                      style={{
                        fontSize: 'clamp(1.1rem, 2.4vw, 2rem)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                      }}
                    >
                      aryanthakur2307@gmail.com
                    </span>
                    <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 text-white/30 group-hover/link:text-blue-400 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300 shrink-0" />
                  </div>

                  {/* Telemetry specs reveal on hover */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/[0.03] text-[0.62rem] font-mono text-zinc-500 z-10 group-hover/email:text-zinc-300 transition-colors duration-300">
                    <span>[ ADDR: MAIL_TO ]</span>
                    <span className="text-blue-400/80 font-bold opacity-0 group-hover/email:opacity-100 transition-opacity duration-500">
                      [ PROTOCOL: IMAP_SECURE ]
                    </span>
                  </div>
                </motion.a>
              </MagneticElement>
            </motion.div>

            {/* Social Links Connectivity (Magnetic inline blocks) */}
            <motion.div
              className="relative py-8"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mono-metadata text-purple-400 font-extrabold mb-8 tracking-widest">
                [ DUPLEX_CONNECTIVITY // NODES ]
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-0">
                {socialLinks.map((link, index) => {
                  const addresses = ['GITHUB.COM/ARYAN', 'LINKEDIN.COM/IN/ARYAN', 'WA.ME/ARYAN'];
                  const pathText = addresses[index];

                  return (
                    <span key={link.name} className="flex items-center group/social-span">
                      <MagneticElement>
                        <motion.a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social inline-flex flex-col gap-1.5 py-2.5 px-4 rounded-xl border border-white/[0.03] bg-white/[0.005] hover:bg-purple-500/[0.04] hover:border-purple-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="text-zinc-100 group-hover/social:text-purple-400 transition-colors duration-300 font-bold"
                              style={{
                                fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                                letterSpacing: '0.04em'
                              }}
                            >
                              {link.name}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-white/20 group-hover/social:text-purple-400 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-all duration-300" />
                          </div>
                          
                          <span className="text-[0.52rem] font-mono text-zinc-600 block opacity-40 group-hover/social:opacity-100 group-hover/social:text-purple-300/80 transition-all duration-300">
                            {pathText}
                          </span>
                        </motion.a>
                      </MagneticElement>
                      {index < socialLinks.length - 1 && (
                        <span className="hidden sm:inline text-white/10 mx-5 text-xl select-none">/</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Double widescreen frame bottom bar */}
        {!isMobile && (
          <div className="space-y-1 mt-20 mb-10">
            <div className="editorial-guideline-x opacity-30" />
            <div className="editorial-guideline-x" />
          </div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem] tracking-widest font-mono uppercase">
              © 2026 Aryan Thakur. All rights reserved.
            </p>
            <p className="text-zinc-500 text-[0.75rem] sm:text-[0.8rem] tracking-widest font-mono uppercase">
              [ CRAFTED_WITH_PRECISION // V1.2 ]
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
