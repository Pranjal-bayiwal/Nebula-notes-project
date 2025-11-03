import React, { useState } from "react";
import "./index.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  const addNote = () => {
    if (newNote.trim() === "") return;
    setNotes([...notes, newNote]);
    setNewNote("");
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      {!showDashboard ? (
        <header className="hero">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
            alt="Nebula Notes Logo"
            className="logo"
          />
          <h1 className="title">Nebula Notes 🌌</h1>
          <p className="subtitle">
            Capture your thoughts and ideas — anytime, anywhere ☁️
          </p>
          <button className="cta-btn" onClick={() => setShowDashboard(true)}>
            Open Notes Dashboard
          </button>
        </header>
      ) : (
        <div className="notes-dashboard">
          <h2>📝 Your Notes</h2>
          <div className="note-input">
            <input
              type="text"
              placeholder="Type a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={addNote}>Add</button>
          </div>

          <div className="notes-list">
            {notes.length === 0 ? (
              <p className="empty">No notes yet. Add one above!</p>
            ) : (
              notes.map((note, index) => (
                <div key={index} className="note-card">
                  <p>{note}</p>
                  <button className="delete-btn" onClick={() => deleteNote(index)}>
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          <button className="back-btn" onClick={() => setShowDashboard(false)}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
