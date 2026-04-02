import { useState } from 'react'

const WORKERS = [
  { name: 'Arjun Kumar', id: 'GS-22-0847', platform: '🟠 Swiggy', tier: 'Standard', tierClass: 'badge-info', zone: 'Koramangala', premium: '₹52/wk', claims: '4 paid', risk: '0.08', riskColor: '#22c55e', status: 'Active', statusClass: 'badge-success' },
  { name: 'Priya Nair', id: 'GS-22-0312', platform: '🔴 Zomato', tier: 'Premium', tierClass: 'badge-accent', zone: 'Indiranagar', premium: '₹81/wk', claims: '6 paid', risk: '0.11', riskColor: '#22c55e', status: 'Active', statusClass: 'badge-success' },
  { name: 'Ravi Shankar', id: 'GS-22-1134', platform: '🟠 Swiggy', tier: 'Standard', tierClass: 'badge-info', zone: 'BTM Layout', premium: '₹58/wk', claims: '2 paid, 1 flagged', risk: '0.41', riskColor: '#f59e0b', status: 'Review', statusClass: 'badge-warning' },
  { name: 'Fatima Sheikh', id: 'GS-22-0091', platform: '🔴 Zomato', tier: 'Basic', tierClass: 'badge-neutral', zone: 'Hyderabad Central', premium: '₹33/wk', claims: '3 paid', risk: '0.07', riskColor: '#22c55e', status: 'Active', statusClass: 'badge-success' },
  { name: 'Meena Devi', id: 'GS-22-0219', platform: '🟠 Swiggy', tier: 'Standard', tierClass: 'badge-info', zone: 'Andheri East', premium: '₹64/wk', claims: '0 paid, 1 flagged', risk: '0.62', riskColor: '#ef4444', status: 'Flagged', statusClass: 'badge-danger' },
]

export default function Workers() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('All Tiers')

  const filtered = WORKERS.filter(w => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())
    const matchTier = tierFilter === 'All Tiers' || w.tier === tierFilter
    return matchSearch && matchTier
  })

  return (
    <div className="page page-enter">
      <div className="section-header">
        <h2>All Workers</h2>
        <p>1,847 active policyholders across Bengaluru, Mumbai, and Delhi.</p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Worker Registry</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              className="form-input"
              style={{ width: '200px', padding: '7px 12px', fontSize: '13px' }}
              placeholder="Search workers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="form-select"
              style={{ width: 'auto', padding: '7px 12px', fontSize: '13px' }}
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
            >
              <option>All Tiers</option>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Worker</th><th>Platform</th><th>Tier</th><th>Zone</th><th>Premium</th><th>Claims</th><th>Risk</th><th>Status</th></tr>
            </thead>
            <tbody>
              {filtered.map(w => (
                <tr key={w.id}>
                  <td><strong>{w.name}</strong><br /><span style={{ fontSize: '11px', color: 'var(--ink-muted)' }}>{w.id}</span></td>
                  <td>{w.platform}</td>
                  <td><span className={`badge ${w.tierClass}`}>{w.tier}</span></td>
                  <td>{w.zone}</td>
                  <td>{w.premium}</td>
                  <td>{w.claims}</td>
                  <td><span style={{ color: w.riskColor, fontWeight: 600 }}>{w.risk}</span></td>
                  <td><span className={`badge ${w.statusClass}`}>{w.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
