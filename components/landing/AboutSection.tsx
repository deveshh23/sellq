'use client';
import { motion } from 'framer-motion';
import { Sparkles, BarChart, Bot, GitMerge, ShieldAlert } from 'lucide-react';

const features = [
  { icon: BarChart, name: 'AI Lead Scoring', color: 'text-blue-400' },
  { icon: Sparkles, name: 'AI Sentiment Analysis', color: 'text-purple-400' },
  { icon: Bot, name: 'AI Sales Agent', color: 'text-green-400' },
  { icon: GitMerge, name: 'Workflow Automation', color: 'text-yellow-400' },
  { icon: ShieldAlert, name: 'Churn Shield', color: 'text-red-400' },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-10 w-full py-24 border-t border-white/5 bg-black/50 backdrop-blur-3xl flex flex-col items-center justify-center px-6 md:px-12 xl:px-24">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">The Vision</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8"
        >
          Why SellQ Exists
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light"
        >
          SellQ was built to help modern businesses transform customer conversations into actionable revenue intelligence. 
          Instead of relying on disconnected tools and manual workflows, SellQ uses AI to score leads, analyze sentiment, automate engagement and predict churn before it happens.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto w-full">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${feature.color}`}>
                <Icon size={24} />
              </div>
              <span className="text-sm font-semibold text-neutral-200">{feature.name}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
}
