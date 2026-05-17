import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Code, Mail } from 'lucide-react';

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { icon: <Home className="w-4 h-4" />, label: 'Home' },
    { icon: <Briefcase className="w-4 h-4" />, label: 'Projects' },
    { icon: <User className="w-4 h-4" />, label: 'About' },
    { icon: <Code className="w-4 h-4" />, label: 'Skills' },
    { icon: <Mail className="w-4 h-4" />, label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = document.querySelectorAll('section');
      
      sectionElements.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    sections[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <div className="flex flex-col gap-4 p-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
        {sections.map((section, index) => (
          <motion.button
            key={section.label}
            onClick={() => scrollToSection(index)}
            className="group relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Indicator dot */}
            <div className="relative flex items-center justify-center w-10 h-10">
              <motion.div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeSection === index 
                    ? 'bg-blue-400 scale-150' 
                    : 'bg-gray-600 scale-100 group-hover:bg-blue-400 group-hover:scale-125'
                }`}
                animate={activeSection === index ? {
                  boxShadow: [
                    '0 0 0px rgba(96, 165, 250, 0.5)',
                    '0 0 15px rgba(96, 165, 250, 0.8)',
                    '0 0 0px rgba(96, 165, 250, 0.5)',
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Active ring */}
              {activeSection === index && (
                <motion.div
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>

            {/* Tooltip */}
            <motion.div
              className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-gray-900 border border-white/10 backdrop-blur-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <span className="text-gray-300" style={{ fontSize: '0.85rem' }}>
                {section.label}
              </span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900" />
            </motion.div>
          </motion.button>
        ))}

        {/* Connection line */}
        <div className="absolute left-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent -translate-x-1/2 -z-10" />
      </div>
    </motion.div>
  );
}
