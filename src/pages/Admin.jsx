import { useApp } from '../context/AppContext'

export default function Admin() {
  const { toast } = useApp()

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Insurer Dashboard</h2>
        <p>Platform-wide analytics, loss ratios, and exposure monitoring.</p>
      </div>

      <div className="stats-grid mb-20">
        <div className="stat-card">
          <div className="stat-label">Active Policies</div>
          <div className="stat-value">1,847</div>
          <div className="stat-change up">↑ 124 this week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Premiums (This Week)</div>
          <div className="stat-value">₹96K</div>
          <div className="stat-change up">↑ 8.4% vs last week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Claims Paid (This Week)</div>
          <div className="stat-value">₹88K</div>
          <div className="stat-change neutral">Loss ratio: 91.7%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Fraud Flagged</div>
          <div className="stat-value">3</div>
          <div className="stat-change down">↑ Needs review</div>
        </div>
      </div>

      <div className="grid-2 mb-20">
        {/* Loss Ratio by Zone */}
        <div className="card">
          <div className="card-header"><span className="card-title">Loss Ratio by Zone</span></div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { zone: 'Koramangala', pct: 68, color: '#22c55e' },
                { zone: 'BTM Layout', pct: 87, color: '#f59e0b' },
                { zone: 'Indiranagar', pct: 72, color: '#22c55e' },
                { zone: 'Dharavi North', pct: 118, color: '#ef4444', barWidth: 100 },
                { zone: 'Andheri East', pct: 94, color: '#f59e0b' },
              ].map(r => (
                <div key={r.zone}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                    <span>{r.zone}</span><span style={{ fontWeight: 600, color: r.color }}>{r.pct}%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${r.barWidth || r.pct}%`, background: r.color }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7-Day Predictive Forecast */}
        <div className="card">
          <div className="card-header"><span className="card-title">7-Day Predictive Forecast</span><span className="badge badge-info">AI Model</span></div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '10px 12px', background: '#fff8f5', border: '1px solid #fde8dc', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>⚡ High risk: Thu–Fri</div>
                <div style={{ color: 'var(--ink-muted)' }}>67% probability of trigger-level rainfall in BTM Layout, Jayanagar zones</div>
              </div>
              <div style={{ padding: '10px 12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>🌫 Medium risk: Weekend</div>
                <div style={{ color: 'var(--ink-muted)' }}>AQI forecast 240–280, below trigger threshold but monitoring closely</div>
              </div>
              <div style={{ padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '13px' }}>
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>✅ Low risk: Mon–Wed</div>
                <div style={{ color: 'var(--ink-muted)' }}>Clear skies forecast. Premium adjustments applied for next week already.</div>
              </div>
              <div className="divider" style={{ margin: '8px 0' }}></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--ink-muted)' }}>Predicted claim volume next week</span>
                <span style={{ fontWeight: 600 }}>~₹1.2L – ₹1.8L</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: 'var(--ink-muted)' }}>Predicted loss ratio</span>
                <span style={{ fontWeight: 600, color: '#f59e0b' }}>84–96%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claims In-Flight */}
      <div className="card">
        <div className="card-header"><span className="card-title">Claims In-Flight</span><span className="badge badge-warning">3 Active</span></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Worker</th><th>Trigger</th><th>Zone</th><th>Amount</th><th>Risk Score</th><th>Stage</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Arjun Kumar</strong></td>
                <td>🌧 Rainfall 33mm</td>
                <td>Koramangala</td>
                <td>₹300</td>
                <td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.08</span></td>
                <td><span className="badge badge-warning">Paying</span></td>
                <td><button className="btn btn-success btn-sm" onClick={() => toast('✅ Payout completed for Arjun Kumar', 'success')}>Pay</button></td>
              </tr>
              <tr>
                <td><strong>Priya Nair</strong></td>
                <td>🌧 Rainfall 33mm</td>
                <td>Koramangala</td>
                <td>₹300</td>
                <td><span style={{ color: '#22c55e', fontWeight: 600 }}>0.11</span></td>
                <td><span className="badge badge-warning">Paying</span></td>
                <td><button className="btn btn-success btn-sm" onClick={() => toast('✅ Payout completed for Priya Nair', 'success')}>Pay</button></td>
              </tr>
              <tr>
                <td><strong>Ravi Shankar</strong></td>
                <td>📵 Platform Outage</td>
                <td>BTM Layout</td>
                <td>₹300</td>
                <td><span style={{ color: '#f59e0b', fontWeight: 600 }}>0.41</span></td>
                <td><span className="badge badge-danger">Flagged</span></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => toast('🚩 Ravi Shankar claim sent to fraud queue', 'warning')}>Review</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
