import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth(); const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' }); const [error, setError] = useState('')
  const change = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const submit = async (e) => { e.preventDefault(); setError(''); if (form.password.length < 8) return setError('Usa al menos 8 caracteres.'); if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.'); try { await register(form); navigate('/profile') } catch (err) { setError(err.message) } }
  return <div className="auth-page"><div className="auth-scenery register-scenery"><div className="scenery-orb one"/><div className="scenery-orb two"/><div className="auth-quote"><span>Tu perfil, tu biblioteca</span><h2>Construye una identidad<br/>a partir de lo que juegas.</h2></div></div><main className="auth-card"><Logo/><span className="eyebrow">Nueva cuenta</span><h1>Crear cuenta</h1><p>La cuenta de esta demo dura únicamente durante la sesión del navegador.</p><form className="stack-form" onSubmit={submit}><label>Nombre de usuario<div className="input-with-icon"><UserRound/><input value={form.username} onChange={change('username')} required/></div></label><label>Correo<div className="input-with-icon"><Mail/><input type="email" value={form.email} onChange={change('email')} required/></div></label><label>Contraseña<div className="input-with-icon"><LockKeyhole/><input type="password" value={form.password} onChange={change('password')} required/></div></label><label>Confirmar contraseña<div className="input-with-icon"><LockKeyhole/><input type="password" value={form.confirm} onChange={change('confirm')} required/></div></label>{error && <div className="form-error">{error}</div>}<button className="button primary full">Crear cuenta <ArrowRight/></button></form><p className="auth-switch">¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p></main></div>
}
