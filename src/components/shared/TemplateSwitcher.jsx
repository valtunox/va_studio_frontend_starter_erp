/**
 * TemplateSwitcher - Sticky right-side panel to switch between templates at the entry point.
 *
 * Usage:
 *   <TemplateSwitcher activeTemplate={activeTemplate} onSelect={setActiveTemplate} />
 */

import { useState } from 'react'
import {
  ShoppingCart, LayoutDashboard, Users, Database, DollarSign,
  TrendingUp, Briefcase, FileText, Leaf, Bot, Building,
  Building2, Rocket, LogIn, UserPlus, ChevronRight, ChevronLeft,
  Layers, Sparkles, Terminal, ClipboardList, Apple,
  CalendarDays,
} from 'lucide-react'

const TEMPLATES = [
  { id: 'ecommerce',    label: 'E-Commerce',   icon: ShoppingCart,    color: 'text-violet-500' },
  { id: 'dashboard',   label: 'Dashboard',    icon: LayoutDashboard, color: 'text-blue-500' },
  { id: 'crm',         label: 'CRM',          icon: Users,           color: 'text-sky-500' },
  { id: 'erp',         label: 'ERP',          icon: Database,        color: 'text-indigo-500' },
  { id: 'finance',     label: 'Finance',      icon: DollarSign,      color: 'text-emerald-500' },
  { id: 'marketing',   label: 'Marketing',    icon: TrendingUp,      color: 'text-orange-500' },
  { id: 'portfolio',   label: 'Portfolio',    icon: Briefcase,       color: 'text-amber-500' },
  { id: 'blog',        label: 'Blog',         icon: FileText,        color: 'text-rose-500' },
  { id: 'diet',        label: 'Diet',         icon: Leaf,            color: 'text-green-500' },
  { id: 'aiassistant', label: 'AI Assistant', icon: Bot,             color: 'text-cyan-500' },
  { id: 'business',    label: 'Business',     icon: Building,        color: 'text-slate-500' },
  { id: 'organization',label: 'Organization', icon: Building2,       color: 'text-teal-500' },
  { id: 'onboarding',  label: 'Onboarding',   icon: Rocket,          color: 'text-pink-500' },
  { id: 'login',       label: 'Login',        icon: LogIn,           color: 'text-gray-500' },
  { id: 'register',    label: 'Register',     icon: UserPlus,        color: 'text-purple-500' },
  { id: 'saas',        label: 'SaaS Landing', icon: Sparkles,        color: 'text-indigo-500' },
  { id: 'saas2',       label: 'SaaS Dark',    icon: Terminal,        color: 'text-cyan-500' },
  { id: 'formbuilder', label: 'Form Builder', icon: ClipboardList,   color: 'text-fuchsia-500' },
  { id: 'nutritionapp',label: 'Nutrition App',icon: Apple,           color: 'text-lime-500' },
  { id: 'calendar',    label: 'Calendar',     icon: CalendarDays,    color: 'text-blue-500' },
]

export function TemplateSwitcher({ activeTemplate, onSelect }) {
  const [open, setOpen] = useState(false)

  const active = TEMPLATES.find((t) => t.id === activeTemplate) ?? TEMPLATES[0]
  const ActiveIcon = active.icon

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center">
      {/* Sliding panel */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? 'w-52 opacity-100' : 'w-0 opacity-0 pointer-events-none'}
        `}
      >
        <div className="w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-l-2xl shadow-2xl shadow-slate-900/20 dark:shadow-black/40 py-3 max-h-[80vh] overflow-y-auto">
          <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Templates
          </p>
          <div className="flex flex-col gap-0.5 px-2">
            {TEMPLATES.map((t) => {
              const Icon = t.icon
              const isActive = t.id === activeTemplate
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    onSelect(t.id)
                    setOpen(false)
                  }}
                  className={`
                    flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all
                    ${isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <Icon
                    size={15}
                    className={isActive ? 'text-indigo-500' : t.color}
                  />
                  <span>{t.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Toggle tab */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          flex flex-col items-center justify-center gap-1.5
          bg-white dark:bg-slate-900
          border border-slate-200 dark:border-slate-700
          rounded-l-xl shadow-lg shadow-slate-900/10 dark:shadow-black/30
          px-2 py-4 cursor-pointer select-none transition-colors
          hover:bg-slate-50 dark:hover:bg-slate-800
          ${open ? 'rounded-l-none border-r-0' : ''}
        `}
        title={open ? 'Close template switcher' : 'Switch template'}
      >
        {open ? (
          <ChevronRight size={14} className="text-slate-500 dark:text-slate-400" />
        ) : (
          <>
            <ActiveIcon size={15} className={active.color} />
            <span
              className="text-[9px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              {active.label}
            </span>
            <Layers size={11} className="text-slate-300 dark:text-slate-600" />
          </>
        )}
      </button>
    </div>
  )
}
