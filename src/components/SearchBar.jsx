import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ initial = '', compact = false, onChange }) {
  const [query, setQuery] = useState(initial)
  const navigate = useNavigate()
  const submit = (event) => {
    event?.preventDefault()
    const clean = query.trim()
    if (clean) navigate(`/search?q=${encodeURIComponent(clean)}`)
  }
  return (
    <form className={`searchbar ${compact ? 'searchbar-compact' : ''}`} onSubmit={submit}>
      <Search size={18}/>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); onChange?.(e.target.value) }}
        placeholder="Buscar juegos, géneros, plataformas..."
        aria-label="Buscar juegos"
      />
      {query && <button type="button" className="icon-button ghost" onClick={() => { setQuery(''); onChange?.('') }} aria-label="Limpiar búsqueda"><X size={16}/></button>}
    </form>
  )
}
