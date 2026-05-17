import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIALIZING');

  useEffect(() => {
    const statuses = [
      { text: 'INITIALIZING', delay: 0 },
      { text: 'LOADING ASSETS', delay: 400 },
      { text: 'COMPILING SHADERS', delay: 800 },
      { text: 'ESTABLISHING CONNECTION', delay: 1200 },
      { text: 'READY', delay: 1600 }
    ];

    statuses.forEach(({ text, delay }) => {
      setTimeout(() => setStatus(text), delay);
    });

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(96, 165, 250, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96, 165, 250, 0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '80px 80px']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center content */}
        <div className="relative z-10 text-center px-8">
          {/* Logo/Title */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="tracking-tight mb-4"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ffffff 0%, #60a5fa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              ARYAN THAKUR
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-gray-400 tracking-widest uppercase font-mono" style={{ fontSize: '0.75rem' }}>
                {status}
              </span>
            </motion.div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Bar container */}
            <div className="relative h-1.5 bg-gray-900 rounded-full overflow-hidden mb-4 border border-white/5">
              {/* Progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-md opacity-50 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />

              {/* Scanning line */}
              <motion.div
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ['-100%', '500%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>

            {/* Progress percentage */}
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-mono" style={{ fontSize: '0.75rem' }}>
                LOADING...
              </span>
              <span className="text-blue-400 font-mono" style={{ fontSize: '0.75rem' }}>
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>

          {/* System info */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {['SYS_ID: AT-2026', 'VERSION: 3.0.1', 'BUILD: STABLE'].map((info, i) => (
              <motion.div
                key={info}
                className="text-gray-600 font-mono"
                style={{ fontSize: '0.7rem' }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                {info}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Corner decorations */}
        {[
          { top: '2rem', left: '2rem' },
          { top: '2rem', right: '2rem' },
          { bottom: '2rem', left: '2rem' },
          { bottom: '2rem', right: '2rem' }
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-l-2 border-t-2 border-blue-500/30"
            style={{
              ...pos,
              transform: i % 2 === 0 ? 'rotate(0deg)' : 'rotate(180deg)'
            }}
            animate={{
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
