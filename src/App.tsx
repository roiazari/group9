import { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import Section from './components/Section';
import Footer from './components/Footer';
import { sections } from './data/sections';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find the current active section based on scroll position
      const currentSection = sections.find((section, index) => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        const nextSection = sections[index + 1];
        const nextElement = nextSection ? document.getElementById(nextSection.id) : null;

        if (nextElement) {
          return rect.top <= 100 && nextElement.getBoundingClientRect().top > 100;
        } else {
          return rect.top <= 100;
        }
      });

      if (currentSection && currentSection.id !== activeSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header activeSection={activeSection} />
      <Banner />

      <main className="container mx-auto px-4 py-8">
        

        {sections.map((section) => (
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            authors={section.authors}
            subSections={section.subSections}
            content={section.content}
              imgSrc={section.imgSrc} 
              audioSrc={section.audioSrc}
          />
        ))}

      </main>

      <Footer />
    </div>
  );
}

export default App;