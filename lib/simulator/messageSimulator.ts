import { useInboxStore } from '../../store/inboxStore';
import { useAIModeStore } from '../../store/aiModeStore';
import { useNotificationStore } from '../../store/notificationStore';
import { usePaymentProposalStore } from '../../store/paymentProposalStore';
import { detectSentiment, detectLead, generateReply, proposePayment } from '../ai/gemini';
import { Conversation, Message, Lead, Channel } from '../../types';

// ============================================
// 20+ realistic customer messages by channel
// ============================================

interface MessageTemplate {
  content: string;
  channel: Channel;
}

const messageTemplates: MessageTemplate[] = [
  // WhatsApp (8)
  { content: 'Hi, what are your timings today?', channel: 'whatsapp' },
  { content: 'Do you do home delivery? I\'m near the downtown area.', channel: 'whatsapp' },
  { content: 'What\'s the price for the deluxe package?', channel: 'whatsapp' },
  { content: 'Hey! Can I get a bulk order discount for 50 units?', channel: 'whatsapp' },
  { content: 'I placed an order 3 days ago and still haven\'t received it. Very frustrated.', channel: 'whatsapp' },
  { content: 'Do you accept UPI payments?', channel: 'whatsapp' },
  { content: 'I need to cancel my subscription. How do I do that?', channel: 'whatsapp' },
  { content: 'Your product is amazing! Just wanted to share that our team loves it.', channel: 'whatsapp' },

  // Instagram (7)
  { content: 'Saw your post! Do you ship to Hyderabad?', channel: 'sms' },
  { content: 'How much for a custom order? I want something personalized.', channel: 'sms' },
  { content: 'OMG love your designs! Are these available in store?', channel: 'sms' },
  { content: 'Can I become a brand ambassador? I have 15K followers.', channel: 'sms' },
  { content: 'Is the summer sale still going on? I saw 40% off on stories.', channel: 'sms' },
  { content: 'I messaged yesterday but no response. Kind of disappointed.', channel: 'sms' },
  { content: 'Do you have a referral program? I want to share with my friends.', channel: 'sms' },

  // Website Chat (8)
  { content: 'Can I book an appointment for tomorrow at 3 PM?', channel: 'email' },
  { content: 'What payment methods do you accept?', channel: 'email' },
  { content: 'I\'m comparing your enterprise plan vs competitors. Can you send me a detailed comparison?', channel: 'email' },
  { content: 'The checkout page is showing an error. I can\'t complete my purchase.', channel: 'email' },
  { content: 'Do you offer a free trial before committing to an annual plan?', channel: 'email' },
  { content: 'We\'re a team of 25. What would be the best plan for us?', channel: 'email' },
  { content: 'Just signed up! Everything looks great so far. Quick question about integrations.', channel: 'email' },
  { content: 'I need to upgrade from Starter to Business. Will I lose any data?', channel: 'email' },
];

// ============================================
// 10 random contact names with metadata
// ============================================

interface ContactProfile {
  name: string;
  email: string;
  avatar?: string;
  company?: string;
}

const contactPool: ContactProfile[] = [
  { name: 'Priya Sharma', email: 'priya@startupindia.co', company: 'StartupIndia' },
  { name: 'James Wilson', email: 'james.w@techflow.io', company: 'TechFlow' },
  { name: 'Aisha Khan', email: 'aisha@designlab.pk', company: 'DesignLab' },
  { name: 'Carlos Mendez', email: 'carlos@retailpro.mx', company: 'RetailPro' },
  { name: 'Sophie Laurent', email: 'sophie@modehub.fr', company: 'ModeHub' },
  { name: 'Raj Patel', email: 'raj@cloudscale.in', company: 'CloudScale' },
  { name: 'Emma Johnson', email: 'emma.j@greenleaf.co.uk', company: 'GreenLeaf' },
  { name: 'David Kim', email: 'david@nexgen.kr', company: 'NexGen' },
  { name: 'Fatima Al-Rashid', email: 'fatima@oasisretail.ae', company: 'OasisRetail' },
  { name: 'Lucas Schmidt', email: 'lucas@autohaus.de', company: 'AutoHaus' },
  { name: 'Hannah Brown', email: 'hannah@creative.com', company: 'Creative Co' },
  { name: 'Omar Youssef', email: 'omar@builders.ae', company: 'Builders' },
  { name: 'Isabella Silva', email: 'isabella@saopaulo.br', company: 'SaoPaulo Tech' },
  { name: 'Liam O\'Connor', email: 'liam@dublinfin.ie', company: 'Dublin Finance' },
  { name: 'Mei Lin', email: 'mei@shanghaitech.cn', company: 'Shanghai Tech' },
];

// ============================================
// Timer reference for start/stop
// ============================================
let simulatorInterval: ReturnType<typeof setInterval> | null = null;

// ============================================
// Core: Generate a single simulated message
// ============================================
export async function generateSimulatedMessage(_userId?: string): Promise<{
  conversation: Conversation;
  message: Message;
  lead: Lead | null;
} | null> {
  try {
    // Pick random template & contact
    const template = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
    const contact = contactPool[Math.floor(Math.random() * contactPool.length)];

    const conversationId = `conv-sim-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const messageId = `msg-sim-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const aiSettings = useAIModeStore.getState().settings;

    // Build the message object
    const message: Message = {
      id: messageId,
      conversationId,
      sender: 'user',
      content: template.content,
      timestamp,
      channel: template.channel,
      sentiment: 'neutral',
    };

    // AI Pipeline Step 1: Sentiment Analysis
    const sentimentResult = await detectSentiment(template.content);
    message.sentiment = sentimentResult.sentiment as any;

    // AI Pipeline Step 2: Lead Detection
    const history = [message];
    const formattedHistory = [{ role: 'customer', content: message.content }];
    const leadData = await detectLead(formattedHistory);

    let lead: Lead | null = null;
    if (leadData.isLead) {
      const dealValues: Record<string, number> = { hot: 5000, warm: 1500, cold: 500 };
      const confidences: Record<string, number> = { hot: 92, warm: 74, cold: 55 };
      lead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).substring(5)}`,
        conversationId,
        contactName: contact.name,
        contactEmail: contact.email,
        companyName: contact.company || 'Prospect Corp',
        dealValue: dealValues[leadData.priority] ?? 1000,
        confidence: confidences[leadData.priority] ?? 65,
        priority: leadData.priority as 'hot' | 'warm' | 'cold',
        status: 'new',
        channel: template.channel,
        dateCreated: timestamp,
        summary: leadData.reason,
      };
    }

    // AI Pipeline Step 3: Generate draft reply
    const aiDraft = await generateReply(
      formattedHistory,
      aiSettings.customInstructions,
      aiSettings.tone
    );

    // Build conversation object
    const conversation: Conversation = {
      id: conversationId,
      contactName: contact.name,
      contactEmail: contact.email,
      contactAvatar: undefined,
      lastMessage: template.content,
      lastMessageTime: timestamp,
      status: 'open',
      channel: template.channel,
      sentiment: sentimentResult.sentiment as any,
      urgencyScore:
        sentimentResult.sentiment === 'urgent' ? 90 :
        sentimentResult.sentiment === 'negative' ? 70 :
        sentimentResult.sentiment === 'positive' ? 20 : 35,
      summary: lead ? lead.summary : `Customer inquiry via ${template.channel}`,
      messages: [message],
      aiDraft,
    };

    // ========================================
    // Update Zustand stores (client-side)
    // ========================================

    // 1. Add conversation to inbox
    useInboxStore.getState().addConversation(conversation);

    // 2. Add lead if detected
    if (lead) {
      useInboxStore.getState().addLead(lead);
    }

    // 3. Push notification
    useNotificationStore.getState().addNotification({
      type: lead ? 'lead' : 'message',
      title: lead ? `🔥 Lead Detected: ${contact.name}` : `New message from ${contact.name}`,
      description: lead
        ? `${leadData.reason} — ${contact.company || 'Prospect'} via ${template.channel}`
        : `"${template.content.substring(0, 60)}..." via ${template.channel}`,
    });

    // 3b. Payment Proposal Detection (only for high-intent leads)
    if (leadData.isLead) {
      try {
        const paymentProposal = await proposePayment(formattedHistory);
        if (paymentProposal) {
          const existing = usePaymentProposalStore.getState().getActiveProposal(conversationId);
          if (!existing) {
            usePaymentProposalStore.getState().addProposal({
              conversationId,
              productId: paymentProposal.productId,
              draftMessage: paymentProposal.draftMessage,
            });
            useNotificationStore.getState().addNotification({
              type: 'system',
              title: '💰 Payment Proposal Ready',
              description: `${contact.name} is ready to pay. AI drafted a payment proposal.`,
            });
          }
        }
      } catch (e) {
        console.error('[Simulator] Payment proposal detection failed:', e);
      }
    }

    // 4. Auto-pilot: dispatch AI reply if enabled
    if (aiSettings.autoPilot && aiDraft) {
      setTimeout(() => {
        const aiReply: Message = {
          id: `msg-ai-${Date.now()}`,
          conversationId,
          sender: 'ai',
          content: aiDraft,
          timestamp: new Date().toISOString(),
          channel: template.channel,
        };

        useInboxStore.getState().addMessageToConversation(conversationId, aiReply);
        useInboxStore.getState().updateConversationAIDraft(conversationId, '');
        useInboxStore.getState().updateConversationStatus(conversationId, 'resolved');

        useNotificationStore.getState().addNotification({
          type: 'ai_reply',
          title: 'Auto-Pilot Reply Sent ✓',
          description: `AI co-pilot autonomously responded to ${contact.name}.`,
        });
      }, 3500 + Math.random() * 2000);
    }

    return { conversation, message, lead };
  } catch (error) {
    console.error('[Simulator] Message generation failed:', error);
    return null;
  }
}

// ============================================
// Backward compat alias
// ============================================
export const simulateIncomingMessage = generateSimulatedMessage;

// ============================================
// Start / Stop simulator interval
// ============================================
export function startSimulator(userId?: string, intervalMs: number = 20000): void {
  // Don't double-start
  if (simulatorInterval) return;

  console.log(`[Simulator] Started — generating messages every ${intervalMs / 1000}s`);

  simulatorInterval = setInterval(async () => {
    await generateSimulatedMessage(userId);
  }, intervalMs);
}

export function stopSimulator(): void {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
    simulatorInterval = null;
    console.log('[Simulator] Stopped');
  }
}
