import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower trailing spring for the scan ring
  const ringConfig = { damping: 20, stiffness: 120 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  const addRipple = useCallback((x: number, y: number) => {
    const id = Date.now();
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      addRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY, addRipple]);

  return (
    <>
      {/* Outer scan ring — rotating dashed circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] hidden lg:block"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <div
          style={{
            width: isHovering ? '56px' : '44px',
            height: isHovering ? '56px' : '44px',
            border: '1.5px dashed rgba(96, 165, 250, 0.3)',
            borderRadius: '50%',
            animation: 'cursor-scan-rotate 4s linear infinite',
            transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
            borderColor: isHovering ? 'rgba(96, 165, 250, 0.6)' : 'rgba(96, 165, 250, 0.3)',
          }}
        />
      </motion.div>

      {/* Inner energy core with glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[101] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Ambient glow ring */}
        <motion.div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: isHovering ? [1.5, 2, 1.5] : [1, 1.3, 1],
            opacity: isHovering ? [0.6, 0.9, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Core dot */}
        <motion.div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isClicking
              ? 'rgba(168, 85, 247, 1)'
              : 'rgba(96, 165, 250, 0.9)',
            boxShadow: isClicking
              ? '0 0 12px rgba(168, 85, 247, 0.6), 0 0 24px rgba(168, 85, 247, 0.3)'
              : '0 0 8px rgba(96, 165, 250, 0.4), 0 0 16px rgba(96, 165, 250, 0.2)',
            transition: 'background 0.15s ease, box-shadow 0.15s ease',
          }}
          animate={{
            scale: isHovering ? 1.8 : isClicking ? 0.7 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Coordinate HUD */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '24px',
            left: '16px',
            fontFamily: 'monospace',
            fontSize: '9px',
            color: 'rgba(96, 165, 250, 0.35)',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            lineHeight: 1.4,
          }}
        >
          <div>X:{String(coords.x).padStart(4, '0')}</div>
          <div>Y:{String(coords.y).padStart(4, '0')}</div>
        </div>
      </motion.div>

      {/* Click ripples */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[98] hidden lg:block"
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: '1px solid rgba(96, 165, 250, 0.5)',
            }}
          />
        </motion.div>
      ))}
    </>
  );
}
