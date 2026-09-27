import { X } from 'lucide-react'

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section className="modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <header><h2>{title}</h2><button className="icon-button ghost" onClick={onClose}><X size={20}/></button></header>
        {children}
      </section>
    </div>
  )
}
