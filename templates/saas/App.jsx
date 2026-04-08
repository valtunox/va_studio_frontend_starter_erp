import { useState } from 'react'
import {
  Menu, X, Sparkles, Code2, Users, Rocket, BarChart3, Shield, Globe,
  Zap, ArrowRight, Play, Check, Star, ChevronRight, Github, Twitter,
  Linkedin, Mail, Lock, Cloud, Cpu, Eye, MonitorSmartphone, Layers,
  Clock, Award, Heart, ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Badge } from '@/components/ui/badge'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = ['Features', 'Pricing', 'Integrations', 'Docs']

const stats = [
  { value: '10K+', label: 'Teams worldwide' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '50M+', label: 'API calls / day' },
  { value: '4.9/5', label: 'Average rating' },
]

const trustedLogos = [
  { name: 'Acme Corp', style: 'font-bold text-xl tracking-tight' },
  { name: 'Globex', style: 'font-extrabold text-xl italic' },
  { name: 'Initech', style: 'font-semibold text-xl tracking-widest uppercase' },
  { name: 'Hooli', style: 'font-black text-2xl' },
  { name: 'Pied Piper', style: 'font-bold text-xl tracking-tight' },
  { name: 'Soylent', style: 'font-extrabold text-xl uppercase tracking-wide' },
]

const features = [
  {
    icon: Cpu,
    title: 'AI Code Generation',
    description: 'Generate production-ready code with context-aware AI. Supports 30+ languages and frameworks out of the box.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Code together in real time with multiplayer editing, live cursors, and instant syncing across your entire team.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Rocket,
    title: 'One-Click Deploy',
    description: 'Ship to production in seconds. Automatic builds, preview environments, and rollbacks with zero configuration.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track every metric that matters. Real-time insights into performance, usage patterns, and team velocity.',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: Globe,
    title: 'API Gateway',
    description: 'Unified API management with rate limiting, caching, authentication, and automatic documentation generation.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'SOC 2 Type II certified. End-to-end encryption, SSO, RBAC, and audit logs for complete peace of mind.',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

const showcaseFeatures = [
  'Auto-scaling infrastructure that grows with you',
  'Built-in CI/CD pipelines with zero setup',
  'Intelligent error tracking and alerting',
  'Custom workflows and automation rules',
  'Granular permissions and team management',
  'Comprehensive API with webhooks support',
]

const pricingPlans = [
  {
    name: 'Free',
    price: { monthly: '$0', yearly: '$0' },
    description: 'Perfect for side projects and experimentation.',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Community support',
      'Basic analytics',
      'Single user',
    ],
    cta: 'Get Started Free',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: { monthly: '$29', yearly: '$24' },
    description: 'For growing teams who need power and flexibility.',
    features: [
      'Unlimited projects',
      '100 GB storage',
      'Priority support',
      'Advanced analytics',
      'Up to 25 team members',
      'Custom domains',
      'API access',
      'SSO integration',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', yearly: 'Custom' },
    description: 'For organizations with advanced security and scale needs.',
    features: [
      'Everything in Pro',
      'Unlimited storage',
      'Dedicated support',
      'Custom SLA',
      'Unlimited team members',
      'SAML & SCIM',
      'Audit logs',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechFlow',
    avatar: 'SC',
    quote: 'We cut our deployment time by 80% and our team velocity doubled within the first month. This platform is an absolute game-changer for engineering teams.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Lead Engineer',
    company: 'DataSync',
    avatar: 'MR',
    quote: 'The AI code generation is shockingly good. It understands our codebase context and generates code that actually fits our patterns and conventions.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'VP of Engineering',
    company: 'CloudFirst',
    avatar: 'AP',
    quote: 'Security and compliance were our biggest concerns. The SOC 2 certification and granular access controls gave us confidence to go all in.',
    rating: 5,
  },
]

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'],
  Resources: ['Documentation', 'Guides', 'Community', 'Templates', 'Webinars', 'Status'],
  Legal: ['Privacy', 'Terms', 'Security', 'GDPR', 'Cookies', 'Licenses'],
}

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function SaasLandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [billingCycle, setBillingCycle] = useState('monthly')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">

      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">NovaPlatform</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link} href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
            <Button size="sm" className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/25" onClick={() => onNavigate && onNavigate('register')}>
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a key={link} href="#" className="block text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2">
                {link}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => onNavigate && onNavigate('login')}>Sign In</Button>
              <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0" onClick={() => onNavigate && onNavigate('register')}>Get Started</Button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO SECTION ───────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-28">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-indigo-400/25 dark:bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <Badge className="mb-6 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Now in Public Beta
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Build Faster.</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Ship Smarter.</span>
            <br />
            <span className="text-gray-900 dark:text-white">Scale Everything.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            The AI-powered developer platform that automates your workflow, accelerates your shipping cadence, and scales with your ambition.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/25 px-8" onClick={() => onNavigate && onNavigate('register')}>
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-gray-300 dark:border-gray-700">
              <Play className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>

          {/* Stats row */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Mock browser window */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl shadow-purple-500/10 overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 rounded-md bg-gray-200 dark:bg-gray-700 max-w-xs mx-auto flex items-center justify-center">
                    <Lock className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-400">app.novaplatform.io/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {[{ label: 'Deployments', val: '1,284', color: 'purple' }, { label: 'Requests', val: '2.4M', color: 'blue' }, { label: 'Uptime', val: '99.98%', color: 'green' }].map((m) => (
                    <div key={m.label} className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{m.label}</div>
                      <div className={`text-xl font-bold mt-1 text-${m.color}-600 dark:text-${m.color}-400`}>{m.val}</div>
                      <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r from-${m.color}-500 to-${m.color}-400`} style={{ width: '75%' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 flex items-end px-4 pb-4 gap-2">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-purple-500 to-indigo-400 opacity-80" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ─────────────────────────────────────────────── */}
      <section className="py-12 border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 uppercase tracking-wider">Trusted by industry leaders</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
            {trustedLogos.map((logo) => (
              <span key={logo.name} className={`${logo.style} text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-default select-none`}>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Everything you need</span>{' '}
              to ship with confidence
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              A complete developer platform packed with tools designed to make your team unstoppable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/50 dark:from-purple-900/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ───────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">Product</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
                One platform,{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">infinite possibilities</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
                From idea to production in minutes. Our intelligent platform handles the heavy lifting so your team can focus on building what matters.
              </p>
              <div className="space-y-4">
                {showcaseFeatures.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/25">
                Explore the Platform <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Mock product UI */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-2xl opacity-20" />
              <Card className="relative bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">Pipeline Dashboard</span>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm font-semibold">Deployment Pipeline</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">main branch &bull; 3 stages</div>
                    </div>
                    <Badge className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">Live</Badge>
                  </div>
                  {['Build', 'Test', 'Deploy'].map((stage, i) => (
                    <div key={stage} className="flex items-center gap-3 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{stage}</div>
                        <div className="text-xs text-gray-400">{['12s', '48s', '23s'][i]} elapsed</div>
                      </div>
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">Passed</span>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Total: 1m 23s &bull; Triggered 2 min ago by push to main</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="mb-4 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">Simple, transparent</span>{' '}
              pricing
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">No hidden fees. No surprises. Start free and scale as you grow.</p>

            {/* Billing toggle */}
            <div className="mt-8 inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
              >
                Yearly
                <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full font-medium">-17%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-2 border-purple-500 dark:border-purple-400 shadow-xl shadow-purple-500/10 scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.highlighted && (
                      <Badge className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 text-xs">Most Popular</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price[billingCycle]}</span>
                    {plan.price[billingCycle] !== 'Custom' && plan.price[billingCycle] !== '$0' && (
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">/ month</span>
                    )}
                  </div>
                  <Button
                    className={`w-full mb-6 ${
                      plan.highlighted
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-lg shadow-purple-500/25'
                        : ''
                    }`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="h-4 w-4 text-purple-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Loved by{' '}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">thousands of teams</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t.role} at {t.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Join 10,000+ teams already building the future. Start your free trial today -- no credit card required.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/15 border-white/25 text-white placeholder:text-white/50 backdrop-blur-sm focus:bg-white/20"
            />
            <Button className="bg-white text-purple-700 hover:bg-white/90 font-semibold px-6 flex-shrink-0 shadow-lg" onClick={() => onNavigate && onNavigate('register')}>
              Start Free Trial
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> 14-day free trial</span>
            <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">NovaPlatform</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                The AI-powered platform for modern development teams.
              </p>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="h-9 w-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} NovaPlatform. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
