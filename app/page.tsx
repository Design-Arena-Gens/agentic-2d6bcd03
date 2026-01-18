'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, TrendingUp, AlertCircle, DollarSign, Clock } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 **Welcome to Gold Market Trading Assistant!**

I'm your professional XAU/USD research and trading support agent. I focus exclusively on Gold market analysis.

**What I can help you with:**
✅ Technical analysis (trends, support/resistance, RSI, moving averages)
✅ Economic news impact on gold (USD, inflation, Fed, geopolitics)
✅ Market bias and trade setup alerts
✅ Risk management guidance

**What I do NOT do:**
❌ Promise guaranteed profits
❌ Encourage over-trading
❌ Analyze other assets

Ask me anything about gold market! For example:
- "What's the current gold market trend?"
- "How does Fed interest rate affect gold?"
- "Should I buy or sell gold today?"
- "What are key support levels for XAU/USD?"`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: '⚠️ Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-yellow-400">Gold Market Trading Assistant</h1>
              <p className="text-sm text-gray-400">Professional XAU/USD Analysis & Insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Info Bar */}
      <div className="bg-slate-800/30 border-b border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400">Market:</span>
              <span className="text-yellow-400 font-semibold">XAU/USD</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-gray-400">24/7 Market Research</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-400" />
              <span className="text-gray-400">Risk Aware Analysis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-5xl mx-auto px-4 py-6 h-[calc(100vh-220px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === 'user'
                    ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-50'
                    : 'bg-slate-800/60 border border-slate-700 text-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.content.split('\n').map((line, i) => {
                    // Bold text
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return (
                        <div key={i} className="font-bold text-yellow-400 mb-2">
                          {line.replace(/\*\*/g, '')}
                        </div>
                      );
                    }
                    // Bullet points
                    if (line.startsWith('✅') || line.startsWith('❌') || line.startsWith('-')) {
                      return (
                        <div key={i} className="ml-2 mb-1">
                          {line}
                        </div>
                      );
                    }
                    // Regular text
                    return line ? (
                      <div key={i} className="mb-1">
                        {line}
                      </div>
                    ) : (
                      <div key={i} className="h-2" />
                    );
                  })}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about gold market analysis, trends, news impact..."
            className="w-full px-6 py-4 pr-14 rounded-xl bg-slate-800/60 border border-slate-700 focus:border-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 text-gray-100 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-yellow-500 hover:bg-yellow-600 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <Send className="w-5 h-5 text-slate-900" />
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-3">
          ⚠️ Educational purposes only. No profit guarantees. Always manage risk and use stop-loss.
        </p>
      </div>
    </div>
  );
}
