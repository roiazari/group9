import { GraduationCap, Mail, Globe, MessageCircle, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">חקר יזמות</h2>
            <p className="text-gray-300">
              בחינת מניעי הנטייה היזמית: מחקר בקרב סטודנטים באוניברסיטאות בהודו
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <GraduationCap className="ml-2" size={18} />
              <span>מחקר בהנחיית ד״ר חנן מעוז</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="ml-2" size={18} />
              <span>המחלקה לניהול טכנולוגיה אוניברסיטת בר אילן</span>
            </div>
            <div className="flex items-center">
              <Mail className="ml-2" size={18} />
              <span >  צור קשר במייל - roiazari148@gmail.com  </span>
            </div>

            <div className="flex items-center text-green-500">
              <MessageCircle className="ml-2" size={18} />
              <a
                href="https://wa.me/972542412474"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                שלח הודעת WhatsApp
              </a>
            </div>

          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} כל הזכויות שמורות | עוצב על ידי ראיין צ׳ושא ורועי עזרי
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;