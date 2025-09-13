import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Spiderman = () => {
  const spiderRef = useRef<HTMLDivElement>(null);
  const webRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spiderRef.current || !webRef.current || !containerRef.current) return;

    // Create NYC skyline swinging path
    const swingPath = "M50,100 Q200,50 350,120 T650,80 T950,110 T1250,70";
    
    // Initial spider entrance - dropping from web
    gsap.fromTo(
      spiderRef.current,
      {
        y: -200,
        opacity: 0,
        rotation: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotation: 10,
        scale: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.8)",
      }
    );

    // Web line drawing animation
    gsap.fromTo(
      webRef.current,
      { 
        strokeDasharray: "0 1000",
        opacity: 0 
      },
      {
        strokeDasharray: "1000 1000",
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );

    // Create scroll-triggered swinging animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          // Calculate swing position based on scroll progress
          const progress = self.progress;
          const sections = document.querySelectorAll('section');
          const currentSection = Math.floor(progress * sections.length);
          
          // NYC skyscraper swinging motion
          const swingX = Math.sin(progress * Math.PI * 8) * 150;
          const swingY = Math.cos(progress * Math.PI * 4) * 30;
          const rotation = Math.sin(progress * Math.PI * 6) * 25;
          
          // Web attachment point follows spider
          const webLength = 80 + Math.sin(progress * Math.PI * 3) * 20;
          
          gsap.set(spiderRef.current, {
            x: swingX,
            y: swingY,
            rotation: rotation,
            transformOrigin: "center center",
            ease: "none"
          });

          // Dynamic web line that follows spider
          gsap.set(webRef.current, {
            height: webLength,
            x: swingX * 0.3,
            ease: "none"
          });
        }
      }
    });

    // Continuous subtle swing when not scrolling
    gsap.to(spiderRef.current, {
      rotation: "+=5",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Parallax web pattern animation
    gsap.to(".web-pattern", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-1/2 z-50 pointer-events-none transform -translate-x-1/2"
    >
      {/* Dynamic Web Line */}
      <svg
        ref={webRef}
        className="absolute top-0 left-1/2 transform -translate-x-1/2"
        width="4"
        height="100"
        viewBox="0 0 4 100"
        fill="none"
      >
        <defs>
          <linearGradient id="webGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <line
          x1="2"
          y1="0"
          x2="2"
          y2="100"
          stroke="url(#webGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="drop-shadow(0 0 6px hsl(var(--primary)))"
        />
      </svg>

      {/* Spiderman */}
      <div
        ref={spiderRef}
        className="relative top-20 w-12 h-12 bg-gradient-to-br from-primary to-primary-foreground rounded-full flex items-center justify-center shadow-2xl transform-gpu"
        style={{
          filter: "drop-shadow(0 0 20px hsl(var(--primary) / 0.6))",
        }}
      >
        {/* Spider Body */}
        <div className="w-8 h-8 bg-gradient-to-br from-background to-muted rounded-full relative border-2 border-primary/20">
          {/* Spider Eyes - glowing */}
          <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
          
          {/* Spider Mark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-0.5 bg-primary/60 rounded-full rotate-45"></div>
            <div className="absolute w-3 h-0.5 bg-primary/60 rounded-full -rotate-45"></div>
          </div>
        </div>

        {/* Enhanced Spider Legs */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute w-5 h-0.5 bg-gradient-to-r from-foreground to-transparent rounded-full origin-center"
              style={{
                transform: `rotate(${(i * 45) + 22.5}deg) translateX(10px)`,
                transformOrigin: 'left center',
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
              }}
            />
          ))}
        </div>
      </div>

      {/* NYC Skyline Web Pattern */}
      <div className="web-pattern absolute top-24 -left-20 w-32 h-32 opacity-10">
        <svg viewBox="0 0 120 120" className="w-full h-full">
          {/* Building silhouettes */}
          <rect x="10" y="60" width="8" height="60" fill="hsl(var(--primary))" opacity="0.3"/>
          <rect x="20" y="40" width="12" height="80" fill="hsl(var(--primary))" opacity="0.4"/>
          <rect x="35" y="50" width="10" height="70" fill="hsl(var(--primary))" opacity="0.3"/>
          <rect x="50" y="30" width="15" height="90" fill="hsl(var(--primary))" opacity="0.5"/>
          <rect x="70" y="45" width="12" height="75" fill="hsl(var(--primary))" opacity="0.4"/>
          <rect x="85" y="35" width="10" height="85" fill="hsl(var(--primary))" opacity="0.3"/>
          <rect x="100" y="55" width="8" height="65" fill="hsl(var(--primary))" opacity="0.2"/>
          
          {/* Web connections between buildings */}
          <path
            d="M18,80 Q40,70 55,85 Q75,65 90,80 Q105,75 115,85"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M25,90 Q45,85 60,95 Q80,80 95,90"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Motion trails */}
      <div className="absolute top-24 left-6 w-2 h-8 bg-gradient-to-b from-primary/20 to-transparent rounded-full animate-pulse"></div>
      <div className="absolute top-28 left-8 w-1 h-6 bg-gradient-to-b from-primary/15 to-transparent rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
    </div>
  );
};

export default Spiderman;