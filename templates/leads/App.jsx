import { useState } from 'react'
import {
  LayoutDashboard, Users, Target, TrendingUp, BarChart3, Settings,
  Menu, X, Bell, Plus, Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  DollarSign, Clock, Mail, Building2, Globe, Star, Zap,
  ChevronDown, CheckCircle2, Activity, Eye, Calendar, Download, RefreshCw,
  Megaphone, FlaskConical, MousePointerClick, FileDown, BookOpen,
  Briefcase, Factory, Award, PlayCircle, PenTool, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, AreaChart, BarChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const kpiCards = [
  { label: 'Total Leads', value: '2,847', change: '+12.5%', trend: 'up', icon: Users, sparkData: [180, 210, 195, 240, 260, 230, 275, 290, 310, 285, 320, 340] },
  { label: 'Qualified Leads', value: '892', change: '+8.3%', trend: 'up', icon: Target, sparkData: [50, 62, 58, 71, 68, 75, 82, 78, 85, 90, 88, 92] },
  { label: 'Conversion Rate', value: '14.2%', change: '+1.8%', trend: 'up', icon: TrendingUp, sparkData: [10, 11.2, 10.8, 12.1, 11.5, 12.8, 13.2, 12.9, 13.5, 13.8, 14.0, 14.2] },
  { label: 'Cost per Lead', value: '$24.50', change: '-$3.20', trend: 'down', icon: DollarSign, sparkData: [32, 30, 29, 28, 27.5, 26, 27, 25.5, 25, 24.8, 25, 24.5] },
]

const leadSourcesData = [
  { label: 'Organic', value: 35, color: '#3b82f6' },
  { label: 'Paid Ads', value: 28, color: '#f59e0b' },
  { label: 'Referral', value: 18, color: '#8b5cf6' },
  { label: 'Social', value: 12, color: '#ec4899' },
  { label: 'Direct', value: 7, color: '#06b6d4' },
]

const funnelStages = [
  { stage: 'Visitors', count: 48200, pct: 100, dropOff: null },
  { stage: 'Leads', count: 2847, pct: 5.9, dropOff: '94.1%' },
  { stage: 'MQL', count: 1420, pct: 2.95, dropOff: '50.1%' },
  { stage: 'SQL', count: 892, pct: 1.85, dropOff: '37.2%' },
  { stage: 'Opportunity', count: 412, pct: 0.85, dropOff: '53.8%' },
  { stage: 'Customer', count: 156, pct: 0.32, dropOff: '62.1%' },
]

const weeksAreaData = [
  { label: 'W1', value: 180 }, { label: 'W2', value: 210 }, { label: 'W3', value: 195 },
  { label: 'W4', value: 240 }, { label: 'W5', value: 260 }, { label: 'W6', value: 230 },
  { label: 'W7', value: 275 }, { label: 'W8', value: 290 }, { label: 'W9', value: 310 },
  { label: 'W10', value: 285 }, { label: 'W11', value: 320 }, { label: 'W12', value: 340 },
]

const hotLeads = [
  { name: 'Sarah Mitchell', score: 96, company: 'Stripe', source: 'Organic', lastActivity: '12 min ago' },
  { name: 'James Rodriguez', score: 93, company: 'Datadog', source: 'Referral', lastActivity: '28 min ago' },
  { name: 'Priya Sharma', score: 91, company: 'Figma', source: 'Paid Ads', lastActivity: '1h ago' },
  { name: 'Marcus Chen', score: 89, company: 'Notion', source: 'Organic', lastActivity: '2h ago' },
  { name: 'Elena Volkov', score: 87, company: 'Linear', source: 'Social', lastActivity: '3h ago' },
]

const allLeads = [
  { id: 1, name: 'Sarah Mitchell', company: 'Stripe', email: 'sarah@stripe.com', score: 96, source: 'Organic', status: 'Qualified', assigned: 'Alex Chen', created: '2025-02-18' },
  { id: 2, name: 'James Rodriguez', company: 'Datadog', email: 'james.r@datadog.com', score: 93, source: 'Referral', status: 'Qualified', assigned: 'Maria Lopez', created: '2025-02-17' },
  { id: 3, name: 'Priya Sharma', company: 'Figma', email: 'priya@figma.com', score: 91, source: 'Paid Ads', status: 'Contacted', assigned: 'Alex Chen', created: '2025-02-16' },
  { id: 4, name: 'Marcus Chen', company: 'Notion', email: 'marcus@notion.so', score: 89, source: 'Organic', status: 'New', assigned: 'David Kim', created: '2025-02-15' },
  { id: 5, name: 'Elena Volkov', company: 'Linear', email: 'elena@linear.app', score: 87, source: 'Social', status: 'Qualified', assigned: 'Maria Lopez', created: '2025-02-14' },
  { id: 6, name: 'Thomas Weber', company: 'Vercel', email: 'thomas@vercel.com', score: 72, source: 'Organic', status: 'Nurturing', assigned: 'Alex Chen', created: '2025-02-13' },
  { id: 7, name: 'Aiko Tanaka', company: 'Shopify', email: 'aiko@shopify.com', score: 68, source: 'Paid Ads', status: 'Contacted', assigned: 'David Kim', created: '2025-02-12' },
  { id: 8, name: 'Lucas Fernandez', company: 'Twilio', email: 'lucas@twilio.com', score: 55, source: 'Direct', status: 'New', assigned: 'Maria Lopez', created: '2025-02-11' },
  { id: 9, name: 'Sophie Laurent', company: 'Algolia', email: 'sophie@algolia.com', score: 42, source: 'Social', status: 'Nurturing', assigned: 'Alex Chen', created: '2025-02-10' },
  { id: 10, name: 'Ryan O\'Brien', company: 'PlanetScale', email: 'ryan@planetscale.com', score: 35, source: 'Referral', status: 'Contacted', assigned: 'David Kim', created: '2025-02-09' },
  { id: 11, name: 'Nina Petrov', company: 'Supabase', email: 'nina@supabase.io', score: 22, source: 'Direct', status: 'Lost', assigned: 'Maria Lopez', created: '2025-02-08' },
  { id: 12, name: 'Daniel Park', company: 'Retool', email: 'daniel@retool.com', score: 18, source: 'Paid Ads', status: 'Lost', assigned: 'Alex Chen', created: '2025-02-07' },
]

const scoringRulesBehavioral = [
  { action: 'Visited pricing page', points: 15, icon: Eye },
  { action: 'Downloaded whitepaper', points: 20, icon: FileDown },
  { action: 'Opened 3+ emails', points: 10, icon: Mail },
  { action: 'Attended webinar', points: 25, icon: PlayCircle },
  { action: 'Requested demo', points: 30, icon: MousePointerClick },
  { action: 'Visited 5+ pages in session', points: 12, icon: Globe },
]

const scoringRulesDemographic = [
  { criterion: 'Job title: VP/Director/C-level', points: 25, icon: Award },
  { criterion: 'Company size: 200-1000', points: 15, icon: Building2 },
  { criterion: 'Company size: 1000+', points: 20, icon: Factory },
  { criterion: 'Industry: SaaS/Tech', points: 15, icon: Briefcase },
  { criterion: 'Industry: Finance', points: 10, icon: DollarSign },
]

const scoreDistributionData = [
  { label: '0-20', value: 124, color: '#ef4444' },
  { label: '21-40', value: 318, color: '#f97316' },
  { label: '41-60', value: 542, color: '#eab308' },
  { label: '61-80', value: 986, color: '#3b82f6' },
  { label: '81-100', value: 877, color: '#22c55e' },
]

const recentScoreChanges = [
  { name: 'Sarah Mitchell', company: 'Stripe', oldScore: 82, newScore: 96, reason: 'Requested demo + visited pricing 3x', date: '2h ago' },
  { name: 'Marcus Chen', company: 'Notion', oldScore: 74, newScore: 89, reason: 'Downloaded case study + attended webinar', date: '4h ago' },
  { name: 'Thomas Weber', company: 'Vercel', oldScore: 58, newScore: 72, reason: 'Opened 5 emails in sequence', date: '6h ago' },
  { name: 'Sophie Laurent', company: 'Algolia', oldScore: 51, newScore: 42, reason: 'No engagement in 14 days (decay)', date: '1d ago' },
  { name: 'Ryan O\'Brien', company: 'PlanetScale', oldScore: 48, newScore: 35, reason: 'Unsubscribed from nurture emails', date: '2d ago' },
]

const campaigns = [
  { id: 1, name: 'Spring Product Launch', type: 'Email', leads: 342, cost: 2800, roi: 4.2, status: 'Active', progress: 72 },
  { id: 2, name: 'SaaS Growth Webinar', type: 'Webinar', leads: 218, cost: 1500, roi: 5.8, status: 'Active', progress: 85 },
  { id: 3, name: 'Google Search Ads Q1', type: 'Ads', leads: 486, cost: 8200, roi: 3.1, status: 'Active', progress: 60 },
  { id: 4, name: 'DevOps Guide Ebook', type: 'Content', leads: 164, cost: 900, roi: 7.2, status: 'Completed', progress: 100 },
  { id: 5, name: 'LinkedIn Retargeting', type: 'Ads', leads: 128, cost: 3400, roi: 2.4, status: 'Paused', progress: 45 },
  { id: 6, name: 'Customer Referral Program', type: 'Email', leads: 96, cost: 400, roi: 9.6, status: 'Active', progress: 38 },
]

const campaignPerformanceData = [
  { label: 'Jan', value: 180, color: '#3b82f6' },
  { label: 'Feb', value: 240, color: '#3b82f6' },
  { label: 'Mar', value: 310, color: '#3b82f6' },
  { label: 'Apr', value: 280, color: '#3b82f6' },
  { label: 'May', value: 350, color: '#3b82f6' },
  { label: 'Jun', value: 420, color: '#3b82f6' },
]

const abTestResults = [
  { name: 'Subject Line A', variant: '"Unlock Growth: Your Free Guide"', opens: 24.3, clicks: 3.8, conversions: 1.2, winner: false },
  { name: 'Subject Line B', variant: '"Stop Losing Leads: Read This"', opens: 31.7, clicks: 5.4, conversions: 2.1, winner: true },
]

const filterStatuses = ['All', 'New', 'Contacted', 'Qualified', 'Nurturing', 'Lost']

const sidebarSections = [
  { title: 'Overview', items: [
    { icon: LayoutDashboard, label: 'Dashboard', tab: 'Dashboard' },
  ]},
  { title: 'Management', items: [
    { icon: Users, label: 'Leads', tab: 'All Leads' },
    { icon: Star, label: 'Scoring', tab: 'Scoring' },
    { icon: Megaphone, label: 'Campaigns', tab: 'Campaigns' },
  ]},
  { title: 'Tools', items: [
    { icon: Zap, label: 'Automation', tab: null },
    { icon: BarChart3, label: 'Reports', tab: null },
    { icon: Settings, label: 'Settings', tab: null },
  ]},
]

const mainTabs = [
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'All Leads', label: 'All Leads', count: 2847 },
  { id: 'Scoring', label: 'Scoring' },
  { id: 'Campaigns', label: 'Campaigns', count: 6 },
]

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function scoreColorClass(score) {
  if (score >= 70) return 'text-emerald-600 dark:text-emerald-400'
  if (score >= 30) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

function scoreDotColor(score) {
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 30) return 'bg-amber-500'
  return 'bg-red-500'
}

function scoreBarColor(score) {
  if (score >= 70) return 'bg-emerald-500'
  if (score >= 30) return 'bg-amber-500'
  return 'bg-red-500'
}

function statusBadgeVariant(status) {
  const map = {
    'New': 'info',
    'Contacted': 'warning',
    'Qualified': 'success',
    'Nurturing': 'secondary',
    'Lost': 'error',
  }
  return map[status] || 'default'
}

function campaignTypeIcon(type) {
  const map = { Email: Mail, Webinar: PlayCircle, Ads: Megaphone, Content: PenTool }
  return map[type] || Globe
}

function campaignStatusColor(status) {
  const map = {
    'Active': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    'Completed': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    'Paused': 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  }
  return map[status] || ''
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [leadFilter, setLeadFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLeads = allLeads.filter(lead => {
    const matchesFilter = leadFilter === 'All' || lead.status === leadFilter
    const matchesSearch = searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleSidebarNav = (tab) => {
    if (tab) {
      setActiveTab(tab)
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* ---- Sidebar ---- */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight">LeadFlow</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-5">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{section.title}</p>
              <div className="space-y-0.5">
                {section.items.map(({ icon: Icon, label, tab }) => {
                  const isActive = tab === activeTab
                  return (
                    <button
                      key={label}
                      onClick={() => handleSidebarNav(tab)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      } ${!tab ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="flex-1 text-left">{label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">AC</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Alex Chen</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Sales Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* ---- Main Area ---- */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
              <Plus className="w-4 h-4 mr-1.5" /> Add Lead
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">

          {/* ============================================================ */}
          {/*  DASHBOARD TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="Dashboard" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Lead Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time overview of your lead pipeline and performance</p>
              </div>

              {/* KPI Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map(({ label, value, change, trend, icon: Icon, sparkData }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-600/10 dark:from-blue-500/20 dark:to-cyan-600/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold font-display">{value}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> : <ArrowDownRight className="w-3.5 h-3.5 text-emerald-500" />}
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                            <span className="text-[10px] text-slate-400 ml-0.5">vs last mo</span>
                          </div>
                        </div>
                        <Sparkline data={sparkData} color="#3b82f6" height={28} width={72} fill className="opacity-60" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Row: Sources Donut + Conversion Funnel */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Lead Sources */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Globe className="w-4 h-4 text-blue-500" />
                      Lead Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <DonutChart value={100} max={100} size={140} strokeWidth={20} color="#3b82f6" trackColor="hsl(var(--muted))" label="2,847" sublabel="Total" />
                      <div className="flex-1 space-y-3">
                        {leadSourcesData.map((src) => (
                          <div key={src.label} className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: src.color }} />
                            <span className="text-sm flex-1">{src.label}</span>
                            <span className="text-sm font-semibold w-10 text-right">{src.value}%</span>
                            <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${src.value}%`, backgroundColor: src.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conversion Funnel */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      Conversion Funnel
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {funnelStages.map((s, i) => {
                        const widthPct = Math.max(12, (s.count / funnelStages[0].count) * 100)
                        return (
                          <div key={s.stage} className="flex items-center gap-3">
                            <div className="w-20 text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0 text-right">{s.stage}</div>
                            <div className="flex-1 relative">
                              <div className="h-7 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                                <div
                                  className="h-full rounded bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-end pr-2 transition-all"
                                  style={{ width: `${widthPct}%` }}
                                >
                                  <span className="text-[10px] font-bold text-white">{s.count.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-14 text-right shrink-0">
                              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{s.pct}%</span>
                            </div>
                            <div className="w-14 text-right shrink-0">
                              {s.dropOff ? (
                                <span className="text-[10px] text-red-500 font-medium">-{s.dropOff}</span>
                              ) : (
                                <span className="text-[10px] text-slate-400">--</span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Row: Leads Over Time + Hot Leads */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display flex items-center gap-2 text-base">
                          <Activity className="w-4 h-4 text-blue-500" />
                          Leads Over Time
                        </CardTitle>
                        <span className="text-xs text-slate-400">Last 12 weeks</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AreaChart data={weeksAreaData} height={160} color="#3b82f6" />
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Hot Leads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {hotLeads.map((lead, i) => (
                        <div key={lead.name} className={`flex items-center gap-3 py-2.5 ${i < hotLeads.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${lead.score >= 90 ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                            {lead.score}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{lead.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{lead.company} &middot; {lead.source}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">{lead.lastActivity}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  ALL LEADS TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="All Leads" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">All Leads</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and track every lead in your pipeline</p>
              </div>

              {/* Search + Filter Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="relative flex-1 w-full sm:max-w-sm">
                  <Input
                    placeholder="Search by name, company, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto">
                  {filterStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setLeadFilter(status)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                        leadFilter === status
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filters
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
                  </Button>
                </div>
              </div>

              {/* Leads Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Email</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Score</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Source</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden xl:table-cell">Assigned To</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden xl:table-cell">Created</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${lead.score >= 70 ? 'bg-emerald-500' : lead.score >= 30 ? 'bg-amber-500' : 'bg-red-500'}`}>
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-medium">{lead.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                {lead.company}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{lead.email}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${scoreDotColor(lead.score)}`} />
                                <span className={`text-sm font-bold ${scoreColorClass(lead.score)}`}>{lead.score}</span>
                                <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                                  <div className={`h-full rounded-full ${scoreBarColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 hidden sm:table-cell">{lead.source}</td>
                            <td className="py-3 px-4">
                              <Badge variant={statusBadgeVariant(lead.status)}>{lead.status}</Badge>
                            </td>
                            <td className="py-3 px-4 text-slate-600 dark:text-slate-400 hidden xl:table-cell">{lead.assigned}</td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs hidden xl:table-cell">{lead.created}</td>
                            <td className="py-3 px-2">
                              <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredLeads.length === 0 && (
                          <tr>
                            <td colSpan={9} className="py-12 text-center text-slate-400">
                              <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                              <p className="text-sm">No leads match your current filters</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-xs text-slate-500">{filteredLeads.length} of {allLeads.length} leads</span>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2">Previous</Button>
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2">Next</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  SCORING TAB                                                  */}
          {/* ============================================================ */}
          <TabContent id="Scoring" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Lead Scoring</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Configure scoring rules and monitor lead quality distribution</p>
              </div>

              {/* Scoring Rules */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Behavioral Rules */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <MousePointerClick className="w-4 h-4 text-blue-500" />
                      Behavioral Scoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {scoringRulesBehavioral.map((rule, i) => {
                        const Icon = rule.icon
                        return (
                          <div key={rule.action} className={`flex items-center gap-3 py-3 ${i < scoringRulesBehavioral.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="flex-1 text-sm">{rule.action}</span>
                            <Badge variant="info">+{rule.points} pts</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Demographic Rules */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Users className="w-4 h-4 text-violet-500" />
                      Demographic Scoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-0">
                      {scoringRulesDemographic.map((rule, i) => {
                        const Icon = rule.icon
                        return (
                          <div key={rule.criterion} className={`flex items-center gap-3 py-3 ${i < scoringRulesDemographic.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
                            <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
                              <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            </div>
                            <span className="flex-1 text-sm">{rule.criterion}</span>
                            <Badge variant="secondary">+{rule.points} pts</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Score Distribution */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      Score Distribution
                    </CardTitle>
                    <span className="text-xs text-slate-400">2,847 total leads scored</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-3 justify-center py-4">
                    {scoreDistributionData.map((bucket) => {
                      const maxVal = Math.max(...scoreDistributionData.map(d => d.value))
                      const heightPct = (bucket.value / maxVal) * 140
                      return (
                        <div key={bucket.label} className="flex flex-col items-center gap-2">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{bucket.value}</span>
                          <div
                            className="w-14 sm:w-20 rounded-t-lg transition-all"
                            style={{ height: `${heightPct}px`, backgroundColor: bucket.color, opacity: 0.85 }}
                          />
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{bucket.label}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="text-xs text-slate-500">Cold (0-40)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="text-xs text-slate-500">Warm (41-60)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="text-xs text-slate-500">Hot (61-80)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-slate-500">Qualified (81-100)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Score Changes */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="font-display flex items-center gap-2 text-base">
                    <RefreshCw className="w-4 h-4 text-blue-500" />
                    Recent Score Changes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Lead</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                          <th className="text-center py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Change</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Reason</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">When</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentScoreChanges.map((change) => {
                          const delta = change.newScore - change.oldScore
                          const isPositive = delta > 0
                          return (
                            <tr key={change.name} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-4 font-medium">{change.name}</td>
                              <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">{change.company}</td>
                              <td className="py-3 px-4 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-slate-400 text-xs">{change.oldScore}</span>
                                  <ArrowRight className="w-3 h-3 text-slate-400" />
                                  <span className={`font-bold ${scoreColorClass(change.newScore)}`}>{change.newScore}</span>
                                  <span className={`text-xs font-semibold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {isPositive ? '+' : ''}{delta}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs hidden lg:table-cell max-w-xs truncate">{change.reason}</td>
                              <td className="py-3 px-4 text-right text-xs text-slate-400 hidden sm:table-cell">{change.date}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  CAMPAIGNS TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="Campaigns" active={activeTab}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-display">Campaigns</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Track campaign performance, ROI, and lead generation</p>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/25">
                  <Plus className="w-4 h-4 mr-1.5" /> New Campaign
                </Button>
              </div>

              {/* Campaign Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign) => {
                  const TypeIcon = campaignTypeIcon(campaign.type)
                  return (
                    <Card key={campaign.id} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                              <TypeIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold leading-tight">{campaign.name}</p>
                              <p className="text-[11px] text-slate-400 mt-0.5">{campaign.type}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${campaignStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Leads</p>
                            <p className="text-sm font-bold">{campaign.leads}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Cost</p>
                            <p className="text-sm font-bold">${campaign.cost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">ROI</p>
                            <p className={`text-sm font-bold ${campaign.roi >= 4 ? 'text-emerald-600 dark:text-emerald-400' : campaign.roi >= 2.5 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`}>{campaign.roi}x</p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-slate-400">Progress</span>
                            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{campaign.progress}%</span>
                          </div>
                          <Progress value={campaign.progress} size="sm" />
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Campaign Performance + A/B Test */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Campaign Performance Bar Chart */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-400 mb-3">Leads generated per month</p>
                    <BarChart data={campaignPerformanceData} height={140} barWidth={32} gap={16} />
                  </CardContent>
                </Card>

                {/* A/B Test Results */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <FlaskConical className="w-4 h-4 text-violet-500" />
                      A/B Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-slate-400 mb-4">Spring Product Launch - Email Subject Line</p>
                    <div className="space-y-4">
                      {abTestResults.map((test) => (
                        <div key={test.name} className={`p-4 rounded-lg border ${test.winner ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold">{test.name}</span>
                              {test.winner && <Badge variant="success">Winner</Badge>}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">{test.variant}</p>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Open Rate</p>
                              <p className="text-sm font-bold">{test.opens}%</p>
                              <Progress value={test.opens} max={50} size="sm" color={test.winner ? 'bg-emerald-500' : 'bg-slate-400'} />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Click Rate</p>
                              <p className="text-sm font-bold">{test.clicks}%</p>
                              <Progress value={test.clicks} max={10} size="sm" color={test.winner ? 'bg-emerald-500' : 'bg-slate-400'} />
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Conversion</p>
                              <p className="text-sm font-bold">{test.conversions}%</p>
                              <Progress value={test.conversions} max={5} size="sm" color={test.winner ? 'bg-emerald-500' : 'bg-slate-400'} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Recommendation</p>
                          <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">Subject Line B outperforms A by 30.5% on open rate and 75% on conversion. Deploy to remaining audience for maximum impact.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Summary Stats */}
              <div className="grid sm:grid-cols-4 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Campaigns</p>
                    <p className="text-2xl font-bold font-display">6</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1">4 active</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Leads Gen.</p>
                    <p className="text-2xl font-bold font-display">1,434</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1">+22% vs last quarter</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Total Spend</p>
                    <p className="text-2xl font-bold font-display">$17.2K</p>
                    <p className="text-xs text-amber-500 font-medium mt-1">68% of budget</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Avg. ROI</p>
                    <p className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">5.4x</p>
                    <p className="text-xs text-emerald-500 font-medium mt-1">+0.8x vs benchmark</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-right" />
    </div>
  )
}

export default App
