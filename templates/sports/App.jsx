import { useState } from 'react'
import {
  Trophy, Timer, Users, Calendar, TrendingUp, Star, MapPin, Clock, Plus, Menu, X, Bell, Search,
  Settings, ChevronDown, ChevronRight, Play, Circle, Zap, BarChart3, ArrowUpRight, Shield, Flag,
  Target, Activity, Eye, Radio, LayoutDashboard, Award, Swords, ArrowUp, ArrowDown, Minus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Sparkline, DonutChart, BarChart, AreaChart } from '@/components/shared/MiniChart'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabContent } from '@/components/ui/tabs'
import { Progress, ProgressRing } from '@/components/ui/progress'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: Radio, label: 'Live Scores', href: '#live' },
  { icon: Users, label: 'Teams', href: '#' },
  { icon: Calendar, label: 'Schedule', href: '#' },
  { icon: Trophy, label: 'Standings', href: '#standings' },
  { icon: Star, label: 'Players', href: '#players' },
  { icon: Activity, label: 'News', href: '#news' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const sports = ['Football', 'Basketball', 'Soccer', 'Tennis']

const liveMatches = [
  { home: 'Man City', away: 'Arsenal', homeScore: 2, awayScore: 1, status: "67'", isLive: true, league: 'Premier League' },
  { home: 'Djokovic', away: 'Nadal', homeScore: '6-4', awayScore: '3-2', status: 'Live, Set 2', isLive: true, league: 'Grand Slam' },
  { home: 'Lakers', away: 'Celtics', homeScore: 108, awayScore: 102, status: 'Final', isLive: false, league: 'NBA' },
]

const recentResults = [
  { home: 'Liverpool', away: 'Man United', homeScore: 3, awayScore: 1, date: 'Feb 15', league: 'Premier League' },
  { home: 'Real Madrid', away: 'Atletico Madrid', homeScore: 2, awayScore: 2, date: 'Feb 14', league: 'La Liga' },
  { home: 'Bayern Munich', away: 'Dortmund', homeScore: 4, awayScore: 0, date: 'Feb 13', league: 'Bundesliga' },
  { home: 'PSG', away: 'Lyon', homeScore: 3, awayScore: 2, date: 'Feb 12', league: 'Ligue 1' },
  { home: 'Inter Milan', away: 'Juventus', homeScore: 1, awayScore: 0, date: 'Feb 11', league: 'Serie A' },
]

const kpis = [
  { label: 'Matches Today', value: 12, delta: '+3', icon: Calendar },
  { label: 'Live Now', value: 3, delta: '', icon: Radio },
  { label: 'Upcoming', value: 8, delta: '+2', icon: Clock },
  { label: 'Completed', value: 5, delta: '+1', icon: Shield },
]

const standings = [
  { rank: 1, team: 'Man City', played: 24, won: 18, drawn: 4, lost: 2, gf: 58, ga: 22, gd: 36, points: 58, form: ['W', 'W', 'D', 'W', 'L'] },
  { rank: 2, team: 'Arsenal', played: 24, won: 17, drawn: 3, lost: 4, gf: 52, ga: 24, gd: 28, points: 54, form: ['W', 'W', 'W', 'L', 'W'] },
  { rank: 3, team: 'Liverpool', played: 24, won: 16, drawn: 5, lost: 3, gf: 55, ga: 28, gd: 27, points: 53, form: ['W', 'D', 'W', 'W', 'D'] },
  { rank: 4, team: 'Chelsea', played: 24, won: 14, drawn: 6, lost: 4, gf: 44, ga: 25, gd: 19, points: 48, form: ['D', 'W', 'L', 'W', 'W'] },
  { rank: 5, team: 'Tottenham', played: 24, won: 13, drawn: 4, lost: 7, gf: 48, ga: 35, gd: 13, points: 43, form: ['L', 'W', 'W', 'D', 'L'] },
  { rank: 6, team: 'Newcastle', played: 24, won: 12, drawn: 5, lost: 7, gf: 42, ga: 30, gd: 12, points: 41, form: ['W', 'D', 'W', 'L', 'W'] },
  { rank: 7, team: 'Aston Villa', played: 24, won: 11, drawn: 5, lost: 8, gf: 40, ga: 34, gd: 6, points: 38, form: ['L', 'W', 'D', 'W', 'L'] },
  { rank: 8, team: 'Man United', played: 24, won: 10, drawn: 4, lost: 10, gf: 32, ga: 38, gd: -6, points: 34, form: ['L', 'D', 'L', 'W', 'W'] },
]

const upcomingMatches = [
  { date: 'Feb 18', time: '3:00 PM', home: 'Liverpool', away: 'Man United', venue: 'Anfield', league: 'Premier League' },
  { date: 'Feb 19', time: '7:45 PM', home: 'Real Madrid', away: 'Barcelona', venue: 'Santiago Bernabéu', league: 'La Liga' },
  { date: 'Feb 20', time: '2:30 PM', home: 'Bayern Munich', away: 'Dortmund', venue: 'Allianz Arena', league: 'Bundesliga' },
  { date: 'Feb 21', time: '8:00 PM', home: 'PSG', away: 'Marseille', venue: 'Parc des Princes', league: 'Ligue 1' },
  { date: 'Feb 22', time: '5:30 PM', home: 'Inter Milan', away: 'AC Milan', venue: 'San Siro', league: 'Serie A' },
  { date: 'Feb 23', time: '3:00 PM', home: 'Benfica', away: 'Porto', venue: 'Estádio da Luz', league: 'Liga Portugal' },
]

const topPlayers = [
  { name: 'Erling Haaland', team: 'Man City', pos: 'ST', goals: 22, assists: 5, rating: 8.9, trend: [7.5, 8.2, 9.0, 8.5, 9.2, 8.8, 8.9] },
  { name: 'Mohamed Salah', team: 'Liverpool', pos: 'RW', goals: 18, assists: 9, rating: 8.5, trend: [8.0, 7.8, 8.5, 8.2, 9.0, 8.4, 8.5] },
  { name: 'Kevin De Bruyne', team: 'Man City', pos: 'CM', goals: 8, assists: 14, rating: 8.7, trend: [8.5, 8.0, 8.8, 9.2, 8.6, 8.9, 8.7] },
  { name: 'Bukayo Saka', team: 'Arsenal', pos: 'RW', goals: 14, assists: 10, rating: 8.4, trend: [7.8, 8.0, 8.5, 8.8, 7.9, 8.6, 8.4] },
  { name: 'Bruno Fernandes', team: 'Man United', pos: 'AM', goals: 7, assists: 8, rating: 7.8, trend: [7.5, 8.0, 7.2, 7.8, 8.1, 7.6, 7.8] },
  { name: 'Virgil van Dijk', team: 'Liverpool', pos: 'CB', goals: 3, assists: 2, rating: 8.2, trend: [8.0, 8.5, 8.2, 7.8, 8.4, 8.0, 8.2] },
  { name: 'Cole Palmer', team: 'Chelsea', pos: 'AM', goals: 16, assists: 7, rating: 8.3, trend: [7.0, 7.8, 8.5, 8.8, 8.0, 8.5, 8.3] },
  { name: 'Alexander Isak', team: 'Newcastle', pos: 'ST', goals: 15, assists: 4, rating: 8.1, trend: [7.5, 8.0, 8.2, 8.5, 7.8, 8.3, 8.1] },
]

const teamStats = [
  { team: 'Man City', possession: 65, shots: 18.2, passAcc: 89, tackles: 14 },
  { team: 'Arsenal', possession: 58, shots: 15.8, passAcc: 86, tackles: 18 },
  { team: 'Liverpool', possession: 60, shots: 16.5, passAcc: 87, tackles: 16 },
  { team: 'Chelsea', possession: 55, shots: 14.2, passAcc: 84, tackles: 17 },
]

const radarStats = [
  { label: 'Attack', home: 88, away: 82 },
  { label: 'Defense', home: 75, away: 85 },
  { label: 'Midfield', home: 90, away: 78 },
  { label: 'Speed', home: 80, away: 84 },
  { label: 'Stamina', home: 85, away: 80 },
  { label: 'Set Pieces', home: 72, away: 76 },
]

const goalsTrend = [
  { value: 3, label: 'GW19' },
  { value: 1, label: 'GW20' },
  { value: 4, label: 'GW21' },
  { value: 2, label: 'GW22' },
  { value: 3, label: 'GW23' },
  { value: 5, label: 'GW24' },
]

const tabsList = ['Overview', 'Schedule', 'Teams', 'Statistics']

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSport, setSelectedSport] = useState('Soccer')
  const [activeTab, setActiveTab] = useState('Overview')
  const [compareTeams] = useState({ home: 'Man City', away: 'Arsenal' })

  const homeTeam = teamStats.find(t => t.team === compareTeams.home)
  const awayTeam = teamStats.find(t => t.team === compareTeams.away)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Sports Hub</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center gap-4 px-4 sm:px-6 z-30">
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 overflow-x-auto">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                    selectedSport === sport
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-w-0 max-w-md hidden sm:flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 shrink-0" />
              <Input placeholder="Search teams, players, matches..." className="h-9 pl-9 bg-slate-100 dark:bg-slate-800 border-0 text-sm" />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button size="sm" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white border-0 shadow-lg shadow-sky-500/25">
              <Plus className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Follow Match</span>
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold font-display">Sports Hub</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live scores, standings, and comprehensive stats</p>
            </div>
            <Tabs tabs={tabsList} active={activeTab} onChange={setActiveTab} />
          </div>

          {/* ============ OVERVIEW TAB ============ */}
          <TabContent id="Overview" active={activeTab}>
            {/* Live Scores Banner */}
            <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-sky-500/10 dark:from-sky-500/5 dark:via-blue-500/5 dark:to-sky-500/5 overflow-hidden mb-6">
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  <h2 className="font-semibold font-display">Live Scores</h2>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <Circle className="w-2 h-2 fill-current animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {liveMatches.map((match) => (
                    <div
                      key={`${match.home}-${match.away}`}
                      className="p-4 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant={match.isLive ? 'success' : 'secondary'} className="text-[10px]">{match.league}</Badge>
                        {match.isLive && <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" />}
                      </div>
                      <div className="flex items-center justify-between gap-2 my-3">
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs mb-1">
                            {match.home.slice(0, 3).toUpperCase()}
                          </div>
                          <span className="text-xs font-medium">{match.home}</span>
                        </div>
                        <div className="text-center px-2">
                          <span className="text-xl font-bold font-display">{match.homeScore} - {match.awayScore}</span>
                        </div>
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center text-white font-bold text-xs mb-1">
                            {match.away.slice(0, 3).toUpperCase()}
                          </div>
                          <span className="text-xs font-medium">{match.away}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          match.isLive
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                          {match.isLive && <Play className="w-3 h-3 inline mr-1 -mt-0.5" />}
                          {match.status}
                        </span>
                        <button className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1">
                          <Eye className="w-3 h-3" /> Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* KPI Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {kpis.map(({ label, value, delta, icon: Icon }) => (
                <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-600/20 dark:from-sky-500/30 dark:to-blue-600/30 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold font-display">{value}</p>
                    {delta && (
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{delta}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">vs yesterday</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Results + Standings preview */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Swords className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Recent Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentResults.map((m) => (
                      <div key={`${m.home}-${m.away}-${m.date}`} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex-1 text-right">
                          <p className="text-sm font-medium">{m.home}</p>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center min-w-[60px]">
                          <span className="font-bold font-display">{m.homeScore} - {m.awayScore}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{m.away}</p>
                        </div>
                        <Badge variant="info" className="text-[10px] hidden sm:inline-flex">{m.league}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                      Goals Trend
                    </CardTitle>
                    <Badge variant="info">Man City</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChart data={goalsTrend} height={140} color="#0ea5e9" />
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-sky-600 dark:text-sky-400">58</p>
                      <p className="text-[10px] text-slate-500 uppercase">Goals For</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-sky-600 dark:text-sky-400">22</p>
                      <p className="text-[10px] text-slate-500 uppercase">Conceded</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">+36</p>
                      <p className="text-[10px] text-slate-500 uppercase">Diff</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top 4 Players quick view */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <Star className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Top Performers
                  </CardTitle>
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => setActiveTab('Statistics')}>
                    View All <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topPlayers.slice(0, 4).map((player) => (
                    <div key={player.name} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-sky-500/50 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{player.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{player.team} · {player.pos}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">{player.goals}G {player.assists}A</span>
                          <Sparkline data={player.trend} color="#0ea5e9" height={16} width={40} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ SCHEDULE TAB ============ */}
          <TabContent id="Schedule" active={activeTab}>
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Upcoming Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingMatches.map((match) => (
                      <div
                        key={`${match.home}-${match.away}`}
                        className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3 h-3" />
                            {match.date} · {match.time}
                          </div>
                          <Badge variant="info" className="text-[10px]">{match.league}</Badge>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{match.home}</span>
                          <span className="text-xs font-medium text-slate-400 px-3">vs</span>
                          <span className="font-semibold text-sm text-right">{match.away}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MapPin className="w-3 h-3 shrink-0" />
                          {match.venue}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Swords className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    Recent Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentResults.map((m) => (
                      <div key={`${m.home}-${m.away}-sch`} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-slate-500">{m.date}</span>
                          <Badge variant="secondary" className="text-[10px]">{m.league}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm flex-1">{m.home}</span>
                          <span className="font-bold font-display px-4 py-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                            {m.homeScore} - {m.awayScore}
                          </span>
                          <span className="font-medium text-sm flex-1 text-right">{m.away}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabContent>

          {/* ============ TEAMS TAB ============ */}
          <TabContent id="Teams" active={activeTab}>
            {/* League Standings */}
            <Card className="border-slate-200 dark:border-slate-800 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    League Standings
                  </CardTitle>
                  <Badge variant="info">Premier League 2025/26</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider w-8">#</th>
                        <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Team</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">P</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">W</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">D</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden sm:table-cell">L</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden md:table-cell">GD</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Pts</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider hidden lg:table-cell">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((row) => (
                        <tr key={row.team} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                              row.rank <= 4 ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400' : 'text-slate-600 dark:text-slate-400'
                            }`}>{row.rank}</span>
                          </td>
                          <td className="py-3 px-2 font-semibold">{row.team}</td>
                          <td className="py-3 px-2 text-center text-slate-600 dark:text-slate-400">{row.played}</td>
                          <td className="py-3 px-2 text-center hidden sm:table-cell text-emerald-600 dark:text-emerald-400">{row.won}</td>
                          <td className="py-3 px-2 text-center hidden sm:table-cell text-slate-500">{row.drawn}</td>
                          <td className="py-3 px-2 text-center hidden sm:table-cell text-red-500">{row.lost}</td>
                          <td className="py-3 px-2 text-center hidden md:table-cell">
                            <span className={row.gd > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}>{row.gd > 0 ? '+' : ''}{row.gd}</span>
                          </td>
                          <td className="py-3 px-2 text-center font-bold text-sky-600 dark:text-sky-400">{row.points}</td>
                          <td className="py-3 px-2 hidden lg:table-cell">
                            <div className="flex gap-1 justify-center">
                              {row.form.map((f, i) => (
                                <span key={i} className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white ${
                                  f === 'W' ? 'bg-emerald-500' : f === 'D' ? 'bg-amber-500' : 'bg-red-500'
                                }`}>{f}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Team Comparison */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Team Comparison: {compareTeams.home} vs {compareTeams.away}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {homeTeam && awayTeam && (
                  <div className="space-y-4">
                    {[
                      { label: 'Possession', homeVal: homeTeam.possession, awayVal: awayTeam.possession, unit: '%' },
                      { label: 'Shots/Game', homeVal: homeTeam.shots, awayVal: awayTeam.shots, unit: '' },
                      { label: 'Pass Accuracy', homeVal: homeTeam.passAcc, awayVal: awayTeam.passAcc, unit: '%' },
                      { label: 'Tackles/Game', homeVal: homeTeam.tackles, awayVal: awayTeam.tackles, unit: '' },
                    ].map((stat) => {
                      const maxVal = Math.max(stat.homeVal, stat.awayVal) * 1.1
                      return (
                        <div key={stat.label} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-sky-600 dark:text-sky-400">{stat.homeVal}{stat.unit}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</span>
                            <span className="font-medium text-slate-600 dark:text-slate-300">{stat.awayVal}{stat.unit}</span>
                          </div>
                          <div className="flex gap-1 h-3">
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex justify-end">
                              <div className="h-full rounded-full bg-sky-500" style={{ width: `${(stat.homeVal / maxVal) * 100}%` }} />
                            </div>
                            <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-slate-400 dark:bg-slate-500" style={{ width: `${(stat.awayVal / maxVal) * 100}%` }} />
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* CSS Radar Chart */}
                <div className="mt-8">
                  <p className="text-sm font-medium text-center mb-4">Performance Radar</p>
                  <div className="relative w-64 h-64 mx-auto">
                    {/* Radar background rings */}
                    {[100, 75, 50, 25].map((ring) => (
                      <div
                        key={ring}
                        className="absolute border border-slate-200 dark:border-slate-800 rounded-full"
                        style={{
                          width: `${ring * 2.4}px`, height: `${ring * 2.4}px`,
                          left: `${128 - ring * 1.2}px`, top: `${128 - ring * 1.2}px`,
                        }}
                      />
                    ))}
                    {/* Radar labels */}
                    {radarStats.map((stat, i) => {
                      const angle = (i / radarStats.length) * 2 * Math.PI - Math.PI / 2
                      const x = 128 + Math.cos(angle) * 130
                      const y = 128 + Math.sin(angle) * 130
                      return (
                        <div
                          key={stat.label}
                          className="absolute text-[10px] font-medium text-slate-500 dark:text-slate-400 -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${x}px`, top: `${y}px` }}
                        >
                          {stat.label}
                        </div>
                      )
                    })}
                    {/* Radar data points */}
                    <svg viewBox="0 0 256 256" className="absolute inset-0 w-full h-full">
                      {[
                        { data: radarStats.map(s => s.home), color: '#0ea5e9', opacity: 0.2 },
                        { data: radarStats.map(s => s.away), color: '#94a3b8', opacity: 0.15 },
                      ].map((series, si) => {
                        const pts = series.data.map((v, i) => {
                          const angle = (i / series.data.length) * 2 * Math.PI - Math.PI / 2
                          const r = (v / 100) * 110
                          return `${128 + Math.cos(angle) * r},${128 + Math.sin(angle) * r}`
                        }).join(' ')
                        return (
                          <g key={si}>
                            <polygon points={pts} fill={series.color} opacity={series.opacity} stroke={series.color} strokeWidth="2" />
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-sky-500" /><span className="text-xs">{compareTeams.home}</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-400" /><span className="text-xs">{compareTeams.away}</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabContent>

          {/* ============ STATISTICS TAB ============ */}
          <TabContent id="Statistics" active={activeTab}>
            {/* All Players */}
            <Card className="border-slate-200 dark:border-slate-800 mb-6">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <Star className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Player Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {topPlayers.map((player) => (
                    <div
                      key={player.name}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-sky-500/50 dark:hover:border-sky-500/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {player.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">{player.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{player.team} · {player.pos}</p>
                        </div>
                      </div>
                      <Sparkline data={player.trend} color="#0ea5e9" height={32} fill className="w-full mb-3" />
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{player.goals}</p>
                          <p className="text-[10px] text-slate-500">Goals</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{player.assists}</p>
                          <p className="text-[10px] text-slate-500">Assists</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{player.rating}</p>
                          <p className="text-[10px] text-slate-500">Rating</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team stats comparison */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  Team Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800">
                        <th className="text-left py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Team</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Possession</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Shots/Game</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Pass Acc</th>
                        <th className="text-center py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Tackles</th>
                        <th className="py-3 px-2 font-medium text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-center">Possession Bar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStats.map((t) => (
                        <tr key={t.team} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2 font-semibold">{t.team}</td>
                          <td className="py-3 px-2 text-center">{t.possession}%</td>
                          <td className="py-3 px-2 text-center">{t.shots}</td>
                          <td className="py-3 px-2 text-center">{t.passAcc}%</td>
                          <td className="py-3 px-2 text-center">{t.tackles}</td>
                          <td className="py-3 px-2">
                            <Progress value={t.possession} max={100} size="sm" color="bg-sky-500" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">Goals Scored Per Gameweek (Man City)</p>
                  <BarChart
                    data={goalsTrend.map(d => ({ value: d.value, label: d.label, color: '#0ea5e9' }))}
                    height={120}
                    barWidth={32}
                    gap={12}
                  />
                </div>
              </CardContent>
            </Card>
          </TabContent>
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <ThemeSwitcher />
    </div>
  )
}

export default App
