import { Locate, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState('Loading location...');

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation(`${data.city || data.locality || 'Unknown'}, ${data.principalSubdivision || data.countryName || ''}`);
          } catch (error) {
            console.error('Error getting location:', error);
            setLocation('Location unavailable');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation('Location access denied');
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="frost rounded-b-2xl sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-700">
        <Locate size={16} className="text-green-600 flex-shrink-0" />
        <span className="text-sm font-semibold truncate max-w-[180px]" title={location}>
          {location}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Clock size={14} className="text-gray-400" />
        <span>{formatTime(currentTime)}</span>
      </div>
    </div>
  );
};

export default Header;