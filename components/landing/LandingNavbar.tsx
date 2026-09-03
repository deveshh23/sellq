'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['features', 'about', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Detect if section is in the upper half of viewport
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as any }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow"></div>
            <span className="font-bold text-xl tracking-wide text-white">SellQ</span>
          </Link>

          {/* DESKTOP LINKS - CENTER */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {['Features', 'About', 'Contact'].map((item) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <Link 
                  key={item} 
                  href={`#${id}`}
                  className={`text-sm font-medium transition-colors relative group ${isActive ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-300 rounded-full ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* DESKTOP ACTIONS - RIGHT */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors px-4"
              >
                Login
              </Button>
            </Link>
            
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Button className="relative text-sm font-semibold text-white bg-black/50 border border-white/10 hover:bg-black/30 hover:border-white/20 rounded-full px-6 backdrop-blur-md transition-all">
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="md:hidden text-neutral-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[60] bg-black/80 flex flex-col p-6"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600"></div>
                <span className="font-bold text-xl text-white">SellQ</span>
              </div>
              <button 
                onClick={() => setMobileOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-2xl font-medium text-neutral-300 mb-12">
              {['Features', 'About', 'Contact'].map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <Link 
                    key={item}
                    href={`#${id}`} 
                    onClick={() => setMobileOpen(false)} 
                    className={`border-b border-white/5 pb-4 transition-colors ${isActive ? 'text-white' : 'hover:text-white'}`}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-auto pb-12">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full">
                <Button variant="ghost" className="w-full text-lg h-14 bg-white/5 border border-white/10 text-white rounded-full">
                  Login
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur-md opacity-50"></div>
                <Button className="w-full relative text-lg h-14 font-semibold text-white bg-black/50 border border-white/20 rounded-full backdrop-blur-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
