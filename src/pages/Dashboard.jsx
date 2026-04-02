import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { navigate } = useApp()

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Good evening, Arjun 👋</h2>
        <p>Your income is protected this week. Here's your coverage snapshot.</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Weekly Premium</div>
          <div className="stat-value">₹52</div>
          <div className="stat-change up">↓ ₹7 below base · monsoon low-risk week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Protected This Week</div>
          <div className="stat-value">₹600</div>
          <div className="stat-change neutral">Standard tier · 2 events max</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Payouts Received</div>
          <div className="stat-value">₹1,350</div>
          <div className="stat-change up">↑ 3 successful claims this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Since</div>
          <div className="stat-value">22<span style={{ fontSize: '14px', fontWeight: 400 }}> wks</span></div>
          <div className="stat-change neutral">Tenure discount: ₹8/week</div>
        </div>
      </div>

      <div className="grid-2-1 mb-20">
        {/* Coverage Card */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">This Week's Coverage</span>
            <span className="coverage-pill">🟢 Active</span>
          </div>
          <div className="card-body">
            <div className="payout-card mb-20" style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Maximum Payout Available</div>
              <div style={{ fontSize: '40px', fontFamily: "'Syne',sans-serif", fontWeight: 800, letterSpacing: '-2px', color: 'var(--accent-2)' }}>₹600</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Standard Tier · Resets Monday 00:00</div>
              <div style={{ marginTop: '14px' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '6px' }}>Events used this week</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1, height: '6px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)' }}>
                    <div style={{ width: '50%', height: '100%', background: 'var(--accent-2)', borderRadius: '10px' }}></div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>1 of 2 events used</div>
              </div>
            </div>

            <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>Covered Triggers</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { icon: '🌧', label: 'Heavy Rainfall', sub: '>25mm/hr', badge: 'Live', badgeClass: 'badge-success' },
                { icon: '🌫', label: 'Severe AQI', sub: '>300', badge: 'Live', badgeClass: 'badge-success' },
                { icon: '🥵', label: 'Extreme Heat', sub: '>44°C', badge: 'Live', badgeClass: 'badge-success' },
                { icon: '🚫', label: 'Curfew / Bandh', sub: null, badge: 'Mocked', badgeClass: 'badge-info' },
                { icon: '📵', label: 'Platform Outage', sub: null, badge: 'Mocked', badgeClass: 'badge-info' },
              ].map(t => (
                <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', background: 'var(--surface)', borderRadius: '8px', fontSize: '13px' }}>
                  <span>{t.icon} {t.label} {t.sub && <span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{t.sub}</span>}</span>
                  <span className={`badge ${t.badgeClass}`}>{t.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Zone Map */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">Your Zone</span>
              <span className="badge badge-neutral">Koramangala</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div className="zone-map">
                <div className="zone-map-grid"></div>
                <div className="zone-pin" style={{ left: '45%', top: '40%' }}>📍</div>
                <div className="zone-label" style={{ left: '50%', top: '42%', transform: 'translateX(-50%)' }}>Koramangala</div>
                <div className="zone-pin" style={{ left: '20%', top: '60%', animationDelay: '0.5s', opacity: 0.5 }}>📍</div>
                <div className="zone-label" style={{ left: '18%', top: '72%', fontSize: '10px', opacity: 0.6 }}>BTM</div>
                <div className="zone-pin" style={{ left: '70%', top: '55%', animationDelay: '1s', opacity: 0.5 }}>📍</div>
                <div className="zone-label" style={{ left: '70%', top: '67%', fontSize: '10px', opacity: 0.6 }}>Indiranagar</div>
                <div className="zone-alert-pulse" style={{ left: 'calc(45% - 25px)', top: 'calc(40% - 25px)' }}></div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }}></span>
                Monitoring active in 3 zones
              </div>
            </div>
          </div>

          {/* Premium Breakdown */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">This Week's Premium</span>
              <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: 'var(--accent)' }}>₹52</span>
            </div>
            <div className="card-body" style={{ paddingTop: '14px' }}>
              <div className="premium-breakdown">
                <div className="pb-row"><span className="pb-label">Standard tier base</span><span className="pb-value">₹59</span></div>
                <div className="pb-row"><span className="pb-label">Zone risk (low-risk)</span><span className="pb-value pb-deduct">− ₹4</span></div>
                <div className="pb-row"><span className="pb-label">Forecast (clear week)</span><span className="pb-value pb-deduct">− ₹7</span></div>
                <div className="pb-row"><span className="pb-label">Tenure discount (22wks)</span><span className="pb-value pb-deduct">− ₹8</span></div>
                <div className="pb-row"><span className="pb-label">Predictive uplift</span><span className="pb-value pb-add">+ ₹2</span></div>
                <div className="pb-row total"><span>This week</span><span className="pb-total-value">₹52</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Recent Activity</span>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('claims')}>View all →</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="activity-feed" style={{ padding: '0 22px' }}>
            <div className="activity-item">
              <div className="activity-dot" style={{ background: '#16a34a' }}></div>
              <div className="activity-content">
                <div className="activity-title">Rainfall payout — Koramangala zone</div>
                <div className="activity-meta">Trigger: 31mm/hr · Tue Mar 28 · Auto-approved in 47 sec</div>
              </div>
              <div className="activity-amount" style={{ color: '#16a34a' }}>+₹300</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot" style={{ background: '#3b82f6' }}></div>
              <div className="activity-content">
                <div className="activity-title">Weekly premium auto-deducted</div>
                <div className="activity-meta">Standard tier · Week of Mar 25 · UPI auto-pay</div>
              </div>
              <div className="activity-amount" style={{ color: '#3b82f6' }}>−₹52</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot" style={{ background: '#16a34a' }}></div>
              <div className="activity-content">
                <div className="activity-title">AQI payout — Bengaluru city-wide</div>
                <div className="activity-meta">Trigger: AQI 324 · Mon Mar 24 · Auto-approved in 1 min 12 sec</div>
              </div>
              <div className="activity-amount" style={{ color: '#16a34a' }}>+₹300</div>
            </div>
            <div className="activity-item">
              <div className="activity-dot" style={{ background: '#f59e0b' }}></div>
              <div className="activity-content">
                <div className="activity-title">Policy renewed — Week of Mar 25</div>
                <div className="activity-meta">Standard tier · Auto-renewed · Sunday 10:05 PM</div>
              </div>
              <div className="activity-amount" style={{ color: 'var(--ink-muted)' }}>₹52</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
