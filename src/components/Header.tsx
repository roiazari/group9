import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { sections } from '../data/sections';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    navRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!navRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - navRef.current.offsetLeft);
    setScrollLeft(navRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !navRef.current) return;
    const x = e.touches[0].pageX - navRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    navRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className={`text-xl md:text-2xl font-bold ${scrolled ? 'text-primary-900' : 'text-white'}`}>
            חקר יזמות
          </h1>
          
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${scrolled ? 'text-primary-900' : 'text-white'}`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <nav 
            ref={navRef}
            className={`hidden md:flex overflow-x-auto draggable-header pb-2 ${
              scrolled ? 'text-primary-900' : 'text-white'
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`nav-item mx-3 whitespace-nowrap text-sm ${
                  activeSection === section.id ? 'active font-medium' : ''
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
        
        <div 
          className={`mobile-nav md:hidden ${mobileMenuOpen ? 'open' : ''}`}
        >
          <div className="bg-white shadow-lg rounded-lg mt-2 p-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleClick(section.id)}
                className={`block w-full text-right py-2 px-4 rounded ${
                  activeSection === section.id 
                    ? 'bg-primary-100 text-primary-900' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;