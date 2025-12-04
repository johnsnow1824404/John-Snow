import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from '../types';
import { PROJECTS, SKILLS, USER_INFO } from '../constants';

const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: `Hi! I'm ${USER_INFO.name}'s AI Assistant. Ask me anything about their projects, skills, or experience!`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Gemini Chat
  useEffect(() => {
    if (!process.env.API_KEY) return;

    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Construct system instruction with portfolio context
        const projectContext = PROJECTS.map(p => 
          `- ${p.title} (${p.category}): ${p.description}. Tech: ${p.technologies.join(', ')}`
        ).join('\n');
        
        const skillContext = SKILLS.map(s => `${s.name} (${s.level}%)`).join(', ');

        const systemInstruction = `
          You are an AI assistant for ${USER_INFO.name}'s portfolio website. 
          Your goal is to represent ${USER_INFO.name} professionally and answer visitor questions.
          
          Here is data about ${USER_INFO.name}:
          Bio: ${USER_INFO.bio}
          Role: ${USER_INFO.role}
          
          Projects:
          ${projectContext}
          
          Skills:
          ${skillContext}
          
          Guidelines:
          1. Be polite, professional, and concise.
          2. If asked about contact info, refer to the contact section or email: ${USER_INFO.email}.
          3. If asked about a specific project, provide details from the context.
          4. Do not make up facts not in the context. If unsure, say "I don't have that information handy, but you can contact ${USER_INFO.name} directly."
          5. Keep responses short (under 100 words) unless asked for elaboration.
        `;

        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        
        chatSessionRef.current = chat;
      } catch (error) {
        console.error("Failed to initialize chat", error);
      }
    };

    initChat();
  }, []);

  const handleSend = async () => {
    if (!inputValue.trim() || !chatSessionRef.current || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage({
        message: userMsg.text
      });
      
      const responseText = result.text;
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!process.env.API_KEY) return null; // Hide if no key

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-dark-card text-gray-400 rotate-90' 
            : 'bg-gradient-to-r from-brand-600 to-purple-600 text-white hover:scale-110 animate-pulse-slow'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 sm:w-96 bg-dark-card border border-white/10 rounded-2xl shadow-2xl z-40 flex flex-col transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="p-4 bg-brand-900/30 border-b border-white/5 flex items-center gap-3">
          <div className="p-2 bg-brand-500/20 rounded-lg text-brand-400">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">AI Assistant</h3>
            <p className="text-xs text-brand-300">Powered by Gemini</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="ml-auto text-gray-400 hover:text-white">
            <Minimize2 size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-dark-bg/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-brand-400" />
                <span className="text-xs text-gray-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-dark-card">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about my projects..."
              className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-gray-600"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAssistant;