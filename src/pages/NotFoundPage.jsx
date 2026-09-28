import { Ghost } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function NotFoundPage(){return <div className="page dark-page"><div className="empty-state tall"><Ghost size={54}/><h1>Esta ruta se perdió en el mapa</h1><p>La pantalla que buscas no forma parte del prototipo actual.</p><Link className="button primary" to="/">Volver a GameHive</Link></div></div>}
