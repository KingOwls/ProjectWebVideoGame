import { Filter, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import games from '../data/games.json'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import { useAuth } from '../context/AuthContext'
import { getLibrary, setLibraryEntry } from '../services/communityService'

export default function ExplorePage() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Todos')
  const [platform, setPlatform] = useState('Todas')
  const [order, setOrder] = useState('popularidad')
  const [, force] = useState(0)
  const genres = ['Todos', ...new Set(games.flatMap((g) => g.genres))]
  const platforms = ['Todas', ...new Set(games.flatMap((g) => g.platforms))]
  const library = user ? getLibrary(user.id) : []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = games.filter((game) => (!q || `${game.name} ${game.genres.join(' ')} ${game.developer}`.toLowerCase().includes(q)) && (genre === 'Todos' || game.genres.includes(genre)) && (platform === 'Todas' || game.platforms.includes(platform)))
    return result.sort((a,b) => order === 'rating' ? b.communityScore - a.communityScore : order === 'fecha' ? new Date(b.released) - new Date(a.released) : b.popularity - a.popularity)
  }, [query, genre, platform, order])
  const save = (game) => { if (!user) return; setLibraryEntry(user.id, game.id, 'wishlist'); force((x) => x + 1) }
  return (
    <div className="page dark-page">
      <section className="page-banner"><span className="eyebrow"><Filter size={15}/> Catálogo</span><h1>Explorar juegos</h1><p>Descubre títulos por género, plataforma y recepción comunitaria.</p><SearchBar onChange={setQuery}/></section>
      <section className="explore-layout content-section">
        <aside className="filter-panel">
          <div className="filter-title"><SlidersHorizontal size={18}/><b>Filtros</b></div>
          <label>Género<select value={genre} onChange={(e) => setGenre(e.target.value)}>{genres.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>Plataforma<select value={platform} onChange={(e) => setPlatform(e.target.value)}>{platforms.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label>Ordenar por<select value={order} onChange={(e) => setOrder(e.target.value)}><option value="popularidad">Popularidad</option><option value="rating">Puntuación</option><option value="fecha">Lanzamiento</option></select></label>
          <button className="button secondary" onClick={() => { setGenre('Todos'); setPlatform('Todas'); setOrder('popularidad'); setQuery('') }}>Limpiar filtros</button>
        </aside>
        <div><div className="results-meta"><b>{filtered.length} juegos</b><span>Datos locales de respaldo</span></div><div className="game-grid">{filtered.map((game) => <GameCard key={game.id} game={game} onSave={save} saved={library.some((x) => x.gameId === game.id)}/>)}</div>{!filtered.length && <div className="empty-state"><h2>Sin resultados</h2><p>Prueba con otro género o una búsqueda menos específica.</p></div>}</div>
      </section>
    </div>
  )
}
