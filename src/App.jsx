import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import SplashScreen from './pages/SplashScreen'
import LanguageSelector from './pages/LanguageSelector'
import HomePage from './pages/HomePage'
import AlertsPage from './pages/AlertsPage'
import FinancePage from './pages/FinancePage'
import WeatherPage from './pages/WeatherPage'

const AppContent = () => {
  const [stage, setStage] = useState('splash')
  const [page, setPage] = useState('home')

  if (stage === 'splash') {
    return <SplashScreen onContinue={() => setStage('language')} />
  }
  if (stage === 'language') {
    return <LanguageSelector onNext={() => setStage('app')} />
  }

  switch (page) {
    case 'home': return <HomePage onNavigate={setPage} />
    case 'alerts': return <AlertsPage onNavigate={setPage} />
    case 'finance': return <FinancePage onNavigate={setPage} />
    case 'weather': return <WeatherPage onNavigate={setPage} />
    default: return <HomePage onNavigate={setPage} />
  }
}

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App