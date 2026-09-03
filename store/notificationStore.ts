import { create } from 'zustand';
import { NotificationLog } from '../types';

interface NotificationState {
  notifications: NotificationLog[];
  addNotification: (notification: Omit<NotificationLog, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: 'init-sys',
      type: 'system',
      title: 'System Online',
      description: 'SellQ AI agent initialized and listening for incoming channels.',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 mins ago
      read: false,
    },
    {
      id: 'init-lead',
      type: 'lead',
      title: 'New High Value Lead',
      description: 'AI detected lead conversion opportunity: Sarah Jenkins (Enterprise pricing query).',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(), // 15 mins ago
      read: false,
    }
  ],
  addNotification: (notification) =>
    set((state) => {
      const newNotif: NotificationLog = {
        ...notification,
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toISOString(),
        read: false,
      };
      return {
        notifications: [newNotif, ...state.notifications],
      };
    }),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () =>
    set({ notifications: [] }),
}));
