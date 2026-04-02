/**
 * Connectors Panel — General-purpose data source integrations.
 * All connections are simulated. No backend calls.
 */
import React, { useMemo, useState } from 'react'
import { CheckCircle2, ExternalLink, Loader2, Plug, ShieldCheck, WifiOff, X } from 'lucide-react'

type ConnectorStatus = 'disconnected' | 'connecting' | 'connected'

interface Connector {
  id: string
  name: string
  description: string
  badge: string
  docsUrl?: string
}

interface ConnectorsPanelProps {
  onClose?: () => void
}

const CONNECTORS: Connector[] = [
  { id: 'google-drive', name: 'Google Drive', description: 'Sync documents, spreadsheets, and files from Drive.', badge: 'Storage', docsUrl: 'https://drive.google.com' },
  { id: 'notion', name: 'Notion', description: 'Import pages, databases, and wikis from your Notion workspace.', badge: 'Knowledge' },
  { id: 'slack', name: 'Slack', description: 'Connect channels and threads for contextual AI responses.', badge: 'Communication' },
  { id: 'github', name: 'GitHub', description: 'Access repositories, issues, and pull requests for code context.', badge: 'Development' },
  { id: 'jira', name: 'Jira', description: 'Sync project boards, tickets, and sprint data for task management.', badge: 'Project Mgmt' },
]

export default function ConnectorsPanel({ onClose }: ConnectorsPanelProps) {
  const [statusMap, setStatusMap] = useState<Record<string, ConnectorStatus>>(
    CONNECTORS.reduce((acc, connector) => {
      acc[connector.id] = 'disconnected'
      return acc
    }, {} as Record<string, ConnectorStatus>)
  )

  const connectedCount = useMemo(
    () => Object.values(statusMap).filter((status) => status === 'connected').length,
    [statusMap]
  )

  const handleConnect = (connector: Connector) => {
    const currentStatus = statusMap[connector.id]
    if (currentStatus === 'connected') return
    setStatusMap((prev) => ({ ...prev, [connector.id]: 'connecting' }))
    setTimeout(() => {
      setStatusMap((prev) => ({ ...prev, [connector.id]: 'connected' }))
    }, 600)
  }

  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white shadow-sm dark:border-[#2d2d2d] dark:bg-[#212121]">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
            <Plug size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Connectors</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Link data sources for AI-powered workflows.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/40 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
            <ShieldCheck size={14} className="text-emerald-500" />
            {connectedCount} connected
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#2d2d2d]"
              aria-label="Close connectors panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 p-4 sm:grid-cols-2">
        {CONNECTORS.map((connector) => {
          const status = statusMap[connector.id]
          const isConnecting = status === 'connecting'
          const isConnected = status === 'connected'

          return (
            <div
              key={connector.id}
              className="flex h-full flex-col rounded-lg border border-gray-200 bg-gray-50/60 p-3 dark:border-[#2d2d2d] dark:bg-[#1a1a1a]"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{connector.name}</span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                      {connector.badge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{connector.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  {isConnected ? <CheckCircle2 size={16} className="text-emerald-500" /> : <WifiOff size={16} />}
                  <span className="capitalize">{status}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => handleConnect(connector)}
                  disabled={isConnecting}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isConnected
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                  } ${isConnecting ? 'opacity-80' : ''}`}
                >
                  {isConnecting ? <Loader2 size={16} className="animate-spin" /> : <Plug size={16} />}
                  {isConnected ? 'Connected' : isConnecting ? 'Connecting...' : 'Connect'}
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Simulated</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {connector.docsUrl && (
                <button
                  type="button"
                  onClick={() => window.open(connector.docsUrl, '_blank')}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  View setup guide
                  <ExternalLink size={14} />
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t border-gray-200 px-4 py-3 text-xs text-gray-600 dark:border-[#2d2d2d] dark:text-gray-300">
        Click <span className="font-semibold text-gray-900 dark:text-white">Connect</span> to simulate linking data sources. All connections are demo-only.
      </div>
    </div>
  )
}
