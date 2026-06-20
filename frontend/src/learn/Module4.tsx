import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[3]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'too-big': {
    title: 'When a file is too big',
    content: (
      <>
        <p>AURES's SchemeTracker.tsx is over 6,000 lines. It has 9+ tabs, each with multiple sections, charts, tables, and interactive elements. It works — but every change is slow to navigate, slow to type-check, and Claude Code needs to read large chunks of it for even small edits.</p>
        <h4>The signals</h4>
        <ul>
          <li><strong>&gt; 1,000 lines:</strong> Worth watching. Not necessarily a problem yet</li>
          <li><strong>&gt; 2,000 lines:</strong> Consider splitting. You're probably scrolling a lot</li>
          <li><strong>&gt; 4,000 lines:</strong> Split it. Claude Code needs to read large chunks for context, burning tokens</li>
          <li><strong>&gt; 6,000 lines:</strong> Definitely split. TypeScript checking slows down, imports become complex</li>
        </ul>
        <h4>How to split</h4>
        <p>The key insight: <strong>split by feature, not by type</strong>. Don't create a "components" folder and a "hooks" folder — create a folder per feature.</p>
        <div className="example-box">
          <div className="example-title">SchemeTracker split plan</div>
          <p>Instead of one 6,000-line file, split into:</p>
          <ul>
            <li><code>SchemeTracker/index.tsx</code> — tab container + routing (200 lines)</li>
            <li><code>SchemeTracker/OverviewTab.tsx</code> — overview charts and stats</li>
            <li><code>SchemeTracker/MilestoneTab.tsx</code> — milestone tracker</li>
            <li><code>SchemeTracker/NSWWindTab.tsx</code> — NSW Wind deep dive</li>
            <li><code>SchemeTracker/OpenRoundsTab.tsx</code> — CIS + LTESA open rounds</li>
            <li><code>SchemeTracker/shared.ts</code> — shared types and utilities</li>
          </ul>
          <p>Each tab becomes its own file, testable and editable independently. The index file just renders the active tab. Total code doesn't change — it's just organised better.</p>
        </div>
        <h4>When NOT to split</h4>
        <p>A 1,500-line component that does one coherent thing (like BatteryWatch with its section-nav pattern) is fine as one file. Splitting it would just create indirection without benefit. The question isn't "is this file big?" — it's "is this file hard to work with?"</p>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> Only 2 of your 17 projects have a CLAUDE.md file (AURES and ASX Stock Tracker). The other 15 — including complex ones like GridRival and Praxis — would benefit from even a 5-line CLAUDE.md with build commands and key file locations.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> File size is a proxy for complexity. Split when the file becomes hard to work with — not before. Split by feature (one file per tab/section), not by type (components/hooks/utils folders). And add a CLAUDE.md to every project with more than 5 files.
        </div>
      </>
    ),
  },
  'project-lifecycle': {
    title: 'The lifecycle of a project',
    content: (
      <>
        <p>Not every project needs active development forever. Understanding where each project sits in its lifecycle helps you decide where to invest your time.</p>
        <h4>The three phases</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Phase</th><th>What it means</th><th>What to do</th><th>Your projects</th></tr></thead>
            <tbody>
              <tr><td><strong>Active</strong></td><td>Regular development, new features, data updates</td><td>Invest time, maintain docs, keep dependencies current</td><td>AURES, ASX Tracker, this guide</td></tr>
              <tr><td><strong>Maintenance</strong></td><td>Feature-complete, occasional fixes</td><td>Fix bugs when found, don't add features. Keep it working</td><td>Neon Arcade, Praxis, Family Budget, VCE apps</td></tr>
              <tr><td><strong>Archive</strong></td><td>Done. No changes planned or needed</td><td>Leave it running. Don't touch it. It's finished</td><td>Pyramid Principle, Refinance Tool, Decisions That Stick, Brisbane Builder</td></tr>
            </tbody>
          </table>
        </div>
        <h4>The archive decision</h4>
        <p>Archiving doesn't mean deleting. It means <strong>accepting that the project is done</strong> and stopping the urge to "improve" it. The Pyramid Principle is a finished product — 562 lines, does everything it needs to, looks great. Spending a session "modernising" it would only add risk.</p>
        <h4>The maintenance trap</h4>
        <p>The most dangerous phase is maintenance. It's tempting to keep adding "one more thing" to a stable project, gradually turning maintenance into active development without consciously choosing to. Before starting work on any project, ask: <strong>am I maintaining this or actively developing it?</strong> If maintaining, the bar for changes should be high.</p>
        <div className="example-box">
          <div className="example-title">Lifecycle assessment for your portfolio</div>
          <p><strong>Active (3):</strong> AURES (v3.16.8, 50+ releases), ASX Stock Tracker (v1.2.0, just shipped), this Claude Code Guide</p>
          <p><strong>Maintenance (7):</strong> Neon Arcade (4 games, stable), Praxis (Module 1 built), Family Budget, Home Reno Hub, VCE apps (3), Wings of Fire RPG</p>
          <p><strong>Archive (7):</strong> Pyramid Principle, Decisions That Stick, Refinance Tool, Mum's Care Plan, Brisbane Builder, Surf Check, Drawing Adventure, Dashboard (edit-only)</p>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Finishing a project is a skill. Not everything needs to grow forever. Some of your best work (Pyramid Principle, Refinance Tool) is in the "done" category — and that's a success, not a limitation.
        </div>
      </>
    ),
  },
  'ui-freshness': {
    title: 'Keeping UIs current',
    content: (
      <>
        <p>A dark theme, good typography, and responsive layout go a long way. Your projects share a consistent visual identity — dark backgrounds, CSS variables, mobile-first. That's already better than most.</p>
        <h4>What makes a UI feel dated</h4>
        <ul>
          <li><strong>Typography:</strong> System fonts (-apple-system, Inter) stay current forever. Custom fonts go in and out of fashion</li>
          <li><strong>Spacing:</strong> Modern UIs have generous padding and whitespace. Cramped UIs feel old</li>
          <li><strong>Borders:</strong> Sharp 1px borders → subtle borders with rounded corners. Your projects already use <code>border-radius: 12px</code> consistently</li>
          <li><strong>Colour:</strong> Pure black (#000) backgrounds feel harsh. Your <code>#0b0d12</code> dark blue-grey is modern and comfortable</li>
          <li><strong>Interactions:</strong> Hover states, transitions, micro-animations. A <code>transition: 0.15s</code> on interactive elements makes everything feel polished</li>
        </ul>
        <h4>Your design system (whether you know it or not)</h4>
        <p>Across your projects, you've developed a consistent set of CSS variables:</p>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Variable</th><th>Value</th><th>Used in</th></tr></thead>
            <tbody>
              <tr><td><code>--bg</code></td><td>#0b0d12</td><td>Nearly all projects</td></tr>
              <tr><td><code>--surface</code></td><td>#161922</td><td>Card backgrounds</td></tr>
              <tr><td><code>--accent</code></td><td>#6b8cff</td><td>Primary action colour</td></tr>
              <tr><td><code>--green</code></td><td>#51cf66</td><td>Positive/success states</td></tr>
              <tr><td><code>--red</code></td><td>#ff6b6b</td><td>Negative/error states</td></tr>
              <tr><td><code>--radius</code></td><td>12px</td><td>Card/button corners</td></tr>
            </tbody>
          </table>
        </div>
        <p>This consistency makes your portfolio look cohesive, even though each project was built independently. It's an emergent design system — and it works.</p>
        <h4>When to refresh a UI</h4>
        <ul>
          <li><strong>Never refresh for the sake of it.</strong> If it works and looks fine, leave it</li>
          <li><strong>Refresh when adding new features.</strong> If you're already in the code for a feature, improve the surrounding UI</li>
          <li><strong>Refresh when it breaks on mobile.</strong> Test on iPhone (your primary device) regularly</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> You've unconsciously built a design system through consistent choices — dark theme, rounded corners, CSS variables, system fonts. That's a strength. Don't redesign for the sake of it; refresh incrementally when you're already making changes.
        </div>
      </>
    ),
  },
}

export default function Module4({ onBack }: Props) {
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
