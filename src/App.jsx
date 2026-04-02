import { useState, useCallback } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ToastContainer from './components/Toast'
import RenewModal from './components/RenewModal'
import Dashboard from './pages/Dashboard'
import Policy from './pages/Policy'
import Claims from './pages/Claims'
import Triggers from './pages/Triggers'
import Admin from './pages/Admin'
import Fraud from './pages/Fraud'
import Workers from './pages/Workers'
import Onboarding from './pages/Onboarding'

function AppShell() {
  const { activePage, toast } = useApp()

  const simulateAlert = useCallback(() => {
    // We pass this down via a global ref or event — see Triggers page
    window.__gigshieldSimulate?.()
    toast('⚡ DISRUPTION ALERT — 33mm/hr rainfall detected in Koramangala! Claims pipeline firing…', 'warning')
    setTimeout(() => toast('💸 47 workers matched · Fraud checks running…', 'default'), 1500)
    setTimeout(() => toast('✅ 44 claims auto-approved · 3 flagged · Payouts initiating via Razorpay', 'success'), 3500)
  }, [toast])

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Topbar onSimulateAlert={simulateAlert} />
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'policy' && <Policy />}
        {activePage === 'claims' && <Claims />}
        {activePage === 'triggers' && <Triggers simulateAlert={simulateAlert} />}
        {activePage === 'admin' && <Admin />}
        {activePage === 'fraud' && <Fraud />}
        {activePage === 'workers' && <Workers />}
        {activePage === 'onboard' && <Onboarding />}
      </main>
      <RenewModal />
      <ToastContainer />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
