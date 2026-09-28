import { Cloud, Database, LoaderCircle, SearchX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import games from '../data/games.json'
import GameCard from '../components/GameCard'
import SearchBar from '../components/SearchBar'
import { getRawgKey, searchRawgGames } from '../services/rawgService'

export default function SearchResultsPage() {
  const [params] = useSearchParams()
  const query = params.get('q') || ''
  const [external, setExternal] = useState([])
  const [state, setState] = useState('idle')
  const local = useMemo(() => games.filter((game) => `${game.name} ${game.genres.join(' ')} ${game.developer}`.toLowerCase().includes(query.toLowerCase())), [query])
  useEffect(() => {
    let ignore = false
    async function run() {
      if (!query || !getRawgKey()) { setExternal([]); setState('idle'); return }
      try { setState('loading'); const result = await searchRawgGames(query); if (!ignore) { setExternal(result.games); setState('ok') } }
      catch { if (!ignore) { setExternal([]); setState('error') } }
    }
    run(); return () => { ignore = true }
  }, [query])
  const combined = external.length ? external : local
  return (
    <div className="page dark-page">
      <section className="page-banner search-results-banner"><span className="eyebrow">Resultados de búsqueda</span><h1>{query ? <>Resultados para <span>“{query}”</span></> : 'Busca un videojuego'}</h1><SearchBar initial={query}/></section>
      <section className="content-section">
        <div className="results-meta"><b>{combined.length} resultados visibles</b><span className="source-chip">{state === 'loading' ? <><LoaderCircle className="spin" size={15}/> Consultando RAWG</> : external.length ? <><Cloud size={15}/> RAWG</> : <><Database size={15}/> JSON local</>}</span></div>
        {state === 'error' && <div className="notice warning">RAWG no respondió. Se muestran datos locales para que la demostración continúe funcionando.</div>}
        {combined.length ? <div className="game-grid">{combined.map((game) => <GameCard key={game.id} game={game}/>)}</div> : <div className="empty-state"><SearchX size={44}/><h2>No encontramos coincidencias</h2><p>Intenta con un nombre más corto o conecta RAWG desde el icono de llave de la barra superior.</p></div>}
        {external.length > 0 && <p className="rawg-attribution">Datos externos suministrados por <a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG</a>.</p>}
      </section>
    </div>
  )
}
