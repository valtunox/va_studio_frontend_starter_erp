import { useState } from 'react'
import {
  LayoutDashboard, Megaphone, Mail, Share2, Search, FileText, BarChart3, Settings,
  Menu, X, Bell, Plus, ChevronRight, ArrowUpRight, ArrowDownRight, Target,
  TrendingUp, Users, DollarSign, Eye, Globe, Zap, Calendar, MousePointerClick,
  ThumbsUp, MessageCircle, Repeat2, Star, Clock, CheckCircle2, Pause, Play
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
  { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
  { icon: Megaphone, label: 'Campaigns', id: 'campaigns' },
  { icon: FileText, label: 'Content', id: 'content' },
  { icon: Share2, label: 'Social', id: 'social' },
  { icon: Mail, label: 'Email', id: 'email' },
  { icon: Search, label: 'SEO', id: 'seo' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const mainTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'content', label: 'Content' },
  { id: 'social', label: 'Social' },
  { id: 'email', label: 'Email' },
]

const kpiCards = [
  { label: 'Website Traffic', value: '184K', change: '+22%', trend: 'up', icon: Globe, sub: 'vs last month' },
  { label: 'MQLs Generated', value: '1,240', change: '+15%', trend: 'up', icon: Target, sub: 'marketing qualified leads' },
  { label: 'Customer Acq. Cost', value: '$142', change: '-8%', trend: 'down', icon: DollarSign, sub: 'lower is better', positive: true },
  { label: 'Marketing ROI', value: '3.2x', change: '+0.4x', trend: 'up', icon: TrendingUp, sub: 'return on spend' },
]

const trafficSourceData = [
  { label: 'W1', value: 18200 },
  { label: 'W2', value: 21400 },
  { label: 'W3', value: 19800 },
  { label: 'W4', value: 24600 },
  { label: 'W5', value: 22100 },
  { label: 'W6', value: 26800 },
  { label: 'W7', value: 28400 },
  { label: 'W8', value: 31200 },
]

const channelPerformance = [
  { label: 'Organic', value: 42, color: '#10b981' },
  { label: 'Paid', value: 28, color: '#8b5cf6' },
  { label: 'Social', value: 18, color: '#f59e0b' },
  { label: 'Email', value: 22, color: '#ec4899' },
  { label: 'Referral', value: 14, color: '#06b6d4' },
]

const topContent = [
  { title: 'The Complete Guide to B2B Lead Generation in 2026', type: 'Blog', views: '24,500', conversions: 342, engagement: '8.2%' },
  { title: 'Marketing Automation ROI Calculator', type: 'Tool', views: '18,700', conversions: 285, engagement: '12.4%' },
  { title: 'State of Digital Marketing Report', type: 'Whitepaper', views: '15,200', conversions: 198, engagement: '9.1%' },
  { title: 'Customer Success Story: TechCorp', type: 'Case Study', views: '12,800', conversions: 156, engagement: '7.8%' },
  { title: '5 Email Subject Lines That Convert', type: 'Blog', views: '11,400', conversions: 134, engagement: '6.5%' },
]

const campaignROISummary = [
  { channel: 'Email Marketing', spend: '$12,400', revenue: '$48,200', roi: '2.9x' },
  { channel: 'Paid Search', spend: '$28,600', revenue: '$86,400', roi: '2.0x' },
  { channel: 'Social Ads', spend: '$8,200', revenue: '$32,800', roi: '3.0x' },
  { channel: 'Content Marketing', spend: '$6,800', revenue: '$41,600', roi: '5.1x' },
]

const campaigns = [
  { name: 'Spring Product Launch 2026', type: 'Email', status: 'Active', budgetTotal: 15000, budgetSpent: 11200, leads: 342, roi: '2.8x', progress: 75 },
  { name: 'Q1 Webinar Series', type: 'Webinar', status: 'Active', budgetTotal: 8000, budgetSpent: 5600, leads: 189, roi: '3.4x', progress: 62 },
  { name: 'Google Ads - Brand Keywords', type: 'Ads', status: 'Active', budgetTotal: 25000, budgetSpent: 18400, leads: 520, roi: '2.1x', progress: 74 },
  { name: 'LinkedIn Thought Leadership', type: 'Social', status: 'Scheduled', budgetTotal: 12000, budgetSpent: 0, leads: 0, roi: '-', progress: 0 },
  { name: 'SEO Content Cluster: AI Tools', type: 'Content', status: 'Active', budgetTotal: 6500, budgetSpent: 4200, leads: 156, roi: '4.2x', progress: 65 },
  { name: 'Customer Referral Program', type: 'Email', status: 'Completed', budgetTotal: 10000, budgetSpent: 10000, leads: 412, roi: '5.1x', progress: 100 },
]

const campaignTimeline = [
  { label: 'Jan', value: 24 },
  { label: 'Feb', value: 31 },
  { label: 'Mar', value: 28 },
  { label: 'Apr', value: 36 },
  { label: 'May', value: 42 },
  { label: 'Jun', value: 38 },
]

const budgetAllocation = [
  { label: 'Email', value: 25, color: '#ec4899' },
  { label: 'Paid Ads', value: 35, color: '#8b5cf6' },
  { label: 'Social', value: 15, color: '#f59e0b' },
  { label: 'Content', value: 18, color: '#10b981' },
  { label: 'Events', value: 7, color: '#06b6d4' },
]

const calendarWeeks = [
  [
    { day: 'Mon', dots: ['blog'] },
    { day: 'Tue', dots: [] },
    { day: 'Wed', dots: ['social', 'email'] },
    { day: 'Thu', dots: ['video'] },
    { day: 'Fri', dots: ['blog'] },
    { day: 'Sat', dots: [] },
    { day: 'Sun', dots: ['social'] },
  ],
  [
    { day: 'Mon', dots: ['email'] },
    { day: 'Tue', dots: ['blog', 'social'] },
    { day: 'Wed', dots: [] },
    { day: 'Thu', dots: ['infographic'] },
    { day: 'Fri', dots: ['social'] },
    { day: 'Sat', dots: [] },
    { day: 'Sun', dots: [] },
  ],
  [
    { day: 'Mon', dots: ['blog'] },
    { day: 'Tue', dots: ['video'] },
    { day: 'Wed', dots: ['social', 'email'] },
    { day: 'Thu', dots: [] },
    { day: 'Fri', dots: ['blog', 'social'] },
    { day: 'Sat', dots: ['video'] },
    { day: 'Sun', dots: [] },
  ],
  [
    { day: 'Mon', dots: ['email', 'blog'] },
    { day: 'Tue', dots: [] },
    { day: 'Wed', dots: ['social'] },
    { day: 'Thu', dots: ['infographic', 'blog'] },
    { day: 'Fri', dots: [] },
    { day: 'Sat', dots: ['social'] },
    { day: 'Sun', dots: ['video'] },
  ],
]

const dotColors = {
  blog: 'bg-fuchsia-500',
  social: 'bg-amber-500',
  email: 'bg-sky-500',
  video: 'bg-emerald-500',
  infographic: 'bg-violet-500',
}

const contentItems = [
  { title: 'The Complete Guide to B2B Lead Gen', type: 'Blog', views: '24,500', shares: '1,240', leads: 342, rating: 'A+' },
  { title: 'Product Demo: Enterprise Suite', type: 'Video', views: '18,700', shares: '890', leads: 285, rating: 'A' },
  { title: 'State of Digital Marketing 2026', type: 'Whitepaper', views: '15,200', shares: '2,100', leads: 198, rating: 'A' },
  { title: 'Marketing Automation Infographic', type: 'Infographic', views: '12,800', shares: '3,400', leads: 89, rating: 'B+' },
  { title: 'Customer Success: TechCorp Scale', type: 'Blog', views: '11,400', shares: '620', leads: 156, rating: 'A-' },
  { title: 'How to Build a Content Calendar', type: 'Blog', views: '9,800', shares: '540', leads: 112, rating: 'B+' },
  { title: 'Email Marketing Best Practices', type: 'Video', views: '8,600', shares: '380', leads: 98, rating: 'B' },
  { title: 'SEO Audit Checklist Template', type: 'Whitepaper', views: '7,200', shares: '1,800', leads: 245, rating: 'A' },
]

const contentTypeDistribution = [
  { label: 'Blog', value: 38, color: '#d946ef' },
  { label: 'Video', value: 24, color: '#10b981' },
  { label: 'Whitepaper', value: 18, color: '#8b5cf6' },
  { label: 'Infographic', value: 12, color: '#f59e0b' },
  { label: 'Other', value: 8, color: '#64748b' },
]

const socialPlatforms = [
  { name: 'Twitter / X', icon: MessageCircle, followers: '48.2K', engagement: '3.8%', postsThisWeek: 12, color: 'from-sky-500 to-blue-600' },
  { name: 'LinkedIn', icon: Users, followers: '32.6K', engagement: '5.2%', postsThisWeek: 8, color: 'from-blue-600 to-indigo-700' },
  { name: 'Facebook', icon: ThumbsUp, followers: '28.4K', engagement: '2.4%', postsThisWeek: 6, color: 'from-blue-500 to-blue-700' },
  { name: 'Instagram', icon: Eye, followers: '22.1K', engagement: '6.1%', postsThisWeek: 10, color: 'from-pink-500 to-purple-600' },
]

const socialEngagementTrend = [
  { label: 'Mon', value: 2400 },
  { label: 'Tue', value: 3100 },
  { label: 'Wed', value: 2800 },
  { label: 'Thu', value: 4200 },
  { label: 'Fri', value: 3800 },
  { label: 'Sat', value: 2100 },
  { label: 'Sun', value: 1800 },
]

const topSocialPosts = [
  { platform: 'LinkedIn', text: 'Excited to announce our new AI-powered marketing suite...', likes: 842, comments: 124, shares: 89 },
  { platform: 'Twitter', text: 'Thread: 10 marketing trends that will define 2026...', likes: 1240, comments: 86, shares: 342 },
  { platform: 'Instagram', text: 'Behind the scenes at our annual marketing summit...', likes: 2100, comments: 198, shares: 56 },
  { platform: 'Facebook', text: 'New case study: How TechCorp increased leads by 340%...', likes: 456, comments: 67, shares: 123 },
]

const emailCampaigns = [
  { name: 'Spring Sale Announcement', sent: '24,500', delivered: '98.2%', openRate: '42.1%', clickRate: '3.8%', conversions: 245, unsubscribes: 12 },
  { name: 'Product Update v3.0', sent: '18,200', delivered: '97.8%', openRate: '38.4%', clickRate: '4.2%', conversions: 182, unsubscribes: 8 },
  { name: 'Weekly Newsletter #47', sent: '15,800', delivered: '99.1%', openRate: '45.2%', clickRate: '5.1%', conversions: 128, unsubscribes: 4 },
  { name: 'Webinar Invitation: AI in Mktg', sent: '12,400', delivered: '97.5%', openRate: '52.8%', clickRate: '8.4%', conversions: 310, unsubscribes: 6 },
  { name: 'Customer Re-engagement', sent: '20,100', delivered: '96.4%', openRate: '28.6%', clickRate: '2.1%', conversions: 89, unsubscribes: 24 },
  { name: 'Holiday Season Preview', sent: '22,800', delivered: '98.6%', openRate: '44.8%', clickRate: '6.2%', conversions: 198, unsubscribes: 10 },
]

const openRateTrend = [42, 38, 45, 52, 28, 44, 41, 46, 39, 48]

const abTestResults = [
  { test: 'Subject Line: Emoji vs No Emoji', variantA: 'No Emoji (38.2%)', variantB: 'Emoji (44.8%)', winner: 'B', lift: '+17.3%' },
  { test: 'CTA Button: Green vs Orange', variantA: 'Green (4.2%)', variantB: 'Orange (5.8%)', winner: 'B', lift: '+38.1%' },
  { test: 'Send Time: 9AM vs 2PM', variantA: '9AM (41.2%)', variantB: '2PM (36.8%)', winner: 'A', lift: '+11.9%' },
]

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function TypeBadge({ type }) {
  const colors = {
    Email: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    Webinar: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    Ads: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    Social: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400',
    Content: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[type] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
      {type}
    </span>
  )
}

function StatusBadge({ status }) {
  const config = {
    Active: { variant: 'success', icon: Play },
    Scheduled: { variant: 'info', icon: Clock },
    Completed: { variant: 'secondary', icon: CheckCircle2 },
    Paused: { variant: 'warning', icon: Pause },
  }
  const c = config[status] || { variant: 'secondary', icon: CheckCircle2 }
  const Icon = c.icon
  return (
    <Badge variant={c.variant} className="gap-1">
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  )
}

function ContentTypeBadge({ type }) {
  const colors = {
    Blog: 'bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400',
    Video: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    Infographic: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    Whitepaper: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    Tool: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400',
    'Case Study': 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400',
  }
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[type] || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
      {type}
    </span>
  )
}

function RatingBadge({ rating }) {
  const colors = {
    'A+': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    'A': 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    'A-': 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20',
    'B+': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
    'B': 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  }
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${colors[rating] || 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
      {rating}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSidebarClick = (id) => {
    const tabIds = mainTabs.map(t => t.id)
    if (tabIds.includes(id)) {
      setActiveTab(id)
    }
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* ---- Sidebar ---- */}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
              <Megaphone className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">MarketPulse</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Main</p>
          {sidebarLinks.slice(0, 5).map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => handleSidebarClick(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-fuchsia-50 dark:bg-fuchsia-900/20 text-fuchsia-700 dark:text-fuchsia-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {activeTab === id && <ChevronRight className="w-4 h-4 text-fuchsia-400" />}
            </button>
          ))}

          <p className="px-3 pt-4 pb-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tools</p>
          {sidebarLinks.slice(5).map(({ icon: Icon, label, id }) => (
            <button
              key={id}
              onClick={() => handleSidebarClick(id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span className="flex-1 text-left">{label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
              JW
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Jane Wilson</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Marketing Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Main Area ---- */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-4 sm:px-6 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>

          <Tabs
            tabs={mainTabs}
            active={activeTab}
            onChange={setActiveTab}
            className="overflow-x-auto shrink-0"
          />

          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <Input placeholder="Search campaigns..." className="h-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm" />
          </div>
          <div className="flex items-center gap-2 ml-auto shrink-0">
            <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white border-0 shadow-lg shadow-fuchsia-500/25">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-fuchsia-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">

          {/* ============================================================ */}
          {/* OVERVIEW TAB                                                  */}
          {/* ============================================================ */}
          <TabContent id="overview" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Marketing Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Performance snapshot across all channels</p>
              </div>

              {/* KPI Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiCards.map(({ label, value, change, trend, icon: Icon, sub, positive }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 dark:from-fuchsia-500/30 dark:to-pink-600/30 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold font-display mb-1">{value}</p>
                      <div className="flex items-center gap-1">
                        {(trend === 'up' && !positive) || (trend === 'down' && positive) ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        ) : null}
                        {(trend === 'down' && !positive) ? (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        ) : null}
                        {(trend === 'down' && positive) ? (
                          <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                        ) : null}
                        <span className={`text-sm font-medium ${
                          (trend === 'up' || positive) ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                        }`}>{change}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">{sub}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Traffic Sources Area Chart */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Traffic Sources (8 Weeks)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={trafficSourceData} height={140} color="#d946ef" />
                  </CardContent>
                </Card>

                {/* Channel Performance Bar Chart */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <BarChart3 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Channel Performance (K leads)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart data={channelPerformance} height={140} barWidth={36} gap={16} />
                  </CardContent>
                </Card>
              </div>

              {/* Top Performing Content Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Star className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                    Top Performing Content
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Title</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Type</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Views</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Conversions</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Engagement</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topContent.map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-medium max-w-[280px] truncate">{row.title}</td>
                            <td className="py-3 px-2"><ContentTypeBadge type={row.type} /></td>
                            <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.views}</td>
                            <td className="py-3 px-2 text-right font-medium">{row.conversions}</td>
                            <td className="py-3 px-2 text-right font-medium text-fuchsia-600 dark:text-fuchsia-400">{row.engagement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Campaign ROI Summary */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                    Campaign ROI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {campaignROISummary.map((item) => (
                      <div key={item.channel} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-semibold mb-2">{item.channel}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Spend</span>
                            <span className="font-medium">{item.spend}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Revenue</span>
                            <span className="font-medium">{item.revenue}</span>
                          </div>
                          <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                            <span className="text-slate-500 dark:text-slate-400">ROI</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.roi}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/* CAMPAIGNS TAB                                                 */}
          {/* ============================================================ */}
          <TabContent id="campaigns" active={activeTab}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display">Campaigns</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and monitor all marketing campaigns</p>
                </div>
                <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </div>

              {/* Campaign Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((c) => (
                  <Card key={c.name} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-fuchsia-500 to-pink-600" />
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="font-semibold text-sm leading-snug">{c.name}</h3>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <TypeBadge type={c.type} />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-500 dark:text-slate-400">Budget Spent</span>
                            <span className="font-medium">${c.budgetSpent.toLocaleString()} / ${c.budgetTotal.toLocaleString()}</span>
                          </div>
                          <Progress value={c.budgetSpent} max={c.budgetTotal} size="sm" color="bg-gradient-to-r from-fuchsia-500 to-pink-600" />
                        </div>
                        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Leads</p>
                            <p className="text-lg font-bold font-display">{c.leads}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ROI</p>
                            <p className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">{c.roi}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Campaign Timeline + Budget Allocation */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Campaign Performance Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={campaignTimeline} height={140} color="#d946ef" />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">Leads generated per month across all campaigns</p>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <DollarSign className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Budget Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <DonutChart value={71} max={100} size={120} strokeWidth={14} color="#d946ef" label="71%" sublabel="utilized" />
                      <div className="flex-1 space-y-2">
                        {budgetAllocation.map((item) => (
                          <div key={item.label} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-sm flex-1">{item.label}</span>
                            <span className="text-sm font-semibold">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/* CONTENT TAB                                                   */}
          {/* ============================================================ */}
          <TabContent id="content" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Content</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Content calendar, performance, and distribution</p>
              </div>

              {/* Content Calendar */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Calendar className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Content Calendar
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      {Object.entries(dotColors).map(([type, color]) => (
                        <div key={type} className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${color}`} />
                          <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {/* Day headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-slate-400 dark:text-slate-500 py-1">{day}</div>
                      ))}
                    </div>
                    {/* Weeks */}
                    {calendarWeeks.map((week, wi) => (
                      <div key={wi} className="grid grid-cols-7 gap-1">
                        {week.map((cell, ci) => (
                          <div
                            key={ci}
                            className="h-14 rounded-lg bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center justify-center gap-1 hover:bg-slate-200/60 dark:hover:bg-slate-700/40 transition-colors"
                          >
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">W{wi + 1}</span>
                            <div className="flex gap-1">
                              {cell.dots.map((dotType, di) => (
                                <div key={di} className={`w-2 h-2 rounded-full ${dotColors[dotType] || 'bg-slate-400'}`} />
                              ))}
                              {cell.dots.length === 0 && <div className="w-2 h-2" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Content Performance + Distribution */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Content Performance Table */}
                <Card className="border-slate-200 dark:border-slate-800 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <FileText className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Content Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Title</th>
                            <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Type</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Views</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Shares</th>
                            <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Leads</th>
                            <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contentItems.map((row, i) => (
                            <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-2 font-medium max-w-[220px] truncate">{row.title}</td>
                              <td className="py-3 px-2"><ContentTypeBadge type={row.type} /></td>
                              <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.views}</td>
                              <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.shares}</td>
                              <td className="py-3 px-2 text-right font-medium">{row.leads}</td>
                              <td className="py-3 px-2 text-center"><RatingBadge rating={row.rating} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Type Distribution */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Content Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-4">
                      <DonutChart value={78} max={100} size={140} strokeWidth={18} color="#d946ef" label="78%" sublabel="on schedule" />
                      <div className="w-full space-y-2">
                        {contentTypeDistribution.map((item) => (
                          <div key={item.label} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            <span className="text-sm flex-1">{item.label}</span>
                            <span className="text-sm font-semibold">{item.value}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/* SOCIAL TAB                                                    */}
          {/* ============================================================ */}
          <TabContent id="social" active={activeTab}>
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold font-display">Social Media</h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Cross-platform social media analytics</p>
              </div>

              {/* Platform Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {socialPlatforms.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <Card key={platform.name} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow overflow-hidden">
                      <div className={`h-1 bg-gradient-to-r ${platform.color}`} />
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{platform.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{platform.postsThisWeek} posts this week</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Followers</p>
                            <p className="text-xl font-bold font-display">{platform.followers}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Engagement</p>
                            <p className="text-xl font-bold font-display text-fuchsia-600 dark:text-fuchsia-400">{platform.engagement}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Engagement Trend + Top Posts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Engagement Trend (This Week)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={socialEngagementTrend} height={160} color="#d946ef" />
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <div>
                        <span className="text-slate-500 dark:text-slate-400">Total Engagements: </span>
                        <span className="font-bold">20,200</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="font-medium">+14.2% vs last week</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Star className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Top Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topSocialPosts.map((post, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{post.platform}</Badge>
                          </div>
                          <p className="text-sm line-clamp-2 mb-2">{post.text}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {post.comments}
                            </span>
                            <span className="flex items-center gap-1">
                              <Repeat2 className="w-3 h-3" />
                              {post.shares}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/* EMAIL TAB                                                     */}
          {/* ============================================================ */}
          <TabContent id="email" active={activeTab}>
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold font-display">Email Marketing</h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Campaign performance, open rates, and A/B testing</p>
                </div>
                <Button className="bg-gradient-to-r from-fuchsia-500 to-pink-600 hover:from-fuchsia-600 hover:to-pink-700 text-white border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  New Email Campaign
                </Button>
              </div>

              {/* Email Summary Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Avg Open Rate</span>
                      <Mail className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <p className="text-2xl font-bold font-display mb-2">41.8%</p>
                    <Sparkline data={openRateTrend} color="#d946ef" height={28} fill />
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Avg Click Rate</span>
                      <MousePointerClick className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <p className="text-2xl font-bold font-display mb-2">4.9%</p>
                    <Sparkline data={[3.8, 4.2, 5.1, 8.4, 2.1, 6.2, 4.8, 5.5, 3.9, 4.6]} color="#10b981" height={28} fill />
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Total Conversions</span>
                      <Zap className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <p className="text-2xl font-bold font-display mb-2">1,152</p>
                    <Sparkline data={[245, 182, 128, 310, 89, 198, 220, 180, 260, 290]} color="#8b5cf6" height={28} fill />
                  </CardContent>
                </Card>
              </div>

              {/* Email Campaign Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Mail className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                    Email Campaign Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Campaign</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Sent</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Delivered</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Open Rate</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Click Rate</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Conversions</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Unsubs</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailCampaigns.map((row, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-medium">{row.name}</td>
                            <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.sent}</td>
                            <td className="py-3 px-2 text-right text-slate-600 dark:text-slate-400">{row.delivered}</td>
                            <td className="py-3 px-2 text-right">
                              <span className={`font-medium ${parseFloat(row.openRate) >= 40 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                {row.openRate}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right">
                              <span className={`font-medium ${parseFloat(row.clickRate) >= 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}>
                                {row.clickRate}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right font-medium text-fuchsia-600 dark:text-fuchsia-400">{row.conversions}</td>
                            <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-500">{row.unsubscribes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Open Rate Trend + A/B Tests */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Open Rate Trend */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      Open Rate Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <Sparkline data={openRateTrend} color="#d946ef" height={64} width={300} fill />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Highest</p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">52%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Average</p>
                        <p className="text-lg font-bold">41.8%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Lowest</p>
                        <p className="text-lg font-bold text-amber-600 dark:text-amber-400">28%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* A/B Test Results */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2 text-base">
                      <Zap className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      A/B Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {abTestResults.map((test, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                          <p className="font-semibold text-sm mb-3">{test.test}</p>
                          <div className="grid grid-cols-2 gap-3 mb-3">
                            <div className={`p-2 rounded-lg text-center text-xs ${
                              test.winner === 'A'
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 dark:bg-slate-700/50'
                            }`}>
                              <p className="text-slate-500 dark:text-slate-400 mb-0.5">Variant A</p>
                              <p className="font-semibold text-sm">{test.variantA}</p>
                              {test.winner === 'A' && <Badge variant="success" className="mt-1 text-[10px]">Winner</Badge>}
                            </div>
                            <div className={`p-2 rounded-lg text-center text-xs ${
                              test.winner === 'B'
                                ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 dark:bg-slate-700/50'
                            }`}>
                              <p className="text-slate-500 dark:text-slate-400 mb-0.5">Variant B</p>
                              <p className="font-semibold text-sm">{test.variantB}</p>
                              {test.winner === 'B' && <Badge variant="success" className="mt-1 text-[10px]">Winner</Badge>}
                            </div>
                          </div>
                          <div className="flex items-center justify-center gap-1 text-sm">
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium text-emerald-600 dark:text-emerald-400">{test.lift} lift</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-right" />
    </div>
  )
}

export default App
