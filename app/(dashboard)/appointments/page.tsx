'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarClock, Sparkles, ChevronLeft, ChevronRight,
  Clock, CheckCircle2, XCircle, Send, X, AlertTriangle, 
  Mail, MessageSquare, PhoneCall
} from 'lucide-react';
import { 
  startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, format, isSameMonth, isSameDay, isToday, 
  addMonths, subMonths, parseISO, setHours, addDays
} from 'date-fns';
import { useAppointmentStore } from '../../../store/appointmentStore';
import { useToast } from '../../../components/shared/ToastProvider';
import { Appointment } from '../../../types';

export default function AppointmentsPage() {
  const { appointments, addAppointment, updateAppointment } = useAppointmentStore();
  const { toast } = useToast();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Form state
  const [contactName, setContactName] = useState('');
  const [meetingType, setMeetingType] = useState('Product Demo');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('15:00');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');

  useEffect(() => { document.title = "Appointments — SellQ AI"; }, []);

  // Calendar logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Get appointments for a specific day
  const getDayAppointments = (day: Date) => {
    return appointments.filter(app => isSameDay(parseISO(app.scheduledAt), day));
  };

  const selectedDayApps = getDayAppointments(selectedDate);
  
  // Pending AI intent
  const pendingJames = appointments.find(a => a.contactName === 'James Wilson' && a.status === 'pending');

  const handleBannerClick = () => {
    if (pendingJames) {
      setContactName(pendingJames.contactName);
      setDateStr(format(parseISO(pendingJames.scheduledAt), 'yyyy-MM-dd'));
      setTimeStr(format(parseISO(pendingJames.scheduledAt), 'HH:mm'));
      setMeetingType(pendingJames.meetingType);
      setNotes(pendingJames.notes || '');
      setShowModal(true);
    }
  };

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !dateStr || !timeStr) return;

    const scheduledAt = new Date(`${dateStr}T${timeStr}`).toISOString();
    
    // If it's James Wilson, update the existing pending appointment to confirmed
    if (pendingJames && contactName === pendingJames.contactName) {
      updateAppointment(pendingJames.id, {
        scheduledAt,
        durationMinutes: duration,
        meetingType,
        notes,
        status: 'confirmed'
      });
      setShowBanner(false);
    } else {
      addAppointment({
        id: `app-${Date.now()}`,
        contactName,
        contactChannel: 'whatsapp',
        scheduledAt,
        durationMinutes: duration,
        meetingType,
        status: 'confirmed',
        aiDetected: false,
        notes,
        createdAt: new Date().toISOString()
      });
    }

    toast({
      type: 'system',
      title: 'Booking Confirmed ✓',
      description: `Appointment scheduled with ${contactName}.`,
    });
    setShowModal(false);
  };

  const handleStatusUpdate = (id: string, status: Appointment['status']) => {
    updateAppointment(id, { status });
    toast({
      type: 'system',
      title: 'Status Updated',
      description: `Appointment is now ${status}.`,
    });
  };

  const handleSendReminder = (contactName: string) => {
    toast({
      type: 'lead',
      title: 'Reminder Dispatched',
      description: `WhatsApp reminder sent to ${contactName}.`,
    });
  };

  const getChannelIcon = (ch?: string) => {
    switch (ch?.toLowerCase()) {
      case 'whatsapp': return <PhoneCall size={14} className="text-emerald-400" />;
      case 'sms':      return <MessageSquare size={14} className="text-cyan-400" />;
      case 'instagram': return <MessageSquare size={14} className="text-pink-400" />;
      default:          return <Mail size={14} className="text-blue-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 lg:p-8 gap-6 scrollbar-none">
      
      {/* ── Banner ── */}
      <AnimatePresence>
        {showBanner && pendingJames && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="shrink-0 rounded-xl bg-gradient-to-r from-zinc-600/20 to-zinc-600/10 border border-zinc-500/30 p-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:border-zinc-500/50 transition-colors"
            onClick={handleBannerClick}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-zinc-500/20 shrink-0">
                <Sparkles size={20} className="text-zinc-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-300">AI detected a booking request in 1 conversation</h3>
                <p className="text-xs text-zinc-200/80 mt-1">"{pendingJames.contactName} asked to book at {format(parseISO(pendingJames.scheduledAt), 'h a')} tomorrow"</p>
              </div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-zinc-600 hover:bg-zinc-500 text-white text-xs font-bold shadow-lg transition-colors shrink-0">
              Review & Confirm
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-wide font-heading flex items-center gap-3">
            <CalendarClock className="text-blue-500" size={32} />
            Appointments
          </h1>
        </div>
        <button 
          onClick={() => {
            setContactName('');
            setDateStr(format(new Date(), 'yyyy-MM-dd'));
            setTimeStr('10:00');
            setNotes('');
            setMeetingType('Product Demo');
            setShowModal(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-zinc-500 hover:from-blue-500 hover:to-zinc-400 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
        >
          <CalendarClock size={16} /> New Booking
        </button>
      </div>

      {/* ── Split View: Calendar & Side Panel ── */}
      <div className="flex flex-col lg:flex-row gap-6 min-h-[500px]">
        
        {/* Left: Monthly Calendar */}
        <div className="lg:w-2/3 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><ChevronLeft size={16}/></button>
              <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors">Today</button>
              <button onClick={nextMonth} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"><ChevronRight size={16}/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
            {/* Days header */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="bg-zinc-950/60 py-3 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                {day}
              </div>
            ))}
            
            {/* Grid cells */}
            {calendarDays.map((day, i) => {
              const apps = getDayAppointments(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurMonth = isSameMonth(day, currentDate);
              const isTodayDate = isToday(day);

              return (
                <div 
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[80px] p-2 bg-zinc-900 transition-colors cursor-pointer relative group
                    ${!isCurMonth ? 'opacity-40' : ''}
                    ${isSelected ? 'bg-blue-500/10' : 'hover:bg-white/[0.02]'}
                  `}
                >
                  {isTodayDate && (
                    <div className="absolute inset-0 border border-blue-500/30 rounded-lg pointer-events-none" />
                  )}
                  
                  <div className={`text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full mb-1
                    ${isTodayDate ? 'bg-blue-500 text-white' : isSelected ? 'text-blue-400' : 'text-zinc-400'}
                  `}>
                    {format(day, 'd')}
                  </div>

                  {/* Dots */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {apps.map(a => {
                      let bg = 'bg-zinc-500';
                      if (a.status === 'confirmed' || a.status === 'completed') bg = 'bg-emerald-500';
                      if (a.status === 'pending') bg = 'bg-amber-500';
                      if (a.status === 'cancelled') bg = 'bg-rose-500';
                      
                      return (
                        <div key={a.id} className={`w-1.5 h-1.5 rounded-full ${bg} ${a.aiDetected && a.status === 'pending' ? 'animate-pulse' : ''}`} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Side Panel (Cards) */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 flex items-center justify-between shrink-0">
            <div className="text-sm font-bold text-white">
              {isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM do, yyyy')}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-1 rounded-full">
              {selectedDayApps.length} Events
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-none pb-4">
            <AnimatePresence mode="popLayout">
              {selectedDayApps.length === 0 ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center p-8 border border-white/5 border-dashed rounded-2xl text-zinc-500 text-xs">
                  No appointments for this date.
                </motion.div>
              ) : (
                selectedDayApps.map(app => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={app.id} 
                    className={`p-4 rounded-xl border flex flex-col gap-3 relative overflow-hidden transition-all
                      ${app.status === 'pending' ? 'bg-amber-500/5 border-amber-500/20' : 
                        app.status === 'confirmed' ? 'bg-zinc-900/80 border-emerald-500/20' :
                        'bg-zinc-900/40 border-white/5 opacity-70'}
                    `}
                  >
                    {app.status === 'pending' && <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />}

                    <div className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {app.contactName}
                          {app.aiDetected && <Sparkles size={12} className="text-zinc-400" />}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-1 capitalize">
                          {getChannelIcon(app.contactChannel)} {app.contactChannel}
                        </div>
                      </div>
                      
                      {/* Status Pill */}
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border
                        ${app.status === 'confirmed' || app.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}
                        ${app.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : ''}
                        ${app.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : ''}
                      `}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-300">
                      <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                        <Clock size={12} className="text-blue-400" />
                        {format(parseISO(app.scheduledAt), 'h:mm a')}
                      </div>
                      <span className="text-zinc-500">•</span>
                      <span className="font-medium text-zinc-400">{app.meetingType} ({app.durationMinutes}m)</span>
                    </div>

                    {app.notes && (
                      <div className="text-[10px] text-zinc-500 italic border-l-2 border-white/10 pl-2">
                        {app.notes}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5 mt-1">
                      {app.status === 'pending' && (
                        <button onClick={() => handleStatusUpdate(app.id, 'confirmed')} className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[10px] font-bold transition-colors border border-emerald-500/20">
                          <CheckCircle2 size={12} /> Confirm
                        </button>
                      )}
                      {(app.status === 'pending' || app.status === 'confirmed') && (
                        <>
                          <button onClick={() => handleSendReminder(app.contactName)} className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[10px] font-bold transition-colors border border-blue-500/20">
                            <Send size={12} /> Reminder
                          </button>
                          <button onClick={() => handleStatusUpdate(app.id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 text-[10px] font-bold transition-colors ml-auto border border-transparent hover:border-rose-500/20">
                            <XCircle size={12} /> Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl z-10">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    <CalendarClock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Schedule Booking</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Confirm appointment details</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"><X size={18} /></button>
              </div>

              <form onSubmit={handleBook} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Contact Name</label>
                  <input required type="text" value={contactName} onChange={e => setContactName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white focus:border-blue-500/50 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date</label>
                    <input required type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white [color-scheme:dark]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Time</label>
                    <input required type="time" value={timeStr} onChange={e => setTimeStr(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white [color-scheme:dark]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Type</label>
                    <input required type="text" value={meetingType} onChange={e => setMeetingType(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Duration (min)</label>
                    <select value={duration} onChange={e => setDuration(Number(e.target.value))} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white">
                      <option value={15}>15 Minutes</option>
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Notes</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="w-full px-3 py-2 rounded-xl border border-white/10 bg-zinc-950/50 text-sm text-white resize-none" />
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
