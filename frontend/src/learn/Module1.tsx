import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[0]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'how-it-works': {
    title: 'How Claude Code works',
    content: (
      <>
        <p>Claude Code isn't a chatbot with a code plugin. It's an <strong>autonomous agent</strong> that can read files, write code, run terminal commands, search the web, and manage git — all within a conversation.</p>
        <h4>The mental model</h4>
        <p>Think of Claude Code as a very capable colleague who just walked into the room. They haven't seen your project before, they don't know your preferences, and they need context. The better you brief them, the better the output.</p>
        <p>Under the hood, every interaction works like this:</p>
        <ol>
          <li><strong>You give a task</strong> — in natural language ("add a dark mode toggle to the settings page")</li>
          <li><strong>Claude reads relevant files</strong> — it figures out which files matter by exploring the project structure</li>
          <li><strong>Claude plans</strong> — it decides what to change and in what order</li>
          <li><strong>Claude makes changes</strong> — editing files, creating new ones, running commands</li>
          <li><strong>You review</strong> — approve, request changes, or redirect</li>
        </ol>
        <h4>Context windows — the invisible limit</h4>
        <p>Every conversation has a <strong>context window</strong> — the total amount of text Claude can "see" at once. Think of it as the agent's working memory. When the window fills up, older messages get compressed into summaries.</p>
        <p>This means:</p>
        <ul>
          <li>Long sessions don't "remember" everything from the beginning</li>
          <li>Reading large files costs context — read specific line ranges when possible</li>
          <li>Starting a fresh session for a new task is often more efficient than continuing a long one</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Claude Code is an agent, not a chatbot. It takes actions (reads files, runs commands, edits code) — it doesn't just generate text. The better you understand this, the better you'll work with it.
        </div>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> Claude Code leads the SWE-bench benchmark for real-world software engineering tasks — it outperforms Cursor, Copilot, and all other AI coding tools on complex, multi-file changes.
        </div>
      </>
    ),
  },
  'features-you-missed': {
    title: 'Features you probably don\'t know about',
    content: (
      <>
        <p>Most Claude Code users use maybe 20% of its capabilities. Here's what you're probably missing:</p>
        <h4>1. Memory system</h4>
        <p>Claude Code has a persistent memory that survives across sessions. It stores user preferences, project context, and feedback in markdown files at <code>~/.claude/projects/</code>. When you say "remember this", it writes a memory file. When you start a new session, those memories are loaded automatically.</p>
        <p><em>Your setup already uses this extensively — the memory index, project files, and feedback files are a sophisticated use of this feature.</em></p>

        <h4>2. CLAUDE.md files</h4>
        <p>A <code>CLAUDE.md</code> at the root of any project is read at the start of every session. It's your project's constitution — build commands, architectural rules, patterns to follow, mistakes to avoid. AURES has an excellent one that points to <code>SESSION_OPENER.md</code>.</p>

        <h4>3. Subagents</h4>
        <p>You can spawn parallel agents that work independently — each in their own context window. Use them for research, code review, or exploring options. Your planning session used 4 research agents simultaneously.</p>

        <h4>4. Plan mode</h4>
        <p>Type <code>/plan</code> to enter architect mode — Claude will propose an approach before writing code. Useful for complex changes where you want alignment before implementation.</p>

        <h4>5. Hooks</h4>
        <p>Hooks are scripts that run automatically at lifecycle points — before a tool runs, after a file is edited, when a session starts. They can enforce rules, run linters, or block dangerous operations.</p>

        <h4>6. Custom skills</h4>
        <p>Skills are reusable prompt+tool bundles invoked via slash commands. <code>/code-review</code>, <code>/init</code>, <code>/verify</code> are built-in. You can create your own for repetitive workflows.</p>

        <h4>7. MCP servers</h4>
        <p>Model Context Protocol lets Claude connect to external tools — browsers, databases, APIs, Slack. The preview server you use for testing is an MCP server.</p>

        <h4>8. Scheduled tasks and /loop</h4>
        <p><code>/loop</code> runs a task on a recurring interval — monitoring CI, polling APIs, watching for changes. Scheduled tasks run in the cloud on a cron schedule.</p>

        <h4>9. Worktrees</h4>
        <p>Agents can work in isolated git worktrees — a separate copy of your repo. If their changes are bad, your working tree is untouched.</p>

        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Claude Code is a platform, not just a tool. The memory system, subagents, hooks, and skills turn it into a customisable development environment. You're already using memory and CLAUDE.md well — hooks and skills are the next frontier.
        </div>
      </>
    ),
  },
  'token-economics': {
    title: 'Token economics',
    content: (
      <>
        <p>Tokens are the currency of AI. Every word you type, every file Claude reads, every line of code it generates — all consume tokens.</p>
        <h4>What costs tokens</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Action</th><th>Token cost</th><th>How to reduce</th></tr></thead>
            <tbody>
              <tr><td>Reading a file</td><td>~4 tokens per word</td><td>Read specific line ranges, not whole files</td></tr>
              <tr><td>Your message</td><td>~1 token per word</td><td>Be concise but specific</td></tr>
              <tr><td>Claude's response</td><td>~1 token per word</td><td>Ask for brief responses when you don't need detail</td></tr>
              <tr><td>Tool calls (bash, edit)</td><td>Small overhead each</td><td>Batch related changes</td></tr>
              <tr><td>Subagent spawn</td><td>Full new context</td><td>Only use for genuinely parallel work</td></tr>
            </tbody>
          </table>
        </div>
        <h4>When sessions get expensive</h4>
        <ul>
          <li><strong>Reading large files repeatedly:</strong> If Claude reads a 3,000-line file 5 times during a session, that's 15,000 lines of context consumed</li>
          <li><strong>Long sessions:</strong> After ~30+ back-and-forth exchanges, the context window starts compressing. Fresh sessions are more efficient for new tasks</li>
          <li><strong>Unfocused scope:</strong> "Fix this bug, also add a feature, also refactor that" — each pivot reads new files and wastes prior context</li>
        </ul>
        <h4>Practical tips</h4>
        <ul>
          <li><strong>One task per session</strong> where possible — context stays focused</li>
          <li><strong>Use CLAUDE.md</strong> — avoids re-explaining project context every session</li>
          <li><strong>Use subagents for research</strong> — their output stays in their context, not yours</li>
          <li><strong>Start sessions with specific asks</strong> — "edit line 42 of App.tsx" costs less than "something looks wrong in the app"</li>
        </ul>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Tokens are like bandwidth — you have a budget per session and per billing period. The most efficient pattern: one focused task, clear brief, specific file references, fresh session for each new topic.
        </div>
      </>
    ),
  },
  'memory-and-context': {
    title: 'Memory, CLAUDE.md, and session handoffs',
    content: (
      <>
        <p>Claude Code has three distinct ways to persist information across sessions. Understanding when to use each is one of the most impactful skills.</p>
        <h4>1. CLAUDE.md — the project constitution</h4>
        <p>A markdown file at the root of your project. Read automatically at the start of every session. Put in:</p>
        <ul>
          <li>Build commands (<code>npm run dev</code>, <code>npx tsc -b</code>)</li>
          <li>Architecture rules ("same pattern as AURES: importers → SQLite → exporters → JSON")</li>
          <li>Key patterns ("never downgrade status in imports")</li>
          <li>Mistakes to avoid ("two version files must bump in sync")</li>
        </ul>
        <p><em>Your AURES CLAUDE.md is a great example — it points to SESSION_OPENER.md for the full bootstrap.</em></p>

        <h4>2. Memory files — cross-session context</h4>
        <p>Stored at <code>~/.claude/projects/&lt;project&gt;/memory/</code>. Used for:</p>
        <ul>
          <li><strong>User preferences</strong> — "Travis tests on iPhone, prefers dark theme"</li>
          <li><strong>Feedback</strong> — "never downgrade status in imports" (so Claude doesn't make the same mistake twice)</li>
          <li><strong>Project context</strong> — "AURES is at v3.16.8, BESS batteries are the big story"</li>
          <li><strong>References</strong> — "Dashboard is at ~/Studio/Dashboard.html"</li>
        </ul>
        <p>Memory persists forever. CLAUDE.md is project-specific. Use memory for things that span projects (your preferences) and CLAUDE.md for things specific to one codebase.</p>

        <h4>3. Session handoff docs — the relay baton</h4>
        <p>When a session ends, the context is lost. A handoff doc (like AURES's <code>NEXT_SESSION_HANDOFF.md</code>) captures:</p>
        <ul>
          <li>What was just shipped</li>
          <li>What's next on the backlog</li>
          <li>Current state of the database/data</li>
          <li>Technical gotchas and patterns</li>
          <li>Sanity-check commands to verify state</li>
        </ul>
        <p>This is one of the most powerful patterns in your workflow. The AURES handoff doc is 280 lines of pure context — any new session can pick up cold.</p>

        <div className="example-box">
          <div className="example-title">Your setup compared to best practice</div>
          <p>You're already in the top tier. Most Claude Code users don't use memory files at all. Your MEMORY.md index, per-project memory files, CLAUDE.md → SESSION_OPENER.md chain, and NEXT_SESSION_HANDOFF.md pattern is exactly what advanced users recommend. The one gap: you could use <strong>hooks</strong> to automate things you currently do manually (e.g., auto-run tsc after edits).</p>
        </div>

        <div className="lesson-callout">
          <strong>Key takeaway:</strong> CLAUDE.md = project rules (read every session). Memory = cross-session context (user prefs, feedback). Handoff docs = session continuity (what happened, what's next). Using all three is what enables your 50+ release AURES project to work smoothly across dozens of sessions.
        </div>
      </>
    ),
  },
  'vs-alternatives': {
    title: 'Claude Code vs the alternatives',
    content: (
      <>
        <p>Claude Code isn't the only option. Here's an honest comparison of the major tools as of mid-2026.</p>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Tool</th><th>Best for</th><th>Strength</th><th>Weakness</th></tr></thead>
            <tbody>
              <tr><td><strong>Claude Code</strong></td><td>Complex multi-file projects</td><td>Highest code quality, best autonomy, largest context window</td><td>Terminal-only, steeper learning curve, slower to MVP</td></tr>
              <tr><td><strong>Cursor</strong></td><td>Daily IDE coding</td><td>Best multi-file IDE experience, 18% developer adoption</td><td>Subscription cost, less autonomous than Claude Code</td></tr>
              <tr><td><strong>GitHub Copilot</strong></td><td>Enterprise teams</td><td>Tight VS Code/GitHub integration, enterprise-safe</td><td>Weakest at multi-file orchestration</td></tr>
              <tr><td><strong>Windsurf</strong></td><td>Budget prototyping</td><td>Cheapest agentic IDE (now OpenAI-backed)</td><td>Smaller ecosystem</td></tr>
              <tr><td><strong>Bolt / Lovable</strong></td><td>Non-dev MVPs</td><td>Zero-to-app in minutes, no setup needed</td><td>Shallow customisation, vendor lock-in</td></tr>
              <tr><td><strong>Replit Agent</strong></td><td>Learning, hackathons</td><td>Full stack in-browser, deploy included</td><td>Limited for large projects</td></tr>
            </tbody>
          </table>
        </div>
        <h4>Why Claude Code for your workflow</h4>
        <p>Given your 17-project portfolio, Claude Code is the right choice because:</p>
        <ul>
          <li><strong>Project continuity:</strong> Memory + CLAUDE.md + handoff docs keep context across sessions. No other tool has this</li>
          <li><strong>Complex codebases:</strong> AURES at 50+ releases needs an agent that understands large, interconnected codebases. Claude Code leads SWE-bench on exactly this</li>
          <li><strong>Autonomy:</strong> "Build a 7-module learning curriculum" — Claude Code can plan, scaffold, and implement across dozens of files. Bolt/Lovable can't do this</li>
          <li><strong>No IDE dependency:</strong> You work from a Mac Mini terminal. No VS Code needed</li>
        </ul>
        <h4>When you might use something else</h4>
        <ul>
          <li><strong>Quick landing page:</strong> Bolt or Lovable would be faster for a simple one-page site</li>
          <li><strong>If you learned VS Code:</strong> Cursor's inline editing UX is genuinely faster for small changes</li>
          <li><strong>Team projects:</strong> GitHub Copilot integrates with enterprise permissions and code review</li>
        </ul>

        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> 92% of US developers now use some form of AI-assisted coding. The "vibe coding" movement — describing what you want in natural language and letting AI write the code — was coined by Andrej Karpathy in early 2025. You're part of a massive shift in how software gets built.
        </div>

        <div className="resource-box">
          <div className="resource-title">Further reading</div>
          <div className="resource-item">
            <div className="resource-name">Claude Code Documentation<span className="resource-author"> — Anthropic</span></div>
            <span className="resource-type">Docs</span>
            <div className="resource-note">Official docs at docs.anthropic.com/claude-code. Start with the quickstart guide.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Claude Code Guide 2026: 25 Features</div>
            <span className="resource-type">Article</span>
            <div className="resource-note">Comprehensive feature walkthrough with examples and demos.</div>
          </div>
          <div className="resource-item">
            <div className="resource-name">Understanding Claude Code Full Stack: MCP, Skills, Subagents, Hooks</div>
            <span className="resource-type">Blog</span>
            <div className="resource-note">Deep dive into the agent architecture and plugin system.</div>
          </div>
        </div>
      </>
    ),
  },
}

export default function Module1({ onBack }: Props) {
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
