import { BookmarkPlus, Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import GameArtwork from './GameArtwork'

export default function GameCard({ game, onSave, saved = false }) {
  return (
    <article className="game-card">
      <Link to={`/game/${game.id}`} className="game-card-art-link"><GameArtwork game={game}/></Link>
      <div className="game-card-body">
        <div className="eyebrow-row"><span>{game.genres?.slice(0, 2).join(' · ')}</span><span>{game.released?.slice(0, 4) || '—'}</span></div>
        <Link to={`/game/${game.id}`} className="game-title-link"><h3>{game.name}</h3></Link>
        <div className="score-row">
          <span className="score-pill"><Star size={14} fill="currentColor"/> {game.communityScore || 'N/D'}</span>
          {game.criticScore && <span className="critic-score">{game.criticScore}<small>crítica</small></span>}
          <button className={`icon-button ghost ${saved ? 'is-active' : ''}`} onClick={() => onSave?.(game)} aria-label="Guardar en biblioteca">
            {saved ? <Heart size={17} fill="currentColor"/> : <BookmarkPlus size={17}/>} 
          </button>
        </div>
      </div>
    </article>
  )
}
