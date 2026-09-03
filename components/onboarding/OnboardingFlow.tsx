'use strict';
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, PhoneCall, MessageSquare, Sparkles, Check, ArrowRight, Zap, Play } from 'lucide-react';
import { useAIModeStore } from '../../store/aiModeStore';
import StepIndicator from './StepIndicator';
import GlowCard from '../shared/GlowCard';
import { Button } from '../ui/Button';

export function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { settings, updateSettings } = useAIModeStore();
  
  // Local onboarding configurations
  const [channels, setChannels] = useState({
    email: true,
    whatsapp: false,
    sms: false,
  });

  const [agentName, setAgentName] = useState(settings.agentName);
  const [tone, setTone] = useState(settings.tone);
  const [instructions, setInstructions] = useState(settings.customInstructions);

  const toggleChannel = (ch: keyof typeof channels) => {
    setChannels((prev) => ({ ...prev, [ch]: !prev[ch] }));
  };

  const handleNextStep = () => {
    if (step === 2) {
      // Save AI voice calibration to Zustand store
      updateSettings({
        agentName,
        tone,
        customInstructions: instructions,
      });
    }
    setStep((prev) => prev + 1);
  };

  const handleFinish = () => {
    // Enable autopilot for simulation demo by default to impress the user!
    updateSettings({ autoPilot: true });
    router.push('/inbox');
  };

  const tones: { id: typeof tone; label: string; icon: string; desc: string }[] = [
    { id: 'professional', label: 'Professional', icon: '💼', desc: 'Direct, clear, formal business style' },
    { id: 'casual', label: 'Casual', icon: '🍃', desc: 'Friendly, easygoing and approachable' },
    { id: 'empathetic', label: 'Empathetic', icon: '❤️', desc: 'Supportive, understanding and helpful' },
    { id: 'persuasive', label: 'Persuasive', icon: '⚡', desc: 'Active, commercial, and conversion-focused' },
  ];

  return (
    <div className="w-full max-w-xl mx-auto space-y-8 relative">
      
      {/* Step Progress Tracker */}
      <StepIndicator currentStep={step} totalSteps={3} />

      {/* Main card panel */}
      <GlowCard glowColor="rgba(139, 92, 246, 0.12)" className="border-white/10 p-8 shadow-2xl relative overflow-hidden bg-zinc-900/80">
        
        {/* Glow ambient background element */}
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-zinc-500/10 blur-3xl pointer-events-none" />

        {/* Step 1: Connect channels */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white tracking-wide">Connect Communication Channels</h2>
              <p className="text-xs text-zinc-400">Select the active portals you want SellQ to monitor for incoming queries.</p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Email Integration */}
              <div
                onClick={() => toggleChannel('email')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.email 
                    ? 'border-blue-500/40 bg-blue-500/5 shadow-md shadow-blue-500/5' 
                    : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${channels.email ? 'text-blue-400 border-blue-500/20 bg-blue-500/10' : 'text-zinc-500 border-white/5'}`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Email Gateway</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Integrate support inbox (Gmail, Outlook, IMAP).</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  channels.email ? 'bg-blue-500 border-blue-500 text-white' : 'border-white/10'
                }`}>
                  {channels.email && <Check size={12} />}
                </div>
              </div>

              {/* WhatsApp Integration */}
              <div
                onClick={() => toggleChannel('whatsapp')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.whatsapp 
                    ? 'border-emerald-500/40 bg-emerald-500/5 shadow-md shadow-emerald-500/5' 
                    : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${channels.whatsapp ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 'text-zinc-500 border-white/5'}`}>
                    <PhoneCall size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">WhatsApp Business</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Automate WhatsApp conversations via official API gateway.</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  channels.whatsapp ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/10'
                }`}>
                  {channels.whatsapp && <Check size={12} />}
                </div>
              </div>

              {/* SMS Integration */}
              <div
                onClick={() => toggleChannel('sms')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  channels.sms 
                    ? 'border-cyan-500/40 bg-cyan-500/5 shadow-md shadow-cyan-500/5' 
                    : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${channels.sms ? 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' : 'text-zinc-500 border-white/5'}`}>
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">SMS Gateway</h3>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Route cell messages using Twilio integration.</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                  channels.sms ? 'bg-cyan-500 border-cyan-500 text-white' : 'border-white/10'
                }`}>
                  {channels.sms && <Check size={12} />}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                variant="default"
                onClick={handleNextStep}
                disabled={!channels.email && !channels.whatsapp && !channels.sms}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Calibrate AI voice */}
        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-white tracking-wide">Calibrate AI Assistant Voice</h2>
              <p className="text-xs text-zinc-400">Configure the name, tone profile, and base directives for your autonomous agent.</p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Agent Name input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Agent Display Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. SellQ Copilot"
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all"
                />
              </div>

              {/* Tone Selection grid */}
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Voice Tone Profile</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {tones.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setTone(t.id)}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all ${
                        tone === t.id
                          ? 'border-zinc-500/40 bg-zinc-500/5 shadow'
                          : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900/50'
                      }`}
                    >
                      <span className="text-xs">{t.icon}</span>
                      <span className="text-xs font-semibold text-white ml-1.5">{t.label}</span>
                      <p className="text-[9px] text-zinc-500 mt-1 leading-normal">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Guidelines textarea */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Custom Agent Directives</label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Always offer a 10% discount to angry clients..."
                  className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all resize-none min-h-[60px]"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="cursor-pointer">Back</Button>
              <Button variant="default" onClick={handleNextStep} className="flex items-center gap-1.5 cursor-pointer">
                <span>Calibrate</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Launch Sandbox */}
        {step === 3 && (
          <div className="space-y-6 text-center py-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-pink-500 via-zinc-600 to-zinc-500 flex items-center justify-center border border-white/10 shadow-xl shadow-zinc-500/25 relative overflow-hidden animate-pulse">
                <Zap size={28} className="text-white" />
              </div>
            </div>

            <div className="space-y-2 max-w-sm mx-auto">
              <h2 className="text-xl font-bold text-white tracking-wide">SellQ Hub Calibrated!</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Your AI agent <span className="font-semibold text-zinc-400">{agentName}</span> is online with a <span className="font-semibold text-zinc-400">{tone}</span> tone profile.
              </p>
              <p className="text-[10px] text-zinc-500 pt-2 leading-relaxed">
                We are launching the inbox in <span className="font-semibold text-emerald-400">Auto-Pilot mode</span>. The message simulator will schedule incoming mock events to showcase real-time response flows.
              </p>
            </div>

            <div className="pt-6 flex justify-center">
              <Button
                variant="default"
                onClick={handleFinish}
                className="flex items-center gap-2 px-8 py-2.5 text-sm font-semibold cursor-pointer shadow-lg shadow-zinc-500/20"
              >
                <span>Launch Agent Sandbox</span>
                <Play size={14} />
              </Button>
            </div>
          </div>
        )}
      </GlowCard>
    </div>
  );
}

export default OnboardingFlow;
