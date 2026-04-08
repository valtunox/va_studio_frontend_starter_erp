/**
 * Gemini-Style AI Thinking Loader Component
 * Displays an animated thinking indicator with gradient dots and rotating messages
 * Now supports showing agent and model information
 */
import React, { useState, useEffect } from 'react'

const loadingMessages = [
  "Just a moment...",
  "Analyzing your request...",
  "Processing information...",
  "Gathering insights...",
  "Preparing your response...",
  "Working on it...",
  "Almost there...",
  "Finalizing details...",
  "Optimizing results...",
  "Crafting your solution...",
];

interface AIThinkingLoaderProps {
  agentName?: string;
  modelName?: string;
}

const AIThinkingLoader: React.FC<AIThinkingLoaderProps> = ({ agentName, modelName }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ai-thinking-container">
      <div className="ai-thinking-dots">
        <div className="ai-thinking-dot"></div>
        <div className="ai-thinking-dot"></div>
        <div className="ai-thinking-dot"></div>
        <div className="ai-thinking-dot"></div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="ai-thinking-text">{loadingMessages[messageIndex]}</span>
        {(agentName || modelName) && (
          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
            Processing using <span className="font-semibold text-purple-600 dark:text-purple-400">{agentName || 'Agent'}</span>
            {modelName && (
              <> supported by <span className="font-semibold text-blue-600 dark:text-blue-400">{modelName}</span></>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default AIThinkingLoader;
