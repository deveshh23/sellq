'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 w-full py-24 border-t border-white/5 bg-neutral-950 flex flex-col items-center justify-center px-6 md:px-12 xl:px-24">
      <div className="max-w-xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <span className="text-xs font-semibold text-white/90 tracking-widest uppercase">Contact Us</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
        >
          Get In Touch
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neutral-400 mb-12 leading-relaxed"
        >
          Ready to transform your revenue intelligence? We're here to help. <br/>
          Reach out at <a href="mailto:support@sellq.ai" className="text-purple-400 hover:text-purple-300 transition-colors">support@sellq.ai</a>
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Name</label>
            <input
              type="text"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Email</label>
            <input
              type="email"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Company</label>
            <input
              type="text"
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] text-zinc-400 font-medium tracking-wide uppercase">Message</label>
            <textarea
              rows={4}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
            />
          </div>
          <Button className="w-full mt-4 h-12 bg-white text-black hover:bg-zinc-200 font-semibold transition-all">
            Send Message
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
