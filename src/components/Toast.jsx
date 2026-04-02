import { useApp } from '../context/AppContext'

function Toast({ toast: t }) {
  const icon = t.type === 'success' ? '✅' : t.type === 'danger' ? '🚫' : t.type === 'warning' ? '⚠️' : '💬'
  const borderColor = t.type === 'success' ? '#22c55e' : t.type === 'danger' ? '#ef4444' : t.type === 'warning' ? '#f59e0b' : 'var(--accent-3)'

  return (
    <div className={`toast${t.removing ? ' removing' : ''}`} style={{ borderLeftColor: borderColor }}>
      <span style={{ fontSize: '16px' }}>{icon}</span>
      <span>{t.message}</span>
    </div>
  )
}

export default function ToastContainer() {
  const { toasts } = useApp()

  return (
    <div className="toast-container">
      {toasts.map(t => <Toast key={t.id} toast={t} />)}
    </div>
  )
}
