import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

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
      <div className="relative z-10 mx-auto w-full h-full max-w-7xl px-6 sm:px-8 lg:px-10 cinematic-spotlight flex flex-col justify-center">
        <motion.div
          className="grid w-full grid-cols-1 gap-x-12 gap-y-6 text-left lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] lg:grid-rows-[auto_auto_auto] lg:items-start"
          initial={{ opacity: 0, y: isMobile ? 30 : 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            className="lg:col-start-1 lg:row-start-1 select-none tracking-tight font-black leading-[0.82]"
            initial={{ opacity: 0, y: isMobile ? 20 : 10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="inline-block pr-8"
              style={{
                fontSize: 'clamp(4.6rem, 13.8vw, 12.65rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 0.86,
                textShadow: '0 4px 40px rgba(0, 0, 0, 0.35)'
              }}
            >
              ARYAN
            </span>
            <span
              className="text-outline-watermark inline-block pr-8 mt-2"
              style={{
                fontSize: 'clamp(5.5rem, 16.5vw, 15.5rem)',
                lineHeight: 0.86,
                letterSpacing: '0.04em',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '2px rgba(255,255,255,0.4)'
              }}
            >
              THAKUR
            </span>
          </motion.h1>

          <div className="lg:col-start-1 lg:row-start-2 flex flex-nowrap items-center justify-start gap-4 sm:gap-6 lg:gap-12 w-full mt-6 lg:mt-8 lg:pl-16 pr-0 lg:pr-8">
            {['FULL STACK DEVELOPER', 'UI/UX DESIGNER', 'OPEN SOURCE CONTRIBUTOR'].map((item, index) => {
              return (
                <div key={item} className="flex items-center gap-4 sm:gap-6 lg:gap-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.96, filter: 'blur(5px)' }}
                    animate={isLoaded ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
                    transition={{ duration: 0.75, delay: 1.8 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="relative group cursor-default font-black tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.2em] text-white/70 hover:text-white uppercase text-[0.65rem] sm:text-[0.8rem] lg:text-[1rem] transition-colors duration-300 whitespace-nowrap"
                    style={{ textShadow: '0 0 15px rgba(255,255,255,0)' }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.textShadow = '0 0 15px rgba(255,255,255,0.5)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.textShadow = '0 0 15px rgba(255,255,255,0)';
                    }}
                  >
                    {item}
                    <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </motion.div>
                  
                  {index < 2 && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={isLoaded ? { opacity: 1 } : {}}
                      transition={{ duration: 0.5, delay: 2.1 }}
                      className="text-white/30 text-[0.6rem] lg:text-[1rem]"
                    >
                      •
                    </motion.span>
                  )}
                </div>
              );
            })}
          </div>
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
