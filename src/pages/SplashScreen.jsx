import { useLanguage } from '../context/LanguageContext';

const SplashScreen = ({ onContinue }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen gradient-green text-white flex flex-col items-center justify-center relative">
      <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center shadow-soft mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.5 2 6a7 7 0 0 1-9 12.1A7 7 0 0 1 11 20"/><path d="M8 11.8c2.7-.7 4.14-2.83 5-6"/></svg>
      </div>
      <h1 className="text-4xl font-extrabold mb-2">{t('appName')}</h1>
      <div className="h-1 w-20 bg-white/80 rounded mb-3"></div>
      <p className="opacity-90">{t('appTagline')}</p>

      <div className="flex gap-2 absolute bottom-24">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      <div className="absolute bottom-8 opacity-80 text-sm">{t('poweredBy')}</div>

      <button onClick={onContinue} className="absolute inset-0" aria-label="continue"></button>
    </div>
  );
};

export default SplashScreen;