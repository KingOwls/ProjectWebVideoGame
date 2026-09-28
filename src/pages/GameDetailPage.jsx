import { BookmarkPlus, CalendarDays, Flag, Gamepad2, PenLine, Star, UsersRound } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import games from '../data/games.json'
import GameArtwork from '../components/GameArtwork'
import ReviewCard from '../components/ReviewCard'
import Modal from '../components/Modal'
import { useAuth } from '../context/AuthContext'
import { getRawgGame } from '../services/rawgService'
import { getReviews, saveReport, setLibraryEntry, toggleHelpful } from '../services/communityService'

export default function GameDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [game, setGame] = useState(() => games.find((g) => g.id === id) || null)
  const [reviews, setReviews] = useState(getReviews)
  const [reportTarget, setReportTarget] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    if (!id.startsWith('rawg-')) return
    getRawgGame(id.replace('rawg-', '')).then(setGame).catch(() => setGame(null))
  }, [id])
  const gameReviews = useMemo(() => reviews.filter((r) => r.gameId === id), [reviews, id])
  if (!game) return <div className="page dark-page"><div className="empty-state tall"><h1>Juego no disponible</h1><p>No se encontró el registro o la consulta externa falló.</p><Link className="button primary" to="/explore">Volver a explorar</Link></div></div>
  const save = () => { if (!user) { setMessage('Inicia sesión para usar tu biblioteca.'); return } setLibraryEntry(user.id, game.id, 'wishlist'); setMessage('Añadido a tu lista de deseos.') }
  const report = () => { if (!user) { setMessage('Inicia sesión para reportar contenido.'); return } saveReport({ gameId: game.id, contentType: 'review', content: reportTarget.title, reporter: user.username, reason: 'Revisión de la comunidad' }); setReportTarget(null); setMessage('Reporte enviado a moderación.') }
  return (
    <div className="page dark-page">
      <section className="detail-hero">
        <div className="detail-hero-art"><GameArtwork game={game} variant="hero"/></div>
        <div className="detail-overlay"/>
        <div className="detail-main">
          <span className="eyebrow">{game.genres.join(' · ')}</span><h1>{game.name}</h1><p>{game.tagline}</p>
          <div className="tag-row">{game.platforms.map((p) => <span key={p}>{p}</span>)}</div>
          <div className="detail-actions"><button className="button primary" onClick={save}><BookmarkPlus size={18}/> Añadir a biblioteca</button>{user && <Link className="button secondary" to={`/review/${game.id}`}><PenLine size={18}/> {user?.role==='critic'?'Crear crítica':'Escribir reseña'}</Link>}</div>
          {message && <div className="success-message inline-message">{message}</div>}
        </div>
        <aside className="rating-panel"><div><span>GameHive</span><b>{game.communityScore}</b><small>Comunidad</small></div><div><span>Crítica</span><b>{game.criticScore || 'N/D'}</b><small>{game.source === 'RAWG' ? 'Metacritic vía RAWG' : 'Referencia demo'}</small></div></aside>
      </section>
      <section className="content-section detail-grid">
        <div className="detail-copy">
          <span className="eyebrow">Sobre el juego</span><h2>Una mirada más completa</h2><p>{game.description}</p>
          <div className="fact-grid"><span><CalendarDays/><small>Lanzamiento</small><b>{game.released || 'N/D'}</b></span><span><Gamepad2/><small>Desarrollador</small><b>{game.developer}</b></span><span><UsersRound/><small>Reseñas</small><b>{game.reviewsCount}</b></span><span><Star/><small>Puntuación</small><b>{game.rating}/5</b></span></div>
          <div className="section-heading review-heading"><div><span className="eyebrow">Opiniones</span><h2>Reseñas y críticas</h2></div>{user && <Link className="button secondary small-button" to={`/review/${game.id}`}><PenLine size={16}/> {user?.role==='critic'?'Nueva crítica':'Nueva reseña'}</Link>}</div>
          <div className="review-list">{gameReviews.length ? gameReviews.map((review) => <ReviewCard key={review.id} review={review} onHelpful={(rid) => setReviews(toggleHelpful(rid))} onReport={setReportTarget}/>) : <div className="empty-state compact"><h3>Todavía no hay reseñas locales.</h3><p>Puedes ser la primera persona en escribir una.</p></div>}</div>
        </div>
        <aside className="detail-sidecard"><h3>Ficha técnica</h3><dl><div><dt>Desarrollador</dt><dd>{game.developer}</dd></div><div><dt>Publisher</dt><dd>{game.publisher}</dd></div><div><dt>Géneros</dt><dd>{game.genres.join(', ')}</dd></div><div><dt>Fuente de catálogo</dt><dd>{game.source}</dd></div></dl>{game.source === 'RAWG' && <a className="text-button" href="https://rawg.io" target="_blank" rel="noreferrer">Ver proveedor RAWG</a>}</aside>
      </section>
      {reportTarget && <Modal title="Reportar reseña" onClose={() => setReportTarget(null)}><div className="report-box"><Flag/><p>El reporte quedará registrado como pendiente para revisión administrativa. En esta demo se conserva únicamente en tu navegador.</p></div><button className="button danger full" onClick={report}>Enviar reporte</button></Modal>}
    </div>
  )
}
