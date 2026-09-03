'use strict';
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAIModeStore } from '../../../store/aiModeStore';
import { useToast } from '../../../components/shared/ToastProvider';
import {
  Settings, Key, Shield, MessageSquare, PhoneCall, Globe, Sparkles,
  Sliders, User, AlertTriangle, Users, Volume2, ShieldAlert,
  SlidersHorizontal, BellRing, ClipboardCheck, Trash2, Mail, ExternalLink, Mic
} from 'lucide-react';
import Switch from '../../../components/ui/Switch';
import VoiceAgentTab from '../../../components/settings/VoiceAgentTab';

type ActiveTab = 'channels' | 'ai_behavior' | 'notifications' | 'team' | 'account' | 'voice_agent';

interface TeamMember {
  name: string;
  email: string;
  role: 'Admin' | 'Agent' | 'Viewer';
  avatar: string;
  avatarBg?: string;
  statusText?: string;
  statusDot?: string;
  joinedText?: string;
  isOwner?: boolean;
  isPending?: boolean;
}

export default function SettingsPage() {
  const { mode, setMode, settings, updateSettings } = useAIModeStore();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<ActiveTab>('channels');
  const [isSaving, setIsSaving] = useState(false);

  // Modal controls
  const [activeConfigModal, setActiveConfigModal] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Tab 1 - Channels Local Settings
  const [channelsConnected, setChannelsConnected] = useState({
    whatsapp: true,
    instagram: true,
    website: true,
  });

  React.useEffect(() => {
    document.title = "Settings — SellQ AI";
  }, []);

  // Tab 2 - AI Behavior Local Settings
  const [tone, setTone] = useState(settings.tone);
  const [delay, setDelay] = useState(2);
  const [leadDetect, setLeadDetect] = useState(true);
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [maxLength, setMaxLength] = useState('medium');

  // Tab 3 - Notifications Local Settings
  const [notifs, setNotifs] = useState({
    newMessage: true,
    leadDetected: true,
    confidenceLow: false,
    dailySummary: true,
  });

  // Tab 4 - Team Members
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      name: 'Sarah Jenkins', 
      email: 'admin@sellq.com', 
      role: 'Admin', 
      avatar: 'SJ',
      avatarBg: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
      statusText: 'Active',
      statusDot: 'bg-emerald-400',
      joinedText: 'Owner · Since Jan 2026',
      isOwner: true
    },
    { 
      name: 'Aryan Mehta', 
      email: 'aryan@sellq.com', 
      role: 'Agent', 
      avatar: 'AM',
      avatarBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      statusText: 'Active',
      statusDot: 'bg-emerald-400',
      joinedText: 'Added 12 days ago'
    },
    { 
      name: 'Priya Menon', 
      email: 'priya@sellq.com', 
      role: 'Viewer', 
      avatar: 'PM',
      avatarBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      statusText: 'Invited',
      statusDot: 'bg-zinc-500',
      joinedText: 'Invitation pending · 2 days ago',
      isPending: true
    },
  ]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Agent' | 'Viewer'>('Agent');

  // Tab 5 - Account
  const [businessName, setBusinessName] = useState('SellQ Bistro');
  const [businessType, setBusinessType] = useState('restaurant');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleSaveAIBehavior = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateSettings({ tone });
      setIsSaving(false);
      toast({
        type: 'system',
        title: 'Settings Saved',
        description: 'AI model parameters and autopiloting constraints successfully synchronized.',
      });
    }, 600);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setTeamMembers([
      ...teamMembers,
      {
        name: inviteEmail.split('@')[0],
        email: inviteEmail,
        role: inviteRole,
        avatar: inviteEmail.substring(0, 2).toUpperCase(),
        avatarBg: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
        statusText: 'Invited',
        statusDot: 'bg-zinc-500',
        joinedText: 'Invitation pending · Just now',
        isPending: true
      },
    ]);
    setShowInviteModal(false);
    setInviteEmail('');
    
    toast({
      type: 'system',
      title: 'Invitation Sent ✉️',
      description: `Collaborator access link dispatched successfully to ${inviteEmail}.`,
    });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'CONFIRM') return;
    setShowDeleteModal(false);
    setDeleteConfirmText('');
    toast({
      type: 'system',
      title: 'Workspace Reset',
      description: 'AI autopilot metrics, sandbox contexts, and conversation history cleared.',
    });
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-8 gap-6 max-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-extrabold text-white tracking-wide font-heading">Settings Control Room</h1>
          <p className="text-xs text-zinc-400 mt-1">Configure co-pilot autopilot, linked gateway channels, team permissions, and account defaults.</p>
        </div>
      </div>

      {/* Main split dashboard view */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* Left pane: Tab selection list */}
        <div className="w-full md:w-56 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none border-r border-white/[0.03] pr-2">
          {[
            { id: 'channels', label: 'Gateway Channels', icon: Globe },
            { id: 'ai_behavior', label: 'AI Autopilot & Behavior', icon: Sliders },
            { id: 'voice_agent', label: 'Voice Agent', icon: Mic },
            { id: 'notifications', label: 'Notifications', icon: BellRing },
            { id: 'team', label: 'Team Registry', icon: Users },
            { id: 'account', label: 'Account Profile', icon: User },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-semibold tracking-wide transition-all whitespace-nowrap md:whitespace-normal cursor-pointer ${
                  isSelected
                    ? 'bg-violet-500/10 text-violet-300 border border-violet-500/20 shadow-md'
                    : 'text-zinc-400 border border-transparent hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <tab.icon size={14} className={isSelected ? 'text-violet-400' : 'text-zinc-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right pane: Active Tab Content Area */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-white/[0.04] bg-zinc-950/20 backdrop-blur-xl p-6 scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {activeTab === 'channels' && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Gateway Channels</h3>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Integrate WhatsApp, Instagram, and website chat channels directly to autonomous co-pilot engines.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* WhatsApp */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-zinc-900/40 hover:border-emerald-500/30 transition-all flex flex-col justify-between h-48 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <PhoneCall size={16} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">WhatsApp Business</span>
                          <span className="text-[9px] text-zinc-500">Official Twilio Gateway</span>
                        </div>
                      </div>
                      <Switch
                        checked={channelsConnected.whatsapp}
                        onCheckedChange={(checked) => {
                          setChannelsConnected({ ...channelsConnected, whatsapp: checked });
                          toast({ type: 'system', title: checked ? 'WhatsApp Online' : 'WhatsApp Offline', description: checked ? 'Inbound traffic now active.' : 'Autopilot detached.' });
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-semibold mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                        <span>Connected • Last Sync 2m ago</span>
                      </div>
                      <button
                        onClick={() => setActiveConfigModal('whatsapp')}
                        className="w-full flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/[0.02] text-[10px] font-bold text-zinc-300 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-all cursor-pointer"
                      >
                        Configure Gateway
                      </button>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-zinc-900/40 hover:border-pink-500/30 transition-all flex flex-col justify-between h-48 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-pink-500/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400">
                          <MessageSquare size={16} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Instagram DMs</span>
                          <span className="text-[9px] text-zinc-500">Official Meta Integration</span>
                        </div>
                      </div>
                      <Switch
                        checked={channelsConnected.instagram}
                        onCheckedChange={(checked) => {
                          setChannelsConnected({ ...channelsConnected, instagram: checked });
                          toast({ type: 'system', title: checked ? 'Instagram Online' : 'Instagram Offline', description: checked ? 'Inbound traffic now active.' : 'Autopilot detached.' });
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-semibold mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                        <span>Connected • Last Sync 5m ago</span>
                      </div>
                      <button
                        onClick={() => setActiveConfigModal('instagram')}
                        className="w-full flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/[0.02] text-[10px] font-bold text-zinc-300 hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-500/20 transition-all cursor-pointer"
                      >
                        Configure Gateway
                      </button>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="p-4 rounded-xl border border-white/[0.04] bg-zinc-900/40 hover:border-blue-500/30 transition-all flex flex-col justify-between h-48 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/[0.04] to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                          <Globe size={16} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white block">Website Chat Widget</span>
                          <span className="text-[9px] text-zinc-500">Dynamic UI Widget</span>
                        </div>
                      </div>
                      <Switch
                        checked={channelsConnected.website}
                        onCheckedChange={(checked) => {
                          setChannelsConnected({ ...channelsConnected, website: checked });
                          toast({ type: 'system', title: checked ? 'Web Widget Online' : 'Web Widget Offline', description: checked ? 'Live traffic now active.' : 'Autopilot detached.' });
                        }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-semibold mb-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10b981]" />
                        <span>Connected • Live and Active</span>
                      </div>
                      <button
                        onClick={() => setActiveConfigModal('website')}
                        className="w-full flex items-center justify-center py-2 rounded-lg border border-white/5 bg-white/[0.02] text-[10px] font-bold text-zinc-300 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all cursor-pointer"
                      >
                        Configure Gateway
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'ai_behavior' && (
              <motion.div
                key="ai_behavior"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">AI Autopilot & Core Behavior</h3>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Define co-pilot responses, automation status, and structural tone controls.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left subcol: Mode and sliders */}
                  <div className="space-y-5">
                    {/* Auto mode pill select */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">AI Operations Mode</label>
                      <div className="flex bg-white/[0.02] border border-white/[0.04] p-1 rounded-xl w-fit">
                        <button
                          onClick={() => {
                            setMode('auto');
                            toast({ type: 'system', title: 'Autopilot Active 🤖', description: 'Replies will be dispatched automatically.' });
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            mode === 'auto'
                              ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Auto Autopilot
                        </button>
                        <button
                          onClick={() => {
                            setMode('supervised');
                            toast({ type: 'system', title: 'Supervised Mode Active', description: 'Replies require manual agent approval.' });
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            mode === 'supervised'
                              ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Supervised Co-pilot
                        </button>
                      </div>
                    </div>

                    {/* Auto Reply delay slider */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                        <span>Auto-reply dispatch delay</span>
                        <span className="text-violet-400">{delay} seconds</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={delay}
                        onChange={(e) => setDelay(Number(e.target.value))}
                        className="w-full accent-violet-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>

                    {/* Dropdowns */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Max Response Length Limit</label>
                      <select
                        value={maxLength}
                        onChange={(e) => setMaxLength(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
                      >
                        <option value="short">Short (&lt; 50 words)</option>
                        <option value="medium">Medium (&lt; 150 words)</option>
                        <option value="long">Long (&lt; 300 words)</option>
                      </select>
                    </div>
                  </div>

                  {/* Right subcol: Tones and feature toggles */}
                  <div className="space-y-5">
                    {/* Tones */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">AI Voice Tone Selection</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'professional', label: '💼 Professional' },
                          { id: 'friendly', label: '🍃 Friendly' },
                          { id: 'concise', label: '⚡ Concise' },
                        ].map((tItem) => {
                          const isSelected = tone === tItem.id;
                          return (
                            <button
                              key={tItem.id}
                              onClick={() => setTone(tItem.id as any)}
                              className={`p-2.5 rounded-xl border text-center text-[10px] font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                                  : 'border-white/5 bg-zinc-950/40 hover:bg-zinc-900/50 text-zinc-400 hover:text-white'
                              }`}
                            >
                              {tItem.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Features toggles */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white">AI Lead Intent Detection</span>
                          <p className="text-[9px] text-zinc-500">Automatically flag hot buyer inquiries.</p>
                        </div>
                        <Switch checked={leadDetect} onCheckedChange={(checked) => setLeadDetect(checked)} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold text-white">AI Sentiment Analysis</span>
                          <p className="text-[9px] text-zinc-500">Calibrate messages by emotional intensity.</p>
                        </div>
                        <Switch checked={sentimentAnalysis} onCheckedChange={(checked) => setSentimentAnalysis(checked)} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.03]">
                  <button
                    onClick={handleSaveAIBehavior}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-violet-600 to-zinc-600 hover:from-violet-500 hover:to-zinc-500 text-white shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? 'Syncing...' : 'Save AI Configurations'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'voice_agent' && (
              <VoiceAgentTab key="voice_agent" />
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Notification Settings</h3>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Control live browser push alerts, threshold triggers, and recap emails.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white">New Message Inbound</span>
                        <p className="text-[9px] text-zinc-500">Alert on new queries across all channels.</p>
                      </div>
                      <Switch checked={notifs.newMessage} onCheckedChange={(c) => setNotifs({ ...notifs, newMessage: c })} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white">AI Lead Detected</span>
                        <p className="text-[9px] text-zinc-500">Push notification when high-value leads are identified.</p>
                      </div>
                      <Switch checked={notifs.leadDetected} onCheckedChange={(c) => setNotifs({ ...notifs, leadDetected: c })} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white">AI Confidence Warning</span>
                        <p className="text-[9px] text-zinc-500">Trigger alert if AI confidence drops below target 80%.</p>
                      </div>
                      <Switch checked={notifs.confidenceLow} onCheckedChange={(c) => setNotifs({ ...notifs, confidenceLow: c })} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-white">Daily Summary Recaps</span>
                        <p className="text-[9px] text-zinc-500">Dispatch morning digest performance emails.</p>
                      </div>
                      <Switch checked={notifs.dailySummary} onCheckedChange={(c) => setNotifs({ ...notifs, dailySummary: c })} />
                    </div>
                  </div>

                  {/* Live Toast Preview Box */}
                  <div className="p-5 rounded-xl border border-white/[0.04] bg-zinc-900/30 flex flex-col justify-between h-48 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-violet-500/[0.04] to-transparent pointer-events-none" />
                    <div>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">Notification Simulator</span>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                        Test your active notifications. Click the trigger below to launch a styled real-time system co-pilot alert preview.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        toast({
                          type: 'lead',
                          title: 'Hot Lead Captured 🔥',
                          description: 'Sarah Jenkins has inquired about pricing plans.',
                        });
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-[10px] font-bold text-zinc-300 hover:bg-violet-500/10 hover:text-violet-300 hover:border-violet-500/20 transition-all cursor-pointer"
                    >
                      <BellRing size={10} /> Launch Alert Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.03]">
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Team Registry</h3>
                    <span className="text-[10px] text-zinc-500 block mt-0.5">Manage co-pilot access and agent permissions across your workspace.</span>
                  </div>

                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-zinc-600 to-zinc-600 hover:from-zinc-500 hover:to-zinc-500 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-zinc-500/20"
                  >
                    <Users size={12} /> Invite Member
                  </button>
                </div>

                {/* Team member list */}
                <div className="space-y-3 pt-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.email}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-xl gap-4 md:gap-0 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${member.avatarBg}`}>
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white block">{member.name}</span>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                              member.role === 'Admin'
                                ? 'bg-zinc-500/15 text-zinc-400 border-zinc-500/20'
                                : member.role === 'Agent'
                                ? 'bg-blue-500/15 text-blue-400 border-blue-500/20'
                                : 'bg-zinc-500/15 text-zinc-400 border-white/5'
                            }`}>
                              {member.role}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[11px] text-zinc-400">{member.email}</span>
                            <span className="text-[11px] text-zinc-600">•</span>
                            <div className="flex items-center gap-1.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${member.statusDot}`} />
                              <span className="text-[11px] text-zinc-300">{member.statusText}</span>
                            </div>
                            <span className="text-[11px] text-zinc-600">•</span>
                            <span className="text-[11px] text-zinc-500">{member.joinedText}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 md:mt-0 pt-3 md:pt-0 border-t border-white/5 md:border-0 justify-end">
                        {member.isOwner ? (
                          <span className="text-[11px] text-zinc-500 italic px-3 py-1.5">Cannot modify owner</span>
                        ) : member.isPending ? (
                          <>
                            <button className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 text-[11px] font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">Resend Invite</button>
                            <button className="px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-[11px] font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/5 text-[11px] font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer">Edit Role</button>
                            <button className="px-3 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-[11px] font-medium text-rose-400 hover:text-rose-300 transition-colors cursor-pointer">Remove</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">Account Identity Profile</h3>
                  <span className="text-[10px] text-zinc-500 block mt-0.5">Manage core business attributes, registration identity, and critical terminations.</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile setup */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Business / Workspace Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Acme Corp"
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white placeholder-zinc-500 outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Business Type</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-xs text-white outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
                      >
                        <option value="restaurant">Restaurant / Bistro</option>
                        <option value="ecommerce">E-Commerce / Retail</option>
                        <option value="saas">SaaS / Technology</option>
                        <option value="agency">Agency / Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Owner Account Email</label>
                      <input
                        disabled
                        type="email"
                        value="admin@sellq.com"
                        className="w-full px-3 py-2 rounded-lg border border-white/5 bg-zinc-950/20 text-xs text-zinc-500 outline-none select-none cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-950/10 flex flex-col justify-between h-48 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-500/[0.04] to-transparent pointer-events-none" />
                    <div>
                      <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase tracking-wider text-[10px]">
                        <ShieldAlert size={14} />
                        <span>Danger Zone</span>
                      </div>
                      <p className="text-[10px] text-rose-300/80 leading-relaxed font-light mt-1.5">
                        Permanently purge workspace analytics records, co-pilot pipelines, custom models, and logs. This actions is irreversible.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border border-rose-500/35 bg-rose-500/10 text-[10px] font-bold text-rose-300 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                    >
                      <Trash2 size={11} /> Reset Workspace Data
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-white/[0.03]">
                  <button
                    onClick={() => {
                      toast({
                        type: 'system',
                        title: 'Profile Updated',
                        description: 'Workspace identity configurations updated successfully.',
                      });
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 text-white transition-all cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* MODAL WINDOWS */}

      {/* Tab 1 Configuration Modal */}
      <AnimatePresence>
        {activeConfigModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveConfigModal(null)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl z-10"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                <Settings size={16} className="text-violet-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider capitalize">
                  Configure {activeConfigModal} Gateway
                </h3>
              </div>

              {activeConfigModal === 'website' ? (
                <div className="space-y-4">
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                    Install the live website chat widget co-pilot client. Paste the following script block directly before the closing <code className="text-violet-300 font-mono text-[9px] bg-zinc-950 px-1 py-0.5 rounded">&lt;/body&gt;</code> element on your site:
                  </p>
                  <pre className="p-3 rounded-lg bg-zinc-950 text-[9px] font-mono text-cyan-300 overflow-x-auto leading-relaxed border border-white/5 select-all cursor-pointer">
                    {`<script src="https://cdn.sellq.com/widget.js" data-workspace-id="rp-wsp-8849" defer></script>`}
                  </pre>
                  <p className="text-[9px] text-zinc-500 italic">💡 The widget matches dark/light mode configurations dynamically.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Gateway Endpoint URL</label>
                    <input
                      type="text"
                      defaultValue="https://api.sellq.com/v1/webhook"
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-[10px] text-white outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider">Gateway Access Token</label>
                    <input
                      type="password"
                      defaultValue="rp_tkn_8849c25f"
                      className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-[10px] text-white outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2.5 mt-6 pt-3 border-t border-white/5">
                <button
                  onClick={() => setActiveConfigModal(null)}
                  className="px-3.5 py-2 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setActiveConfigModal(null);
                    toast({ type: 'system', title: 'Gateway Configured', description: 'Inbound channel co-pilot routing parameters updated successfully.' });
                  }}
                  className="px-3.5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-[10px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Save Configurations
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab 4 Team Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInviteModal(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-xl p-6 shadow-2xl z-10"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-4">
                <Users size={16} className="text-zinc-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">Invite Team Member</h3>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. agent@sellq.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-sm text-white outline-none focus:border-zinc-500/50 focus:ring-1 focus:ring-zinc-500/50 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Registry Role Permissions</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-zinc-950/40 text-sm text-white outline-none focus:border-zinc-500/50 focus:ring-1 focus:ring-zinc-500/50 transition-all"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Agent">Agent</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                  <div className="pt-1 pl-1">
                    {inviteRole === 'Admin' && <p className="text-[10px] text-zinc-400">Full access + billing</p>}
                    {inviteRole === 'Agent' && <p className="text-[10px] text-zinc-400">Can reply + manage conversations</p>}
                    {inviteRole === 'Viewer' && <p className="text-[10px] text-zinc-400">Read-only access</p>}
                  </div>
                </div>

                <div className="flex justify-end items-center gap-4 mt-6 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-zinc-600 to-zinc-600 hover:from-zinc-500 hover:to-zinc-500 text-xs font-bold text-white transition-all cursor-pointer shadow-lg shadow-zinc-500/20"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab 5 Delete Workspace Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-rose-500/30 bg-zinc-900 p-6 shadow-2xl z-10"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-rose-500/20 mb-4">
                <AlertTriangle size={16} className="text-rose-400" />
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">Reset Workspace Data</h3>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                  This actions is completely irreversible. All lead entries, client conversations, agent presets, and configuration parameters will be removed permanently.
                </p>
                <p className="text-[10px] text-white font-semibold">
                  Type <code className="text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded">CONFIRM</code> below to authorize the deletion:
                </p>
                
                <input
                  type="text"
                  placeholder="CONFIRM"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-rose-500/30 bg-zinc-950/40 text-xs text-rose-300 font-bold tracking-widest outline-none text-center"
                />
              </div>

              <div className="flex justify-end gap-2.5 mt-6 pt-3 border-t border-white/5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmText !== 'CONFIRM'}
                  className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-[10px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
