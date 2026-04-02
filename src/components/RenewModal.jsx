import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function RenewModal() {
  const { renewModalOpen, closeRenewModal, toast } = useApp()
  const [autoRenew, setAutoRenew] = useState(true)

  if (!renewModalOpen) return null

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) closeRenewModal()
  }

  const handlePay = () => {
    closeRenewModal()
    toast('✅ Policy renewed! Coverage starts Monday 00:00', 'success')
  }

  return (
    <div className="modal-overlay" onClick={handleBackdrop}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Renew This Week's Coverage</span>
          <button className="modal-close" onClick={closeRenewModal}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: 'var(--surface)', borderRadius: '10px', marginBottom: '18px' }}>
            <div style={{ fontSize: '28px' }}>🛡️</div>
            <div>
              <div style={{ fontWeight: 600 }}>Standard Tier · Week of Apr 7, 2026</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)', marginTop: '2px' }}>Coverage starts Monday 00:00 IST</div>
            </div>
          </div>
          <div className="premium-breakdown">
            <div className="pb-row"><span className="pb-label">Standard tier base</span><span className="pb-value">₹59</span></div>
            <div className="pb-row"><span className="pb-label">Zone risk (low)</span><span className="pb-value pb-deduct">− ₹4</span></div>
            <div className="pb-row"><span className="pb-label">Forecast (partly cloudy)</span><span className="pb-value pb-add">+ ₹3</span></div>
            <div className="pb-row"><span className="pb-label">Tenure discount (23 wks)</span><span className="pb-value pb-deduct">− ₹8</span></div>
            <div className="pb-row total"><span>Next week total</span><span className="pb-total-value">₹50</span></div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Pay via UPI</label>
              <select className="form-select">
                <option>arjun@oksbi (saved)</option>
                <option>Add new UPI</option>
              </select>
            </div>
            <div className="toggle" onClick={() => setAutoRenew(p => !p)}>
              <div className={`toggle-track${autoRenew ? ' on' : ''}`}>
                <div className="toggle-thumb"></div>
              </div>
              <span className="toggle-label" style={{ fontSize: '13px' }}>Auto-renew every Sunday 8pm</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeRenewModal}>Cancel</button>
          <button className="btn btn-primary" onClick={handlePay}>Pay ₹50 &amp; Renew</button>
        </div>
      </div>
    </div>
  )
}
