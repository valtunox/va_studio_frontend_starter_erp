import { useState } from 'react'
import {
  LayoutDashboard, GitBranch, Users, MapPin, DollarSign, BarChart3, Settings,
  Menu, X, Bell, Plus, ArrowUpRight, ArrowDownRight, Target, Trophy,
  Phone, Mail, Calendar, TrendingUp, Briefcase, ChevronRight, Star,
  Clock, CheckCircle2, AlertCircle, Search, Filter, UserCircle
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

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: GitBranch, label: 'Pipeline', id: 'pipeline' },
  { icon: Users, label: 'Team', id: 'team' },
  { icon: MapPin, label: 'Territories', id: 'territories' },
  { icon: DollarSign, label: 'Commissions', id: 'commissions' },
  { icon: BarChart3, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const mainTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'forecasting', label: 'Forecasting' },
]

const kpiCards = [
  { label: 'Monthly Revenue', value: '$384K', change: '+18%', trend: 'up', icon: DollarSign, sparkData: [28, 32, 35, 30, 38, 42] },
  { label: 'Deals Closed', value: '42', change: '+12', trend: 'up', icon: Briefcase, sparkData: [5, 7, 6, 8, 9, 7] },
  { label: 'Avg Deal Size', value: '$9.1K', change: '+$800', trend: 'up', icon: Target, sparkData: [7.2, 7.8, 8.1, 8.5, 8.9, 9.1] },
  { label: 'Pipeline Value', value: '$1.2M', change: '+$180K', trend: 'up', icon: TrendingUp, sparkData: [820, 880, 950, 1020, 1100, 1200] },
]

const revenueTrendData = [
  { label: 'Sep', value: 245 },
  { label: 'Oct', value: 290 },
  { label: 'Nov', value: 268 },
  { label: 'Dec', value: 320 },
  { label: 'Jan', value: 355 },
  { label: 'Feb', value: 384 },
]

const winLossData = { wins: 42, losses: 18, total: 60 }

const topDeals = [
  { dealName: 'Enterprise Platform License', company: 'Meridian Technologies', value: '$185,000', stage: 'Negotiation', probability: 85, closeDate: 'Mar 8, 2026', owner: 'Sarah Chen' },
  { dealName: 'Cloud Infrastructure Migration', company: 'Apex Financial Group', value: '$142,000', stage: 'Proposal', probability: 70, closeDate: 'Mar 15, 2026', owner: 'Marcus Webb' },
  { dealName: 'Data Analytics Suite', company: 'Pinnacle Healthcare', value: '$118,500', stage: 'Closing', probability: 92, closeDate: 'Feb 28, 2026', owner: 'Lisa Park' },
  { dealName: 'Security Compliance Package', company: 'Vantage Logistics', value: '$96,000', stage: 'Discovery', probability: 45, closeDate: 'Apr 10, 2026', owner: 'James Wilson' },
  { dealName: 'CRM Integration Project', company: 'Horizon Media Partners', value: '$78,500', stage: 'Proposal', probability: 65, closeDate: 'Mar 22, 2026', owner: 'Emma Davis' },
  { dealName: 'AI Workflow Automation', company: 'Sterling Manufacturing', value: '$67,000', stage: 'Prospecting', probability: 30, closeDate: 'May 1, 2026', owner: 'David Kim' },
]

const activityMetrics = [
  { label: 'Calls Made', value: 284, change: '+32', trend: 'up', icon: Phone, color: 'text-blue-500' },
  { label: 'Emails Sent', value: 1247, change: '+186', trend: 'up', icon: Mail, color: 'text-purple-500' },
  { label: 'Meetings Booked', value: 56, change: '+8', trend: 'up', icon: Calendar, color: 'text-amber-500' },
]

const pipelineStages = [
  { name: 'Prospecting', value: '$180K', count: 14, color: 'border-blue-500', bgColor: 'bg-blue-500', deals: [
    { company: 'NovaTech Solutions', value: '$45,000', contact: 'Rachel Green', daysInStage: 5 },
    { company: 'Quantum Dynamics', value: '$38,000', contact: 'Tom Bradley', daysInStage: 3 },
    { company: 'Atlas Robotics', value: '$32,000', contact: 'Nina Patel', daysInStage: 8 },
  ]},
  { name: 'Discovery', value: '$320K', count: 11, color: 'border-cyan-500', bgColor: 'bg-cyan-500', deals: [
    { company: 'Vantage Logistics', value: '$96,000', contact: 'Mark Sullivan', daysInStage: 12 },
    { company: 'Prism Analytics', value: '$72,000', contact: 'Sophie Laurent', daysInStage: 7 },
    { company: 'Evergreen Capital', value: '$58,000', contact: 'Wei Zhang', daysInStage: 4 },
  ]},
  { name: 'Proposal', value: '$450K', count: 8, color: 'border-violet-500', bgColor: 'bg-violet-500', deals: [
    { company: 'Apex Financial Group', value: '$142,000', contact: 'Diana Ross', daysInStage: 6 },
    { company: 'Horizon Media Partners', value: '$78,500', contact: 'Carlos Mendez', daysInStage: 10 },
    { company: 'Catalyst Pharma', value: '$65,000', contact: 'Aisha Khan', daysInStage: 3 },
  ]},
  { name: 'Negotiation', value: '$280K', count: 5, color: 'border-orange-500', bgColor: 'bg-orange-500', deals: [
    { company: 'Meridian Technologies', value: '$185,000', contact: 'Robert Chen', daysInStage: 15 },
    { company: 'Nexus Cybersecurity', value: '$54,000', contact: 'Fiona Walsh', daysInStage: 9 },
  ]},
  { name: 'Closing', value: '$120K', count: 3, color: 'border-emerald-500', bgColor: 'bg-emerald-500', deals: [
    { company: 'Pinnacle Healthcare', value: '$118,500', contact: 'James Liu', daysInStage: 4 },
  ]},
]

const pipelineVelocity = [
  { label: 'Avg Days to Close', value: '34', change: '-3 days', trend: 'up' },
  { label: 'Conversion Rate', value: '28%', change: '+2.4%', trend: 'up' },
  { label: 'Deals in Motion', value: '41', change: '+6', trend: 'up' },
  { label: 'Stalled Deals', value: '4', change: '-2', trend: 'up' },
]

const salesReps = [
  { rank: 1, name: 'Sarah Chen', avatar: 'SC', deals: 12, revenue: '$218,400', quota: 142, quotaTarget: '$154,000', commission: '$32,760', region: 'West Coast' },
  { rank: 2, name: 'Marcus Webb', avatar: 'MW', deals: 10, revenue: '$196,200', quota: 128, quotaTarget: '$154,000', commission: '$29,430', region: 'Northeast' },
  { rank: 3, name: 'Lisa Park', avatar: 'LP', deals: 9, revenue: '$172,800', quota: 112, quotaTarget: '$154,000', commission: '$25,920', region: 'Southeast' },
  { rank: 4, name: 'James Wilson', avatar: 'JW', deals: 8, revenue: '$148,500', quota: 96, quotaTarget: '$154,000', commission: '$22,275', region: 'Midwest' },
  { rank: 5, name: 'Emma Davis', avatar: 'ED', deals: 7, revenue: '$134,200', quota: 87, quotaTarget: '$154,000', commission: '$20,130', region: 'West Coast' },
  { rank: 6, name: 'David Kim', avatar: 'DK', deals: 6, revenue: '$118,900', quota: 77, quotaTarget: '$154,000', commission: '$17,835', region: 'Pacific NW' },
  { rank: 7, name: 'Priya Sharma', avatar: 'PS', deals: 5, revenue: '$96,400', quota: 63, quotaTarget: '$154,000', commission: '$14,460', region: 'Northeast' },
  { rank: 8, name: 'Carlos Mendez', avatar: 'CM', deals: 4, revenue: '$82,100', quota: 53, quotaTarget: '$154,000', commission: '$12,315', region: 'Southwest' },
]

const quarterlyForecast = [
  { quarter: 'Q1 2026', committed: '$1.08M', bestCase: '$1.34M', pipeline: '$1.72M', target: '$1.25M', attainment: 86 },
  { quarter: 'Q2 2026', committed: '$420K', bestCase: '$890K', pipeline: '$1.64M', target: '$1.40M', attainment: 30 },
  { quarter: 'Q3 2026', committed: '$0', bestCase: '$240K', pipeline: '$680K', target: '$1.50M', attainment: 0 },
]

const forecastVsActual = [
  { label: 'Oct', value: 290, color: 'hsl(152, 69%, 40%)' },
  { label: 'Nov', value: 268, color: 'hsl(152, 69%, 40%)' },
  { label: 'Dec', value: 320, color: 'hsl(152, 69%, 40%)' },
  { label: 'Jan', value: 355, color: 'hsl(152, 69%, 40%)' },
  { label: 'Feb', value: 384, color: 'hsl(152, 69%, 40%)' },
  { label: 'Mar (F)', value: 410, color: 'hsl(210, 60%, 55%)' },
]

const confidenceBreakdown = [
  { label: 'Committed', value: '$1.08M', percentage: 63, color: 'bg-emerald-500', description: 'Verbal agreement or contract sent' },
  { label: 'Best Case', value: '$1.34M', percentage: 78, color: 'bg-blue-500', description: 'Strong signals, high probability' },
  { label: 'Pipeline', value: '$1.72M', percentage: 100, color: 'bg-slate-400', description: 'All qualified opportunities' },
]

const weightedPipeline = [
  { stage: 'Prospecting', deals: 14, rawValue: '$180K', weight: '20%', weighted: '$36K' },
  { stage: 'Discovery', deals: 11, rawValue: '$320K', weight: '40%', weighted: '$128K' },
  { stage: 'Proposal', deals: 8, rawValue: '$450K', weight: '60%', weighted: '$270K' },
  { stage: 'Negotiation', deals: 5, rawValue: '$280K', weight: '80%', weighted: '$224K' },
  { stage: 'Closing', deals: 3, rawValue: '$120K', weight: '95%', weighted: '$114K' },
]

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function StageBadge({ stage }) {
  const variants = {
    'Prospecting': 'info',
    'Discovery': 'info',
    'Proposal': 'warning',
    'Negotiation': 'warning',
    'Closing': 'success',
    'Closed Won': 'success',
  }
  return <Badge variant={variants[stage] || 'secondary'}>{stage}</Badge>
}

function RankBadge({ rank }) {
  if (rank === 1) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-amber-500/30"><Star className="w-4 h-4" /></div>
  if (rank === 2) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white text-xs font-bold shadow-md">2</div>
  if (rank === 3) return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-md">3</div>
  return <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 text-xs font-bold">{rank}</div>
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPipelineStage, setSelectedPipelineStage] = useState(null)

  const handleSidebarClick = (id) => {
    setActiveSidebar(id)
    if (id === 'dashboard') setActiveTab('dashboard')
    if (id === 'pipeline') setActiveTab('pipeline')
    if (id === 'team') setActiveTab('leaderboard')
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold font-display tracking-tight">SalesForce Pro</span>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 -mt-0.5">Enterprise CRM</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-xs bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Main Menu</p>
          {sidebarLinks.map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => handleSidebarClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSidebar === id
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              <span className="flex-1 text-left">{label}</span>
              {id === 'pipeline' && <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">41</span>}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">JW</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Jordan Wells</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">VP of Sales</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 hidden sm:flex">
              <Plus className="w-4 h-4 mr-2" /> New Deal
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white sm:hidden">
              <Plus className="w-4 h-4" />
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <main className="p-4 sm:p-6 space-y-6">

          {/* ============================================================ */}
          {/*  DASHBOARD TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="dashboard" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Sales Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Performance overview for February 2026</p>
              </div>

              {/* KPI Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map(({ label, value, change, trend, icon: Icon, sparkData }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow group">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/15 to-green-600/15 dark:from-emerald-500/25 dark:to-green-600/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold font-display mb-1">{value}</p>
                          <div className="flex items-center gap-1">
                            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />}
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                            <span className="text-xs text-slate-400">vs last mo</span>
                          </div>
                        </div>
                        <Sparkline data={sparkData} color="hsl(152, 69%, 40%)" height={28} width={72} fill className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Revenue Trend + Win/Loss */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-emerald-500" />
                          Revenue Trend
                        </CardTitle>
                        <Badge variant="success">+18% MoM</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AreaChart data={revenueTrendData} height={160} color="hsl(152, 69%, 40%)" />
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-500" />
                      Win / Loss Ratio
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-4">
                      <DonutChart
                        value={winLossData.wins}
                        max={winLossData.total}
                        size={120}
                        strokeWidth={12}
                        color="hsl(152, 69%, 40%)"
                        trackColor="hsl(0, 72%, 60%)"
                        label={`${Math.round((winLossData.wins / winLossData.total) * 100)}%`}
                        sublabel="Win Rate"
                      />
                      <div className="grid grid-cols-2 gap-4 w-full text-center">
                        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{winLossData.wins}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Won</p>
                        </div>
                        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                          <p className="text-lg font-bold text-red-600 dark:text-red-400">{winLossData.losses}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Lost</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Deals Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-500" />
                      Top Deals
                    </CardTitle>
                    <Button variant="outline" className="text-xs h-8">
                      <Filter className="w-3 h-3 mr-1.5" /> Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Deal</th>
                          <th className="text-left py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Company</th>
                          <th className="text-right py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Value</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Stage</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Probability</th>
                          <th className="text-left py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Close Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topDeals.map((deal) => (
                          <tr key={deal.dealName} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-3">
                              <p className="font-medium">{deal.dealName}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">{deal.company}</p>
                            </td>
                            <td className="py-3 px-3 text-slate-600 dark:text-slate-400 hidden sm:table-cell">{deal.company}</td>
                            <td className="py-3 px-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">{deal.value}</td>
                            <td className="py-3 px-3 text-center hidden md:table-cell"><StageBadge stage={deal.stage} /></td>
                            <td className="py-3 px-3 hidden md:table-cell">
                              <div className="flex items-center gap-2 justify-center">
                                <Progress value={deal.probability} size="sm" className="w-16" />
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-8">{deal.probability}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{deal.closeDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Metrics */}
              <div className="grid sm:grid-cols-3 gap-4">
                {activityMetrics.map(({ label, value, change, icon: Icon, color }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-display">{value.toLocaleString()}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                            <ArrowUpRight className="w-3 h-3" />
                            <span className="text-xs font-semibold">{change}</span>
                          </div>
                          <p className="text-[10px] text-slate-400">this week</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  PIPELINE TAB                                                 */}
          {/* ============================================================ */}
          <TabContent id="pipeline" active={activeTab}>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold font-display">Sales Pipeline</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">$1.35M total weighted pipeline value across 41 active deals</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="text-xs h-8"><Filter className="w-3 h-3 mr-1.5" /> Filter</Button>
                  <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-xs h-8">
                    <Plus className="w-3 h-3 mr-1.5" /> Add Deal
                  </Button>
                </div>
              </div>

              {/* Pipeline Stage Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {pipelineStages.map((stage) => (
                  <button
                    key={stage.name}
                    onClick={() => setSelectedPipelineStage(selectedPipelineStage === stage.name ? null : stage.name)}
                    className={`text-left p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                      selectedPipelineStage === stage.name
                        ? `${stage.color} bg-white dark:bg-slate-900 shadow-md`
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${stage.bgColor} mb-2`} />
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stage.name}</p>
                    <p className="text-xl font-bold font-display mt-0.5">{stage.value}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{stage.count} deals</p>
                  </button>
                ))}
              </div>

              {/* Deals List */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-emerald-500" />
                    {selectedPipelineStage ? `${selectedPipelineStage} Deals` : 'All Pipeline Deals'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(selectedPipelineStage
                      ? pipelineStages.filter(s => s.name === selectedPipelineStage)
                      : pipelineStages
                    ).map((stage) =>
                      stage.deals.map((deal) => (
                        <div
                          key={`${stage.name}-${deal.company}`}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                        >
                          <div className={`w-1.5 h-12 rounded-full ${stage.bgColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-sm truncate">{deal.company}</p>
                              <StageBadge stage={stage.name} />
                            </div>
                            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1"><UserCircle className="w-3 h-3" />{deal.contact}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{deal.daysInStage}d in stage</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">{deal.value}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Pipeline Velocity */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipelineVelocity.map((metric) => (
                  <Card key={metric.label} className="border-slate-200 dark:border-slate-800">
                    <CardContent className="p-5 text-center">
                      <p className="text-2xl font-bold font-display">{metric.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.label}</p>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{metric.change}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  LEADERBOARD TAB                                              */}
          {/* ============================================================ */}
          <TabContent id="leaderboard" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Sales Leaderboard</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Q1 2026 performance rankings across all territories</p>
              </div>

              {/* Top Performer Highlight */}
              <Card className="border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-emerald-500/30">SC</div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <h2 className="text-xl font-bold font-display">Sarah Chen</h2>
                        <Badge variant="success">Top Performer</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">West Coast Territory - 142% of quota</p>
                      <div className="grid grid-cols-3 gap-6 mt-4">
                        <div>
                          <p className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">$218.4K</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Revenue</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-display">12</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Deals Closed</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">$32.7K</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">Commission</p>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <DonutChart
                        value={142}
                        max={200}
                        size={100}
                        strokeWidth={10}
                        color="hsl(152, 69%, 40%)"
                        label="142%"
                        sublabel="of Quota"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rankings Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-500" />
                      Team Rankings
                    </CardTitle>
                    <Badge variant="secondary">Q1 2026</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider w-16">Rank</th>
                          <th className="text-left py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Sales Rep</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Deals</th>
                          <th className="text-right py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Revenue</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell w-48">Quota %</th>
                          <th className="text-right py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Commission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesReps.map((rep) => (
                          <tr key={rep.name} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-3 text-center">
                              <div className="flex justify-center"><RankBadge rank={rep.rank} /></div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">{rep.avatar}</div>
                                <div>
                                  <p className="font-semibold">{rep.name}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">{rep.region}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center font-medium hidden sm:table-cell">{rep.deals}</td>
                            <td className="py-3 px-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">{rep.revenue}</td>
                            <td className="py-3 px-3 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <Progress value={rep.quota} max={150} size="sm" className="flex-1" color={rep.quota >= 100 ? 'bg-emerald-500' : rep.quota >= 75 ? 'bg-blue-500' : 'bg-amber-500'} />
                                <span className={`text-xs font-bold w-10 text-right ${rep.quota >= 100 ? 'text-emerald-600 dark:text-emerald-400' : rep.quota >= 75 ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`}>{rep.quota}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right font-medium text-slate-600 dark:text-slate-400 hidden lg:table-cell">{rep.commission}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  FORECASTING TAB                                              */}
          {/* ============================================================ */}
          <TabContent id="forecasting" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Revenue Forecasting</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Projected revenue and pipeline analysis for fiscal year 2026</p>
              </div>

              {/* Quarterly Forecast Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                {quarterlyForecast.map((q) => (
                  <Card key={q.quarter} className={`border-slate-200 dark:border-slate-800 ${q.quarter === 'Q1 2026' ? 'ring-2 ring-emerald-500/30' : ''}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold font-display">{q.quarter}</h3>
                        {q.quarter === 'Q1 2026' && <Badge variant="success">Current</Badge>}
                        {q.quarter === 'Q2 2026' && <Badge variant="info">Upcoming</Badge>}
                        {q.quarter === 'Q3 2026' && <Badge variant="secondary">Future</Badge>}
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Target</span>
                          <span className="font-semibold">{q.target}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Committed</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{q.committed}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Best Case</span>
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{q.bestCase}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500 dark:text-slate-400">Pipeline</span>
                          <span className="font-semibold">{q.pipeline}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-slate-500 dark:text-slate-400">Attainment</span>
                            <span className="font-bold">{q.attainment}%</span>
                          </div>
                          <Progress value={q.attainment} size="md" color={q.attainment >= 80 ? 'bg-emerald-500' : q.attainment >= 50 ? 'bg-blue-500' : 'bg-slate-400'} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Forecast vs Actual + Confidence */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-display flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-emerald-500" />
                        Forecast vs Actual
                      </CardTitle>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" />Actual</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-500" />Forecast</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={forecastVsActual} height={180} barWidth={32} gap={16} />
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-emerald-500" />
                      Confidence Indicators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {confidenceBreakdown.map((tier) => (
                        <div key={tier.label}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="text-sm font-semibold">{tier.label}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{tier.description}</p>
                            </div>
                            <span className="text-lg font-bold font-display">{tier.value}</span>
                          </div>
                          <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${tier.color} transition-all duration-700`} style={{ width: `${tier.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Q1 Target</span>
                        <span className="text-lg font-bold font-display">$1.25M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weighted Pipeline Value */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-emerald-500" />
                      Weighted Pipeline Value
                    </CardTitle>
                    <div className="text-right">
                      <p className="text-2xl font-bold font-display text-emerald-600 dark:text-emerald-400">$772K</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Total weighted value</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Stage</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Deals</th>
                          <th className="text-right py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Raw Value</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Weight</th>
                          <th className="text-right py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Weighted</th>
                          <th className="text-center py-3 px-3 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell w-40">Contribution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weightedPipeline.map((row) => {
                          const weightNum = parseInt(row.weight)
                          return (
                            <tr key={row.stage} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-3 font-medium">{row.stage}</td>
                              <td className="py-3 px-3 text-center">{row.deals}</td>
                              <td className="py-3 px-3 text-right text-slate-600 dark:text-slate-400">{row.rawValue}</td>
                              <td className="py-3 px-3 text-center hidden sm:table-cell">
                                <Badge variant={weightNum >= 80 ? 'success' : weightNum >= 50 ? 'warning' : 'info'}>{row.weight}</Badge>
                              </td>
                              <td className="py-3 px-3 text-right font-semibold text-emerald-600 dark:text-emerald-400">{row.weighted}</td>
                              <td className="py-3 px-3 hidden md:table-cell">
                                <Progress value={weightNum} size="sm" color={weightNum >= 80 ? 'bg-emerald-500' : weightNum >= 50 ? 'bg-amber-500' : 'bg-blue-500'} />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2 border-slate-200 dark:border-slate-700">
                          <td className="py-3 px-3 font-bold">Total</td>
                          <td className="py-3 px-3 text-center font-bold">41</td>
                          <td className="py-3 px-3 text-right font-bold">$1.35M</td>
                          <td className="py-3 px-3 hidden sm:table-cell" />
                          <td className="py-3 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">$772K</td>
                          <td className="py-3 px-3 hidden md:table-cell" />
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>
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
