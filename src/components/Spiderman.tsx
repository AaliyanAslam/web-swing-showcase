import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Spiderman = () => {
  const spiderRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!spiderRef.current || !webRef.current) return;

    // Initial spider animation
    gsap.fromTo(
      spiderRef.current,
      {
        y: -100,
        opacity: 0,
        rotation: 0,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 10,
        duration: 2,
        ease: "bounce.out",
      }
    );

    // Continuous swinging animation
    gsap.to(spiderRef.current, {
      rotation: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Web line animation
    gsap.fromTo(
      webRef.current,
      { strokeDasharray: "0 1000" },
      {
        strokeDasharray: "1000 1000",
        duration: 2,
        ease: "power2.out",
      }
    );

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: spiderRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(spiderRef.current, {
          y: progress * 50,
          rotation: progress * 20 - 10,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="fixed top-10 right-10 z-40 pointer-events-none">
      {/* Web Line */}
      <svg
        ref={webRef}
        className="absolute top-0 right-4 w-2 h-20"
        viewBox="0 0 4 80"
        fill="none"
      >
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="80"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Spider */}
      <div
        ref={spiderRef}
        className="relative top-16 w-8 h-8 bg-primary rounded-full flex items-center justify-center glow-primary animate-web-pulse"
      >
        {/* Spider Body */}
        <div className="w-4 h-4 bg-foreground rounded-full relative">
          {/* Spider Eyes */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-primary rounded-full"></div>
          <div className="absolute top-1 right-1 w-1 h-1 bg-primary rounded-full"></div>
        </div>

        {/* Spider Legs */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-0.5 bg-foreground rounded-full origin-center`}
              style={{
                transform: `rotate(${(i * 45) + 22.5}deg) translateX(8px)`,
                transformOrigin: 'left center',
              }}
            />
          ))}
        </div>
      </div>

      {/* Web Pattern */}
      <div className="absolute top-20 -right-10 w-20 h-20 opacity-20">
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* Concentric circles */}
          <circle cx="40" cy="40" r="10" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="40" cy="40" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          <circle cx="40" cy="40" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
          
          {/* Radial lines */}
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={i}
              x1="40"
              y1="40"
              x2={40 + Math.cos((i * Math.PI) / 4) * 30}
              y2={40 + Math.sin((i * Math.PI) / 4) * 30}
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Spiderman;