import { useEffect, useRef } from 'react';

export function GridDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = 0;
    let isMobile = window.innerWidth < 1024;
    let frameCount = 0;

    const GRID_SPACING = 90;
    const DISTORT_RADIUS = 200;
    const DISTORT_STRENGTH = 18;
    const LINE_COLOR_DESKTOP = 'rgba(96, 165, 250, 0.4)';
    const LINE_COLOR_MOBILE = 'rgba(96, 165, 250, 0.025)';
    const CURSOR_GLOW_COLOR = 'rgba(96, 165, 250, 0.06)';
    const DISTORT_RADIUS_SQ = DISTORT_RADIUS * DISTORT_RADIUS;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 1024;
    };
    setCanvasSize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const distortPoint = (px: number, py: number): [number, number] => {
      if (isMobile) return [px, py];

      const dx = px - mouseX;
      const dy = py - mouseY;
      const distSq = dx * dx + dy * dy;

      if (distSq < DISTORT_RADIUS_SQ && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / DISTORT_RADIUS) * DISTORT_STRENGTH;
        const angle = Math.atan2(dy, dx);
        return [
          px + Math.cos(angle) * force,
          py + Math.sin(angle) * force,
        ];
      }
      return [px, py];
    };

    const animate = () => {
      frameCount++;

      // On mobile, render every 3rd frame for performance
      if (isMobile && frameCount % 3 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const lineColor = isMobile ? LINE_COLOR_MOBILE : LINE_COLOR_DESKTOP;
      const scrollOffset = (scrollY * 0.02) % GRID_SPACING;

      // Draw cursor proximity glow (desktop only)
      if (!isMobile && mouseX > 0 && mouseY > 0) {
        const glowGrad = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, DISTORT_RADIUS
        );
        glowGrad.addColorStop(0, CURSOR_GLOW_COLOR);
        glowGrad.addColorStop(1, 'rgba(96, 165, 250, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, DISTORT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 0.5;

      // Horizontal lines (optimized segments divisor from 20 to 55 to reduce draw latency)
      for (let y = -GRID_SPACING + scrollOffset; y <= canvas.height + GRID_SPACING; y += GRID_SPACING) {
        ctx.beginPath();
        const segments = Math.ceil(canvas.width / 55);
        for (let s = 0; s <= segments; s++) {
          const sx = (s / segments) * canvas.width;
          const [dx, dy] = distortPoint(sx, y);
          if (s === 0) {
            ctx.moveTo(dx, dy);
          } else {
            ctx.lineTo(dx, dy);
          }
        }
        ctx.stroke();
      }

      // Vertical lines (optimized segments divisor from 20 to 55)
      for (let x = 0; x <= canvas.width; x += GRID_SPACING) {
        ctx.beginPath();
        const segments = Math.ceil(canvas.height / 55);
        for (let s = 0; s <= segments; s++) {
          const sy = (s / segments) * canvas.height;
          const [dx, dy] = distortPoint(x, sy + scrollOffset);
          if (s === 0) {
            ctx.moveTo(dx, dy);
          } else {
            ctx.lineTo(dx, dy);
          }
        }
        ctx.stroke();
      }

      // Draw intersection dots near cursor (highly optimized bounding box fast path)
      if (!isMobile && mouseX > 0 && mouseY > 0) {
        const distRadLimit = DISTORT_RADIUS * 0.8;
        const distRadLimitSq = distRadLimit * distRadLimit;
        for (let x = 0; x <= canvas.width; x += GRID_SPACING) {
          for (let y = -GRID_SPACING + scrollOffset; y <= canvas.height + GRID_SPACING; y += GRID_SPACING) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const distSq = dx * dx + dy * dy;
            if (distSq < distRadLimitSq) {
              const dist = Math.sqrt(distSq);
              const [dxPoint, dyPoint] = distortPoint(x, y);
              const alpha = (1 - dist / distRadLimit) * 0.3;
              ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
              ctx.beginPath();
              ctx.arc(dxPoint, dyPoint, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.94 }}
    />
  );
}
