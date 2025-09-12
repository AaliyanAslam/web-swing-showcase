import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Spiderman from './Spiderman';

const Layout = () => {
  useEffect(() => {
    // Initialize Locomotive Scroll when component mounts
    const initLocomotiveScroll = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        const scroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]') as HTMLElement,
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
        });

        return () => {
          if (scroll) scroll.destroy();
        };
      } catch (error) {
        console.log('Locomotive Scroll not available, using native scroll');
      }
    };

    initLocomotiveScroll();
  }, []);

  return (
    <div data-scroll-container className="min-h-screen">
      <Navbar />
      <Spiderman />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;