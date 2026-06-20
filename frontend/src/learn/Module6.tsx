import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[5]
interface Props { onBack: () => void }

const PROJECTS = [
  { name: 'AURES Intelligence', tech: 'React/Vite + Python/SQLite', files: 192, loc: '142K', status: 'Active', rating: 'Excellent', improvements: ['Split SchemeTracker.tsx (6,000+ lines) into per-tab components', 'Add Research Notes system for time-sensitive commentary', 'Consider Cloudflare Workers for scheduled data refresh'] },
  { name: 'ASX Stock Tracker', tech: 'React/Vite + Python/SQLite', files: 30, loc: '5K', status: 'Active', rating: 'Excellent', improvements: ['Add remaining strategy models for forward periods', 'Consider 12-month rebalancing cycle for CGT efficiency', 'Add portfolio export for tax reporting'] },
  { name: 'GridRival (Full)', tech: 'React + Node server', files: 80, loc: '40K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md — currently no session docs', 'Review if the server component is still needed', 'Consider archiving if not actively used'] },
  { name: 'GridRival Showcase', tech: 'React/Vite', files: 50, loc: '20K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md', 'Consider merging minigames into standalone pages', 'Update NEM data if used for education'] },
  { name: 'Praxis', tech: 'React/Vite/Tailwind', files: 40, loc: '15K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md', 'Build remaining modules (2-10 are stubbed)', 'Could be the TTS voiceover pilot project'] },
  { name: 'Neon Arcade', tech: 'Static HTML + Phaser/Three.js', files: 25, loc: '61K', status: 'Maintenance', rating: 'Excellent', improvements: ['Restructure hub for non-neon games', 'Add space shooter as next game', 'Document the procedural audio system'] },
  { name: 'Family Budget', tech: 'React/Vite', files: 20, loc: '8K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md', 'Local-only is correct for financial data', 'Consider a data export feature for records'] },
  { name: 'Home Reno Hub', tech: 'React/Vite', files: 25, loc: '10K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md', 'Archive if renovation complete', 'Good candidate for converting to a template'] },
  { name: 'VCE Study Apps (×3)', tech: 'React/Vite', files: '~30 each', loc: '~10K each', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md to each', 'Shared base could reduce duplication', 'Update curriculum data each year'] },
  { name: 'Wings of Fire RPG', tech: 'React/Vite PWA', files: 30, loc: '12K', status: 'Maintenance', rating: 'Good', improvements: ['Add CLAUDE.md', 'Consider archiving if not actively played'] },
  { name: 'Pyramid Principle', tech: 'Single HTML', files: 1, loc: '562', status: 'Archive', rating: 'Perfect', improvements: ['None needed — it\'s done', 'Could add TTS voiceover', 'Template for future single-file modules'] },
  { name: 'Decisions That Stick', tech: 'Single HTML', files: 1, loc: '~600', status: 'Archive', rating: 'Perfect', improvements: ['None needed', 'Workshop pack is a nice touch'] },
  { name: 'Refinance Tool', tech: 'Single HTML', files: 1, loc: '~400', status: 'Archive', rating: 'Perfect', improvements: ['None needed — single-file calculator, works perfectly'] },
  { name: "Mum's Care Plan", tech: 'Single HTML PWA', files: 1, loc: '1,564', status: 'Archive', rating: 'Excellent', improvements: ['Correct architecture for sensitive health data', 'No cloud, no server, no risk. Perfect'] },
  { name: 'Dashboard', tech: 'Single HTML', files: 1, loc: '~960', status: 'Active (edit-only)', rating: 'Good', improvements: ['Single HTML is correct — no build step needed', 'Keep manually editing', 'Consider a "Coming Soon" section for planned projects'] },
]

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'portfolio-overview': {
    title: 'The portfolio at a glance',
    content: (
      <>
        <p>You've built <strong>17 projects</strong> with Claude Code — from a 562-line calculator to a 142,000-line energy intelligence platform. Here's the full picture.</p>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Category</th><th>Count</th><th>Examples</th></tr></thead>
            <tbody>
              <tr><td><strong>React/Vite apps</strong></td><td>10</td><td>AURES, ASX Tracker, Praxis, Family Budget, VCE apps</td></tr>
              <tr><td><strong>Single-file HTML</strong></td><td>5</td><td>Pyramid Principle, Refinance Tool, Mum's Care, Dashboard, Decisions</td></tr>
              <tr><td><strong>Static multi-page</strong></td><td>1</td><td>Neon Arcade (Phaser + Three.js PWA)</td></tr>
              <tr><td><strong>Full-stack</strong></td><td>1</td><td>GridRival (React + Node server)</td></tr>
            </tbody>
          </table>
        </div>
        <h4>Portfolio statistics</h4>
        <ul>
          <li><strong>Total lines of code:</strong> ~550,000+</li>
          <li><strong>Projects on GitHub Pages:</strong> 12 (public)</li>
          <li><strong>Projects local-only:</strong> 5 (private/sensitive data)</li>
          <li><strong>Projects with CLAUDE.md:</strong> 2 of 17 (gap!)</li>
          <li><strong>Consistent dark theme:</strong> Yes, across all projects</li>
          <li><strong>Mobile-first tested:</strong> Yes (iPhone primary device)</li>
        </ul>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> 550,000 lines of code is roughly equivalent to what a small software team produces in 2-3 years. You've done it in months, as a non-developer, using Claude Code. That's the "vibe coding" revolution in action.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Your portfolio is impressively diverse — from single-file tools to complex data platforms. The architecture choices are mostly right: simple projects use simple tech, complex projects use React/Vite. The main gap is documentation (CLAUDE.md) for session continuity.
        </div>
      </>
    ),
  },
  'whats-working': {
    title: "What you're already doing well",
    content: (
      <>
        <p>Before looking at improvements, it's worth recognising what's already working — because these patterns should be preserved and replicated.</p>
        <h4>1. Session handoff documentation (AURES)</h4>
        <p>AURES has the most sophisticated session continuity setup of any personal project I've seen: <code>CLAUDE.md</code> → <code>SESSION_OPENER.md</code> → <code>NEXT_SESSION_HANDOFF.md</code> → <code>INTELLIGENCE_LAYER_PLAN.md</code>. 50+ releases across dozens of sessions, and any new session can pick up cold. This is genuinely best-in-class.</p>
        <h4>2. The pipeline pattern</h4>
        <p>Importers → SQLite → exporters → static JSON → React frontend. This pattern (used in AURES and ASX Tracker) is elegant: the database handles complexity, the frontend stays simple, and the data is versioned in git. Many professional teams use worse architectures.</p>
        <h4>3. Dark theme consistency</h4>
        <p>Every project shares the same visual DNA — <code>--bg: #0b0d12</code>, rounded corners, system fonts, CSS variables. This wasn't planned, but it emerged naturally and gives your portfolio a professional, cohesive feel.</p>
        <h4>4. Right-sized architectures</h4>
        <p>The Refinance Tool is a single HTML file because that's all it needs. AURES is a React/Vite app because it genuinely needs components, routing, and charts. You haven't over-engineered the simple projects or under-engineered the complex ones.</p>
        <h4>5. Memory and feedback files</h4>
        <p>Your memory system has user preferences, project context, feedback from corrections, and cross-project patterns. The feedback files ("never downgrade status in imports") prevent repeated mistakes. This is advanced use of Claude Code's persistence layer.</p>
        <h4>6. Planning before building</h4>
        <p>The planning session that started 8 projects with research agents before writing code is a sophisticated workflow. Most users jump straight to "build me this" without scoping or researching first.</p>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Don't fix what's working. The pipeline pattern, session handoffs, and architecture choices are strong. The improvements in the next lesson are additive — they build on this foundation, not replace it.
        </div>
      </>
    ),
  },
  'improvements': {
    title: 'Per-project improvements',
    content: (
      <>
        <p>For each project, here are the top actionable improvements. Click through to see details.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          {PROJECTS.map(p => (
            <div key={p.name} className="example-box" style={{ marginTop: 0, marginBottom: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                <div className="example-title" style={{ margin: 0 }}>{p.name}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, background: 'rgba(107,140,255,0.15)', color: 'var(--accent)' }}>{p.tech}</span>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10,
                    background: p.status === 'Active' ? 'rgba(81,207,102,0.15)' : p.status === 'Archive' ? 'rgba(107,112,136,0.15)' : 'rgba(255,212,59,0.15)',
                    color: p.status === 'Active' ? 'var(--green)' : p.status === 'Archive' ? 'var(--text-mute)' : 'var(--gold)' }}>{p.status}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-mute)', margin: '4px 0 8px' }}>
                {typeof p.files === 'number' ? `${p.files} files` : p.files} · {p.loc} lines · Rating: {p.rating}
              </div>
              <ul style={{ fontSize: 13, color: 'var(--text-dim)', margin: 0, paddingLeft: 18 }}>
                {p.improvements.map((imp, i) => <li key={i} style={{ marginBottom: 3 }}>{imp}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="lesson-callout" style={{ marginTop: 20 }}>
          <strong>The #1 quick win across the portfolio:</strong> Add a CLAUDE.md file to the 15 projects that don't have one. Even 5 lines (project name, build commands, key files) saves significant context per session. You could do all 15 in a single Claude Code session.
        </div>
      </>
    ),
  },
}

export default function Module6({ onBack }: Props) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const lesson = mod.lessons[currentLesson]
  const content = LESSONS[lesson.id]
  return (
    <div className="lesson-page">
      <div className="lesson-nav-top">
        <button className="lesson-back" onClick={onBack}>← All Modules</button>
        <span className="lesson-module-label" style={{ color: mod.accent }}>{mod.title}</span>
      </div>
      <div className="lesson-sidebar">
        {mod.lessons.map((l, i) => (
          <button key={l.id} className={`lesson-tab ${i === currentLesson ? 'active' : ''}`} onClick={() => setCurrentLesson(i)}>
            <span className="lt-num">{l.number}</span><span className="lt-title">{l.title}</span><span className="lt-time">{l.readingTime}</span>
          </button>
        ))}
      </div>
      <div className="lesson-content">
        <div className="lesson-header">
          <span className="lesson-num">Lesson {lesson.number} of {mod.lessons.length}</span>
          <h2>{content?.title ?? lesson.title}</h2>
          <span className="lesson-time">{lesson.readingTime} read</span>
        </div>
        <div className="lesson-body">{content?.content ?? <p>Content coming soon.</p>}</div>
        <div className="lesson-footer">
          {currentLesson > 0 && <button className="lesson-prev" onClick={() => setCurrentLesson(currentLesson - 1)}>← {mod.lessons[currentLesson - 1].title}</button>}
          <div style={{ flex: 1 }} />
          {currentLesson < mod.lessons.length - 1 && <button className="lesson-next" onClick={() => setCurrentLesson(currentLesson + 1)}>{mod.lessons[currentLesson + 1].title} →</button>}
        </div>
      </div>
    </div>
  )
}
