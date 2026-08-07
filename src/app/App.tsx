import { useState, useEffect } from 'react';
import { LoadingSequence } from './components/LoadingSequence';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { FloatingNav } from './components/FloatingNav';
import { GridDistortion } from './components/GridDistortion';
import { VantaGlobeBackground } from './components/VantaGlobeBackground';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Loading sequence */}
      {isLoading && <LoadingSequence onComplete={handleLoadingComplete} />}

      {/* Main content */}
      {showContent && (
        <>
          {/* Background animation */}
          <VantaGlobeBackground />

          {/* Interaction layers */}
          <GridDistortion />

          {/* Unified cinematic sections */}
          <FloatingNav />
          <Hero />
          <FeaturedProjects />
          <About />
          <Skills />
          <Contact />

          {/* Noise/grain overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-50 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: 'overlay'
            }}
          />
        </>
      )}
    </div>
  );
}