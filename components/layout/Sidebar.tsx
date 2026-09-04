'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Zap, BarChart2, Brain, Settings2,
  LogOut, ChevronLeft, ChevronRight, Check, X, ShieldAlert, CheckSquare, Megaphone, GitMerge, CalendarClock, RefreshCw, ChevronDown, Plus, Bot, Mic, Lightbulb, Users, CreditCard
} from 'lucide-react';
import { useAIModeStore } from '../../store/aiModeStore';
import { usePromiseStore } from '../../store/promiseStore';
import { useAppointmentStore } from '../../store/appointmentStore';
import { useFollowUpStore } from '../../store/followUpStore';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useInboxStore } from '../../store/inboxStore';
import { useToast } from '../shared/ToastProvider';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { mode, setMode } = useAIModeStore();
  const { promises } = usePromiseStore();
  const { appointments } = useAppointmentStore();
  const { workspaces, activeWorkspaceId, setActiveWorkspace } = useWorkspaceStore();
  const { toast } = useToast();
  
  const [showLeadsBadge, setShowLeadsBadge] = useState(false);
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];

  const today = new Date();
  today.setHours(0,0,0,0);
  const overdueCount = promises.filter((p) => p.status === 'pending' && new Date(p.dueDate) < today).length;
  
  const todayAppointmentsCount = appointments.filter((a) => {
    const aDate = new Date(a.scheduledAt);
    aDate.setHours(0,0,0,0);
    return aDate.getTime() === today.getTime() && (a.status === 'confirmed' || a.status === 'pending');
  }).length;

  const { followUps } = useFollowUpStore();
  const pendingFollowUps = followUps.filter(f => f.status === 'pending').length;

  const navItems = [
    { name: 'Inbox', href: '/inbox', icon: MessageSquare, badge: '3' },
    { name: 'Sales Agent', href: '/sales-agent', icon: Bot, badgeColor: 'purple' },
    { name: 'Voice Agent', href: '/voice-agent', icon: Mic, badgeColor: 'purple' },
    { name: 'CRM Insights', href: '/crm-insights', icon: Lightbulb, badgeColor: 'amber' },
    { name: 'Leads', href: '/leads', icon: Zap, badge: 'Hot' },
    { name: 'Promises', href: '/promises', icon: CheckSquare, badge: overdueCount > 0 ? overdueCount.toString() : undefined, badgeColor: 'red' },
    { name: 'Appointments', href: '/appointments', icon: CalendarClock, badge: todayAppointmentsCount > 0 ? todayAppointmentsCount.toString() : undefined, badgeColor: 'blue' },
    { name: 'Follow-Ups', href: '/follow-ups', icon: RefreshCw, badge: pendingFollowUps > 0 ? pendingFollowUps.toString() : undefined, badgeColor: 'amber' },
    { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
    { name: 'Workflows', href: '/workflows', icon: GitMerge },
    { name: 'Analytics', href: '/analytics', icon: BarChart2 },
    { name: 'Churn Shield', href: '/churn', icon: ShieldAlert, badge: '2', badgeColor: 'red' },
    { name: 'Knowledge Base', href: '/knowledge-base', icon: Brain },
    { name: 'Payments', href: '/payments', icon: CreditCard, badgeColor: 'emerald' },
    { name: 'Settings', href: '/settings', icon: Settings2 },
  ];

  useEffect(() => {
    const dismissed = localStorage.getItem('activeLeadsDismissed');
    if (dismissed !== 'true') {
      setShowLeadsBadge(true);
    }
  }, []);

  const dismissLeads = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLeadsBadge(false);
    localStorage.setItem('activeLeadsDismissed', 'true');
  };

  return (
    <>
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 260 }}
      className="hidden md:flex fixed left-0 top-0 bottom-0 z-40 flex-col glass border-r border-white/[0.04] overflow-hidden"
    >
      {/* Logo Area */}
      <div className="flex h-16 shrink-0 items-center px-4 border-b border-white/[0.04]">
        <Link href="/inbox" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence mode="popLayout">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-sm font-bold tracking-tight text-white font-heading"
              >
                SellQ
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="shrink-0 px-3 py-4">
        <div className="relative">
          <button 
            onClick={() => !collapsed && setShowWorkspaceDropdown(!showWorkspaceDropdown)}
            className={`w-full flex items-center justify-between p-2 rounded-xl transition-all ${showWorkspaceDropdown ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-lg"
                style={{ backgroundColor: activeWorkspace.avatarColor }}
              >
                {activeWorkspace.name.substring(0,2).toUpperCase()}
              </div>
              <AnimatePresence mode="popLayout">
                {!collapsed && (
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex flex-col items-start whitespace-nowrap overflow-hidden"
                  >
                    <span className="text-sm font-bold text-white truncate w-full text-left">{activeWorkspace.name}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-0.5 ${
                      activeWorkspace.plan === 'pro' ? 'bg-zinc-500/20 text-zinc-400' :
                      activeWorkspace.plan === 'starter' ? 'bg-zinc-500/20 text-zinc-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {activeWorkspace.plan}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {!collapsed && <ChevronDown size={14} className={`text-zinc-500 transition-transform ${showWorkspaceDropdown ? 'rotate-180' : ''}`} />}
          </button>

          {/* Workspace Dropdown */}
          <AnimatePresence>
            {showWorkspaceDropdown && !collapsed && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40" onClick={() => setShowWorkspaceDropdown(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 w-[280px]"
                >
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-2 py-1 mb-1">Your Workspaces</div>
                  {workspaces.map(ws => (
                    <button 
                      key={ws.id}
                      onClick={() => {
                        // Switch Data
                        setActiveWorkspace(ws.id);
                        const { setWorkspaceData } = useInboxStore.getState();
                        setWorkspaceData(ws.id);
                        setShowWorkspaceDropdown(false);
                        
                        // Fake Loading
                        const inboxElement = document.getElementById('inbox-list');
                        if (inboxElement) {
                          inboxElement.classList.add('opacity-50', 'pointer-events-none');
                          setTimeout(() => {
                            inboxElement.classList.remove('opacity-50', 'pointer-events-none');
                          }, 200);
                        }

                        toast({ type: 'system', title: `Switched to ${ws.name}`, description: 'Workspace context updated.' });
                      }}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/[0.04] transition-colors group relative"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0" style={{ backgroundColor: ws.avatarColor }}>
                          {ws.name.substring(0,2).toUpperCase()}
                        </div>
                        <div className="flex flex-col items-start truncate">
                          <span className="text-sm font-bold text-white">{ws.name}</span>
                          <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-0.5 ${
                            ws.plan === 'pro' ? 'bg-zinc-500/20 text-zinc-400' :
                            ws.plan === 'starter' ? 'bg-zinc-500/20 text-zinc-400' :
                            'bg-amber-500/20 text-amber-400'
                          }`}>
                            {ws.plan} Plan
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end w-12 shrink-0">
                        {ws.id === activeWorkspaceId ? (
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        ) : (
                          <span className="text-[10px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 bg-white/10 px-2 py-1 rounded transition-all">Switch</span>
                        )}
                      </div>
                    </button>
                  ))}
                  
                  <div className="h-px bg-white/10 my-1" />
                  
                  <button 
                    onClick={() => {
                      setShowWorkspaceDropdown(false);
                      setShowAddWorkspaceModal(true);
                    }}
                    className="w-full flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/[0.04] text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                  >
                    <Plus size={14} className="text-zinc-400" /> Create new workspace
                  </button>
                  <button 
                    onClick={() => {
                      setShowWorkspaceDropdown(false);
                      router.push('/settings/workspace');
                    }}
                    className="w-full flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/[0.04] text-xs font-bold text-zinc-300 hover:text-white transition-colors"
                  >
                    <Users size={14} className="text-zinc-400" /> Invite team member
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-4 h-px bg-white/[0.04] shrink-0" />

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-none">
        <div className="space-y-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href || (item.href === '/inbox' && pathname === '/');
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={`group relative flex items-center justify-between rounded-lg px-2.5 py-2.5 transition-all duration-200 ${
                    isActive 
                      ? 'bg-violet-500/10 text-violet-300' 
                      : 'text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200'
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-violet-500"
                      style={{ boxShadow: 'inset 3px 0 0 #7c3aed, 2px 0 12px rgba(124,58,237,0.3)' }}
                    />
                  )}

                  <div className="flex items-center gap-3 overflow-hidden">
                    <Icon size={18} className={`shrink-0 ${isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300 transition-colors'}`} />
                    <AnimatePresence mode="popLayout">
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-medium whitespace-nowrap"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Badges */}
                  <AnimatePresence mode="popLayout">
                    {!collapsed && item.badge && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                          item.badgeColor === 'red'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                            : item.badgeColor === 'blue'
                            ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                            : item.badgeColor === 'amber'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                            : item.badge === 'Hot'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                            : 'bg-violet-500/20 text-violet-300 border border-violet-500/20'
                        }`}
                      >
                        {item.badge}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-white/[0.04] p-4 flex flex-col gap-4">
        
        {/* AI Mode Toggle */}
        <motion.div 
          layout
          className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} rounded-xl border p-1 transition-all duration-300 cursor-pointer ${
            mode === 'auto' 
              ? 'border-emerald-500/30 bg-emerald-500/5 shadow-[inset_0_0_12px_rgba(52,211,153,0.1)]' 
              : 'border-amber-500/30 bg-amber-500/5 shadow-[inset_0_0_12px_rgba(245,158,11,0.1)]'
          }`}
          onClick={() => setMode(mode === 'auto' ? 'supervised' : 'auto')}
          title={collapsed ? `Mode: ${mode === 'auto' ? 'Auto-Pilot' : 'Supervised'}` : undefined}
        >
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
            <div className={`absolute inset-0 rounded-lg blur-[6px] opacity-60 transition-colors duration-500 ${mode === 'auto' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <Zap size={14} className={`relative z-10 transition-colors duration-500 ${mode === 'auto' ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>
          <AnimatePresence mode="popLayout">
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden pl-3 pr-2"
              >
                <div className="flex flex-col justify-center whitespace-nowrap">
                  <span className="text-[11px] font-semibold text-zinc-300 leading-tight">AI Mode</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${mode === 'auto' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {mode === 'auto' ? 'Auto-Pilot' : 'Supervised'}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* User Profile */}
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} transition-all`}>
          <div className="flex items-center gap-3 overflow-hidden" title={collapsed ? "Active User" : undefined}>
            <div className="relative shrink-0">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Avatar" className="h-8 w-8 rounded-full border border-white/10" />
              <div className="absolute -bottom-0.5 -right-0.5 rounded-full border border-[#06080f] bg-emerald-500 p-0.5">
                <Check size={8} className="text-[#06080f]" />
              </div>
            </div>
            
            <AnimatePresence mode="popLayout">
              {!collapsed && (
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex flex-col whitespace-nowrap overflow-hidden"
                >
                  <span className="text-xs font-semibold text-white truncate max-w-[120px]">
                    {activeWorkspaceId === 'ws-1' ? 'Alex Director' : activeWorkspaceId === 'ws-2' ? 'James Wilson' : 'Sophie Laurent'}
                  </span>
                  <span className={`inline-flex mt-1 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-bold text-white max-w-max capitalize
                    ${activeWorkspace.plan === 'pro' ? 'bg-zinc-600' :
                      activeWorkspace.plan === 'starter' ? 'bg-zinc-600' :
                      'bg-amber-600'
                    }`}
                  >
                    {activeWorkspace.plan} Plan
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence mode="popLayout">
            {!collapsed && (
              <motion.button 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="shrink-0 ml-auto p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                title="Sign out"
              >
                <LogOut size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#0a0e1a] text-zinc-400 shadow-md transition-colors hover:text-white hover:bg-white/5 z-50`}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.aside>

    {/* Mobile Bottom Tab Bar */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around glass border-t border-white/[0.04] pb-safe pt-2 px-2 bg-[#06080f]/90">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (item.href === '/inbox' && pathname === '/');
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors ${
              isActive ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <div className="relative">
              <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]' : ''} />
              {item.badge && (
                <span className="absolute -top-1 -right-2 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-[#06080f]" />
              )}
            </div>
            <span className="text-[9px] font-medium mt-1">{item.name}</span>
          </Link>
        );
      })}
    </div>

    {/* Active Leads Floating Badge */}
    <AnimatePresence>
      {showLeadsBadge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={() => router.push('/leads')}
          className="fixed bottom-4 left-4 z-[100] cursor-pointer flex items-center gap-2 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-[#0a0e1a] shadow-[0_4px_14px_rgba(245,158,11,0.4)] hover:scale-[1.02] transition-transform"
        >
          <span>🔥 3 Active Leads</span>
          <button 
            onClick={dismissLeads} 
            className="ml-1 rounded-sm p-0.5 hover:bg-amber-600/40 transition-colors"
            title="Dismiss"
          >
            <X size={14} className="text-[#0a0e1a]/80" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Add Workspace Modal Stub */}
    <AnimatePresence>
      {showAddWorkspaceModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddWorkspaceModal(false)} className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl z-10 text-center">
            <div className="w-12 h-12 bg-zinc-500/20 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-500/30">
              <Plus size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Agency Plan Required</h3>
            <p className="text-sm text-zinc-400 mb-6">Creating multiple independent workspaces requires upgrading to the Agency or Enterprise plan.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowAddWorkspaceModal(false)} className="px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-zinc-300 hover:bg-white/5 transition-colors">Close</button>
              <button onClick={() => setShowAddWorkspaceModal(false)} className="px-4 py-2 rounded-xl bg-gradient-to-r from-zinc-600 to-zinc-500 text-white text-xs font-bold shadow-lg shadow-zinc-500/20">Upgrade Plan</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

