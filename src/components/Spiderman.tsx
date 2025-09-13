import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Spiderman = () => {
  const spiderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spiderRef.current || !containerRef.current) return;

    // Page-wide swing path (curve across X axis of viewport)
    const swingPath = {
      path: [
        { x: -200, y: 50 }, // left outside
        { x: window.innerWidth * 0.25, y: 200 },
        { x: window.innerWidth * 0.5, y: 50 },
        { x: window.innerWidth * 0.75, y: 250 },
        { x: window.innerWidth + 200, y: 100 } // right outside
      ],
      curviness: 1.5,
      autoRotate: true
    };

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2
      }
    });

    // Move Spiderman across the page while swinging
    tl.to(spiderRef.current, {
      motionPath: swingPath,
      ease: "power1.inOut"
    });

    // Subtle swinging rotation while moving
    gsap.to(spiderRef.current, {
      rotation: 20,
      yoyo: true,
      repeat: -1,
      duration: 1.5,
      ease: "sine.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed top-[100px] left-0 w-full h-full z-50 pointer-events-none">
      {/* Spiderman */}
      <div
        ref={spiderRef}
        className="w-64 h-64 rounded-full flex items-center justify-center shadow-2xl"
        style={{
          filter: "drop-shadow(0 0 20px rgba(255,0,0,0.6))"
        }}
      >
        <img src="./spider.png" alt="Spiderman" />
      </div>
    </div>
  );
};

export default Spiderman;
