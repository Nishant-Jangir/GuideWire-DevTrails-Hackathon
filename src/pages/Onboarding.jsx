import { useState } from 'react'
import { useApp } from '../context/AppContext'

const ZONES = ['Koramangala', 'BTM Layout', 'Indiranagar', 'HSR Layout', 'Jayanagar', 'Whitefield', 'Electronic City', 'Marathahalli', 'Hebbal']

export default function Onboarding() {
  const { navigate, toast } = useApp()
  const [step, setStep] = useState(2)
  const [selectedTier, setSelectedTier] = useState('standard')
  const [selectedZones, setSelectedZones] = useState(['Koramangala', 'BTM Layout'])
  const [completed, setCompleted] = useState(false)

  const advanceOnboard = (s) => setStep(s)

  const toggleZone = (zone) => {
    if (selectedZones.includes(zone)) {
      if (selectedZones.length <= 1) { toast('Keep at least 1 zone selected', 'warning'); return }
      setSelectedZones(prev => prev.filter(z => z !== zone))
    } else {
      if (selectedZones.length >= 3) { toast('Maximum 3 zones allowed', 'warning'); return }
      setSelectedZones(prev => [...prev, zone])
    }
  }

  const handleTier = (t) => {
    setSelectedTier(t)
    toast(`Tier changed to ${t.charAt(0).toUpperCase() + t.slice(1)}`, 'default')
  }

  const completeOnboard = () => {
    setCompleted(true)
    toast('🎉 Policy activated! Coverage starts Monday', 'success')
  }

  const stepStatus = (s) => {
    if (s < step) return 'done'
    if (s === step) return 'active'
    return ''
  }

  const STEPS = [
    { num: 1, label: 'Verify' },
    { num: 2, label: 'Profile' },
    { num: 3, label: 'Zones' },
    { num: 4, label: 'Pick Tier' },
    { num: 5, label: 'Pay & Go' },
  ]

  const AI_HINTS = {
    2: 'Phone verified ✅ Now let\'s build your profile. This takes about 90 seconds and helps us calculate your accurate weekly premium.',
    3: 'Select 2–3 zones where you work most. Your coverage only activates when a disruption is detected in your registered zones.',
    4: 'Based on your ₹600–900/day earnings and Koramangala zone, I recommend Standard tier. It covers your most likely disruption scenario at ₹52 this week.',
    5: 'You\'re nearly there! Pay your first week\'s premium to activate coverage from this Monday.',
  }

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Worker Onboarding</h2>
        <p>Target: Under 3 minutes from phone number to active policy.</p>
      </div>

      <div className="card" style={{ maxWidth: '680px' }}>
        <div className="card-header">
          <span className="card-title">New Worker Registration</span>
          <span className="badge badge-info">AI-Assisted</span>
        </div>
        <div className="card-body">
          {/* Stepper */}
          <div className="steps mb-20">
            {STEPS.map((s, i) => (
              <>
                <div key={s.num} className={`step ${stepStatus(s.num)}`}>
                  <div className="step-dot">{stepStatus(s.num) === 'done' ? '✓' : s.num}</div>
                  <div className="step-label">{s.label}</div>
                </div>
                {i < STEPS.length - 1 && <div key={`line-${s.num}`} className="step-line"></div>}
              </>
            ))}
          </div>

          {completed ? (
            <div style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🛡️</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>You're covered!</div>
              <div style={{ fontSize: '14px', color: 'var(--ink-muted)', marginBottom: '20px' }}>Policy active from Monday 00:00 IST<br />₹600 max payout · Koramangala + BTM zones</div>
              <div style={{ background: 'var(--ink)', color: 'white', borderRadius: '12px', padding: '14px 20px', fontSize: '14px', marginBottom: '20px' }}>
                "Heavy rain in your zone. ₹300 sent to arjun@oksbi."
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}> ← This is what payout looks like</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('dashboard')}>Go to Dashboard →</button>
            </div>
          ) : (
            <>
              {/* AI Hint */}
              {step >= 2 && step <= 5 && (
                <div style={{ background: 'var(--surface)', borderRadius: '12px', padding: '14px 16px', marginBottom: '18px', fontSize: '13.5px', color: 'var(--ink-muted)', borderLeft: '3px solid var(--accent)' }}>
                  <strong style={{ color: 'var(--ink)' }}>GigShield AI:</strong> &quot;{AI_HINTS[step]}&quot;
                </div>
              )}

              {/* Step 2: Profile */}
              {step === 2 && (
                <div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name <span>*</span></label>
                      <input className="form-input" type="text" defaultValue="Arjun Kumar" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">UPI ID <span>*</span></label>
                      <input className="form-input" type="text" defaultValue="arjun@oksbi" />
                      <div className="form-hint">💳 Payouts go here instantly. Double-check this.</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Platform <span>*</span></label>
                      <select className="form-select">
                        <option>Swiggy</option><option>Zomato</option><option>Both</option><option>Amazon</option><option>Flipkart</option><option>Zepto</option><option>Blinkit</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Avg. Daily Earnings</label>
                      <select className="form-select">
                        <option>₹400–600</option><option selected>₹600–900</option><option>₹900–1200</option><option>₹1200+</option>
                      </select>
                      <div className="form-hint">Used to calibrate your payout tier recommendation.</div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Typical Working Hours</label>
                      <select className="form-select">
                        <option>Morning (6am–12pm)</option><option>Evening peak (5pm–10pm)</option><option>Full day (8am–8pm)</option><option>Night (9pm–2am)</option><option>Weekend only</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">City <span>*</span></label>
                      <select className="form-select">
                        <option>Bengaluru</option><option>Mumbai</option><option>Delhi NCR</option><option>Hyderabad</option><option>Chennai</option><option>Pune</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => advanceOnboard(3)}>Continue → Select Zones</button>
                </div>
              )}

              {/* Step 3: Zones */}
              {step === 3 && (
                <div>
                  <div className="form-group">
                    <label className="form-label">Select your zones (2–3 recommended)</label>
                    <div className="zone-chips">
                      {ZONES.map(z => (
                        <div key={z} className={`zone-chip${selectedZones.includes(z) ? ' selected' : ''}`} onClick={() => toggleZone(z)}>{z}</div>
                      ))}
                    </div>
                    <div className="form-hint">💡 Zones with higher flood history will show a higher base premium but more frequent payouts.</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={() => advanceOnboard(2)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => advanceOnboard(4)}>Continue → Choose Tier</button>
                  </div>
                </div>
              )}

              {/* Step 4: Tier */}
              {step === 4 && (
                <div>
                  <div className="tier-grid" style={{ marginBottom: '18px' }}>
                    {[
                      { id: 'basic', name: 'Basic', price: '₹39', payout: '₹300 per event', events: '1 event/week', features: ['Rainfall + AQI triggers', 'Auto UPI payout'], badge: null },
                      { id: 'standard', name: 'Standard', price: '₹59', payout: '₹600 per event', events: '2 events/week', features: ['All 5 triggers', 'Auto UPI payout', 'Weekly forecast SMS'], badge: 'AI Recommended' },
                      { id: 'premium', name: 'Premium', price: '₹89', payout: '₹1,000 per event', events: '3 events/week', features: ['All 5 triggers', 'Priority payout', 'Forecast SMS', 'Grievance hotline'], badge: 'Best Coverage', badgeStyle: { background: 'var(--accent-2)', color: 'var(--ink)' } },
                    ].map(t => (
                      <div key={t.id} className={`tier-card${selectedTier === t.id ? ' selected' : ''}`} onClick={() => handleTier(t.id)}>
                        {t.badge && <div className="tier-badge" style={t.badgeStyle}>{t.badge}</div>}
                        <div className="tier-name">{t.name}</div>
                        <div className="tier-price">{t.price}<span>/wk</span></div>
                        <div className="tier-payout">{t.payout}</div>
                        <div className="tier-events">{t.events}</div>
                        <ul className="tier-features">
                          {t.features.map(f => <li key={f}>{f}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={() => advanceOnboard(3)}>← Back</button>
                    <button className="btn btn-primary" onClick={() => advanceOnboard(5)}>Continue → Pay First Week</button>
                  </div>
                </div>
              )}

              {/* Step 5: Payment */}
              {step === 5 && (
                <div>
                  <div className="premium-breakdown" style={{ marginBottom: '18px' }}>
                    <div className="pb-row"><span className="pb-label">Standard tier base</span><span className="pb-value">₹59</span></div>
                    <div className="pb-row"><span className="pb-label">Zone risk (low — Koramangala)</span><span className="pb-value pb-deduct">− ₹4</span></div>
                    <div className="pb-row"><span className="pb-label">Forecast (clear week)</span><span className="pb-value pb-deduct">− ₹7</span></div>
                    <div className="pb-row"><span className="pb-label">New member (no tenure yet)</span><span className="pb-value" style={{ color: 'rgba(255,255,255,0.5)' }}>₹0</span></div>
                    <div className="pb-row total"><span>First week total</span><span className="pb-total-value">₹48</span></div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pay via</label>
                    <select className="form-select">
                      <option>UPI (arjun@oksbi)</option>
                      <option>Add new UPI ID</option>
                      <option>Razorpay Test Mode</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-secondary" onClick={() => advanceOnboard(4)}>← Back</button>
                    <button className="btn btn-primary" style={{ flex: 1 }} onClick={completeOnboard}>
                      ✅ Pay ₹48 &amp; Activate Coverage
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
