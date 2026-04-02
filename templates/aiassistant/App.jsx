/**
 * AI Assistant Template Entry Point
 * Renders the general-purpose AI assistant as a standalone template.
 */
import AIAssistant from './AIAssistant'

export default function App({ onNavigate }) {
  return <AIAssistant isOpen={true} fullscreenMode={true} />
}
