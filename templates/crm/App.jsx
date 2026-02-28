import { useState } from 'react'
import {
  Users, Phone, Mail, LayoutDashboard, Building2, Settings, Menu, X, Plus,
  Search, Filter, ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  TrendingUp, DollarSign, UserPlus, Target, Calendar, Clock, Star,
  CheckCircle2, Circle, AlertCircle, Bell, ChevronRight, BarChart3,
  PieChart, Activity, Briefcase, Globe, MessageSquare, FileText,
  ChevronLeft, Handshake, ListTodo, Headphones, HelpCircle,
  LogOut, ChevronsUpDown, Award, Flame, Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, AreaChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { CommandPalette } from '@/components/shared/CommandPalette'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarSections = {
  Main: [
    { icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' },
    { icon: Users, label: 'Contacts', tab: 'contacts', badge: 248 },
    { icon: Handshake, label: 'Deals', tab: 'deals' },
    { icon: ListTodo, label: 'Tasks', tab: 'tasks', badge: 5 },
  ],
  Sales: [
    { icon: Target, label: 'Pipeline', tab: 'dashboard' },
    { icon: BarChart3, label: 'Forecasting', tab: 'dashboard' },
    { icon: Award, label: 'Leaderboard', tab: 'dashboard' },
  ],
  Support: [
    { icon: Headphones, label: 'Tickets', tab: 'dashboard' },
    { icon: MessageSquare, label: 'Live Chat', tab: 'dashboard' },
    { icon: HelpCircle, label: 'Knowledge Base', tab: 'dashboard' },
  ],
  Settings: [
    { icon: Settings, label: 'Preferences', tab: 'dashboard' },
    { icon: Globe, label: 'Integrations', tab: 'dashboard' },
  ],
}

const stats = [
  {
    label: 'Total Revenue',
    value: '$1.2M',
    change: '+14.2%',
    trend: 'up',
    icon: DollarSign,
    sparkData: [680, 720, 790, 850, 810, 920, 980, 1050, 1010, 1120, 1180, 1200],
    color: '#10b981',
  },
  {
    label: 'Active Deals',
    value: '147',
    change: '+8.7%',
    trend: 'up',
    icon: Handshake,
    sparkData: [95, 102, 110, 108, 118, 125, 130, 128, 136, 140, 145, 147],
    color: '#6366f1',
  },
  {
    label: 'Win Rate',
    value: '68%',
    change: '+3.4%',
    trend: 'up',
    icon: Target,
    sparkData: [55, 58, 60, 59, 62, 64, 63, 65, 66, 67, 67, 68],
    color: '#f59e0b',
  },
  {
    label: 'Avg Deal Size',
    value: '$18.5K',
    change: '-1.2%',
    trend: 'down',
    icon: TrendingUp,
    sparkData: [19.2, 19.8, 19.5, 20.1, 19.9, 19.3, 18.8, 19.0, 18.6, 18.9, 18.7, 18.5],
    color: '#ef4444',
  },
]

const pipelineStages = [
  { stage: 'Lead', count: 42, value: '$126,000', width: 100, color: 'bg-slate-400 dark:bg-slate-500' },
  { stage: 'Qualified', count: 35, value: '$245,000', width: 83, color: 'bg-blue-500' },
  { stage: 'Proposal', count: 28, value: '$378,000', width: 67, color: 'bg-violet-500' },
  { stage: 'Negotiation', count: 18, value: '$297,000', width: 43, color: 'bg-amber-500' },
  { stage: 'Closed Won', count: 24, value: '$432,000', width: 57, color: 'bg-emerald-500' },
]

const revenueData = [
  { value: 72, label: 'Mar' },
  { value: 85, label: 'Apr' },
  { value: 78, label: 'May' },
  { value: 95, label: 'Jun' },
  { value: 110, label: 'Jul' },
  { value: 102, label: 'Aug' },
  { value: 118, label: 'Sep' },
  { value: 130, label: 'Oct' },
  { value: 125, label: 'Nov' },
  { value: 140, label: 'Dec' },
  { value: 152, label: 'Jan' },
  { value: 165, label: 'Feb' },
]

const dealSourceData = [
  { label: 'Outbound', value: 38, color: '#6366f1' },
  { label: 'Inbound', value: 28, color: '#10b981' },
  { label: 'Referral', value: 18, color: '#f59e0b' },
  { label: 'Partner', value: 16, color: '#ec4899' },
]

const activities = [
  { id: 1, type: 'call', text: 'Discovery call with Sarah Chen at Salesforce', time: '12 min ago', icon: Phone, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 2, type: 'email', text: 'Proposal sent to Marcus Rivera at HubSpot', time: '45 min ago', icon: Mail, color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20' },
  { id: 3, type: 'deal', text: 'Deal closed: Zendesk Enterprise - $84,000', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 4, type: 'meeting', text: 'Quarterly review scheduled with Atlassian', time: '2 hours ago', icon: Calendar, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { id: 5, type: 'call', text: 'Follow-up call completed with Stripe team', time: '3 hours ago', icon: Phone, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
  { id: 6, type: 'email', text: 'Contract draft received from Datadog legal', time: '4 hours ago', icon: Mail, color: 'text-violet-500 bg-violet-50 dark:bg-violet-900/20' },
  { id: 7, type: 'deal', text: 'New deal created: Shopify - $42,000', time: '5 hours ago', icon: Briefcase, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' },
  { id: 8, type: 'meeting', text: 'Product demo with Twilio engineering team', time: '6 hours ago', icon: Calendar, color: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20' },
  { id: 9, type: 'note', text: 'Updated pricing notes for MongoDB renewal', time: '8 hours ago', icon: FileText, color: 'text-slate-500 bg-slate-50 dark:bg-slate-800' },
]

const contacts = [
  { id: 1, name: 'Sarah Chen', company: 'Salesforce', email: 'sarah.chen@salesforce.com', status: 'customer', value: '$84,000', lastContact: '12 min ago', initials: 'SC', color: 'bg-blue-500' },
  { id: 2, name: 'Marcus Rivera', company: 'HubSpot', email: 'marcus.r@hubspot.com', status: 'lead', value: '$52,000', lastContact: '45 min ago', initials: 'MR', color: 'bg-violet-500' },
  { id: 3, name: 'Priya Patel', company: 'Zendesk', email: 'priya.patel@zendesk.com', status: 'customer', value: '$67,500', lastContact: '1 hour ago', initials: 'PP', color: 'bg-emerald-500' },
  { id: 4, name: 'James O\'Brien', company: 'Atlassian', email: 'j.obrien@atlassian.com', status: 'prospect', value: '$120,000', lastContact: '2 hours ago', initials: 'JO', color: 'bg-amber-500' },
  { id: 5, name: 'Aisha Johnson', company: 'Stripe', email: 'aisha.j@stripe.com', status: 'customer', value: '$93,000', lastContact: '3 hours ago', initials: 'AJ', color: 'bg-pink-500' },
  { id: 6, name: 'David Kim', company: 'Datadog', email: 'david.kim@datadoghq.com', status: 'lead', value: '$45,000', lastContact: '4 hours ago', initials: 'DK', color: 'bg-indigo-500' },
  { id: 7, name: 'Emma Thompson', company: 'Shopify', email: 'emma.t@shopify.com', status: 'prospect', value: '$42,000', lastContact: '5 hours ago', initials: 'ET', color: 'bg-cyan-500' },
  { id: 8, name: 'Carlos Mendez', company: 'Twilio', email: 'carlos.m@twilio.com', status: 'partner', value: '$156,000', lastContact: '6 hours ago', initials: 'CM', color: 'bg-orange-500' },
  { id: 9, name: 'Nina Kowalski', company: 'MongoDB', email: 'nina.k@mongodb.com', status: 'customer', value: '$78,000', lastContact: '8 hours ago', initials: 'NK', color: 'bg-green-500' },
  { id: 10, name: 'Ryan Foster', company: 'Cloudflare', email: 'ryan.f@cloudflare.com', status: 'lead', value: '$36,000', lastContact: '1 day ago', initials: 'RF', color: 'bg-red-500' },
  { id: 11, name: 'Lisa Wang', company: 'Figma', email: 'lisa.wang@figma.com', status: 'prospect', value: '$28,000', lastContact: '1 day ago', initials: 'LW', color: 'bg-purple-500' },
  { id: 12, name: 'Tom Anderson', company: 'Notion', email: 'tom.a@makenotion.com', status: 'customer', value: '$54,000', lastContact: '2 days ago', initials: 'TA', color: 'bg-teal-500' },
]

const dealColumns = {
  lead: {
    label: 'Lead',
    color: 'border-slate-300 dark:border-slate-600',
    headerColor: 'text-slate-600 dark:text-slate-400',
    deals: [
      { id: 1, company: 'Cloudflare', value: '$36,000', contact: 'Ryan Foster', probability: 20, days: 3 },
      { id: 2, company: 'Figma', value: '$28,000', contact: 'Lisa Wang', probability: 15, days: 5 },
      { id: 3, company: 'Linear', value: '$18,500', contact: 'Alex Novak', probability: 25, days: 2 },
      { id: 4, company: 'Vercel', value: '$22,000', contact: 'Mei Zhang', probability: 10, days: 7 },
    ],
  },
  qualified: {
    label: 'Qualified',
    color: 'border-blue-400 dark:border-blue-500',
    headerColor: 'text-blue-600 dark:text-blue-400',
    deals: [
      { id: 5, company: 'HubSpot', value: '$52,000', contact: 'Marcus Rivera', probability: 40, days: 12 },
      { id: 6, company: 'Datadog', value: '$45,000', contact: 'David Kim', probability: 45, days: 8 },
      { id: 7, company: 'Elastic', value: '$38,000', contact: 'Jan Muller', probability: 35, days: 15 },
    ],
  },
  proposal: {
    label: 'Proposal',
    color: 'border-violet-400 dark:border-violet-500',
    headerColor: 'text-violet-600 dark:text-violet-400',
    deals: [
      { id: 8, company: 'Atlassian', value: '$120,000', contact: 'James O\'Brien', probability: 60, days: 21 },
      { id: 9, company: 'Shopify', value: '$42,000', contact: 'Emma Thompson', probability: 55, days: 14 },
      { id: 10, company: 'MongoDB', value: '$78,000', contact: 'Nina Kowalski', probability: 65, days: 18 },
    ],
  },
  negotiation: {
    label: 'Negotiation',
    color: 'border-amber-400 dark:border-amber-500',
    headerColor: 'text-amber-600 dark:text-amber-400',
    deals: [
      { id: 11, company: 'Salesforce', value: '$84,000', contact: 'Sarah Chen', probability: 80, days: 30 },
      { id: 12, company: 'Stripe', value: '$93,000', contact: 'Aisha Johnson', probability: 75, days: 25 },
      { id: 13, company: 'Twilio', value: '$156,000', contact: 'Carlos Mendez', probability: 85, days: 35 },
    ],
  },
  won: {
    label: 'Won',
    color: 'border-emerald-400 dark:border-emerald-500',
    headerColor: 'text-emerald-600 dark:text-emerald-400',
    deals: [
      { id: 14, company: 'Zendesk', value: '$67,500', contact: 'Priya Patel', probability: 100, days: 0 },
      { id: 15, company: 'Notion', value: '$54,000', contact: 'Tom Anderson', probability: 100, days: 0 },
      { id: 16, company: 'Slack', value: '$91,000', contact: 'Devon Harris', probability: 100, days: 0 },
    ],
  },
}

const tasks = [
  { id: 1, text: 'Follow up on Salesforce contract renewal terms', assignee: 'You', due: 'Today, 2:00 PM', priority: 'high', done: false, group: 'today' },
  { id: 2, text: 'Send revised pricing proposal to Atlassian', assignee: 'You', due: 'Today, 4:00 PM', priority: 'high', done: false, group: 'today' },
  { id: 3, text: 'Prepare quarterly pipeline review deck', assignee: 'You', due: 'Today, 5:00 PM', priority: 'medium', done: false, group: 'today' },
  { id: 4, text: 'Complete Zendesk onboarding documentation', assignee: 'Rachel Kim', due: 'Today, 3:00 PM', priority: 'medium', done: true, group: 'today' },
  { id: 5, text: 'Schedule product demo with Figma design team', assignee: 'You', due: 'Tomorrow, 10:00 AM', priority: 'medium', done: false, group: 'upcoming' },
  { id: 6, text: 'Review and approve Stripe SOW document', assignee: 'Legal Team', due: 'Tomorrow, 12:00 PM', priority: 'high', done: false, group: 'upcoming' },
  { id: 7, text: 'Send case study materials to HubSpot', assignee: 'Marketing', due: 'Feb 28, 2026', priority: 'low', done: false, group: 'upcoming' },
  { id: 8, text: 'Coordinate partner onboarding call with Twilio', assignee: 'You', due: 'Mar 1, 2026', priority: 'medium', done: false, group: 'upcoming' },
  { id: 9, text: 'Update CRM records for Cloudflare engagement', assignee: 'You', due: 'Mar 3, 2026', priority: 'low', done: false, group: 'upcoming' },
  { id: 10, text: 'Submit Datadog competitive analysis report', assignee: 'You', due: 'Feb 22, 2026', priority: 'high', done: false, group: 'overdue' },
  { id: 11, text: 'Respond to MongoDB procurement questions', assignee: 'You', due: 'Feb 23, 2026', priority: 'high', done: false, group: 'overdue' },
  { id: 12, text: 'Update Shopify deal stage in pipeline', assignee: 'Rachel Kim', due: 'Feb 24, 2026', priority: 'medium', done: false, group: 'overdue' },
]

const commandItems = [
  { id: 'c1', label: 'Sarah Chen - Salesforce', group: 'Contacts', icon: Users },
  { id: 'c2', label: 'Marcus Rivera - HubSpot', group: 'Contacts', icon: Users },
  { id: 'c3', label: 'Priya Patel - Zendesk', group: 'Contacts', icon: Users },
  { id: 'c4', label: 'James O\'Brien - Atlassian', group: 'Contacts', icon: Users },
  { id: 'c5', label: 'Aisha Johnson - Stripe', group: 'Contacts', icon: Users },
  { id: 'd1', label: 'Salesforce Enterprise - $84,000', group: 'Deals', icon: Handshake },
  { id: 'd2', label: 'Atlassian Platform - $120,000', group: 'Deals', icon: Handshake },
  { id: 'd3', label: 'Stripe Integration - $93,000', group: 'Deals', icon: Handshake },
  { id: 'd4', label: 'Twilio Partnership - $156,000', group: 'Deals', icon: Handshake },
  { id: 'a1', label: 'New Contact', group: 'Actions', icon: UserPlus },
  { id: 'a2', label: 'New Deal', group: 'Actions', icon: Plus },
  { id: 'a3', label: 'New Task', group: 'Actions', icon: ListTodo },
]

const tabsList = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'contacts', label: 'Contacts', count: 248 },
  { id: 'deals', label: 'Deals', count: 147 },
  { id: 'tasks', label: 'Tasks', count: 5 },
]

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function formatColumnTotal(deals) {
  const total = deals.reduce((sum, d) => sum + parseInt(d.value.replace(/[$,]/g, '')), 0)
  if (total >= 1000) return `$${(total / 1000).toFixed(0)}K`
  return `$${total.toLocaleString()}`
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [contactSearch, setContactSearch] = useState('')
  const [contactFilter, setContactFilter] = useState('all')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [taskItems, setTaskItems] = useState(tasks)

  const sidebarW = sidebarCollapsed ? 'w-[68px]' : 'w-64'
  const mainPl = sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-64'

  const statusColors = {
    customer: 'success',
    lead: 'info',
    prospect: 'warning',
    partner: 'default',
  }

  const priorityDot = {
    high: 'bg-red-500',
    medium: 'bg-amber-400',
    low: 'bg-emerald-400',
  }

  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.company.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(contactSearch.toLowerCase())
    const matchesFilter = contactFilter === 'all' || c.status === contactFilter
    return matchesSearch && matchesFilter
  })

  const todayTasks = taskItems.filter((t) => t.group === 'today')
  const upcomingTasks = taskItems.filter((t) => t.group === 'upcoming')
  const overdueTasks = taskItems.filter((t) => t.group === 'overdue')

  function toggleTask(id) {
    setTaskItems((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function handleCommand(item) {
    if (item === '__open__') {
      setCmdOpen(true)
      return
    }
    setCmdOpen(false)
  }

  function handleSidebarNav(tab) {
    setActiveTab(tab)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* ---- SIDEBAR ---- */}
      <aside
        className={`fixed left-0 top-0 h-full ${sidebarW} bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-all duration-200 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        {/* Org switcher */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold font-display truncate">Acme Corp</p>
                <p className="text-[11px] text-slate-400 truncate">Enterprise Plan</p>
              </div>
            )}
            {!sidebarCollapsed && (
              <button className="shrink-0 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded transition-colors">
                <ChevronsUpDown className="w-4 h-4" />
              </button>
            )}
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar search */}
        {!sidebarCollapsed && (
          <div className="px-3 pt-3">
            <div className="relative">
              <Input
                placeholder="Search..."
                className="w-full pl-8 h-8 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono">
                /
              </kbd>
            </div>
          </div>
        )}

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto px-3 pt-3 pb-2 space-y-4">
          {Object.entries(sidebarSections).map(([section, links]) => (
            <div key={section}>
              {!sidebarCollapsed && (
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-1">
                  {section}
                </p>
              )}
              <div className="space-y-0.5">
                {links.map(({ icon: Icon, label, tab, badge }) => {
                  const isActive = activeTab === tab && label.toLowerCase() === tab
                  return (
                    <button
                      key={label}
                      onClick={() => handleSidebarNav(tab)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                      title={sidebarCollapsed ? label : undefined}
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0" />
                      {!sidebarCollapsed && <span className="flex-1 text-left truncate">{label}</span>}
                      {!sidebarCollapsed && badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-[10px] font-semibold">
                          {badge}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="hidden lg:block px-3 py-2 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* User profile */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
              JD
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Jordan Davis</p>
                <p className="text-[11px] text-slate-500 truncate">jordan@acmecorp.com</p>
              </div>
            )}
            {!sidebarCollapsed && (
              <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <div className={`${mainPl} transition-all duration-200`}>
        {/* Header */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search contacts, deals... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setCmdOpen(true)}
                className="w-80 pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                readOnly
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">
                Ctrl+K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Button className="bg-violet-600 hover:bg-violet-700 rounded-lg text-sm">
              <Plus className="w-4 h-4 mr-2" /> New Deal
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* Page header + tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-display">CRM Dashboard</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Welcome back, Jordan. You have <span className="text-violet-600 dark:text-violet-400 font-medium">5 tasks</span> due today.
              </p>
            </div>
            <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
          </div>

          {/* ============================================================ */}
          {/*  DASHBOARD TAB                                                */}
          {/* ============================================================ */}
          <TabContent id="dashboard" active={activeTab}>
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                {stats.map(({ label, value, change, trend, icon: Icon, sparkData, color }) => (
                  <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold font-display">{value}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          {trend === 'up' ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {change}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">vs last month</span>
                        </div>
                        <div className="w-20">
                          <Sparkline data={sparkData} color={color} height={28} fill />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pipeline Funnel */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Sales Pipeline</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Q1 2026</Badge>
                      <Button variant="outline" size="sm" className="text-xs">View All Deals</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pipelineStages.map((stage) => (
                      <div key={stage.stage} className="flex items-center gap-4">
                        <div className="w-24 text-right">
                          <p className="text-sm font-medium">{stage.stage}</p>
                          <p className="text-[11px] text-slate-400">{stage.count} deals</p>
                        </div>
                        <div className="flex-1">
                          <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                            <div
                              className={`h-full ${stage.color} rounded-lg flex items-center px-3 transition-all duration-500`}
                              style={{ width: `${stage.width}%` }}
                            >
                              <span className="text-xs font-semibold text-white whitespace-nowrap">{stage.value}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Trend + Deal Sources */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-display">Revenue Trend</CardTitle>
                        <Badge variant="secondary" className="text-xs">Last 12 Months</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <AreaChart data={revenueData} height={160} color="#7c3aed" />
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card className="border-slate-200 dark:border-slate-800 h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-display">Deal Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-4">
                          {dealSourceData.map((source) => (
                            <DonutChart
                              key={source.label}
                              value={source.value}
                              size={72}
                              strokeWidth={7}
                              color={source.color}
                              trackColor="hsl(var(--muted))"
                              label={`${source.value}%`}
                              sublabel={source.label}
                            />
                          ))}
                        </div>
                        <div className="w-full space-y-2 mt-2">
                          {dealSourceData.map((source) => (
                            <div key={source.label} className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: source.color }} />
                                <span className="text-slate-600 dark:text-slate-400">{source.label}</span>
                              </div>
                              <span className="font-medium">{source.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Activity Feed */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Recent Activity</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs text-violet-600 dark:text-violet-400">
                      View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {activities.map(({ id, text, time, icon: Icon, color }) => (
                      <div key={id} className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-snug">{text}</p>
                          <p className="text-xs text-slate-400 mt-1">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  CONTACTS TAB                                                 */}
          {/* ============================================================ */}
          <TabContent id="contacts" active={activeTab}>
            <div className="space-y-4">
              {/* Search and filter bar */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Search contacts by name, company, email..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex gap-2">
                      {['all', 'customer', 'lead', 'prospect', 'partner'].map((f) => (
                        <button
                          key={f}
                          onClick={() => setContactFilter(f)}
                          className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                            contactFilter === f
                              ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contacts table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Contact</th>
                          <th className="text-left py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                          <th className="text-left py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Email</th>
                          <th className="text-center py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                          <th className="text-right py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Deal Value</th>
                          <th className="text-right py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden xl:table-cell">Last Contact</th>
                          <th className="text-center py-3.5 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider w-28">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContacts.map((c) => (
                          <tr
                            key={c.id}
                            className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                                  {c.initials}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-medium text-sm truncate">{c.name}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 md:hidden truncate">{c.company}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-300">{c.company}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                              <span className="text-slate-500 dark:text-slate-400 text-xs">{c.email}</span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={statusColors[c.status]} className="capitalize text-[11px]">
                                {c.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right font-semibold hidden sm:table-cell">{c.value}</td>
                            <td className="py-3 px-4 text-right text-xs text-slate-500 dark:text-slate-400 hidden xl:table-cell">{c.lastContact}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-center gap-1">
                                <button className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="Call">
                                  <Phone className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-lg transition-colors" title="Email">
                                  <Mail className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="More">
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredContacts.length === 0 && (
                    <div className="py-12 text-center">
                      <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">No contacts found matching your criteria.</p>
                    </div>
                  )}
                  <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Showing {filteredContacts.length} of {contacts.length} contacts
                    </p>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-7 px-2">
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  DEALS TAB (Kanban)                                           */}
          {/* ============================================================ */}
          <TabContent id="deals" active={activeTab}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-xs">
                    <Flame className="w-3 h-3 mr-1" /> 147 Active Deals
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Pipeline Value: $1.48M
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto">
                {Object.entries(dealColumns).map(([key, column]) => (
                  <div key={key} className="min-w-[260px]">
                    {/* Column header */}
                    <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${column.color}`}>
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${column.headerColor}`}>{column.label}</h3>
                        <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
                          {column.deals.length}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {formatColumnTotal(column.deals)}
                      </span>
                    </div>

                    {/* Deal cards */}
                    <div className="space-y-3 stagger-children">
                      {column.deals.map((deal) => (
                        <Card
                          key={deal.id}
                          className="border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer"
                        >
                          <CardContent className="p-3.5">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm font-semibold">{deal.company}</p>
                                <p className="text-lg font-bold font-display text-violet-600 dark:text-violet-400">{deal.value}</p>
                              </div>
                              <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded transition-colors">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Users className="w-3 h-3" />
                                <span>{deal.contact}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        deal.probability >= 80
                                          ? 'bg-emerald-500'
                                          : deal.probability >= 50
                                          ? 'bg-blue-500'
                                          : deal.probability >= 30
                                          ? 'bg-amber-500'
                                          : 'bg-slate-400'
                                      }`}
                                      style={{ width: `${deal.probability}%` }}
                                    />
                                  </div>
                                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{deal.probability}%</span>
                                </div>
                                {deal.days > 0 && (
                                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {deal.days}d
                                  </span>
                                )}
                                {deal.days === 0 && (
                                  <Badge variant="success" className="text-[10px] px-1.5 py-0">Closed</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Add deal button */}
                    <button className="w-full mt-3 py-2 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-medium transition-colors flex items-center justify-center gap-1">
                      <Plus className="w-3.5 h-3.5" /> Add Deal
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>

          {/* ============================================================ */}
          {/*  TASKS TAB                                                    */}
          {/* ============================================================ */}
          <TabContent id="tasks" active={activeTab}>
            <div className="space-y-6">
              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 stagger-children">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display">{overdueTasks.filter((t) => !t.done).length}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Overdue</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display">{todayTasks.filter((t) => !t.done).length}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Due Today</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display">{taskItems.filter((t) => t.done).length}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Completed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Overdue */}
              {overdueTasks.length > 0 && (
                <Card className="border-red-200 dark:border-red-900/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <CardTitle className="text-base font-display text-red-600 dark:text-red-400">Overdue</CardTitle>
                      <Badge variant="error" className="text-[10px]">{overdueTasks.filter((t) => !t.done).length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {overdueTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-red-50/50 dark:hover:bg-red-900/10 transition-colors ${
                            task.done ? 'opacity-50' : ''
                          }`}
                        >
                          <button onClick={() => toggleTask(task.id)} className="shrink-0">
                            {task.done ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-violet-500 transition-colors" />
                            )}
                          </button>
                          <div className={`w-2 h-2 rounded-full ${priorityDot[task.priority]} shrink-0`} title={`${task.priority} priority`} />
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${task.done ? 'line-through text-slate-400' : ''}`}>{task.text}</p>
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline shrink-0">{task.assignee}</span>
                          <span className="text-xs text-red-500 font-medium shrink-0">{task.due}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Today */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <CardTitle className="text-base font-display">Today</CardTitle>
                      <Badge variant="warning" className="text-[10px]">{todayTasks.filter((t) => !t.done).length} remaining</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-violet-600 dark:text-violet-400">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Task
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {todayTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          task.done ? 'opacity-50' : ''
                        }`}
                      >
                        <button onClick={() => toggleTask(task.id)} className="shrink-0">
                          {task.done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-violet-500 transition-colors" />
                          )}
                        </button>
                        <div className={`w-2 h-2 rounded-full ${priorityDot[task.priority]} shrink-0`} title={`${task.priority} priority`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${task.done ? 'line-through text-slate-400' : ''}`}>{task.text}</p>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline shrink-0">{task.assignee}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{task.due}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <CardTitle className="text-base font-display">Upcoming</CardTitle>
                    <Badge variant="info" className="text-[10px]">{upcomingTasks.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {upcomingTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                          task.done ? 'opacity-50' : ''
                        }`}
                      >
                        <button onClick={() => toggleTask(task.id)} className="shrink-0">
                          {task.done ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-violet-500 transition-colors" />
                          )}
                        </button>
                        <div className={`w-2 h-2 rounded-full ${priorityDot[task.priority]} shrink-0`} title={`${task.priority} priority`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${task.done ? 'line-through text-slate-400' : ''}`}>{task.text}</p>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline shrink-0">{task.assignee}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">{task.due}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Command Palette */}
      <CommandPalette
        items={commandItems}
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onSelect={handleCommand}
      />

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-right" />
    </div>
  )
}

export default App
