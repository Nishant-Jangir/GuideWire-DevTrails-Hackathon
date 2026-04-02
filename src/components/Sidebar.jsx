import { useApp } from '../context/AppContext'

const NAV_ITEMS = [
  { section: 'Worker', items: [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'policy', icon: '📋', label: 'My Policy' },
    { id: 'claims', icon: '💸', label: 'Claims & Payouts', badge: 2 },
    { id: 'triggers', icon: '⚡', label: 'Live Triggers' },
  ]},
  { section: 'Admin', items: [
    { id: 'admin', icon: '🏛️', label: 'Insurer Dashboard' },
    { id: 'fraud', icon: '🔍', label: 'Fraud Queue', badge: 3 },
    { id: 'workers', icon: '👥', label: 'All Workers' },
  ]},
  { section: 'Setup', items: [
    { id: 'onboard', icon: '✨', label: 'New Onboarding' },
  ]},
]

export default function Sidebar() {
  const { activePage, navigate } = useApp()

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-icon">🛡️</div>
          <div>
            <div className="logo-text">GigShield</div>
            <div className="logo-sub">Income Protection Platform</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(group => (
          <div key={group.section}>
            <div className="nav-section-label">{group.section}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`nav-item${activePage === item.id ? ' active' : ''}`}
                onClick={() => navigate(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="worker-card" onClick={() => navigate('dashboard')}>
          <div className="worker-avatar">AK</div>
          <div style={{ flex: 1 }}>
            <div className="worker-name">Arjun Kumar</div>
            <div className="worker-status">
              <div className="status-dot"></div>
              Policy Active
            </div>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>↗</span>
        </div>
      </div>
    </aside>
  )
}
