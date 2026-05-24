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
      'rgba(96, 165, 250, 0.3)',
      'rgba(168, 85, 247, 0.3)',
      'rgba(59, 130, 246, 0.25)',
      'rgba(147, 51, 234, 0.25)',
      'rgba(16, 185, 129, 0.2)'
    ];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // Floating orbs
    const orbs: FloatingOrb[] = [];
    const orbCount = 2; // Reduced for performance
    const orbColors = [
      'rgba(96, 165, 250, 0.08)',
      'rgba(168, 85, 247, 0.08)',
      'rgba(16, 185, 129, 0.06)'
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
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      time += 0.01;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(3, 2, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw procedural fine horizontal digital grid lines (optimized to 75px spacing for speed and aesthetics)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.004)';
      ctx.lineWidth = 0.5;
      for (let y = 0; y < canvas.height; y += 75) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Technical laser axis coordinate line sweep (dynamic scanner)
      const laserY = (time * 50) % (canvas.height + 100) - 50;
      if (laserY > 0 && laserY < canvas.height) {
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.012)';
        ctx.beginPath();
        ctx.moveTo(0, laserY);
        ctx.lineTo(canvas.width, laserY);
        ctx.stroke();
      }

      // Draw animated wave gradient (optimized flat fill overlay)
      ctx.fillStyle = 'rgba(96, 165, 250, 0.006)';
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

        // Mouse interaction (fast bounding box check before Math.sqrt)
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < 200 * 200) {
          const distance = Math.sqrt(distSq);
          if (distance > 0) {
            const force = (200 - distance) / 200;
            particle.vx -= (dx / distance) * force * 0.15;
            particle.vy -= (dy / distance) * force * 0.15;
          }
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

        // Draw particle with vector solid micro-glow (100x faster than CPU radial gradient)
        const glowSize = pulseSize * 3;
        ctx.fillStyle = particle.color.replace(/[\d.]+\)/, '0.12)');
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
}
