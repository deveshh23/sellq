'use client';
import React from 'react';
import Component from '@/components/ui/stacking-card';

const metrics = [
  {
    title: 'Lead Conversion Rate: +34%',
    description:
      'By instantly engaging leads across WhatsApp and Email within seconds of their inquiry, SellQ dramatically increases the likelihood of a closed deal.',
    link: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    color: '#0f172a', // slate-900
  },
  {
    title: 'Response Time: < 1.2s',
    description:
      'Never let a lead go cold. The AI core guarantees sub-two-second response times 24/7/365, across every supported messaging channel.',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
    color: '#312e81', // indigo-900
  },
  {
    title: 'Support Churn: -22%',
    description:
      'Predictive sentiment analysis catches frustrated users early, automatically escalating critical tickets to human reps before the customer churns.',
    link: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop',
    color: '#581c87', // purple-900
  },
  {
    title: 'Meetings Booked: 3x',
    description:
      'Autonomous scheduling agents handle the back-and-forth negotiation, directly depositing qualified leads into your sales team\'s calendar.',
    link: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop',
    color: '#064e3b', // emerald-900
  },
];

export function SellQMetricsStrip() {
  return (
    <Component 
      projects={metrics} 
      title="The SellQ Impact" 
      subtitle="Measurable growth driven by autonomous sales agents."
    />
  );
}
