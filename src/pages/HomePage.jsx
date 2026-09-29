import { ArrowRight, Compass, MessageSquareText, Search, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import games from '../data/games.json'
import { activitySeed } from '../services/communityService'
import SearchBar from '../components/SearchBar'
import GameCard from '../components/GameCard'
import GameArtwork from '../components/GameArtwork'

export default function HomePage() {
  const featured = games.find((game) => game.featured) || games[0]
  return (
    <div className="page dark-page">
      <section className="hero home-hero">
        <div className="hero-bg"><GameArtwork game={featured} variant="hero"/></div>
        <div className="hero-copy">
          <span className="hero-kicker"><Sparkles size={16}/> Descubre · reseña · conecta</span>
          <h1>Más que juegos,<br/><span>son nuevas historias por vivir</span></h1>
          <p>Encuentra videojuegos, organiza tu biblioteca y lee opiniones con contexto de reputación, no solo una cifra flotando en el vacío.</p>
          <div className="hero-search"><SearchBar/></div>
          <div className="quick-tags"><span>Popular:</span><Link to="/search?q=RPG">RPG</Link><Link to="/search?q=Aventura">Aventura</Link><Link to="/search?q=Indie">Indie</Link></div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading"><div><span className="eyebrow">Para empezar</span><h2>Juegos destacados</h2></div><Link to="/explore" className="text-button">Ver catálogo <ArrowRight size={16}/></Link></div>
        <div className="game-grid featured-grid">{games.filter((g) => g.featured).slice(0,4).map((game) => <GameCard key={game.id} game={game}/>)}</div>
      </section>

      <section className="split-section content-section">
        <div>
          <div className="section-heading"><div><span className="eyebrow">Comunidad viva</span><h2>Actividad reciente</h2></div></div>
          <div className="activity-list">
            {activitySeed.map((activity) => <article className="activity-item" key={activity.id}><div className="avatar">{activity.actor.slice(0,2).toUpperCase()}</div><div><b>{activity.actor}</b><p>{activity.text}</p><small>{new Date(activity.date).toLocaleDateString('es-CO')}</small></div></article>)}
          </div>
        </div>
        <aside className="community-panel">
          <span className="eyebrow">Por qué GameHive</span><h2>La puntuación es el principio, no el final.</h2><p>Una reseña gana contexto con el historial del autor, utilidad comunitaria y señales de moderación. La reputación acompaña la opinión sin convertirla en una verdad automática.</p>
          <div className="feature-mini-grid">
            <span><Compass/><b>Descubrimiento</b><small>Filtros y búsqueda</small></span>
            <span><MessageSquareText/><b>Opinión</b><small>Reseñas propias</small></span>
            <span><Star/><b>Reputación</b><small>Contexto visible</small></span>
            <span><ShieldCheck/><b>Moderación</b><small>Reportes trazables</small></span>
          </div>
        </aside>
      </section>
    </div>
  )
}
