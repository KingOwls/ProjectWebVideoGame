import { KeyRound, ShieldCheck, Unplug } from 'lucide-react'
import { useState } from 'react'
import Modal from './Modal'
import { getRawgKey, setRawgKey } from '../services/rawgService'

export default function IntegrationModal({ onClose }) {
  const [key, setKey] = useState(getRawgKey())
  const [saved, setSaved] = useState(false)
  const save = (e) => {
    e.preventDefault()
    setRawgKey(key)
    setSaved(true)
  }
  return (
    <Modal title="Integración RAWG" onClose={onClose}>
      <div className="integration-note"><ShieldCheck size={22}/><div><b>GitHub Pages es público</b><p>Una clave incluida dentro del bundle puede inspeccionarse. Para esta demo la clave se introduce manualmente y se guarda solo en <code>sessionStorage</code>.</p></div></div>
      <form className="stack-form" onSubmit={save}>
        <label>API key RAWG<input value={key} onChange={(e) => { setKey(e.target.value); setSaved(false) }} placeholder="Pega aquí tu key para esta sesión" autoComplete="off"/></label>
        <div className="modal-actions">
          <button type="button" className="button secondary" onClick={() => { setKey(''); setRawgKey(''); setSaved(true) }}><Unplug size={17}/> Desconectar</button>
          <button className="button primary"><KeyRound size={17}/> Guardar en sesión</button>
        </div>
        {saved && <p className="success-message">Configuración actualizada.</p>}
      </form>
      <p className="tiny-note">RAWG requiere atribución cuando sus datos o imágenes se usan. GameHive muestra el proveedor en resultados externos.</p>
    </Modal>
  )
}
