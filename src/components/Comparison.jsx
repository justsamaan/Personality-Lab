import { useState, useEffect } from 'react';
import { personalities } from '../data/personalities';

function Comparison({ onBack, currentResultId }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('personalityResults') || '[]');
    setResults(stored.reverse()); // latest first
  }, []);

  return (
    <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0 }}>Lab Records</h2>
        <button className="btn btn-outline" onClick={onBack}>Back to Lab</button>
      </div>

      {results.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>No results to compare yet. Start analyzing!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {results.map(res => {
            const pData = personalities[res.type] || personalities.Analytical;
            const isCurrent = res.id === currentResultId;
            
            return (
              <div 
                key={res.id} 
                style={{ 
                  background: isCurrent ? `rgba(99, 102, 241, 0.1)` : 'rgba(0,0,0,0.2)',
                  border: `1px solid ${isCurrent ? 'var(--theme-color)' : 'var(--glass-border)'}`,
                  padding: '1.5rem', 
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: pData.color }}></div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{pData.avatar}</div>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{res.name}</h3>
                <p style={{ color: pData.color, fontWeight: 'bold', margin: '0 0 1rem 0' }}>{pData.name} ({res.type})</p>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}><strong>Top Strength:</strong> {pData.strengths[0]}</p>
                  <p style={{ margin: 0 }}>Date: {new Date(res.date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Comparison;
