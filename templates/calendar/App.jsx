import { useState } from 'react'
import {
  CalendarDays, ChevronLeft, ChevronRight, Clock, MapPin, Video,
  Users, Plus, Bell, Settings, Link2, Copy, Edit, Trash2, Search,
  ToggleLeft, ToggleRight, Globe, Timer, Shield, Eye, User,
  Mail, FileText, CheckCircle2, XCircle, AlertCircle, Building2,
  Repeat, Filter, MoreHorizontal, ExternalLink, Sparkles, Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navTabs = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'event-types', label: 'Event Types' },
  { id: 'availability', label: 'Availability' },
  { id: 'settings', label: 'Settings' },
]

const calendarEvents = {
  5:  [{ title: 'Team Standup', color: 'bg-blue-500', time: '9:00 AM', duration: '15 min', location: 'Slack Huddle', attendees: 4 }],
  8:  [{ title: 'Client Call - Acme', color: 'bg-purple-500', time: '2:00 PM', duration: '45 min', location: 'Zoom', attendees: 3 }],
  12: [{ title: 'Product Demo', color: 'bg-emerald-500', time: '11:00 AM', duration: '45 min', location: 'Zoom', attendees: 5 }],
  15: [{ title: '1:1 with Sarah', color: 'bg-amber-500', time: '10:00 AM', duration: '30 min', location: 'Office', attendees: 2 }],
  18: [{ title: 'Design Review', color: 'bg-rose-500', time: '3:00 PM', duration: '60 min', location: 'Office', attendees: 6 }],
  23: [{ title: 'Sprint Planning', color: 'bg-indigo-500', time: '9:30 AM', duration: '60 min', location: 'Zoom', attendees: 8 }],
  25: [{ title: 'Investor Meeting', color: 'bg-indigo-500', time: '4:00 PM', duration: '60 min', location: 'Office', attendees: 5 }],
  28: [{ title: 'Sprint Retro', color: 'bg-teal-500', time: '2:00 PM', duration: '45 min', location: 'Google Meet', attendees: 7 }],
}

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
]

const bookings = [
  { title: 'Product Demo with Acme Corp', date: 'Mar 25, 2026', time: '2:00 PM', duration: '45 min', location: 'Zoom', attendees: 3, status: 'confirmed' },
  { title: 'Investor Pitch - Series A', date: 'Mar 25, 2026', time: '4:00 PM', duration: '60 min', location: 'Office', attendees: 5, status: 'confirmed' },
  { title: 'Client Onboarding - TechFlow', date: 'Mar 28, 2026', time: '10:00 AM', duration: '30 min', location: 'Google Meet', attendees: 2, status: 'pending' },
  { title: 'Design Sprint Kickoff', date: 'Mar 30, 2026', time: '9:00 AM', duration: '120 min', location: 'Office', attendees: 8, status: 'confirmed' },
  { title: 'Follow-up: Q1 Review', date: 'Mar 20, 2026', time: '3:00 PM', duration: '30 min', location: 'Zoom', attendees: 4, status: 'completed' },
  { title: 'Cancelled: Budget Meeting', date: 'Mar 18, 2026', time: '11:00 AM', duration: '30 min', location: 'Zoom', attendees: 3, status: 'cancelled' },
]

const eventTypes = [
  { title: '15 Min Quick Chat', duration: '15 min', color: 'blue', location: 'Zoom', active: true },
  { title: '30 Min Consultation', duration: '30 min', color: 'purple', location: 'Zoom / Meet', active: true },
  { title: '60 Min Deep Dive', duration: '60 min', color: 'emerald', location: 'Any', active: true },
  { title: 'Product Demo', duration: '45 min', color: 'amber', location: 'Zoom', active: true },
  { title: 'Team Standup', duration: '15 min', color: 'rose', location: 'Slack Huddle', active: true },
  { title: 'Interview', duration: '60 min', color: 'indigo', location: 'Zoom', active: false },
]

const weeklyAvailability = [
  { day: 'Monday', enabled: true, start: '9:00 AM', end: '5:00 PM' },
  { day: 'Tuesday', enabled: true, start: '9:00 AM', end: '5:00 PM' },
  { day: 'Wednesday', enabled: true, start: '9:00 AM', end: '5:00 PM' },
  { day: 'Thursday', enabled: true, start: '9:00 AM', end: '5:00 PM' },
  { day: 'Friday', enabled: true, start: '9:00 AM', end: '4:00 PM' },
  { day: 'Saturday', enabled: false, start: '—', end: '—' },
  { day: 'Sunday', enabled: false, start: '—', end: '—' },
]

const colorMap = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
}

const statusStyles = {
  confirmed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function getDaysInMonth() {
  const days = []
  const firstDay = new Date(2026, 2, 1).getDay()
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= 31; d++) days.push(d)
  return days
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function CalendarBookingApp({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('calendar')
  const [selectedDate, setSelectedDate] = useState(23)
  const [calendarMode, setCalendarMode] = useState('month')
  const [bookingFilter, setBookingFilter] = useState('all')

  const days = getDaysInMonth()

  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter === 'all') return true
    if (bookingFilter === 'upcoming') return b.status === 'confirmed' || b.status === 'pending'
    if (bookingFilter === 'past') return b.status === 'completed'
    if (bookingFilter === 'cancelled') return b.status === 'cancelled'
    return true
  })

  /* ---- HEADER ---- */
  const Header = () => (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <CalendarDays className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">CalSync</span>
          </div>
          <nav className="hidden items-center gap-1 md:flex">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <button className="relative rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-white dark:ring-zinc-900" />
        </div>
      </div>
    </header>
  )

  /* ---- CALENDAR VIEW ---- */
  const CalendarView = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* Main Calendar */}
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <CardTitle className="text-lg font-semibold text-zinc-900 dark:text-white">March 2026</CardTitle>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={calendarMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCalendarMode('month')}
              className={calendarMode === 'month' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
            >
              Month
            </Button>
            <Button
              variant={calendarMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCalendarMode('week')}
              className={calendarMode === 'week' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : ''}
            >
              Week
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Day headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {dayNames.map((d) => (
              <div key={d} className="py-2 text-center text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500">{d}</div>
            ))}
          </div>
          {/* Day grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={`e-${i}`} />
              const events = calendarEvents[day]
              const isToday = day === 23
              const isSelected = day === selectedDate
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`group relative flex min-h-[80px] flex-col rounded-lg border p-1.5 text-left transition-all hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30 ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-50 dark:border-indigo-600 dark:bg-indigo-950/40'
                      : 'border-zinc-100 dark:border-zinc-800'
                  }`}
                >
                  <span
                    className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      isToday
                        ? 'bg-indigo-600 text-white'
                        : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {day}
                  </span>
                  {events?.map((ev, j) => (
                    <div key={j} className={`mt-0.5 truncate rounded px-1 py-0.5 text-[10px] font-medium text-white ${ev.color}`}>
                      {ev.title}
                    </div>
                  ))}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Side Panel */}
      <div className="space-y-4">
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-zinc-900 dark:text-white">
              {selectedDate && `March ${selectedDate}, 2026`}
            </CardTitle>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {selectedDate && new Date(2026, 2, selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {calendarEvents[selectedDate] ? (
              calendarEvents[selectedDate].map((ev, i) => (
                <div key={i} className={`rounded-lg border-l-4 bg-zinc-50 p-3 dark:bg-zinc-800/50 ${ev.color.replace('bg-', 'border-')}`}>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{ev.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{ev.time} ({ev.duration})</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.attendees}</span>
                  </div>
                  <div className="mt-2 flex -space-x-1.5">
                    {Array.from({ length: Math.min(ev.attendees, 4) }).map((_, a) => (
                      <div key={a} className="h-6 w-6 rounded-full border-2 border-white bg-gradient-to-br from-indigo-400 to-purple-500 dark:border-zinc-800" />
                    ))}
                    {ev.attendees > 4 && (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-zinc-200 text-[10px] font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-700 dark:text-zinc-300">
                        +{ev.attendees - 4}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="py-4 text-center text-sm text-zinc-400 dark:text-zinc-500">No events scheduled</p>
            )}

            {/* Available slots */}
            <div className="space-y-1.5 pt-2">
              <p className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500">Available Slots</p>
              {['10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM'].map((slot) => (
                <div
                  key={slot}
                  className="flex items-center justify-between rounded-lg border border-dashed border-zinc-300 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                >
                  <span>{slot}</span>
                  <span className="text-xs text-indigo-500">30 min</span>
                </div>
              ))}
            </div>

            <Button className="mt-3 w-full bg-indigo-600 text-white hover:bg-indigo-700">
              <Plus className="mr-2 h-4 w-4" />Add Event
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  /* ---- BOOKINGS TAB ---- */
  const BookingsView = () => (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['all', 'upcoming', 'past', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setBookingFilter(f)}
              className={`rounded-full px-3 py-1 text-sm font-medium capitalize transition-colors ${
                bookingFilter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input placeholder="Search bookings..." className="pl-9 w-64" />
        </div>
      </div>

      <div className="space-y-3">
        {filteredBookings.map((b, i) => (
          <Card key={i} className={`border-zinc-200 dark:border-zinc-800 ${b.status === 'cancelled' ? 'opacity-60' : ''}`}>
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold text-zinc-900 dark:text-white ${b.status === 'cancelled' ? 'line-through' : ''}`}>
                  {b.title}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{b.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.time}</span>
                  <span className="flex items-center gap-1"><Timer className="h-3 w-3" />{b.duration}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{b.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" />{b.attendees} attendees</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`capitalize ${statusStyles[b.status]}`}>{b.status}</Badge>
                {b.status !== 'cancelled' && b.status !== 'completed' && (
                  <>
                    <Button variant="outline" size="sm"><Repeat className="mr-1 h-3 w-3" />Reschedule</Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"><XCircle className="mr-1 h-3 w-3" />Cancel</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  /* ---- EVENT TYPES TAB ---- */
  const EventTypesView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Event Types</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Create events for people to book on your calendar</p>
        </div>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          <Plus className="mr-2 h-4 w-4" />Create Event Type
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventTypes.map((et, i) => (
          <Card key={i} className={`border-zinc-200 transition-shadow hover:shadow-md dark:border-zinc-800 ${!et.active ? 'opacity-50' : ''}`}>
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className={`h-2 w-12 rounded-full ${et.color === 'blue' ? 'bg-blue-500' : et.color === 'purple' ? 'bg-purple-500' : et.color === 'emerald' ? 'bg-emerald-500' : et.color === 'amber' ? 'bg-amber-500' : et.color === 'rose' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                  {et.active ? <ToggleRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{et.title}</h3>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline" className={colorMap[et.color]}>{et.duration}</Badge>
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400"><Video className="h-3 w-3" />{et.location}</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex-1"><Edit className="mr-1 h-3 w-3" />Edit</Button>
                <Button variant="outline" size="sm"><Copy className="h-3 w-3" /></Button>
                <Button variant="outline" size="sm"><ExternalLink className="h-3 w-3" /></Button>
              </div>
              {!et.active && (
                <p className="mt-2 text-center text-xs text-zinc-400 dark:text-zinc-500">Inactive</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  /* ---- AVAILABILITY TAB ---- */
  const AvailabilityView = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Weekly Availability</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Set your recurring weekly hours</p>
        </div>
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
            {weeklyAvailability.map((slot) => (
              <div key={slot.day} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <button>
                    {slot.enabled
                      ? <ToggleRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      : <ToggleLeft className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />}
                  </button>
                  <span className={`text-sm font-medium ${slot.enabled ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}`}>
                    {slot.day}
                  </span>
                </div>
                {slot.enabled ? (
                  <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium dark:bg-zinc-800">{slot.start}</span>
                    <span className="text-zinc-400">-</span>
                    <span className="rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium dark:bg-zinc-800">{slot.end}</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">Unavailable</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold text-zinc-900 dark:text-white">Scheduling Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Globe className="h-4 w-4 text-zinc-400" />Timezone
              </div>
              <Badge variant="outline">America/New_York (EDT)</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Timer className="h-4 w-4 text-zinc-400" />Buffer between meetings
              </div>
              <Badge variant="outline">15 min</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <Shield className="h-4 w-4 text-zinc-400" />Minimum notice
              </div>
              <Badge variant="outline">4 hours</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                <CalendarDays className="h-4 w-4 text-zinc-400" />Max bookings per day
              </div>
              <Badge variant="outline">8</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Page Preview */}
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-zinc-400" />
            <CardTitle className="text-base font-semibold text-zinc-900 dark:text-white">Booking Page Preview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile */}
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
            <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-white">Alex Johnson</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Product Manager at CalSync</p>
          </div>

          {/* Event type select */}
          <div>
            <Label className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">Select Event Type</Label>
            <div className="space-y-1.5">
              {['15 Min Quick Chat', '30 Min Consultation'].map((et) => (
                <div key={et} className="cursor-pointer rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/30">
                  {et}
                </div>
              ))}
            </div>
          </div>

          {/* Mini calendar */}
          <div>
            <Label className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">Pick a Date</Label>
            <div className="rounded-lg border border-zinc-200 p-2 dark:border-zinc-700">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">March 2026</span>
                <div className="flex gap-1">
                  <ChevronLeft className="h-3 w-3 text-zinc-400" />
                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
                {dayNames.map((d) => (
                  <span key={d} className="py-0.5 font-medium text-zinc-400">{d[0]}</span>
                ))}
                {days.slice(0, 35).map((d, i) => (
                  <span
                    key={i}
                    className={`rounded py-0.5 ${
                      d === 23 ? 'bg-indigo-600 font-bold text-white' : d ? 'text-zinc-600 dark:text-zinc-400' : ''
                    }`}
                  >
                    {d || ''}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Time slots */}
          <div>
            <Label className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">Available Times</Label>
            <div className="grid grid-cols-3 gap-1.5">
              {['9:00', '9:30', '10:00', '10:30', '11:00', '2:00'].map((t) => (
                <button key={t} className="rounded-md border border-zinc-200 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-indigo-400 hover:bg-indigo-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/30">
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="space-y-2">
            <div>
              <Label className="text-xs">Name</Label>
              <Input placeholder="John Doe" className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs">Email</Label>
              <Input placeholder="john@example.com" className="h-8 text-xs" />
            </div>
            <div>
              <Label className="text-xs">Notes</Label>
              <Input placeholder="Anything to prepare?" className="h-8 text-xs" />
            </div>
          </div>

          <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
            <CheckCircle2 className="mr-2 h-4 w-4" />Confirm Booking
          </Button>

          <p className="text-center text-[10px] text-zinc-400 dark:text-zinc-500">Powered by CalSync</p>
        </CardContent>
      </Card>
    </div>
  )

  /* ---- SETTINGS TAB ---- */
  const SettingsView = () => (
    <div className="mx-auto max-w-2xl space-y-4">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Settings</h2>
      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardContent className="space-y-4 p-5">
          <div>
            <Label>Display Name</Label>
            <Input defaultValue="Alex Johnson" className="mt-1" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="alex@calsync.io" className="mt-1" />
          </div>
          <div>
            <Label>Booking Link</Label>
            <div className="mt-1 flex items-center gap-2">
              <Input defaultValue="calsync.io/alex" readOnly className="flex-1" />
              <Button variant="outline" size="sm"><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <div>
            <Label>Bio</Label>
            <Input defaultValue="Product Manager at CalSync. Let's connect!" className="mt-1" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Email Notifications</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Receive booking confirmations and reminders</p>
            </div>
            <ToggleRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">Calendar Sync</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Sync with Google Calendar, Outlook</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Connected</Badge>
          </div>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )

  /* ---- MAIN RENDER ---- */
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'bookings' && <BookingsView />}
        {activeTab === 'event-types' && <EventTypesView />}
        {activeTab === 'availability' && <AvailabilityView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>
    </div>
  )
}
