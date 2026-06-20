import { useState } from 'react'
import { MODULES } from './curriculum'

const mod = MODULES[1]
interface Props { onBack: () => void }

const LESSONS: Record<string, { title: string; content: React.ReactNode }> = {
  'pwa-deep-dive': {
    title: "PWAs — what they can and can't do",
    content: (
      <>
        <p>Every project you've built on GitHub Pages is served as a static website. Many of them — AURES, Neon Arcade, ASX Stock Tracker — are also <strong>Progressive Web Apps (PWAs)</strong>. But what does that actually mean, and where are the limits?</p>
        <h4>What PWAs can do (2026)</h4>
        <ul>
          <li><strong>Install to home screen:</strong> On both Android and iOS, users can add your PWA and it looks/feels like a native app</li>
          <li><strong>Work offline:</strong> Service workers cache assets so the app loads without internet (AURES and Neon Arcade both do this)</li>
          <li><strong>Push notifications:</strong> Android: fully supported. iOS: supported since Safari 16.4 (2023), but <em>only when installed to home screen</em></li>
          <li><strong>Background sync:</strong> Android only — sync data when connection returns</li>
          <li><strong>Camera, microphone, geolocation:</strong> Full access via standard web APIs</li>
          <li><strong>Local storage:</strong> IndexedDB gives you megabytes of structured storage. AURES stores JSON data this way</li>
        </ul>
        <h4>What PWAs still can't do (the iOS problem)</h4>
        <ul>
          <li><strong>No Background Sync on iOS:</strong> Apple doesn't support the Background Sync API. Your app can't update data when it's not open</li>
          <li><strong>No silent push on iOS:</strong> You can't wake the app to fetch data without showing a notification</li>
          <li><strong>Limited storage:</strong> iOS Safari can evict PWA data after ~7 days of non-use. Android is more generous</li>
          <li><strong>No App Store without a wrapper:</strong> Apple won't list PWAs directly. You'd need Capacitor or a TWA wrapper</li>
          <li><strong>All iOS browsers are Safari:</strong> Chrome on iPhone is just Safari with a different skin. Apple forces WebKit on all browsers, so PWA capabilities are entirely at Apple's discretion</li>
        </ul>
        <div className="example-box">
          <div className="example-title">Your projects as PWAs</div>
          <p><strong>AURES:</strong> PWA with service worker + version polling. The two-version-file rule (package.json + version.json) exists because PWA users on cached builds get stuck without it. This is a real PWA lesson learned the hard way at v3.08.</p>
          <p><strong>Neon Arcade:</strong> Full offline PWA with vendored Phaser/Three.js. Works completely without internet — even the music is procedurally generated in code.</p>
          <p><strong>ASX Stock Tracker:</strong> PWA with network-first caching. Data files update from the network; the app shell is cached for offline.</p>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> PWAs are incredibly capable for your use case — static data apps, learning modules, games. The main gap is iOS background processing. For your portfolio, PWA is the right choice for everything except apps that need real-time server-pushed data (which would need a backend anyway).
        </div>
      </>
    ),
  },
  'hosting-options': {
    title: 'Beyond GitHub Pages',
    content: (
      <>
        <p>GitHub Pages is free, reliable, and deploys automatically from your repo. Every public project you've built uses it. But there are situations where you'd want more.</p>
        <h4>The hosting ladder</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Platform</th><th>Free tier</th><th>Best for</th><th>When to upgrade</th></tr></thead>
            <tbody>
              <tr><td><strong>GitHub Pages</strong></td><td>Unlimited static sites</td><td>What you're doing now — static PWAs, no server</td><td>You need serverless functions or a backend</td></tr>
              <tr><td><strong>Cloudflare Pages</strong></td><td>Unlimited bandwidth, 500 builds/mo, Workers included</td><td>Static sites + edge functions. Fastest CDN globally</td><td>Best next step — same deployment model but with serverless</td></tr>
              <tr><td><strong>Vercel</strong></td><td>Hobby tier (limited)</td><td>Next.js full-stack apps. SSR, API routes</td><td>You want server-side rendering or complex API routes</td></tr>
              <tr><td><strong>Netlify</strong></td><td>100 build minutes/mo</td><td>Form handling, identity, scheduled functions</td><td>You need auth or form processing without building a backend</td></tr>
              <tr><td><strong>Railway</strong></td><td>$5/mo hobby plan</td><td>Full backend (Python, Node, databases)</td><td>You need a real server — AURES pipeline as a web service, for example</td></tr>
              <tr><td><strong>Fly.io</strong></td><td>3 VMs free</td><td>Global edge deployment, containers</td><td>You need low-latency globally (like a game server)</td></tr>
            </tbody>
          </table>
        </div>
        <h4>For your projects specifically</h4>
        <p><strong>Right now:</strong> GitHub Pages handles everything. Your apps are static, your data pipelines run locally, and JSON files are committed to git. This is fine and won't break.</p>
        <p><strong>When you'd upgrade:</strong></p>
        <ul>
          <li>AURES needs real-time data updates without manual pipeline runs → Cloudflare Workers + scheduled functions</li>
          <li>ASX Stock Tracker needs live price feeds → Railway or Fly.io for a Python backend</li>
          <li>You want user authentication (e.g., GridRival multiplayer) → Supabase (free tier: 50K monthly users, Postgres DB, auth)</li>
        </ul>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> Cloudflare Pages has no bandwidth limits or egress fees — unlike Vercel and Netlify which charge for bandwidth overages. For public apps that might get traffic, Cloudflare is the safest free option.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Don't upgrade hosting until you feel the pain. GitHub Pages is perfect for everything in your portfolio today. When you need serverless functions, Cloudflare Pages is the natural next step. When you need a real backend, that's a bigger architectural decision.
        </div>
      </>
    ),
  },
  'when-you-need-backend': {
    title: 'When you need a backend',
    content: (
      <>
        <p>Right now, all your apps are "static" — HTML, CSS, and JavaScript served from GitHub Pages, with data baked into JSON files. The Python pipeline (AURES, ASX Stock Tracker) runs on your Mac Mini, generates JSON, and you commit it to git. <strong>This is a perfectly valid architecture</strong> for your use cases.</p>
        <p>But there are things a static site fundamentally can't do:</p>
        <h4>You need a backend when...</h4>
        <ul>
          <li><strong>User authentication:</strong> "Log in with Google" or "create an account" requires a server to validate credentials securely. You can't store passwords in client-side JavaScript</li>
          <li><strong>Real-time data:</strong> Live stock prices, WebSocket connections, server-sent events. The data changes faster than you can re-run a pipeline and push JSON</li>
          <li><strong>Scheduled jobs:</strong> "Fetch new data every hour" requires something running 24/7. Your Mac Mini could do this, or a cloud service</li>
          <li><strong>API proxying:</strong> Some APIs require secret keys. You can't put an API key in client-side code — anyone can see it. A backend proxies the request with the key hidden</li>
          <li><strong>Database writes:</strong> If users need to save data that other users can see (multiplayer, comments, shared state), you need a server-side database</li>
        </ul>
        <h4>The lightest backend options</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Option</th><th>What it is</th><th>Cost</th><th>Good for</th></tr></thead>
            <tbody>
              <tr><td><strong>Supabase</strong></td><td>Hosted Postgres + Auth + Realtime + Storage</td><td>Free (500MB DB, 50K users)</td><td>Adding a database and auth to any project. Drop-in replacement for Firebase</td></tr>
              <tr><td><strong>Cloudflare Workers</strong></td><td>Serverless functions at the edge</td><td>Free (100K req/day)</td><td>API proxying, scheduled tasks, light backend logic</td></tr>
              <tr><td><strong>Vercel Functions</strong></td><td>Serverless with Next.js</td><td>Free (limited)</td><td>Full-stack Next.js apps</td></tr>
              <tr><td><strong>Your Mac Mini</strong></td><td>Always-on local server</td><td>Electricity only</td><td>Running AURES/ASX pipelines on a schedule</td></tr>
            </tbody>
          </table>
        </div>
        <div className="example-box">
          <div className="example-title">What a backend could unlock for AURES</div>
          <p>Currently, refreshing AURES data requires running Python scripts manually and pushing JSON to GitHub. With a backend, you could:</p>
          <ul>
            <li>Schedule hourly data refreshes automatically</li>
            <li>Add an "Update Now" button in the app (the F4 Phase 2 backlog item)</li>
            <li>Store user watchlists and preferences</li>
            <li>Send push notifications when a project status changes</li>
          </ul>
          <p>But — and this is important — <strong>none of this is urgent</strong>. The manual pipeline works. Don't add a backend until the manual process becomes a real bottleneck.</p>
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> A backend adds power but also complexity — deployment, monitoring, security, costs. The static + local pipeline pattern you're using is genuinely good. Add a backend only when you hit a problem it uniquely solves (auth, real-time, scheduled jobs).
        </div>
      </>
    ),
  },
  'mac-mini-server': {
    title: 'Your Mac Mini as a server',
    content: (
      <>
        <p>Your Mac Mini M4 draws about <strong>5-10 watts at idle</strong> — less than a light bulb. If you left it running 24/7, it could do far more than run Claude Code sessions.</p>
        <h4>What your Mac Mini could run</h4>
        <div className="lesson-table">
          <table>
            <thead><tr><th>Use case</th><th>Tool</th><th>Power draw</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td><strong>Local AI models</strong></td><td>Ollama</td><td>30-60W under inference</td><td>Run 14B parameter models (Llama 3, Mistral) locally. Free, private, no API costs. 16GB handles most models</td></tr>
              <tr><td><strong>Local database</strong></td><td>Supabase local (Docker)</td><td>~5W idle</td><td>Full Postgres + Auth stack. Develop offline, sync to cloud when ready</td></tr>
              <tr><td><strong>Scheduled scrapers</strong></td><td>Python cron jobs</td><td>Negligible</td><td>Run AURES/ASX pipeline hourly/daily without manual intervention. Use <code>crontab -e</code></td></tr>
              <tr><td><strong>Home automation</strong></td><td>Home Assistant</td><td>~2W</td><td>Smart home hub with local AI voice control via Ollama</td></tr>
              <tr><td><strong>Media server</strong></td><td>Plex / Jellyfin</td><td>~10W streaming</td><td>The M4 media engine handles 4K transcoding effortlessly</td></tr>
              <tr><td><strong>Dev tools</strong></td><td>Continue.dev, FlowiseAI</td><td>Varies</td><td>Local AI-assisted coding without cloud costs. FlowiseAI for no-code LLM workflows</td></tr>
            </tbody>
          </table>
        </div>
        <h4>Practical setup for always-on</h4>
        <ul>
          <li><strong>System Settings → Energy:</strong> Disable "Prevent automatic sleeping when the display is off." Enable "Wake for network access"</li>
          <li><strong>HDMI dummy plug ($5):</strong> macOS behaves oddly without a display connected. A dummy plug tricks it into thinking a monitor is attached</li>
          <li><strong>SSH access:</strong> Enable in System Settings → General → Sharing → Remote Login. Then you can connect from anywhere: <code>ssh travishughes@your-mac-mini-ip</code></li>
          <li><strong>Tailscale (free):</strong> Secure VPN that lets you SSH into your Mac Mini from anywhere, even behind a NAT/router. No port forwarding needed</li>
        </ul>
        <div className="example-box">
          <div className="example-title">Automating AURES data refresh</div>
          <p>Instead of manually running the pipeline, you could add a cron job:</p>
          <p><code>0 6 * * * cd /Users/travishughes/aures-db && python3 pipeline/refresh_all.py</code></p>
          <p>This runs every day at 6 AM. Combine with a git auto-push script and your GitHub Pages site updates automatically. The Mac Mini uses ~5W to do this — about $15/year in electricity.</p>
        </div>
        <div className="did-you-know">
          <span className="dyk-label">Did you know?</span> The Mac Mini M4 with 16GB RAM can run Llama 3 8B at ~30 tokens/second — fast enough for conversational AI. Some people run their own private ChatGPT-equivalent entirely on a Mac Mini, with zero cloud costs and complete privacy.
        </div>
        <div className="lesson-callout">
          <strong>Key takeaway:</strong> Your Mac Mini is an untapped resource. The most immediate win: schedule your AURES and ASX Stock Tracker data pipelines to run automatically. Beyond that, local AI models via Ollama are genuinely useful for experimentation without API costs.
        </div>
      </>
    ),
  },
}

export default function Module2({ onBack }: Props) {
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
