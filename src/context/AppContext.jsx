import { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activePage, setActivePage] = useState('dashboard')
  const [toasts, setToasts] = useState([])
  const [renewModalOpen, setRenewModalOpen] = useState(false)

  const PAGE_TITLES = {
    dashboard: ['Worker Dashboard', 'Bengaluru · Koramangala Zone · Week of Apr 1, 2026'],
    policy: ['My Policy', 'Manage coverage, zones, and renewal'],
    claims: ['Claims & Payouts', 'Automated claim pipeline and payout history'],
    triggers: ['Live Trigger Monitor', '5 disruption sources · Checking every 5 minutes'],
    admin: ['Insurer Dashboard', 'Platform-wide analytics and exposure'],
    fraud: ['Fraud Detection Queue', 'Phase 2 checks active · Phase 3 ML coming next'],
    workers: ['Worker Registry', '1,847 active policyholders'],
    onboard: ['New Worker Onboarding', 'AI-assisted · Under 3 minutes to active policy'],
  }

  const navigate = useCallback((page) => {
    setActivePage(page)
  }, [])

  const toast = useCallback((message, type = 'default') => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, removing: true } : t))
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 300)
    }, 3500)
  }, [])

  const openRenewModal = useCallback(() => setRenewModalOpen(true), [])
  const closeRenewModal = useCallback(() => setRenewModalOpen(false), [])

  const topbarInfo = PAGE_TITLES[activePage] || ['GigShield', '']

  return (
    <AppContext.Provider value={{
      activePage,
      navigate,
      toast,
      topbarInfo,
      toasts,
      renewModalOpen,
      openRenewModal,
      closeRenewModal,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
