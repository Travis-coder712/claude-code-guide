import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[6]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'fundamentals': {
    title: 'Coding fundamentals that give the most leverage',
    content: (
      <>
        <p>You don't need to become a developer. But a small amount of foundational knowledge gives <strong>disproportionate leverage</strong> when working with Claude Code. Here's the 20% that gives 80% of the value.</p>
        <h4>1. Git — version control basics</h4>
        <p>You use git through Claude Code without thinking about it. Understanding these four concepts helps you stay in control:</p>
        <ul>
          <li><strong><code>git status</code>:</strong> What's changed since the last commit? Run this before and after every session</li>
          <li><strong><code>git diff</code>:</strong> The exact lines that changed. Scan this before committing — it's your review step</li>
          <li><strong><code>git log --oneline -10</code>:</strong> Recent history. Useful for checking what happened in prior sessions</li>
          <li><strong>Branches:</strong> You work on <code>main</code> directly, which is fine for personal projects. If you ever want to experiment without risk, create a branch: <code>git checkout -b experiment</code>. If it works, merge. If not, delete</li>
        </ul>
        <h4>2. Reading error messages</h4>
        <p>Error messages have a consistent structure:</p>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Part</th><th>Example</th><th>What it tells you</th></tr></thead>
            <tbody>
              <tr><td>File + line</td><td><code>src/App.tsx:42</code></td><td>Exactly where the problem is</td></tr>
              <tr><td>Error type</td><td><code>TypeError</code></td><td>The category of problem</td></tr>
              <tr><td>Message</td><td><code>Cannot read properties of null</code></td><td>What went wrong specifically</td></tr>
              <tr><td>Suggestion</td><td><code>Did you mean 'useState'?</code></td><td>TypeScript's best guess at a fix</td></tr>
            </tbody>
          </table>
        </div>
        <p>When you get an error: (1) read the file + line, (2) paste the full error into Claude Code. That's it. Claude is excellent at diagnosing errors.</p>
        <h4>3. Browser DevTools</h4>
        <p>Press <strong>F12</strong> (or Cmd+Option+I on Mac) to open DevTools:</p>
        <ul>
          <li><strong>Console tab:</strong> Red text = errors. Yellow = warnings (usually ignorable). Copy the red text and paste into Claude Code</li>
          <li><strong>Network tab:</strong> Shows every file the page loads. Red entries = failed requests. Check the URL to see which data file is missing</li>
          <li><strong>Elements tab:</strong> Click any element on the page to see its HTML and CSS. Useful for debugging layout issues</li>
        </ul>
        <h4>4. The terminal</h4>
        <p>You already use the terminal through Claude Code. A few commands to know independently:</p>
        <ul>
          <li><code>cd /path/to/project</code> — change directory</li>
          <li><code>ls</code> — list files in current directory</li>
          <li><code>cat file.txt</code> — display file contents</li>
          <li><code>npm run dev</code> — start the dev server</li>
          <li><code>npx tsc -b</code> — type-check (your pre-push rule)</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> You don't need to learn to code. You need to learn to read — error messages, git diffs, browser console output. These are observation skills, not programming skills, and they make you 10x more effective with Claude Code.
        </div>
      </>
    ),
  },
  'automation': {
    title: 'Automation and scheduled tasks',
    content: (
      <>
        <p>You currently run data pipelines manually — SSHing into your Mac Mini, running Python scripts, pushing to git. This works, but it could be automatic.</p>
        <h4>Option 1: Cron jobs on your Mac Mini</h4>
        <p>The simplest automation. A cron job runs a command on a schedule:</p>
        <div className="example-box">
          <div className="example-title">Example: daily AURES data refresh at 6 AM</div>
          <p>Edit your crontab: <code>crontab -e</code></p>
          <p>Add this line:</p>
          <p><code>0 6 * * * cd /Users/travishughes/aures-db && python3 pipeline/refresh_all.py && cd frontend && npm run build && git add -A && git commit -m "auto: daily data refresh" && git push origin main</code></p>
          <p>This runs every day at 6 AM: refreshes data, builds the frontend, commits, and pushes. GitHub Actions then deploys to Pages automatically.</p>
        </div>
        <h4>Option 2: GitHub Actions scheduled workflows</h4>
        <p>You already use GitHub Actions for deployment. You can add scheduled workflows that run in the cloud:</p>
        <ul>
          <li>Run daily at a set time (cron syntax in the workflow YAML)</li>
          <li>Install Python, run your pipeline, commit results</li>
          <li>No Mac Mini needed — runs on GitHub's servers</li>
          <li>Free for public repos (2,000 minutes/month)</li>
        </ul>
        <p>The catch: your pipeline needs API keys (OpenElectricity). You'd store these as GitHub Secrets — encrypted environment variables that the workflow can access but nobody can read.</p>
        <h4>Option 3: Claude Code scheduled tasks</h4>
        <p>Claude Code has built-in scheduled tasks that run in the cloud on a cron schedule. These are full Claude Code sessions — they can read files, run commands, make decisions. Think of them as "Claude wakes up at 6 AM, runs the pipeline, checks for errors, and pushes if everything looks good."</p>
        <p>This is the most powerful option but also the most expensive (each run uses tokens).</p>
        <h4>What to automate first</h4>
        <ul>
          <li><strong>AURES data refresh:</strong> Biggest manual effort. Run nightly via cron on Mac Mini</li>
          <li><strong>ASX Stock Tracker price update:</strong> Weekly via cron. Market data changes daily but weekly is sufficient for your tracking periods</li>
          <li><strong>News article scraping:</strong> Daily via cron. AURES news_articles table is currently refreshed manually</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Start with a cron job on your Mac Mini — it's the simplest path. If you want it running even when your Mac is off, move to GitHub Actions with secrets. Claude Code scheduled tasks are the premium option for complex automation that needs judgment.
        </div>
      </>
    ),
  },
  'where-heading': {
    title: 'Where this is all heading',
    content: (
      <>
        <p>You're not just learning a tool — you're participating in a fundamental shift in how software gets built. Here's the landscape.</p>
        <h4>The vibe coding movement</h4>
        <p>Andrej Karpathy coined "vibe coding" in early 2025: describe what you want in natural language, AI writes the code, you evaluate results. As of mid-2026:</p>
        <ul>
          <li><strong>92% of US developers</strong> use some form of AI-assisted coding</li>
          <li><strong>63% of vibe coders are non-developers</strong> — PMs, founders, designers, and people like you</li>
          <li>The market is projected at <strong>$8.5 billion</strong> in 2026</li>
        </ul>
        <p>The debate is real: believers cite shipping speed and democratised access. Critics warn of brittle, insecure code that creators don't understand. An "Anti-Vibe Coding" movement emerged in 2026, pushing back against low-quality "product slop."</p>
        <h4>Where you sit in this spectrum</h4>
        <p>You're in the <strong>best possible position</strong>. You're not shipping untested code to production — you're building personal tools, learning modules, and data platforms. The stakes are appropriate for AI-assisted development: if something breaks, you fix it. No users lose money, no data is compromised.</p>
        <p>Your AURES project — 50+ releases, comprehensive session docs, pipeline architecture — is better-maintained than many professional codebases. That's not vibe coding; that's AI-assisted professional development.</p>
        <h4>What's coming next</h4>
        <ul>
          <li><strong>Agent platforms:</strong> Claude Code is already an agent (reads files, runs commands, makes decisions). The next step is agents that monitor, maintain, and update your apps autonomously</li>
          <li><strong>MCP ecosystem:</strong> Model Context Protocol is becoming a standard. More tools will connect — Slack, databases, monitoring systems — giving Claude richer context about your projects</li>
          <li><strong>Local AI:</strong> Your Mac Mini M4 can already run capable models via Ollama. As models get smaller and faster, local AI becomes practical for more use cases — private coding assistants, document analysis, home automation</li>
          <li><strong>Specialisation:</strong> AI coding tools will specialise by domain. Energy market tools, financial analysis tools, education tools — the general-purpose phase is giving way to vertical solutions</li>
        </ul>
        <h4>Your edge</h4>
        <p>The non-developers who build the best things with AI aren't the ones who write the most code. They're the ones who:</p>
        <ul>
          <li>Understand their domain deeply (you know the NEM, energy markets, investing)</li>
          <li>Can articulate what they want clearly (your briefs are detailed and specific)</li>
          <li>Build systems for continuity (CLAUDE.md, handoff docs, memory)</li>
          <li>Test on real devices (iPhone-first)</li>
          <li>Know when to stop (some projects are done, and that's good)</li>
        </ul>
        <div className="resource-box">
          <div className="resource-title">Resources for continuing your journey</div>
          <div className="resource-item">
            <div className="resource-name">Claude Code Documentation<span className="resource-author"> — Anthropic</span></div>
            <span className="resource-type">Docs</span>
            <div className="resource-note">Official docs. Check the changelog for new features — they ship weekly.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Ollama</div>
            <span className="resource-type">Tool</span>
            <div className="resource-note">Run local AI models on your Mac Mini. ollama.com — one-command install.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Supabase</div>
            <span className="resource-type">Platform</span>
            <div className="resource-note">If you ever need a hosted database + auth. supabase.com — generous free tier.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Cloudflare Pages</div>
            <span className="resource-type">Platform</span>
            <div className="resource-note">When you outgrow GitHub Pages. Unlimited bandwidth, edge functions included.</div>
          </div>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> You've built 17 projects, 550K+ lines of code, and a sophisticated workflow — as a non-developer using AI. That's not a limitation to overcome; it's a new way of building software. Keep doing what you're doing, keep learning by building, and keep finishing projects. The tools will only get better.
        </div>
      </>
    ),
  },
}

export default function Module7({ onBack }: Props) {
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
