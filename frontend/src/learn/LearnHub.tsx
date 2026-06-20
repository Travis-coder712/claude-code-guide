import { MODULES } from './curriculum'

interface Props {
  onSelectModule: (moduleId: string) => void
}

export default function LearnHub({ onSelectModule }: Props) {
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0)
  const builtLessons = MODULES.reduce((s, m) => s + m.lessons.filter(l => l.status === 'built').length, 0)

  return (
    <div className="app">
      <header className="header">
        <h1>Claude Code Guide</h1>
        <p className="subtitle">
          A hands-on guide to getting the most out of Claude Code — from understanding the platform
          to improving your projects. Built for non-developers who build with AI.
        </p>
        <p className="version">{MODULES.length} modules · {totalLessons} lessons ({builtLessons} built)</p>
      </header>

      <div className="stats">
        <div className="stat">
          <div className="label">Modules</div>
          <div className="value accent">{MODULES.length}</div>
        </div>
        <div className="stat">
          <div className="label">Lessons</div>
          <div className="value green">{totalLessons}</div>
        </div>
        <div className="stat">
          <div className="label">Projects audited</div>
          <div className="value gold">17</div>
        </div>
        <div className="stat">
          <div className="label">Reading time</div>
          <div className="value" style={{ fontSize: 16 }}>~3 hours</div>
        </div>
      </div>

      <div className="module-grid">
        {MODULES.map(m => (
          <div
            key={m.id}
            className={`module-card ${m.status === 'available' ? 'clickable' : 'planned'}`}
            onClick={() => m.status === 'available' && onSelectModule(m.id)}
            style={{ '--module-accent': m.accent } as React.CSSProperties}
          >
            <div className="mc-header">
              <span className="mc-number">{m.number}</span>
              {m.status === 'planned' ? (
                <span className="coming-soon">Coming Soon</span>
              ) : (
                <span className="mc-badge available">{m.lessons.length} lessons</span>
              )}
            </div>
            <h3 className="mc-title">{m.title}</h3>
            <p className="mc-tagline">{m.tagline}</p>
            <div className="mc-lessons">
              {m.lessons.map(l => (
                <div key={l.id} className={`mc-lesson ${l.status}`}>
                  <span className="mc-lesson-num">{l.number}</span>
                  <span className="mc-lesson-title">{l.title}</span>
                  <span className="mc-lesson-time">{l.readingTime}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="footer">
        Claude Code Guide · built with Claude Code · for non-developers who build with AI
      </footer>
    </div>
  )
}
