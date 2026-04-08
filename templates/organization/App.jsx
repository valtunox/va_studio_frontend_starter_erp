import { ArrowRight, CalendarDays, Globe2, HeartHandshake, Landmark, Menu, Shield, Users2, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const links = ['Mission', 'Programs', 'Impact', 'Volunteer', 'Donate']

const highlights = [
  { icon: Users2, label: 'Active Volunteers', value: '1,900+' },
  { icon: Globe2, label: 'Cities Served', value: '32' },
  { icon: HeartHandshake, label: 'Families Supported', value: '14,500+' },
  { icon: Shield, label: 'Transparency Rating', value: 'A+' },
]

const programs = [
  { title: 'Community Learning Labs', desc: 'After-school programs focused on literacy, STEM, and mentoring.' },
  { title: 'Neighborhood Health Access', desc: 'Mobile clinics and partner referrals for preventive care and screenings.' },
  { title: 'Workforce Readiness', desc: 'Career coaching, digital skills, and hiring partnerships for local talent.' },
]

export default function OrganizationTemplate({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Landmark className="h-5 w-5 text-sky-600" />
            <span>CivicBridge Org</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {links.map((item) => <a key={item} href="#" className="hover:text-sky-600">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button className="hidden md:inline-flex">Donate Now</Button>
            <button className="rounded-md p-2 md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-stone-200 px-4 py-3 md:hidden dark:border-slate-800">
            <div className="flex flex-col gap-3 text-sm">
              {links.map((item) => <a key={item} href="#" className="hover:text-sky-600">{item}</a>)}
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="mb-4 bg-sky-100 text-sky-800 hover:bg-sky-100 dark:bg-sky-900/40 dark:text-sky-300">
              Organization Website Template
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Build Stronger Communities With Clear, Actionable Impact
            </h1>
            <p className="mt-4 max-w-xl text-stone-600 dark:text-slate-300">
              A public-facing website structure for nonprofits, associations, and social impact organizations.
              Communicate mission, prove outcomes, and drive volunteer and donor action.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg">Become a Volunteer</Button>
              <Button size="lg" variant="outline">Read Annual Report</Button>
            </div>
          </div>
          <Card className="border-stone-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              {highlights.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-xl border border-stone-200 p-4 dark:border-slate-800">
                  <Icon className="h-5 w-5 text-sky-600" />
                  <p className="mt-2 text-2xl font-bold">{value}</p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-slate-300">{label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-sky-600" />
            <h2 className="text-2xl font-semibold">Programs</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {programs.map((item) => (
              <Card key={item.title} className="border-stone-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-stone-600 dark:text-slate-300">{item.desc}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-700 hover:text-sky-800 dark:text-sky-400">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-sm sm:px-6 md:flex-row md:items-center">
          <p className="text-stone-600 dark:text-slate-300">© 2026 CivicBridge Organization. All rights reserved.</p>
          <div className="flex gap-4 text-stone-600 dark:text-slate-300">
            <a href="#">Impact Report</a>
            <a href="#">Governance</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
