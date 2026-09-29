import { Gamepad2, LayoutDashboard, ShieldAlert, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-heading">Panel GameHive</div>
        <NavLink end to="/admin"><LayoutDashboard/> Dashboard</NavLink>
        <NavLink to="/admin/games"><Gamepad2/> Videojuegos</NavLink>
        <NavLink to="/admin/users"><UsersRound/> Usuarios y críticos</NavLink>
        <NavLink to="/admin/reports"><ShieldAlert/> Reportes</NavLink>
      </aside>
      <main className="admin-content">
        <header className="admin-page-header"><div><span className="admin-kicker">Administración</span><h1>{title}</h1><p>{subtitle}</p></div><div className="admin-live"><span/> Demo local</div></header>
        {children}
      </main>
    </div>
  )
}
