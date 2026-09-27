import { BookMarked, Heart, ListChecks, PlayCircle, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import games from '../data/games.json'
import GameCard from '../components/GameCard'
import { useAuth } from '../context/AuthContext'
import { getLibrary, setLibraryEntry } from '../services/communityService'

const tabs = [{id:'all',label:'Todos',icon:BookMarked},{id:'favorite',label:'Favoritos',icon:Heart},{id:'playing',label:'Jugando',icon:PlayCircle},{id:'completed',label:'Completados',icon:Trophy},{id:'wishlist',label:'Wishlist',icon:ListChecks}]
export default function LibraryPage() {
  const { user } = useAuth(); const [tab,setTab]=useState('all'); const [,force]=useState(0); const entries=getLibrary(user.id)
  const shown=useMemo(() => entries.filter((e) => tab==='all' || (tab==='favorite' ? e.favorite : e.state===tab)).map((e) => ({entry:e,game:games.find((g)=>g.id===e.gameId)})).filter((x)=>x.game),[entries,tab])
  const save=(game)=>{setLibraryEntry(user.id,game.id,'favorite');force((x)=>x+1)}
  return <div className="page dark-page"><section className="library-hero"><span className="eyebrow">Tu espacio personal</span><h1>Mi biblioteca</h1><p>Organiza lo que juegas, lo que terminaste y lo que todavía te llama desde el backlog.</p><div className="library-tabs">{tabs.map(({id,label,icon:Icon})=><button className={tab===id?'active':''} key={id} onClick={()=>setTab(id)}><Icon/>{label}</button>)}</div></section><section className="content-section"><div className="results-meta"><b>{shown.length} juegos</b><span>{user.username}</span></div><div className="game-grid">{shown.map(({game,entry})=><div key={game.id} className="library-card-wrap"><GameCard game={game} onSave={save} saved={entry.favorite}/>{entry.progress>0&&<div className="progress-line"><span style={{width:`${entry.progress}%`}}/></div>}</div>)}</div>{!shown.length&&<div className="empty-state"><BookMarked size={44}/><h2>Esta sección está vacía</h2><p>Guarda juegos desde Explorar o desde su ficha.</p></div>}</section></div>
}
