'use strict';
'use client';

import React, { useEffect } from 'react';
import ConversationList from '../../../components/inbox/ConversationList';
import ConversationThread from '../../../components/inbox/ConversationThread';
import AIOrb from '../../../components/ai/AIOrb';
import SummaryPanel from '../../../components/ai/SummaryPanel';
import SmartReplySuggestions from '../../../components/ai/SmartReplySuggestions';
import PromisesPanel from '../../../components/inbox/PromisesPanel';
import AppointmentPanel from '../../../components/inbox/AppointmentPanel';
import { useConversations } from '../../../lib/hooks/useConversations';
import { useInboxStore } from '../../../store/inboxStore';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { simulateIncomingMessage, startSimulator, stopSimulator } from '../../../lib/simulator/messageSimulator';

export default function InboxPage() {
  const { conversations, activeConversation, setActiveConversationId } = useConversations();
  const updateAIDraft = useInboxStore((state) => state.updateConversationAIDraft);

  useEffect(() => {
    document.title = "Inbox — SellQ AI";
  }, []);

  useEffect(() => {
    // Seed 6-8 initial conversations if inbox is empty
    if (conversations.length === 0) {
      const seed = async () => {
        for (let i = 0; i < 7; i++) {
          await simulateIncomingMessage();
        }
      };
      seed();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversation, setActiveConversationId]);

  const handleSelectSuggestion = (text: string) => {
    if (activeConversation) {
      updateAIDraft(activeConversation.id, text);
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-zinc-950/20 md:rounded-xl border border-white/5 md:shadow-2xl flex-col md:flex-row">
      
      {/* Col 1: Conversations List (300px) */}
      <div className={`w-full md:w-[300px] shrink-0 border-r border-white/5 bg-zinc-900/40 flex-col ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
        <ConversationList />
      </div>

      {/* Col 2: Chat Thread Message Area (Flex) */}
      <div className={`flex-1 flex-col bg-zinc-950/60 min-w-0 relative ${activeConversation ? 'flex' : 'hidden md:flex'}`}>
        <ConversationThread />
      </div>

      {/* Col 3: AI Assistant Insights Pane (280px) */}
      {activeConversation ? (
        <div className="hidden xl:flex w-[280px] border-l border-white/5 bg-zinc-950/40 p-5 flex-col gap-5 overflow-y-auto shrink-0 animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-4 shrink-0">
            <div className="p-1.5 rounded-lg border border-zinc-500/20 bg-zinc-500/10 text-zinc-400">
              <BrainCircuit size={16} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">AI Copilot Agent</h3>
              <span className="text-[9px] text-zinc-500 block">Real-time discussion scanner</span>
            </div>
          </div>

          {/* Copilot Ambient Status (Orb) */}
          <div className="flex flex-col items-center justify-center p-4 border border-white/5 bg-zinc-900/20 rounded-xl shrink-0 shadow-[inset_0_0_20px_rgba(139,92,246,0.02)]">
            <AIOrb size="md" />
            <span className="text-xs text-white font-semibold mt-3">Copilot Standby</span>
            <span className="text-[9px] text-zinc-500 mt-1 text-center leading-normal">
              Listening to incoming channel feeds.
            </span>
          </div>

          {/* Copilot Bullet Point Summaries */}
          <div className="flex-1 min-h-[200px]">
            <SummaryPanel />
          </div>

          <PromisesPanel conversationId={activeConversation.id} />

          {/* Appointment Panel */}
          <AppointmentPanel conversation={activeConversation} />

          {/* Quick Click Suggestions */}
          <div className="shrink-0">
            <SmartReplySuggestions
              conversation={activeConversation}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </div>

        </div>
      ) : (
        <div className="hidden xl:flex w-[280px] border-l border-white/5 bg-zinc-950/40 p-6 flex-col items-center justify-center text-center shrink-0">
          <div className="h-10 w-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-zinc-600 mb-3">
            <Sparkles size={16} />
          </div>
          <h4 className="text-xs font-bold text-white">Assistant Inactive</h4>
          <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px] leading-relaxed">
            Select a conversation thread to activate the AI scanning pipeline.
          </p>
        </div>
      )}

    </div>
  );
}
