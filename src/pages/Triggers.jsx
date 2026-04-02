import { useState } from 'react'
import { useApp } from '../context/AppContext'

const INITIAL_TRIGGERS = [
  { id: 'rain', icon: '🌧', name: 'Rainfall', value: '8', unit: 'mm/hr', threshold: '>25mm/hr', progress: 32, progressColor: '#22c55e', source: 'OpenWeatherMap', status: 'safe', badge: 'Safe', badgeClass: 'badge-success', isMocked: false },
  { id: 'aqi', icon: '🌫', name: 'Air Quality (AQI)', value: '142', unit: '', threshold: '>300 AQI', progress: 47, progressColor: '#22c55e', source: 'OpenAQ / WAQI', status: 'safe', badge: 'Safe', badgeClass: 'badge-success', isMocked: false },
  { id: 'heat', icon: '🥵', name: 'Heat Index', value: '38', unit: '°C', threshold: '>44°C feels-like', progress: 58, progressColor: '#f59e0b', source: 'OpenWeatherMap', status: 'safe', badge: 'Safe', badgeClass: 'badge-success', isMocked: false },
  { id: 'curfew', icon: '🚫', name: 'Curfew / Bandh', value: 'No Alert', unit: '', threshold: 'Government alert feed', progress: null, progressColor: null, source: 'Mock alert API', status: 'safe', badge: 'Mocked', badgeClass: 'badge-info', isMocked: true },
  { id: 'outage', icon: '📵', name: 'Platform Outage', value: '2', unit: '%', threshold: '>70% assign fail', progress: 2, progressColor: '#22c55e', source: 'Mock Swiggy API', status: 'safe', badge: 'Mocked', badgeClass: 'badge-info', isMocked: true },
]

export default function Triggers({ simulateAlert }) {
  const { toast } = useApp()
  const [triggers, setTriggers] = useState(INITIAL_TRIGGERS)

  // Expose simulate to global for topbar button
  window.__gigshieldSimulate = () => {
    setTriggers(prev => prev.map((t, i) => {
      if (i === 0) return { ...t, status: 'alert', badge: '⚡ FIRING', badgeClass: 'badge-danger', value: '33', progress: 100, progressColor: '#ef4444' }
      return t
    }))
    setTimeout(() => {
      setTriggers(prev => prev.map((t, i) => {
        if (i === 0) return { ...t, status: 'warning', badge: 'Subsiding', badgeClass: 'badge-warning' }
        return t
      }))
    }, 6000)
  }

  const handleSimulate = () => {
    simulateAlert()
  }

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Live Trigger Monitor</h2>
        <p>Real-time monitoring across all 5 disruption sources. Checks every 5 minutes.</p>
      </div>

      <div className="card mb-20">
        <div className="card-header">
          <span className="card-title">Current Conditions — Bengaluru · Koramangala</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--ink-muted)' }}>
            <div className="status-dot"></div>
            Last checked 2 min ago
          </div>
        </div>
        <div className="card-body">
          <div className="trigger-grid">
            {triggers.map(t => (
              <div key={t.id} className={`trigger-card ${t.status}`}>
                <div className="trigger-status"><span className={`badge ${t.badgeClass}`}>{t.badge}</span></div>
                <span className="trigger-icon">{t.icon}</span>
                <div className="trigger-name">{t.name}</div>
                <div className="trigger-value">{t.value}{t.unit && <span style={{ fontSize: '14px', fontWeight: 500 }}>{t.unit}</span>}</div>
                <div className="trigger-threshold">Trigger at {t.threshold}</div>
                {t.progress !== null && (
                  <div className="progress-bar" style={{ marginTop: '8px' }}>
                    <div className="progress-fill" style={{ width: `${t.progress}%`, background: t.progressColor }}></div>
                  </div>
                )}
                <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: t.progress !== null ? '4px' : '12px' }}>Source: {t.source}</div>
              </div>
            ))}

            {/* Simulate card */}
            <div className="trigger-card safe" style={{ borderStyle: 'dashed', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }} onClick={handleSimulate}>
              <div style={{ textAlign: 'center', color: 'var(--ink-muted)' }}>
                <div style={{ fontSize: '28px', marginBottom: '6px' }}>⚡</div>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Simulate Disruption</div>
                <div style={{ fontSize: '11px', marginTop: '2px' }}>Click to trigger demo alert</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trigger Log */}
      <div className="card">
        <div className="card-header"><span className="card-title">Trigger Log (Last 7 Days)</span></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Timestamp</th><th>Type</th><th>Value</th><th>Zone</th><th>Workers Affected</th><th>Total Payout</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Mar 28 · 14:14</td><td>🌧 Rainfall</td><td>31mm/hr</td><td>Koramangala</td><td>47</td><td>₹14,100</td><td><span className="badge badge-success">Settled</span></td></tr>
              <tr><td>Mar 24 · 09:32</td><td>🌫 AQI</td><td>AQI 324</td><td>City-wide</td><td>210</td><td>₹63,000</td><td><span className="badge badge-success">Settled</span></td></tr>
              <tr><td>Mar 18 · 17:55</td><td>🌧 Rainfall</td><td>28mm/hr</td><td>BTM Layout</td><td>38</td><td>₹11,400</td><td><span className="badge badge-success">Settled</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
