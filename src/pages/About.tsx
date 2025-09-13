import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);
  const powersRef = useRef<HTMLDivElement>(null);
  const villainsRef = useRef<HTMLDivElement>(null);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const webPatternRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Hero Section
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 150, opacity: 0, rotation: -15, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.4,
          ease: 'elastic.out(1, 0.5)',
        }
      );
      const tl = gsap.timeline({ repeat: -1 });
      for (let i = 0; i < 6; i++) {
        tl.fromTo(
          `.web-particle-${i}`,
          { x: -300, y: Math.random() * 400 - 200, opacity: 0.3 },
          {
            x: window.innerWidth + 300,
            y: Math.random() * 400 - 200,
            opacity: 0.6,
            duration: 12 + Math.random() * 8,
            ease: 'none',
          },
          Math.random() * 3
        );
      }
    }

    // Origin Section
    if (originRef.current) {
      ScrollTrigger.create({
        trigger: originRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            '.origin-text',
            { y: 60, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              stagger: 0.25,
              ease: 'power3.out',
            }
          );
          gsap.fromTo(
            '.origin-web-pattern',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 0.3, duration: 1.5, ease: 'power2.out' }
          );
        },
      });
    }

    // Powers Section
    if (powersRef.current) {
      ScrollTrigger.create({
        trigger: powersRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.power-item',
            { scale: 0, opacity: 0, rotation: -360 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 1.2,
              stagger: 0.2,
              ease: 'elastic.out(1, 0.3)',
            }
          );
        },
      });
    }

    // Villains Section
    if (villainsRef.current) {
      ScrollTrigger.create({
        trigger: villainsRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            '.villain-badge',
            { x: -100, opacity: 0, rotationY: 180 },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: 'back.out(1.7)',
            }
          );
        },
      });
    }

    // Philosophy Section
    if (philosophyRef.current) {
      ScrollTrigger.create({
        trigger: philosophyRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            '.quote-text',
            { y: 80, opacity: 0, letterSpacing: '0.1em' },
            {
              y: 0,
              opacity: 1,
              letterSpacing: '0em',
              duration: 1.2,
              ease: 'power4.out',
            }
          );
          gsap.fromTo(
            '.cite-text',
            { scale: 0, opacity: 0, rotation: 360 },
            {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.8,
              delay: 0.7,
              ease: 'back.out(1.7)',
            }
          );
          gsap.fromTo(
            webPatternRef.current,
            { scale: 0.5, rotation: 360, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 0.25,
              duration: 1.5,
              ease: 'elastic.out(1, 0.4)',
            }
          );
        },
      });
    }

    // Outro Section
    ScrollTrigger.create({
      trigger: '.outro-text',
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(
          '.spider-logo',
          { scale: 0, rotation: -180, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.5)' }
        );
        gsap.fromTo(
          '.outro-text',
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
        );
      },
    });

    // Global subtle parallax
    gsap.to('.web-pattern', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: { trigger: 'body', scrub: true },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const powers = [
    'Wall-Crawling',
    'Superhuman Strength',
    'Spider-Sense',
    'Agility & Reflexes',
    'Web-Shooters',
    'Genius-Level Intellect',
  ];

  const villains = [
    'Green Goblin',
    'Doctor Octopus',
    'Venom',
    'Sandman',
    'Electro',
    'Lizard',
    'Vulture',
    'Mysterio',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-black to-blue-950">
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`web-particle-${i} absolute w-2 h-2 bg-red-500 rounded-full shadow-glow`}
              style={{ top: `${Math.random() * 100}%`, left: '-300px' }}
            />
          ))}
        </div>
        <div className="container mx-auto relative z-10">
          <div ref={heroRef} className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-8xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">
              Spider-Man
            </h1>
            <p className="text-xl md:text-3xl text-gray-300 mb-12 leading-relaxed">
              The friendly neighborhood hero swinging through New York with courage, wit, and responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section ref={originRef} className="py-24 px-4 bg-gray-900/50 relative">
        <svg
          className="absolute inset-0 web-pattern opacity-10 origin-web-pattern"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            d="M0 0L100 100M100 0L0 100M50 0L50 100M0 50L100 50"
            stroke="url(#web-gradient)"
          />
          <defs>
            <linearGradient id="web-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-red-500 origin-text">Origin Story</h2>
            <p className="text-lg text-gray-300 leading-relaxed origin-text">
              Peter Parker, a brilliant but shy high school student, was bitten by a radioactive spider during a science expo. This life-altering event granted him extraordinary powers but also a profound lesson in responsibility.
            </p>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed origin-text">
              After the tragic loss of his Uncle Ben, Peter vowed to use his abilities to protect the innocent, embodying the mantra: <strong className="text-blue-400">"With great power comes great responsibility."</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Powers Section */}
      <section ref={powersRef} className="py-24 px-4 bg-black/80">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-blue-500">Spider-Powers</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {powers.map((power) => (
                <div
                  key={power}
                  className="relative p-6 bg-gray-900/70 rounded-xl shadow-lg power-item hover:shadow-glow-red transition-shadow duration-300"
                  style={{
                    background: 'radial-gradient(circle, rgba(239,68,68,0.2) 0%, rgba(0,0,0,0.9) 70%)',
                  }}
                >
                  <h3 className="text-xl font-semibold text-white">{power}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Villains Section */}
      <section ref={villainsRef} className="py-24 px-4 bg-gradient-to-b from-blue-950 to-black">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-red-500">Rogues’ Gallery</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {villains.map((villain) => (
                <Badge
                  key={villain}
                  variant="secondary"
                  className="villain-badge px-5 py-3 text-sm font-medium bg-gray-800 text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-500 hover:scale-110"
                >
                  {villain}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={philosophyRef} className="py-24 px-4 bg-gray-900/50 relative">
        <svg
          ref={webPatternRef}
          className="absolute inset-0 web-pattern"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            d="M0 0L100 100M100 0L0 100M50 0L50 100M0 50L100 50"
            stroke="url(#web-gradient)"
          />
        </svg>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 text-blue-500">Philosophy</h2>
            <blockquote className="text-2xl text-gray-300 italic leading-relaxed quote-text">
              "With great power comes great responsibility."
            </blockquote>
            <cite className="block mt-6 text-red-500 font-semibold text-lg cite-text">
              — Peter Parker
            </cite>
          </div>
        </div>
      </section>

      {/* Outro Section */}
      <section className="py-32 px-4 bg-black relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="spider-logo mx-auto w-32 h-32 mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 outro-text">
            The Legend Lives On...
          </h2>
        </div>
      </section>

      <style>{`
        .shadow-glow {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.5);
        }
        .shadow-glow-red {
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.7);
        }
        .power-item::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #ef4444, #3b82f6);
          transition: width 0.5s ease;
        }
        .power-item:hover::before {
          width: calc(100% + 20px);
        }
        .spider-logo {
          background: url('/spider.png') no-repeat center center;
          background-size: contain;
          filter: drop-shadow(0 0 20px rgba(239, 68, 68, 0.8));
        }
      `}</style>
    </>
  );
};

export default About;
