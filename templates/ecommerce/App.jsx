import { useState } from 'react'
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3,
  Settings, Tag, Megaphone, Search, Bell, ChevronDown, Plus,
  TrendingUp, TrendingDown, DollarSign, ShoppingBag, Eye,
  ArrowUpRight, ArrowDownRight, Filter, MoreHorizontal,
  ChevronRight, LogOut, CreditCard, Truck, Star, RefreshCw
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
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const salesTrendData = [
  { value: 3200, label: 'W1' }, { value: 4100, label: '' }, { value: 3800, label: '' },
  { value: 5200, label: 'W2' }, { value: 4600, label: '' }, { value: 5800, label: '' },
  { value: 6200, label: 'W3' }, { value: 5400, label: '' }, { value: 7100, label: '' },
  { value: 6800, label: 'W4' }, { value: 8200, label: '' }, { value: 7600, label: '' },
]

const revenueSparkline = [42, 48, 35, 52, 61, 55, 68, 72, 65, 78, 82, 88, 79, 92]
const ordersSparkline = [22, 28, 25, 32, 35, 30, 38, 42, 36, 45, 40, 48, 44, 52]
const aovSparkline = [65, 70, 68, 72, 75, 71, 78, 80, 76, 82, 79, 84, 81, 80]
const abandonSparkline = [75, 72, 74, 70, 68, 71, 66, 69, 67, 65, 68, 64, 66, 68]

const topProducts = [
  { name: 'MacBook Pro 14" M3', units: 342, revenue: 856580, color: 'bg-blue-500' },
  { name: 'iPhone 15 Pro Max', units: 528, revenue: 633072, color: 'bg-indigo-500' },
  { name: 'AirPods Pro 2nd Gen', units: 891, revenue: 222309, color: 'bg-violet-500' },
  { name: 'Sony WH-1000XM5', units: 467, revenue: 163345, color: 'bg-purple-500' },
  { name: 'Samsung Galaxy S24 Ultra', units: 305, revenue: 365695, color: 'bg-fuchsia-500' },
]

const categoryData = [
  { name: 'Electronics', value: 42, color: '#3b82f6' },
  { name: 'Clothing', value: 24, color: '#8b5cf6' },
  { name: 'Home', value: 18, color: '#f59e0b' },
  { name: 'Sports', value: 10, color: '#10b981' },
  { name: 'Beauty', value: 6, color: '#ec4899' },
]

const recentOrders = [
  { id: '#ORD-7291', customer: 'Emma Watson', total: 349.99, status: 'Shipped', time: '12 min ago' },
  { id: '#ORD-7290', customer: 'James Chen', total: 1249.00, status: 'Processing', time: '28 min ago' },
  { id: '#ORD-7289', customer: 'Sofia Rodriguez', total: 89.50, status: 'Delivered', time: '1 hr ago' },
  { id: '#ORD-7288', customer: 'Liam Patel', total: 429.00, status: 'Pending', time: '2 hr ago' },
  { id: '#ORD-7287', customer: 'Olivia Brown', total: 199.99, status: 'Shipped', time: '3 hr ago' },
]

const products = [
  { id: 1, name: 'MacBook Pro 14" M3', sku: 'MBP-14-M3', category: 'Electronics', price: 2499.00, stock: 48, status: 'Active', color: 'bg-slate-700' },
  { id: 2, name: 'iPhone 15 Pro Max', sku: 'IPH-15PM', category: 'Electronics', price: 1199.00, stock: 124, status: 'Active', color: 'bg-blue-600' },
  { id: 3, name: 'AirPods Pro 2nd Gen', sku: 'APP-2G', category: 'Electronics', price: 249.00, stock: 312, status: 'Active', color: 'bg-gray-200' },
  { id: 4, name: 'Nike Air Max 90', sku: 'NK-AM90', category: 'Clothing', price: 129.99, stock: 87, status: 'Active', color: 'bg-red-500' },
  { id: 5, name: 'Levi\'s 501 Original', sku: 'LV-501', category: 'Clothing', price: 69.50, stock: 0, status: 'Out of Stock', color: 'bg-indigo-700' },
  { id: 6, name: 'Dyson V15 Detect', sku: 'DY-V15', category: 'Home', price: 749.99, stock: 23, status: 'Active', color: 'bg-purple-600' },
  { id: 7, name: 'Sony WH-1000XM5', sku: 'SN-XM5', category: 'Electronics', price: 349.99, stock: 156, status: 'Active', color: 'bg-stone-800' },
  { id: 8, name: 'Patagonia Better Sweater', sku: 'PT-BS', category: 'Clothing', price: 139.00, stock: 5, status: 'Draft', color: 'bg-sky-600' },
  { id: 9, name: 'Yeti Rambler 26oz', sku: 'YT-R26', category: 'Home', price: 40.00, stock: 445, status: 'Active', color: 'bg-teal-500' },
  { id: 10, name: 'Theragun Elite', sku: 'TG-ELT', category: 'Sports', price: 399.00, stock: 34, status: 'Active', color: 'bg-emerald-600' },
  { id: 11, name: 'La Mer Moisturizer', sku: 'LM-MST', category: 'Beauty', price: 190.00, stock: 0, status: 'Out of Stock', color: 'bg-amber-200' },
  { id: 12, name: 'Samsung Galaxy S24 Ultra', sku: 'SG-S24U', category: 'Electronics', price: 1299.99, stock: 67, status: 'Active', color: 'bg-violet-600' },
  { id: 13, name: 'Adidas Ultraboost 23', sku: 'AD-UB23', category: 'Sports', price: 189.99, stock: 92, status: 'Draft', color: 'bg-black' },
]

const orders = [
  { id: '#ORD-7291', customer: 'Emma Watson', date: '2026-02-25', items: 3, total: 349.99, status: 'Shipped', payment: 'Visa' },
  { id: '#ORD-7290', customer: 'James Chen', date: '2026-02-25', items: 1, total: 1249.00, status: 'Processing', payment: 'Mastercard' },
  { id: '#ORD-7289', customer: 'Sofia Rodriguez', date: '2026-02-24', items: 2, total: 89.50, status: 'Delivered', payment: 'PayPal' },
  { id: '#ORD-7288', customer: 'Liam Patel', date: '2026-02-24', items: 4, total: 429.00, status: 'Pending', payment: 'Visa' },
  { id: '#ORD-7287', customer: 'Olivia Brown', date: '2026-02-24', items: 1, total: 199.99, status: 'Shipped', payment: 'Apple Pay' },
  { id: '#ORD-7286', customer: 'Noah Kim', date: '2026-02-23', items: 2, total: 578.00, status: 'Delivered', payment: 'Mastercard' },
  { id: '#ORD-7285', customer: 'Ava Johnson', date: '2026-02-23', items: 5, total: 312.50, status: 'Returned', payment: 'Visa' },
  { id: '#ORD-7284', customer: 'Ethan Garcia', date: '2026-02-22', items: 1, total: 2499.00, status: 'Delivered', payment: 'PayPal' },
  { id: '#ORD-7283', customer: 'Mia Thompson', date: '2026-02-22', items: 3, total: 167.97, status: 'Processing', payment: 'Apple Pay' },
  { id: '#ORD-7282', customer: 'Lucas Martinez', date: '2026-02-21', items: 2, total: 739.98, status: 'Shipped', payment: 'Visa' },
  { id: '#ORD-7281', customer: 'Isabella Davis', date: '2026-02-21', items: 1, total: 129.99, status: 'Pending', payment: 'Mastercard' },
  { id: '#ORD-7280', customer: 'Mason Wilson', date: '2026-02-20', items: 6, total: 445.94, status: 'Delivered', payment: 'PayPal' },
]

const customers = [
  { id: 1, name: 'Emma Watson', email: 'emma.watson@email.com', orders: 24, spent: 4820.50, lastOrder: '2026-02-25', tier: 'Platinum', avatar: 'EW' },
  { id: 2, name: 'James Chen', email: 'james.chen@email.com', orders: 18, spent: 3540.00, lastOrder: '2026-02-25', tier: 'Gold', avatar: 'JC' },
  { id: 3, name: 'Sofia Rodriguez', email: 'sofia.r@email.com', orders: 31, spent: 6210.75, lastOrder: '2026-02-24', tier: 'Platinum', avatar: 'SR' },
  { id: 4, name: 'Liam Patel', email: 'liam.patel@email.com', orders: 7, spent: 1290.00, lastOrder: '2026-02-24', tier: 'Silver', avatar: 'LP' },
  { id: 5, name: 'Olivia Brown', email: 'olivia.b@email.com', orders: 12, spent: 2180.30, lastOrder: '2026-02-24', tier: 'Gold', avatar: 'OB' },
  { id: 6, name: 'Noah Kim', email: 'noah.kim@email.com', orders: 3, spent: 578.00, lastOrder: '2026-02-23', tier: 'Bronze', avatar: 'NK' },
  { id: 7, name: 'Ava Johnson', email: 'ava.j@email.com', orders: 15, spent: 2875.25, lastOrder: '2026-02-23', tier: 'Gold', avatar: 'AJ' },
  { id: 8, name: 'Ethan Garcia', email: 'ethan.g@email.com', orders: 9, spent: 4120.00, lastOrder: '2026-02-22', tier: 'Silver', avatar: 'EG' },
]

const acquisitionData = [
  { value: 120, label: 'Sep' }, { value: 145, label: 'Oct' },
  { value: 168, label: 'Nov' }, { value: 195, label: 'Dec' },
  { value: 210, label: 'Jan' }, { value: 248, label: 'Feb' },
]

const monthlyRevenueData = [
  { value: 42000, label: 'Sep', color: '#6366f1' },
  { value: 51000, label: 'Oct', color: '#6366f1' },
  { value: 48000, label: 'Nov', color: '#6366f1' },
  { value: 72000, label: 'Dec', color: '#8b5cf6' },
  { value: 55000, label: 'Jan', color: '#6366f1' },
  { value: 68000, label: 'Feb', color: '#10b981' },
]

const trafficSources = [
  { source: 'Organic Search', visitors: 12480, pct: 38, color: 'bg-blue-500' },
  { source: 'Direct', visitors: 8240, pct: 25, color: 'bg-indigo-500' },
  { source: 'Social Media', visitors: 5890, pct: 18, color: 'bg-violet-500' },
  { source: 'Email Campaign', visitors: 3940, pct: 12, color: 'bg-amber-500' },
  { source: 'Referral', visitors: 2310, pct: 7, color: 'bg-emerald-500' },
]

const funnelSteps = [
  { label: 'Store Visits', value: 32860, pct: 100 },
  { label: 'Added to Cart', value: 9858, pct: 30 },
  { label: 'Reached Checkout', value: 5272, pct: 16 },
  { label: 'Completed Purchase', value: 3286, pct: 10 },
]

const productPerformance = [
  { name: 'MacBook Pro 14"', views: 8420, conversion: 4.1, revenue: 856580, trend: 'up' },
  { name: 'iPhone 15 Pro Max', views: 12300, conversion: 4.3, revenue: 633072, trend: 'up' },
  { name: 'AirPods Pro 2', views: 9100, conversion: 9.8, revenue: 222309, trend: 'up' },
  { name: 'Sony WH-1000XM5', views: 6200, conversion: 7.5, revenue: 163345, trend: 'down' },
  { name: 'Galaxy S24 Ultra', views: 5800, conversion: 5.3, revenue: 365695, trend: 'up' },
]

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

const fmt = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)
const fmtFull = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n)

function statusBadge(status) {
  const map = {
    Active: 'success', Shipped: 'info', Delivered: 'success', Processing: 'warning',
    Pending: 'secondary', Returned: 'error', Draft: 'secondary', 'Out of Stock': 'error',
  }
  return <Badge variant={map[status] || 'default'}>{status}</Badge>
}

function tierBadge(tier) {
  const map = { Bronze: 'secondary', Silver: 'info', Gold: 'warning', Platinum: 'success' }
  return <Badge variant={map[tier] || 'default'}>{tier}</Badge>
}

const sidebarNav = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, section: null },
  { id: 'products', label: 'Products', icon: Package, section: 'Catalog' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, section: 'Catalog' },
  { id: 'customers', label: 'Customers', icon: Users, section: null },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, section: null },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, section: null },
  { id: 'settings', label: 'Settings', icon: Settings, section: null },
]

/* ------------------------------------------------------------------ */
/*  SIDEBAR                                                            */
/* ------------------------------------------------------------------ */

function Sidebar({ activeTab, onTabChange }) {
  let lastSection = null
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-screen sticky top-0 shrink-0">
      <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <ShoppingBag className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ShopAdmin</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {sidebarNav.map((item) => {
          const showSection = item.section && item.section !== lastSection
          if (item.section) lastSection = item.section
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <div key={item.id}>
              {showSection && (
                <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">{item.section}</p>
              )}
              <button
                onClick={() => {
                  if (['dashboard', 'products', 'orders', 'customers', 'analytics'].includes(item.id)) {
                    onTabChange(item.id)
                  }
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                {item.label}
                {item.id === 'orders' && (
                  <span className="ml-auto text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">3</span>
                )}
              </button>
            </div>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            JW
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Joel Wembo</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Store Admin</p>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------------ */
/*  TOP BAR                                                            */
/* ------------------------------------------------------------------ */

function TopBar({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 h-16">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold">ShopAdmin</span>
          </div>
          <div className="relative hidden sm:block">
            <Input
              placeholder="Search orders, products, customers..."
              className="w-72 lg:w-96 pl-10 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg text-sm h-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="hidden lg:flex items-center gap-2 pl-2 ml-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              JW
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="flex lg:hidden items-center gap-1 ml-2">
            {['dashboard', 'products', 'orders', 'customers', 'analytics'].map((tab) => {
              const icons = { dashboard: LayoutDashboard, products: Package, orders: ShoppingCart, customers: Users, analytics: BarChart3 }
              const Icon = icons[tab]
              return (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab)}
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === tab ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD TAB                                                      */
/* ------------------------------------------------------------------ */

function DashboardTab() {
  const kpis = [
    { title: 'Revenue Today', value: '$12,480', change: '+14.2%', up: true, data: revenueSparkline, color: '#10b981', icon: DollarSign },
    { title: 'Orders', value: '156', change: '+8.1%', up: true, data: ordersSparkline, color: '#6366f1', icon: ShoppingCart },
    { title: 'Avg Order Value', value: '$79.90', change: '+3.4%', up: true, data: aovSparkline, color: '#8b5cf6', icon: CreditCard },
    { title: 'Cart Abandonment', value: '68%', change: '-2.1%', up: false, data: abandonSparkline, color: '#f59e0b', icon: ShoppingBag },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome back. Here is your store overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-sm gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
          <Button className="h-9 text-sm bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
            <Plus className="w-3.5 h-3.5" /> New Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.title} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold font-display">{kpi.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3">{kpi.title}</p>
                <Sparkline data={kpi.data} color={kpi.color} height={28} fill />
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Sales Trend</CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">Last 30 days</span>
            </div>
          </CardHeader>
          <CardContent>
            <AreaChart data={salesTrendData} height={180} color="#6366f1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-2">
              <DonutChart value={42} max={100} size={120} strokeWidth={14} color="#3b82f6" label="42%" sublabel="Electronics" />
            </div>
            <div className="space-y-2.5 mt-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Top Selling Products</CardTitle>
              <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">View all</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((prod, i) => (
                <div key={prod.name} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-4">{i + 1}</span>
                  <div className={`w-10 h-10 rounded-lg ${prod.color} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{prod.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{fmtNum(prod.units)} units sold</p>
                  </div>
                  <span className="text-sm font-semibold">{fmt(prod.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">View all</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Package className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{order.id}</p>
                      {statusBadge(order.status)}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{order.customer} - {order.time}</p>
                  </div>
                  <span className="text-sm font-semibold">{fmtFull(order.total)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  PRODUCTS TAB                                                       */
/* ------------------------------------------------------------------ */

function ProductsTab() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Active', 'Draft', 'Out of Stock']
  const filtered = filter === 'All' ? products : products.filter((p) => p.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Products</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{products.length} products in your catalog</p>
        </div>
        <Button className="h-9 text-sm bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Plus className="w-3.5 h-3.5" /> Add Product
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    filter === f
                      ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {f}
                  <span className="ml-1 text-[10px]">
                    ({f === 'All' ? products.length : products.filter((p) => p.status === f).length})
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <Filter className="w-3 h-3" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-5 py-3">Product</th>
                  <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">SKU</th>
                  <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Category</th>
                  <th className="text-right font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Price</th>
                  <th className="text-right font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Stock</th>
                  <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Status</th>
                  <th className="text-center font-medium text-slate-500 dark:text-slate-400 px-3 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${prod.color} shrink-0`} />
                        <span className="font-medium">{prod.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-500 dark:text-slate-400 font-mono text-xs">{prod.sku}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-slate-400">{prod.category}</td>
                    <td className="px-3 py-3 text-right font-semibold">{fmtFull(prod.price)}</td>
                    <td className="px-3 py-3 text-right">
                      <span className={prod.stock === 0 ? 'text-red-500 font-semibold' : prod.stock < 10 ? 'text-amber-500 font-semibold' : ''}>
                        {fmtNum(prod.stock)}
                      </span>
                    </td>
                    <td className="px-3 py-3">{statusBadge(prod.status)}</td>
                    <td className="px-3 py-3 text-center">
                      <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <span>Showing {filtered.length} of {products.length} products</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1.5 rounded bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-medium">1</button>
              <button className="px-2.5 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">2</button>
              <button className="px-2.5 py-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ORDERS TAB                                                         */
/* ------------------------------------------------------------------ */

function OrdersTab() {
  const [filter, setFilter] = useState('All')
  const pills = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered']
  const filtered = filter === 'All' ? orders : orders.filter((o) => o.status === filter)

  const statusCounts = {
    Pending: orders.filter((o) => o.status === 'Pending').length,
    Processing: orders.filter((o) => o.status === 'Processing').length,
    Shipped: orders.filter((o) => o.status === 'Shipped').length,
    Delivered: orders.filter((o) => o.status === 'Delivered').length,
    Returned: orders.filter((o) => o.status === 'Returned').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Orders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{orders.length} total orders</p>
        </div>
        <Button className="h-9 text-sm bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
          <Plus className="w-3.5 h-3.5" /> Create Order
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                {pills.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilter(p)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                      filter === p
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-5 py-3">Order</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Customer</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Date</th>
                      <th className="text-center font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Items</th>
                      <th className="text-right font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Total</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Status</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filtered.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-3 font-medium text-indigo-600 dark:text-indigo-400">{order.id}</td>
                        <td className="px-3 py-3">{order.customer}</td>
                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{order.date}</td>
                        <td className="px-3 py-3 text-center">{order.items}</td>
                        <td className="px-3 py-3 text-right font-semibold">{fmtFull(order.total)}</td>
                        <td className="px-3 py-3">{statusBadge(order.status)}</td>
                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{order.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                Showing {filtered.length} of {orders.length} orders
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-2">
                <DonutChart value={statusCounts.Delivered} max={orders.length} size={100} strokeWidth={12} color="#10b981" label={statusCounts.Delivered.toString()} sublabel="Delivered" />
              </div>
              <div className="space-y-2.5 mt-4">
                {Object.entries(statusCounts).map(([status, count]) => {
                  const colors = { Pending: '#94a3b8', Processing: '#f59e0b', Shipped: '#3b82f6', Delivered: '#10b981', Returned: '#ef4444' }
                  return (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[status] }} />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{status}</span>
                      </div>
                      <span className="text-xs font-semibold">{count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Revenue</p>
                    <p className="text-lg font-bold">{fmt(orders.reduce((s, o) => s + o.total, 0))}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Avg Fulfillment</p>
                    <p className="text-lg font-bold">2.4 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CUSTOMERS TAB                                                      */
/* ------------------------------------------------------------------ */

function CustomersTab() {
  const topCustomers = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Customers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{customers.length} registered customers</p>
        </div>
        <Button variant="outline" className="h-9 text-sm gap-2">
          <Filter className="w-3.5 h-3.5" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-5 py-3">Customer</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Email</th>
                      <th className="text-center font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Orders</th>
                      <th className="text-right font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Total Spent</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Last Order</th>
                      <th className="text-left font-medium text-slate-500 dark:text-slate-400 px-3 py-3">Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {customers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {cust.avatar}
                            </div>
                            <span className="font-medium">{cust.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{cust.email}</td>
                        <td className="px-3 py-3 text-center">{cust.orders}</td>
                        <td className="px-3 py-3 text-right font-semibold">{fmtFull(cust.spent)}</td>
                        <td className="px-3 py-3 text-slate-500 dark:text-slate-400">{cust.lastOrder}</td>
                        <td className="px-3 py-3">{tierBadge(cust.tier)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Customer Acquisition</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart data={acquisitionData} height={140} color="#8b5cf6" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Top Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topCustomers.map((cust, i) => (
                  <div key={cust.id} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5">
                      {i === 0 && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                      {i === 1 && <Star className="w-4 h-4 text-slate-400 fill-slate-400" />}
                      {i === 2 && <Star className="w-4 h-4 text-amber-700 fill-amber-700" />}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {cust.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{cust.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cust.orders} orders</p>
                    </div>
                    <span className="text-sm font-semibold">{fmtFull(cust.spent)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Avg LTV</p>
                  <p className="text-xl font-bold">{fmtFull(customers.reduce((s, c) => s + c.spent, 0) / customers.length)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Repeat Rate</p>
                  <p className="text-xl font-bold">72%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  ANALYTICS TAB                                                      */
/* ------------------------------------------------------------------ */

function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Detailed performance metrics for your store.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 text-sm">Last 6 months</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Monthly Revenue</CardTitle>
              <span className="text-xs text-slate-500 dark:text-slate-400">Sep 2025 - Feb 2026</span>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart data={monthlyRevenueData} height={180} barWidth={36} gap={16} />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Revenue</p>
                <p className="text-lg font-bold">{fmt(monthlyRevenueData.reduce((s, d) => s + d.value, 0))}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monthly Avg</p>
                <p className="text-lg font-bold">{fmt(monthlyRevenueData.reduce((s, d) => s + d.value, 0) / monthlyRevenueData.length)}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">+23.6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelSteps.map((step, i) => {
                const widthPct = Math.max(8, step.pct)
                const colors = ['bg-indigo-500', 'bg-violet-500', 'bg-purple-500', 'bg-emerald-500']
                return (
                  <div key={step.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{step.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold">{fmtNum(step.value)}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 w-10 text-right">{step.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full ${colors[i]} rounded-lg transition-all duration-700 flex items-center justify-end pr-2`}
                        style={{ width: `${widthPct}%` }}
                      >
                        {step.pct > 12 && <span className="text-white text-xs font-semibold">{step.pct}%</span>}
                      </div>
                    </div>
                    {i < funnelSteps.length - 1 && (
                      <div className="flex items-center gap-1 mt-1 ml-2">
                        <ArrowDownRight className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-400">
                          {Math.round((funnelSteps[i + 1].value / step.value) * 100)}% conversion to next step
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((src) => (
                <div key={src.source}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{src.source}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 dark:text-slate-400">{fmtNum(src.visitors)} visitors</span>
                      <span className="text-sm font-bold w-10 text-right">{src.pct}%</span>
                    </div>
                  </div>
                  <Progress value={src.pct} max={100} size="sm" color={src.color} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Eye className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Total Visitors</p>
                <p className="text-base font-bold">{fmtNum(trafficSources.reduce((s, t) => s + t.visitors, 0))}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Product Performance</CardTitle>
              <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium">View all</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="text-left font-medium text-slate-500 dark:text-slate-400 pb-2">Product</th>
                    <th className="text-right font-medium text-slate-500 dark:text-slate-400 pb-2">Views</th>
                    <th className="text-right font-medium text-slate-500 dark:text-slate-400 pb-2">Conv.</th>
                    <th className="text-right font-medium text-slate-500 dark:text-slate-400 pb-2">Revenue</th>
                    <th className="text-center font-medium text-slate-500 dark:text-slate-400 pb-2 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {productPerformance.map((prod) => (
                    <tr key={prod.name}>
                      <td className="py-2.5 font-medium text-sm">{prod.name}</td>
                      <td className="py-2.5 text-right text-slate-500 dark:text-slate-400">{fmtNum(prod.views)}</td>
                      <td className="py-2.5 text-right font-semibold">{prod.conversion}%</td>
                      <td className="py-2.5 text-right font-semibold">{fmt(prod.revenue)}</td>
                      <td className="py-2.5 text-center">
                        {prod.trend === 'up' ? (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-500 inline" />
                        ) : (
                          <TrendingDown className="w-3.5 h-3.5 text-red-500 inline" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const mainTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0">
          <TopBar activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="p-4 lg:p-8 max-w-[1600px] mx-auto">
            <div className="mb-6 lg:hidden">
              <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} className="overflow-x-auto" />
            </div>

            <TabContent id="dashboard" active={activeTab}>
              <DashboardTab />
            </TabContent>

            <TabContent id="products" active={activeTab}>
              <ProductsTab />
            </TabContent>

            <TabContent id="orders" active={activeTab}>
              <OrdersTab />
            </TabContent>

            <TabContent id="customers" active={activeTab}>
              <CustomersTab />
            </TabContent>

            <TabContent id="analytics" active={activeTab}>
              <AnalyticsTab />
            </TabContent>
          </main>
        </div>
      </div>

      <ThemeSwitcher />
    </div>
  )
}

export default App
