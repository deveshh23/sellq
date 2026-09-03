export type Channel = 'email' | 'whatsapp' | 'sms' | 'instagram';

export type Sentiment = 'positive' | 'neutral' | 'negative' | 'urgent';

export type ConversationStatus = 'open' | 'snoozed' | 'resolved';

export interface Message {
  id: string;
  conversationId: string;
  sender: 'user' | 'agent' | 'ai';
  content: string;
  timestamp: string;
  channel: Channel;
  sentiment?: Sentiment;
}

export interface Conversation {
  id: string;
  contactName: string;
  contactEmail: string;
  contactAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  status: ConversationStatus;
  channel: Channel;
  sentiment: Sentiment;
  urgencyScore: number; // 0 - 100
  summary?: string;
  messages: Message[];
  aiDraft?: string;
}

export interface Lead {
  id: string;
  conversationId: string;
  contactName: string;
  contactEmail: string;
  companyName?: string;
  dealValue: number;
  confidence: number; // 0 - 100
  priority: 'hot' | 'warm' | 'cold';
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost';
  channel: Channel;
  dateCreated: string;
  summary: string;
  score?: number;
  scoreBreakdown?: {
    intent: number;
    urgency: number;
    budget: number;
    engagement: number;
    recency?: number;
    sentiment?: number;
  };
  scoreUpdatedAt?: string;
  recommendation?: string;
  aiExplanation?: string[];
}

export interface NotificationLog {
  id: string;
  type: 'message' | 'lead' | 'ai_reply' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface AISettings {
  autoPilot: boolean;
  tone: 'professional' | 'casual' | 'empathetic' | 'persuasive';
  agentName: string;
  customInstructions: string;
}

export interface PromiseTracker {
  id: string;
  conversationId: string;
  promiseText: string;
  promisedTo: string;
  dueDate: string;
  status: 'pending' | 'resolved';
  detectedAt: string;
}

export interface Appointment {
  id: string;
  contactName: string;
  contactChannel?: string;
  scheduledAt: string;
  durationMinutes: number;
  meetingType: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  aiDetected: boolean;
  notes?: string;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  contactName: string;
  channel: string;
  triggerType: 'no_reply' | 'after_meeting' | 'post_demo' | 'manual' | 'lead_inactive';
  scheduledAt: string;
  status: 'pending' | 'sent' | 'dismissed';
  aiMessage: string;
  sentAt?: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  businessType: string;
  plan: 'starter' | 'growth' | 'pro' | 'enterprise';
  avatarColor: string;
  isActive: boolean;
  createdAt: string;
}

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface PaymentAttempt {
  id: string;
  conversationId: string;
  productId: string;
  productName?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  razorpayLinkId?: string;
  razorpayPaymentLinkUrl?: string;
  errorMessage?: string;
  createdAt: string;
}
