import { useState, useEffect, useCallback } from 'react'
import {
  LayoutDashboard, BarChart3, TrendingUp, TrendingDown, Users, DollarSign,
  ShoppingCart, Eye, Clock, ArrowUpRight, ArrowDownRight, Menu, X, Bell,
  Search, Settings, ChevronDown, MoreHorizontal, Filter, Download,
  RefreshCw, Calendar, Globe, Activity, Target, Zap, PieChart,
  ArrowRight, CheckCircle2, AlertCircle, Info, ChevronRight,
  Layers, Monitor, Smartphone, Tablet, MapPin, FileText, LogOut,
  User, CreditCard, Hash, Radio, MousePointerClick, ExternalLink,
  FileSpreadsheet, FileDown, Printer
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, AreaChart, BarChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { CommandPalette } from '@/components/shared/CommandPalette'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const tabItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'realtime', label: 'Real-time', icon: Activity },
]

const sidebarSections = [
  {
    title: 'Main',
    links: [
      { icon: LayoutDashboard, label: 'Dashboard', tab: 'overview' },
      { icon: BarChart3, label: 'Analytics', tab: 'analytics' },
      { icon: Activity, label: 'Real-time', tab: 'realtime', badge: 'Live' },
      { icon: FileText, label: 'Reports', tab: 'reports' },
    ],
  },
  {
    title: 'Insights',
    links: [
      { icon: TrendingUp, label: 'Trends', tab: 'analytics' },
      { icon: Target, label: 'Conversions', tab: 'analytics' },
      { icon: Globe, label: 'Geo Analysis', tab: 'analytics' },
      { icon: Users, label: 'Audience', tab: 'overview' },
    ],
  },
  {
    title: 'Management',
    links: [
      { icon: CreditCard, label: 'Billing', tab: 'reports' },
      { icon: Layers, label: 'Integrations', tab: 'overview' },
      { icon: Settings, label: 'Settings', tab: 'overview' },
    ],
  },
]

const kpis = [
  { label: 'Total Revenue', value: '$48,352', change: '+12.5%', trend: 'up', icon: DollarSign, sparkData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90] },
  { label: 'Active Users', value: '24,589', change: '+8.2%', trend: 'up', icon: Users, sparkData: [20, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60] },
  { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', trend: 'up', icon: Target, sparkData: [2.1, 2.3, 2.5, 2.4, 2.8, 3.0, 2.9, 3.1, 3.2, 3.0, 3.3, 3.24] },
  { label: 'Bounce Rate', value: '42.3%', change: '-3.1%', trend: 'down', icon: TrendingDown, sparkData: [50, 48, 47, 45, 46, 44, 43, 45, 44, 43, 42, 42.3] },
]

const revenueByChannel = [
  { channel: 'Organic Search', revenue: '$18,240', percent: 37.7, change: '+15.2%', color: 'bg-blue-500' },
  { channel: 'Direct', revenue: '$12,450', percent: 25.7, change: '+8.4%', color: 'bg-emerald-500' },
  { channel: 'Social Media', revenue: '$8,920', percent: 18.4, change: '+22.1%', color: 'bg-violet-500' },
  { channel: 'Email', revenue: '$5,340', percent: 11.0, change: '+5.6%', color: 'bg-amber-500' },
  { channel: 'Referral', revenue: '$3,402', percent: 7.0, change: '-2.3%', color: 'bg-pink-500' },
]

const revenueMonthly = [
  { label: 'Jan', value: 28500 },
  { label: 'Feb', value: 31200 },
  { label: 'Mar', value: 29800 },
  { label: 'Apr', value: 35400 },
  { label: 'May', value: 33100 },
  { label: 'Jun', value: 38700 },
  { label: 'Jul', value: 36200 },
  { label: 'Aug', value: 41500 },
  { label: 'Sep', value: 39800 },
  { label: 'Oct', value: 44200 },
  { label: 'Nov', value: 42100 },
  { label: 'Dec', value: 48352 },
]

const deviceBreakdown = [
  { device: 'Desktop', icon: Monitor, sessions: '14,234', percent: 58, color: '#6366f1' },
  { device: 'Mobile', icon: Smartphone, sessions: '8,123', percent: 33, color: '#10b981' },
  { device: 'Tablet', icon: Tablet, sessions: '2,232', percent: 9, color: '#f59e0b' },
]

const donutDeviceData = [
  { label: 'Desktop', value: 58, color: '#6366f1' },
  { label: 'Mobile', value: 33, color: '#10b981' },
  { label: 'Tablet', value: 9, color: '#f59e0b' },
]

const topCountries = [
  { country: 'United States', flag: 'US', sessions: '8,432', percent: 34.3 },
  { country: 'United Kingdom', flag: 'GB', sessions: '3,891', percent: 15.8 },
  { country: 'Germany', flag: 'DE', sessions: '2,654', percent: 10.8 },
  { country: 'Canada', flag: 'CA', sessions: '2,123', percent: 8.6 },
  { country: 'France', flag: 'FR', sessions: '1,876', percent: 7.6 },
]

const trafficSources = [
  { label: 'Google', value: 12453 },
  { label: 'Direct', value: 8920 },
  { label: 'Facebook', value: 6234 },
  { label: 'Twitter', value: 4521 },
  { label: 'LinkedIn', value: 3187 },
  { label: 'YouTube', value: 2845 },
]

const topPages = [
  { page: '/products/wireless-headphones', views: '12,453', unique: '8,921', avgTime: '3:42', bounce: '28%' },
  { page: '/products/smart-watch-pro', views: '9,876', unique: '7,234', avgTime: '4:15', bounce: '22%' },
  { page: '/blog/react-19-guide-2026', views: '8,234', unique: '6,891', avgTime: '6:30', bounce: '15%' },
  { page: '/pricing', views: '7,654', unique: '5,432', avgTime: '2:18', bounce: '35%' },
  { page: '/about', views: '5,432', unique: '4,321', avgTime: '1:45', bounce: '42%' },
  { page: '/contact', views: '4,321', unique: '3,210', avgTime: '2:05', bounce: '38%' },
  { page: '/docs/getting-started', views: '3,987', unique: '3,102', avgTime: '5:12', bounce: '18%' },
  { page: '/blog/typescript-patterns', views: '3,456', unique: '2,890', avgTime: '4:48', bounce: '20%' },
]

const engagementMetrics = [
  { label: 'Avg Session Duration', value: '4m 32s', change: '+12%', icon: Clock },
  { label: 'Pages per Session', value: '3.8', change: '+5%', icon: Layers },
  { label: 'Return Rate', value: '42.6%', change: '+3.2%', icon: RefreshCw },
]

const conversionFunnel = [
  { stage: 'Visit', count: 24589, percent: 100, color: 'bg-blue-500' },
  { stage: 'Signup', count: 4918, percent: 20.0, color: 'bg-indigo-500' },
  { stage: 'Trial', count: 1967, percent: 8.0, color: 'bg-violet-500' },
  { stage: 'Paid', count: 787, percent: 3.2, color: 'bg-emerald-500' },
]

const recentTransactions = [
  { id: 'TXN-20260217-001', customer: 'Alice Johnson', email: 'alice@acme.com', amount: '$1,250.00', status: 'completed', date: 'Feb 17, 2026', method: 'Credit Card' },
  { id: 'TXN-20260217-002', customer: 'Bob Williams', email: 'bob@techcorp.io', amount: '$890.00', status: 'completed', date: 'Feb 17, 2026', method: 'PayPal' },
  { id: 'TXN-20260216-003', customer: 'Carol Davis', email: 'carol@globalinc.com', amount: '$2,100.00', status: 'pending', date: 'Feb 16, 2026', method: 'Wire Transfer' },
  { id: 'TXN-20260216-004', customer: 'David Kim', email: 'david@innovate.co', amount: '$450.00', status: 'failed', date: 'Feb 16, 2026', method: 'Credit Card' },
  { id: 'TXN-20260215-005', customer: 'Emma Wilson', email: 'emma@dataworks.io', amount: '$3,200.00', status: 'completed', date: 'Feb 15, 2026', method: 'Credit Card' },
  { id: 'TXN-20260215-006', customer: 'Frank Chen', email: 'frank@cloudbase.com', amount: '$780.00', status: 'refunded', date: 'Feb 15, 2026', method: 'PayPal' },
  { id: 'TXN-20260214-007', customer: 'Grace Lee', email: 'grace@startuphub.co', amount: '$1,620.00', status: 'completed', date: 'Feb 14, 2026', method: 'Stripe' },
  { id: 'TXN-20260214-008', customer: 'Henry Park', email: 'henry@designlab.io', amount: '$540.00', status: 'pending', date: 'Feb 14, 2026', method: 'Credit Card' },
]

const revenueByProduct = [
  { label: 'SaaS Subscriptions', value: 42, color: '#6366f1' },
  { label: 'Consulting', value: 24, color: '#10b981' },
  { label: 'Marketplace', value: 18, color: '#f59e0b' },
  { label: 'Enterprise', value: 12, color: '#ef4444' },
  { label: 'Other', value: 4, color: '#8b5cf6' },
]

const liveActivityFeed = [
  { action: 'Page view', detail: '/products/wireless-headphones', location: 'New York, US', time: '2s ago' },
  { action: 'Purchase', detail: 'Smart Watch Pro - $299.00', location: 'London, UK', time: '15s ago' },
  { action: 'Signup', detail: 'enterprise@megacorp.com', location: 'Berlin, DE', time: '28s ago' },
  { action: 'Page view', detail: '/pricing', location: 'Toronto, CA', time: '34s ago' },
  { action: 'Add to cart', detail: 'Wireless Headphones x2', location: 'Paris, FR', time: '41s ago' },
  { action: 'Purchase', detail: 'Annual Pro Plan - $599.00', location: 'Sydney, AU', time: '55s ago' },
  { action: 'Page view', detail: '/blog/react-19-guide-2026', location: 'Tokyo, JP', time: '1m ago' },
  { action: 'Signup', detail: 'dev@startupinc.io', location: 'San Francisco, US', time: '1m ago' },
  { action: 'Page view', detail: '/docs/getting-started', location: 'Amsterdam, NL', time: '2m ago' },
  { action: 'Purchase', detail: 'Team License - $1,200.00', location: 'Stockholm, SE', time: '2m ago' },
]

const activePages = [
  { page: '/products/wireless-headphones', users: 142 },
  { page: '/pricing', users: 89 },
  { page: '/products/smart-watch-pro', users: 76 },
  { page: '/blog/react-19-guide-2026', users: 54 },
  { page: '/checkout', users: 38 },
  { page: '/docs/getting-started', users: 31 },
]

const liveCountries = [
  { country: 'United States', users: 312 },
  { country: 'United Kingdom', users: 145 },
  { country: 'Germany', users: 98 },
  { country: 'Canada', users: 76 },
  { country: 'Australia', users: 54 },
]

const notifications = [
  { type: 'success', text: 'Revenue target reached for Q1 2026 -- $48,352 of $45,000 goal', time: '2h ago' },
  { type: 'warning', text: 'Bounce rate spike detected on /pricing page (42% to 55%)', time: '4h ago' },
  { type: 'info', text: 'Weekly analytics report is ready for download', time: '6h ago' },
  { type: 'success', text: 'New milestone: 24,000+ active users this month', time: '8h ago' },
]

const timeRanges = ['Today', '7 Days', '30 Days', '90 Days', 'Year']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('30 Days')
  const [activeTab, setActiveTab] = useState('overview')
  const [commandOpen, setCommandOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  const handleKeyDown = useCallback((e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setCommandOpen((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const txnStatusColors = {
    completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    failed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    refunded: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  }

  const notifIcons = {
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  }

  const notifColors = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  }

  const activityIcons = {
    'Page view': Eye,
    'Purchase': ShoppingCart,
    'Signup': Users,
    'Add to cart': ShoppingCart,
  }

  const activityColors = {
    'Page view': 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    'Purchase': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    'Signup': 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400',
    'Add to cart': 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
  }

  /* ---------------------------------------------------------------- */
  /*  OVERVIEW TAB                                                     */
  /* ---------------------------------------------------------------- */

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        {kpis.map(({ label, value, change, trend, icon: Icon, sparkData }) => (
          <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </div>
              </div>
              <p className="text-2xl font-bold font-display mb-1">{value}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-emerald-500" />
                  )}
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                </div>
                <div className="w-20">
                  <Sparkline
                    data={sparkData}
                    color={trend === 'up' ? 'var(--color-emerald-500, #10b981)' : 'var(--color-emerald-500, #10b981)'}
                    height={32}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Channel + Area Chart Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue by Channel */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Revenue by Channel</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueByChannel.map((ch) => (
                  <div key={ch.channel} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${ch.color}`} />
                        <span className="font-medium">{ch.channel}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{ch.revenue}</span>
                        <span className={`text-xs font-medium ${ch.change.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {ch.change}
                        </span>
                      </div>
                    </div>
                    <Progress value={ch.percent} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trend Area Chart */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Revenue Trend</CardTitle>
                <Badge variant="outline" className="text-xs">12 months</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={revenueMonthly}
                height={220}
                color="#6366f1"
                fillOpacity={0.15}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Device Breakdown with Donut */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Device Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <DonutChart data={donutDeviceData} size={140} />
              </div>
              <div className="space-y-3">
                {deviceBreakdown.map(({ device, icon: Icon, sessions, percent, color }) => (
                  <div key={device} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{device}</span>
                        <span className="text-slate-500 dark:text-slate-400">{sessions}</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: color }} />
                      </div>
                    </div>
                    <span className="text-sm font-bold w-10 text-right">{percent}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Top Countries</CardTitle>
                <Button variant="ghost" size="sm" className="text-xs h-7">
                  View All <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCountries.map((c, idx) => (
                  <div key={c.country} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-xs text-slate-400 font-mono">{idx + 1}.</span>
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium">{c.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 dark:text-slate-400 text-xs">{c.sessions}</span>
                      <Badge variant="secondary" className="text-xs font-mono min-w-[3rem] justify-center">{c.percent}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Alerts</CardTitle>
                <Badge variant="outline" className="text-xs">{notifications.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((n, i) => {
                  const NIcon = notifIcons[n.type]
                  return (
                    <div key={i} className="flex gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <NIcon className={`w-5 h-5 shrink-0 mt-0.5 ${notifColors[n.type]}`} />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  ANALYTICS TAB                                                    */
  /* ---------------------------------------------------------------- */

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Traffic Sources + Engagement Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Traffic Sources Bar Chart */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Traffic Sources</CardTitle>
                <Badge variant="outline" className="text-xs">Last 30 days</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <BarChart
                data={trafficSources}
                height={260}
                color="#6366f1"
                barRadius={6}
              />
            </CardContent>
          </Card>
        </div>

        {/* User Engagement Metrics */}
        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">User Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {engagementMetrics.map(({ label, value, change, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-display">{value}</span>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionFunnel.map((step, idx) => (
                  <div key={step.stage}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{step.stage}</span>
                        {idx < conversionFunnel.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400 text-xs">{step.count.toLocaleString()}</span>
                        <Badge variant="secondary" className="text-xs font-mono">{step.percent}%</Badge>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${step.color} transition-all duration-500`} style={{ width: `${step.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Page Performance Table */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Page Performance</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Filter className="w-3.5 h-3.5 mr-1" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                View Full Report <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Page</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Views</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Unique Visitors</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Avg Time</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.page} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="font-mono text-xs text-indigo-600 dark:text-indigo-400 truncate max-w-[300px]">{page.page}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right font-medium">{page.views}</td>
                    <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden sm:table-cell">{page.unique}</td>
                    <td className="py-3 px-2 text-right text-slate-500 dark:text-slate-400 hidden md:table-cell">
                      <div className="flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        {page.avgTime}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right hidden lg:table-cell">
                      <span className={`font-medium ${parseInt(page.bounce) > 35 ? 'text-red-500' : parseInt(page.bounce) > 25 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {page.bounce}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  REPORTS TAB                                                      */
  /* ---------------------------------------------------------------- */

  const renderReports = () => (
    <div className="space-y-6">
      {/* Export Bar */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-semibold font-display">Export Reports</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Download transaction and analytics data</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <FileText className="w-3.5 h-3.5 mr-1.5" /> CSV
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileDown className="w-3.5 h-3.5 mr-1.5" /> PDF
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" /> Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions Table */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Recent Transactions</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">ID</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Customer</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2">
                          <span className="font-mono text-xs font-medium text-slate-700 dark:text-slate-300">{txn.id}</span>
                        </td>
                        <td className="py-3 px-2 hidden sm:table-cell">
                          <div>
                            <p className="font-medium text-sm">{txn.customer}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{txn.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right font-medium font-mono">{txn.amount}</td>
                        <td className="py-3 px-2 text-center">
                          <Badge className={`text-xs capitalize ${txnStatusColors[txn.status]}`}>
                            {txn.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 text-xs hidden md:table-cell">{txn.date}</td>
                        <td className="py-3 px-2 text-slate-500 dark:text-slate-400 text-xs hidden lg:table-cell">
                          <div className="flex items-center gap-1.5">
                            <CreditCard className="w-3 h-3" />
                            {txn.method}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500 dark:text-slate-400">Showing 8 of 1,247 transactions</p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="text-xs h-7 w-7 p-0">1</Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 w-7 p-0">2</Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7 w-7 p-0">3</Button>
                  <span className="text-xs text-slate-400 px-1">...</span>
                  <Button variant="ghost" size="sm" className="text-xs h-7 w-7 p-0">52</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Product Donut */}
        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Revenue by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-4">
                <DonutChart data={revenueByProduct} size={160} />
              </div>
              <div className="space-y-2.5">
                {revenueByProduct.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="font-mono text-slate-500 dark:text-slate-400">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Summary Card */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Total Transactions</span>
                  <span className="font-bold font-display">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Avg Order Value</span>
                  <span className="font-bold font-display">$387.42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Refund Rate</span>
                  <span className="font-bold font-display text-amber-600 dark:text-amber-400">2.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">Success Rate</span>
                  <span className="font-bold font-display text-emerald-600 dark:text-emerald-400">96.8%</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-800" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Net Revenue</span>
                  <span className="text-lg font-bold font-display text-emerald-600 dark:text-emerald-400">$48,352</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  REAL-TIME TAB                                                    */
  /* ---------------------------------------------------------------- */

  const renderRealtime = () => (
    <div className="space-y-6">
      {/* Active Users Hero */}
      <Card className="border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider">Active Users Right Now</span>
          </div>
          <p className="text-6xl font-bold font-display text-indigo-700 dark:text-indigo-300 mb-2">847</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">+23%</span> compared to same time yesterday
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="font-display">Live Activity</CardTitle>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {liveActivityFeed.map((item, idx) => {
                  const ActionIcon = activityIcons[item.action] || Eye
                  const colorClass = activityColors[item.action] || activityColors['Page view']
                  return (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
                        <ActionIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs shrink-0">{item.action}</Badge>
                          <span className="text-sm truncate">{item.detail}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{item.location}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 shrink-0 font-mono">{item.time}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Active Pages + Geo */}
        <div className="space-y-6">
          {/* Active Pages */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Active Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activePages.map((p) => (
                  <div key={p.page} className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 truncate flex-1">{p.page}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Users className="w-3 h-3 text-slate-400" />
                      <span className="text-sm font-bold">{p.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Live by Country</CardTitle>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveCountries.map((c) => {
                  const maxUsers = liveCountries[0].users
                  const barWidth = (c.users / maxUsers) * 100
                  return (
                    <div key={c.country} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span className="font-medium">{c.country}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3 h-3 text-slate-400" />
                          <span className="font-bold font-mono text-sm">{c.users}</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-indigo-500 transition-all" style={{ width: `${barWidth}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Quick Stats */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-display">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Pages/min</p>
                  <p className="text-xl font-bold font-display">342</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Events/min</p>
                  <p className="text-xl font-bold font-display">1,205</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Errors/min</p>
                  <p className="text-xl font-bold font-display text-red-500">3</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Avg Load</p>
                  <p className="text-xl font-bold font-display">1.2s</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  /* ---------------------------------------------------------------- */
  /*  RENDER TAB CONTENT                                               */
  /* ---------------------------------------------------------------- */

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'analytics':
        return renderAnalytics()
      case 'reports':
        return renderReports()
      case 'realtime':
        return renderRealtime()
      default:
        return renderOverview()
    }
  }

  /* ---------------------------------------------------------------- */
  /*  MAIN LAYOUT                                                      */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display tracking-tight">Analytics Pro</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-3 shrink-0">
          <button
            onClick={() => setCommandOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">Ctrl+K</kbd>
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3 pb-3">
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="px-3 mb-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{section.title}</p>
              <div className="space-y-0.5">
                {section.links.map(({ icon: Icon, label, tab, badge }) => {
                  const isActive = activeTab === tab && label.toLowerCase().includes(activeTab.slice(0, 4))
                  return (
                    <button
                      key={label}
                      onClick={() => { setActiveTab(tab); setSidebarOpen(false) }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-[18px] h-[18px]" />
                      <span className="flex-1 text-left">{label}</span>
                      {badge && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold uppercase tracking-wide">{badge}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              JW
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Joel Wembo</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">joel@analytics.pro</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-30">
          {/* Top bar */}
          <div className="h-14 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold font-display">
                  {tabItems.find((t) => t.id === activeTab)?.label || 'Dashboard'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Last updated: Feb 25, 2026 at 3:12 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Time range pills */}
              <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      selectedRange === range
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export
              </Button>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 flex items-center gap-1 overflow-x-auto">
            {tabItems.map((tab) => {
              const TabIcon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'realtime' && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </header>

        {/* Notification Dropdown */}
        {notifOpen && (
          <div className="fixed right-6 top-16 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-semibold font-display text-sm">Notifications</h3>
              <Badge variant="secondary" className="text-xs">{notifications.length} new</Badge>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n, i) => {
                const NIcon = notifIcons[n.type]
                return (
                  <div key={i} className="flex gap-3 p-3 border-b border-slate-100 dark:border-slate-800/50 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer">
                    <NIcon className={`w-5 h-5 shrink-0 mt-0.5 ${notifColors[n.type]}`} />
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">{n.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-3 border-t border-slate-200 dark:border-slate-800">
              <Button variant="ghost" size="sm" className="w-full text-xs">View All Notifications</Button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Notification overlay close */}
      {notifOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
      )}

      {/* Theme Switcher - Floating */}
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default App
