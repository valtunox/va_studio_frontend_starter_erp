import { useState, useEffect } from 'react'
import {
  Menu, X, ArrowRight, Check, Zap, Database, Globe, Shield, Terminal,
  GitBranch, Cloud, Cpu, Lock, Radio, HardDrive, Code2, ChevronRight,
  Github, Twitter, Star, Users, Rocket, Clock, Server, Layers,
  ExternalLink, Copy, CheckCircle2, BarChart3, Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = ['Platform', 'Solutions', 'Developers', 'Pricing', 'Blog']

const integrations = [
  { name: 'React', icon: Code2, color: 'text-cyan-400' },
  { name: 'Next.js', icon: Globe, color: 'text-white dark:text-white' },
  { name: 'Python', icon: Terminal, color: 'text-emerald-400' },
  { name: 'PostgreSQL', icon: Database, color: 'text-cyan-300' },
  { name: 'Redis', icon: Zap, color: 'text-red-400' },
  { name: 'Docker', icon: Cloud, color: 'text-blue-400' },
  { name: 'GitHub', icon: Github, color: 'text-white dark:text-white' },
  { name: 'AWS', icon: Server, color: 'text-amber-400' },
]

const bentoFeatures = [
  {
    icon: Zap, title: 'Edge Functions', span: 'col-span-2',
    desc: 'Deploy serverless functions to 40+ global edge locations. Sub-50ms cold starts with V8 isolates.',
    visual: 'latency',
  },
  {
    icon: GitBranch, title: 'Database Branching', span: 'col-span-1',
    desc: 'Branch your database like Git. Instant preview environments for every PR.',
    visual: 'branch',
  },
  {
    icon: Radio, title: 'Realtime Subscriptions', span: 'col-span-1',
    desc: 'WebSocket-based realtime engine. Broadcast changes to millions of connected clients.',
    visual: 'realtime',
  },
  {
    icon: Lock, title: 'Auth & SSO', span: 'col-span-1',
    desc: 'Enterprise SSO with SAML 2.0, OAuth, MFA, and row-level security out of the box.',
    visual: 'auth',
  },
  {
    icon: HardDrive, title: 'Storage CDN', span: 'col-span-2',
    desc: 'S3-compatible object storage with automatic image optimization and global CDN distribution.',
    visual: 'cdn',
  },
  {
    icon: Terminal, title: 'CLI & API', span: 'col-span-1',
    desc: 'Full CLI toolchain and REST/GraphQL APIs. Automate everything in your CI/CD pipeline.',
    visual: 'cli',
  },
]

const steps = [
  { num: '01', title: 'Connect', desc: 'Link your Git repository. We detect your framework and configure the build automatically.', icon: Github },
  { num: '02', title: 'Configure', desc: 'Set environment variables, secrets, and edge config. Define preview and production branches.', icon: Shield },
  { num: '03', title: 'Deploy', desc: 'Push to deploy. Every commit triggers a build and deploys to our global CDN in seconds.', icon: Rocket },
]

const metrics = [
  { value: '500K+', label: 'Deployments', icon: Rocket },
  { value: '120K+', label: 'Developers', icon: Users },
  { value: '99.99%', label: 'Uptime SLA', icon: Activity },
  { value: '40+', label: 'Regions', icon: Globe },
]

const customerLogos = ['Acme Corp', 'Globex', 'Initech', 'Hooli', 'Pied Piper', 'Stark Labs']

const pricingTiers = [
  {
    name: 'Hobby', price: 'Free', period: 'forever', desc: 'For side projects and experiments.',
    popular: false,
    features: ['3 projects', '100K edge invocations/mo', '500 MB database', '1 GB storage', 'Community support', 'Shared compute'],
  },
  {
    name: 'Pro', price: '$25', period: '/month', desc: 'For professional developers and startups.',
    popular: true,
    features: ['Unlimited projects', '2M edge invocations/mo', '8 GB database', '100 GB storage', 'Email support', 'Dedicated compute', 'Custom domains', 'Database branching'],
  },
  {
    name: 'Team', price: '$50', period: '/seat/mo', desc: 'For teams that need collaboration and compliance.',
    popular: false,
    features: ['Everything in Pro', '10M edge invocations/mo', '64 GB database', '1 TB storage', 'Priority support', 'SSO & SAML', 'Audit logs', 'SOC 2 compliance', 'SLA guarantee'],
  },
]

const footerCols = [
  { title: 'Product', links: ['Platform', 'Edge Functions', 'Database', 'Storage', 'Auth', 'Realtime'] },
  { title: 'Developers', links: ['Documentation', 'API Reference', 'CLI', 'Guides', 'Examples', 'Changelog'] },
  { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'] },
  { title: 'Legal', links: ['Privacy', 'Terms', 'DPA', 'SLA', 'Security', 'Status'] },
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function GlowCard({ children, className = '', glowColor = 'cyan' }) {
  const colors = {
    cyan: 'hover:shadow-cyan-500/20 hover:border-cyan-500/30',
    emerald: 'hover:shadow-emerald-500/20 hover:border-emerald-500/30',
    teal: 'hover:shadow-teal-500/20 hover:border-teal-500/30',
  }
  return (
    <div className={`rounded-xl border border-slate-800 dark:border-slate-700 bg-slate-900/50 dark:bg-slate-900/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${colors[glowColor] || colors.cyan} ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function SaaS2LandingPage({ onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText('npx create-app@latest')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">

      {/* ---- GRID PATTERN BG ---- */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ================================================================ */}
      {/*  HEADER                                                          */}
      {/* ================================================================ */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 dark:bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <Layers className="h-4 w-4 text-slate-950" />
            </div>
            <span className="text-lg font-bold tracking-tight">NovaDeploy</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</button>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
            <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20">
              Start Building
            </Button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-slate-400" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
            {navLinks.map(l => (
              <button key={l} className="block w-full text-left text-sm text-slate-300 hover:text-white py-2">{l}</button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" className="text-slate-300" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold">Start Building</Button>
            </div>
          </div>
        )}
      </header>

      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/2 w-96 h-48 bg-teal-500/8 rounded-full blur-[80px] animate-pulse [animation-delay:2s]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/15">
              <Zap className="h-3 w-3 mr-1" /> Now in General Availability
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              <span className="text-white">Infrastructure That </span>
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                Scales With Your Ambition
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The serverless platform for modern developers. Deploy edge functions, manage databases, and ship faster &mdash; all from one unified platform.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/25 px-8">
                Deploy Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8">
                Read Docs <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Terminal mockup */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 dark:bg-slate-900/80 backdrop-blur-sm overflow-hidden shadow-2xl shadow-cyan-500/5">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-2 text-xs text-slate-500 font-mono">terminal</span>
              </div>
              <div className="p-5 font-mono text-sm space-y-2">
                <div><span className="text-emerald-400">$</span> <span className="text-slate-300">npx create-app@latest my-project</span></div>
                <div className="text-slate-500">&#10003; Scaffolded project in ./my-project</div>
                <div><span className="text-emerald-400">$</span> <span className="text-slate-300">cd my-project && nova deploy</span></div>
                <div className="text-slate-500">&#9183; Building...</div>
                <div className="text-cyan-400">&#10003; Deployed to <span className="underline">my-project.nova.app</span> <span className="text-slate-500">(1.2s)</span></div>
                <div className="text-slate-500">  40 edge regions &middot; HTTPS enabled &middot; Preview URL ready</div>
              </div>
            </div>
          </div>

          {/* Animated metrics */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
            {[
              { value: '200ms', label: 'Avg Latency' },
              { value: '99.99%', label: 'SLA Uptime' },
              { value: '40+', label: 'Edge Regions' },
            ].map(m => (
              <div key={m.label}>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">{m.value}</div>
                <div className="text-sm text-slate-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  INTEGRATIONS                                                    */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">Works with your <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">stack</span></h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">First-class support for every major framework, language, and service. Zero lock-in.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {integrations.map(i => (
              <GlowCard key={i.name} className="p-6 flex flex-col items-center gap-3 cursor-pointer group">
                <i.icon className={`h-8 w-8 ${i.color} transition-transform group-hover:scale-110`} />
                <span className="text-sm font-medium text-slate-300">{i.name}</span>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  BENTO FEATURES                                                  */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything you need to <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">ship fast</span></h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">A complete backend platform &mdash; database, auth, storage, edge functions, and realtime &mdash; all integrated.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bentoFeatures.map(f => {
              const spanClass = f.span === 'col-span-2' ? 'md:col-span-2' : 'md:col-span-1'
              return (
                <GlowCard key={f.title} glowColor={f.visual === 'latency' || f.visual === 'cdn' ? 'cyan' : 'emerald'} className={`p-6 ${spanClass}`}>
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-cyan-500/10 p-2.5 shrink-0">
                      <f.icon className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                  {/* Mini visual */}
                  <div className="mt-5 rounded-lg bg-slate-800/50 border border-slate-700/50 p-3">
                    {f.visual === 'latency' && (
                      <div className="flex items-end gap-1 h-12">
                        {[35, 22, 48, 18, 42, 28, 15, 38, 20, 45, 12, 32, 25, 40, 19, 33].map((v, i) => (
                          <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/40 to-cyan-400/80 transition-all" style={{ height: `${v}%` }} />
                        ))}
                      </div>
                    )}
                    {f.visual === 'branch' && (
                      <div className="font-mono text-xs text-slate-500 space-y-1">
                        <div><span className="text-emerald-400">main</span> &#9472;&#9472;&#9472; production</div>
                        <div>&#9500;&#9472;&#9472; <span className="text-cyan-400">feat/auth</span> &#9472; preview</div>
                        <div>&#9492;&#9472;&#9472; <span className="text-teal-400">fix/api</span> &#9472;&#9472;&#9472; preview</div>
                      </div>
                    )}
                    {f.visual === 'realtime' && (
                      <div className="font-mono text-xs space-y-1">
                        <div className="text-cyan-400">&#8595; INSERT user_messages</div>
                        <div className="text-emerald-400">&#8595; UPDATE presence</div>
                        <div className="text-teal-400">&#8595; DELETE old_sessions</div>
                      </div>
                    )}
                    {f.visual === 'auth' && (
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex -space-x-1">
                          {['bg-cyan-400', 'bg-emerald-400', 'bg-teal-400', 'bg-sky-400'].map((c, i) => (
                            <div key={i} className={`w-6 h-6 rounded-full ${c} border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-950`}>
                              {String.fromCharCode(65 + i)}
                            </div>
                          ))}
                        </div>
                        <span className="text-slate-500">4 providers configured</span>
                      </div>
                    )}
                    {f.visual === 'cdn' && (
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>upload.png</span>
                        <span className="text-emerald-400">optimized &rarr; 42KB</span>
                        <span>CDN: 40 nodes</span>
                      </div>
                    )}
                    {f.visual === 'cli' && (
                      <div className="font-mono text-xs text-slate-500">
                        <div><span className="text-emerald-400">$</span> nova functions deploy</div>
                        <div className="text-cyan-400">&#10003; 3 functions deployed</div>
                      </div>
                    )}
                  </div>
                </GlowCard>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  HOW IT WORKS                                                    */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold">From code to <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">production</span> in minutes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-cyan-500/40 via-teal-500/40 to-emerald-500/40" />

            {steps.map((s, idx) => (
              <div key={s.num} className="relative text-center">
                <div className="mx-auto w-24 h-24 rounded-2xl bg-slate-900 dark:bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 relative z-10">
                  <s.icon className="h-8 w-8 text-cyan-400" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 text-xs font-bold flex items-center justify-center">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  METRICS / SOCIAL PROOF                                          */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {metrics.map(m => (
              <div key={m.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10 mb-4">
                  <m.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-sm text-slate-500 mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Customer logos */}
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-6">Trusted by engineering teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {customerLogos.map(name => (
                <span key={name} className="text-lg font-semibold text-slate-600 dark:text-slate-600 hover:text-slate-400 transition-colors cursor-default tracking-wide">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  PRICING                                                         */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, transparent <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">pricing</span></h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto">Start free. Scale when you&rsquo;re ready. No surprise bills.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map(tier => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 flex flex-col ${
                  tier.popular
                    ? 'border-cyan-500/40 bg-slate-900/80 dark:bg-slate-900/80 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/50 dark:bg-slate-900/50'
                }`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold border-0">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{tier.desc}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                    {tier.period !== 'forever' && <span className="text-slate-400 ml-1">{tier.period}</span>}
                    {tier.period === 'forever' && <span className="text-slate-500 ml-2 text-sm">forever</span>}
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => onNavigate && onNavigate('register')}
                >
                  {tier.price === 'Free' ? 'Get Started' : 'Subscribe'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  OPEN SOURCE / COMMUNITY                                         */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Open Source</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Built in the <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">open</span></h2>
            <p className="text-slate-400 mb-10">Our core platform is open source. Contribute, self-host, or extend &mdash; it&rsquo;s your infrastructure.</p>

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-white flex items-center justify-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400" /> 28K
                </div>
                <div className="text-xs text-slate-500 mt-1">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1.2K</div>
                <div className="text-xs text-slate-500 mt-1">Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-slate-500 mt-1">Discord Members</div>
              </div>
            </div>

            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
              <Github className="mr-2 h-4 w-4" /> View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA                                                             */}
      {/* ================================================================ */}
      <section className="py-20 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto rounded-2xl p-px bg-gradient-to-r from-cyan-500/50 via-teal-500/50 to-emerald-500/50">
            <div className="rounded-2xl bg-slate-950 dark:bg-slate-950 p-8 sm:p-12 text-center">
              <Terminal className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Start deploying in 30 seconds</h2>
              <p className="text-slate-400 mb-8">One command. Zero configuration. Production-ready.</p>

              <div className="flex items-center justify-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 max-w-sm mx-auto mb-8 font-mono text-sm">
                <span className="text-emerald-400">$</span>
                <span className="text-slate-300 flex-1 text-left">npx create-app@latest</span>
                <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                  {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-semibold hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/25 px-8">
                Start Building for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FOOTER                                                          */}
      {/* ================================================================ */}
      <footer className="border-t border-slate-800/50 bg-slate-950 dark:bg-slate-950 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
                  <Layers className="h-3.5 w-3.5 text-slate-950" />
                </div>
                <span className="font-bold">NovaDeploy</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">The serverless platform for modern developers.</p>
              <div className="flex items-center gap-3">
                <button className="text-slate-500 hover:text-white transition-colors"><Github className="h-4 w-4" /></button>
                <button className="text-slate-500 hover:text-white transition-colors"><Twitter className="h-4 w-4" /></button>
              </div>
            </div>

            {footerCols.map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <button className="text-sm text-slate-500 hover:text-slate-300 transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/50">
            <p className="text-xs text-slate-600">&copy; 2026 NovaDeploy, Inc. All rights reserved.</p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1" />
              All systems operational &mdash;
              <button className="text-slate-500 hover:text-slate-300 underline ml-1">Status page</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
