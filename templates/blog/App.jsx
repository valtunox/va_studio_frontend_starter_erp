import { useState } from 'react'
import {
  LayoutDashboard, FileText, FolderOpen, Image, MessageSquare, Search,
  Settings, TrendingUp, Eye, Users, BarChart3, Calendar, Clock, Edit3,
  Trash2, Plus, Filter, ChevronRight, ArrowUpRight, ArrowDownRight,
  Tag, Globe, Bookmark, Share2, MoreHorizontal, PenTool, Menu, X,
  Heart, Sparkles, Rss, Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { AreaChart, BarChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Posts', id: 'posts' },
  { icon: FolderOpen, label: 'Pages', id: 'pages' },
  { icon: Image, label: 'Media', id: 'media' },
  { icon: MessageSquare, label: 'Comments', id: 'comments' },
  { icon: Search, label: 'SEO', id: 'seo' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

const kpiCards = [
  { label: 'Total Posts', value: '284', change: '+12', trend: 'up', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Monthly Views', value: '124K', change: '+18.2%', trend: 'up', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Subscribers', value: '8.2K', change: '+340', trend: 'up', icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
  { label: 'Engagement', value: '4.8%', change: '-0.3%', trend: 'down', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
]

const recentPosts = [
  { title: 'Getting Started with React Server Components', author: 'Emma Wilson', date: 'Feb 24, 2026', status: 'Published', views: '3.2K' },
  { title: 'Advanced TypeScript Patterns for Large Codebases', author: 'James Lee', date: 'Feb 23, 2026', status: 'Published', views: '2.8K' },
  { title: 'Building Design Systems from Scratch', author: 'Sarah Chen', date: 'Feb 22, 2026', status: 'Draft', views: '--' },
  { title: 'Kubernetes Scaling Strategies in Production', author: 'Marcus Rivera', date: 'Feb 21, 2026', status: 'Published', views: '4.1K' },
  { title: 'The Future of AI-Assisted Development', author: 'Priya Patel', date: 'Feb 20, 2026', status: 'Scheduled', views: '--' },
]

const trafficData = [
  { label: 'Mon', value: 4200 },
  { label: 'Tue', value: 5100 },
  { label: 'Wed', value: 4800 },
  { label: 'Thu', value: 6200 },
  { label: 'Fri', value: 7100 },
  { label: 'Sat', value: 5400 },
  { label: 'Sun', value: 4900 },
]

const popularTags = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'CSS', 'DevOps',
  'AI/ML', 'Python', 'Rust', 'Docker', 'AWS', 'GraphQL',
  'Testing', 'Performance', 'Security'
]

const postTableData = [
  { id: 1, title: 'Getting Started with React Server Components', author: 'Emma Wilson', category: 'React', status: 'Published', date: 'Feb 24, 2026', views: 3240, comments: 18 },
  { id: 2, title: 'Advanced TypeScript Patterns for Large Codebases', author: 'James Lee', category: 'TypeScript', status: 'Published', date: 'Feb 23, 2026', views: 2830, comments: 24 },
  { id: 3, title: 'Building Design Systems from Scratch', author: 'Sarah Chen', category: 'Design', status: 'Draft', date: 'Feb 22, 2026', views: 0, comments: 0 },
  { id: 4, title: 'Kubernetes Scaling Strategies in Production', author: 'Marcus Rivera', category: 'DevOps', status: 'Published', date: 'Feb 21, 2026', views: 4120, comments: 31 },
  { id: 5, title: 'The Future of AI-Assisted Development', author: 'Priya Patel', category: 'AI/ML', status: 'Scheduled', date: 'Feb 25, 2026', views: 0, comments: 0 },
  { id: 6, title: 'Mastering CSS Grid and Subgrid Layouts', author: 'Emma Wilson', category: 'CSS', status: 'Published', date: 'Feb 19, 2026', views: 1980, comments: 12 },
  { id: 7, title: 'REST vs GraphQL: A Practical Comparison', author: 'James Lee', category: 'Backend', status: 'Published', date: 'Feb 18, 2026', views: 5640, comments: 42 },
  { id: 8, title: 'Docker Compose for Local Development', author: 'Marcus Rivera', category: 'DevOps', status: 'Published', date: 'Feb 17, 2026', views: 3780, comments: 27 },
  { id: 9, title: 'Web Accessibility: A Complete Checklist', author: 'Sarah Chen', category: 'Design', status: 'Draft', date: 'Feb 16, 2026', views: 0, comments: 0 },
  { id: 10, title: 'Building Real-Time Apps with WebSockets', author: 'Priya Patel', category: 'Backend', status: 'Published', date: 'Feb 15, 2026', views: 6210, comments: 38 },
  { id: 11, title: 'State Management in 2026: Zustand vs Jotai', author: 'Emma Wilson', category: 'React', status: 'Published', date: 'Feb 14, 2026', views: 4490, comments: 33 },
  { id: 12, title: 'Python FastAPI for Backend Engineers', author: 'James Lee', category: 'Backend', status: 'Scheduled', date: 'Feb 26, 2026', views: 0, comments: 0 },
]

const postFilterOptions = ['All', 'Published', 'Draft', 'Scheduled']

const categoriesData = [
  { name: 'React', postCount: 48, description: 'Components, hooks, patterns, and best practices for React development.', color: '#61DAFB' },
  { name: 'TypeScript', postCount: 36, description: 'Type safety, generics, utility types, and advanced TypeScript techniques.', color: '#3178C6' },
  { name: 'DevOps', postCount: 29, description: 'CI/CD, containers, orchestration, and infrastructure automation.', color: '#F97316' },
  { name: 'Design', postCount: 24, description: 'UI/UX principles, design systems, accessibility, and visual design.', color: '#EC4899' },
  { name: 'AI/ML', postCount: 31, description: 'Machine learning, LLMs, AI-assisted tooling, and data science.', color: '#8B5CF6' },
  { name: 'Backend', postCount: 42, description: 'APIs, databases, server architecture, and backend frameworks.', color: '#10B981' },
  { name: 'CSS', postCount: 18, description: 'Layouts, animations, responsive design, and modern CSS features.', color: '#F43F5E' },
  { name: 'Career', postCount: 15, description: 'Professional growth, interviews, mentorship, and industry trends.', color: '#F59E0B' },
]

const viewsChartData = [
  { label: 'Jan', value: 98000 },
  { label: 'Feb', value: 105000 },
  { label: 'Mar', value: 112000 },
  { label: 'Apr', value: 99000 },
  { label: 'May', value: 118000 },
  { label: 'Jun', value: 124000 },
  { label: 'Jul', value: 131000 },
  { label: 'Aug', value: 127000 },
  { label: 'Sep', value: 136000 },
  { label: 'Oct', value: 142000 },
  { label: 'Nov', value: 138000 },
  { label: 'Dec', value: 149000 },
]

const topPostsBarData = [
  { label: 'WebSockets', value: 6210, color: 'hsl(var(--primary))' },
  { label: 'REST/GQL', value: 5640, color: 'hsl(250, 80%, 60%)' },
  { label: 'Zustand', value: 4490, color: 'hsl(170, 70%, 45%)' },
  { label: 'K8s', value: 4120, color: 'hsl(30, 90%, 55%)' },
  { label: 'Docker', value: 3780, color: 'hsl(340, 75%, 55%)' },
  { label: 'RSC', value: 3240, color: 'hsl(200, 80%, 55%)' },
]

const trafficSources = [
  { source: 'Organic Search', percentage: 42, sessions: '52.1K' },
  { source: 'Social Media', percentage: 24, sessions: '29.8K' },
  { source: 'Direct', percentage: 18, sessions: '22.3K' },
  { source: 'Referral', percentage: 11, sessions: '13.6K' },
  { source: 'Email', percentage: 5, sessions: '6.2K' },
]

const readerDemographics = [
  { region: 'North America', percentage: 38 },
  { region: 'Europe', percentage: 28 },
  { region: 'Asia Pacific', percentage: 22 },
  { region: 'Latin America', percentage: 7 },
  { region: 'Other', percentage: 5 },
]

const mainTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'posts', label: 'Posts' },
  { id: 'categories', label: 'Categories' },
  { id: 'analytics', label: 'Analytics' },
]

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function statusBadge(status) {
  const map = {
    Published: 'success',
    Draft: 'secondary',
    Scheduled: 'info',
  }
  return <Badge variant={map[status] || 'secondary'}>{status}</Badge>
}

function categoryBadge(category) {
  const colors = {
    React: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
    TypeScript: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    DevOps: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
    Design: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    'AI/ML': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
    Backend: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    CSS: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
    Career: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}>
      {category}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [postFilter, setPostFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTablePosts = postTableData.filter((post) => {
    const matchesFilter = postFilter === 'All' || post.status === postFilter
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">ContentHub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeTab || (item.id === 'dashboard' && activeTab === 'analytics') || (item.id === 'posts' && activeTab === 'categories')
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'dashboard' || item.id === 'posts') setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-semibold">
              JW
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Joel Wembo</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground">
                <Menu className="w-5 h-5" />
              </button>
              <Tabs tabs={mainTabs} active={activeTab} onChange={setActiveTab} />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 pl-9 text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" /> New Post
              </Button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="p-6">

          {/* ============ DASHBOARD TAB ============ */}
          <TabContent id="dashboard" active={activeTab}>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              {kpiCards.map((kpi) => {
                const Icon = kpi.icon
                return (
                  <Card key={kpi.label} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${kpi.color}`} />
                        </div>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${kpi.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {kpi.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {kpi.change}
                        </span>
                      </div>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Posts */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-semibold text-lg">Recent Posts</h3>
                      <Button variant="ghost" size="sm" className="text-muted-foreground text-xs gap-1">
                        View All <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {recentPosts.map((post, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 last:pb-0">
                          <div className="flex-1 min-w-0 mr-4">
                            <p className="text-sm font-medium truncate hover:text-primary cursor-pointer transition-colors">{post.title}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                              <span>{post.author}</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {statusBadge(post.status)}
                            <span className="text-xs text-muted-foreground w-10 text-right">{post.views}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Traffic Trend */}
                <Card className="mt-6">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Traffic Trend</h3>
                      <span className="text-xs text-muted-foreground">Last 7 days</span>
                    </div>
                    <AreaChart data={trafficData} height={160} color="hsl(var(--primary))" />
                  </CardContent>
                </Card>
              </div>

              {/* Popular Tags Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-4">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs bg-muted/50 text-muted-foreground rounded-full hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Posts this month</span>
                        <span className="text-sm font-semibold">24</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Avg. read time</span>
                        <span className="text-sm font-semibold">6.4 min</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Comments today</span>
                        <span className="text-sm font-semibold">47</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">New subscribers</span>
                        <span className="text-sm font-semibold">128</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground">Bounce rate</span>
                        <span className="text-sm font-semibold">32.1%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabContent>

          {/* ============ POSTS TAB ============ */}
          <TabContent id="posts" active={activeTab}>
            {/* Filter bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {postFilterOptions.map((f) => (
                  <button
                    key={f}
                    onClick={() => setPostFilter(f)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      postFilter === f
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {f}
                    <span className="ml-1.5 opacity-60">
                      {f === 'All' ? postTableData.length : postTableData.filter((p) => p.status === f).length}
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-52 pl-9 text-sm"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <Button size="sm" className="gap-1.5">
                  <Plus className="w-4 h-4" /> New Post
                </Button>
              </div>
            </div>

            {/* Posts Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Author</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Category</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                        <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Date</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Views</th>
                        <th className="text-right px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Comments</th>
                        <th className="px-5 py-3 w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTablePosts.map((post) => (
                        <tr key={post.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-5 py-4">
                            <p className="text-sm font-medium hover:text-primary cursor-pointer transition-colors line-clamp-1">{post.title}</p>
                          </td>
                          <td className="px-5 py-4 hidden md:table-cell">
                            <span className="text-sm text-muted-foreground">{post.author}</span>
                          </td>
                          <td className="px-5 py-4 hidden sm:table-cell">
                            {categoryBadge(post.category)}
                          </td>
                          <td className="px-5 py-4">
                            {statusBadge(post.status)}
                          </td>
                          <td className="px-5 py-4 hidden lg:table-cell">
                            <span className="text-sm text-muted-foreground">{post.date}</span>
                          </td>
                          <td className="px-5 py-4 text-right hidden md:table-cell">
                            <span className="text-sm text-muted-foreground">{post.views > 0 ? post.views.toLocaleString() : '--'}</span>
                          </td>
                          <td className="px-5 py-4 text-right hidden lg:table-cell">
                            <span className="text-sm text-muted-foreground">{post.comments > 0 ? post.comments : '--'}</span>
                          </td>
                          <td className="px-5 py-4">
                            <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredTablePosts.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
                    <p className="text-muted-foreground">No posts match your filters</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pagination hint */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredTablePosts.length} of {postTableData.length} posts
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </TabContent>

          {/* ============ CATEGORIES TAB ============ */}
          <TabContent id="categories" active={activeTab}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">Categories</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your content categories and topics</p>
              </div>
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" /> Add Category
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categoriesData.map((cat) => (
                <Card key={cat.name} className="hover:shadow-md transition-all group cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{cat.name}</h3>
                      </div>
                      <button className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{cat.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{cat.postCount} posts</span>
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${(cat.postCount / 50) * 100}%`, backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabContent>

          {/* ============ ANALYTICS TAB ============ */}
          <TabContent id="analytics" active={activeTab}>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Analytics</h2>
              <p className="text-sm text-muted-foreground mt-1">Content performance and audience insights</p>
            </div>

            {/* Views Chart */}
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Monthly Views</h3>
                    <p className="text-sm text-muted-foreground">Page views over the last 12 months</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">1.48M</p>
                    <span className="text-xs text-emerald-500 font-medium flex items-center justify-end gap-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +14.2% YoY
                    </span>
                  </div>
                </div>
                <AreaChart data={viewsChartData} height={180} color="hsl(var(--primary))" />
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Top Posts Bar Chart */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4">Top Posts by Views</h3>
                  <BarChart data={topPostsBarData} height={160} barWidth={32} gap={12} />
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4">Traffic Sources</h3>
                  <div className="space-y-4">
                    {trafficSources.map((src) => (
                      <div key={src.source}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium">{src.source}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{src.sessions}</span>
                            <span className="text-sm font-semibold">{src.percentage}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-700"
                            style={{ width: `${src.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reader Demographics */}
            <Card>
              <CardContent className="p-5">
                <h3 className="font-semibold text-lg mb-4">Reader Demographics</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {readerDemographics.map((item) => (
                    <div key={item.region} className="text-center p-4 rounded-xl bg-muted/30">
                      <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primary/10 mb-3">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-2xl font-bold">{item.percentage}%</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.region}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabContent>

        </main>
      </div>

      <ThemeSwitcher />
    </div>
  )
}

export default App
