/**
 * AI Assistant Sidebar Component
 * General-purpose navigation with chat history, AI agents, and connectors.
 * No HR/cloudsystem content. No backend calls.
 */
import React, { useState, useEffect, useRef } from 'react'
import {
  Bot,
  Settings,
  MoreHorizontal,
  Sparkles,
  Plus,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Palette,
  HelpCircle,
  Plug,
} from 'lucide-react'

interface Chat {
  session_id: string
  created_at: string
  last_activity: string
  provider: string
  message_count: number
  first_message: string
}

interface AIAssistantSidebarProps {
  chats: Chat[]
  currentSessionId: string | null
  onSelectChat: (sessionId: string) => void
  onNewChat: () => void
  isLoadingChats: boolean
  isCollapsed: boolean
  onToggleCollapse: () => void
  onOpenAgentsModal?: () => void
  onOpenConnectors?: () => void
}

const AIAssistantSidebar: React.FC<AIAssistantSidebarProps> = ({
  chats,
  currentSessionId,
  onSelectChat,
  onNewChat,
  isLoadingChats,
  isCollapsed,
  onToggleCollapse,
  onOpenAgentsModal,
  onOpenConnectors,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  const navigationItems = [
    { id: 'aiagents', title: 'AI Agents', icon: <Bot size={18} /> },
    { id: 'connectors', title: 'Connectors', icon: <Plug size={18} /> },
  ]

  const getTimeAgo = (date: Date): string => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
    return date.toLocaleDateString()
  }

  const handleNavigationSelect = (itemId: string) => {
    if (itemId === 'aiagents') {
      onOpenAgentsModal?.()
    } else if (itemId === 'connectors') {
      onOpenConnectors?.()
    }
  }

  return (
    <div
      className={`flex flex-col h-full bg-[#f9f9f9] dark:bg-[#171717] text-gray-800 dark:text-gray-200 border-r border-gray-200 dark:border-[#2d2d2d] overflow-y-auto shrink-0 transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-[260px]'
      }`}
    >
      {/* Header */}
      <div className="p-3">
        <div className="flex items-center justify-between px-2 py-2">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">AI Assistant</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">2.0</span>
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#2d2d2d] transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-[#2d2d2d] transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-3 space-y-0.5">
          <button
            onClick={onNewChat}
            className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-[#2d2d2d] transition-colors text-gray-700 dark:text-gray-300 ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'New chat' : undefined}
          >
            <Plus size={18} strokeWidth={1.5} />
            {!isCollapsed && <span className="text-sm">New chat</span>}
          </button>

          {navigationItems.map((item) => (
            <button
              key={item.id}
              className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg hover:bg-gray-200/70 dark:hover:bg-[#2d2d2d] transition-colors text-gray-700 dark:text-gray-300 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={item.title}
              onClick={() => handleNavigationSelect(item.id)}
              type="button"
            >
              <span className="opacity-70">{item.icon}</span>
              {!isCollapsed && <span className="text-sm">{item.title}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <p className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">Recent</p>
          <div className="space-y-0.5">
            {isLoadingChats ? (
              <div className="flex items-center justify-center py-6">
                <div className="animate-spin rounded-full border-2 border-gray-400 border-t-transparent h-5 w-5"></div>
              </div>
            ) : chats.length === 0 ? (
              <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-500">
                <MessageCircle size={20} className="mx-auto mb-2 opacity-40" />
                <p className="text-xs">No conversations yet</p>
              </div>
            ) : (
              chats.map((chat) => {
                const isActive = chat.session_id === currentSessionId
                const chatTitle = chat.first_message || `Chat ${chat.session_id.slice(0, 8)}`

                return (
                  <button
                    key={chat.session_id}
                    onClick={() => onSelectChat(chat.session_id)}
                    className={`flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg transition-colors group ${
                      isActive
                        ? 'bg-gray-200/80 dark:bg-[#2d2d2d]'
                        : 'hover:bg-gray-200/50 dark:hover:bg-[#2d2d2d]/70'
                    }`}
                    title={chatTitle}
                  >
                    <MessageCircle size={16} className="opacity-50 shrink-0" />
                    <span className="text-sm truncate text-gray-700 dark:text-gray-300">
                      {chatTitle.length > 28 ? chatTitle.slice(0, 28) + '...' : chatTitle}
                    </span>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-auto border-t border-gray-200 dark:border-[#2d2d2d] p-2 relative" ref={userMenuRef}>
        {userMenuOpen && !isCollapsed && (
          <div className="absolute bottom-full left-2 right-2 mb-1 bg-white dark:bg-[#2d2d2d] rounded-xl shadow-lg border border-gray-200 dark:border-[#404040] py-1 z-50">
            <div className="px-3 py-2.5 border-b border-gray-100 dark:border-[#404040]">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">Guest User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">No account required</p>
            </div>
            <div className="py-1">
              <button
                type="button"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors"
              >
                <Settings size={16} className="opacity-60" />
                Settings
              </button>
              <button
                type="button"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors"
              >
                <Palette size={16} className="opacity-60" />
                Customize UI
              </button>
              <button
                type="button"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#404040] transition-colors"
              >
                <HelpCircle size={16} className="opacity-60" />
                Help & FAQ
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg hover:bg-gray-200/50 dark:hover:bg-[#2d2d2d] transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Guest User' : undefined}
        >
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center shrink-0">
            <User size={16} className="text-gray-500" />
          </div>
          {!isCollapsed && <span className="text-sm text-gray-600 dark:text-gray-400">Guest User</span>}
        </button>
      </div>
    </div>
  )
}

export default AIAssistantSidebar
