import React, { useState, useEffect } from 'react'

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
function nowString() {
  return new Date().toLocaleString()
}

function sampleColor(seed) {
  // gentle pastel based on seed (deterministic-ish)
  const h = Math.abs(seed.split('').reduce((a,c)=>a+c.charCodeAt(0),0)) % 360
  return `linear-gradient(135deg, hsl(${h} 70% 85%), hsl(${(h+40)%360} 70% 75%))`
}

export default function App(){
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('nebulanotes.notes')) || [] }
    catch { return [] }
  })
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => {
    localStorage.setItem('nebulanotes.notes', JSON.stringify(notes))
  }, [notes])

  function showToast(text){
    setToast(text)
    setTimeout(()=>setToast(''), 1400)
  }

  function clearForm(){
    setTitle(''); setBody(''); setEditingId(null)
  }

  function saveNote(e){
    e?.preventDefault()
    if(!title.trim() && !body.trim()){ showToast('Write something...'); return }
    if(editingId){
      setNotes(prev => prev.map(n => n.id===editingId ? { ...n, title, body, updated: nowString() } : n))
      showToast('Updated')
    } else {
      const id = makeId()
      setNotes(prev => [{ id, title, body, created: nowString() }, ...prev])
      showToast('Saved')
    }
    clearForm()
  }

  function editNote(note){
    setEditingId(note.id); setTitle(note.title); setBody(note.body); window.scrollTo({ top: 0, behavior:'smooth' })
  }

  function deleteNote(id){
    if(!confirm('Delete this note?')) return
    setNotes(prev => prev.filter(n => n.id !== id))
    showToast('Deleted')
  }

  const filtered = notes.filter(n => (n.title + ' ' + n.body).toLowerCase().includes(query.toLowerCase()))

  return (
    <div style={{ maxWidth: 980, margin: '28px auto', padding: 20, fontFamily: 'Inter, system-ui, sans-serif', color: '#eef2ff', background: '#071428' }}>
      <header style={{ textAlign: 'center', marginBottom: 18 }}>
        <h1 style={{ fontSize: '2.2rem', margin: 0, background: 'linear-gradient(90deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', color: 'transparent' }}>NebulaNotes</h1>
        <p style={{ color: '#bcd2ff', marginTop: 6 }}>Tiny notes, cosmic vibes — saved to your browser.</p>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <form onSubmit={saveNote} style={{ background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 12 }}>
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{ width:'100%', padding:10, borderRadius:8, border: '1px solid rgba(255,255,255,0.06)', background:'transparent', color:'inherit', marginBottom:8 }} />
          <textarea placeholder="Write your note..." value={body} onChange={e=>setBody(e.target.value)} style={{ width:'100%', minHeight:96, padding:10, borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', background:'transparent', color:'inherit' }} />
          <div style={{ display:'flex', justifyContent:'flex-end', gap:8, marginTop:8 }}>
            <button type="submit" style={{ background: 'linear-gradient(90deg,#7c3aed,#60a5fa)', border: 'none', padding:'8px 12px', borderRadius:8, color:'white' }}>{editingId? 'Update' : 'Save'}</button>
            <button type="button" onClick={clearForm} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.06)', padding:'8px 12px', borderRadius:8 }}>Clear</button>
          </div>
        </form>

        <div style={{ display:'flex', gap:12, alignItems:'center' }}>
          <input placeholder="Search notes..." value={query} onChange={e=>setQuery(e.target.value)} style={{ flex:1, padding:10, borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', background:'transparent', color:'inherit' }} />
          <div style={{ color:'#9fb0dc', whiteSpace:'nowrap' }}>{filtered.length} note{filtered.length!==1 ? 's' : ''}</div>
        </div>

        <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
          {filtered.length === 0 && <div style={{ padding:20, color:'#9fb0dc' }}>No notes yet — write your first one.</div>}
          {filtered.map(note => (
            <article key={note.id} style={{ padding:12, borderRadius:12, minHeight:140, display:'flex', flexDirection:'column', justifyContent:'space-between', boxShadow:'0 12px 30px rgba(2,6,23,0.5)', background: sampleColor(note.id) }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'start' }}>
                <h3 style={{ margin:0, fontSize:'1.05rem' }}>{note.title || 'Untitled'}</h3>
                <div style={{ fontSize:'0.8rem', color:'rgba(7,32,58,0.8)' }}>{note.updated || note.created}</div>
              </div>
              <p style={{ marginTop:8, color:'rgba(7,24,37,0.95)', whiteSpace:'pre-wrap' }}>{note.body}</p>
              <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:10 }}>
                <button onClick={()=>editNote(note)} style={{ background:'rgba(255,255,255,0.06)', border:'none', padding:'6px 8px', borderRadius:8 }}>Edit</button>
                <button onClick={()=>deleteNote(note.id)} style={{ background:'rgba(255,255,255,0.06)', border:'none', padding:'6px 8px', borderRadius:8 }}>Delete</button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {toast && <div style={{ position:'fixed', right:20, bottom:20, background:'#05203b', color:'white', padding:'8px 12px', borderRadius:8 }}>{toast}</div>}

      <footer style={{ textAlign:'center', marginTop:18, color:'#9fb0dc' }}>Made with ✨ — export by running <code>npm run build</code></footer>
    </div>
  )
}
