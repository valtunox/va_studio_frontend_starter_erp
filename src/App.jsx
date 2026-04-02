/**
 * VA Studio Frontend Starter - Main Application Entry Point
 *
 * This starter app now defaults to the Diet template as the main interface.
 * The welcome/showcase functionality has been moved to va_studio_ai_builder_frontend.
 *
 * Routes:
 *   /                          → Diet template (default)
 *   /preview/:templateId       → Live template preview (saas, portfolio, etc.)
 *
 * Backend connectivity:
 *   A connectivity test banner appears at the top showing real-time backend status.
 *   The status is polled every 30s (online) or 10s (offline) via healthApi.check().
 *
 * @module App
 * @version 2.0.0
 * @see {@link ../templates/} for individual template implementations
 * @see {@link ./hooks/useBackendStatus.js} for health-check logic
 * @see {@link ./lib/api.js} for backend API client
 */

import { lazy, Suspense, useState, useCallback } from 'react'
import { createBrowserRouter, RouterProvider, useParams, useNavigate, Link } from 'react-router-dom'
import { BackendStatusProvider, useBackendContext } from './context/BackendStatusContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { TemplateSwitcher } from './components/shared/TemplateSwitcher'

/* ------------------------------------------------------------------ */
/*  Lazy-loaded template components (code-split per template)          */
/* ------------------------------------------------------------------ */

const templates = {
  aiassistant: lazy(() => import('../templates/aiassistant/App.jsx')),
  business: lazy(() => import('../templates/business/App.jsx')),
  ecommerce: lazy(() => import('../templates/ecommerce/App.jsx')),
  organization: lazy(() => import('../templates/organization/App.jsx')),
  portfolio: lazy(() => import('../templates/portfolio/App.jsx')),
  blog: lazy(() => import('../templates/blog/App.jsx')),
  crm: lazy(() => import('../templates/crm/App.jsx')),
  erp: lazy(() => import('../templates/erp/App.jsx')),
  dashboard: lazy(() => import('../templates/dashboard/App.jsx')),
  diet: lazy(() => import('../templates/diet/App.jsx')),
  finance: lazy(() => import('../templates/finance/App.jsx')),
  marketing: lazy(() => import('../templates/marketing/App.jsx')),
  login: lazy(() => import('../templates/login/App.jsx')),
  register: lazy(() => import('../templates/register/App.jsx')),
  onboarding: lazy(() => import('../templates/onboarding/App.jsx')),
  saas: lazy(() => import('../templates/saas/App.jsx')),
  saas2: lazy(() => import('../templates/saas2/App.jsx')),
  formbuilder: lazy(() => import('../templates/formbuilder/App.jsx')),
  nutritionapp: lazy(() => import('../templates/nutritionapp/App.jsx')),
  calendar: lazy(() => import('../templates/calendar/App.jsx')),
  profile: lazy(() => import('../templates/profile/App.jsx')),
}

/* ------------------------------------------------------------------ */
/*  Backend Connectivity Test Banner                                   */
/* ------------------------------------------------------------------ */

function ConnectivityBanner() {
  const { status, latency, details, retry } = useBackendContext()

  const statusConfig = {
    checking: {
      bg: 'bg-slate-100 dark:bg-slate-800',
      text: 'text-slate-600 dark:text-slate-400',
      icon: '⏳',
      label: 'Checking backend...',
    },
    online: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      text: 'text-emerald-700 dark:text-emerald-400',
      icon: '✓',
      label: 'Backend Online',
    },
    degraded: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      text: 'text-amber-700 dark:text-amber-400',
      icon: '⚠',
      label: 'Backend Degraded',
    },
    offline: {
      bg: 'bg-rose-50 dark:bg-rose-950/30',
      text: 'text-rose-700 dark:text-rose-400',
      icon: '✕',
      label: 'Backend Offline',
    },
  }

  const config = statusConfig[status] || statusConfig.checking

  return (
    <div className={`${config.bg} border-b border-slate-200 dark:border-slate-700`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span className="text-lg">{config.icon}</span>
          <span className={`font-medium ${config.text}`}>{config.label}</span>
          {latency && (
            <span className="text-slate-500 dark:text-slate-400">
              {latency}ms
            </span>
          )}
          {details && (
            <span className="text-slate-500 dark:text-slate-400 text-xs">
              {details.app} v{details.version}
            </span>
          )}
        </div>
        <button
          onClick={retry}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors text-xs font-medium"
        >
          Retry
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Template Loader (loading state)                                    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Home Page (Diet Template with Connectivity Banner)                 */
/* ------------------------------------------------------------------ */

function HomePage() {
  const { isDark } = useTheme()
  const [activeTemplate, setActiveTemplate] = useState('diet')
  const ActiveComponent = templates[activeTemplate]

  // onNavigate lets login/register switch templates
  const handleNavigate = (templateId) => {
    if (templates[templateId]) setActiveTemplate(templateId)
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <ConnectivityBanner />
      <Suspense fallback={<TemplateLoader />}>
        <ActiveComponent key={activeTemplate} onNavigate={handleNavigate} />
      </Suspense>
      <TemplateSwitcher activeTemplate={activeTemplate} onSelect={setActiveTemplate} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Template Preview (resolves :templateId → component)                */
/* ------------------------------------------------------------------ */

function TemplateLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading template...</p>
      </div>
    </div>
  )
}

function NotFoundPage() {
  const { isDark } = useTheme()
  return (
    <div className={isDark ? 'dark' : ''}>
      <ConnectivityBanner />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
        <div className="text-center max-w-2xl">
          <p className="text-7xl font-black text-slate-200 dark:text-slate-800 font-display mb-2">404</p>
          <h1 className="text-2xl font-bold font-display mb-3 text-slate-900 dark:text-white">Page Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The page you're looking for doesn't exist.
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Browse Templates:</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
              {Object.keys(templates).sort().map((id) => (
                <Link
                  key={id}
                  to={`/templates/${id}`}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 font-medium"
                >
                  {id}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

function TemplatePreview() {
  const { templateId } = useParams()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const Component = templates[templateId]

  const handleNavigate = useCallback((target) => {
    if (templates[target]) navigate(`/templates/${target}`)
  }, [navigate])

  if (!Component) {
    return (
      <div className={isDark ? 'dark' : ''}>
        <ConnectivityBanner />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
          <div className="text-center max-w-2xl">
            <p className="text-7xl font-black text-slate-200 dark:text-slate-800 font-display mb-2">404</p>
            <h1 className="text-2xl font-bold font-display mb-3 text-slate-900 dark:text-white">Template Not Found</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              The template "<span className="font-mono text-indigo-600 dark:text-indigo-400">{templateId}</span>" doesn't exist.
            </p>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Available Templates:</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
                {Object.keys(templates).sort().map((id) => (
                  <Link
                    key={id}
                    to={`/templates/${id}`}
                    className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all text-slate-700 dark:text-slate-300 font-medium"
                  >
                    {id}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <Suspense fallback={<TemplateLoader />}>
        <Component onNavigate={handleNavigate} />
      </Suspense>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/*                                                                     */
/*  /                          → Diet template (default)               */
/*  /preview/:templateId       → Live preview of a specific template   */
/*  /templates/:templateId     → Alternative template route            */
/* ------------------------------------------------------------------ */

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/preview/:templateId', element: <TemplatePreview /> },
  { path: '/templates/:templateId', element: <TemplatePreview /> },
  { path: '*', element: <NotFoundPage /> },
])

/**
 * Root application component.
 *
 * Wraps the entire app in BackendStatusProvider so every page
 * can access the real-time backend connectivity status via
 * useBackendContext().
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BackendStatusProvider>
          <RouterProvider router={router} />
        </BackendStatusProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
