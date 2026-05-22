import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulsePhase: number;
}

interface FloatingOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

export function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const particles: Particle[] = [];
    const particleCount = 30; // Dramatically reduced for performance
    const colors = [
      'rgba(96, 165, 250, 0.6)',
      'rgba(168, 85, 247, 0.6)',
      'rgba(59, 130, 246, 0.5)',
      'rgba(147, 51, 234, 0.5)',
      'rgba(16, 185, 129, 0.4)'
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating orbs
    const orbs: FloatingOrb[] = [];
    const orbCount = 2; // Reduced for performance
    const orbColors = [
      'rgba(96, 165, 250, 0.15)',
      'rgba(168, 85, 247, 0.15)',
      'rgba(16, 185, 129, 0.12)'
    ];

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 100 + 80,
        color: orbColors[Math.floor(Math.random() * orbColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.01;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(3, 2, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw animated wave gradient
      const gradient = ctx.createLinearGradient(
        0,
        Math.sin(time * 0.5) * 100,
        canvas.width,
        canvas.height + Math.cos(time * 0.3) * 100
      );
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.01)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.01)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating orbs with blur and pulse
      orbs.forEach(orb => {
        orb.pulsePhase += orb.pulseSpeed;
        const pulseFactor = Math.sin(orb.pulsePhase) * 0.3 + 1;
        const currentRadius = orb.radius * pulseFactor;

        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Boundaries with smooth bounce
        if (orb.x < -orb.radius || orb.x > canvas.width + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > canvas.height + orb.radius) orb.vy *= -1;

        // Draw orb with radial gradient
        const orbGradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentRadius
        );
        orbGradient.addColorStop(0, orb.color);
        orbGradient.addColorStop(0.5, orb.color.replace(/[\d.]+\)/, '0.05)'));
        orbGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles
      particles.forEach((particle, i) => {
        particle.pulsePhase += 0.02;
        const pulseSize = particle.size * (1 + Math.sin(particle.pulsePhase) * 0.3);

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          const force = (200 - distance) / 200;
          particle.vx -= (dx / distance) * force * 0.15;
          particle.vy -= (dy / distance) * force * 0.15;
        }

        // Attraction to center with wave motion
        const centerX = canvas.width / 2 + Math.sin(time + i) * 50;
        const centerY = canvas.height / 2 + Math.cos(time + i) * 50;
        const centerDx = centerX - particle.x;
        const centerDy = centerY - particle.y;
        const centerDistance = Math.sqrt(centerDx * centerDx + centerDy * centerDy);

        if (centerDistance > 0) {
          particle.vx += (centerDx / centerDistance) * 0.002;
          particle.vy += (centerDy / centerDistance) * 0.002;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap boundaries
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with enhanced glow
        const glowSize = pulseSize * 3;
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        glowGradient.addColorStop(0, particle.color);
        glowGradient.addColorStop(0.5, particle.color.replace(/[\d.]+\)/, '0.2)'));
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core (removed shadowBlur for performance)
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Removed expensive O(n^2) line drawing for performance
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
