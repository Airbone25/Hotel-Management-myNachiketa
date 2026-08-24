import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CreatePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', role: '', department: '', shift: 'Morning', status: 'Active' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  function updateField(event) { setForm({ ...form, [event.target.name]: event.target.value }) }
  async function createStaff(event) {
    event.preventDefault(); setError(''); setSaving(true)
    try {
      const response = await fetch('http://testaug.onrender.com/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error('The staff profile could not be created.')
      navigate('/')
    } catch (saveError) { console.error(saveError); setError(saveError.message) } finally { setSaving(false) }
  }
  return <main className="page-wrap create-layout"><div className="back-link"><Link to="/">← Back to directory</Link></div><section className="form-intro"><p className="eyebrow">People directory / New profile</p><h1>Add staff member</h1><p className="lede">Create a profile so the team knows who is on deck.</p></section><form className="staff-form" onSubmit={createStaff}>
    <div className="form-section"><div className="section-number">01</div><div className="section-copy"><h2>Personal details</h2><p>The essentials for identifying and reaching this team member.</p></div><div className="field-grid"><label>Full name<input name="fullName" value={form.fullName} onChange={updateField} placeholder="e.g. Maya Chen" required /></label><label>Email address<input type="email" name="email" value={form.email} onChange={updateField} placeholder="maya@atriumhotel.com" required /></label><label>Phone number<input name="phone" value={form.phone} onChange={updateField} placeholder="+1 555 000 0000" required /></label></div></div>
    <div className="form-section"><div className="section-number">02</div><div className="section-copy"><h2>Position &amp; schedule</h2><p>Help managers understand where this person belongs.</p></div><div className="field-grid"><label>Role<input name="role" value={form.role} onChange={updateField} placeholder="e.g. Front desk associate" required /></label><label>Department<select name="department" value={form.department} onChange={updateField} required><option value="">Select department</option><option>Front Office</option><option>Housekeeping</option><option>Food &amp; Beverage</option><option>Engineering</option><option>Sales &amp; Marketing</option></select></label><label>Shift<select name="shift" value={form.shift} onChange={updateField}><option>Morning</option><option>Afternoon</option><option>Evening</option><option>Overnight</option></select></label><label>Status<select name="status" value={form.status} onChange={updateField}><option>Active</option><option>On leave</option><option>Inactive</option></select></label></div></div>
    {error && <div className="error-message">{error}</div>}<div className="form-actions"><Link className="button button-quiet" to="/">Cancel</Link><button className="button button-primary" type="submit" disabled={saving}>{saving ? 'Creating profile...' : 'Create profile  →'}</button></div>
  </form></main>
}
