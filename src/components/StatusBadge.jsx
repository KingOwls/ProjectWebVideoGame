const labels = {
  pending: 'Pendiente', approved: 'Aprobado', rejected: 'Rechazado', removed: 'Eliminado',
  active: 'Activo', suspended: 'Suspendido', critic: 'Crítico', admin: 'Admin', user: 'Usuario'
}
export default function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{labels[status] || status}</span>
}
