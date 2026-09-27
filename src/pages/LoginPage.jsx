import { ArrowRight, KeyRound, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { useAuth } from '../context/AuthContext'
import { demoAccounts } from '../services/authService'

export default function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate(); const location = useLocation()
  const submit = async (e) => { e.preventDefault(); setError(''); setLoading(true); try { const user = await login(email, password); navigate(user.role === 'admin' ? '/admin' : location.state?.from || '/') } catch (err) { setError(err.message) } finally { setLoading(false) } }
  const fill = (account) => { setEmail(account.email); setPassword(account.password); setError('') }
  return (
    <div className="auth-page"><div className="auth-scenery"><div className="scenery-orb one"/><div className="scenery-orb two"/><div className="auth-quote"><span>GameHive</span><h2>Tu próxima historia<br/>puede estar a una búsqueda.</h2></div></div>
      <main className="auth-card"><Logo/><span className="eyebrow">Bienvenido de vuelta</span><h1>Iniciar sesión</h1><p>Accede a tu biblioteca, reseñas y actividad.</p>
        <form className="stack-form" onSubmit={submit}><label><span>Correo</span><div className="input-with-icon"><Mail/><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/></div></label><label><span>Contraseña</span><div className="input-with-icon"><LockKeyhole/><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/></div></label>{error && <div className="form-error">{error}</div>}<button className="button primary full" disabled={loading}>{loading ? 'Validando...' : <>Iniciar sesión <ArrowRight size={18}/></>}</button></form>
        <div className="demo-accounts"><div className="demo-title"><KeyRound size={17}/><b>Cuentas de demostración</b></div>{demoAccounts.map((account) => <button key={account.role} onClick={() => fill(account)}><span>{account.role}</span><small>{account.email}</small></button>)}</div>
        <div className="security-strip"><ShieldCheck/><p>Las contraseñas demo se comparan contra hashes SHA-256 en JSON. Esto evita texto plano, pero sigue siendo una simulación cliente, no autenticación de producción.</p></div>
        <p className="auth-switch">¿No tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
      </main>
    </div>
  )
}
