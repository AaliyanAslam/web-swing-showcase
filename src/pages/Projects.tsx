import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ExternalLink, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SpiderAI = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { role: 'ai' as 'ai' | 'user', content: "Hey there, friendly neighbor! I'm Spider AI, your web-slinging sidekick powered by xAI. What's on your mind? Ask me anything about code, Spider-Man lore, or the meaning of life (with great power comes great debugging). 🕷️" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Hero animation: Web-sling entrance
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 100, opacity: 0, rotation: -15 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "back.out(1.7)"
        }
      );
    }

    // Chat container animation on scroll
    if (chatRef.current) {
      ScrollTrigger.create({
        trigger: chatRef.current,
        start: "top 90%",
        onEnter: () => {
          gsap.fromTo(
            chatRef.current?.querySelectorAll('.message-bubble'),
            { y: 50, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out"
            }
          );
        }
      });
    }

    // Features section stagger animation
    if (featuresRef.current) {
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            featuresRef.current?.querySelectorAll('.feature-card'),
            { x: -80, opacity: 0, rotationY: -90 },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
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

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response with delay and typing animation
    setTimeout(() => {
      const mockResponses = [
        "Swinging into action! That sounds like a classic web-slinging dilemma. Have you tried debugging with great responsibility? 🕸️",
        "Ah, the eternal battle of code vs. bugs. Remember, with great power comes great refactoring. What's the error message?",
        "Spider-Sense tingling! That's a tough one. Let me web up some resources: Check out the docs for that API. Need more details?",
        "Friendly neighborhood advice: Break it down into smaller components. Like building a web, one strand at a time! What's next?"
      ];
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      
      // Simulate typing effect
      let typedContent = '';
      const typeInterval = setInterval(() => {
        if (typedContent.length < randomResponse.length) {
          typedContent += randomResponse[typedContent.length];
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai' as const, content: typedContent + '|' }; // Cursor effect
            return updated;
          });
        } else {
          clearInterval(typeInterval);
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'ai' as const, content: typedContent };
            return updated;
          });
          setIsTyping(false);
        }
      }, 50);

      // Add empty AI message first
      setMessages(prev => [...prev, { role: 'ai' as const, content: '' }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
       <>

      {/* Web particles background */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="web-particle absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-200px',
              animation: `float ${10 + Math.random() * 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div ref={heroRef} className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Spider AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Your web-slinging AI companion. Ask me anything – from code conundrums to superhero secrets. Powered by xAI. 🕷️
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section ref={chatRef} className="py-10 px-4 relative z-10">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-gray-900/80 border-red-500/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-center text-blue-400">Chat with Spider AI</CardTitle>
            </CardHeader>
            <CardContent className="h-96 overflow-y-auto p-4 space-y-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-bubble flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.content.endsWith('|') ? (
                      <span className="animate-pulse">{message.content.slice(0, -1)}</span>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-bubble flex justify-start">
                  <div className="bg-gray-700 text-gray-100 p-3 rounded-lg max-w-xs lg:max-w-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-4 border-t border-gray-700 flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (e.g., 'How do I fix this React bug?')"
                className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={isTyping || inputValue.trim() === ''} size="icon" className="bg-red-600 hover:bg-red-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 px-4 bg-gray-900/30 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-red-400">Why Spider AI?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Superhero Smarts",
                description: "Powered by xAI's Grok, I deliver witty, accurate responses with a Spider-Man twist.",
                icon: "🕷️"
              },
              {
                title: "Web-Slinging Speed",
                description: "Real-time chat with smooth animations. No waiting – just swing into conversation!",
                icon: "🕸️"
              },
              {
                title: "Great Responsibility",
                description: "From code debugging to life advice, I handle it all with integrity and fun.",
                icon: "💻"
              }
            ].map((feature, index) => (
              <Card key={index} className="feature-card group bg-gray-800/50 border-blue-500/30 hover:border-blue-500/60 transition-all duration-500 overflow-hidden">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Swing into Action?</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Dive deeper into the web of knowledge. Built with React, GSAP, and endless enthusiasm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
              <Button variant="outline" size="lg" className="border-red-500 text-red-400 hover:bg-red-600 hover:text-white">
                <ExternalLink className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0% { transform: translateX(-200px) translateY(0px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100vw) translateY(0px); opacity: 0; }
        }
        .web-particle {
          animation-delay: ${Math.random() * 10}s;
        }
      `}</style>
     </>
  );
};

export default SpiderAI;