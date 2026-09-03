import { useState } from 'react';
import { useInboxStore } from '../../store/inboxStore';
import { useAIModeStore } from '../../store/aiModeStore';
import { usePaymentProposalStore } from '../../store/paymentProposalStore';
import { generateReply as generateAIReply, proposePayment } from '../ai/gemini';

export function useAIReply() {
  const [isGenerating, setIsGenerating] = useState(false);
  const updateDraft = useInboxStore((state) => state.updateConversationAIDraft);
  const aiSettings = useAIModeStore((state) => state.settings);
  const addProposal = usePaymentProposalStore((state) => state.addProposal);

  const generateReply = async (conversationId: string, messageContent: string, toneOverride?: string) => {
    setIsGenerating(true);
    try {
      const formattedHistory = [{ role: 'customer', content: messageContent }];
      const draft = await generateAIReply(
        formattedHistory,
        aiSettings.customInstructions,
        toneOverride || aiSettings.tone
      );
      updateDraft(conversationId, draft);

      const proposal = await proposePayment(formattedHistory);
      if (proposal) {
        const existing = usePaymentProposalStore.getState().getActiveProposal(conversationId);
        if (!existing) {
          addProposal({
            conversationId,
            productId: proposal.productId,
            draftMessage: proposal.draftMessage,
          });
        }
      }

      return draft;
    } catch (e) {
      console.error(e);
      return '';
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateReply,
  };
}
