import { useEffect, useState } from 'react';

export function ScanLine() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Disable entirely on mobile for performance
  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Primary scan line */}
      <div
        className="absolute left-0 w-full"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.15) 20%, rgba(96, 165, 250, 0.4) 50%, rgba(96, 165, 250, 0.15) 80%, transparent 100%)',
          animation: 'scan-line-sweep 12s ease-in-out infinite',
          boxShadow: '0 0 20px 4px rgba(96, 165, 250, 0.08), 0 0 60px 8px rgba(96, 165, 250, 0.04)',
        }}
      />
      {/* Trailing ambient glow — slightly behind the main line */}
      <div
        className="absolute left-0 w-full"
        style={{
          height: '40px',
          background: 'linear-gradient(180deg, rgba(96, 165, 250, 0.03) 0%, transparent 100%)',
          animation: 'scan-line-sweep 12s ease-in-out infinite',
          animationDelay: '-0.15s',
        }}
      />
    </div>
  );
}
