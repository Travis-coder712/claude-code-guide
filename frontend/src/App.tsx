import { useState } from 'react'
import LearnHub from './learn/LearnHub'
import Module1 from './learn/Module1'
import './App.css'

function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  if (activeModule === 'what-is-claude-code') {
    return <div className="app"><Module1 onBack={() => setActiveModule(null)} /></div>
  }

  // For modules 2-7, show a stub that lists lessons with a back button
  if (activeModule) {
    return (
      <div className="app">
        <div className="lesson-page">
          <div className="lesson-nav-top">
            <button className="lesson-back" onClick={() => setActiveModule(null)}>← All Modules</button>
          </div>
          <div className="lesson-content" style={{ textAlign: 'center', padding: '60px 32px' }}>
            <h2>Module coming soon</h2>
            <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>
              This module's lessons are outlined but not yet built. Check back soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <LearnHub onSelectModule={setActiveModule} />
}

export default App
