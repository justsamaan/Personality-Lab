import { useState } from 'react';

function WelcomeScreen({ onStart, onCompare }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name);
  };

  return (
    <div className="glass-panel" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        PersonaVerse
        Digital Personality Lab
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
        Discover your digital psychological profile based on your interactive choices.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Enter your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '1rem',
            width: '100%',
            maxWidth: '300px',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
            background: 'rgba(0,0,0,0.2)',
            color: 'white',
            outline: 'none',
            fontSize: '1rem'
          }}
        />

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button type="submit" className="btn">
            Start Analysis
          </button>

          <button type="button" className="btn btn-outline" onClick={onCompare}>
            View Past Results
          </button>
        </div>
      </form>
    </div>
  );
}

export default WelcomeScreen;
