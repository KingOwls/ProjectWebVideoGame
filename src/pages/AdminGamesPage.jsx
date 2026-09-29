import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import games from '../data/games.json'
import AdminLayout from '../components/AdminLayout'

export default function AdminGamesPage() {
 const [query,setQuery]=useState(''); const shown=games.filter((g)=>g.name.toLowerCase().includes(query.toLowerCase()))
 return <AdminLayout title="Gestión de videojuegos" subtitle="Vista administrativa sobre el catálogo local de respaldo."><div className="admin-toolbar"><div className="admin-search"><Search/><input placeholder="Buscar videojuego" value={query} onChange={(e)=>setQuery(e.target.value)}/></div><button className="button admin-primary"><Plus/> Nuevo juego local</button></div><section className="admin-panel table-panel"><div className="table-scroll"><table className="admin-table"><thead><tr><th>Juego</th><th>Género</th><th>Plataformas</th><th>Puntuación</th><th>Fuente</th><th>Estado</th></tr></thead><tbody>{shown.map((game)=><tr key={game.id}><td><div className="table-game-icon" style={{background:game.accent}}>{game.name.slice(0,2)}</div><b>{game.name}</b></td><td>{game.genres.join(', ')}</td><td>{game.platforms.length}</td><td>{game.communityScore}</td><td>{game.source}</td><td><span className="status-badge status-active">Activo</span></td></tr>)}</tbody></table></div></section></AdminLayout>
}
