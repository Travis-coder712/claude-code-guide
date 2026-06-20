export type LessonStatus = 'built' | 'planned'
export type ModuleStatus = 'available' | 'planned'

export interface Lesson {
  id: string
  number: number
  title: string
  summary: string
  readingTime: string
  status: LessonStatus
}

export interface Module {
  id: string
  number: number
  title: string
  tagline: string
  accent: string
  status: ModuleStatus
  lessons: Lesson[]
}

export const MODULES: Module[] = [
  {
    id: 'what-is-claude-code',
    number: 1,
    title: 'Claude Code — What It Actually Is',
    tagline: 'The full feature set, how it works under the hood, and what most users don\'t know.',
    accent: '#6b8cff',
    status: 'available',
    lessons: [
      { id: 'how-it-works', number: 1, title: 'How Claude Code works', summary: 'Context windows, tools, agents — what\'s actually happening when you give it a task.', readingTime: '8 min', status: 'built' },
      { id: 'features-you-missed', number: 2, title: 'Features you probably don\'t know about', summary: 'Hooks, custom skills, MCP servers, subagents, worktrees, /loop, scheduled tasks, plan mode.', readingTime: '10 min', status: 'built' },
      { id: 'token-economics', number: 3, title: 'Token economics', summary: 'What costs tokens, when sessions get expensive, and how to manage your usage.', readingTime: '7 min', status: 'built' },
      { id: 'memory-and-context', number: 4, title: 'Memory, CLAUDE.md, and session handoffs', summary: 'The three persistence mechanisms and when to use each one.', readingTime: '9 min', status: 'built' },
      { id: 'vs-alternatives', number: 5, title: 'Claude Code vs the alternatives', summary: 'Cursor, Windsurf, Copilot, Bolt, Lovable, Replit Agent — honest comparison.', readingTime: '8 min', status: 'built' },
    ],
  },
  {
    id: 'web-platform',
    number: 2,
    title: 'The Web Platform — Options & Limits',
    tagline: 'PWAs, hosting, backends, databases, and what your Mac Mini could do.',
    accent: '#4ecdc4',
    status: 'available',
    lessons: [
      { id: 'pwa-deep-dive', number: 1, title: 'PWAs — what they can and can\'t do', summary: 'Offline, install, push notifications, storage — and the iOS Safari limits you need to know.', readingTime: '9 min', status: 'built' },
      { id: 'hosting-options', number: 2, title: 'Beyond GitHub Pages', summary: 'Vercel, Netlify, Cloudflare Pages, Railway, Fly.io — free tiers, when to upgrade.', readingTime: '8 min', status: 'built' },
      { id: 'when-you-need-backend', number: 3, title: 'When you need a backend', summary: 'Auth, real-time data, databases, scheduled jobs — the lightest options.', readingTime: '8 min', status: 'built' },
      { id: 'mac-mini-server', number: 4, title: 'Your Mac Mini as a server', summary: 'Ollama, Supabase local, scheduled scrapers, home automation — what\'s practical at 5W idle.', readingTime: '7 min', status: 'built' },
    ],
  },
  {
    id: 'architecture',
    number: 3,
    title: 'Architecture Decisions',
    tagline: 'Single HTML vs React vs full-stack — a framework for choosing.',
    accent: '#ff922b',
    status: 'available',
    lessons: [
      { id: 'complexity-ladder', number: 1, title: 'The complexity ladder', summary: 'Single HTML → static site → React SPA → full-stack → native. Where does your idea sit?', readingTime: '8 min', status: 'built' },
      { id: 'data-patterns', number: 2, title: 'Data patterns', summary: 'Hardcoded arrays → JSON files → SQLite pipeline → hosted database. The AURES progression.', readingTime: '7 min', status: 'built' },
      { id: 'when-to-upgrade', number: 3, title: 'When to upgrade (and when not to)', summary: 'Signals that your project has outgrown its architecture — and why the Refinance Tool is perfect as-is.', readingTime: '6 min', status: 'built' },
    ],
  },
  {
    id: 'growing-codebases',
    number: 4,
    title: 'Working with Growing Codebases',
    tagline: 'When files get too big, when to split, and the lifecycle of a project.',
    accent: '#ff6b6b',
    status: 'available',
    lessons: [
      { id: 'too-big', number: 1, title: 'When a file is too big', summary: 'SchemeTracker at 6,000+ lines — the signals and what to do about it.', readingTime: '7 min', status: 'built' },
      { id: 'project-lifecycle', number: 2, title: 'The lifecycle of a project', summary: 'Active → maintenance → archive. When to keep investing and when to let go.', readingTime: '6 min', status: 'built' },
      { id: 'ui-freshness', number: 3, title: 'Keeping UIs current', summary: 'When does a UI feel dated? How to refresh without rebuilding. Dark mode, responsive, component libraries.', readingTime: '6 min', status: 'built' },
    ],
  },
  {
    id: 'better-results',
    number: 5,
    title: 'Getting Better Results',
    tagline: 'Prompting, planning, scope management, and reviewing AI-generated code.',
    accent: '#cc5de8',
    status: 'available',
    lessons: [
      { id: 'briefing', number: 1, title: 'How to brief Claude Code', summary: 'The difference between a vague idea and a productive session. Worked examples.', readingTime: '8 min', status: 'built' },
      { id: 'planning-vs-doing', number: 2, title: 'Planning sessions vs implementation', summary: 'When to separate them, how to use plan mode, and the scope creep trap.', readingTime: '7 min', status: 'built' },
      { id: 'reviewing-code', number: 3, title: 'Reviewing code you didn\'t write', summary: 'The minimum you need to understand. Reading errors, checking diffs, testing on mobile.', readingTime: '8 min', status: 'built' },
      { id: 'common-mistakes', number: 4, title: 'Common mistakes', summary: 'Accepting the first solution, not testing, over-prompting, ignoring memory — and how to fix them.', readingTime: '7 min', status: 'built' },
    ],
  },
  {
    id: 'your-projects',
    number: 6,
    title: 'Your Project Portfolio',
    tagline: 'Assessment and improvement suggestions for every project you\'ve built.',
    accent: '#51cf66',
    status: 'available',
    lessons: [
      { id: 'portfolio-overview', number: 1, title: 'The portfolio at a glance', summary: 'All 17 projects mapped by architecture, complexity, and status. What patterns emerged.', readingTime: '8 min', status: 'built' },
      { id: 'whats-working', number: 2, title: 'What you\'re already doing well', summary: 'Session handoffs, CLAUDE.md, dark theme consistency, the AURES pipeline pattern.', readingTime: '6 min', status: 'built' },
      { id: 'improvements', number: 3, title: 'Per-project improvements', summary: 'Top 3 actionable suggestions for each project, with estimated effort.', readingTime: '10 min', status: 'built' },
    ],
  },
  {
    id: 'whats-next',
    number: 7,
    title: 'What\'s Next',
    tagline: 'Growth paths, automation, MCP servers, and where AI-assisted coding is heading.',
    accent: '#ffd43b',
    status: 'available',
    lessons: [
      { id: 'fundamentals', number: 1, title: 'Coding fundamentals that give the most leverage', summary: 'Git, reading errors, browser dev tools — the 20% that gives you 80% of the value.', readingTime: '8 min', status: 'built' },
      { id: 'automation', number: 2, title: 'Automation and scheduled tasks', summary: 'GitHub Actions, cron jobs, scheduled Claude agents — making things run without you.', readingTime: '7 min', status: 'built' },
      { id: 'where-heading', number: 3, title: 'Where this is all heading', summary: 'Vibe coding, agent platforms, the future of AI-assisted development.', readingTime: '6 min', status: 'built' },
    ],
  },
]
