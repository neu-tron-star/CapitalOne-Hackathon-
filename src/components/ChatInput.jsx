import { MicIcon, ImageIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ChatInput = () => {
  const { t } = useLanguage();
  
  return (
  <div className="fixed bottom-16 left-0 right-0 px-4 z-10">
    <div className="frost rounded-full shadow-soft px-3 py-2 flex items-center gap-2">
      <button className="p-2 rounded-full bg-white shadow"><ImageIcon size={18} /></button>
      <input 
        className="flex-1 bg-transparent outline-none text-sm px-2" 
        placeholder={t('typeYourQuestion')} 
      />
      <button className="p-2 rounded-full bg-green-600 text-white shadow"><MicIcon size={18} /></button>
    </div>
  </div>
  );
};

export default ChatInput;