import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Home, Briefcase, User, Code, Mail, FileText, Menu, X } from 'lucide-react';

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Floating Navigation */}
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === index
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

          {/* Desktop Special Resume Button */}
          <div className="w-full h-px bg-white/10 my-1" />
          
          <motion.a
            href="/RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FileText className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
            
            {/* Tooltip */}
            <motion.div
              className="absolute right-14 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-gray-900 border border-white/10 backdrop-blur-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
              initial={false}
            >
              <span className="text-blue-400 font-semibold" style={{ fontSize: '0.85rem' }}>
                Resume
              </span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900" />
            </motion.div>
          </motion.a>

          {/* Connection line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent -translate-x-1/2 -z-10" />
        </div>
      </motion.div>

      {/* Mobile Menu Button */}
      <div className="fixed top-6 right-6 z-50 block lg:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center cursor-pointer shadow-lg shadow-black/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white animate-pulse" />
          ) : (
            <Menu className="w-5 h-5 text-white" />
          )}
        </motion.button>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(24px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 block lg:hidden bg-black/75 flex flex-col justify-center items-center px-8"
          >
            {/* Ambient Background Glow for mobile menu */}
            <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-3xl -z-10 pointer-events-none" />

            <div className="flex flex-col gap-6 w-full max-w-sm text-center">
              {sections.map((section, index) => (
                <motion.button
                  key={section.label}
                  onClick={() => {
                    setIsOpen(false);
                    // Slight delay to let close animation start
                    setTimeout(() => scrollToSection(index), 250);
                  }}
                  className="relative group py-2 cursor-pointer animate-none"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <span className="text-gray-500 uppercase tracking-widest text-[0.7rem] block mb-1">
                    0{index + 1} //
                  </span>
                  <span className="text-white text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {section.label.toUpperCase()}
                  </span>
                </motion.button>
              ))}

              <div className="h-px bg-white/10 my-4" />

              <motion.a
                href="/RESUME.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: sections.length * 0.08, duration: 0.4 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-white font-bold tracking-wider hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
              >
                <FileText className="w-5 h-5 text-blue-400" />
                <span>VIEW RESUME</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
