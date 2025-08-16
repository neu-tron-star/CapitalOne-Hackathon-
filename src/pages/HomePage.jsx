import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import ChatInput from '../components/ChatInput';
import dummyData from '../data/dummyData';
import { Bell, ChevronDown, MapPin } from 'lucide-react';

// Map crop names to AGMARKNET commodity codes
const commodityMap = {
  // Cereals
  'wheat': 'WHEAT',
  'rice': 'RICE',
  'maize': 'MAIZE',
  'bajra': 'BAJRA',
  'jowar': 'JOWAR',
  'ragi': 'RAGI',
  'barley': 'BARLEY',
  
  // Pulses
  'arhar': 'ARHAR',
  'moong': 'MOONG',
  'urad': 'URAD',
  'masur': 'MASUR',
  'gram': 'GRAM',
  'lentil': 'LENTIL',
  
  // Oilseeds
  'mustard': 'MUSTARD',
  'groundnut': 'GROUNDNUT',
  'soybean': 'SOYABEEN',
  'sunflower': 'SUNFLOWER',
  'sesame': 'SESAMUM',
  'castor': 'CASTOR',
  
  // Vegetables
  'potato': 'POTATO',
  'onion': 'ONION',
  'tomato': 'TOMATO',
  'brinjal': 'BRINJAL',
  'cabbage': 'CABBAGE',
  'cauliflower': 'CAULIFLOWER',
  
  // Fruits
  'banana': 'BANANA',
  'mango': 'MANGO',
  'orange': 'ORANGE',
  'apple': 'APPLE',
  'grapes': 'GRAPES',
  'pomegranate': 'POMEGRANATE'
};

const fetchMarketPrices = async (crop) => {
  const API_KEY = '579b464db66ec23bdd000001798dfe5b454546066ddae0d79944e04d';
  const commodityName = commodityMap[crop] || 'RICE';
  
  try {
    const response = await fetch(
      `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&filters%5Bcommodity%5D=${commodityName}&limit=10`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch market data');
    }
    
    const data = await response.json();
    
    if (data.records && data.records.length > 0) {
      return data.records.map((item, index) => ({
        id: index + 1,
        mandi: item.market || 'Local Mandi',
        state: item.state || '',
        district: item.district || '',
        variety: item.variety || '',
        price: item.modal_price ? `₹${item.modal_price}` : 'N/A',
        minPrice: item.min_price ? `₹${item.min_price}` : 'N/A',
        maxPrice: item.max_price ? `₹${item.max_price}` : 'N/A',
        arrivalDate: item.arrival_date || '',
        timestamp: item.timestamp || ''
      })).sort((a, b) => {
        // Sort by price in descending order
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    }
    
    return getMockData(crop);
    
  } catch (error) {
    console.error('Error fetching market data:', error);
    return getMockData(crop);
  }
};

// Fallback mock data in case API fails
const getMockData = (crop) => {
  const mockData = {
    'wheat': [
      { id: 1, mandi: 'Azadpur Mandi, Delhi', price: '₹2,150', state: 'Delhi', district: 'North West Delhi', variety: 'Sharbati', minPrice: '₹2,100', maxPrice: '₹2,200', arrivalDate: new Date().toISOString().split('T')[0], trend: 'up', priceChange: '+2.4%' },
      { id: 2, mandi: 'Lasalgaon APMC, Nashik', price: '₹2,080', state: 'Maharashtra', district: 'Nashik', variety: 'Lokwan', minPrice: '₹2,050', maxPrice: '₹2,110', arrivalDate: new Date().toISOString().split('T')[0], trend: 'down', priceChange: '-1.2%' },
    ],
    'rice': [
      { id: 1, mandi: 'Khanna Mandi, Punjab', price: '₹1,950', state: 'Punjab', district: 'Ludhiana', variety: 'Pusa Basmati', minPrice: '₹1,900', maxPrice: '₹2,000', arrivalDate: new Date().toISOString().split('T')[0], trend: 'up', priceChange: '+1.8%' },
      { id: 2, mandi: 'Chandigarh Grain Market', price: '₹2,010', state: 'Chandigarh', district: 'Chandigarh', variety: '1121 Basmati', minPrice: '₹1,980', maxPrice: '₹2,050', arrivalDate: new Date().toISOString().split('T')[0], trend: 'neutral', priceChange: '0.0%' },
    ],
    'maize': [
      { id: 1, mandi: 'Nizamabad, Telangana', price: '₹1,850', state: 'Telangana', district: 'Nizamabad', variety: 'Hybrid', minPrice: '₹1,800', maxPrice: '₹1,900', arrivalDate: new Date().toISOString().split('T')[0], trend: 'up', priceChange: '+3.1%' },
    ],
    'soybean': [
      { id: 1, mandi: 'Indore APMC, MP', price: '₹3,450', state: 'Madhya Pradesh', district: 'Indore', variety: 'JS-9560', minPrice: '₹3,400', maxPrice: '₹3,500', arrivalDate: new Date().toISOString().split('T')[0], trend: 'down', priceChange: '-0.8%' },
    ],
    'mustard': [
      { id: 1, mandi: 'Alwar, Rajasthan', price: '₹5,200', state: 'Rajasthan', district: 'Alwar', variety: 'Pusa Bold', minPrice: '₹5,100', maxPrice: '₹5,300', arrivalDate: new Date().toISOString().split('T')[0], trend: 'up', priceChange: '+2.1%' },
    ],
    'potato': [
      { id: 1, mandi: 'Agra Mandi, UP', price: '₹800', state: 'Uttar Pradesh', district: 'Agra', variety: 'Pukhraj', minPrice: '₹750', maxPrice: '₹850', arrivalDate: new Date().toISOString().split('T')[0], trend: 'down', priceChange: '-1.5%' },
    ],
    'onion': [
      { id: 1, mandi: 'Lasalgaon APMC, Nashik', price: '₹1,200', state: 'Maharashtra', district: 'Nashik', variety: 'Nashik Red', minPrice: '₹1,150', maxPrice: '₹1,250', arrivalDate: new Date().toISOString().split('T')[0], trend: 'up', priceChange: '+4.2%' },
    ]
  };
  
  return mockData[crop] || [];
};

// Coordinates of major mandis in India (latitude, longitude)
const mandiLocations = {
  'Azadpur Mandi, Delhi': { lat: 28.7041, lng: 77.1025 },
  'Lasalgaon APMC, Nashik': { lat: 20.1507, lng: 74.1841 },
  'Khanna Mandi, Punjab': { lat: 30.7046, lng: 76.7179 },
  'Chandigarh Grain Market': { lat: 30.7333, lng: 76.7794 },
  'Nizamabad, Telangana': { lat: 18.6725, lng: 78.0941 },
  'Indore APMC, MP': { lat: 22.7196, lng: 75.8577 },
  'Alwar, Rajasthan': { lat: 27.5667, lng: 76.6167 },
  'Agra Mandi, UP': { lat: 27.1767, lng: 78.0081 },
};

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos((lat1 * Math.PI / 180)) * Math.cos((lat2 * Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in km
};

const HomePage = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [marketPrices, setMarketPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const crops = [
    // Cereals
    { category: 'Cereals', options: [
      { id: 'wheat', name: 'Wheat' },
      { id: 'rice', name: 'Rice' },
      { id: 'maize', name: 'Maize' },
      { id: 'bajra', name: 'Bajra' },
      { id: 'jowar', name: 'Jowar' }
    ]},
    
    // Pulses
    { category: 'Pulses', options: [
      { id: 'arhar', name: 'Arhar' },
      { id: 'moong', name: 'Moong' },
      { id: 'urad', name: 'Urad' },
      { id: 'gram', name: 'Gram' }
    ]},
    
    // Oilseeds
    { category: 'Oilseeds', options: [
      { id: 'mustard', name: 'Mustard' },
      { id: 'groundnut', name: 'Groundnut' },
      { id: 'soybean', name: 'Soybean' },
      { id: 'sunflower', name: 'Sunflower' }
    ]},
    
    // Vegetables
    { category: 'Vegetables', options: [
      { id: 'potato', name: 'Potato' },
      { id: 'onion', name: 'Onion' },
      { id: 'tomato', name: 'Tomato' },
      { id: 'brinjal', name: 'Brinjal' }
    ]},
    
    // Fruits
    { category: 'Fruits', options: [
      { id: 'banana', name: 'Banana' },
      { id: 'mango', name: 'Mango' },
      { id: 'orange', name: 'Orange' },
      { id: 'apple', name: 'Apple' }
    ]}
  ];
  
  // Flatten the array for the dropdown
  const allCrops = crops.flatMap(group => group.options);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('Unable to retrieve your location. Showing unsorted results.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser. Showing unsorted results.');
    }
  }, []);

  // Fetch market prices when selected crop changes or user location updates
  useEffect(() => {
    const fetchPrices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let prices = await fetchMarketPrices(selectedCrop);
        
        // Sort by distance if we have user location
        if (userLocation) {
          prices = prices.map(price => {
            const mandiLocation = mandiLocations[price.mandi];
            let distance = null;
            
            if (mandiLocation) {
              distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                mandiLocation.lat,
                mandiLocation.lng
              );
            }
            
            return {
              ...price,
              distance: distance ? `${distance.toFixed(1)} km` : 'N/A',
              sortDistance: distance || Infinity
            };
          }).sort((a, b) => a.sortDistance - b.sortDistance);
        }
        
        setMarketPrices(prices);
      } catch (err) {
        setError('Failed to fetch market prices');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrices();
  }, [selectedCrop, userLocation]);

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header />
      <div className="p-4 space-y-4">
        {/* Crop Selector */}
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Crop</h3>
          <div className="relative">
            <select
              value={selectedCrop}
              onChange={handleCropChange}
              className="w-full p-3 border rounded-lg appearance-none bg-white pl-3 pr-8 text-gray-800 font-medium"
            >
              {crops.map((group, index) => (
                <optgroup key={index} label={group.category}>
                  {group.options.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Market Prices */}
        <div className="card p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              {crops.find(c => c.id === selectedCrop)?.name} Prices
            </h3>
            <span className="text-xs text-gray-500">Per Quintal</span>
          </div>
          
          {isLoading ? (
            <div className="py-8 text-center text-gray-500">Loading prices...</div>
          ) : error ? (
            <div className="py-4 text-center text-red-500">{error}</div>
          ) : marketPrices.length > 0 ? (
            <div className="space-y-3">
              {marketPrices.map((item) => (
                <div key={item.id} className="py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="bg-white rounded-lg shadow-md p-4 w-full">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">{item.mandi}</h3>
                              {item.distance && item.distance !== 'N/A' && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                  {item.distance} away
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{item.district}, {item.state}</p>
                            <p className="text-gray-600 text-sm">Variety: {item.variety}</p>
                            <div className="mt-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.trend === 'up' ? 'bg-green-100 text-green-800' : 
                                item.trend === 'down' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.trend === 'up' ? (
                                  <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                    <path d="M2.5 0L0 4h5L2.5 0z" />
                                  </svg>
                                ) : item.trend === 'down' ? (
                                  <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                                    <path d="M2.5 8L0 4h5l-2.5 4z" />
                                  </svg>
                                ) : (
                                  <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-gray-400" fill="currentColor" viewBox="0 0 8 8">
                                    <path d="M8 4L4 0 0 4h8z" />
                                    <path d="M0 4l4 4 4-4H0z" />
                                  </svg>
                                )}
                                {item.priceChange || 'N/A'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-green-600">{item.price}</p>
                            <p className="text-sm text-gray-500">Min: {item.minPrice} | Max: {item.maxPrice}</p>
                            <p className="text-xs text-gray-400">Arrival: {item.arrivalDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">No price data available</div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Trends</h3>
          <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Price chart will be displayed here
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            View detailed price trends and analysis for better decision making
          </p>
        </div>

        <button 
          onClick={() => onNavigate('alerts')}
          className="w-full bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Bell size={18} /> {t('setPriceAlert') || 'Set Price Alert'}
        </button>
      </div>
      <ChatInput />
      <Navbar active="home" onNavigate={onNavigate} />
    </div>
  )
}

export default HomePage