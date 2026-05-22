import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { Target, Palette, MapPin, Hand } from 'lucide-react';
import { useRef } from 'react';

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const projects = [
    {
      title: 'GoalForge',
      description: 'A futuristic productivity operating system with floating dashboard interfaces, holographic UI, and intelligent workflow automation.',
      tags: ['React', 'TypeScript', 'Motion', 'Supabase', 'Real-time'],
      gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0.4) 100%)',
      icon: <Target className="w-10 h-10 text-blue-400" />,
      link: 'https://goalforge-seven.vercel.app/'
    },
    {
      title: 'Nain Aur Naqsh',
      description: 'A luxury digital creative studio platform featuring cinematic media reveals, editorial layouts, and premium visual storytelling.',
      tags: ['Next.js', 'GSAP', 'WebGL', 'Creative Tech'],
      gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(147, 51, 234, 0.4) 100%)',
      icon: <Palette className="w-10 h-10 text-purple-400" />,
      link: 'https://nain-aur-naqsh.vercel.app/'
    },
    {
      title: 'RentIt',
      description: 'A modern real-estate platform developed for a property dealer company focused on responsive property browsing, structured listings, and a clean user experience across devices.',
      tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'MongoDB'],
      gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.4) 100%)',
      icon: <MapPin className="w-10 h-10 text-emerald-400" />,
      link: 'https://rent-it-fit.vercel.app/'
    },
    {
      title: 'Gesture-Controlled Reel Scrolling',
      description: 'An AI-powered interaction experiment using computer vision, hand tracking, and neural networks for next-gen browsing.',
      tags: ['Python', 'MediaPipe', 'AI/ML', 'OpenCV'],
      gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.4) 0%, rgba(234, 88, 12, 0.4) 100%)',
      icon: <Hand className="w-10 h-10 text-orange-400" />,
      link: 'https://drive.google.com/file/d/1ijalBnEyO086epHgDg2v50sDJTjRiHA2/view?usp=sharing'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-8 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background effects with parallax */}
      <motion.div
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-pink-500/8 blur-3xl"
      />

      <motion.div className="relative z-10 max-w-7xl mx-auto" style={{ opacity, scale }}>
        {/* Section header */}
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full mb-8 backdrop-blur-xl border border-purple-500/20"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-200 tracking-wider uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.15em' }}>
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            className="mb-6 tracking-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #ffffff 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            SELECTED PROJECTS
          </motion.h2>

          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Immersive digital experiences that push the boundaries of modern web technology
          </motion.p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
