import { useState } from 'react'
import LearnHub from './learn/LearnHub'
import Module1 from './learn/Module1'
import Module2 from './learn/Module2'
import Module3 from './learn/Module3'
import Module4 from './learn/Module4'
import Module5 from './learn/Module5'
import Module6 from './learn/Module6'
import Module7 from './learn/Module7'
import './App.css'

const MODULE_MAP: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  'what-is-claude-code': Module1,
  'web-platform': Module2,
  'architecture': Module3,
  'growing-codebases': Module4,
  'better-results': Module5,
  'your-projects': Module6,
  'whats-next': Module7,
}

function App() {
  const [activeModule, setActiveModule] = useState<string | null>(null)

  if (activeModule && MODULE_MAP[activeModule]) {
    const ModuleComponent = MODULE_MAP[activeModule]
    return <div className="app"><ModuleComponent onBack={() => setActiveModule(null)} /></div>
  }

  return <LearnHub onSelectModule={setActiveModule} />
}

export default App
