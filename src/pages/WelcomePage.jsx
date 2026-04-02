/**
 * WelcomePage — VA Studio Landing Page & Template Gallery
 *
 * Modern SaaS landing page inspired by valtunox.dev, Bolt.new, v0.dev.
 *
 * Sections:
 *   1. Hero with dramatic gradient, prompt input, social proof
 *   2. "What Will You Build?" use-case cards
 *   3. Feature highlights
 *   4. Template gallery with category filters + search
 *   5. How-it-works steps
 *   6. Testimonials
 *   7. CTA
 *   8. Footer
 *   + Floating AI chatbot
 *
 * @module WelcomePage
 * @see {@link ../App.jsx} for routing
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useBackendContext } from '@/context/BackendStatusContext'
import {
  Search,
  ShoppingCart,
  Briefcase,
  BarChart3,
  BookOpen,
  Users,
  Package,
  MessageCircle,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Palette,
  Code2,
  Rocket,
  Star,
  ChevronRight,
  ExternalLink,
  Github,
  Twitter,
  Mail,
  Heart,
  Eye,
  Wifi,
  Paperclip,
  Image,
  Send,
  WifiOff,
  RefreshCw,
  Server,
  Database,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronDown,
  Apple,
  HeartPulse,
  Salad,
  Dumbbell,
  Trophy,
  Landmark,
  Calculator,
  BadgeDollarSign,
  Megaphone,
  Bot,
  LogIn,
  UserPlus,
  Compass,
  Target,
  Sun,
  Moon,
  Menu,
  X,
  Quote,
  Building2,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Template Data                                                      */
/* ------------------------------------------------------------------ */

const TEMPLATES = [
  {
    id: 'aiassistant',
    name: 'AI Assistant',
    description: 'General-purpose AI chat assistant with multiple agents, code generation, web search simulation, and modern ChatGPT-style UI.',
    category: 'business',
    icon: Bot,
    color: 'from-indigo-500 to-purple-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    tags: ['AI Chat', 'Agents', 'Code Gen', 'Research'],
    isPremium: false,
    rating: 4.9,
    previews: 3580,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Full-featured online storefront with cart, wishlist, product filtering, flash deals, and customer reviews.',
    category: 'commerce',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    tags: ['Storefront', 'Cart', 'Products', 'Checkout'],
    isPremium: false,
    rating: 4.9,
    previews: 2840,
  },
  {
    id: 'saas',
    name: 'SaaS Landing',
    description: 'Modern SaaS landing page with pricing tiers, feature grid, testimonials, FAQ accordion, and conversion CTAs.',
    category: 'marketing',
    icon: Rocket,
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    tags: ['Pricing', 'Features', 'SaaS', 'Landing'],
    isPremium: false,
    rating: 4.8,
    previews: 2120,
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Creative developer portfolio with project gallery, skill bars, timeline, testimonials, and contact form.',
    category: 'personal',
    icon: Briefcase,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    tags: ['Portfolio', 'Projects', 'Resume', 'Contact'],
    isPremium: false,
    rating: 4.9,
    previews: 3210,
  },
  {
    id: 'blog',
    name: 'Blog / Magazine',
    description: 'Magazine-style blog with featured posts, category tabs, trending sidebar, author profiles, and newsletter.',
    category: 'content',
    icon: BookOpen,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    tags: ['Articles', 'Categories', 'Authors', 'Newsletter'],
    isPremium: false,
    rating: 4.7,
    previews: 1890,
  },
  {
    id: 'crm',
    name: 'CRM Dashboard',
    description: 'Customer relationship management with sales pipeline, contacts table, activity feed, and task management.',
    category: 'business',
    icon: Users,
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    borderColor: 'border-cyan-200',
    tags: ['Pipeline', 'Contacts', 'Tasks', 'Analytics'],
    isPremium: true,
    rating: 4.8,
    previews: 1560,
  },
  {
    id: 'erp',
    name: 'ERP System',
    description: 'Enterprise resource planning with KPI cards, orders table, warehouse capacity, purchase orders, and stock alerts.',
    category: 'business',
    icon: Package,
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-700',
    borderColor: 'border-rose-200',
    tags: ['Inventory', 'Orders', 'Warehouse', 'KPIs'],
    isPremium: true,
    rating: 4.6,
    previews: 980,
  },
  {
    id: 'business',
    name: 'Business Website',
    description: 'Corporate-ready website for consulting firms and service companies with trust signals, service sections, and outcome-driven content.',
    category: 'business',
    icon: Building2,
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    tags: ['Company', 'Consulting', 'Services', 'Corporate'],
    isPremium: false,
    rating: 4.8,
    previews: 1210,
  },
  {
    id: 'organization',
    name: 'Organization Website',
    description: 'Public-facing template for nonprofits and institutions to showcase mission, programs, impact metrics, and volunteer calls-to-action.',
    category: 'business',
    icon: Landmark,
    color: 'from-sky-500 to-cyan-600',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    tags: ['Nonprofit', 'Community', 'Programs', 'Impact'],
    isPremium: false,
    rating: 4.7,
    previews: 970,
  },
  {
    id: 'social',
    name: 'Social Platform',
    description: 'Social media platform with feed, stories, compose box, trending topics, messaging preview, and user profiles.',
    category: 'social',
    icon: MessageCircle,
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    tags: ['Feed', 'Stories', 'Messages', 'Profiles'],
    isPremium: false,
    rating: 4.7,
    previews: 2450,
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    description: 'Data analytics dashboard with KPI sparklines, revenue breakdown, device stats, top pages, and transactions.',
    category: 'business',
    icon: LayoutDashboard,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    tags: ['Analytics', 'Charts', 'Reports', 'KPIs'],
    isPremium: true,
    rating: 4.9,
    previews: 1740,
  },
  {
    id: 'nutrition',
    name: 'Nutrition Tracker',
    description: 'Comprehensive nutrition tracking with meal logging, calorie counter, macro breakdown, food database, and daily goals.',
    category: 'health',
    icon: Apple,
    color: 'from-lime-500 to-green-600',
    bgLight: 'bg-lime-50',
    textColor: 'text-lime-700',
    borderColor: 'border-lime-200',
    tags: ['Meals', 'Calories', 'Macros', 'Food Log'],
    isPremium: false,
    rating: 4.8,
    previews: 1920,
  },
  {
    id: 'health',
    name: 'Health Dashboard',
    description: 'Personal health monitoring with vitals tracking, medication reminders, sleep analysis, heart rate, and wellness scores.',
    category: 'health',
    icon: HeartPulse,
    color: 'from-red-500 to-rose-600',
    bgLight: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    tags: ['Vitals', 'Sleep', 'Heart Rate', 'Wellness'],
    isPremium: true,
    rating: 4.9,
    previews: 2150,
  },
  {
    id: 'diet',
    name: 'Diet Planner',
    description: 'Smart diet planning with weekly meal prep, recipe suggestions, grocery lists, dietary preferences, and progress charts.',
    category: 'health',
    icon: Salad,
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    tags: ['Meal Plans', 'Recipes', 'Grocery', 'Progress'],
    isPremium: false,
    rating: 4.7,
    previews: 1680,
  },
  {
    id: 'gym',
    name: 'Gym & Fitness',
    description: 'Gym workout tracker with exercise library, custom routines, set/rep logging, progress photos, and personal records.',
    category: 'health',
    icon: Dumbbell,
    color: 'from-orange-500 to-amber-600',
    bgLight: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    tags: ['Workouts', 'Exercises', 'Progress', 'Routines'],
    isPremium: false,
    rating: 4.8,
    previews: 2340,
  },
  {
    id: 'sports',
    name: 'Sports Hub',
    description: 'Sports management platform with live scores, team rosters, match schedules, league standings, and player statistics.',
    category: 'health',
    icon: Trophy,
    color: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-200',
    tags: ['Scores', 'Teams', 'Leagues', 'Stats'],
    isPremium: true,
    rating: 4.7,
    previews: 1450,
  },
  {
    id: 'finance',
    name: 'Finance Dashboard',
    description: 'Financial management with portfolio overview, income/expense tracking, budget planner, investments, and cash flow analysis.',
    category: 'finance',
    icon: Landmark,
    color: 'from-teal-500 to-cyan-600',
    bgLight: 'bg-teal-50',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200',
    tags: ['Portfolio', 'Budget', 'Investments', 'Cash Flow'],
    isPremium: true,
    rating: 4.9,
    previews: 2680,
  },
  {
    id: 'accounting',
    name: 'Accounting Suite',
    description: 'Accounting platform with general ledger, invoicing, accounts payable/receivable, tax reports, and financial statements.',
    category: 'finance',
    icon: Calculator,
    color: 'from-slate-500 to-zinc-600',
    bgLight: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-300',
    tags: ['Ledger', 'Invoices', 'Tax', 'Statements'],
    isPremium: true,
    rating: 4.7,
    previews: 1320,
  },
  {
    id: 'sales',
    name: 'Sales Pipeline',
    description: 'Sales management with deal pipeline, lead tracking, revenue forecasting, team leaderboard, and activity timeline.',
    category: 'finance',
    icon: BadgeDollarSign,
    color: 'from-green-500 to-emerald-600',
    bgLight: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    tags: ['Pipeline', 'Leads', 'Forecast', 'Deals'],
    isPremium: false,
    rating: 4.8,
    previews: 1960,
  },
  {
    id: 'marketing',
    name: 'Marketing Hub',
    description: 'Marketing dashboard with campaign analytics, email performance, social media metrics, SEO tracker, and content calendar.',
    category: 'marketing',
    icon: Megaphone,
    color: 'from-fuchsia-500 to-pink-600',
    bgLight: 'bg-fuchsia-50',
    textColor: 'text-fuchsia-700',
    borderColor: 'border-fuchsia-200',
    tags: ['Campaigns', 'Email', 'SEO', 'Social'],
    isPremium: false,
    rating: 4.8,
    previews: 2210,
  },
  {
    id: 'login',
    name: 'Login Page',
    description: 'Beautiful split-screen login with social auth, dark/light toggle, email form, and responsive mobile layout.',
    category: 'auth',
    icon: LogIn,
    color: 'from-indigo-500 to-blue-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    tags: ['Auth', 'Login', 'Social', 'Form'],
    isPremium: false,
    rating: 4.9,
    previews: 3420,
  },
  {
    id: 'register',
    name: 'Registration Page',
    description: 'Registration form with password strength indicator, validation, social signup, terms acceptance, and split-screen branding.',
    category: 'auth',
    icon: UserPlus,
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    textColor: 'text-violet-700',
    borderColor: 'border-violet-200',
    tags: ['Auth', 'Register', 'Signup', 'Form'],
    isPremium: false,
    rating: 4.9,
    previews: 2890,
  },
  {
    id: 'onboarding',
    name: 'Onboarding Wizard',
    description: 'Multi-step onboarding flow with progress bar, profile setup, company info, preferences, and completion celebration.',
    category: 'auth',
    icon: Compass,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    tags: ['Onboarding', 'Wizard', 'Steps', 'Setup'],
    isPremium: false,
    rating: 4.8,
    previews: 2150,
  },
  {
    id: 'leads',
    name: 'Leads Manager',
    description: 'Lead management dashboard with scoring, source tracking, conversion funnel, pipeline visualization, and activity feed.',
    category: 'business',
    icon: Target,
    color: 'from-blue-500 to-cyan-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200',
    tags: ['Leads', 'Pipeline', 'Scoring', 'CRM'],
    isPremium: true,
    rating: 4.9,
    previews: 1870,
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Templates', icon: Sparkles },
  { id: 'commerce', label: 'Commerce', icon: ShoppingCart },
  { id: 'marketing', label: 'Marketing', icon: Rocket },
  { id: 'personal', label: 'Personal', icon: Briefcase },
  { id: 'content', label: 'Content', icon: BookOpen },
  { id: 'business', label: 'Business', icon: BarChart3 },
  { id: 'social', label: 'Social', icon: MessageCircle },
  { id: 'health', label: 'Health & Fitness', icon: HeartPulse },
  { id: 'finance', label: 'Finance', icon: Landmark },
  { id: 'auth', label: 'Auth & Onboarding', icon: LogIn },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Preview',
    description: 'Browse and preview any template live in your browser — no setup, no installation.',
  },
  {
    icon: Palette,
    title: 'Tailwind CSS',
    description: 'Every template is built with Tailwind CSS for rapid customization and consistent design.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Production-ready React components with best practices, accessibility, and responsive design.',
  },
  {
    icon: Globe,
    title: 'Public-First',
    description: 'No login required. Browse, preview, and request templates — all without signing up.',
  },
]

const STEPS = [
  { step: '01', title: 'Browse Templates', description: 'Explore our curated collection of 22 production-ready templates.' },
  { step: '02', title: 'Live Preview', description: 'Click any template to see it running live in your browser.' },
  { step: '03', title: 'Chat with AI', description: 'Tell our AI what you need — it recommends the perfect template.' },
  { step: '04', title: 'Request & Deploy', description: 'Submit a customization request and get your tailored template.' },
]

const GITHUB_URL = 'https://github.com/valtunox/va_studio_frontend_starter'

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    avatar: 'SC',
    color: 'from-pink-500 to-rose-500',
    text: 'VA Studio saved me weeks of work. The AI Assistant template was exactly what I needed — clean code, great structure, and the live preview made it so easy to evaluate.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Frontend Engineer @ Stripe',
    avatar: 'MJ',
    color: 'from-indigo-500 to-violet-500',
    text: 'I\'ve tried dozens of template libraries. VA Studio stands out with its production-ready quality. The Finance Dashboard template is genuinely better than most paid alternatives.',
  },
  {
    name: 'Aiko Tanaka',
    role: 'Indie SaaS Founder',
    avatar: 'AT',
    color: 'from-emerald-500 to-teal-500',
    text: 'Launched my SaaS landing page in under an hour using the SaaS template. The Tailwind setup is perfect — I just tweaked the colors and copy and shipped it.',
  },
]

const ROTATING_WORDS = ['AI Assistants', 'E-Commerce', 'SaaS Landing', 'Finance Dashboard']

const USE_CASES = [
  { icon: LayoutDashboard, title: 'SaaS Dashboard', description: 'Analytics, metrics, and admin panels for your SaaS product.', templateId: 'dashboard' },
  { icon: ShoppingCart, title: 'E-Commerce Store', description: 'Full storefront with cart, checkout, and product management.', templateId: 'ecommerce' },
  { icon: Bot, title: 'AI Chatbot', description: 'Conversational AI interface with multi-agent support.', templateId: 'aiassistant' },
  { icon: Briefcase, title: 'Portfolio Site', description: 'Showcase your work with a stunning developer portfolio.', templateId: 'portfolio' },
  { icon: Rocket, title: 'SaaS Landing Page', description: 'High-converting landing page with pricing and testimonials.', templateId: 'saas' },
  { icon: Landmark, title: 'Finance App', description: 'Portfolio tracking, budgets, and financial analytics.', templateId: 'finance' },
  { icon: Users, title: 'CRM Platform', description: 'Manage contacts, deals, and customer relationships.', templateId: 'crm' },
  { icon: Megaphone, title: 'Marketing Hub', description: 'Campaign analytics, email metrics, and content calendar.', templateId: 'marketing' },
]

const CHATBOT_MESSAGES = [
  { from: 'bot', text: 'Hey! 👋 I\'m VA Studio AI. I can help you find the perfect template for your project.' },
  { from: 'bot', text: 'What kind of app are you building? I\'ll recommend the best starting point.' },
  { from: 'user', text: 'I need a SaaS dashboard with analytics' },
  { from: 'bot', text: 'Great choice! I\'d recommend our Analytics Dashboard template — it comes with KPI sparklines, revenue charts, and a clean data table. Want me to show you a preview?' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function WelcomePage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [showStatusPanel, setShowStatusPanel] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'))
  const [statsVisible, setStatsVisible] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const statsRef = useRef(null)
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

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const filtered = useMemo(() => {
    return TEMPLATES.filter((t) => {
      const matchesCategory = activeCategory === 'all' || t.category === activeCategory
      const matchesSearch =
        !search ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans">
      {/* ── Announcement Bar + Backend Status ────────────────── */}
      <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">VA Studio v1.0</span>
            <span className="hidden sm:inline">— Build production-ready apps with AI + templates.</span>
            <a href="#templates" className="underline underline-offset-2 hover:text-indigo-200 ml-1">
              Explore now →
            </a>
          </span>
          <BackendStatusBadge backend={backend} onClick={() => setShowStatusPanel((p) => !p)} />
        </div>
      </div>

      {/* ── Backend Status Panel (expandable) ─────────────────── */}
      {showStatusPanel && (
        <BackendStatusPanel backend={backend} onClose={() => setShowStatusPanel(false)} />
      )}

      {/* ── Navbar ────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/25">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold font-display text-slate-900 dark:text-white tracking-tight">
                VA Studio
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 dark:text-slate-500 ml-2 font-mono">
                v1.0
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#templates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Templates
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hidden md:inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2"
            >
              Sign In
            </a>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-indigo-600/25 transition-all hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">
            {[
              { href: '#templates', label: 'Templates' },
              { href: '#features', label: 'Features' },
              { href: '#how-it-works', label: 'How It Works' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              >
                Sign In
              </a>
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Dramatic animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-br from-indigo-200 via-violet-100 to-purple-200 dark:from-indigo-950/80 dark:via-violet-950/60 dark:to-purple-950/40 rounded-full blur-3xl opacity-50 animate-pulse" />
          <div className="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-pink-200 via-fuchsia-100 to-transparent dark:from-pink-950/40 dark:via-fuchsia-950/20 dark:to-transparent rounded-full blur-3xl opacity-40" />
          <div className="absolute top-60 -left-20 w-80 h-80 bg-gradient-to-br from-blue-200 to-transparent dark:from-blue-950/30 dark:to-transparent rounded-full blur-3xl opacity-30" />
          {/* Dot grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-32 sm:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 text-sm text-indigo-700 dark:text-indigo-300 font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              AI-Powered Template Studio
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6">
              Turn Ideas into Apps.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                With AI.
              </span>
            </h1>

            {/* Rotating template names */}
            <div className="h-8 sm:h-10 relative mb-6 overflow-hidden">
              <div className="hero-rotating-text text-lg sm:text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                {ROTATING_WORDS.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </div>
            </div>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              VA Studio helps vibe coders ship faster. Pick a template, customize with AI, and deploy production-ready web apps in minutes — not months.
            </p>

            {/* Prompt Input (cosmetic) */}
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

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a
                href="#templates"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
              >
                Start Building — it's free
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm text-slate-700 dark:text-slate-300 font-semibold rounded-full border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all hover:-translate-y-0.5"
              >
                <Eye className="w-5 h-5" />
                Watch Demo
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="flex -space-x-2">
                {['from-pink-500 to-rose-500', 'from-indigo-500 to-violet-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-cyan-500 to-blue-500'].map((gradient, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-white dark:border-slate-950 flex items-center justify-center text-white text-[10px] font-bold`}>
                    {['S', 'M', 'A', 'J', 'K'][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Trusted by <span className="font-semibold text-slate-700 dark:text-slate-300">10,000+</span> developers
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center justify-center gap-8 sm:gap-12 text-center">
              {[
                { value: '22', label: 'Templates' },
                { value: '100%', label: 'Free & Open' },
                { value: '0', label: 'Login Required' },
                { value: 'AI', label: 'Powered Chat' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`stat-animate ${statsVisible ? 'stat-visible' : ''}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black font-display bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Will You Build? ──────────────────────────────── */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              What Will You Build?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From dashboards to storefronts — pick a use case and start building in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {USE_CASES.map((uc) => (
              <Link
                key={uc.templateId}
                to={`/preview/${uc.templateId}`}
                className="group relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-600/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mb-4 group-hover:from-indigo-200 group-hover:to-violet-200 dark:group-hover:from-indigo-900/50 dark:group-hover:to-violet-900/50 transition-colors">
                  <uc.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mb-1.5">{uc.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{uc.description}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Template <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Why VA Studio?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to find, preview, and customize the perfect template.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-600/5 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center mb-4 group-hover:from-indigo-100 group-hover:to-violet-100 dark:group-hover:from-indigo-900/50 dark:group-hover:to-violet-900/50 transition-colors">
                  <f.icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Template Gallery ──────────────────────────────────── */}
      <section id="templates" className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Template Gallery
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Click any template to see it running live. Each one is fully responsive and production-ready.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-10">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/50 dark:border-slate-700/50'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span> of{' '}
            {TEMPLATES.length} templates
          </p>

          {/* Template Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">No templates found</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setActiveCategory('all')
                }}
                className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              From idea to deployment in four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-700" />
                )}
                <div className="text-4xl font-black font-display bg-gradient-to-br from-indigo-200 to-violet-200 dark:from-indigo-900 dark:to-violet-900 bg-clip-text text-transparent mb-4">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white mb-4">
              Loved by Developers
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              See what developers are saying about VA Studio templates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative p-6 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:shadow-indigo-600/5"
              >
                <Quote className="w-8 h-8 text-indigo-200 dark:text-indigo-900 mb-4" />
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  "{t.text}"
                </p>
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4">
                Ready to Build Something Magical?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Pick a template, let AI customize it, and ship your next project today. Join 10,000+ developers already building with VA Studio.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#templates"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold rounded-full hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  Start Building — it's free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5"
                >
                  <Github className="w-5 h-5" />
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200/50 dark:border-slate-800/50 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold font-display text-slate-900 dark:text-white">VA Studio</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                AI-powered template studio for modern web applications. Built with React and Tailwind CSS.
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

            {/* Templates */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Templates</h4>
              <ul className="space-y-2.5">
                {TEMPLATES.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <Link
                      to={`/preview/${t.id}`}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Templates */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">More</h4>
              <ul className="space-y-2.5">
                {TEMPLATES.slice(5, 10).map((t) => (
                  <li key={t.id}>
                    <Link
                      to={`/preview/${t.id}`}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2.5">
                {['Documentation', 'API Reference', 'Changelog', 'Contributing', 'License'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    Sign In
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    Start Free Trial →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
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

      {/* ── Floating AI Chatbot ───────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Panel */}
        {chatOpen && (
          <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-indigo-600/10 border border-slate-200 dark:border-slate-800 overflow-hidden animate-in">
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">VA Studio AI</p>
                  <p className="text-xs text-white/70">Always online</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="p-4 h-72 overflow-y-auto space-y-3">
              {CHATBOT_MESSAGES.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask VA Studio AI..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  readOnly
                />
                <button className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg transition-all flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={() => setChatOpen((p) => !p)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all flex items-center justify-center"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero Section Component                                             */
/* ------------------------------------------------------------------ */

const SUGGESTION_CHIPS = [
  { label: 'E-commerce store', prompt: 'I want to build an e-commerce store with product filtering, a shopping cart, wishlist, and customer reviews.' },
  { label: 'SaaS landing page', prompt: 'I need a modern SaaS landing page with pricing tiers, feature grid, testimonials, and a FAQ section.' },
  { label: 'AI chat assistant', prompt: 'I want to build an AI chat assistant with multiple agents, code generation, and a ChatGPT-style interface.' },
  { label: 'Portfolio website', prompt: 'I need a creative developer portfolio with a project gallery, skill bars, timeline, and contact form.' },
  { label: 'CRM dashboard', prompt: 'I want a CRM dashboard with sales pipeline, contacts table, activity feed, and task management.' },
  { label: 'Finance tracker', prompt: 'I need a finance dashboard with portfolio overview, income/expense tracking, budget planner, and cash flow analysis.' },
]

function HeroSection({ statsRef, statsVisible }) {
  const [promptText, setPromptText] = useState('')
  const textareaRef = useRef(null)

  const handleChipClick = (prompt) => {
    setPromptText(prompt)
    textareaRef.current?.focus()
  }

  const handleGenerate = () => {
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950/40 dark:via-slate-950 dark:to-violet-950/40" />
        <div className="bg-glow-slow absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/60 via-violet-100/40 to-transparent dark:from-indigo-800/20 dark:via-violet-900/15 dark:to-transparent rounded-full blur-3xl" />
        <div className="bg-glow-slower absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-200/50 via-rose-100/30 to-transparent dark:from-pink-900/20 dark:via-rose-950/15 dark:to-transparent rounded-full blur-3xl" />
        <div className="bg-glow-slow absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-t from-blue-100/40 to-transparent dark:from-blue-950/20 dark:to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-sm text-indigo-700 dark:text-indigo-300 font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Open-Source Template Studio
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-4">
            What do you want to{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              build
            </span>
            ?
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your idea and we'll find the perfect template
          </p>

          {/* ── LARGE Chat/Prompt Card ── */}
          <div className="hero-prompt-glow rounded-2xl p-[2px] mx-auto max-w-3xl">
            <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-2xl shadow-indigo-500/10">
              {/* Textarea */}
              <div className="p-4 pb-0">
                <textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="I want to build an e-commerce store with product filtering, a shopping cart, and user reviews..."
                  rows={4}
                  className="w-full resize-none bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base leading-relaxed focus:outline-none"
                />
              </div>

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Attach file">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" title="Add image">
                    <Image className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4" />
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* ── Suggestion Chips ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-w-3xl mx-auto">
            {SUGGESTION_CHIPS.map((chip) => (
              <button
                key={chip.label}
                onClick={() => handleChipClick(chip.prompt)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* ── Stats (compact) ── */}
          <div ref={statsRef} className="flex items-center justify-center gap-6 sm:gap-10 text-center mt-12">
            {[
              { value: '22', label: 'Templates' },
              { value: '100%', label: 'Free & Open' },
              { value: '0', label: 'Login Required' },
              { value: 'AI', label: 'Powered Chat' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-animate ${statsVisible ? 'stat-visible' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <p className="text-2xl sm:text-3xl font-black font-display bg-gradient-to-br from-indigo-600 to-violet-600 bg-clip-text text-transparent">{stat.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Template Card Component                                            */
/* ------------------------------------------------------------------ */

function TemplateCard({ template }) {
  const { id, name, description, icon: Icon, color, bgLight, textColor, borderColor, tags, isPremium, rating, previews } = template

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-xl hover:-translate-y-1">
      {/* Gradient header */}
      <div className={`relative h-36 bg-gradient-to-br ${color} p-5 flex items-end`}>
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        </div>

        {isPremium && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            Premium
          </span>
        )}

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">{name}</h3>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span className="flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-current" />
                {rating}
              </span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <Eye className="w-3 h-3" />
                {previews.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgLight} ${textColor} dark:bg-slate-800 dark:text-slate-300 border ${borderColor} dark:border-slate-700`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 pt-0 flex gap-2">
        <Link
          to={`/preview/${id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Live Preview
        </Link>
        <Link
          to={`/preview/${id}`}
          className="inline-flex items-center justify-center px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Backend Status Badge (compact, in announcement bar)                */
/* ------------------------------------------------------------------ */

const STATUS_CONFIG = {
  checking: {
    label: 'Checking...',
    dotClass: 'bg-yellow-400 animate-pulse',
    bgClass: 'bg-white/10 hover:bg-white/20',
    Icon: RefreshCw,
    iconClass: 'animate-spin',
  },
  online: {
    label: 'Backend Online',
    dotClass: 'bg-emerald-400',
    bgClass: 'bg-emerald-500/20 hover:bg-emerald-500/30',
    Icon: Wifi,
    iconClass: '',
  },
  degraded: {
    label: 'Degraded',
    dotClass: 'bg-amber-400 animate-pulse',
    bgClass: 'bg-amber-500/20 hover:bg-amber-500/30',
    Icon: AlertTriangle,
    iconClass: '',
  },
  offline: {
    label: 'Backend Offline',
    dotClass: 'bg-red-400',
    bgClass: 'bg-red-500/20 hover:bg-red-500/30',
    Icon: WifiOff,
    iconClass: '',
  },
}

function BackendStatusBadge({ backend, onClick }) {
  const cfg = STATUS_CONFIG[backend.status]
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white transition-all ${cfg.bgClass}`}
      title={`Backend: ${cfg.label}${backend.latency ? ` (${backend.latency}ms)` : ''} — Click for details`}
    >
      <span className={`w-2 h-2 rounded-full ${cfg.dotClass}`} />
      <cfg.Icon className={`w-3.5 h-3.5 ${cfg.iconClass}`} />
      <span className="hidden sm:inline">{cfg.label}</span>
      {backend.latency && backend.status === 'online' && (
        <span className="hidden md:inline text-white/60">{backend.latency}ms</span>
      )}
      <ChevronDown className="w-3 h-3 text-white/60" />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  Backend Status Panel (expanded detail view)                        */
/* ------------------------------------------------------------------ */

function BackendStatusPanel({ backend, onClose }) {
  const { status, details, latency, lastCheck, retry } = backend
  const cfg = STATUS_CONFIG[status]
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5112/api/v1'
  const baseUrl = apiUrl.replace('/api/v1', '')

  const services = details?.services || {}
  const backendName = details?.app || details?.name || 'VA Studio Backend'
  const backendVersion = details?.version || '-'

  const statusColorMap = {
    online: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300' },
    degraded: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
    offline: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' },
    checking: { bg: 'bg-slate-50 dark:bg-slate-900', border: 'border-slate-200 dark:border-slate-700', text: 'text-slate-600 dark:text-slate-400' },
  }

  const colors = statusColorMap[status]

  return (
    <div className={`border-b ${colors.border} ${colors.bg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'online' ? 'bg-emerald-100 dark:bg-emerald-900/50' : status === 'offline' ? 'bg-red-100 dark:bg-red-900/50' : 'bg-amber-100 dark:bg-amber-900/50'}`}>
              <Server className={`w-5 h-5 ${colors.text}`} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Backend Connection Status
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${colors.bg} ${colors.text} border ${colors.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                  {cfg.label}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Connecting to <span className="font-mono text-slate-700 dark:text-slate-300">{baseUrl}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={retry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              title="Re-check backend status now"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-check
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Server */}
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Server</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{backendName}</p>
            <p className="text-xs text-slate-400 font-mono">v{backendVersion}</p>
          </div>

          {/* Latency */}
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Latency</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {latency ? `${latency}ms` : '—'}
            </p>
            <p className="text-xs text-slate-400">
              {latency && latency < 100 ? 'Excellent' : latency && latency < 300 ? 'Good' : latency ? 'Slow' : 'N/A'}
            </p>
          </div>

          {/* Database */}
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Database</span>
            </div>
            {status === 'offline' ? (
              <>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">Unreachable</p>
                <p className="text-xs text-slate-400">Server down</p>
              </>
            ) : (
              <>
                <p className={`text-sm font-semibold ${services.database ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                  {services.database ? 'Connected' : 'Disconnected'}
                </p>
                <p className="text-xs text-slate-400">PostgreSQL</p>
              </>
            )}
          </div>

          {/* Last Check */}
          <div className="p-3 rounded-xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Last Check</span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {lastCheck ? new Date(lastCheck).toLocaleTimeString() : '—'}
            </p>
            <p className="text-xs text-slate-400">Auto-polls every {status === 'offline' ? '10s' : '30s'}</p>
          </div>
        </div>

        {/* Services row (when online/degraded) */}
        {status !== 'offline' && status !== 'checking' && Object.keys(services).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(services).map(([name, healthy]) => (
              <span
                key={name}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  healthy
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                }`}
              >
                {healthy ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {name}
              </span>
            ))}
          </div>
        )}

        {/* Offline help message */}
        {status === 'offline' && (
          <div className="mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <p className="text-xs text-red-700 dark:text-red-300 font-medium mb-1">Cannot reach the backend server</p>
            <p className="text-xs text-red-600/80 dark:text-red-400/80 leading-relaxed">
              Make sure the FastAPI server is running at <span className="font-mono font-semibold">{baseUrl}</span>.
              Start it with: <code className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/40 font-mono text-[11px]">python -m uvicorn app.app:app --port 5112 --reload</code>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
