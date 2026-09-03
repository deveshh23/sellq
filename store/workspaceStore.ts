import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Workspace } from '../types';

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspaceId: string;
  setActiveWorkspace: (id: string) => void;
  addWorkspace: (workspace: Workspace) => void;
}

const initialWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    name: 'Spice Garden',
    businessType: 'Restaurant',
    plan: 'pro',
    avatarColor: '#10b981', // emerald
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ws-2',
    name: 'TechFlow Solutions',
    businessType: 'Software',
    plan: 'starter',
    avatarColor: '#3b82f6', // blue
    isActive: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'ws-3',
    name: 'Bloom Boutique',
    businessType: 'Retail',
    plan: 'pro',
    avatarColor: '#ec4899', // pink
    isActive: false,
    createdAt: new Date().toISOString()
  }
];

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: initialWorkspaces,
      activeWorkspaceId: 'ws-1',
      setActiveWorkspace: (id: string) =>
        set((state) => ({
          activeWorkspaceId: id,
          workspaces: state.workspaces.map((ws) => ({
            ...ws,
            isActive: ws.id === id
          }))
        })),
      addWorkspace: (workspace: Workspace) =>
        set((state) => ({ workspaces: [...state.workspaces, workspace] })),
    }),
    {
      name: 'sellq-workspace-storage',
    }
  )
);
