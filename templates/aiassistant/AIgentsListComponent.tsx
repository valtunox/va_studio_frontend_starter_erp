import React from 'react'
import { Bot, Sparkles, Shield, Activity } from 'lucide-react'

interface AgentListItem {
  id: string;
  name: string;
  description: string;
  capabilities?: string[];
}

interface AIgentsListComponentProps {
  agents: AgentListItem[];
  onSelectAgent?: (agentId: string) => void;
}

const AIgentsListComponent: React.FC<AIgentsListComponentProps> = ({ agents, onSelectAgent }) => {
  if (!agents || agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/50">
        <Sparkles size={24} className="text-purple-500" />
        <h3 className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
          No AI agents yet
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Configure agents in the builder to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full min-h-0">
      <div className="shrink-0 space-y-2 pb-2">
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-linear-to-br from-purple-500 via-fuchsia-500 to-pink-500 p-1.5 shadow">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-gray-900 dark:text-gray-100">AI Agents Directory</h2>
              <p className="text-[11px] leading-tight text-gray-500 dark:text-gray-400">
                Overview of your workflow assistants.
              </p>
            </div>
          </div>
        </header>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
        <div className="grid grid-cols-1 gap-2 pb-4">
        {agents.map((agent) => (
          <article
            key={agent.id}
            className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-xs transition-all duration-200 hover:border-purple-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-900 cursor-pointer"
            onClick={() => {
              onSelectAgent?.(agent.id);
            }}
          >
            <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-purple-500/10 transition-opacity group-hover:opacity-70" />
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold leading-tight text-gray-900 dark:text-gray-100">
                    {agent.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-gray-500 dark:text-gray-400">{agent.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-purple-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-purple-600 dark:bg-purple-500/20 dark:text-purple-300">
                  #{agent.id}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <Shield size={10} />
                  Ready
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  <Activity size={10} />
                  Real-time
                </span>
              </div>

              {agent.capabilities && agent.capabilities.length > 0 ? (
                <ul className="space-y-1 rounded bg-gray-50 p-2 text-[10px] text-gray-600 dark:bg-gray-800/70 dark:text-gray-300">
                  {agent.capabilities.slice(0, 2).map((capability, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                      <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-[9px] font-semibold text-purple-600 dark:text-purple-300">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1 truncate">{capability}</span>
                    </li>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <li className="text-[9px] italic text-purple-500 dark:text-purple-300">
                      +{agent.capabilities.length - 2} more
                    </li>
                  )}
                </ul>
              ) : (
                <div className="rounded border border-dashed border-gray-200 p-2 text-[10px] leading-tight text-gray-500 dark:border-gray-700 dark:text-gray-400">
                  Capabilities not defined. Open builder to add actions.
                </div>
              )}
            </div>
          </article>
        ))}
        </div>
      </div>
    </div>
  );
};

export default AIgentsListComponent;

