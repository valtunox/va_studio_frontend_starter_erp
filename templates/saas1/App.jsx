import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  Globe,
  Layers,
  LineChart,
  Lock,
  Menu,
  MessageSquare,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const nav = ['Features', 'Product', 'Pricing', 'Customers', 'Resources']

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    desc: 'Automatically surface trends, anomalies, and opportunities from your data with state-of-the-art machine learning models.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboards',
    desc: 'Build interactive dashboards that update in milliseconds. Drag, drop, and customize every visualization.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'SOC 2 Type II certified with end-to-end encryption, SSO, RBAC, and audit logging built in from day one.',
  },
  {
    icon: Globe,
    title: 'Global Data Mesh',
    desc: 'Connect to 200+ data sources worldwide. Unify your warehouse, lake, and streaming data in one platform.',
  },
  {
    icon: Bot,
    title: 'Natural Language Queries',
    desc: 'Ask questions in plain English and get instant charts, tables, and answers. No SQL required.',
  },
  {
    icon: Layers,
    title: 'Version-Controlled Pipelines',
    desc: 'Git-native data pipelines with branching, rollback, and CI/CD integration for every transformation.',
  },
]

const stats = [
  { value: '10M+', label: 'Queries Processed Daily' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '4,200+', label: 'Companies Worldwide' },
  { value: '<50ms', label: 'Avg. Query Latency' },
]

const pricing = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    desc: 'For individuals and small teams exploring analytics.',
    features: ['5 dashboards', '10K rows per dataset', '3 data connectors', 'Community support', '7-day data retention'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    desc: 'For growing teams that need real-time insights at scale.',
    features: ['Unlimited dashboards', '10M rows per dataset', '50+ data connectors', 'AI-powered insights', 'Priority support', '1-year data retention', 'Custom branding'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with advanced security and compliance needs.',
    features: ['Everything in Pro', 'Unlimited data', '200+ connectors', 'SSO & SAML', 'Dedicated CSM', 'SLA guarantee', 'On-prem deployment', 'Custom integrations'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  {
    quote: 'Nexus AI replaced three separate tools for us. The natural language query feature alone saves our analysts 10 hours a week.',
    name: 'Sarah Chen',
    role: 'VP of Data, Streamline Commerce',
    avatar: 'SC',
  },
  {
    quote: 'We went from spending days building dashboards to minutes. The AI suggestions are eerily accurate and always relevant.',
    name: 'Marcus Rivera',
    role: 'Head of Analytics, Cloudpeak Systems',
    avatar: 'MR',
  },
  {
    quote: 'The enterprise security features gave our CISO confidence from day one. Deployment took less than a week for 500 users.',
    name: 'Emily Nakamura',
    role: 'CTO, Helix Biotech',
    avatar: 'EN',
  },
]

const footerLinks = {
  Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Documentation'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners'],
  Resources: ['Community', 'Help Center', 'Status', 'API Reference', 'Templates'],
  Legal: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies'],
}

const trustedBy = ['Acme Corp', 'Globex', 'Initech', 'Umbrella', 'Massive Dynamic', 'Soylent']

export default function SaasTemplate({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* ───────── Header ───────── */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
              <Zap className="h-4 w-4" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Nexus AI
            </span>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-400 lg:flex">
            {nav.map((item) => (
              <a key={item} href="#" className="transition-colors hover:text-slate-900 dark:hover:text-white">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" className="hidden text-sm sm:inline-flex" onClick={() => onNavigate && onNavigate('login')}>
              Sign In
            </Button>
            <Button className="hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-sm text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 sm:inline-flex" onClick={() => onNavigate && onNavigate('register')}>
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-slate-200/60 bg-white/95 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/95 lg:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {nav.map((item) => (
                <a key={item} href="#" className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
                  {item}
                </a>
              ))}
              <div className="flex gap-2 pt-3">
                <Button variant="outline" className="flex-1 text-sm" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-sm text-white" onClick={() => onNavigate && onNavigate('register')}>Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute -top-20 left-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/15 blur-[100px] dark:bg-indigo-500/10" />
        <div className="pointer-events-none absolute top-10 right-1/4 h-[350px] w-[350px] rounded-full bg-violet-500/15 blur-[100px] dark:bg-violet-400/10" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
              <Sparkles className="mr-1 h-3 w-3" /> Now with GPT-4o integration
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Analytics that{' '}
              <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                think for you
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Nexus AI transforms raw data into actionable intelligence. Ask questions in plain English,
              get instant visualizations, and let AI surface the insights that matter most.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 sm:w-auto" onClick={() => onNavigate && onNavigate('register')}>
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
              No credit card required &middot; 14-day free trial &middot; Cancel anytime
            </p>
          </div>

          {/* Hero showcase card */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-violet-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xl shadow-purple-500/10 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/90">
              <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-2 text-xs text-slate-400">nexus-ai.app/dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 p-2 text-white">
                      <LineChart className="h-full w-full" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Revenue Forecast</p>
                      <p className="text-xs text-slate-500">AI-generated &middot; Updated 2m ago</p>
                    </div>
                  </div>
                  <div className="flex h-32 items-end gap-1.5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
                    {[40, 55, 35, 65, 50, 75, 60, 85, 70, 90, 78, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md bg-gradient-to-t from-purple-500 to-indigo-400"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-4 dark:from-purple-950/50 dark:to-indigo-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">MRR</p>
                    <p className="text-xl font-bold">$284K</p>
                    <p className="text-xs font-medium text-green-600">+12.4%</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 p-4 dark:from-violet-950/50 dark:to-purple-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Users</p>
                    <p className="text-xl font-bold">18.2K</p>
                    <p className="text-xs font-medium text-green-600">+8.1%</p>
                  </div>
                  <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 dark:from-indigo-950/50 dark:to-blue-950/50">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">AI Queries</p>
                    <p className="text-xl font-bold">1.4M</p>
                    <p className="text-xs font-medium text-green-600">+31%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Trusted By ───────── */}
      <section className="border-y border-slate-200/60 bg-slate-50/50 dark:border-slate-800/60 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            Trusted by data teams at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {trustedBy.map((name) => (
              <span key={name} className="text-lg font-bold text-slate-300 transition-colors hover:text-slate-500 dark:text-slate-700 dark:hover:text-slate-500">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Features Grid ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
              Features
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                master your data
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              From ingestion to insight, Nexus AI covers the entire analytics lifecycle.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.title}
                className="group relative overflow-hidden border-slate-200/80 bg-white transition-all hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
                <CardContent className="relative p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Product Showcase ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
                Product
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built for the way{' '}
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  modern teams work
                </span>
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Nexus AI adapts to your workflow, not the other way around. Collaborate in real time,
                automate repetitive analysis, and ship insights faster than ever.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  { icon: MessageSquare, title: 'Conversational Analytics', desc: 'Type a question, get a chart. It\'s that simple.' },
                  { icon: Users, title: 'Team Collaboration', desc: 'Share dashboards, leave comments, and assign follow-ups in one place.' },
                  { icon: Zap, title: 'Instant Alerts', desc: 'Get notified the moment a metric crosses a threshold you care about.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase mockup */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl dark:border-slate-700/80 dark:bg-slate-900">
                <div className="border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/80">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 p-4 dark:from-violet-950/30 dark:to-purple-950/30">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ask Nexus AI...</p>
                    <p className="mt-1 font-medium">"Show me revenue by region for Q4, compared to last year"</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">North America</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$4.2M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Europe</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$3.1M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Asia Pacific</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$2.6M</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800/50">
                      <span className="text-sm font-medium">Latin America</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                        <span className="text-sm font-semibold">$1.1M</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Metrics / Stats ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center transition-all hover:shadow-xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="relative bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
                  {s.value}
                </p>
                <p className="relative mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="relative overflow-hidden bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
              Pricing
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Simple,{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {pricing.map((plan) => (
              <Card
                key={plan.name}
                className={`relative overflow-hidden transition-all ${
                  plan.popular
                    ? 'border-purple-500 bg-white shadow-2xl shadow-purple-500/20 dark:border-purple-500 dark:bg-slate-900'
                    : 'border-slate-200/80 bg-white hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4">
                    <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                      <Star className="mr-1 h-3 w-3" /> Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.desc}</p>
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{plan.period}</span>
                  </div>
                  <Button
                    className={`mt-6 w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
                        <span className="text-slate-600 dark:text-slate-400">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300">
              Customers
            </Badge>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Loved by{' '}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                data teams everywhere
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900">
                <CardContent className="p-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-sm font-bold text-white">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA Banner ───────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 px-8 py-16 text-center text-white shadow-2xl shadow-purple-500/30 sm:px-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ready to transform your analytics?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-purple-100">
                Join 4,200+ companies using Nexus AI to make faster, smarter decisions.
                Start your free trial today.
              </p>
              <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-purple-200 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/25"
                />
                <Button size="lg" className="w-full shrink-0 bg-white text-purple-700 shadow-lg hover:bg-purple-50 sm:w-auto">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="mt-4 text-xs text-purple-200">
                Free 14-day trial &middot; No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 text-lg font-bold">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                  <Zap className="h-4 w-4" />
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Nexus AI
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                AI-powered analytics for modern data teams. From query to insight in seconds.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold">{category}</h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-8 dark:border-slate-800/60 sm:flex-row">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} Nexus AI, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'YouTube'].map((social) => (
                <a key={social} href="#" className="text-xs text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
