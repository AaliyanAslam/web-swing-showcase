import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Code2, Palette, Zap, Users } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const spiderRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Hero text animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.hero-item'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Services animation
    if (servicesRef.current) {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            servicesRef.current?.querySelectorAll('.service-card'),
            { y: 60, opacity: 0, scale: 0.9 , x: -200},
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "back.out(1.7)"
            }
          );
        }
      });
    }

    // 🕷️ Fast left-right swing tied to scroll (no vertical drop)
    if (spiderRef.current && heroRef.current) {
      const el = spiderRef.current;
      // CONFIG: adjust these to control swing
      const amplitude = 220; // px left/right max (change to taste)
      const baseX = 0; // base center offset (in px)
      const cycles = 4; // how many full left-right cycles across scroll range

      // Ensure spider stays vertically fixed: set translateY to 0 (or adjust if you want small float)
      gsap.set(el, { y: 0, x: baseX, force3D: true, transformOrigin: '50% 50%' });

      // Use ScrollTrigger on hero section — map progress to a sine wave for natural swinging
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // progress goes 0 -> 1 as user scrolls through the hero section
          const p = self.progress; // 0..1
          // Map progress to angle (radians) across `cycles` cycles
          const angle = p * cycles * Math.PI * 2;
          const x = baseX + Math.sin(angle) * amplitude;
          // apply transform directly for best performance
          el.style.transform = `translate3d(${x}px, 0px, 0px)`;
          // optional: slight rotation to enhance swing feel
          const rot = Math.sin(angle) * 10; // +/-10deg
          el.style.transform += ` rotate(${rot}deg)`;
        }
      });

      // If user scrolls past the section and you want it to stop at ends, keep scrub true (already set)
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen" data-scroll-section>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        
        {/* Hero Content */}
        <div className="container relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* 🕷️ Spider Image */}
          {/* NOTE: replace './spider.png' with correct import if using webpack/nextjs asset import */}
          <img 
            ref={spiderRef} 
            src="./spider.png" 
            alt="Spider" 
            className="mx-auto w-32 md:w-80 will-change-transform" 
            style={{ pointerEvents: 'none' }}
          />

          <h1 className="hero-item text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text">Spider</span>
            <span className="text-foreground">Dev</span>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Index;
