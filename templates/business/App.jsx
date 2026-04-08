import { BarChart3, Briefcase, Building2, CheckCircle2, Handshake, LineChart, Menu, ShieldCheck, Users, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

const nav = ['Solutions', 'Services', 'Case Studies', 'Pricing', 'Contact']

const stats = [
  { label: 'Enterprise Clients', value: '420+' },
  { label: 'Projects Delivered', value: '1,250+' },
  { label: 'Avg. Cost Savings', value: '31%' },
  { label: 'Support SLA', value: '< 15 min' },
]

const services = [
  { icon: LineChart, title: 'Growth Strategy', desc: 'Go-to-market planning, pricing optimization, and demand acceleration for B2B teams.' },
  { icon: Handshake, title: 'Sales Enablement', desc: 'Pipeline design, revops setup, and CRM workflows that reduce cycle time.' },
  { icon: ShieldCheck, title: 'Compliance Advisory', desc: 'Operational playbooks for SOC 2, ISO controls, and governance readiness.' },
]

const results = [
  { company: 'Northpeak Logistics', outcome: 'Reduced operating costs by 28% in 9 months.' },
  { company: 'Verde Payments', outcome: 'Increased qualified pipeline by 2.4x with new GTM ops.' },
  { company: 'Axiom Cloud', outcome: 'Launched enterprise offering in 6 weeks, closing 3 anchor accounts.' },
]

export default function BusinessTemplate({ onNavigate }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Building2 className="h-5 w-5 text-emerald-600" />
            <span>Vertex Business</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((item) => <a key={item} href="#" className="hover:text-emerald-600">{item}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button className="hidden md:inline-flex">Book Consultation</Button>
            <button className="rounded-md p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
            <div className="flex flex-col gap-3 text-sm">
              {nav.map((item) => <a key={item} href="#" className="hover:text-emerald-600">{item}</a>)}
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300">
              Business Website Template
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Turn Operational Complexity Into Measurable Growth
            </h1>
            <p className="mt-4 max-w-xl text-slate-600 dark:text-slate-300">
              A modern company site pattern for consulting, B2B services, and enterprise solution providers.
              Built to communicate trust, outcomes, and clear next steps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg">Start a Project</Button>
              <Button size="lg" variant="outline">View Case Studies</Button>
            </div>
          </div>
          <Card className="border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <CardContent className="grid grid-cols-2 gap-4 p-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{s.label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold">Core Services</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <Icon className="h-6 w-6 text-emerald-600" />
                  <h3 className="mt-3 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold">Client Outcomes</h2>
          </div>
          <div className="space-y-3">
            {results.map((item) => (
              <div key={item.company} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium">{item.company}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-sm sm:px-6 md:flex-row md:items-center">
          <p className="text-slate-600 dark:text-slate-300">© 2026 Vertex Business. All rights reserved.</p>
          <div className="flex gap-4 text-slate-600 dark:text-slate-300">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
