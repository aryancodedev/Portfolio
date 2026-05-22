import { motion, useScroll, useTransform } from 'motion/react';
import { Code2, Rocket, Cpu, Boxes, FileText, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateAmbiance = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scaleAmbiance = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const principles = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Engineering Excellence',
      description: 'Crafting scalable, maintainable systems with modern architecture patterns'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Product Development',
      description: 'Building user-centric products that solve real problems with elegant solutions'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Creative Technology',
      description: 'Pushing boundaries with experimental interfaces and immersive experiences'
    },
    {
      icon: <Boxes className="w-8 h-8" />,
      title: 'Scalable Systems',
      description: 'Designing robust infrastructure that grows with user needs'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-8 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background ambiance with scroll-based rotation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full opacity-10 blur-[100px]"
        style={{
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

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section intro */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 backdrop-blur-xl border border-blue-500/20"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-200 tracking-wider uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                About
              </span>
            </motion.div>

            <motion.h2
              className="mb-12 tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 800,
                lineHeight: 0.95,
                background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              BUILDING THE
              <br />
              FUTURE OF WEB
            </motion.h2>

            <div className="space-y-6">
              <motion.p
                className="text-gray-300 leading-relaxed"
                style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', fontWeight: 300 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                I specialize in creating <span className="text-white font-medium">immersive digital experiences</span> that
                blend cutting-edge technology with intuitive design.
              </motion.p>

              <motion.p
                className="text-gray-400 leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', fontWeight: 300 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                From architecting scalable full-stack applications to crafting pixel-perfect interfaces,
                I focus on delivering <span className="text-blue-400">high-performance solutions</span> that
                push the boundaries of what's possible on the web.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="pt-4"
              >
                <motion.a
                  href="/RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-wider text-white border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm hover:from-blue-500/20 hover:to-purple-500/20 hover:border-blue-500/40 transition-all duration-300 shadow-lg shadow-blue-500/5 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>VIEW MY RESUME</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative w-72 h-[400px] md:w-80 md:h-[450px] lg:w-[400px] lg:h-[500px] shrink-0 group"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", stiffness: 50, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            {/* Glassmorphic Background Card */}
            <div
              className="absolute inset-x-0 bottom-0 top-20 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md z-0 transition-all duration-500 group-hover:border-blue-500/30"
              style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)' }}
            />

            {/* The transparent image sitting ON the frame, breaking out the top */}
            <img
              src="/tr_image.png"
              alt="Aryan Thakur"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[110%] object-contain object-bottom drop-shadow-[0_-10px_20px_rgba(59,130,246,0.15)] transition-all duration-700 z-10"
            />

            {/* Glowing boundary strip at the bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent z-20 blur-sm opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent z-20 opacity-50 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle, index) => (
            <motion.div
              key={principle.title}
              className="group relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="relative h-full p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm overflow-hidden">
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 70%)',
                  }}
                />

                {/* Static Grid pattern */}
                <motion.div
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-blue-400">
                      {principle.icon}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-white mb-4"
                    style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700 }}
                  >
                    {principle.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-gray-400 leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
                  >
                    {principle.description}
                  </p>

                  {/* Accent line */}
                  <motion.div
                    className="mt-6 h-0.5 bg-gradient-to-r from-blue-500 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="inline-block px-8 py-6 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm">
            <p
              className="text-gray-300 max-w-3xl"
              style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 300, lineHeight: 1.8 }}
            >
              Every project is an opportunity to <span className="text-blue-400 font-medium">innovate</span>,
              <span className="text-purple-400 font-medium"> experiment</span>, and create
              something <span className="text-white font-medium">extraordinary</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
