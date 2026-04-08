<<<<<<< HEAD
/**
 * General-Purpose AI Assistant Component
 * A versatile chat interface that can be adapted to any use case.
 * Features multiple AI agents, code generation, web search simulation,
 * and a modern ChatGPT-style UI with sidebar navigation.
 * 
 * All interactions are fully simulated — no backend calls required.
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot,
  Send,
  X,
  User,
  Paperclip,
  Copy,
  MessageCircle,
  Code,
  Lightbulb,
  Search,
  FileText,
  ChevronUp,
  ChevronDown,
  Star,
  Menu,
  GripVertical,
  Plus,
  Mic,
  Moon,
  Sun,
  Zap,
  BookOpen,
  LayoutGrid,
  CheckCircle2,
} from 'lucide-react'
import AIAssistantSidebar from './AIAssistantSidebar'
import AIThinkingLoader from './AIThinkingLoader'
import AIgentsListComponent from './AIgentsListComponent'
import ConnectorsPanel from './ConnectorsPanel'
import AIActionSimulation, { type SimulationMode } from './AIActionSimulation'

// ── Types ─────────────────────────────────────────────────

type AgentType = 'general' | 'coding' | 'writing' | 'research' | 'data-analysis' | 'creative'
type ModelType = string

interface AvailableAgent {
  id: string
  name: string
  description: string
  capabilities: string[]
}

interface AvailableModel {
  id: string
  name: string
  provider: string
  status?: string
  category?: string
}

const FALLBACK_AGENTS: AvailableAgent[] = [
  { id: 'general', name: 'General Assistant', description: 'Versatile AI for everyday tasks, Q&A, and problem solving.', capabilities: ['Answer questions', 'Summarize text', 'Brainstorm ideas', 'Task planning'] },
  { id: 'coding', name: 'Code Assistant', description: 'Expert at writing, reviewing, and debugging code across languages.', capabilities: ['Write code', 'Debug errors', 'Code review', 'Explain algorithms'] },
  { id: 'writing', name: 'Writing Assistant', description: 'Helps with content creation, editing, and copywriting.', capabilities: ['Draft articles', 'Edit prose', 'SEO copy', 'Email templates'] },
  { id: 'research', name: 'Research Assistant', description: 'Deep research, fact-checking, and analysis across topics.', capabilities: ['Literature review', 'Data synthesis', 'Fact checking', 'Report generation'] },
  { id: 'data-analysis', name: 'Data Analyst', description: 'Analyze datasets, generate insights, and create visualizations.', capabilities: ['Data cleaning', 'Statistical analysis', 'Chart generation', 'Trend detection'] },
  { id: 'creative', name: 'Creative Assistant', description: 'Generate creative content, stories, marketing copy, and more.', capabilities: ['Story writing', 'Ad copy', 'Social media', 'Brand voice'] },
]

const FALLBACK_MODELS: AvailableModel[] = [
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', provider: 'gemini', status: 'available', category: 'fast' },
  { id: 'gpt-5', name: 'GPT-5', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', status: 'available', category: 'cost-efficient' },
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'anthropic', status: 'available', category: 'general' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'anthropic', status: 'available', category: 'general' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'gemini', status: 'available', category: 'fast' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'gemini', status: 'available', category: 'fast' },
  // Ollama local models
  { id: 'llama3.2:latest', name: 'Llama 3.2 (Local)', provider: 'ollama', status: 'available', category: 'local' },
  { id: 'llama3.3:latest', name: 'Llama 3.3 (Local)', provider: 'ollama', status: 'available', category: 'local' },
  { id: 'gemma4:e4b', name: 'Gemma 4 E4B (Local)', provider: 'ollama', status: 'available', category: 'local' },
  { id: 'qwen2.5:7b', name: 'Qwen 2.5 7B (Local)', provider: 'ollama', status: 'available', category: 'local' },
]

interface AIAssistantProps {
  isOpen?: boolean
  onClose?: () => void
  fullscreenMode?: boolean
}

interface CodeSnippet {
  language: string
  code: string
  explanation?: string[]
}

interface Suggestion {
  text: string
  title: string
  description: string
  icon: React.ElementType
}

enum MessageType {
  Text = 'text',
  Code = 'code',
}

interface Message {
  type: MessageType
  text?: string
  sender: 'user' | 'bot'
  codeSnippet?: CodeSnippet
}

// ── Simulated Responses ───────────────────────────────────

const SIMULATED_RESPONSES: Record<string, (msg: string) => { text: string; type: MessageType; codeSnippet?: CodeSnippet }> = {
  general: (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return { text: "Hello! I'm your AI assistant. I can help with coding, writing, research, data analysis, and more. What would you like to work on today?", type: MessageType.Text }
    }
    if (lower.includes('summarize') || lower.includes('summary')) {
      return { text: "Here's a summary based on your request:\n\n**Key Points:**\n- The main topic revolves around efficient information processing\n- Three primary approaches were identified\n- Recommendation: Start with the most impactful action first\n\n*This is a simulated summary. In production, the AI would analyze your actual content.*", type: MessageType.Text }
    }
    return { text: `I've analyzed your request: "${msg}"\n\n**Analysis:**\nThis is a simulated response demonstrating the assistant's capability to handle general queries. In a production environment, this would connect to an AI model for intelligent responses.\n\n**Suggested next steps:**\n1. Refine your query for more specific results\n2. Try switching to a specialized agent (Coding, Writing, Research)\n3. Use the web search or deep research features for comprehensive answers`, type: MessageType.Text }
  },
  coding: (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('react') || lower.includes('component')) {
      return {
        text: "Here's a React component based on your request:",
        type: MessageType.Code,
        codeSnippet: {
          language: 'typescript',
          code: `import React, { useState } from 'react'\n\ninterface Props {\n  title: string\n  onAction: () => void\n}\n\nexport default function SmartComponent({ title, onAction }: Props) {\n  const [isActive, setIsActive] = useState(false)\n\n  return (\n    <div className="p-4 rounded-xl border bg-white shadow-sm">\n      <h2 className="text-lg font-semibold">{title}</h2>\n      <button\n        onClick={() => { setIsActive(!isActive); onAction() }}\n        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"\n      >\n        {isActive ? 'Active' : 'Activate'}\n      </button>\n    </div>\n  )\n}`,
          explanation: ['Functional component with TypeScript props interface', 'Uses useState for local state management', 'Tailwind CSS for styling', 'Callback prop for parent communication'],
        },
      }
    }
    if (lower.includes('python') || lower.includes('api') || lower.includes('fastapi')) {
      return {
        text: "Here's a Python FastAPI example:",
        type: MessageType.Code,
        codeSnippet: {
          language: 'python',
          code: `from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI(title="My API")\n\nclass Item(BaseModel):\n    name: str\n    description: str | None = None\n    price: float\n\nitems_db: dict[str, Item] = {}\n\n@app.post("/items/{item_id}")\nasync def create_item(item_id: str, item: Item):\n    if item_id in items_db:\n        raise HTTPException(status_code=400, detail="Item already exists")\n    items_db[item_id] = item\n    return {"id": item_id, **item.model_dump()}\n\n@app.get("/items/{item_id}")\nasync def read_item(item_id: str):\n    if item_id not in items_db:\n        raise HTTPException(status_code=404, detail="Item not found")\n    return items_db[item_id]`,
          explanation: ['FastAPI with Pydantic models', 'CRUD endpoints with validation', 'Error handling with HTTPException', 'Type-safe request/response'],
        },
      }
    }
    return { text: `**Code Assistant** — analyzing: "${msg}"\n\nI can help you with:\n- Writing new code in any language\n- Debugging existing code\n- Code reviews and optimization\n- Architecture recommendations\n\n*Try asking me to write a React component, a Python API, or debug a specific error.*`, type: MessageType.Text }
  },
  writing: (msg) => ({
    text: `**Writing Assistant** — here's a draft based on your request:\n\n---\n\n**Draft:**\n\n${msg.length > 20 ? `Based on your topic "${msg.slice(0, 50)}...", here's a structured outline:\n\n1. **Introduction** — Hook the reader with a compelling opening\n2. **Main Body** — Present your key arguments with supporting evidence\n3. **Conclusion** — Summarize and call to action\n\n*This is a simulated draft. The full AI would generate complete, polished content.*` : 'Please provide more details about what you\'d like me to write, and I\'ll create a tailored draft for you.'}`,
    type: MessageType.Text,
  }),
  research: (msg) => ({
    text: `**Research Assistant** — findings for: "${msg}"\n\n**Executive Summary:**\nBased on simulated analysis of multiple sources:\n\n**Key Findings:**\n1. Primary trend indicates growing adoption across industries\n2. Three competing approaches identified in recent literature\n3. Cost-benefit analysis favors the modern approach\n\n**Sources Analyzed:** 12 papers, 5 industry reports, 3 regulatory documents\n\n**Confidence Level:** High (simulated)\n\n*In production, this would perform actual web searches and literature reviews.*`,
    type: MessageType.Text,
  }),
  'data-analysis': (msg) => ({
    text: `**Data Analyst** — analysis for: "${msg}"\n\n**Dataset Overview:**\n- Records analyzed: 10,000 (simulated)\n- Time range: Last 12 months\n- Key metrics: Revenue, Growth Rate, Retention\n\n**Insights:**\n📈 **Trend:** Upward trajectory with 15% QoQ growth\n📊 **Distribution:** Normal distribution with slight right skew\n🎯 **Anomalies:** 2 outliers detected in Q3\n\n**Recommendation:** Focus on the top-performing segments for maximum ROI.\n\n*This is simulated data analysis. Connect a real dataset for actual insights.*`,
    type: MessageType.Text,
  }),
  creative: (msg) => ({
    text: `**Creative Assistant** — here's what I came up with:\n\n✨ **Creative Brief:**\n\nBased on "${msg}":\n\n**Concept:** A fresh, modern approach that combines storytelling with data-driven messaging.\n\n**Tagline Options:**\n1. "Where innovation meets intention"\n2. "Built different. Built better."\n3. "The future starts with a conversation"\n\n**Tone:** Professional yet approachable, confident but not arrogant.\n\n*This is a simulated creative output. The full AI would generate tailored content based on your brand and audience.*`,
    type: MessageType.Text,
  }),
}

function getSimulatedResponse(agent: AgentType, message: string) {
  const handler = SIMULATED_RESPONSES[agent] || SIMULATED_RESPONSES.general
  return handler(message)
}

// ── Suggestions ───────────────────────────────────────────

const SUGGESTIONS: Suggestion[] = [
  { text: 'Write a React component with TypeScript', title: 'Code Generation', description: 'Generate production-ready code', icon: Code },
  { text: 'Summarize the key trends in AI for 2025', title: 'Research', description: 'Deep analysis and insights', icon: Search },
  { text: 'Draft a professional email for a client proposal', title: 'Writing', description: 'Content creation and editing', icon: FileText },
  { text: 'Analyze sales data and identify growth opportunities', title: 'Data Analysis', description: 'Insights from your data', icon: Lightbulb },
]

// ── Code Block Component ──────────────────────────────────

const CodeBlock: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mx-auto my-2 w-full max-w-3xl rounded-lg bg-gray-900 p-4 font-mono text-sm text-white shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{snippet.language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-300 transition-colors duration-200 hover:bg-gray-600"
        >
          {copied ? (
            <><CheckCircle2 size={14} className="text-green-400" /> <span>Copied!</span></>
          ) : (
            <><Copy size={14} /> <span>Copy code</span></>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-relaxed">
        <code>{snippet.code}</code>
      </pre>
      {snippet.explanation && (
        <div className="mt-4 border-t border-gray-700 pt-3 text-gray-300">
          <p className="mb-1 font-semibold text-xs">Explanation:</p>
          <ul className="list-inside list-disc text-xs space-y-0.5">
            {snippet.explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen = true, onClose, fullscreenMode = true }) => {
  // Theme
  const [isDark, setIsDark] = useState(true)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('general')
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-4o')
  const [agents] = useState<AvailableAgent[]>(FALLBACK_AGENTS)
  const [models] = useState<AvailableModel[]>(FALLBACK_MODELS)

  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ session_id: string; created_at: string; last_activity: string; provider: string; message_count: number; first_message: string }>>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  // Panel state
  const [showAgentsModal, setShowAgentsModal] = useState(false)
  const [showConnectors, setShowConnectors] = useState(false)
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [simulationMode, setSimulationMode] = useState<SimulationMode | null>(null)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleNewChat = useCallback(() => {
    const sessionId = crypto.randomUUID()
    setCurrentSessionId(sessionId)
    setMessages([])
    setInputMessage('')
    setShowAgentsModal(false)
    setShowConnectors(false)
    setSimulationMode(null)
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = useCallback(async () => {
    const text = inputMessage.trim()
    if (!text || isThinking) return

    const userMsg: Message = { type: MessageType.Text, text, sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsThinking(true)

    // Add to chat history if new session
    if (!currentSessionId) {
      const newSessionId = crypto.randomUUID()
      setCurrentSessionId(newSessionId)
      setChatHistory((prev) => [
        { session_id: newSessionId, created_at: new Date().toISOString(), last_activity: new Date().toISOString(), provider: selectedModel, message_count: 1, first_message: text },
        ...prev,
      ])
    }

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1500))

    const response = getSimulatedResponse(selectedAgent, text)
    const botMsg: Message = {
      type: response.type,
      text: response.text,
      sender: 'bot',
      codeSnippet: response.codeSnippet,
    }

    setMessages((prev) => [...prev, botMsg])
    setIsThinking(false)
  }, [inputMessage, isThinking, selectedAgent, selectedModel, currentSessionId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputMessage(suggestion.text)
    inputRef.current?.focus()
  }

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId as AgentType)
    setShowAgentsModal(false)
  }

  if (!isOpen) return null

  const themeClass = isDark ? 'dark' : ''

  return (
    <div className={themeClass}>
      <div className="flex h-screen w-screen bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <AIAssistantSidebar
            chats={chatHistory}
            currentSessionId={currentSessionId}
            onSelectChat={(id) => setCurrentSessionId(id)}
            onNewChat={handleNewChat}
            isLoadingChats={false}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenAgentsModal={() => setShowAgentsModal(true)}
            onOpenConnectors={() => setShowConnectors(true)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2d2d2d] px-4 py-2.5 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors"
                title="Toggle sidebar"
              >
                <Menu size={18} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Model Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors"
                >
                  <Bot size={16} className="text-indigo-500" />
                  {models.find((m) => m.id === selectedModel)?.name || selectedModel}
                  <ChevronDown size={14} />
                </button>
                {showModelSelector && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#404040] rounded-xl shadow-xl z-50 py-1 max-h-80 overflow-y-auto">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => { setSelectedModel(model.id); setShowModelSelector(false) }}
                        className={`flex items-center gap-3 w-full px-3 py-2 text-left text-sm transition-colors ${
                          selectedModel === model.id
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#383838]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{model.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{model.provider} · {model.category}</p>
                        </div>
                        {selectedModel === model.id && <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent Badge */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Zap size={12} />
                {agents.find((a) => a.id === selectedAgent)?.name || 'General'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                title="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* New Chat */}
              <button
                onClick={handleNewChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                title="New chat"
              >
                <Plus size={16} />
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                  title="Close"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto">
              {/* Agents Modal */}
              {showAgentsModal && (
                <div className="mb-6">
                  <AIgentsListComponent agents={agents} onSelectAgent={handleAgentSelect} />
                </div>
              )}

              {/* Connectors Panel */}
              {showConnectors && (
                <div className="mb-6">
                  <ConnectorsPanel onClose={() => setShowConnectors(false)} />
                </div>
              )}

              {/* Simulation Panel */}
              {simulationMode && (
                <div className="mb-6">
                  <AIActionSimulation mode={simulationMode} onClose={() => setSimulationMode(null)} />
                </div>
              )}

              {/* Empty State */}
              {messages.length === 0 && !showAgentsModal && !showConnectors && !simulationMode && (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
                    <Bot size={32} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    How can I help you today?
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
                    I'm a general-purpose AI assistant. Ask me anything — coding, writing, research, data analysis, or creative tasks.
                  </p>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {[
                      { label: 'Web Search', icon: Search, mode: 'web-search' as SimulationMode },
                      { label: 'Deep Research', icon: BookOpen, mode: 'deep-research' as SimulationMode },
                      { label: 'Analyze File', icon: FileText, mode: 'analyze-file' as SimulationMode },
                    ].map((action) => (
                      <button
                        key={action.label}
                        onClick={() => setSimulationMode(action.mode)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-[#404040] text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2d2d2d] transition-colors"
                      >
                        <action.icon size={14} />
                        {action.label}
                      </button>
                    ))}
                  </div>

                  {/* Suggestion Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1a1a1a] hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] flex items-center justify-center shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                          <s.icon size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{s.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-[#2d2d2d] text-gray-900 dark:text-gray-100 rounded-bl-md'
                      }`}
                    >
                      {msg.text && (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                    </div>
                    {msg.type === MessageType.Code && msg.codeSnippet && (
                      <CodeBlock snippet={msg.codeSnippet} />
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                      <User size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-[#2d2d2d] rounded-2xl rounded-bl-md px-4 py-3">
                    <AIThinkingLoader
                      agentName={agents.find((a) => a.id === selectedAgent)?.name}
                      modelName={models.find((m) => m.id === selectedModel)?.name}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="shrink-0 border-t border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#212121] px-4 py-3">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-end gap-2 rounded-2xl border border-gray-200 dark:border-[#404040] bg-gray-50 dark:bg-[#2d2d2d] px-3 py-2 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 transition-colors">
                {/* Attach Button */}
                <button
                  onClick={() => setSimulationMode('analyze-file')}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#404040] transition-colors shrink-0"
                  title="Attach file (simulated)"
                >
                  <Paperclip size={18} />
                </button>

                {/* Text Input */}
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Assistant..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none max-h-32 py-1.5"
                  style={{ minHeight: '24px' }}
                />

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isThinking}
                  className={`p-2 rounded-xl transition-all shrink-0 ${
                    inputMessage.trim() && !isThinking
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                      : 'bg-gray-200 dark:bg-[#404040] text-gray-400 cursor-not-allowed'
                  }`}
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-2">
                AI responses are simulated for demo purposes. No data is sent to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
=======
/**
 * General-Purpose AI Assistant Component
 * A versatile chat interface that can be adapted to any use case.
 * Features multiple AI agents, code generation, web search simulation,
 * and a modern ChatGPT-style UI with sidebar navigation.
 * 
 * All interactions are fully simulated — no backend calls required.
 */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Bot,
  Send,
  X,
  User,
  Paperclip,
  Copy,
  MessageCircle,
  Code,
  Lightbulb,
  Search,
  FileText,
  ChevronUp,
  ChevronDown,
  Star,
  Menu,
  GripVertical,
  Plus,
  Mic,
  Moon,
  Sun,
  Zap,
  BookOpen,
  LayoutGrid,
  CheckCircle2,
} from 'lucide-react'
import AIAssistantSidebar from './AIAssistantSidebar'
import AIThinkingLoader from './AIThinkingLoader'
import AIgentsListComponent from './AIgentsListComponent'
import ConnectorsPanel from './ConnectorsPanel'
import AIActionSimulation, { type SimulationMode } from './AIActionSimulation'

// ── Types ─────────────────────────────────────────────────

type AgentType = 'general' | 'coding' | 'writing' | 'research' | 'data-analysis' | 'creative'
type ModelType = string

interface AvailableAgent {
  id: string
  name: string
  description: string
  capabilities: string[]
}

interface AvailableModel {
  id: string
  name: string
  provider: string
  status?: string
  category?: string
}

const FALLBACK_AGENTS: AvailableAgent[] = [
  { id: 'general', name: 'General Assistant', description: 'Versatile AI for everyday tasks, Q&A, and problem solving.', capabilities: ['Answer questions', 'Summarize text', 'Brainstorm ideas', 'Task planning'] },
  { id: 'coding', name: 'Code Assistant', description: 'Expert at writing, reviewing, and debugging code across languages.', capabilities: ['Write code', 'Debug errors', 'Code review', 'Explain algorithms'] },
  { id: 'writing', name: 'Writing Assistant', description: 'Helps with content creation, editing, and copywriting.', capabilities: ['Draft articles', 'Edit prose', 'SEO copy', 'Email templates'] },
  { id: 'research', name: 'Research Assistant', description: 'Deep research, fact-checking, and analysis across topics.', capabilities: ['Literature review', 'Data synthesis', 'Fact checking', 'Report generation'] },
  { id: 'data-analysis', name: 'Data Analyst', description: 'Analyze datasets, generate insights, and create visualizations.', capabilities: ['Data cleaning', 'Statistical analysis', 'Chart generation', 'Trend detection'] },
  { id: 'creative', name: 'Creative Assistant', description: 'Generate creative content, stories, marketing copy, and more.', capabilities: ['Story writing', 'Ad copy', 'Social media', 'Brand voice'] },
]

const FALLBACK_MODELS: AvailableModel[] = [
  { id: 'gemini-flash-latest', name: 'Gemini Flash Latest', provider: 'gemini', status: 'available', category: 'fast' },
  { id: 'gpt-5', name: 'GPT-5', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'openai', status: 'available', category: 'general' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', status: 'available', category: 'cost-efficient' },
  { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', provider: 'anthropic', status: 'available', category: 'general' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', provider: 'anthropic', status: 'available', category: 'general' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'gemini', status: 'available', category: 'fast' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'gemini', status: 'available', category: 'fast' },
]

interface AIAssistantProps {
  isOpen?: boolean
  onClose?: () => void
  fullscreenMode?: boolean
}

interface CodeSnippet {
  language: string
  code: string
  explanation?: string[]
}

interface Suggestion {
  text: string
  title: string
  description: string
  icon: React.ElementType
}

enum MessageType {
  Text = 'text',
  Code = 'code',
}

interface Message {
  type: MessageType
  text?: string
  sender: 'user' | 'bot'
  codeSnippet?: CodeSnippet
}

// ── Simulated Responses ───────────────────────────────────

const SIMULATED_RESPONSES: Record<string, (msg: string) => { text: string; type: MessageType; codeSnippet?: CodeSnippet }> = {
  general: (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      return { text: "Hello! I'm your AI assistant. I can help with coding, writing, research, data analysis, and more. What would you like to work on today?", type: MessageType.Text }
    }
    if (lower.includes('summarize') || lower.includes('summary')) {
      return { text: "Here's a summary based on your request:\n\n**Key Points:**\n- The main topic revolves around efficient information processing\n- Three primary approaches were identified\n- Recommendation: Start with the most impactful action first\n\n*This is a simulated summary. In production, the AI would analyze your actual content.*", type: MessageType.Text }
    }
    return { text: `I've analyzed your request: "${msg}"\n\n**Analysis:**\nThis is a simulated response demonstrating the assistant's capability to handle general queries. In a production environment, this would connect to an AI model for intelligent responses.\n\n**Suggested next steps:**\n1. Refine your query for more specific results\n2. Try switching to a specialized agent (Coding, Writing, Research)\n3. Use the web search or deep research features for comprehensive answers`, type: MessageType.Text }
  },
  coding: (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('react') || lower.includes('component')) {
      return {
        text: "Here's a React component based on your request:",
        type: MessageType.Code,
        codeSnippet: {
          language: 'typescript',
          code: `import React, { useState } from 'react'\n\ninterface Props {\n  title: string\n  onAction: () => void\n}\n\nexport default function SmartComponent({ title, onAction }: Props) {\n  const [isActive, setIsActive] = useState(false)\n\n  return (\n    <div className="p-4 rounded-xl border bg-white shadow-sm">\n      <h2 className="text-lg font-semibold">{title}</h2>\n      <button\n        onClick={() => { setIsActive(!isActive); onAction() }}\n        className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"\n      >\n        {isActive ? 'Active' : 'Activate'}\n      </button>\n    </div>\n  )\n}`,
          explanation: ['Functional component with TypeScript props interface', 'Uses useState for local state management', 'Tailwind CSS for styling', 'Callback prop for parent communication'],
        },
      }
    }
    if (lower.includes('python') || lower.includes('api') || lower.includes('fastapi')) {
      return {
        text: "Here's a Python FastAPI example:",
        type: MessageType.Code,
        codeSnippet: {
          language: 'python',
          code: `from fastapi import FastAPI, HTTPException\nfrom pydantic import BaseModel\n\napp = FastAPI(title="My API")\n\nclass Item(BaseModel):\n    name: str\n    description: str | None = None\n    price: float\n\nitems_db: dict[str, Item] = {}\n\n@app.post("/items/{item_id}")\nasync def create_item(item_id: str, item: Item):\n    if item_id in items_db:\n        raise HTTPException(status_code=400, detail="Item already exists")\n    items_db[item_id] = item\n    return {"id": item_id, **item.model_dump()}\n\n@app.get("/items/{item_id}")\nasync def read_item(item_id: str):\n    if item_id not in items_db:\n        raise HTTPException(status_code=404, detail="Item not found")\n    return items_db[item_id]`,
          explanation: ['FastAPI with Pydantic models', 'CRUD endpoints with validation', 'Error handling with HTTPException', 'Type-safe request/response'],
        },
      }
    }
    return { text: `**Code Assistant** — analyzing: "${msg}"\n\nI can help you with:\n- Writing new code in any language\n- Debugging existing code\n- Code reviews and optimization\n- Architecture recommendations\n\n*Try asking me to write a React component, a Python API, or debug a specific error.*`, type: MessageType.Text }
  },
  writing: (msg) => ({
    text: `**Writing Assistant** — here's a draft based on your request:\n\n---\n\n**Draft:**\n\n${msg.length > 20 ? `Based on your topic "${msg.slice(0, 50)}...", here's a structured outline:\n\n1. **Introduction** — Hook the reader with a compelling opening\n2. **Main Body** — Present your key arguments with supporting evidence\n3. **Conclusion** — Summarize and call to action\n\n*This is a simulated draft. The full AI would generate complete, polished content.*` : 'Please provide more details about what you\'d like me to write, and I\'ll create a tailored draft for you.'}`,
    type: MessageType.Text,
  }),
  research: (msg) => ({
    text: `**Research Assistant** — findings for: "${msg}"\n\n**Executive Summary:**\nBased on simulated analysis of multiple sources:\n\n**Key Findings:**\n1. Primary trend indicates growing adoption across industries\n2. Three competing approaches identified in recent literature\n3. Cost-benefit analysis favors the modern approach\n\n**Sources Analyzed:** 12 papers, 5 industry reports, 3 regulatory documents\n\n**Confidence Level:** High (simulated)\n\n*In production, this would perform actual web searches and literature reviews.*`,
    type: MessageType.Text,
  }),
  'data-analysis': (msg) => ({
    text: `**Data Analyst** — analysis for: "${msg}"\n\n**Dataset Overview:**\n- Records analyzed: 10,000 (simulated)\n- Time range: Last 12 months\n- Key metrics: Revenue, Growth Rate, Retention\n\n**Insights:**\n📈 **Trend:** Upward trajectory with 15% QoQ growth\n📊 **Distribution:** Normal distribution with slight right skew\n🎯 **Anomalies:** 2 outliers detected in Q3\n\n**Recommendation:** Focus on the top-performing segments for maximum ROI.\n\n*This is simulated data analysis. Connect a real dataset for actual insights.*`,
    type: MessageType.Text,
  }),
  creative: (msg) => ({
    text: `**Creative Assistant** — here's what I came up with:\n\n✨ **Creative Brief:**\n\nBased on "${msg}":\n\n**Concept:** A fresh, modern approach that combines storytelling with data-driven messaging.\n\n**Tagline Options:**\n1. "Where innovation meets intention"\n2. "Built different. Built better."\n3. "The future starts with a conversation"\n\n**Tone:** Professional yet approachable, confident but not arrogant.\n\n*This is a simulated creative output. The full AI would generate tailored content based on your brand and audience.*`,
    type: MessageType.Text,
  }),
}

function getSimulatedResponse(agent: AgentType, message: string) {
  const handler = SIMULATED_RESPONSES[agent] || SIMULATED_RESPONSES.general
  return handler(message)
}

// ── Suggestions ───────────────────────────────────────────

const SUGGESTIONS: Suggestion[] = [
  { text: 'Write a React component with TypeScript', title: 'Code Generation', description: 'Generate production-ready code', icon: Code },
  { text: 'Summarize the key trends in AI for 2025', title: 'Research', description: 'Deep analysis and insights', icon: Search },
  { text: 'Draft a professional email for a client proposal', title: 'Writing', description: 'Content creation and editing', icon: FileText },
  { text: 'Analyze sales data and identify growth opportunities', title: 'Data Analysis', description: 'Insights from your data', icon: Lightbulb },
]

// ── Code Block Component ──────────────────────────────────

const CodeBlock: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mx-auto my-2 w-full max-w-3xl rounded-lg bg-gray-900 p-4 font-mono text-sm text-white shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">{snippet.language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center space-x-1 rounded-md bg-gray-700 px-2 py-1 text-xs text-gray-300 transition-colors duration-200 hover:bg-gray-600"
        >
          {copied ? (
            <><CheckCircle2 size={14} className="text-green-400" /> <span>Copied!</span></>
          ) : (
            <><Copy size={14} /> <span>Copy code</span></>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-relaxed">
        <code>{snippet.code}</code>
      </pre>
      {snippet.explanation && (
        <div className="mt-4 border-t border-gray-700 pt-3 text-gray-300">
          <p className="mb-1 font-semibold text-xs">Explanation:</p>
          <ul className="list-inside list-disc text-xs space-y-0.5">
            {snippet.explanation.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen = true, onClose, fullscreenMode = true }) => {
  // Theme
  const [isDark, setIsDark] = useState(true)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<AgentType>('general')
  const [selectedModel, setSelectedModel] = useState<ModelType>('gpt-4o')
  const [agents] = useState<AvailableAgent[]>(FALLBACK_AGENTS)
  const [models] = useState<AvailableModel[]>(FALLBACK_MODELS)

  // Sidebar state
  const [showSidebar, setShowSidebar] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [chatHistory, setChatHistory] = useState<Array<{ session_id: string; created_at: string; last_activity: string; provider: string; message_count: number; first_message: string }>>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  // Panel state
  const [showAgentsModal, setShowAgentsModal] = useState(false)
  const [showConnectors, setShowConnectors] = useState(false)
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [simulationMode, setSimulationMode] = useState<SimulationMode | null>(null)

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleNewChat = useCallback(() => {
    const sessionId = crypto.randomUUID()
    setCurrentSessionId(sessionId)
    setMessages([])
    setInputMessage('')
    setShowAgentsModal(false)
    setShowConnectors(false)
    setSimulationMode(null)
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = useCallback(async () => {
    const text = inputMessage.trim()
    if (!text || isThinking) return

    const userMsg: Message = { type: MessageType.Text, text, sender: 'user' }
    setMessages((prev) => [...prev, userMsg])
    setInputMessage('')
    setIsThinking(true)

    // Add to chat history if new session
    if (!currentSessionId) {
      const newSessionId = crypto.randomUUID()
      setCurrentSessionId(newSessionId)
      setChatHistory((prev) => [
        { session_id: newSessionId, created_at: new Date().toISOString(), last_activity: new Date().toISOString(), provider: selectedModel, message_count: 1, first_message: text },
        ...prev,
      ])
    }

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1500))

    const response = getSimulatedResponse(selectedAgent, text)
    const botMsg: Message = {
      type: response.type,
      text: response.text,
      sender: 'bot',
      codeSnippet: response.codeSnippet,
    }

    setMessages((prev) => [...prev, botMsg])
    setIsThinking(false)
  }, [inputMessage, isThinking, selectedAgent, selectedModel, currentSessionId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputMessage(suggestion.text)
    inputRef.current?.focus()
  }

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgent(agentId as AgentType)
    setShowAgentsModal(false)
  }

  if (!isOpen) return null

  const themeClass = isDark ? 'dark' : ''

  return (
    <div className={themeClass}>
      <div className="flex h-screen w-screen bg-white dark:bg-[#212121] text-gray-900 dark:text-gray-100 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <AIAssistantSidebar
            chats={chatHistory}
            currentSessionId={currentSessionId}
            onSelectChat={(id) => setCurrentSessionId(id)}
            onNewChat={handleNewChat}
            isLoadingChats={false}
            isCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenAgentsModal={() => setShowAgentsModal(true)}
            onOpenConnectors={() => setShowConnectors(true)}
          />
        )}

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#2d2d2d] px-4 py-2.5 shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors"
                title="Toggle sidebar"
              >
                <Menu size={18} className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Model Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors"
                >
                  <Bot size={16} className="text-indigo-500" />
                  {models.find((m) => m.id === selectedModel)?.name || selectedModel}
                  <ChevronDown size={14} />
                </button>
                {showModelSelector && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-[#2d2d2d] border border-gray-200 dark:border-[#404040] rounded-xl shadow-xl z-50 py-1 max-h-80 overflow-y-auto">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => { setSelectedModel(model.id); setShowModelSelector(false) }}
                        className={`flex items-center gap-3 w-full px-3 py-2 text-left text-sm transition-colors ${
                          selectedModel === model.id
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#383838]'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{model.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{model.provider} · {model.category}</p>
                        </div>
                        {selectedModel === model.id && <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Agent Badge */}
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <Zap size={12} />
                {agents.find((a) => a.id === selectedAgent)?.name || 'General'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                title="Toggle theme"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* New Chat */}
              <button
                onClick={handleNewChat}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                title="New chat"
              >
                <Plus size={16} />
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2d2d2d] transition-colors text-gray-600 dark:text-gray-400"
                  title="Close"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="max-w-3xl mx-auto">
              {/* Agents Modal */}
              {showAgentsModal && (
                <div className="mb-6">
                  <AIgentsListComponent agents={agents} onSelectAgent={handleAgentSelect} />
                </div>
              )}

              {/* Connectors Panel */}
              {showConnectors && (
                <div className="mb-6">
                  <ConnectorsPanel onClose={() => setShowConnectors(false)} />
                </div>
              )}

              {/* Simulation Panel */}
              {simulationMode && (
                <div className="mb-6">
                  <AIActionSimulation mode={simulationMode} onClose={() => setSimulationMode(null)} />
                </div>
              )}

              {/* Empty State */}
              {messages.length === 0 && !showAgentsModal && !showConnectors && !simulationMode && (
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
                    <Bot size={32} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    How can I help you today?
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
                    I'm a general-purpose AI assistant. Ask me anything — coding, writing, research, data analysis, or creative tasks.
                  </p>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 mb-8 justify-center">
                    {[
                      { label: 'Web Search', icon: Search, mode: 'web-search' as SimulationMode },
                      { label: 'Deep Research', icon: BookOpen, mode: 'deep-research' as SimulationMode },
                      { label: 'Analyze File', icon: FileText, mode: 'analyze-file' as SimulationMode },
                    ].map((action) => (
                      <button
                        key={action.label}
                        onClick={() => setSimulationMode(action.mode)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-[#404040] text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2d2d2d] transition-colors"
                      >
                        <action.icon size={14} />
                        {action.label}
                      </button>
                    ))}
                  </div>

                  {/* Suggestion Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                    {SUGGESTIONS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(s)}
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#1a1a1a] hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#2d2d2d] flex items-center justify-center shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                          <s.icon size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{s.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-first' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-[#2d2d2d] text-gray-900 dark:text-gray-100 rounded-bl-md'
                      }`}
                    >
                      {msg.text && (
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      )}
                    </div>
                    {msg.type === MessageType.Code && msg.codeSnippet && (
                      <CodeBlock snippet={msg.codeSnippet} />
                    )}
                  </div>
                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-1">
                      <User size={16} className="text-gray-600 dark:text-gray-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-100 dark:bg-[#2d2d2d] rounded-2xl rounded-bl-md px-4 py-3">
                    <AIThinkingLoader
                      agentName={agents.find((a) => a.id === selectedAgent)?.name}
                      modelName={models.find((m) => m.id === selectedModel)?.name}
                    />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="shrink-0 border-t border-gray-200 dark:border-[#2d2d2d] bg-white dark:bg-[#212121] px-4 py-3">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-end gap-2 rounded-2xl border border-gray-200 dark:border-[#404040] bg-gray-50 dark:bg-[#2d2d2d] px-3 py-2 focus-within:border-indigo-400 dark:focus-within:border-indigo-600 transition-colors">
                {/* Attach Button */}
                <button
                  onClick={() => setSimulationMode('analyze-file')}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#404040] transition-colors shrink-0"
                  title="Attach file (simulated)"
                >
                  <Paperclip size={18} />
                </button>

                {/* Text Input */}
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI Assistant..."
                  rows={1}
                  className="flex-1 resize-none bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none max-h-32 py-1.5"
                  style={{ minHeight: '24px' }}
                />

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isThinking}
                  className={`p-2 rounded-xl transition-all shrink-0 ${
                    inputMessage.trim() && !isThinking
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                      : 'bg-gray-200 dark:bg-[#404040] text-gray-400 cursor-not-allowed'
                  }`}
                  title="Send message"
                >
                  <Send size={16} />
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-2">
                AI responses are simulated for demo purposes. No data is sent to any server.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant
>>>>>>> 22b0267a21511be5230e2e8a7fbb8f3f2d788d52
