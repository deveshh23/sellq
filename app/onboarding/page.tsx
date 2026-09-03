'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Check, CheckCircle2, ChevronRight, CheckSquare, Square, Zap } from 'lucide-react';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useInboxStore } from '../../store/inboxStore';

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const { addWorkspace, setActiveWorkspace } = useWorkspaceStore();

  // Form State
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Step 2
    companyName: '',
    industry: 'Technology',
    teamSize: '1-10',
    country: 'United States',
    // Step 3
    workspaceName: '',
    website: '',
    primaryChannel: 'Email',
    // Step 4
    features: ['AI Lead Scoring', 'AI Sales Agent'] // Default selected
  });

  const updateForm = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => {
      const current = prev.features;
      if (current.includes(feature)) {
        return { ...prev, features: current.filter(f => f !== feature) };
      }
      return { ...prev, features: [...current, feature] };
    });
  };

  const nextStep = () => {
    setDirection(1);
    setStep(prev => prev + 1);
  };

  const completeOnboarding = () => {
    console.log('--- Workspace Creation Started ---');
    
    // 1. Generate new workspace ID
    const newId = `ws-${Date.now()}`;
    
    // 2. Create workspace object
    const newWorkspace = {
      id: newId,
      name: formData.workspaceName || formData.companyName || 'My Workspace',
      businessType: formData.industry,
      plan: 'pro',
      avatarColor: '#8b5cf6', // violet
      isActive: true,
      createdAt: new Date().toISOString()
    };
    
    console.log('Created workspace object:', newWorkspace);

    // 3. Save to store
    addWorkspace(newWorkspace as any);
    console.log('Saved to workspace store');
    
    // 4. Set as active
    setActiveWorkspace(newId);
    console.log(`Set active workspace to: ${newId}`);

    // 5. Update Inbox Store context
    const { setWorkspaceData } = useInboxStore.getState();
    setWorkspaceData(newId);
    console.log(`Updated Inbox store data for workspace: ${newId}`);

    console.log('--- Workspace Creation Complete ---');
    
    // Navigate to dashboard
    router.push('/inbox');
  };

  const availableFeatures = [
    'AI Lead Scoring',
    'AI Sentiment Analysis',
    'AI Sales Agent',
    'Workflow Automation',
    'Churn Shield',
    'WhatsApp Campaigns'
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#06080f] overflow-hidden text-zinc-200 selection:bg-violet-500/30">
      
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-violet-600/10 to-cyan-500/10 blur-[120px] pointer-events-none" />

      {/* Progress Header */}
      <div className="absolute top-0 inset-x-0 h-24 flex items-center justify-between px-8 md:px-12 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 shadow-lg shadow-violet-500/20 flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white tracking-wide">SellQ</span>
        </div>
        
        <div className="hidden md:flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                  i === step ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]' : i < step ? 'bg-violet-500/50' : 'bg-white/5'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[500px] p-6 mt-12">
        <AnimatePresence mode="wait" custom={direction}>
          
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl"
            >
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 mb-2 block">Step 1 of 4</span>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Details</h1>
                <p className="text-zinc-400 text-sm">Create your personal administrator account.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateForm('fullName', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Work Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Password</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => updateForm('password', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Confirm</label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => updateForm('confirmPassword', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={nextStep}
                disabled={!formData.fullName || !formData.email || !formData.password}
                className="w-full mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-xl hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white"
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl"
            >
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 mb-2 block">Step 2 of 4</span>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Business Details</h2>
                <p className="text-zinc-400 text-sm">Tell us about the company you are building for.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateForm('companyName', e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Industry</label>
                    <select
                      value={formData.industry}
                      onChange={(e) => updateForm('industry', e.target.value)}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option>Technology</option>
                      <option>E-commerce</option>
                      <option>Agency / Services</option>
                      <option>Healthcare</option>
                      <option>Real Estate</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Team Size</label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => updateForm('teamSize', e.target.value)}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                    >
                      <option>1-10</option>
                      <option>11-50</option>
                      <option>51-200</option>
                      <option>201-500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => updateForm('country', e.target.value)}
                    className="w-full bg-[#0a0e1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all appearance-none cursor-pointer"
                  >
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>India</option>
                    <option>European Union</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!formData.companyName}
                className="w-full mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-xl hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white"
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl"
            >
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 mb-2 block">Step 3 of 4</span>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Workspace Setup</h2>
                <p className="text-zinc-400 text-sm">Configure your primary intelligence hub.</p>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Workspace Name</label>
                  <input
                    type="text"
                    value={formData.workspaceName}
                    onChange={(e) => updateForm('workspaceName', e.target.value)}
                    placeholder={formData.companyName ? `${formData.companyName} Workspace` : ''}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Business Website</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-zinc-500 text-sm">https://</span>
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => updateForm('website', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-16 pr-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Primary Communication Channel</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Email', 'WhatsApp', 'SMS'].map(channel => (
                      <div 
                        key={channel}
                        onClick={() => updateForm('primaryChannel', channel)}
                        className={`flex items-center justify-center p-3 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                          formData.primaryChannel === channel 
                            ? 'bg-violet-500/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' 
                            : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/30'
                        }`}
                      >
                        {channel}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={nextStep}
                disabled={!formData.workspaceName}
                className="w-full mt-8 flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-xl hover:bg-zinc-200 transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white"
              >
                Continue <ArrowRight size={16} />
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[24px] p-8 md:p-10 shadow-2xl"
            >
              <div className="mb-8">
                <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400 mb-2 block">Step 4 of 4</span>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">SellQ Configuration</h2>
                <p className="text-zinc-400 text-sm">Select the AI revenue features to enable for your workspace.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {availableFeatures.map((feature) => (
                  <div 
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      formData.features.includes(feature)
                        ? 'bg-violet-500/10 border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                        : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className={`${formData.features.includes(feature) ? 'text-violet-400' : 'text-zinc-600'}`}>
                      {formData.features.includes(feature) ? <CheckSquare size={18} /> : <Square size={18} />}
                    </div>
                    <span className={`text-sm font-medium ${formData.features.includes(feature) ? 'text-white' : 'text-zinc-400'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={nextStep}
                disabled={formData.features.length === 0}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-300"
              >
                Create Workspace
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col items-center text-center max-w-md mx-auto"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="w-24 h-24 mb-8 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-violet-500/30"
              >
                <CheckCircle2 size={40} className="text-white" />
              </motion.div>
              
              <h2 className="text-4xl font-bold tracking-tight text-white mb-4">Your SellQ Workspace Is Ready</h2>
              <p className="text-zinc-400 mb-8 text-lg">
                <span className="text-white font-semibold">{formData.workspaceName || 'Your Workspace'}</span> has been successfully provisioned.
              </p>
              
              <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-10 text-left">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Enabled Intelligence</div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map(f => (
                    <div key={f} className="px-3 py-1.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-medium border border-violet-500/20">
                      {f}
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={completeOnboarding}
                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-bold text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-zinc-200 hover:scale-[1.02] transition-all duration-300"
              >
                Launch Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
