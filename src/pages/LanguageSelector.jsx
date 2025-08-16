import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSelector = ({ onNext }) => {
  const { languages, changeLanguage, t } = useLanguage();
  
  const handleLanguageSelect = (langCode) => {
    changeLanguage(langCode);
    onNext();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="card p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-600/15 text-green-600 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.5 2 6a7 7 0 0 1-9 12.1A7 7 0 0 1 11 20"/>
              <path d="M8 11.8c2.7-.7 4.14-2.83 5-6"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold">{t('selectLanguage')}</h2>
          <p className="text-xs text-gray-500">Select Language</p>
        </div>
        <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
          {Object.entries(languages).map(([code, { name, nativeName }]) => (
            <div 
              key={code}
              className="flex items-center justify-between border rounded-xl px-4 py-3 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleLanguageSelect(code)}
            >
              <div>
                <div className="font-medium">{nativeName}</div>
                <div className="text-xs text-gray-500">{name}</div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
        <button 
          onClick={onNext} 
          className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;