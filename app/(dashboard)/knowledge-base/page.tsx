'use strict';
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Sparkles, Cpu, RefreshCw, Send, CheckCircle2,
  FileText, Clock, HelpCircle, CalendarDays, DollarSign, Briefcase
} from 'lucide-react';
import { useAIModeStore } from '../../../store/aiModeStore';

const SPICE_GARDEN_TEMPLATE = `[About Us]
Spice Garden is a premium South Indian restaurant in Hyderabad, Telangana. We serve authentic Hyderabadi cuisine with a modern twist, using locally sourced ingredients.

[Hours]
Monday – Sunday: 11:00 AM – 11:00 PM
Last orders accepted at 10:30 PM
Special Sunday Brunch: 10:30 AM – 3:00 PM

[Services]
- Dine-In: Air-conditioned seating for 80 guests, outdoor patio for 20
- Takeaway: Ready in 20 minutes
- Home Delivery: Via Swiggy and Zomato (4km radius), direct order for 10% off
- Private Events: Banquet hall available for up to 50 guests, custom menus

[Menu & Pricing]
- Hyderabadi Dum Biryani: ₹280
- Gongura Mutton Curry: ₹380  
- Pesarattu (breakfast special): ₹120
- Paneer Butter Masala: ₹220
- Gulab Jamun (2 pcs): ₹80
- Family Biryani Bucket (serves 4): ₹950
- Kids Meal Combo: ₹150

[FAQs]
Q: Do you have vegan options?
A: Yes! We offer 12+ vegan dishes including Dal Tadka, Veg Biryani, Bisi Bele Bath, and Pesarattu.

Q: Do you take reservations?
A: Yes. Call +91-98765-43210, WhatsApp us, or book via our website.

Q: What payment methods do you accept?
A: UPI (GPay, PhonePe, Paytm), all major credit/debit cards, and cash.

Q: Do you deliver to Banjara Hills?
A: Yes! We deliver to Banjara Hills, Jubilee Hills, and Kondapur via Swiggy and Zomato.

Q: Is parking available?
A: Yes, free parking for up to 30 vehicles in our basement lot.`;

export default function KnowledgeBasePage() {
  const aiSettings = useAIModeStore((state) => state.settings);
  const [content, setContent] = useState('');
  const [lastSaved, setLastSaved] = useState<string>('Never');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  // Preview test state
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load template
  useEffect(() => {
    setContent(SPICE_GARDEN_TEMPLATE);
    setLastSaved('Spice Garden Menu');
  }, []);

  useEffect(() => {
    document.title = "Knowledge Base — SellQ AI";
  }, []);

  // Compute metrics
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  const insertTemplate = (title: string, templateText: string) => {
    const header = `\n\n[${title}]\n${templateText}`;
    setContent((prev) => prev + header);
    // Auto focus textarea
    const textarea = document.getElementById('kb-textarea');
    if (textarea) {
      textarea.focus();
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('saving');
    
    // Simulate API delay for Supabase save
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    localStorage.setItem('sellq_kb_content', content);
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastSaved(`Today at ${now}`);
    setIsSaving(false);
    setSaveStatus('saved');
    
    setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);
  };

  useEffect(() => {
    if (!content || content === SPICE_GARDEN_TEMPLATE) return;
    
    const delayDebounce = setTimeout(() => {
      handleSave();
    }, 1500); // Auto-save after 1.5s of typing inactivity

    return () => clearTimeout(delayDebounce);
  }, [content]);

  const handleAsk = async (askText = question) => {
    if (!askText.trim() || isLoading) return;
    setIsLoading(true);
    setQuestion('');
    
    setChatHistory(prev => {
      const newHistory = [...prev, { role: 'user' as const, content: askText }];
      if (newHistory.length > 6) return newHistory.slice(newHistory.length - 6);
      return newHistory;
    });
    
    try {
      const response = await fetch('/api/ai/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationHistory: [{ role: 'customer', content: askText }],
          businessContext: content,
          tone: aiSettings.tone,
        }),
      });

      if (!response.ok) throw new Error('Failed to ask AI co-pilot');
      
      const data = await response.json();
      
      setChatHistory(prev => {
        const newHistory = [...prev, { role: 'ai' as const, content: data.reply }];
        if (newHistory.length > 6) return newHistory.slice(newHistory.length - 6);
        return newHistory;
      });
    } catch (err) {
      console.error(err);
      setChatHistory(prev => {
        const newHistory = [...prev, { role: 'ai' as const, content: "Sorry, I encountered an issue reaching the AI support engine. Let's try again in a moment." }];
        if (newHistory.length > 6) return newHistory.slice(newHistory.length - 6);
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const templates = [
    {
      title: 'Services',
      icon: Briefcase,
      text: '- Web Dev: Custom React applications.\n- AI Agents: Context-aware LLM agents.\n- DevOps: Multi-cloud deployments.',
    },
    {
      title: 'Pricing',
      icon: DollarSign,
      text: '- Starter Tier: $49/mo for basic triggers.\n- Business Plan: $199/mo including WhatsApp.\n- Enterprise: Custom SLAs.',
    },
    {
      title: 'Hours',
      icon: CalendarDays,
      text: '- Weekdays: 9:00 AM - 6:00 PM EST\n- Weekends: 10:00 AM - 4:00 PM EST\n- Holidays: Closed',
    },
    {
      title: 'FAQs',
      icon: HelpCircle,
      text: 'Q: Do you offer refunds?\nA: Yes, within 14 days of subscription.\n\nQ: Is standard installation free?\nA: Yes, setup takes under 5 minutes.',
    },
  ];

  const suggestedQuestions = [
    "What are your opening hours?",
    "Do you deliver to Banjara Hills?",
    "Do you have vegan options?",
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-8 gap-6 scrollbar-none">
      
      {/* Top Status Strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/[0.04] bg-zinc-900/40 backdrop-blur-xl shadow-lg shrink-0 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400">
            <Brain size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">AI Status</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Active</span>
            </div>
            <p className="text-xs text-white leading-none mt-1 font-semibold">Trained & Calibrated</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
          <div className="flex flex-col">
            <span className="text-zinc-500 font-bold">Knowledge base size</span>
            <span className="text-white mt-0.5 text-xs font-extrabold">{wordCount.toLocaleString()} words</span>
          </div>
          <div className="h-6 w-px bg-white/5" />
          <div className="flex flex-col">
            <span className="text-zinc-500 font-bold">Last Trained</span>
            <span className="text-white mt-0.5 text-xs font-extrabold">{lastSaved}</span>
          </div>
        </div>
      </motion.div>

      {/* Main Layout panels */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
        
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0, backgroundColor: saveStatus === 'saved' ? 'rgba(34,197,94,0.05)' : 'rgba(2,6,23,0.2)' }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-3 flex flex-col rounded-2xl border border-white/[0.04] backdrop-blur-xl p-5 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.04] shrink-0">
            <div className="flex items-center gap-2">
              <Brain className="text-violet-400 drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] animate-pulse" size={16} />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Train Your AI</h2>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Auto-save status */}
              <AnimatePresence mode="wait">
                {saveStatus === 'saving' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-zinc-500 font-bold flex items-center gap-1.5"
                  >
                    <RefreshCw size={10} className="animate-spin" /> Saving...
                  </motion.span>
                )}
                {saveStatus === 'saved' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[9px] text-emerald-400 font-bold flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={10} /> Saved ✓
                  </motion.span>
                )}
              </AnimatePresence>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border cursor-pointer disabled:opacity-50 ${
                  saveStatus === 'saved' 
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20' 
                    : 'bg-gradient-to-r from-violet-600 to-zinc-600 hover:from-violet-500 hover:to-zinc-500 text-white shadow-lg shadow-violet-500/20 border-violet-500/10'
                }`}
              >
                {saveStatus === 'saving' ? (
                  <span className="flex items-center gap-1.5"><RefreshCw size={10} className="animate-spin" /> Saving...</span>
                ) : saveStatus === 'saved' ? (
                  <span className="flex items-center gap-1.5"><CheckCircle2 size={10} /> Saved</span>
                ) : (
                  'Save Draft'
                )}
              </button>
            </div>
          </div>

          {/* Section tag injectors */}
          <div className="flex items-center gap-1.5 py-3 shrink-0 overflow-x-auto scrollbar-none border-b border-white/[0.03]">
            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mr-1.5">Add Section:</span>
            {templates.map((t) => (
              <button
                key={t.title}
                onClick={() => insertTemplate(t.title, t.text)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-violet-500/10 hover:border-violet-500/20 text-[10px] font-semibold text-zinc-400 hover:text-violet-300 transition-all cursor-pointer"
              >
                <t.icon size={10} />
                <span>[{t.title}]</span>
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="flex-1 mt-4 relative">
            <textarea
              id="kb-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter your customer support facts, FAQs, and policies here..."
              className="w-full h-full bg-zinc-950/40 rounded-xl border border-white/5 p-4 text-[11px] font-mono leading-relaxed text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-violet-500/30 transition-colors resize-none scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
            />
          </div>

          {/* Word / Char Counters */}
          <div className="flex items-center justify-between pt-3 text-[10px] font-semibold text-zinc-500 border-t border-white/[0.04] shrink-0 mt-3">
            <span className="flex items-center gap-1"><FileText size={12} /> Monospace Editor</span>
            <div className="flex items-center gap-4">
              <span>{charCount.toLocaleString()} characters</span>
              <span>{wordCount.toLocaleString()} words</span>
            </div>
          </div>

        </motion.div>

        {/* Right Panel: Sandbox Tester */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 flex flex-col rounded-2xl border border-white/[0.04] bg-zinc-950/20 backdrop-blur-xl p-5 overflow-hidden"
        >
          {/* Header */}
          <div className="pb-4 border-b border-white/[0.04] shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] animate-pulse" size={16} />
              <h2 className="text-xs font-bold text-white uppercase tracking-wider">Test Your AI</h2>
            </div>
            <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Calibration Sandbox</span>
          </div>

          {/* Chat Preview Screen */}
          <div className="flex-1 my-4 border border-white/[0.05] rounded-xl p-4 bg-zinc-950/30 flex flex-col justify-between overflow-hidden relative">
            
            {/* Thread Area */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
              {chatHistory.length > 0 ? (
                <div className="space-y-4 animate-fade-in pb-4">
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'user' ? (
                        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-violet-600 px-3.5 py-2 border border-violet-500/20 shadow-md">
                          <p className="text-[11px] leading-relaxed text-white font-medium">{msg.content}</p>
                        </div>
                      ) : (
                        <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.04] bg-zinc-900/60 px-3.5 py-2 shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/40" />
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">AI Co-pilot</span>
                            <Sparkles size={8} className="text-cyan-400" />
                          </div>
                          <p className="text-[11px] leading-relaxed text-zinc-200 font-light">
                            {msg.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.04] bg-zinc-900/60 px-3.5 py-3 shadow-lg flex gap-1">
                        <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 p-6">
                  <Brain size={24} className="text-zinc-700 mb-2" />
                  <p className="text-xs font-semibold text-zinc-400">Sandbox Empty</p>
                  <p className="text-[9px] leading-normal text-zinc-500 max-w-[200px] mt-1 font-light">
                    Ask a test question to verify how the newly added guidelines respond.
                  </p>
                </div>
              )}
            </div>

            {/* Suggested prompts list */}
            <div className="pt-3 border-t border-white/[0.03] shrink-0">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Test Scenarios:</span>
              <div className="flex flex-col gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuestion(q);
                      handleAsk(q);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg border border-white/[0.04] bg-white/[0.01] hover:bg-cyan-500/10 hover:border-cyan-500/20 text-[10px] text-zinc-400 hover:text-cyan-300 font-semibold transition-all cursor-pointer truncate"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Sandbox prompt Input */}
          <div className="shrink-0 flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder="Ask a support inquiry to test..."
              className="flex-1 px-3 py-2.5 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/30 transition-colors"
            />
            <button
              onClick={() => handleAsk()}
              disabled={isLoading || !question.trim()}
              className="px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/20 text-xs font-bold text-zinc-400 transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={12} />
            </button>
          </div>

        </motion.div>

      </div>

    </div>
  );
}
