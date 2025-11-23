
import React, { useState, useEffect, useRef } from 'react';
import { generateChatResponse } from '../../services/geminiService';
import { Send, Bot, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'model';
  text: string;
}

export const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'model', text: "Greetings, User. I am the ToanOS Assistant. How may I assist you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const historyForApi = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await generateChatResponse(userMsg.text, historyForApi);

    const modelMsg: Message = { id: Date.now() + 1, role: 'model', text: responseText };
    setMessages(prev => [...prev, modelMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black">
      {/* Header */}
      <div className="p-1 flex items-center gap-2 border-b border-[#808080]">
        <Bot className="w-4 h-4" />
        <span className="text-xs font-bold">Gemini Agent v1.0</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-white border-2 bevel-in m-1 font-mono text-sm text-black">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] uppercase font-bold text-gray-500 mb-0.5">
              {msg.role === 'user' ? 'YOU' : 'SYSTEM'}
            </span>
            <div
              className={`max-w-[90%] px-2 py-1 border ${
                msg.role === 'user'
                  ? 'bg-[#e0e0e0] border-black'
                  : 'bg-[#ffffcc] border-black'
              }`}
            >
              <p className="whitespace-pre-wrap text-black">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-500 text-xs">
             <Loader2 className="w-3 h-3 animate-spin" /> Processing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-1 border-t border-white flex gap-1">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command..."
            rows={1}
            className="flex-1 px-2 py-1 bg-white border-2 bevel-in resize-none font-mono text-sm text-black outline-none focus:bg-yellow-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="px-4 bevel-out active:bevel-in flex items-center justify-center font-bold text-xs"
          >
            SEND
          </button>
      </div>
    </div>
  );
};
