import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[4]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'briefing': {
    title: 'How to brief Claude Code',
    content: (
      <>
        <p>The difference between a productive Claude Code session and a frustrating one is almost always the <strong>quality of the brief</strong>. A vague ask produces vague output. A specific ask produces specific output.</p>
        <h4>Bad vs good briefs</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Bad brief</th><th>Good brief</th><th>Why it's better</th></tr></thead>
            <tbody>
              <tr><td>"Make the app better"</td><td>"Add a dark mode toggle to the header that persists in localStorage"</td><td>Specific scope, clear location, defined behaviour</td></tr>
              <tr><td>"Fix the bug"</td><td>"The TSR calculation on line 42 of compute_tsr.py isn't including dividends — it should reinvest at the closing price on ex-date"</td><td>Points to exact file/line, describes expected vs actual behaviour</td></tr>
              <tr><td>"Build a stock tracker"</td><td>"Scaffold a React/Vite PWA with a Python pipeline that fetches ASX data via yfinance. Same architecture as AURES. Start with AGL only"</td><td>Names the tech, references a known pattern, limits scope</td></tr>
            </tbody>
          </table>
        </div>
        <h4>The briefing framework</h4>
        <ol>
          <li><strong>What:</strong> The specific thing you want. One sentence, concrete</li>
          <li><strong>Where:</strong> Which files, which components, which section of the app</li>
          <li><strong>How:</strong> If you have a preference (e.g., "same pattern as AURES"), say so</li>
          <li><strong>Not:</strong> What you DON'T want. Constraints prevent scope creep ("don't refactor the existing code, just add the new feature")</li>
          <li><strong>Context:</strong> Why you're doing this — helps Claude make judgment calls ("this is for a non-technical user who needs to understand at a glance")</li>
        </ol>
        <div className="example-box">
          <div className="example-title">How this session was briefed</div>
          <p>The planning session that created the ASX Stock Tracker started with a detailed brief: 5 named strategies, specific data sources (yfinance), a clear architecture reference (AURES pattern), concrete deliverables ($5k hypothetical portfolios), and AGL TSR tracking with named comparison groups (ASX 100 constituents). The result: a complete app shipped in one session.</p>
          <p>Contrast that with a brief like "build me a stock app" — Claude would have to guess at everything.</p>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Invest 2 minutes in a clear brief and save 20 minutes of back-and-forth. The most productive sessions start with: what (specific), where (file/component), how (pattern reference), and not (constraints).
        </div>
      </>
    ),
  },
  'planning-vs-doing': {
    title: 'Planning sessions vs implementation',
    content: (
      <>
        <p>One of the most effective patterns in your workflow is the <strong>separation of planning from implementation</strong>. The planning session that started this guide created 8 detailed plans with research from parallel agents — without writing a single line of code.</p>
        <h4>When to plan vs when to build</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Use a planning session when...</th><th>Just build when...</th></tr></thead>
            <tbody>
              <tr><td>You don't know the approach yet</td><td>You know exactly what to change</td></tr>
              <tr><td>Multiple options need comparing</td><td>There's one obvious approach</td></tr>
              <tr><td>The scope is large (&gt; 1 session)</td><td>It's a single focused task</td></tr>
              <tr><td>Research is needed (APIs, data sources)</td><td>You have all the information</td></tr>
              <tr><td>You want to save tokens for later</td><td>You're ready to commit tokens now</td></tr>
            </tbody>
          </table>
        </div>
        <h4>The scope creep trap</h4>
        <p>"While you're at it..." is the most expensive phrase in software development. Every addition seems small, but they compound:</p>
        <ul>
          <li>"Add a chart" → needs Recharts → needs data transformation → needs responsive layout → needs tooltip formatting → needs mobile testing</li>
          <li>What looked like 5 minutes turns into 45 minutes, and the original task still isn't done</li>
        </ul>
        <p>The antidote: <strong>one task per session</strong>. If you think of something else during the session, note it for next time. Claude Code's memory system is perfect for this — spawn a task chip or add it to the backlog.</p>
        <h4>Plan mode (/plan)</h4>
        <p>Claude Code has a built-in plan mode. Type <code>/plan</code> and it switches to architect mode — proposing an approach before writing code. Use it when you want to see the plan and approve before implementation begins.</p>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> Your planning session spawned 4 research agents running in parallel — one for stock analysis, one for video games, one for BESS/NEM research, one for WA energy markets. Each agent had its own context window, so the research didn't fill up the main conversation. That's an advanced subagent pattern.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Planning sessions are token-efficient — they use research agents and produce documents, not code. Implementation sessions are token-intensive but focused. Separating them prevents the "while you're at it" spiral and produces better results in both phases.
        </div>
      </>
    ),
  },
  'reviewing-code': {
    title: "Reviewing code you didn't write",
    content: (
      <>
        <p>You don't need to understand every line of code Claude writes. But you do need to understand enough to catch problems and give useful feedback. Here's the minimum.</p>
        <h4>The 5-minute review checklist</h4>
        <ol>
          <li><strong>Does it compile?</strong> — <code>npx tsc -b</code> should pass with no errors. This is non-negotiable before pushing. It's already a rule in your CLAUDE.md files</li>
          <li><strong>Does it render?</strong> — Open the dev server, check the page loads. Click through the main flows</li>
          <li><strong>Does it work on mobile?</strong> — You test on iPhone. If it looks wrong there, it needs fixing. This is your primary device</li>
          <li><strong>Read the git diff</strong> — <code>git diff</code> shows exactly what changed. You don't need to understand every line, but scan for:
            <ul>
              <li>Files you didn't expect to change (scope creep)</li>
              <li>Deleted code you wanted to keep</li>
              <li>Hardcoded values that should be variables</li>
              <li>Console.log statements left in</li>
            </ul>
          </li>
          <li><strong>Check the commit message</strong> — Does it describe what actually changed? A good commit message helps future sessions understand what was done</li>
        </ol>
        <h4>Reading error messages</h4>
        <p>Error messages are your best friend. They tell you exactly what went wrong and where. The pattern is always:</p>
        <ul>
          <li><strong>File name + line number:</strong> <code>src/App.tsx:42</code> — go to that exact location</li>
          <li><strong>Error description:</strong> "Cannot find name 'foo'" — the variable doesn't exist in scope</li>
          <li><strong>Suggestion:</strong> TypeScript often suggests fixes — "Did you mean 'Foo'?"</li>
        </ul>
        <p>When you get an error you don't understand, paste it directly into Claude Code. It's one of the highest-value things the AI does — interpreting error messages and fixing the underlying issue.</p>
        <h4>Browser DevTools (F12)</h4>
        <p>You don't need to master DevTools, but knowing two things helps enormously:</p>
        <ul>
          <li><strong>Console tab:</strong> Red errors here mean something broke. Paste the error into Claude Code</li>
          <li><strong>Network tab:</strong> If data isn't loading, check here. Red entries mean failed requests. The URL tells you which file failed to load</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> You don't need to read code like a developer. You need to: (1) run tsc, (2) test in browser + mobile, (3) scan the diff, (4) paste errors into Claude Code. That's 90% of the value of code review for your workflow.
        </div>
      </>
    ),
  },
  'common-mistakes': {
    title: 'Common mistakes',
    content: (
      <>
        <p>Every Claude Code user makes these mistakes. Knowing them won't prevent them entirely, but it helps you catch yourself.</p>
        <h4>1. Accepting the first solution</h4>
        <p>Claude's first attempt is often 80% right. The temptation is to accept it and move on. But that last 20% — edge cases, mobile layout, error handling — is where quality lives. <strong>Always test before accepting.</strong></p>
        <h4>2. Not testing on mobile</h4>
        <p>You test on iPhone, which is great. Many Claude Code users don't test on any real device. The preview server helps, but nothing replaces actually using the app on the target device. Touch targets, scroll behaviour, and viewport sizing all behave differently.</p>
        <h4>3. Over-prompting</h4>
        <p>A 500-word prompt produces worse results than a 50-word prompt that's precise. Claude performs best with clear, concise instructions. Don't explain the history of the project — that's what CLAUDE.md is for. Just state the task.</p>
        <h4>4. Ignoring the memory system</h4>
        <p>Every correction you give Claude ("don't do X", "always do Y") should be saved as a feedback memory. Otherwise you'll give the same correction next session, and the session after that. Your feedback memory files (pipeline data protection, data priorities) are excellent examples.</p>
        <h4>5. Scope creep within a session</h4>
        <p>"While you're at it, can you also..." is how a 30-minute focused session becomes a 3-hour unfocused marathon. Each addition resets context, reads new files, and dilutes focus. Better: note it for the next session.</p>
        <h4>6. Not using CLAUDE.md</h4>
        <p>Only 2 of your 17 projects have CLAUDE.md files. The other 15 mean Claude starts every session blind — re-discovering the build commands, the file structure, the key patterns. Even a 5-line CLAUDE.md saves significant time.</p>
        <h4>7. Fighting Claude's suggestions</h4>
        <p>Sometimes Claude suggests an approach you don't expect. Before rejecting it, consider: does it actually solve the problem? Claude often knows patterns you don't. The best sessions are collaborative — you provide domain knowledge, Claude provides technical knowledge.</p>
        <div className="example-box">
          <div className="example-title">The v3.08 lesson — your best mistake</div>
          <p>AURES v3.08 taught you that <code>package.json</code> and <code>version.json</code> must bump in sync, or PWA users get stuck on cached builds. This became a non-negotiable rule in CLAUDE.md and a feedback memory. Now Claude never makes that mistake again. <strong>Every mistake is only valuable if you encode it for the future.</strong></p>
        </div>
        <div className="resource-box">
          <div className="resource-title">Action items for your workflow</div>
          <div className="resource-item">
            <div className="resource-name">Add CLAUDE.md to 15 projects</div>
            <span className="resource-type">Quick win</span>
            <div className="resource-note">Even 5 lines (build commands + key files) saves significant context per session.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Save every correction as feedback memory</div>
            <span className="resource-type">Habit</span>
            <div className="resource-note">When you say "don't do X" — tell Claude to remember it. One-time cost, permanent benefit.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">One task per session</div>
            <span className="resource-type">Discipline</span>
            <div className="resource-note">Start the session by stating the single goal. Note new ideas for next time instead of adding scope.</div>
          </div>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> The highest-leverage improvement to your Claude Code workflow isn't a feature or a technique — it's discipline. Test before accepting, save corrections to memory, resist scope creep, and add CLAUDE.md to every project.
        </div>
      </>
    ),
  },
}

export default function Module5({ onBack }: Props) {
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
