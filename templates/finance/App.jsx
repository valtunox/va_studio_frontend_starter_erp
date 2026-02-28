import { useState } from 'react'
import {
  LayoutDashboard, Wallet, Receipt, PiggyBank, TrendingUp, FileBarChart, Settings,
  Menu, X, Bell, Download, ArrowUpRight, ArrowDownRight, DollarSign, Plus,
  CreditCard, Home, Utensils, Car, Film, Zap, Search, Filter, Building2,
  ShoppingCart, Briefcase, Send, ChevronRight, User, LogOut, AlertTriangle,
  FileText, Landmark, CircleDollarSign, ArrowRightLeft, Coffee, Wifi, Plane
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

const sidebarSections = [
  { heading: 'Main', items: [
    { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
    { icon: Landmark, label: 'Banking', id: 'banking' },
    { icon: TrendingUp, label: 'Investments', id: 'investments' },
  ]},
  { heading: 'Finance', items: [
    { icon: Receipt, label: 'Billing', id: 'billing' },
    { icon: FileBarChart, label: 'Reports', id: 'reports' },
  ]},
  { heading: 'System', items: [
    { icon: Settings, label: 'Settings', id: 'settings' },
  ]},
]

const accountCards = [
  { label: 'Checking', number: '****4821', value: 124500, icon: Wallet, color: 'from-teal-500 to-cyan-600', trend: '+2.4%', up: true },
  { label: 'Savings', number: '****7392', value: 342800, icon: PiggyBank, color: 'from-emerald-500 to-green-600', trend: '+5.1%', up: true },
  { label: 'Investment', number: '****9156', value: 891200, icon: TrendingUp, color: 'from-violet-500 to-purple-600', trend: '+12.8%', up: true },
  { label: 'Credit Card', number: '****3047', value: -4230, icon: CreditCard, color: 'from-red-500 to-rose-600', trend: '-18.2%', up: false },
]

const netWorthTrend = [
  { label: 'Mar', value: 1180000 }, { label: 'Apr', value: 1205000 }, { label: 'May', value: 1195000 },
  { label: 'Jun', value: 1230000 }, { label: 'Jul', value: 1258000 }, { label: 'Aug', value: 1275000 },
  { label: 'Sep', value: 1290000 }, { label: 'Oct', value: 1310000 }, { label: 'Nov', value: 1325000 },
  { label: 'Dec', value: 1340000 }, { label: 'Jan', value: 1348000 }, { label: 'Feb', value: 1354270 },
]

const incomeVsExpense = [
  { label: 'Sep', value: 11200, color: '#14b8a6' },
  { label: '', value: 8500, color: '#f87171' },
  { label: 'Oct', value: 11800, color: '#14b8a6' },
  { label: '', value: 8700, color: '#f87171' },
  { label: 'Nov', value: 12000, color: '#14b8a6' },
  { label: '', value: 8400, color: '#f87171' },
  { label: 'Dec', value: 12200, color: '#14b8a6' },
  { label: '', value: 8600, color: '#f87171' },
  { label: 'Jan', value: 12400, color: '#14b8a6' },
  { label: '', value: 8300, color: '#f87171' },
  { label: 'Feb', value: 12450, color: '#14b8a6' },
  { label: '', value: 8230, color: '#f87171' },
]

const spendingCategories = [
  { name: 'Housing', percent: 35, amount: 2878, color: '#6366f1' },
  { name: 'Food', percent: 15, amount: 1235, color: '#14b8a6' },
  { name: 'Transport', percent: 12, amount: 988, color: '#f59e0b' },
  { name: 'Entertainment', percent: 8, amount: 658, color: '#ec4899' },
  { name: 'Utilities', percent: 10, amount: 823, color: '#3b82f6' },
  { name: 'Other', percent: 20, amount: 1648, color: '#94a3b8' },
]

const recentTransactions = [
  { icon: Building2, merchant: 'Salary Deposit - Acme Corp', category: 'Income', amount: 6225, date: 'Feb 17', isIncome: true },
  { icon: ShoppingCart, merchant: 'Whole Foods Market', category: 'Groceries', amount: -142.50, date: 'Feb 16', isIncome: false },
  { icon: Film, merchant: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, date: 'Feb 15', isIncome: false },
  { icon: Car, merchant: 'Uber Ride - Airport', category: 'Transport', amount: -34.80, date: 'Feb 14', isIncome: false },
  { icon: Briefcase, merchant: 'Freelance - Web Design', category: 'Income', amount: 2500, date: 'Feb 13', isIncome: true },
  { icon: Zap, merchant: 'Pacific Gas & Electric', category: 'Utilities', amount: -89.00, date: 'Feb 12', isIncome: false },
  { icon: Coffee, merchant: 'Starbucks Reserve', category: 'Food & Drink', amount: -7.45, date: 'Feb 11', isIncome: false },
  { icon: Wifi, merchant: 'Comcast Internet', category: 'Utilities', amount: -79.99, date: 'Feb 10', isIncome: false },
]

const fullTransactions = [
  { date: '2026-02-17', desc: 'Salary Deposit - Acme Corp', category: 'Income', account: 'Checking ****4821', amount: 6225.00, balance: 124500 },
  { date: '2026-02-16', desc: 'Whole Foods Market #1842', category: 'Groceries', account: 'Checking ****4821', amount: -142.50, balance: 118275 },
  { date: '2026-02-15', desc: 'Netflix Premium Plan', category: 'Entertainment', account: 'Credit Card ****3047', amount: -15.99, balance: 118417.50 },
  { date: '2026-02-14', desc: 'Uber Ride - SFO Airport', category: 'Transport', account: 'Credit Card ****3047', amount: -34.80, balance: 118433.49 },
  { date: '2026-02-13', desc: 'Freelance Payment - WebDev', category: 'Income', account: 'Checking ****4821', amount: 2500.00, balance: 118468.29 },
  { date: '2026-02-12', desc: 'Pacific Gas & Electric', category: 'Utilities', account: 'Checking ****4821', amount: -89.00, balance: 115968.29 },
  { date: '2026-02-11', desc: 'Starbucks Reserve Roastery', category: 'Food & Drink', account: 'Credit Card ****3047', amount: -7.45, balance: 116057.29 },
  { date: '2026-02-10', desc: 'Comcast Business Internet', category: 'Utilities', account: 'Checking ****4821', amount: -79.99, balance: 116064.74 },
  { date: '2026-02-09', desc: 'Transfer to Savings', category: 'Transfer', account: 'Checking ****4821', amount: -3000.00, balance: 116144.73 },
  { date: '2026-02-08', desc: 'Amazon Prime - Annual', category: 'Shopping', account: 'Credit Card ****3047', amount: -139.00, balance: 119144.73 },
  { date: '2026-02-07', desc: 'Dividend - Vanguard ETF', category: 'Income', account: 'Investment ****9156', amount: 842.30, balance: 119283.73 },
  { date: '2026-02-06', desc: 'Planet Fitness Monthly', category: 'Health', account: 'Credit Card ****3047', amount: -24.99, balance: 118441.43 },
]

const budgets = [
  { name: 'Housing & Rent', icon: Home, spent: 2200, budget: 2200, color: 'bg-indigo-500' },
  { name: 'Food & Groceries', icon: Utensils, spent: 680, budget: 800, color: 'bg-teal-500' },
  { name: 'Transportation', icon: Car, spent: 420, budget: 400, color: 'bg-amber-500' },
  { name: 'Entertainment', icon: Film, spent: 180, budget: 300, color: 'bg-pink-500' },
  { name: 'Utilities & Bills', icon: Zap, spent: 250, budget: 280, color: 'bg-blue-500' },
  { name: 'Travel & Vacation', icon: Plane, spent: 1200, budget: 500, color: 'bg-red-500' },
]

const invoices = [
  { id: 'INV-2026-001', client: 'Acme Corporation', amount: 12500, issued: '2026-01-15', due: '2026-02-15', status: 'paid' },
  { id: 'INV-2026-002', client: 'TechStart Inc.', amount: 8750, issued: '2026-01-22', due: '2026-02-22', status: 'pending' },
  { id: 'INV-2026-003', client: 'Global Media Ltd.', amount: 4200, issued: '2026-02-01', due: '2026-03-01', status: 'pending' },
  { id: 'INV-2026-004', client: 'Riverside Consulting', amount: 6800, issued: '2026-01-05', due: '2026-02-05', status: 'overdue' },
  { id: 'INV-2026-005', client: 'Blue Ocean Ventures', amount: 15300, issued: '2026-02-10', due: '2026-03-10', status: 'paid' },
  { id: 'INV-2026-006', client: 'Summit Partners', amount: 9400, issued: '2026-02-12', due: '2026-03-12', status: 'draft' },
  { id: 'INV-2026-007', client: 'Pinnacle Design Co.', amount: 3200, issued: '2026-01-28', due: '2026-02-28', status: 'pending' },
  { id: 'INV-2026-008', client: 'NovaTech Solutions', amount: 7100, issued: '2026-02-14', due: '2026-03-14', status: 'draft' },
]

const pnlData = {
  revenue: 148500,
  cogs: 42300,
  grossProfit: 106200,
  operatingExpenses: { salaries: 38000, marketing: 12500, rent: 8800, software: 4200, other: 6700 },
  totalOpex: 70200,
  netIncome: 36000,
}

const cashFlowStatement = {
  operating: { inflows: 148500, outflows: -112500, net: 36000 },
  investing: { inflows: 8400, outflows: -25000, net: -16600 },
  financing: { inflows: 0, outflows: -12000, net: -12000 },
  netChange: 7400,
}

const yoyComparison = [
  { metric: 'Revenue', current: 148500, previous: 132000, change: 12.5 },
  { metric: 'Expenses', current: 112500, previous: 108000, change: 4.2 },
  { metric: 'Net Income', current: 36000, previous: 24000, change: 50.0 },
  { metric: 'Savings Rate', current: 24.2, previous: 18.2, change: 33.0 },
]

const mainTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'budgets', label: 'Budgets' },
  { id: 'invoices', label: 'Invoices' },
  { id: 'reports', label: 'Reports' },
]

const txnFilterTabs = ['All', 'Income', 'Expense', 'Transfer']

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function fmt(n) {
  const abs = Math.abs(n)
  const str = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return n < 0 ? `-$${str}` : `$${str}`
}

function fmtShort(n) {
  const abs = Math.abs(n)
  if (abs >= 1000000) return `${n < 0 ? '-' : ''}$${(abs / 1000000).toFixed(1)}M`
  if (abs >= 1000) return `${n < 0 ? '-' : ''}$${(abs / 1000).toFixed(1)}K`
  return fmt(n)
}

function statusVariant(s) {
  const map = { paid: 'success', pending: 'warning', overdue: 'error', draft: 'secondary' }
  return map[s] || 'default'
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [activeSidebar, setActiveSidebar] = useState('dashboard')
  const [txnFilter, setTxnFilter] = useState('All')
  const [txnSearch, setTxnSearch] = useState('')

  const filteredTransactions = fullTransactions.filter(t => {
    const matchFilter = txnFilter === 'All'
      || (txnFilter === 'Income' && t.amount > 0 && t.category !== 'Transfer')
      || (txnFilter === 'Expense' && t.amount < 0 && t.category !== 'Transfer')
      || (txnFilter === 'Transfer' && t.category === 'Transfer')
    const matchSearch = t.desc.toLowerCase().includes(txnSearch.toLowerCase())
      || t.category.toLowerCase().includes(txnSearch.toLowerCase())
    return matchFilter && matchSearch
  })

  const totalBudget = budgets.reduce((s, b) => s + b.budget, 0)
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)
  const overBudgetItems = budgets.filter(b => b.spent > b.budget)

  const invoiceOutstanding = invoices.filter(i => i.status === 'pending' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0)
  const invoiceOverdue = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0)
  const invoicePaidMonth = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)

  const totalSpendingPercent = spendingCategories.reduce((sum, c) => sum + c.percent, 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* ---- Sidebar ---- */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <CircleDollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold font-display tracking-tight">FinanceHub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {sidebarSections.map((section) => (
            <div key={section.heading}>
              <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{section.heading}</p>
              <div className="space-y-0.5">
                {section.items.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    onClick={() => setActiveSidebar(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeSidebar === id
                        ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span className="flex-1 text-left">{label}</span>
                    {activeSidebar === id && <ChevronRight className="w-4 h-4 opacity-50" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex@company.com</p>
            </div>
            <LogOut className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 flex-shrink-0" />
          </div>
        </div>
      </aside>

      {/* ---- Main content ---- */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold font-display hidden sm:block">Financial Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Finance Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your finances, track spending, and monitor investments</p>
          </div>

          {/* Main Tabs */}
          <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />

          {/* ============ OVERVIEW TAB ============ */}
          <TabContent id="overview" active={activeTab}>
            <div className="space-y-6">
              {/* Account Balance Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {accountCards.map((acct) => (
                  <Card key={acct.label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{acct.label}</p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{acct.number}</p>
                        </div>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${acct.color} flex items-center justify-center shadow-sm`}>
                          <acct.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <p className="text-2xl font-bold font-display">{fmt(acct.value)}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {acct.up ? (
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <ArrowDownRight className="w-3.5 h-3.5 text-red-500" />
                        )}
                        <span className={`text-xs font-medium ${acct.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                          {acct.trend} this month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Net Worth Trend */}
                <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="font-display">Net Worth Trend</CardTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">12-month performance</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold font-display">{fmtShort(1354270)}</p>
                        <div className="flex items-center gap-1 justify-end">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">+14.8% YTD</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <AreaChart data={netWorthTrend} height={140} color="#14b8a6" />
                  </CardContent>
                </Card>

                {/* Spending by Category */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Spending by Category</CardTitle>
                    <p className="text-sm text-slate-500 dark:text-slate-400">This month</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <DonutChart
                        value={totalSpent}
                        max={totalBudget}
                        size={100}
                        strokeWidth={10}
                        color="#14b8a6"
                        trackColor="hsl(var(--muted))"
                        label={fmtShort(totalSpent)}
                        sublabel="of budget"
                      />
                    </div>
                    <div className="space-y-2.5">
                      {spendingCategories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                            <span className="text-slate-600 dark:text-slate-400">{cat.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cat.percent}%</span>
                            <span className="text-xs text-slate-400 dark:text-slate-500">{fmt(cat.amount)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Income vs Expense Bar Chart */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-display">Income vs Expenses</CardTitle>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">6-month comparison</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-teal-500" />
                        <span className="text-slate-500 dark:text-slate-400">Income</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-red-400" />
                        <span className="text-slate-500 dark:text-slate-400">Expenses</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <BarChart data={incomeVsExpense} height={130} barWidth={18} gap={4} />
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Recent Transactions</CardTitle>
                    <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab('transactions')}>
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {recentTransactions.map((txn, i) => (
                      <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-100 dark:border-slate-800/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-lg px-2 -mx-2 transition-colors">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${txn.isIncome ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                          <txn.icon className={`w-4 h-4 ${txn.isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{txn.merchant}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{txn.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className={`text-sm font-semibold ${txn.isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                            {txn.isIncome ? '+' : ''}{fmt(txn.amount)}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{txn.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============ TRANSACTIONS TAB ============ */}
          <TabContent id="transactions" active={activeTab}>
            <div className="space-y-6">
              {/* Search + Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={txnSearch}
                    onChange={(e) => setTxnSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                  {txnFilterTabs.map((f) => (
                    <button
                      key={f}
                      onClick={() => setTxnFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        txnFilter === f
                          ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Summary Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Total Income</p>
                    <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400 mt-1">$9,567.30</p>
                    <p className="text-xs text-slate-400 mt-1">3 deposits this month</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Total Expenses</p>
                    <p className="text-xl font-bold font-display text-red-600 dark:text-red-400 mt-1">$3,533.72</p>
                    <p className="text-xs text-slate-400 mt-1">9 transactions this month</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Net Cash Flow</p>
                    <p className="text-xl font-bold font-display text-teal-600 dark:text-teal-400 mt-1">+$6,033.58</p>
                    <p className="text-xs text-slate-400 mt-1">Positive trend</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Description</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Account</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((txn, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">{txn.date}</td>
                            <td className="py-3 px-4 font-medium">{txn.desc}</td>
                            <td className="py-3 px-4 hidden sm:table-cell">
                              <Badge variant={txn.amount > 0 ? 'success' : txn.category === 'Transfer' ? 'info' : 'secondary'}>
                                {txn.category}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-xs hidden md:table-cell">{txn.account}</td>
                            <td className={`py-3 px-4 text-right font-semibold whitespace-nowrap ${txn.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                              {txn.amount > 0 ? '+' : ''}{fmt(txn.amount)}
                            </td>
                            <td className="py-3 px-4 text-right text-slate-500 dark:text-slate-400 hidden lg:table-cell">{fmt(txn.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredTransactions.length === 0 && (
                    <div className="py-12 text-center text-slate-400 dark:text-slate-500">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No transactions match your filters</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============ BUDGETS TAB ============ */}
          <TabContent id="budgets" active={activeTab}>
            <div className="space-y-6">
              {/* Total Budget Summary */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Total Budget</p>
                    <p className="text-xl font-bold font-display mt-1">{fmt(totalBudget)}</p>
                    <p className="text-xs text-slate-400 mt-1">Monthly allocation</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Total Spent</p>
                    <p className={`text-xl font-bold font-display mt-1 ${totalSpent > totalBudget ? 'text-red-600 dark:text-red-400' : 'text-teal-600 dark:text-teal-400'}`}>
                      {fmt(totalSpent)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{Math.round((totalSpent / totalBudget) * 100)}% of budget used</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Remaining</p>
                    <p className={`text-xl font-bold font-display mt-1 ${totalBudget - totalSpent < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {fmt(totalBudget - totalSpent)}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">{totalBudget - totalSpent < 0 ? 'Over budget' : 'Under budget'}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Over-budget alerts */}
              {overBudgetItems.length > 0 && (
                <Card className="border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-700 dark:text-red-400">Over-Budget Alert</p>
                        <p className="text-sm text-red-600 dark:text-red-400/80 mt-1">
                          {overBudgetItems.map(b => `${b.name} (${fmt(b.spent - b.budget)} over)`).join(', ')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Budget Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {budgets.map((budget) => {
                  const pct = Math.round((budget.spent / budget.budget) * 100)
                  const over = budget.spent > budget.budget
                  const remaining = budget.budget - budget.spent
                  return (
                    <Card key={budget.name} className={`border-slate-200 dark:border-slate-800 ${over ? 'ring-1 ring-red-200 dark:ring-red-900/50' : ''}`}>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${over ? 'bg-red-100 dark:bg-red-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                              <budget.icon className={`w-4 h-4 ${over ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{budget.name}</p>
                              {over && <Badge variant="error" className="mt-0.5 text-[10px] px-1.5 py-0">Over</Badge>}
                            </div>
                          </div>
                          <span className={`text-xs font-semibold ${over ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {pct}%
                          </span>
                        </div>
                        <Progress
                          value={budget.spent}
                          max={budget.budget}
                          size="md"
                          color={over ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : budget.color}
                        />
                        <div className="flex items-center justify-between mt-3 text-xs">
                          <span className="text-slate-500 dark:text-slate-400">
                            {fmt(budget.spent)} of {fmt(budget.budget)}
                          </span>
                          <span className={over ? 'text-red-600 dark:text-red-400 font-medium' : 'text-emerald-600 dark:text-emerald-400'}>
                            {over ? `${fmt(Math.abs(remaining))} over` : `${fmt(remaining)} left`}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Overall Progress */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base">Overall Budget Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={totalSpent} max={totalBudget} size="lg" color={totalSpent > totalBudget ? 'bg-red-500' : 'bg-teal-500'} />
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      {fmt(totalSpent)} spent of {fmt(totalBudget)} budgeted
                    </span>
                    <span className="font-semibold">{Math.round((totalSpent / totalBudget) * 100)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============ INVOICES TAB ============ */}
          <TabContent id="invoices" active={activeTab}>
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Total Outstanding</p>
                    <p className="text-xl font-bold font-display text-amber-600 dark:text-amber-400 mt-1">{fmt(invoiceOutstanding)}</p>
                    <p className="text-xs text-slate-400 mt-1">{invoices.filter(i => i.status === 'pending' || i.status === 'overdue').length} invoices pending</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Overdue Amount</p>
                    <p className="text-xl font-bold font-display text-red-600 dark:text-red-400 mt-1">{fmt(invoiceOverdue)}</p>
                    <p className="text-xs text-slate-400 mt-1">{invoices.filter(i => i.status === 'overdue').length} invoice overdue</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Paid This Month</p>
                    <p className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400 mt-1">{fmt(invoicePaidMonth)}</p>
                    <p className="text-xs text-slate-400 mt-1">{invoices.filter(i => i.status === 'paid').length} invoices collected</p>
                  </CardContent>
                </Card>
              </div>

              {/* Invoice Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-display">All Invoices</h3>
                <Button size="sm" className="text-xs">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Invoice
                </Button>
              </div>

              {/* Invoice Table */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Invoice #</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Client</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">Issued</th>
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">Due Date</th>
                          <th className="text-center py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv) => (
                          <tr key={inv.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-4">
                              <span className="font-mono text-xs font-medium text-teal-600 dark:text-teal-400">{inv.id}</span>
                            </td>
                            <td className="py-3 px-4 font-medium">{inv.client}</td>
                            <td className="py-3 px-4 text-right font-semibold">{fmt(inv.amount)}</td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden sm:table-cell">{inv.issued}</td>
                            <td className="py-3 px-4 text-slate-500 dark:text-slate-400 hidden md:table-cell">{inv.due}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={statusVariant(inv.status)}>
                                {inv.status.charAt(0).toUpperCase() + inv.status.slice(1)}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============ REPORTS TAB ============ */}
          <TabContent id="reports" active={activeTab}>
            <div className="space-y-6">
              {/* Export Buttons */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold font-display">Financial Reports</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3.5 h-3.5 mr-1.5" /> Export PDF
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <FileText className="w-3.5 h-3.5 mr-1.5" /> Export CSV
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* P&L Summary */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Profit & Loss Summary</CardTitle>
                    <p className="text-xs text-slate-500 dark:text-slate-400">February 2026</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                        <span className="text-sm font-medium">Revenue</span>
                        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{fmt(pnlData.revenue)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Cost of Goods Sold</span>
                        <span className="text-sm text-red-600 dark:text-red-400">-{fmt(pnlData.cogs)}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b-2 border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold">Gross Profit</span>
                        <span className="text-sm font-bold">{fmt(pnlData.grossProfit)}</span>
                      </div>
                      <div className="pt-1 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Operating Expenses</p>
                        {Object.entries(pnlData.operatingExpenses).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between py-1.5">
                            <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">{key}</span>
                            <span className="text-sm">{fmt(val)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-slate-800/50">
                        <span className="text-sm text-slate-500 dark:text-slate-400">Total Operating Expenses</span>
                        <span className="text-sm font-medium">-{fmt(pnlData.totalOpex)}</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 -mx-6 px-6 rounded-b-lg">
                        <span className="text-base font-bold">Net Income</span>
                        <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{fmt(pnlData.netIncome)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cash Flow Statement */}
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardHeader>
                    <CardTitle className="font-display text-base">Cash Flow Statement</CardTitle>
                    <p className="text-xs text-slate-500 dark:text-slate-400">February 2026</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Operating */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Operating Activities</p>
                        <div className="space-y-2 pl-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Inflows</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{fmt(cashFlowStatement.operating.inflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Outflows</span>
                            <span className="text-red-600 dark:text-red-400">{fmt(cashFlowStatement.operating.outflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium border-t border-slate-100 dark:border-slate-800/50 pt-2">
                            <span>Net Operating</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{fmt(cashFlowStatement.operating.net)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Investing */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Investing Activities</p>
                        <div className="space-y-2 pl-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Inflows</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{fmt(cashFlowStatement.investing.inflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Outflows</span>
                            <span className="text-red-600 dark:text-red-400">{fmt(cashFlowStatement.investing.outflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium border-t border-slate-100 dark:border-slate-800/50 pt-2">
                            <span>Net Investing</span>
                            <span className="text-red-600 dark:text-red-400">{fmt(cashFlowStatement.investing.net)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Financing */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Financing Activities</p>
                        <div className="space-y-2 pl-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Inflows</span>
                            <span>{fmt(cashFlowStatement.financing.inflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Cash Outflows</span>
                            <span className="text-red-600 dark:text-red-400">{fmt(cashFlowStatement.financing.outflows)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium border-t border-slate-100 dark:border-slate-800/50 pt-2">
                            <span>Net Financing</span>
                            <span className="text-red-600 dark:text-red-400">{fmt(cashFlowStatement.financing.net)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Net Change */}
                      <div className="flex items-center justify-between py-3 border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 -mx-6 px-6 rounded-b-lg">
                        <span className="text-base font-bold">Net Cash Change</span>
                        <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{fmt(cashFlowStatement.netChange)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Year-over-Year Comparison */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display text-base">Year-over-Year Comparison</CardTitle>
                  <p className="text-xs text-slate-500 dark:text-slate-400">February 2026 vs February 2025</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Metric</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Current Year</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Previous Year</th>
                          <th className="text-right py-3 px-4 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yoyComparison.map((row) => {
                          const isCurrency = row.metric !== 'Savings Rate'
                          return (
                            <tr key={row.metric} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                              <td className="py-3 px-4 font-medium">{row.metric}</td>
                              <td className="py-3 px-4 text-right font-semibold">
                                {isCurrency ? fmt(row.current) : `${row.current}%`}
                              </td>
                              <td className="py-3 px-4 text-right text-slate-500 dark:text-slate-400">
                                {isCurrency ? fmt(row.previous) : `${row.previous}%`}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center gap-1 justify-end">
                                  {row.metric === 'Expenses' ? (
                                    <ArrowUpRight className="w-3.5 h-3.5 text-red-500" />
                                  ) : (
                                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                                  )}
                                  <span className={`text-sm font-semibold ${
                                    row.metric === 'Expenses'
                                      ? 'text-red-600 dark:text-red-400'
                                      : 'text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                    +{row.change}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Key Financial Ratios */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <DonutChart
                      value={71.5}
                      max={100}
                      size={72}
                      strokeWidth={7}
                      color="#14b8a6"
                      trackColor="hsl(var(--muted))"
                      label="71.5%"
                      className="mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">Gross Margin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Target: 70%</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <DonutChart
                      value={24.2}
                      max={100}
                      size={72}
                      strokeWidth={7}
                      color="#6366f1"
                      trackColor="hsl(var(--muted))"
                      label="24.2%"
                      className="mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">Net Margin</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Target: 20%</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <DonutChart
                      value={33.9}
                      max={100}
                      size={72}
                      strokeWidth={7}
                      color="#f59e0b"
                      trackColor="hsl(var(--muted))"
                      label="33.9%"
                      className="mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">Savings Rate</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Target: 30%</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-800">
                  <CardContent className="p-4 text-center">
                    <DonutChart
                      value={1.32}
                      max={3}
                      size={72}
                      strokeWidth={7}
                      color="#ec4899"
                      trackColor="hsl(var(--muted))"
                      label="1.32"
                      className="mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">Current Ratio</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Healthy: &gt;1.0</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-right" />
    </div>
  )
}

export default App
