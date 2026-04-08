import { useState, useEffect, useCallback, useRef } from 'react'

import { Link } from 'react-router-dom'
import { useBackendContext } from '@/context/BackendStatusContext'
import {
  Menu, X, ArrowRight, Zap, Shield, BarChart3, Globe, Users, Clock,
  Star, ChevronDown, ChevronUp, Play, Sparkles, Layers, Lock, Cpu,
  Github, Twitter, Mail, Heart,
  CheckCircle2, Rocket, Code2,
  MessageSquare, Headphones, BookOpen, Database, Cloud,
  Workflow, GitBranch, Send, Check, Sun, Moon,
  Wifi, WifiOff, RefreshCw, Server, Activity, XCircle, AlertTriangle,
  Bot, Palette, Terminal, Wand2, FileCode, Blocks,
} from 'lucide-react'

const GITHUB_URL = 'https://github.com/valtunox/va_studio_frontend_starter'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const features = [
  { icon: Wand2, title: 'AI-Powered Generation', desc: 'Describe what you want to build and watch AI generate production-ready code in seconds.' },
  { icon: Blocks, title: '22+ Starter Templates', desc: 'Choose from a curated library of templates — e-commerce, dashboards, CRMs, portfolios, and more.' },
  { icon: Zap, title: 'Instant Live Preview', desc: 'See your changes in real-time. Every edit renders instantly in a live browser preview.' },
  { icon: Palette, title: 'Tailwind CSS Built-In', desc: 'Every template uses Tailwind CSS for rapid customization and pixel-perfect design.' },
  { icon: Terminal, title: 'Clean, Exportable Code', desc: 'Production-ready React components you can export, extend, and deploy anywhere.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 compliant with end-to-end encryption, SSO, and role-based access control.' },
  { icon: Globe, title: 'Deploy Anywhere', desc: 'One-click deploy to Vercel, Netlify, AWS, or your own infrastructure.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Real-time multiplayer editing, comments, and approval workflows for teams.' },
]

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free forever',
    desc: 'Perfect for side projects and learning.',
    features: ['Up to 3 projects', 'All 22+ templates', 'AI code generation', 'Live preview', 'Community support', 'Export to GitHub'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Professional',
    price: 29,
    period: '/month',
    desc: 'For builders who ship fast.',
    features: ['Unlimited projects', 'Priority AI generation', 'Custom domains', 'Team collaboration (10)', 'Priority support', 'Advanced analytics', 'CI/CD integration', 'Version history'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: '/month',
    desc: 'For organizations at scale.',
    features: ['Everything in Pro', 'Unlimited team members', 'Dedicated support', 'Custom SLA', 'On-premise option', 'Audit logs', 'SSO / SAML', 'White-label'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  { name: 'Sarah Chen', role: 'Full-Stack Developer', avatar: 'SC', color: 'from-pink-500 to-rose-500', text: 'VA Studio saved me weeks of work. I described what I wanted, picked a template, and had a production app running in under an hour.' },
  { name: 'Marcus Johnson', role: 'Frontend Engineer', avatar: 'MJ', color: 'from-indigo-500 to-violet-500', text: 'The AI code generation is genuinely impressive. It understands context and produces clean, well-structured React components.' },
  { name: 'Aiko Tanaka', role: 'Indie SaaS Founder', avatar: 'AT', color: 'from-emerald-500 to-teal-500', text: 'Launched my SaaS in a weekend. The templates are production-quality and the AI customization made it feel truly mine.' },
  { name: 'David Park', role: 'CTO, ScaleUp Inc.', avatar: 'DP', color: 'from-amber-500 to-orange-500', text: 'Our team uses VA Studio for rapid prototyping. What used to take 2 weeks now takes 2 hours. Game changer for our velocity.' },
]

const faqs = [
  { q: 'What is vibe coding?', a: 'Vibe coding is a new approach to software development where you describe what you want to build in natural language, and AI generates the code for you. VA Studio takes this further with curated templates and live preview.' },
  { q: 'How does the free plan work?', a: 'Start building immediately — no credit card required. The free plan includes up to 3 projects, all 22+ templates, AI code generation, and live preview. Upgrade anytime for more capacity.' },
  { q: 'Can I export and own my code?', a: 'Absolutely. All generated code is yours. Export to GitHub, download as a zip, or deploy directly. No vendor lock-in — it\'s standard React + Tailwind CSS.' },
  { q: 'What templates are available?', a: 'We offer 22+ templates including e-commerce, SaaS landing, CRM, dashboards, portfolios, blogs, social platforms, health apps, finance tools, and more. New templates are added regularly.' },
  { q: 'Can I use my own design system?', a: 'Yes. Templates are built with Tailwind CSS and shadcn/ui. You can customize colors, fonts, spacing, and components to match your brand. The AI respects your design tokens.' },
  { q: 'Do you offer team plans?', a: 'Yes. The Professional plan supports up to 10 team members with real-time collaboration. Enterprise plans offer unlimited members, SSO, and dedicated support.' },
]

const stats = [
  { value: '22+', label: 'Templates' },
  { value: '10K+', label: 'Developers' },
  { value: '100%', label: 'Open Code' },
  { value: '<1min', label: 'To Preview' },
]

const howItWorks = [
  { step: '01', title: 'Describe Your Idea', desc: 'Tell our AI what you want to build — a SaaS dashboard, e-commerce store, portfolio, or anything else.', icon: Wand2 },
  { step: '02', title: 'Pick a Template', desc: 'Choose from 22+ production-ready templates as your starting point. Each one is fully responsive and customizable.', icon: Blocks },
  { step: '03', title: 'Customize with AI', desc: 'Use the AI assistant to refine your design, add features, and make it yours — all through natural language.', icon: Bot },
  { step: '04', title: 'Export & Deploy', desc: 'Export clean React + Tailwind code. Deploy to Vercel, Netlify, or any platform with one click.', icon: Rocket },
]

const logos = ['Vercel', 'Netlify', 'Supabase', 'Tailwind', 'React', 'Vite', 'shadcn/ui', 'GitHub']

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium pr-4 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      {open && <p className="pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>}
    </div>
  )
}

const STATUS_CONFIG = {
  checking: { label: 'Checking...', dotClass: 'bg-yellow-400 animate-pulse', bgClass: 'bg-white/10 hover:bg-white/20', Icon: RefreshCw, iconClass: 'animate-spin' },
  online: { label: 'Backend Online', dotClass: 'bg-emerald-400', bgClass: 'bg-emerald-500/20 hover:bg-emerald-500/30', Icon: Wifi, iconClass: '' },
  degraded: { label: 'Degraded', dotClass: 'bg-amber-400 animate-pulse', bgClass: 'bg-amber-500/20 hover:bg-amber-500/30', Icon: AlertTriangle, iconClass: '' },
  offline: { label: 'Backend Offline', dotClass: 'bg-red-400', bgClass: 'bg-red-500/20 hover:bg-red-500/30', Icon: WifiOff, iconClass: '' },
}

function BackendStatusBadge({ backend, onClick }) {
  const cfg = STATUS_CONFIG[backend.status]
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white transition-all ${cfg.bgClass}`}
      title={`Backend: ${cfg.label}${backend.latency ? ` (${backend.latency}ms)` : ''}`}
    >
      <span className={`w-2 h-2 rounded-full ${cfg.dotClass}`} />
      <cfg.Icon className={`w-3.5 h-3.5 ${cfg.iconClass}`} />
      <span className="hidden sm:inline">{cfg.label}</span>
      {backend.latency && backend.status === 'online' && (
        <span className="hidden md:inline text-white/60">{backend.latency}ms</span>
      )}
    </button>
  )
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [annual, setAnnual] = useState(true)
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
  const backend = useBackendContext()

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('va-dark-mode', next ? 'dark' : 'light')
      return next
    })
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('va-dark-mode')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">VA Studio v1.0</span>
            <span className="hidden sm:inline">— The vibe coding platform. Describe it, build it, ship it.</span>
          </span>
          <BackendStatusBadge backend={backend} onClick={() => {}} />
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/25">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold font-display">VA Studio</span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-mono">v1.0</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2">
              Sign In
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-600/25 transition-all hover:-translate-y-0.5">
              Start Free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-1 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item.label}</a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a href="#" className="text-sm font-medium text-slate-600 dark:text-slate-400 py-2">Sign In</a>
              <a href="#" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                Start Free <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-950 dark:to-violet-950/40" />
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/60 via-violet-100/40 to-transparent dark:from-indigo-800/20 dark:via-violet-900/15 dark:to-transparent rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-200/50 via-rose-100/30 to-transparent dark:from-pink-900/20 dark:via-rose-950/15 dark:to-transparent rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-sm text-indigo-700 dark:text-indigo-300 font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" /> The Vibe Coding Platform
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-display leading-tight mb-6 tracking-tight">
            Describe it. Build it.{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Ship it.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            VA Studio is the AI-powered platform for building production-ready web apps.
            Pick a template, customize with natural language, and deploy in minutes.
          </p>

          {/* Prompt Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 p-2">
                <Sparkles className="w-5 h-5 text-indigo-500 ml-4 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="What do you want to build?"
                  className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 text-base py-3 focus:outline-none"
                  readOnly
                />
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-600/25 transition-all flex-shrink-0">
                  Build with AI
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4" /> Watch Demo
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 md:gap-12">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-black font-display bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">{value}</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos / Tech Stack */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider font-medium">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {logos.map((logo) => (
              <span key={logo} className="text-lg font-bold text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-500 transition-colors cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 text-slate-900 dark:text-white">Everything you need to vibe code</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">AI generation, curated templates, live preview, and one-click deploy — all in one platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-600/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mb-4 group-hover:from-indigo-100 group-hover:to-violet-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-violet-900/50 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 text-slate-900 dark:text-white">From idea to production in 4 steps</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">No boilerplate. No configuration. Just describe what you want and start building.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-700" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mx-auto mb-6 relative">
                  <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white text-xs font-bold flex items-center justify-center">{step}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 text-slate-900 dark:text-white">Simple, transparent pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">No hidden fees. Start free. Upgrade when you're ready.</p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!annual ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>Monthly</span>
              <button onClick={() => setAnnual(!annual)} className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
              <span className={`text-sm ${annual ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>Annual</span>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">Save 20%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden border p-8 ${
                  plan.popular
                    ? 'border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-600/10 scale-105 bg-white dark:bg-slate-900'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600" />
                )}
                {plan.popular && (
                  <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-semibold rounded-full mb-4">Most Popular</span>
                )}
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black font-display text-slate-900 dark:text-white">
                    ${annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-slate-500 text-sm">{plan.price > 0 ? plan.period : ''}</span>
                  {plan.price === 0 && <span className="text-slate-500 text-sm ml-1">{plan.period}</span>}
                </div>
                <button className={`w-full rounded-full h-11 mb-6 text-sm font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/25'
                    : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}>
                  {plan.cta}
                </button>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 text-slate-900 dark:text-white">Loved by developers</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">See what developers are saying about building with VA Studio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-600/5"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm p-6 md:p-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                Ready to start vibe coding?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join 10,000+ developers building production apps with AI. Start free — no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-full hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  Start Building Free <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" /> Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold font-display text-slate-900 dark:text-white">VA Studio</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                The AI-powered vibe coding platform. Build production-ready web apps with natural language.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Github, href: GITHUB_URL },
                  { Icon: Twitter, href: '#' },
                  { Icon: Mail, href: 'mailto:hello@vastudio.dev' },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2.5">
                {['Features', 'Templates', 'Pricing', 'Changelog', 'Roadmap'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Developers</h4>
              <ul className="space-y-2.5">
                {['Documentation', 'API Reference', 'Contributing', 'GitHub', 'Discord'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {['About', 'Blog', 'Careers', 'Privacy', 'Terms'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                  </li>
                ))}
                <li className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <a href="#" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    Start Free Trial
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} VA Studio. Open-source under MIT License.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
