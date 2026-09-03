import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AISettings } from '../types';

interface AIModeState {
  mode: 'auto' | 'supervised';
  setMode: (mode: 'auto' | 'supervised') => void;
  settings: AISettings;
  updateSettings: (settings: Partial<AISettings>) => void;
}

export const useAIModeStore = create<AIModeState>()(
  persist(
    (set) => ({
      mode: 'supervised',
      setMode: (mode) => set({ mode }),
      settings: {
        autoPilot: false,
        tone: 'professional',
        agentName: 'SellQ Copilot',
        customInstructions: 'Be polite, concise, and helpful. Always try to identify commercial intent and flag it as a lead.',
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'ai-mode-storage',
    }
  )
);
