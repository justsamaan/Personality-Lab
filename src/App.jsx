import { useState } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Comparison from './components/Comparison'
import { personalities } from './data/personalities'

function App() {
  const [view, setView] = useState('welcome') // welcome, quiz, result, compare
  const [resultId, setResultId] = useState(null)
  const [currentPersonality, setCurrentPersonality] = useState(null)
  const [userName, setUserName] = useState('')

  const handleStart = (name) => {
    setUserName(name || 'Anonymous Explorer')
    setView('quiz')
  }

  const handleQuizComplete = (personalityType) => {
    const pData = personalities[personalityType];
    
    // Create result object
    const resultObj = {
      id: Date.now().toString(),
      name: userName || "Anonymous",
      type: personalityType,
      date: new Date().toISOString()
    };
    
    // Save to local storage
    const pastResults = JSON.parse(localStorage.getItem('personalityResults') || '[]');
    pastResults.push(resultObj);
    localStorage.setItem('personalityResults', JSON.stringify(pastResults));
    
    setResultId(resultObj.id);
    setCurrentPersonality(pData);
    
    // Update theme immediately
    document.documentElement.style.setProperty('--theme-color', pData.color);
    document.documentElement.style.setProperty('--accent-glow', `${pData.color}80`); // 50% opacity hex
    
    setView('result');
  }

  const goHome = () => {
    document.documentElement.style.setProperty('--theme-color', '#6366f1');
    document.documentElement.style.setProperty('--accent-glow', 'rgba(99, 102, 241, 0.5)');
    setView('welcome');
  }

  const goToCompare = () => {
    setView('compare');
  }

  return (
    <div className="app-container">
      {view === 'welcome' && (
        <WelcomeScreen onStart={handleStart} onCompare={goToCompare} />
      )}
      {view === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} userName={userName} />
      )}
      {view === 'result' && (
        <Result 
          personality={currentPersonality} 
          onRetake={goHome} 
          onCompare={goToCompare} 
        />
      )}
      {view === 'compare' && (
        <Comparison onBack={goHome} currentResultId={resultId} />
      )}
    </div>
  )
}

export default App
