import { Check, RotateCcw, ShieldAlert, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import StatusBadge from '../components/StatusBadge'
import { getReports, resetCommunityDemo, updateReport } from '../services/communityService'

export default function AdminReportsPage() {
 const [reports,setReports]=useState(getReports); const change=(id,status)=>setReports(updateReport(id,status)); const reset=()=>{resetCommunityDemo();setReports(getReports())}
 return <AdminLayout title="Gestión de reportes" subtitle="Cada decisión mantiene un estado explícito y visible."><div className="admin-toolbar"><div className="report-summary"><ShieldAlert/><b>{reports.filter((r)=>r.status==='pending').length}</b><span>pendientes</span></div><button className="button secondary light" onClick={reset}><RotateCcw/> Restablecer demo</button></div><section className="admin-panel table-panel"><div className="table-scroll"><table className="admin-table reports-table"><thead><tr><th>ID</th><th>Contenido</th><th>Reportado por</th><th>Motivo</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{reports.map((report)=><tr key={report.id}><td><code>{report.id.slice(0,12)}</code></td><td><b>{report.content}</b><small>{report.contentType} · {report.date}</small></td><td>{report.reporter}</td><td>{report.reason}</td><td><StatusBadge status={report.status}/></td><td><div className="table-actions"><button title="Aprobar" onClick={()=>change(report.id,'approved')}><Check/></button><button title="Rechazar" onClick={()=>change(report.id,'rejected')}><X/></button><button title="Eliminar" onClick={()=>change(report.id,'removed')}><Trash2/></button></div></td></tr>)}</tbody></table></div></section></AdminLayout>
}
