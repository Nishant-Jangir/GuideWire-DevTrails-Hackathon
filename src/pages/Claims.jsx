import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Claims() {
  const { toast } = useApp()
  const [pipelineState, setPipelineState] = useState({ step3: 'active', step4: 'pending', pt3: 'active', pt4: 'pending' })

  const completePayout = () => {
    setPipelineState({ step3: 'complete', step4: 'complete', pt3: 'done', pt4: 'done' })
    toast('✅ ₹300 paid to arjun@oksbi · Notification sent', 'success')
  }

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Claims &amp; Payouts</h2>
        <p>All auto-triggered claims and their payout status.</p>
      </div>

      {/* Live Claim Pipeline */}
      <div className="card mb-20">
        <div className="card-header">
          <span className="card-title">Live Claim — Rainfall Event · Right Now</span>
          <span className="badge badge-warning">Processing</span>
        </div>
        <div className="card-body">
          <div className="pipeline mb-20" style={{ marginBottom: '16px' }}>
            <div className="pipeline-step complete">
              <div className="pipeline-icon">⚡</div>
              <div className="pipeline-label">Trigger Fired</div>
              <div className="pipeline-time">33mm/hr detected</div>
            </div>
            <div className="pipeline-step complete">
              <div className="pipeline-icon">📍</div>
              <div className="pipeline-label">Zone Match</div>
              <div className="pipeline-time">Koramangala ✓</div>
            </div>
            <div className="pipeline-step complete">
              <div className="pipeline-icon">🔍</div>
              <div className="pipeline-label">Fraud Check</div>
              <div className="pipeline-time">Clean · 0.8 risk</div>
            </div>
            <div className={`pipeline-step ${pipelineState.step3}`}>
              <div className="pipeline-icon">💳</div>
              <div className="pipeline-label">{pipelineState.step3 === 'complete' ? 'UPI Paid' : 'UPI Payout'}</div>
              <div className="pipeline-time">{pipelineState.step3 === 'complete' ? '₹300 sent' : 'Processing…'}</div>
            </div>
            <div className={`pipeline-step ${pipelineState.step4}`}>
              <div className="pipeline-icon">✅</div>
              <div className="pipeline-label">Complete</div>
              <div className="pipeline-time">{pipelineState.step4 === 'complete' ? 'Done' : '—'}</div>
            </div>
          </div>

          <div className="payout-timeline">
            <div className="pt-item">
              <div className="pt-dot done">✓</div>
              <div className="pt-content">
                <div className="pt-title">OpenWeatherMap: 33mm/hr rainfall detected in Koramangala (Zone ID: BLR-KRM)</div>
                <div className="pt-time">2:14:07 PM · Threshold: 25mm/hr</div>
              </div>
            </div>
            <div className="pt-item">
              <div className="pt-dot done">✓</div>
              <div className="pt-content">
                <div className="pt-title">Zone matched to 47 active policyholders. Arjun Kumar policy GS-22-0847 eligible.</div>
                <div className="pt-time">2:14:09 PM · 2 sec</div>
              </div>
            </div>
            <div className="pt-item">
              <div className="pt-dot done">✓</div>
              <div className="pt-content">
                <div className="pt-title">Fraud check passed — GPS valid, no duplicate, not within 12hr cooldown. Risk score: 0.08</div>
                <div className="pt-time">2:14:36 PM · 27 sec</div>
              </div>
            </div>
            <div className="pt-item">
              <div className={`pt-dot ${pipelineState.pt3}`}>{pipelineState.pt3 === 'done' ? '✓' : '⋯'}</div>
              <div className="pt-content">
                <div className="pt-title">Razorpay payout initiated → UPI: arjun@oksbi · Amount: ₹300</div>
                <div className="pt-time">2:14:37 PM · {pipelineState.pt3 === 'done' ? 'Completed' : 'In progress'}</div>
              </div>
            </div>
            <div className="pt-item">
              <div className={`pt-dot ${pipelineState.pt4}`}>{pipelineState.pt4 === 'done' ? '✓' : '5'}</div>
              <div className="pt-content">
                <div className="pt-title">Push notification: "Heavy rain in your zone. ₹300 sent to your UPI."</div>
                <div className="pt-time">{pipelineState.pt4 === 'done' ? 'Sent' : 'Pending'}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-success btn-sm" onClick={completePayout}>⚡ Complete Payout (Demo)</button>
          </div>
        </div>
      </div>

      {/* Claims History Table */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Claims History</span>
          <select className="form-select" style={{ width: 'auto', padding: '6px 12px', fontSize: '12.5px' }}>
            <option>All Types</option>
            <option>Rainfall</option>
            <option>AQI</option>
            <option>Heat</option>
            <option>Curfew</option>
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Trigger Type</th><th>Value</th><th>Zone</th><th>Risk Score</th><th>Status</th><th>Payout</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Mar 28, 2026</td><td>🌧 Heavy Rainfall</td><td>31mm/hr</td><td>Koramangala</td><td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.08</span></td><td><span className="badge badge-success">Paid</span></td><td style={{ fontWeight: 600, color: '#16a34a' }}>+₹300</td></tr>
              <tr><td>Mar 24, 2026</td><td>🌫 Severe AQI</td><td>AQI 324</td><td>City-wide</td><td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.12</span></td><td><span className="badge badge-success">Paid</span></td><td style={{ fontWeight: 600, color: '#16a34a' }}>+₹300</td></tr>
              <tr><td>Mar 18, 2026</td><td>🌧 Heavy Rainfall</td><td>28mm/hr</td><td>BTM Layout</td><td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.09</span></td><td><span className="badge badge-success">Paid</span></td><td style={{ fontWeight: 600, color: '#16a34a' }}>+₹300</td></tr>
              <tr><td>Mar 12, 2026</td><td>📵 Platform Outage</td><td>Swiggy 89% fail</td><td>Koramangala</td><td><span style={{ color: '#f59e0b', fontWeight: 600 }}>0.34</span></td><td><span className="badge badge-warning">Under Review</span></td><td style={{ fontWeight: 600, color: 'var(--ink-muted)' }}>₹300</td></tr>
              <tr><td>Mar 8, 2026</td><td>🥵 Extreme Heat</td><td>46.2°C</td><td>Indiranagar</td><td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.07</span></td><td><span className="badge badge-success">Paid</span></td><td style={{ fontWeight: 600, color: '#16a34a' }}>+₹300</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
