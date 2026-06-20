import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[2]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'complexity-ladder': {
    title: 'The complexity ladder',
    content: (
      <>
        <p>Every project idea sits somewhere on a ladder of complexity. Choosing the right rung is the single most important architectural decision — and one that Claude Code can't make for you.</p>
        <h4>The five rungs</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Rung</th><th>What it is</th><th>When it's right</th><th>Your examples</th></tr></thead>
            <tbody>
              <tr><td><strong>1. Single HTML file</strong></td><td>Everything in one file — HTML, CSS, JS</td><td>Calculators, reference guides, simple tools</td><td>Refinance Tool, Pyramid Principle, Mum's Care Plan, Dashboard</td></tr>
              <tr><td><strong>2. Static multi-page</strong></td><td>Multiple HTML files, maybe shared CSS/JS</td><td>Content sites, game collections</td><td>Neon Arcade (4 games, shared audio.js)</td></tr>
              <tr><td><strong>3. React/Vite SPA</strong></td><td>Component-based, bundled, type-safe</td><td>Interactive apps with state, routing, charts</td><td>AURES, ASX Tracker, Praxis, Family Budget</td></tr>
              <tr><td><strong>4. Full-stack</strong></td><td>React frontend + server backend + database</td><td>Auth, real-time data, multi-user</td><td>GridRival (has a Node server)</td></tr>
              <tr><td><strong>5. Native app</strong></td><td>Tauri, Capacitor, or Electron wrapper</td><td>App Store distribution, native APIs</td><td>None yet — and that's fine</td></tr>
            </tbody>
          </table>
        </div>
        <h4>The golden rule: start one rung lower than you think</h4>
        <p>The most common mistake in software (and especially with AI-assisted coding) is starting too complex. If you <em>think</em> you need React, start with a single HTML file first. If it works — great, you're done. If you outgrow it, you'll understand the requirements better when you upgrade.</p>
        <p>The Pyramid Principle is 562 lines in a single HTML file. It has interactive builders, a copy-to-clipboard feature, and a downloadable PowerPoint toolkit. It doesn't need React. It doesn't need a build step. It's perfect as-is.</p>
        <p>AURES started simpler too — it grew into 192 files and 142K lines because the requirements genuinely demanded it. But it got there incrementally, not all at once.</p>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> Your portfolio naturally splits almost perfectly: 5 single-file HTML projects, 1 static multi-page (Neon Arcade), and 10 React/Vite SPAs. The single-file projects are some of your most polished — no build step, no dependencies, just works.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Complexity has a cost — build time, maintenance, dependencies, things that can break. Choose the simplest architecture that solves the problem. You can always upgrade later; you can rarely simplify.
        </div>
      </>
    ),
  },
  'data-patterns': {
    title: 'Data patterns',
    content: (
      <>
        <p>Where does your app's data live? This decision shapes everything — how the app loads, how you update it, how big it can get.</p>
        <h4>The data ladder</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Pattern</th><th>How it works</th><th>Limits</th><th>Your examples</th></tr></thead>
            <tbody>
              <tr><td><strong>Hardcoded in code</strong></td><td>Arrays and objects in .ts/.tsx files</td><td>~500 items before files get unwieldy</td><td>ASX Tracker strategies, scheme-rounds.ts in AURES (71 CIS projects)</td></tr>
              <tr><td><strong>JSON files</strong></td><td>Static .json in public/ folder, fetched at runtime</td><td>~10MB before load times suffer</td><td>AURES project data, ASX Tracker portfolio snapshots</td></tr>
              <tr><td><strong>SQLite + export</strong></td><td>Python pipeline loads SQLite → exports JSON</td><td>Millions of rows, but data is stale until you re-export</td><td>AURES (1,064 projects, 25M dispatch rows), ASX Tracker (77K price records)</td></tr>
              <tr><td><strong>Hosted database</strong></td><td>Supabase/Postgres, queried live from frontend</td><td>Requires backend, adds latency, costs money at scale</td><td>None yet (not needed)</td></tr>
            </tbody>
          </table>
        </div>
        <h4>The AURES progression — a case study</h4>
        <p>AURES evolved through all three static patterns naturally:</p>
        <ol>
          <li><strong>Early versions:</strong> Project data hardcoded in TypeScript arrays. Quick, simple, but editing meant touching code</li>
          <li><strong>Mid versions:</strong> JSON overlay files per project (one .json per project in <code>data/projects/&lt;tech&gt;/&lt;id&gt;.json</code>). Separated data from code. Hand-editable</li>
          <li><strong>Current:</strong> Python importers fetch from AEMO, OpenElectricity, and other APIs → populate SQLite → exporters emit JSON for the frontend. The SQLite DB has 25M+ rows across 35 tables — far too much for in-code arrays</li>
        </ol>
        <p>Each upgrade happened when the previous pattern genuinely couldn't handle the data volume. Not before.</p>
        <div className="example-box">
          <div className="example-title">When to upgrade your data pattern</div>
          <ul>
            <li><strong>Hardcoded → JSON:</strong> When you have more than ~200 items, or when non-developers need to edit the data, or when the data file is bigger than the component that displays it</li>
            <li><strong>JSON → SQLite pipeline:</strong> When data comes from external sources (APIs, CSVs), when you need to join/aggregate across datasets, or when the total JSON exceeds ~5MB</li>
            <li><strong>SQLite → Hosted DB:</strong> When multiple users need to write data, when you need real-time updates, or when the pipeline lag (re-export + redeploy) is unacceptable</li>
          </ul>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Match the data pattern to the data volume and update frequency. Your ASX Stock Tracker could stay on the SQLite pipeline forever — it only needs updating weekly. AURES might eventually need a hosted DB if you want automatic hourly updates, but the pipeline pattern has carried it through 50+ releases with no issues.
        </div>
      </>
    ),
  },
  'when-to-upgrade': {
    title: 'When to upgrade (and when not to)',
    content: (
      <>
        <p>The temptation — especially when working with Claude Code — is to upgrade everything. "Should Dashboard be a React app? Should Mum's Care Plan use Supabase? Should Neon Arcade have a build step?" Usually the answer is <strong>no</strong>.</p>
        <h4>Signs you should upgrade</h4>
        <ul>
          <li><strong>You're fighting the architecture:</strong> If every new feature requires hacky workarounds, the architecture is limiting you. SchemeTracker at 6,000+ lines is approaching this — it needs splitting, not because it's "wrong" but because adding more tabs becomes painful</li>
          <li><strong>Performance is suffering:</strong> If the app takes more than 2-3 seconds to load, or stutters during interaction, the data is probably too large for the current approach</li>
          <li><strong>You're duplicating effort:</strong> If you're copy-pasting the same pattern across multiple files, you might benefit from a shared component library or a more structured framework</li>
          <li><strong>Users are complaining:</strong> If users (even if it's just you) regularly hit limitations — can't find things, can't update data easily, app crashes — that's a signal</li>
        </ul>
        <h4>Signs you should NOT upgrade</h4>
        <ul>
          <li><strong>"It's not best practice":</strong> Best practice for a Fortune 500 company isn't best practice for a personal project. The Refinance Tool works as a single HTML file. Making it "proper" adds complexity with zero benefit</li>
          <li><strong>"Other projects use React":</strong> Consistency across your portfolio is nice but not necessary. Each project should use the simplest architecture for its needs</li>
          <li><strong>"We might need it later":</strong> YAGNI — You Aren't Gonna Need It. Build for today's requirements. If you need it later, you'll know more about what "it" actually is</li>
          <li><strong>"Claude Code could do it quickly":</strong> Just because the AI can scaffold a React app in 5 minutes doesn't mean you should. Every dependency is future maintenance</li>
        </ul>
        <div className="example-box">
          <div className="example-title">Projects that are perfectly sized</div>
          <p><strong>Pyramid Principle</strong> (562 lines, single HTML): Interactive builders, copy-to-clipboard, downloadable toolkit. No build step, no dependencies, opens instantly. Adding React would make it worse.</p>
          <p><strong>Mum's Care Plan</strong> (1,564 lines, single HTML PWA): Sensitive health data kept entirely local. No server, no cloud, no data breach risk. The simplicity IS the feature.</p>
          <p><strong>Dashboard</strong> (single HTML): A personal index page. Edit with any text editor, refresh in browser. If this were a React app, you'd need to run a build step just to add a new card.</p>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> The right architecture is the simplest one that handles your current needs without friction. Don't upgrade because you can — upgrade because you must. Some of your best projects are single HTML files, and they should stay that way.
        </div>
      </>
    ),
  },
}

export default function Module3({ onBack }: Props) {
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
