import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Spider-Man', path: '/about' },
    { name: 'Powers & Gadgets', path: '/powers' },
    { name: 'Enemies', path: '/enemies' },
    { name: 'Comics', path: '/comics' },
  ];

  return (
    <footer className="border-t border-red-600 bg-black/80 backdrop-blur-sm text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                🕷️
              </div>
              <span className="font-bold text-2xl text-red-500 drop-shadow-md">
                Spider-Verse
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6">
              Swinging across the web since 1962. Celebrating Spider-Man’s legacy — 
              stories of courage, sacrifice, and responsibility.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-red-500">Explore</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spidey Services */}
          <div>
            <h3 className="font-semibold mb-4 text-red-500">Spidey Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Web Slinging</li>
              <li>Hero Consulting</li>
              <li>Crime Fighting</li>
              <li>Friendly Neighborhood Help</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-600 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Spider-Verse. All rights reserved.
            </p>
            <div className="flex items-center text-gray-400 text-sm">
              <span>With great power</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" />
              <span>comes great responsibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
