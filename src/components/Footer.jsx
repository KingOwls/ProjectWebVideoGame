import { Database, Heart, ShieldCheck } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <Logo/>
      <div className="footer-points">
        <span><Heart size={16}/> Opiniones con contexto</span>
        <span><Database size={16}/> Catálogo desacoplado</span>
        <span><ShieldCheck size={16}/> Demo sin secretos versionados</span>
      </div>
      <p>Proyecto académico. Los datos externos de RAWG se identifican y enlazan con atribución cuando se consultan.</p>
    </footer>
  )
}
