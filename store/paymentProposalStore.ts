import { create } from 'zustand';
import { PaymentProposal } from '../types';
import { getProductById } from '../lib/catalog';

interface PaymentProposalState {
  proposals: PaymentProposal[];
  addProposal: (proposal: {
    conversationId: string;
    productId: string;
    draftMessage: string;
  }) => void;
  clearProposal: (conversationId: string) => void;
  updateStatus: (id: string, status: PaymentProposal['status']) => void;
  getActiveProposal: (conversationId: string) => PaymentProposal | undefined;
  clearAll: () => void;
}

export const usePaymentProposalStore = create<PaymentProposalState>((set, get) => ({
  proposals: [],

  addProposal: ({ conversationId, productId, draftMessage }) => {
    const product = getProductById(productId);
    const proposal: PaymentProposal = {
      id: `prop-${Date.now()}`,
      conversationId,
      productId,
      productName: product?.name || productId,
      amountPaise: product?.amountPaise || 0,
      currency: product?.currency || 'INR',
      draftMessage,
      status: 'proposed',
      createdAt: new Date().toISOString(),
    };
    set((state) => ({
      proposals: [proposal, ...state.proposals],
    }));
  },

  clearProposal: (conversationId) =>
    set((state) => ({
      proposals: state.proposals.filter((p) => p.conversationId !== conversationId),
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      proposals: state.proposals.map((p) =>
        p.id === id ? { ...p, status } : p
      ),
    })),

  getActiveProposal: (conversationId) =>
    get().proposals
      .filter((p) => p.conversationId === conversationId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0],

  clearAll: () => set({ proposals: [] }),
}));
