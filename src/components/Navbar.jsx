import { HomeIcon, FolderIcon, BellIcon, HandCoinsIcon, UserIcon, SunIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = ({ active, onNavigate }) => {
  const { t } = useLanguage();
  
  const items = [
    { key: 'home', icon: HomeIcon },
    { key: 'saved', icon: FolderIcon },
    { key: 'alerts', icon: BellIcon },
    { key: 'finance', icon: HandCoinsIcon },
    { key: 'profile', icon: UserIcon },
    { key: 'weather', icon: SunIcon },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 frost rounded-t-2xl shadow-soft p-2 flex justify-around z-20">
      {items.map((it) => (
        <button key={it.key} onClick={() => onNavigate(it.key)} className={`flex flex-col items-center p-2 ${active === it.key ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
          <it.icon size={20} />
          <span className="text-xs">{t(it.key)}</span>
        </button>
      ))}
    </div>
  );
};

export default Navbar;