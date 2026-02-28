import { useState } from 'react'
import {
  Menu, X, Check, ArrowRight, Zap, Shield, BarChart3, Globe, Users, Clock,
  Star, ChevronDown, ChevronUp, Play, Sparkles, Layers, Lock, Cpu,
  Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube,
  CheckCircle2, ArrowUpRight, Rocket, Target, TrendingUp,
  MessageSquare, Headphones, BookOpen, Code2, Database, Cloud,
  Workflow, GitBranch, Send, Monitor, Bell, Search, Settings,
  Activity, PieChart, LayoutDashboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms response times with edge computing and smart caching for blazing performance worldwide.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with end-to-end encryption, SSO, and role-based access control.' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Real-time dashboards, custom reports, and AI-powered insights to drive better decisions.' },
  { icon: Globe, title: 'Global CDN', desc: 'Deployed across 200+ edge locations worldwide for minimal latency everywhere on Earth.' },
  { icon: Layers, title: 'API First', desc: 'RESTful and GraphQL APIs with comprehensive SDKs for seamless third-party integration.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Real-time editing, comments, and workflows built for modern distributed teams.' },
  { icon: Cpu, title: 'AI-Powered', desc: 'Built-in machine learning models for automation, predictions, and intelligent suggestions.' },
  { icon: Lock, title: '99.99% Uptime', desc: 'Multi-region redundancy with automatic failover and zero-downtime deployments guaranteed.' },
]

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'Free forever',
    desc: 'Perfect for individuals and small projects getting started.',
    features: ['Up to 3 projects', '1,000 API calls/mo', 'Community support', 'Basic analytics', '1 team member'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    period: '/month',
    desc: 'For growing teams that need more power and flexibility.',
    features: ['Unlimited projects', '100,000 API calls/mo', 'Priority support', 'Advanced analytics', 'Up to 10 members', 'Custom domains', 'SSO integration', 'Webhooks'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: '/month',
    desc: 'For organizations with advanced security and compliance needs.',
    features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated support', 'Custom SLA', 'Unlimited members', 'On-premise option', 'Audit logs', 'SAML/SCIM'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  { name: 'Alex Rivera', role: 'CTO', company: 'ScaleUp Inc.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', text: 'Switching to this platform cut our development time by 60%. The API is incredibly well-designed and the documentation is top-notch.' },
  { name: 'Priya Sharma', role: 'VP Engineering', company: 'DataFlow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', text: 'The analytics alone are worth the price. We\'ve gained insights that directly led to a 40% increase in user retention.' },
  { name: 'Marcus Johnson', role: 'Founder', company: 'DevTools Co.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Best developer experience I\'ve encountered. The team ships features at an incredible pace and actually listens to feedback.' },
  { name: 'Sophie Chen', role: 'Lead Developer', company: 'CloudNine', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'We migrated our entire infrastructure in a weekend. The migration tools and support team made it completely painless.' },
]

const faqs = [
  { q: 'How does the free trial work?', a: 'Start with a 14-day free trial of the Pro plan. No credit card required. You can downgrade to the free plan anytime without losing your data.' },
  { q: 'Can I change plans later?', a: 'Absolutely. Upgrade or downgrade at any time. When upgrading, you\'ll be prorated for the remainder of your billing cycle.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.' },
  { q: 'Is there a setup fee?', a: 'No setup fees for any plan. You can get started immediately after signing up. Enterprise customers get a dedicated onboarding specialist at no extra cost.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, we\'ll refund your payment in full, no questions asked.' },
  { q: 'What kind of support do you offer?', a: 'Free gets community support, Pro gets priority email and chat support with under 4-hour response time, and Enterprise gets a dedicated account manager with phone support.' },
]

const stats = [
  { value: '10K+', label: 'Companies' },
  { value: '2M+', label: 'API Calls/Day' },
  { value: '99.99%', label: 'Uptime' },
  { value: '<50ms', label: 'Response' },
]

const logos = ['Stripe', 'Vercel', 'Supabase', 'Linear', 'Notion', 'Figma', 'Slack', 'Discord']

const howItWorks = [
  { step: '01', title: 'Choose Your Template', desc: 'Browse our library of 20+ production-ready templates. Filter by category, features, or tech stack to find the perfect starting point.', icon: Layers },
  { step: '02', title: 'Customize & Configure', desc: 'Use our visual editor and AI assistant to customize colors, content, and features to match your brand perfectly.', icon: Code2 },
  { step: '03', title: 'Deploy & Scale', desc: 'One-click deploy to your preferred hosting. Built-in CI/CD, monitoring, and auto-scaling are all included.', icon: Rocket },
]

const integrationPartners = [
  { name: 'AWS', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'Stripe', category: 'Payments' },
  { name: 'Twilio', category: 'Comms' },
  { name: 'SendGrid', category: 'Email' },
  { name: 'Datadog', category: 'Monitoring' },
  { name: 'Auth0', category: 'Auth' },
  { name: 'Cloudflare', category: 'CDN' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Elasticsearch', category: 'Search' },
  { name: 'RabbitMQ', category: 'Queue' },
]

const comparisonFeatures = [
  { feature: 'Projects', free: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'API Calls / month', free: '1,000', pro: '100,000', enterprise: 'Unlimited' },
  { feature: 'Team Members', free: '1', pro: '10', enterprise: 'Unlimited' },
  { feature: 'Custom Domains', free: false, pro: true, enterprise: true },
  { feature: 'SSO / SAML', free: false, pro: true, enterprise: true },
  { feature: 'Priority Support', free: false, pro: true, enterprise: true },
  { feature: 'Advanced Analytics', free: false, pro: true, enterprise: true },
  { feature: 'SLA Guarantee', free: false, pro: false, enterprise: true },
  { feature: 'Dedicated Manager', free: false, pro: false, enterprise: true },
  { feature: 'On-Premise Deploy', free: false, pro: false, enterprise: true },
]

const teamFeatures = [
  { icon: Users, title: 'Shared Workspaces', desc: 'Collaborate in real-time with your entire team on shared projects and templates.' },
  { icon: GitBranch, title: 'Version Control', desc: 'Built-in branching and merging so your team can work on features in parallel.' },
  { icon: MessageSquare, title: 'Inline Comments', desc: 'Leave feedback directly on components. Resolve threads and track decisions.' },
  { icon: Workflow, title: 'Approval Workflows', desc: 'Set up review and approval flows before changes go live to production.' },
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-blue-100 dark:bg-blue-900/40 rotate-180' : 'bg-slate-100 dark:bg-slate-800'}`}>
          <ChevronDown className={`w-4 h-4 transition-colors ${open ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-4xl mt-16">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl opacity-20 blur-2xl" />
      <div className="relative rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md max-w-xs mx-auto flex items-center justify-center">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">app.launchpad.dev/dashboard</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="hidden sm:flex w-48 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex-col p-3 gap-1">
            {[
              { icon: LayoutDashboard, label: 'Dashboard', active: true },
              { icon: Activity, label: 'Analytics', active: false },
              { icon: Users, label: 'Users', active: false },
              { icon: Settings, label: 'Settings', active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div key={label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${active ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium' : 'text-slate-500'}`}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
          <div className="flex-1 p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-2 w-36 bg-slate-100 dark:bg-slate-800/60 rounded mt-2" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-7 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <Bell className="w-3 h-3 text-slate-400" />
                </div>
                <div className="h-7 w-7 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <Search className="w-3 h-3 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Revenue', value: '$48.2K', change: '+12.5%', color: 'text-emerald-500' },
                { label: 'Users', value: '2,847', change: '+8.1%', color: 'text-emerald-500' },
                { label: 'Sessions', value: '14.2K', change: '+23.4%', color: 'text-emerald-500' },
                { label: 'Bounce', value: '24.8%', change: '-3.2%', color: 'text-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] text-slate-500 mb-1">{item.label}</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{item.value}</div>
                  <div className={`text-[10px] font-medium ${item.color}`}>{item.change}</div>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 h-28 flex items-end gap-1">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `linear-gradient(to top, rgb(59 130 246 / 0.6), rgb(99 102 241 / 0.8))` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased">

      {/* ---- Sticky Navigation ---- */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:shadow-blue-600/40 transition-shadow">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">LaunchPad</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300">{item.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm font-medium">Sign In</Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-6 text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-1 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item.label}</a>
            ))}
            <div className="pt-3 space-y-2">
              <Button variant="outline" className="w-full">Sign In</Button>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* ---- Hero Section ---- */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="gradient-mesh absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-800/40 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8 glass">
            <Sparkles className="w-4 h-4" />
            <span>Now with AI-powered automation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6 tracking-tight">
            Build, Ship, Scale
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Next Big Thing</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for building, deploying, and scaling modern applications. From prototype to production in minutes, not months.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full px-8 h-13 text-base shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all hover:scale-[1.02]">
              Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-13 text-base border-slate-300 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:scale-[1.02]">
              <Play className="w-4 h-4 mr-2 fill-current" /> Watch Demo
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center px-2">
                <p className="text-2xl md:text-3xl font-bold font-display bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">{value}</p>
                <p className="text-sm text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <DashboardMockup />
      </section>

      {/* ---- Trusted By / Logo Carousel ---- */}
      <section className="py-14 border-y border-slate-200/80 dark:border-slate-800/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-10 uppercase tracking-wider font-medium">Trusted by industry leaders worldwide</p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
            <div className="flex gap-12 animate-scroll">
              {[...logos, ...logos].map((logo, i) => (
                <span key={`${logo}-${i}`} className="text-xl font-bold text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-500 transition-colors cursor-default whitespace-nowrap select-none">{logo}</span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-scroll { animation: scroll 20s linear infinite; display: flex; width: max-content; }
          .animate-scroll:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ---- Features Grid ---- */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-900/20 dark:to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 stagger-children">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Everything you need to ship</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-lg">A complete toolkit for modern development teams. Build, test, deploy, and monitor all from one platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="group border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-900/50">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-5 group-hover:bg-blue-600 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-600/30 group-hover:scale-110">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-semibold font-display text-base mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How It Works ---- */}
      <section className="py-24 bg-slate-50/80 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Target className="w-3.5 h-3.5" /> How It Works
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Three steps to launch</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto text-lg">From idea to production in minutes, not months.</p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="hidden md:block absolute top-[60px] left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-[2px]">
              <div className="w-full h-full bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-800 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400 dark:bg-indigo-600" />
            </div>
            {howItWorks.map(({ step, title, desc, icon: Icon }, idx) => (
              <div key={step} className="relative text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg group-hover:border-blue-400 dark:group-hover:border-blue-600 group-hover:shadow-blue-500/10 transition-all duration-500">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-blue-600/30">{step}</span>
                </div>
                <h3 className="text-lg font-semibold font-display mb-3">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Product Screenshot ---- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white dark:from-slate-900/20 dark:to-slate-950" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">See it in action</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3">A powerful dashboard that puts you in control</p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl opacity-15 group-hover:opacity-25 blur-2xl transition-opacity duration-700" />
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-8">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md max-w-md mx-auto" />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-0 min-h-[350px]">
                <div className="hidden md:block border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-3">
                  {['Overview', 'Analytics', 'Projects', 'Team', 'Deployments', 'Settings'].map((item, i) => (
                    <div key={item} className={`px-3 py-2 rounded-lg text-sm ${i === 0 ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-medium' : 'text-slate-500'}`}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="md:col-span-3 p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Total Revenue', val: '$284,392', delta: '+24.5%' },
                      { label: 'Active Users', val: '18,294', delta: '+12.3%' },
                      { label: 'Deployments', val: '1,847', delta: '+8.7%' },
                    ].map((m) => (
                      <div key={m.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="text-xs text-slate-500 mb-2">{m.label}</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{m.val}</div>
                        <div className="text-xs font-medium text-emerald-600 mt-1">{m.delta}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-5 h-36 flex items-end gap-1.5">
                    {[35, 55, 40, 70, 60, 80, 65, 90, 75, 95, 50, 85, 70, 60, 88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t transition-all duration-300" style={{ height: `${h}%`, background: 'linear-gradient(to top, rgb(59 130 246 / 0.5), rgb(99 102 241 / 0.8))' }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                      {[85, 62, 94, 48].map((w, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 flex-1"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" style={{ width: `${w}%` }} /></div>
                          <span className="text-xs text-slate-500 w-8">{w}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
                      <div className="relative w-24 h-24">
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-200 dark:text-slate-700" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke="url(#donut-grad)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" />
                          <defs><linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">75%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 dark:from-slate-950/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ---- Pricing ---- */}
      <section id="pricing" className="py-24 bg-slate-50/80 dark:bg-slate-900/30 relative">
        <div className="absolute inset-0 gradient-mesh opacity-20 dark:opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <TrendingUp className="w-3.5 h-3.5" /> Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Simple, transparent pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">No hidden fees. No surprises. Cancel anytime.</p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <span className={`text-sm font-medium transition-colors ${!annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
              <button onClick={() => setAnnual(!annual)} className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${annual ? 'translate-x-7' : 'translate-x-0.5'}`} />
              </button>
              <span className={`text-sm font-medium transition-colors ${annual ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Annual</span>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-semibold">Save 20%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative overflow-hidden transition-all duration-500 ${plan.popular ? 'border-blue-500 dark:border-blue-500 shadow-2xl shadow-blue-500/15 scale-105 z-10' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
                )}
                <CardContent className="p-8">
                  {plan.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold rounded-full mb-4">
                      <Star className="w-3 h-3 fill-current" /> Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold font-display">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-6">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-5xl font-bold font-display tracking-tight">
                      ${annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-slate-500 text-sm ml-1">{plan.price > 0 ? plan.period : ''}</span>
                    {plan.price === 0 && <span className="text-slate-500 text-sm ml-1">{plan.period}</span>}
                  </div>
                  <Button className={`w-full rounded-full h-12 mb-8 font-medium transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40' : 'hover:scale-[1.02]'}`} variant={plan.popular ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Feature Comparison Table ---- */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <BarChart3 className="w-3.5 h-3.5" /> Compare Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Detailed feature comparison</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">See exactly what you get with each plan</p>
          </div>
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                      <th className="text-left py-4 px-6 font-semibold text-slate-500 text-xs uppercase tracking-wider w-1/4">Feature</th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Free</th>
                      <th className="text-center py-4 px-4 font-semibold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">Pro</th>
                      <th className="text-center py-4 px-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((row, idx) => (
                      <tr key={row.feature} className={`border-b border-slate-100 dark:border-slate-800/50 ${idx % 2 === 0 ? '' : 'bg-slate-50/50 dark:bg-slate-900/20'}`}>
                        <td className="py-4 px-6 font-medium text-slate-900 dark:text-white">{row.feature}</td>
                        {['free', 'pro', 'enterprise'].map((plan) => (
                          <td key={plan} className={`py-4 px-4 text-center ${plan === 'pro' ? 'bg-blue-50/40 dark:bg-blue-900/10' : ''}`}>
                            {typeof row[plan] === 'boolean' ? (
                              row[plan] ? (
                                <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
                              ) : (
                                <span className="text-slate-300 dark:text-slate-700">--</span>
                              )
                            ) : (
                              <span className={`font-medium ${plan === 'pro' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>{row[plan]}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---- Built for Teams ---- */}
      <section className="py-24 bg-slate-50/80 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                <Users className="w-3.5 h-3.5" /> Collaboration
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight mb-6">Built for modern teams</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed text-lg">
                Whether your team is 5 or 500, our platform scales with you. Real-time collaboration, role-based access, and enterprise-grade security come standard.
              </p>
              <div className="space-y-6">
                {teamFeatures.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 group">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:shadow-lg group-hover:shadow-blue-600/30 transition-all duration-300">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 font-display">{title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl opacity-10 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/10 p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">LP</div>
                    <div>
                      <div className="h-3 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-2 w-20 bg-slate-100 dark:bg-slate-800/60 rounded mt-1.5" />
                    </div>
                    <div className="ml-auto flex -space-x-2">
                      {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500'].map((c, i) => (
                        <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-white dark:border-slate-900 flex items-center justify-center text-white text-[10px] font-bold`}>{String.fromCharCode(65 + i)}</div>
                      ))}
                    </div>
                  </div>
                  {[
                    { user: 'A', color: 'bg-blue-500', msg: 'Updated the API endpoint for v2 migration', time: '2m ago' },
                    { user: 'B', color: 'bg-emerald-500', msg: 'Approved PR #847 - new auth flow', time: '5m ago' },
                    { user: 'C', color: 'bg-amber-500', msg: 'Deployed staging to preview environment', time: '12m ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{item.user}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{item.msg}</p>
                        <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 flex items-center">
                      <span className="text-xs text-slate-400">Type a message...</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Testimonials ---- */}
      <section id="testimonials" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900/20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <MessageSquare className="w-3.5 h-3.5" /> Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Loved by developers worldwide</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">Join thousands of teams shipping better software</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="group border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white dark:bg-slate-900/50">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800" />
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section id="faq" className="py-24 bg-slate-50/80 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <BookOpen className="w-3.5 h-3.5" /> FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Frequently asked questions</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">Everything you need to know about the platform</p>
          </div>
          <Card className="border-slate-200 dark:border-slate-800 shadow-lg bg-white dark:bg-slate-900/80">
            <CardContent className="p-6 md:p-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---- Integrations ---- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Cloud className="w-3.5 h-3.5" /> Integrations
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">Works with your stack</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">Seamlessly connect with the tools you already use and love</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {integrationPartners.map((partner) => (
              <div
                key={partner.name}
                className="group p-5 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <Database className="w-5 h-5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="font-semibold text-sm text-slate-900 dark:text-white">{partner.name}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-500 uppercase tracking-wider">{partner.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Contact / Demo Form ---- */}
      <section className="py-24 bg-slate-50/80 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              <Mail className="w-3.5 h-3.5" /> Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight">Request a demo</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">See how LaunchPad can accelerate your development workflow</p>
          </div>
          <Card className="border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900/80">
            <CardContent className="p-8 md:p-10">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First name</label>
                  <Input placeholder="John" className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last name</label>
                  <Input placeholder="Doe" className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all" />
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Work email</label>
                <Input type="email" placeholder="john@company.com" className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
              <div className="space-y-2 mb-5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
                <Input placeholder="Acme Inc." className="h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message (optional)</label>
                <textarea
                  placeholder="Tell us about your project and what you're looking to achieve..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                />
              </div>
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-medium text-base shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all">
                <Send className="w-4 h-4 mr-2" /> Request Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ---- CTA Banner ---- */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative p-12 md:p-20 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
            <div className="absolute inset-0 gradient-mesh opacity-30" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            <div className="relative text-center">
              <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-6 tracking-tight">Ready to ship faster?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">Join 10,000+ developers who are building the future with LaunchPad. Start free, scale infinitely.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 h-13 font-semibold shadow-xl shadow-black/10 hover:scale-[1.02] transition-all">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-13 hover:scale-[1.02] transition-all">
                  Talk to Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-20 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white font-display tracking-tight">LaunchPad</span>
              </div>
              <p className="text-sm leading-relaxed mb-5">The modern platform for building and shipping software at scale. From prototype to production.</p>
              <div className="flex gap-2 mb-5">
                <Input placeholder="Your email" className="h-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl text-sm flex-1 focus:ring-2 focus:ring-blue-500/30" />
                <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white h-10 px-5 rounded-xl text-sm shrink-0">Subscribe</Button>
              </div>
              <div className="flex gap-2">
                {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'Changelog', 'Docs', 'API Reference'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Security', 'GDPR', 'Status Page'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} LaunchPad. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              All systems operational
            </div>
          </div>
        </div>
      </footer>

      {/* ---- Theme Switcher ---- */}
      <ThemeSwitcher />
    </div>
  )
}

export default App
