import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }

    // Skills animation on scroll
    if (skillsRef.current) {
      ScrollTrigger.create({
        trigger: skillsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            skillsRef.current?.children,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "back.out(1.7)"
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 88 },
    { name: 'Node.js', level: 85 },
    { name: 'GSAP', level: 80 },
    { name: 'Tailwind CSS', level: 92 },
  ];

  const technologies = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'Node.js',
    'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST APIs',
    'Tailwind CSS', 'GSAP', 'Framer Motion', 'AWS', 'Vercel'
  ];

  return (
    <div className="min-h-screen" data-scroll-section>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              I'm a passionate full-stack developer who loves creating amazing web experiences
              with cutting-edge technologies and smooth animations.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">My Journey</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Started coding at 16, fell in love with the power of creating digital experiences.
                  From building simple websites to complex web applications, I've been constantly
                  learning and pushing the boundaries of what's possible on the web.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring the latest web technologies,
                  contributing to open source projects, or swinging through the city 
                  (just kidding, but I do love Spider-Man!).
                </p>
              </div>
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg card-gradient"></div>
                <div className="absolute inset-0 web-pattern opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
            
            {/* Skill Bars */}
            <div ref={skillsRef} className="grid md:grid-cols-2 gap-8 mb-16">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-center">Technologies I Work With</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">My Philosophy</h2>
            <blockquote className="text-xl text-muted-foreground italic leading-relaxed">
              "With great code comes great responsibility. I believe in writing clean,
              maintainable code that not only works but inspires other developers."
            </blockquote>
            <cite className="block mt-4 text-primary font-medium">- SpiderDev</cite>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;