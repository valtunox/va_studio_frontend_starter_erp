/**
 * AI Action Simulation Component
 * Simulates web search, deep research, and file analysis flows.
 * General-purpose — fits any use case. All flows are simulated.
 */
import React, { useState, useEffect } from 'react'
import {
  X,
  FileText,
  Search,
  BookOpen,
  FileUp,
  Loader2,
  CheckCircle2,
  Globe,
} from 'lucide-react'

export type SimulationMode = 'web-search' | 'deep-research' | 'analyze-file'

interface AIActionSimulationProps {
  mode: SimulationMode
  onClose: () => void
  isMobile?: boolean
}

const FAKE_SEARCH_RESULTS = [
  { title: 'Latest trends in AI-powered applications', snippet: 'Comprehensive overview of emerging AI patterns and best practices...', source: 'techinsights.com' },
  { title: 'Building scalable microservices architecture', snippet: 'Design patterns for distributed systems and service mesh...', source: 'engineering-blog.dev' },
  { title: 'Modern frontend frameworks comparison 2025', snippet: 'React, Vue, Svelte, and Solid — performance benchmarks and DX...', source: 'webdev-weekly.io' },
]

const FAKE_DEEP_SOURCES = [
  { label: 'Academic papers', count: 3 },
  { label: 'Industry reports', count: 5 },
  { label: 'Technical docs', count: 4 },
]

const AIActionSimulation: React.FC<AIActionSimulationProps> = ({ mode, onClose }) => {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 4))
      setStep((s) => (s < 3 ? s + 1 : s))
    }, 600)
    return () => clearInterval(t)
  }, [])

  const titleMap: Record<SimulationMode, string> = {
    'web-search': 'Web Search',
    'deep-research': 'Deep Research',
    'analyze-file': 'Analyze File',
  }

  const iconMap: Record<SimulationMode, React.ReactNode> = {
    'web-search': <Search size={20} className="text-blue-400" />,
    'deep-research': <BookOpen size={20} className="text-purple-400" />,
    'analyze-file': <FileUp size={20} className="text-amber-400" />,
  }

  return (
    <div className="mx-auto w-full max-w-3xl rounded-2xl border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1a1a1a] p-4 shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-[#2d2d2d]">
            {iconMap[mode]}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{titleMap[mode]}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Simulation · Demo only</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 dark:hover:bg-[#2d2d2d] hover:text-gray-700 dark:hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Web search */}
      {mode === 'web-search' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-[#2d2d2d] px-3 py-2">
            <Search size={16} className="animate-pulse text-blue-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Searching the web for relevant results...</span>
          </div>
          <div className="space-y-2">
            {FAKE_SEARCH_RESULTS.map((r, i) => (
              <div
                key={r.title}
                className={`rounded-xl border p-3 transition ${
                  step > i ? 'border-blue-300 dark:border-blue-500/50 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-200 dark:border-[#3d3d3d] bg-gray-50 dark:bg-[#2d2d2d]'
                }`}
              >
                <p className="text-xs font-medium text-gray-900 dark:text-white">{r.title}</p>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">{r.snippet}</p>
                <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500 flex items-center gap-1">
                  <Globe size={10} /> {r.source}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">Simulation only · No live search</p>
        </div>
      )}

      {/* Deep research */}
      {mode === 'deep-research' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-[#2d2d2d] px-3 py-2">
            <BookOpen size={16} className="animate-pulse text-purple-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Deep research in progress...</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-[#2d2d2d]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {FAKE_DEEP_SOURCES.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-xl border p-3 text-center transition ${
                  step > i ? 'border-purple-300 dark:border-purple-500/50 bg-purple-50 dark:bg-purple-500/10' : 'border-gray-200 dark:border-[#3d3d3d] bg-gray-50 dark:bg-[#2d2d2d]'
                }`}
              >
                <p className="text-xs font-medium text-gray-900 dark:text-white">{s.label}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{s.count} sources</p>
              </div>
            ))}
          </div>
          <p className="rounded-lg border border-dashed border-gray-200 dark:border-[#3d3d3d] bg-gray-50 dark:bg-[#252525] p-3 text-[11px] text-gray-500 dark:text-gray-400">
            Synthesizing insights from multiple sources across academic and industry literature...
          </p>
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">Simulation only · No real research</p>
        </div>
      )}

      {/* Analyze file */}
      {mode === 'analyze-file' && (
        <div className="space-y-4">
          <div
            className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-8 transition ${
              step > 0 ? 'border-amber-300 dark:border-amber-500/50 bg-amber-50 dark:bg-amber-500/10' : 'border-gray-200 dark:border-[#3d3d3d] bg-gray-50 dark:bg-[#2d2d2d]'
            }`}
          >
            <FileText size={40} className="text-amber-400/80" />
            <p className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
              {step > 0 ? 'File detected' : 'Drop a file to analyze'}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {step > 0 ? 'Parsing document and extracting insights...' : 'PDF, CSV, TXT, JSON supported'}
            </p>
          </div>
          {step > 1 && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 px-3 py-2 text-amber-600 dark:text-amber-400">
              <CheckCircle2 size={16} />
              <span className="text-sm">Analysis complete — ready for follow-up questions</span>
            </div>
          )}
          <p className="text-center text-[10px] text-gray-400 dark:text-gray-500">Simulation only · No file uploaded</p>
        </div>
      )}
    </div>
  )
}

export default AIActionSimulation
