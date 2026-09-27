import { Bell, BookMarked, KeyRound, LogIn, LogOut, Menu, Search, Shield, UserRound, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'
import IntegrationModal from './IntegrationModal'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showIntegrations, setShowIntegrations] = useState(false)
  const navigate = useNavigate()
  const doLogout = () => { logout(); navigate('/') }
  return (
    <>
      <header className="topbar">
        <Logo/>
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/explore">Explorar</NavLink>
          {user && <NavLink to="/library"><BookMarked size={15}/> Biblioteca</NavLink>}
          {user?.role === 'admin' && <NavLink to="/admin"><Shield size={15}/> Administrar</NavLink>}
        </nav>
        <div className="top-search"><SearchBar compact/></div>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setShowIntegrations(true)} aria-label="Configurar API"><KeyRound size={18}/></button>
          {user ? <>
            <button className="icon-button"><Bell size={18}/></button>
            <NavLink className="profile-chip" to="/profile"><span className="avatar small">{user.username.slice(0,2).toUpperCase()}</span><span>{user.username}<small>{user.role}</small></span></NavLink>
            <button className="icon-button" onClick={doLogout} title="Cerrar sesión"><LogOut size={18}/></button>
          </> : <NavLink className="button primary small-button" to="/login"><LogIn size={16}/> Iniciar sesión</NavLink>}
          <button className="mobile-menu icon-button" onClick={() => setMenuOpen((v) => !v)}>{menuOpen ? <X/> : <Menu/>}</button>
        </div>
      </header>
      {showIntegrations && <IntegrationModal onClose={() => setShowIntegrations(false)}/>} 
    </>
  )
}
