function Result({ personality, onRetake, onCompare }) {
  if (!personality) return null;

  return (
    <div className="glass-panel" style={{ width: '100%', animation: 'fadeIn 0.8s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
          {personality.avatar}
        </div>
        <h2 style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>
          Your Profile
        </h2>
        <h1 style={{ fontSize: '3rem', margin: '0.5rem 0', color: 'var(--theme-color)' }}>
          {personality.name}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ color: 'var(--theme-color)', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Core Strengths</h3>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {personality.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
          </ul>
        </div>
        
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ color: '#ef4444', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Growth Areas</h3>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {personality.weaknesses.map((wk, idx) => <li key={idx}>{wk}</li>)}
          </ul>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ color: '#3b82f6', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Study Style</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{personality.studyStyle}</p>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
          <h3 style={{ color: '#f59e0b', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Work Style</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{personality.workStyle}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button onClick={onRetake} className="btn btn-outline" style={{ color: 'var(--text-primary)' }}>
          Retake Analysis
        </button>
        <button onClick={onCompare} className="btn">
          Compare with Friends
        </button>
      </div>
    </div>
  );
}

export default Result;
