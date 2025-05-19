import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Banner: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToContent = () => {
    const firstSection = document.getElementById('intro');
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/7102/notes-macbook-study-conference.jpg?auto=compress&cs=tinysrgb&w=1920" 
          alt="רקע יזמות" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 banner-overlay"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-center items-center text-white text-center px-4">
        <h1 
          className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-1000 ${
            loaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'
          }`}
        >
          בחינת מניעי הנטייה היזמית
        </h1>
        
        <h2 
          className={`text-xl md:text-2xl mb-8 max-w-3xl transition-all duration-1000 delay-200 ${
            loaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'
          }`}
        >
    מחקר מקיף הבוחן את הגורמים המשפיעים על נטייה יזמית בקרב סטודנטים
        </h2>
        
        <div 
          className={`max-w-xl transition-all duration-1000 delay-400 ${
            loaded ? 'opacity-100' : 'opacity-0 transform translate-y-10'
          }`}
        >
          <p className="mb-6 text-lg">
        מאת ראיין צ'ושא ורועי עזרי, בהנחיית ד"ר חנן מעוז – אוניברסיטת בר־אילן
          </p>
          
          <button 
            onClick={scrollToContent}
            className="mt-8 animate-bounce inline-flex items-center justify-center"
            aria-label="גלול למטה"
          >
            <ArrowDown size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;