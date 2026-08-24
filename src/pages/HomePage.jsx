import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [deleting, setDeleting] = useState('')
  async function loadData() {
    try {
      const response = await fetch('https://testaug.onrender.com/api/staff')
      if (!response.ok) throw new Error('Response was not OK')
      const result = await response.json()
      setData(result.data || [])
    } catch (loadError) { console.error(loadError); setError(loadError.message) }
  }
  useEffect(() => { queueMicrotask(loadData) }, [])
  async function deleteStaff(staff) {
    const staffId = staff._id || staff.id
    if (!staffId || !window.confirm(`Delete ${staff.fullName}'s profile?`)) return
    setDeleting(staffId)
    try {
      const response = await fetch(`https://testaug.onrender.com/api/staff/${staffId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('The staff profile could not be deleted.')
      setData((currentData) => currentData.filter((item) => (item._id || item.id) !== staffId))
    } catch (deleteError) { setError(deleteError.message) } finally { setDeleting('') }
  }
  const filteredData = data.filter((staff) => [staff.fullName, staff.email, staff.role, staff.department].join(' ').toLowerCase().includes(query.toLowerCase()))
  return <main className="page-wrap">
    <section className="page-heading"><div><p className="eyebrow">People directory / 2026</p><h1>Staff members</h1><p className="lede">Keep the right people in the right rooms.</p></div><Link className="button button-primary" to="/create"><span>+</span> Add staff member</Link></section>
    <section className="stat-row" aria-label="Staff overview"><div><span className="stat-label">Total staff</span><strong>{data.length || '—'}</strong></div><div><span className="stat-label">On duty today</span><strong>{data.filter((staff) => staff.status?.toLowerCase() === 'active').length || '—'}</strong></div><div><span className="stat-label">Departments</span><strong>{new Set(data.map((staff) => staff.department)).size || '—'}</strong></div><div className="stat-note"><span className="online-dot" /> Live directory</div></section>
    <section className="directory-panel"><div className="panel-toolbar"><div><h2>All staff</h2><span className="muted">{filteredData.length} records</span></div><label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people or departments" /></label></div>
      {error && <div className="error-message">Could not load the directory: {error}</div>}
      {filteredData.length ? <div className="table-scroll"><table><thead><tr><th>Name</th><th>Role</th><th>Department</th><th>Contact</th><th>Shift</th><th>Status</th><th /></tr></thead><tbody>{filteredData.map((staff, index) => <tr key={staff._id || staff.id || `${staff.email}-${index}`}><td><div className="person-cell"><span className="avatar">{staff.fullName?.charAt(0) || '?'}</span><strong>{staff.fullName}</strong></div></td><td>{staff.role || '—'}</td><td>{staff.department || '—'}</td><td><span>{staff.email}</span><small>{staff.phone}</small></td><td>{staff.shift || '—'}</td><td><span className={`status ${staff.status?.toLowerCase() === 'active' ? 'status-active' : ''}`}>{staff.status || 'Unknown'}</span></td><td><div className="row-actions"><Link className="row-action" to={`/edit/${staff._id || staff.id}`} state={{ staff }}>Edit</Link><button className="row-action row-action-delete" onClick={() => deleteStaff(staff)} disabled={deleting === (staff._id || staff.id)}>{deleting === (staff._id || staff.id) ? '...' : 'Delete'}</button></div></td></tr>)}</tbody></table></div> : <div className="empty-state"><span className="empty-icon">◎</span><h3>{query ? 'No matching staff' : 'Your directory is empty'}</h3><p>{query ? 'Try a different name or department.' : 'Add your first team member to get started.'}</p>{!query && <Link className="button button-secondary" to="/create">Create staff profile</Link>}</div>}
    </section>
  </main>
}
