import { useApp } from '../context/AppContext'

export default function Fraud() {
  const { toast } = useApp()

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>Fraud Detection Queue</h2>
        <p>Phase 2: GPS + duplicate checks. Phase 3: Isolation Forest, social graph, cell tower.</p>
      </div>

      <div className="grid-3 mb-20">
        {[
          { icon: '🔍', value: '3', label: 'Claims Flagged This Week' },
          { icon: '✅', value: '98.2%', label: 'Auto-Approval Rate' },
          { icon: '💰', value: '₹4,200', label: 'Prevented This Month' },
        ].map(c => (
          <div key={c.label} className="card">
            <div className="card-body" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '32px', marginBottom: '6px' }}>{c.icon}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '24px', fontWeight: 700 }}>{c.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Fraud Signals Panel */}
      <div className="card mb-20">
        <div className="card-header"><span className="card-title">Fraud Signals (Phase 2 Active)</span></div>
        <div className="card-body">
          <div className="grid-2">
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '12px' }}>✅ Currently Running</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '📍', title: 'GPS Plausibility Check', desc: 'Last known location must be within zone at trigger time' },
                  { icon: '⏱', title: '12-Hour Cooldown', desc: 'Max 1 payout per 12-hour window per worker' },
                  { icon: '🔁', title: 'Duplicate Claim Prevention', desc: 'Same trigger event cannot be claimed twice by same worker' },
                  { icon: '🆕', title: 'New Account Watch', desc: 'First-week accounts flagged for manual review' },
                ].map(s => (
                  <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '13px' }}>
                    <span>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 500 }}>{s.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '12px' }}>🔒 Phase 3 — Coming Next</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '🌲', title: 'Isolation Forest Scorer', desc: 'ML anomaly detection on claim patterns' },
                  { icon: '📡', title: 'Cell Tower Cross-Reference', desc: 'Corroborate GPS with cell tower data' },
                  { icon: '🕸', title: 'Social Graph Clustering', desc: 'Detect coordinated ring attacks' },
                  { icon: '📳', title: 'Accelerometer Validation', desc: 'Device motion confirms worker was mobile' },
                ].map(s => (
                  <div key={s.title} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', background: 'var(--surface)', border: '1px dashed var(--border)', borderRadius: '8px', fontSize: '13px', opacity: 0.7 }}>
                    <span>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 500 }}>{s.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Claims */}
      <div className="card">
        <div className="card-header"><span className="card-title">Flagged Claims</span></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Worker</th><th>Claim Type</th><th>Flag Reason</th><th>Risk Score</th><th>Amount</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Ravi Shankar</strong><br /><span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>GS-22-1134</span></td>
                <td>Platform Outage</td>
                <td><span className="badge badge-warning">GPS mismatch</span></td>
                <td><span style={{ color: '#f59e0b', fontWeight: 600 }}>0.41</span></td>
                <td>₹300</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-success btn-sm" onClick={() => toast('✅ Ravi Shankar claim approved', 'success')}>Approve</button>
                  <button className="btn btn-danger btn-sm" onClick={() => toast('🚫 Claim rejected and flagged', 'danger')}>Reject</button>
                </td>
              </tr>
              <tr>
                <td><strong>Meena Devi</strong><br /><span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>GS-22-0219</span></td>
                <td>Rainfall</td>
                <td><span className="badge badge-danger">Week 1 account</span></td>
                <td><span style={{ color: '#ef4444', fontWeight: 600 }}>0.62</span></td>
                <td>₹300</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-success btn-sm" onClick={() => toast('✅ Meena Devi claim approved', 'success')}>Approve</button>
                  <button className="btn btn-danger btn-sm" onClick={() => toast('🚫 Claim rejected', 'danger')}>Reject</button>
                </td>
              </tr>
              <tr>
                <td><strong>Suresh P.</strong><br /><span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>GS-22-0887</span></td>
                <td>AQI</td>
                <td><span className="badge badge-danger">Cooldown violation</span></td>
                <td><span style={{ color: '#ef4444', fontWeight: 600 }}>0.78</span></td>
                <td>₹600</td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="btn btn-success btn-sm" onClick={() => toast('✅ Suresh claim approved', 'success')}>Approve</button>
                  <button className="btn btn-danger btn-sm" onClick={() => toast('🚫 Claim rejected — cooldown', 'danger')}>Reject</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
