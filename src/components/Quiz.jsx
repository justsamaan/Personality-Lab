import { useState, useEffect } from 'react';
import { questions } from '../data/questions';

function Quiz({ onComplete, userName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    Analytical: 0,
    Empathetic: 0,
    Creative: 0,
    Pragmatic: 0
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOptionSelect = (trait, points) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    const newScores = {
      ...scores,
      [trait]: scores[trait] + points
    };
    
    setScores(newScores);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        // Calculate result
        let highestTrait = 'Analytical';
        let maxScore = -1;
        
        for (const [key, value] of Object.entries(newScores)) {
          if (value > maxScore) {
            maxScore = value;
            highestTrait = key;
          }
        }
        
        onComplete(highestTrait);
      }
    }, 400); // Wait for transition
  };

  const currentQ = questions[currentQuestion];
  const progressPercentage = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        <span>Question {currentQuestion + 1} of {questions.length}</span>
        <span>{userName}</span>
      </div>
      
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease', transform: isTransitioning ? 'translateX(-20px)' : 'translateX(0)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', lineHeight: '1.4' }}>
          {currentQ.text}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option.trait, option.points)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                padding: '1.2rem',
                borderRadius: '12px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
                e.target.style.transform = 'scale(1.02)';
                e.target.style.borderColor = 'var(--theme-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.05)';
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = 'var(--glass-border)';
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
