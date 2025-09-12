import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code2, Palette, Zap, Users } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

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

    // Services animation on scroll
    if (servicesRef.current) {
      ScrollTrigger.create({
        trigger: servicesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            servicesRef.current?.querySelectorAll('.service-card'),
            { y: 60, opacity: 0, scale: 0.9 },
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Code2,
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technologies.',
      features: ['React & Next.js', 'TypeScript', 'API Integration']
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that users love to interact with.',
      features: ['Figma Design', 'Prototyping', 'User Research']
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Lightning-fast applications optimized for the best user experience.',
      features: ['Speed Optimization', 'SEO Ready', 'Mobile First']
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working closely with teams to bring visions to life.',
      features: ['Agile Methods', 'Code Reviews', 'Mentoring']
    }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '3+', label: 'Years Experience' },
    { number: '20+', label: 'Happy Clients' },
    { number: '100%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen" data-scroll-section>
      {/* Hero Section */}
      <section 
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
        
        {/* Web Pattern Overlay */}
        <div className="absolute inset-0 web-pattern opacity-10" />
        
        {/* Hero Content */}
        <div ref={heroRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <Badge variant="outline" className="hero-item mb-8 border-primary/50 text-primary">
            🕷️ Full Stack Developer
          </Badge>
          
          <h1 className="hero-item text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text">Spider</span>
            <span className="text-foreground">Dev</span>
          </h1>
          
          <p className="hero-item text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting extraordinary web experiences with the power of modern technologies.
            From concept to deployment, I weave digital magic that captivates and converts.
          </p>
          
          <div className="hero-item flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="glow-primary">
              View My Work
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full animate-float opacity-50" />
        <div className="absolute bottom-32 right-20 w-16 h-16 border border-secondary/30 rounded-lg animate-swing opacity-40" />
        <div className="absolute top-1/3 right-10 w-12 h-12 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-card/30 border-y border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What I <span className="gradient-text">Build</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              From stunning frontends to robust backends, I create full-stack solutions
              that deliver exceptional user experiences and drive business results.
            </p>
          </div>

          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <Card key={service.title} className="service-card group card-gradient border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something <span className="gradient-text">Amazing</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Let's turn your vision into reality. Whether you need a stunning website,
              a powerful web application, or ongoing development support, I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-primary">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
