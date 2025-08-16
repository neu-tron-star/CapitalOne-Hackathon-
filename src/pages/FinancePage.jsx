import { useLanguage } from '../context/LanguageContext'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ChatInput from '../components/ChatInput'
import dummyData from '../data/dummyData'

const FinancePage = ({ onNavigate }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <Header />
      <div className="p-4 space-y-4">
        <div className="rounded-2xl p-4 text-white gradient-green shadow-soft">
          <span className="pill bg-white/20">Rs {t('subsidies').toUpperCase()}</span>
          <h3 className="text-lg font-bold mt-1">{t('pmKisan')}</h3>
          <p className="text-sm opacity-95">₹6,000 {t('annualSupport')}</p>
          <button className="mt-4 bg-white text-green-600 font-bold py-2 px-4 rounded-xl">
            {t('applyNow')}
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-800">{t('quickTools')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4">
            <h4 className="font-semibold">{t('loanCalculator')}</h4>
            <p className="text-xs text-gray-500">{t('calculateEMI')}</p>
          </div>
          <div className="card p-4">
            <h4 className="font-semibold">{t('subsidyFinder')}</h4>
            <p className="text-xs text-gray-500">{t('findSubsidies')}</p>
          </div>
        </div>

        <div className="flex justify-around text-sm">
          {['all', 'loans', 'subsidies', 'insurance'].map((key) => (
            <button key={key} className="text-gray-500 p-2">
              {t(key)}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {dummyData.schemes.map(s => (
            <div key={s.id} className="card p-4 flex items-center justify-between">
              <div>
                <div className="flex gap-2 mb-1">
                  <span className="pill bg-gray-100 text-gray-700">{s.tag}</span>
                  <span className={`pill ${
                    s.status === 'OPEN' ? 'bg-green-100 text-green-700' : 
                    s.status === 'CLOSING SOON' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {t(s.status.toLowerCase().replace(' ', ''))}
                  </span>
                </div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-sm text-gray-600">{s.description}</p>
                {s.deadline && (
                  <p className="text-xs text-gray-500 mt-1">
                    {t('deadline')}: {s.deadline}
                  </p>
                )}
              </div>
              <div className="text-gray-400">›</div>
            </div>
          ))}
        </div>
      </div>
      <ChatInput />
      <Navbar active="finance" onNavigate={onNavigate} />
    </div>
  )
}

export default FinancePage