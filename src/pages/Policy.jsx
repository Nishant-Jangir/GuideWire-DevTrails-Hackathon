import { useState } from 'react'
import { useApp } from '../context/AppContext'

const ALL_ZONES = ['Koramangala', 'BTM Layout', 'Indiranagar', 'HSR Layout', 'Jayanagar', 'Whitefield', 'Hebbal', 'Yelahanka']

export default function Policy() {
  const { toast } = useApp()
  const [selectedTier, setSelectedTier] = useState('standard')
  const [selectedZones, setSelectedZones] = useState(['Koramangala', 'BTM Layout', 'Indiranagar'])
  const [autoRenew, setAutoRenew] = useState(true)

  const handleTier = (tier) => {
    setSelectedTier(tier)
    toast(`Tier changed to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`, 'default')
  }

  const toggleZone = (zone) => {
    if (selectedZones.includes(zone)) {
      if (selectedZones.length <= 1) { toast('Keep at least 1 zone selected', 'warning'); return }
      setSelectedZones(prev => prev.filter(z => z !== zone))
    } else {
      if (selectedZones.length >= 3) { toast('Maximum 3 zones allowed', 'warning'); return }
      setSelectedZones(prev => [...prev, zone])
    }
  }

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>My Policy</h2>
        <p>Manage your coverage tier, zones, and renewal settings.</p>
      </div>

      <div className="grid-2 mb-20">
        <div className="card">
          <div className="card-header">
            <span className="card-title">Current Plan</span>
            <span className="badge badge-success">Active · Week 22</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'linear-gradient(135deg,#fff8f5,var(--white))', border: '1.5px solid var(--accent)', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ fontSize: '40px' }}>🥈</div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '20px', fontWeight: 800 }}>Standard</div>
                <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '2px' }}>Max ₹600/event · 2 events/week</div>
                <div style={{ fontSize: '22px', fontWeight: 800, fontFamily: "'Syne',sans-serif", color: 'var(--accent)', marginTop: '4px' }}>₹52 <span style={{ fontSize: '13px', color: 'var(--ink-muted)', fontWeight: 400 }}>/ this week</span></div>
              </div>
            </div>

            {/* Tier Grid */}
            <div className="tier-grid" style={{ marginBottom: '16px' }}>
              {[
                { id: 'basic', name: 'Basic', price: '₹39', payout: 'Max ₹300/event', events: '1 event/week', badge: null },
                { id: 'standard', name: 'Standard', price: '₹59', payout: 'Max ₹600/event', events: '2 events/week', badge: 'Current' },
                { id: 'premium', name: 'Premium', price: '₹89', payout: 'Max ₹1,000/event', events: '3 events/week', badge: 'Best', badgeStyle: { background: 'var(--accent-2)', color: 'var(--ink)' } },
              ].map(t => (
                <div key={t.id} className={`tier-card${selectedTier === t.id ? ' selected' : ''}`} onClick={() => handleTier(t.id)}>
                  {t.badge && <div className="tier-badge" style={t.badgeStyle}>{t.badge}</div>}
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-price">{t.price}<span>/wk</span></div>
                  <div className="tier-payout">{t.payout}</div>
                  <div className="tier-events">{t.events}</div>
                </div>
              ))}
            </div>

            <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '10px' }}>Active Zones ({selectedZones.length}/3)</div>
            <div className="zone-chips">
              {ALL_ZONES.map(z => (
                <div key={z} className={`zone-chip${selectedZones.includes(z) ? ' selected' : ''}`} onClick={() => toggleZone(z)}>{z}</div>
              ))}
            </div>

            <div className="divider"></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="toggle" onClick={() => setAutoRenew(p => !p)}>
                <div className={`toggle-track${autoRenew ? ' on' : ''}`}><div className="toggle-thumb"></div></div>
                <span className="toggle-label">Auto-renew each Sunday</span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => toast('Changes saved!', 'success')}>Save Changes</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Risk Profile */}
          <div className="card">
            <div className="card-header"><span className="card-title">Risk Profile</span><span className="badge badge-info">AI Generated</span></div>
            <div className="card-body">
              <div className="risk-factors">
                <div className="risk-factor">
                  <div className="rf-label">Zone Risk</div>
                  <div className="rf-value" style={{ color: '#22c55e' }}>Low</div>
                  <div className="rf-sub">Koramangala historically low flood</div>
                </div>
                <div className="risk-factor">
                  <div className="rf-label">Forecast</div>
                  <div className="rf-value" style={{ color: '#22c55e' }}>Clear</div>
                  <div className="rf-sub">18% trigger probability next 7 days</div>
                </div>
                <div className="risk-factor">
                  <div className="rf-label">Tenure</div>
                  <div className="rf-value" style={{ color: '#3b82f6' }}>22 wks</div>
                  <div className="rf-sub">₹8/wk discount applied</div>
                </div>
                <div className="risk-factor">
                  <div className="rf-label">Fraud Score</div>
                  <div className="rf-value" style={{ color: '#22c55e' }}>Clean</div>
                  <div className="rf-sub">0 flagged claims ever</div>
                </div>
              </div>
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--ink-muted)' }}>Overall Risk Score</span>
                  <span style={{ fontWeight: 600 }}>12 / 100 (Very Low)</span>
                </div>
                <div className="risk-bar"><div className="risk-fill risk-low" style={{ width: '12%' }}></div></div>
              </div>
            </div>
          </div>

          {/* Policy History */}
          <div className="card">
            <div className="card-header"><span className="card-title">Policy History</span></div>
            <div className="card-body" style={{ paddingTop: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { week: 'Week 22 (Current)', right: <span className="badge badge-success">Active</span> },
                  { week: 'Week 21 · ₹52', right: <span style={{ color: '#16a34a', fontSize: '12px' }}>1 payout +₹300</span> },
                  { week: 'Week 20 · ₹55', right: <span style={{ color: '#16a34a', fontSize: '12px' }}>1 payout +₹300</span> },
                  { week: 'Week 19 · ₹40', right: <span style={{ color: 'var(--ink-muted)', fontSize: '12px' }}>No disruptions</span> },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', padding: '8px 10px', borderRadius: '8px', background: i === 0 ? 'var(--surface)' : '' }}>
                    <span>{row.week}</span>{row.right}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
