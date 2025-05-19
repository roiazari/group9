import { useState, useEffect, useRef } from 'react';
import { Layers } from 'lucide-react';

interface SubSection {
  id: string;
  title: string;
  content?: string;
}

interface Author {
  name: string;
  affiliation: string;
}

interface SectionProps {
  id: string;
  title: string;
  subSections?: SubSection[];
  authors?: Author[];
  content?: string;
  imgSrc?: string;
  audioSrc?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subSections,
  authors,
  content,
  imgSrc,
  audioSrc
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleSubSections, setVisibleSubSections] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (subSections && subSections.length > 0) {
              const timer = setTimeout(() => {
                setVisibleSubSections(subSections.map((sub) => sub.id));
              }, 300);
              return () => clearTimeout(timer);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [subSections]);

  const renderParagraphs = (text: string) => {
    return text.split('\n').map((line, i) =>
      line.trim() === '' ? null : <p key={i}>{line}</p>
    );
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-16 section-transition ${visible ? 'visible' : ''}`}
    >
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 card-hover">
        <div className="mb-6 border-b border-gray-200 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 flex items-center">
            <Layers className="inline-block ml-2 text-accent-500" size={24} />
            {title}
          </h2>
        </div>

        {authors && authors.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-4">חוקרים:</h3>
            <div className="space-y-2">
              {authors.map((author, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{author.name}</span>
                  {author.affiliation && (
                    <span className="text-gray-600"> - {author.affiliation}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {subSections && subSections.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {subSections.map((subSection, index) => (
              <div
                key={subSection.id}
                className={`sub-section bg-gray-50 p-4 rounded-md ${
                  visibleSubSections.includes(subSection.id) ? 'visible' : ''
                }`}
                style={{ '--index': index } as React.CSSProperties}
              >
                <h3 className="text-lg font-medium mb-2 text-secondary-700">
                  {subSection.title}
                </h3>
                <div className="text-gray-600 space-y-2">
                  {subSection.content ? (
                    renderParagraphs(subSection.content)
                  ) : (
                    <p>[תוכן יתווסף על ידך]</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="prose max-w-none text-gray-600 space-y-4 text-right" dir="rtl">
            {imgSrc && (
              <img
                src={imgSrc}
                alt={title}
                className="mx-auto rounded-md shadow mb-6"
                style={{ width: '50%', height: '24%' }}
              />
            )}

            {content && renderParagraphs(content)}

            {audioSrc && (
              <div className="my-6 text-center">
                <audio controls className="w-full md:w-1/2 mx-auto">
                  <source src={audioSrc} type="audio/mpeg" />
                  הדפדפן שלך לא תומך בנגן אודיו.
                </audio>
               
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Section;
