import { useApp } from '../context/AppContext'

export default function Topbar({ onSimulateAlert }) {
  const { topbarInfo, openRenewModal } = useApp()
  const [title, subtitle] = topbarInfo

  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-subtitle">{subtitle}</div>
      </div>
      <div className="topbar-actions">
        <button className="btn btn-ghost btn-sm" onClick={onSimulateAlert}>
          🌧 Simulate Disruption
        </button>
        <button className="btn btn-primary btn-sm" onClick={openRenewModal}>
          Renew Week →
        </button>
      </div>
    </div>
  )
}
