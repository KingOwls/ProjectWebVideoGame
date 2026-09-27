import { Gamepad2, Sparkles } from 'lucide-react'

export default function GameArtwork({ game, variant = 'card' }) {
  const style = game.image ? { backgroundImage: `linear-gradient(180deg, rgba(6,9,21,.1), rgba(6,9,21,.85)), url(${game.image})` } : {}
  return (
    <div className={`game-art game-art-${variant} cover-${game.cover || 'violet'}`} style={style}>
      {!game.image && <>
        <span className="art-orbit orbit-one"/>
        <span className="art-orbit orbit-two"/>
        <Sparkles className="art-spark" size={22}/>
        <Gamepad2 className="art-pad" size={variant === 'hero' ? 62 : 34}/>
      </>}
      <div className="art-title"><span>{game.name}</span><small>{game.genres?.[0] || 'Videojuego'}</small></div>
    </div>
  )
}
