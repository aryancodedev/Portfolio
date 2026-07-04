import { useEffect, useRef } from 'react';

type VantaEffect = {
  destroy?: () => void;
};

type VantaGlobal = {
  GLOBE: (config: {
    el: HTMLElement;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
  }) => VantaEffect;
};

export function VantaGlobeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);
  const scrollRotationRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const globalWindow = window as Window & { VANTA?: VantaGlobal };
    const globe = globalWindow.VANTA?.GLOBE;

    if (!globe) return;

    effectRef.current = globe({
      el: container,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0x60a5fa,
      color2: 0xa855f7,
      backgroundColor: 0x030212,
    });

    const effect = effectRef.current as VantaEffect & {
      sphere?: { rotation: { y: number } };
      linesMesh2?: { rotation: { x: number; y: number; z: number } };
      linesMesh3?: { rotation: { y: number } };
      onUpdate?: () => void;
    } | null;

    const baseSphereRotation = effect?.sphere?.rotation.y ?? 0;
    const baseLinesMesh2Rotation = effect?.linesMesh2
      ? {
          x: effect.linesMesh2.rotation.x,
          y: effect.linesMesh2.rotation.y,
          z: effect.linesMesh2.rotation.z,
        }
      : null;
    const baseLinesMesh3Rotation = effect?.linesMesh3?.rotation.y ?? 0;

    const updateScrollRotation = () => {
      scrollRotationRef.current = window.scrollY * 0.03;
    };

    const originalOnUpdate = effect?.onUpdate?.bind(effect);
    if (effect) {
      effect.onUpdate = () => {
        originalOnUpdate?.();

        if (effect.sphere) {
          effect.sphere.rotation.y = baseSphereRotation + scrollRotationRef.current;
        }

        if (effect.linesMesh2 && baseLinesMesh2Rotation) {
          effect.linesMesh2.rotation.x = baseLinesMesh2Rotation.x;
          effect.linesMesh2.rotation.y = baseLinesMesh2Rotation.y;
          effect.linesMesh2.rotation.z = baseLinesMesh2Rotation.z;
        }

        if (effect.linesMesh3) {
          effect.linesMesh3.rotation.y = baseLinesMesh3Rotation;
        }
      };
    }

    updateScrollRotation();
    window.addEventListener('scroll', updateScrollRotation, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollRotation);
      effectRef.current?.destroy?.();
      effectRef.current = null;
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none opacity-40" />;
}