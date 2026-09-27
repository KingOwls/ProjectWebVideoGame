import { Gamepad2, Hexagon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Logo({ compact = false }) {
  return (
    <Link to="/" className="brand" aria-label="GameHive inicio">
      <span className="brand-mark"><Hexagon size={34} strokeWidth={1.8}/><Gamepad2 size={18}/></span>
      {!compact && <span><b>Game</b>Hive<small>discover · review · connect</small></span>}
    </Link>
  )
}
