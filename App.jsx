import React from "react";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <header className="hero">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
          alt="Nebula Notes Logo"
          className="logo"
        />
        <h1 className="title">Nebula Notes 🌌</h1>
        <p className="subtitle">
          Take notes. Stay organized. Capture your ideas in the cloud. ☁️
        </p>
        <button className="cta-btn">Get Started</button>
      </header>
    </div>
  );
}

export default App;
