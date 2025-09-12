import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

    // Projects stagger animation
    if (projectsRef.current) {
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            projectsRef.current?.querySelectorAll('.project-card'),
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out"
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern React-based e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
      image: "bg-gradient-to-br from-green-400 to-blue-500",
      technologies: ["React", "Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, team chat, and project analytics.",
      image: "bg-gradient-to-br from-purple-400 to-pink-500",
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Material-UI"],
      github: "#",
      demo: "#",
      featured: true
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather dashboard with interactive maps, forecasts, and customizable widgets.",
      image: "bg-gradient-to-br from-blue-400 to-cyan-500",
      technologies: ["Vue.js", "D3.js", "OpenWeather API", "Chart.js"],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations and dark mode support.",
      image: "bg-gradient-to-br from-orange-400 to-red-500",
      technologies: ["React", "GSAP", "Tailwind CSS", "Framer Motion"],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management with real-time data visualization.",
      image: "bg-gradient-to-br from-indigo-400 to-purple-500",
      technologies: ["React", "TypeScript", "D3.js", "Express", "Redis"],
      github: "#",
      demo: "#",
      featured: false
    },
    {
      title: "Crypto Tracker",
      description: "Cryptocurrency tracking app with portfolio management and price alerts.",
      image: "bg-gradient-to-br from-yellow-400 to-orange-500",
      technologies: ["React Native", "CoinGecko API", "AsyncStorage", "Push Notifications"],
      github: "#",
      demo: "#",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen" data-scroll-section>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              A showcase of my work spanning web applications, mobile apps,
              and everything in between.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
          <div ref={projectsRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <Card key={project.title} className="project-card group card-gradient border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                <div className={`h-48 ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-background/80">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects Grid */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">More Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {otherProjects.map((project, index) => (
              <Card key={project.title} className="project-card group card-gradient border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <div className={`h-32 ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 h-8">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 h-8">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              I'm always excited to work on new challenges and bring ideas to life.
              Let's create something amazing together!
            </p>
            <Button size="lg" className="glow-primary">
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
