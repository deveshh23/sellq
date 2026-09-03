-- ============================================
-- SellQ AI — Complete Supabase Schema
-- Run this SQL in the Supabase SQL Editor
-- ============================================

-- 1. User / Business Profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT,
  business_type TEXT,
  knowledge_base TEXT,
  ai_mode TEXT DEFAULT 'supervised' CHECK (ai_mode IN ('auto', 'supervised')),
  response_tone TEXT DEFAULT 'professional' CHECK (response_tone IN ('professional', 'casual', 'empathetic', 'persuasive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  contact_avatar TEXT,
  contact_channel TEXT NOT NULL CHECK (contact_channel IN ('whatsapp', 'instagram', 'website')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'snoozed', 'resolved')),
  sentiment TEXT DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative', 'urgent')),
  urgency_score INTEGER DEFAULT 30,
  is_lead BOOLEAN DEFAULT FALSE,
  lead_priority TEXT CHECK (lead_priority IN ('hot', 'warm', 'cold')),
  lead_reason TEXT,
  summary TEXT,
  ai_draft TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'agent', 'ai')),
  content TEXT NOT NULL,
  channel TEXT CHECK (channel IN ('whatsapp', 'instagram', 'website')),
  sentiment TEXT CHECK (sentiment IN ('positive', 'neutral', 'negative', 'urgent')),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Leads (CRM Pipeline)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  contact_name TEXT NOT NULL,
  contact_email TEXT,
  company_name TEXT,
  channel TEXT CHECK (channel IN ('whatsapp', 'instagram', 'website')),
  deal_value NUMERIC DEFAULT 0,
  confidence INTEGER DEFAULT 50,
  priority TEXT DEFAULT 'warm' CHECK (priority IN ('hot', 'warm', 'cold')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost')),
  reason TEXT,
  summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Knowledge Base (one row per user)
CREATE TABLE knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  content TEXT DEFAULT '',
  word_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Indexes for Performance
-- ============================================
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_channel ON conversations(contact_channel);
CREATE INDEX idx_conversations_last_msg ON conversations(last_message_at DESC);
CREATE INDEX idx_messages_conversation ON messages(conversation_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_leads_user ON leads(user_id);
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_leads_status ON leads(status);

-- ============================================
-- Enable Supabase Realtime
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE leads;

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- conversations
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own conversations" ON conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON conversations FOR DELETE USING (auth.uid() = user_id);

-- messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view messages in own conversations" ON messages FOR SELECT
  USING (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));
CREATE POLICY "Users can insert messages in own conversations" ON messages FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM conversations WHERE conversations.id = messages.conversation_id AND conversations.user_id = auth.uid()));

-- leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own leads" ON leads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own leads" ON leads FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own leads" ON leads FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own leads" ON leads FOR DELETE USING (auth.uid() = user_id);

-- knowledge_base
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own knowledge base" ON knowledge_base FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert own knowledge base" ON knowledge_base FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own knowledge base" ON knowledge_base FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- Auto-update knowledge_base word count trigger
-- ============================================
CREATE OR REPLACE FUNCTION update_kb_word_count()
RETURNS TRIGGER AS $$
BEGIN
  NEW.word_count := array_length(string_to_array(trim(COALESCE(NEW.content, '')), ' '), 1);
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_kb_word_count
  BEFORE INSERT OR UPDATE ON knowledge_base
  FOR EACH ROW EXECUTE FUNCTION update_kb_word_count();

-- ============================================
-- Auto-create profile on signup (auth trigger)
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  INSERT INTO public.knowledge_base (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- AI Lead Scoring Updates
-- ============================================
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS score_breakdown JSONB,
ADD COLUMN IF NOT EXISTS score_updated_at TIMESTAMPTZ;

-- ============================================
-- Churn Shield
-- ============================================
CREATE TABLE IF NOT EXISTS churn_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  contact_name TEXT,
  churn_probability INTEGER,
  risk_level TEXT,
  signals JSONB,
  suggested_action TEXT,
  recovery_message TEXT,
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Churn Data (Requires valid current_user_id to run properly, placeholders used)
-- INSERT INTO churn_signals (id, user_id, contact_name, churn_probability, risk_level, signals, suggested_action, recovery_message, detected_at) VALUES 
-- (
--   gen_random_uuid(), 
--   NULL, -- Replace with [current_user_id]
--   'Elena Rostova', 73, 'critical',
--   '["3 unresolved complaints in 7 days", "Sentiment declined from Neutral to Frustrated", "Mentioned competitor Freshdesk twice", "Response time from agent exceeded 4 hours"]',
--   'Offer 20% retention discount immediately',
--   'Hi Elena, I wanted to personally reach out and apologize for the delays you have experienced. I have escalated your case and would like to offer you an exclusive loyalty discount as an appreciation for your patience. Can we schedule a quick call this week?',
--   NOW()
-- ),
-- (
--   gen_random_uuid(),
--   NULL, -- Replace with [current_user_id]
--   'Carlos Mendez', 45, 'high',
--   '["2 billing questions unanswered", "Reduced message frequency this week"]',
--   'Send proactive check-in message',
--   'Hi Carlos, just checking in to make sure everything is going smoothly. Is there anything I can help clarify?',
--   NOW()
-- );

-- ============================================
-- Promises Tracker
-- ============================================
CREATE TABLE IF NOT EXISTS promises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  user_id UUID REFERENCES profiles(id),
  promise_text TEXT,
  promised_to TEXT,
  due_date TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSERT INTO promises (id, conversation_id, user_id, promise_text, promised_to, due_date, status) VALUES 
-- (gen_random_uuid(), NULL, NULL, 'Send security portal link to Sarah Jenkins', 'Sarah Jenkins', NOW() - INTERVAL '1 day', 'pending'),
-- (gen_random_uuid(), NULL, NULL, 'Share enterprise pricing deck with Marco Rossi', 'Marco Rossi', NOW(), 'pending'),
-- (gen_random_uuid(), NULL, NULL, 'Schedule onboarding call with Amanda Cole', 'Amanda Cole', NOW() + INTERVAL '1 day', 'pending');

-- ============================================
-- Appointments
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  conversation_id UUID REFERENCES conversations(id),
  contact_name TEXT NOT NULL,
  contact_channel TEXT,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  meeting_type TEXT DEFAULT 'demo',
  status TEXT DEFAULT 'scheduled',
  ai_detected BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Appointments Data
-- INSERT INTO appointments (id, contact_name, contact_channel, scheduled_at, duration_minutes, meeting_type, status, ai_detected) VALUES 
-- (gen_random_uuid(), 'Sarah Jenkins', 'WhatsApp', NOW() + INTERVAL '1 day' + INTERVAL '10 hours', 30, 'Demo Call', 'scheduled', TRUE),
-- (gen_random_uuid(), 'Marco Rossi', 'Email', NOW() + INTERVAL '15 hours', 45, 'Product Demo', 'scheduled', TRUE),
-- (gen_random_uuid(), 'Amanda Cole', 'Instagram', NOW() + INTERVAL '2 days' + INTERVAL '14 hours', 15, 'Follow-up', 'scheduled', FALSE),
-- (gen_random_uuid(), 'Priya Sharma', 'WhatsApp', NOW() + INTERVAL '4 days' + INTERVAL '11 hours', 60, 'Onboarding', 'scheduled', TRUE);

-- ============================================
-- Follow-Ups
-- ============================================
CREATE TABLE IF NOT EXISTS follow_ups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  user_id UUID REFERENCES profiles(id),
  contact_name TEXT,
  channel TEXT,
  trigger_type TEXT,
  scheduled_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending',
  ai_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Follow-Ups Data
-- INSERT INTO follow_ups (id, contact_name, channel, trigger_type, scheduled_at, status, ai_message) VALUES
-- (gen_random_uuid(), 'Marco Rossi', 'WhatsApp', 'no_reply', NOW() + INTERVAL '2 hours', 'pending', 'Hi Marco! Just following up on your question about the 25-agent plan. I have put together a custom proposal for DesignCo IT — would love to walk you through it. Are you free for a 15-minute call this week?'),
-- (gen_random_uuid(), 'Amanda Cole', 'Email', 'lead_inactive', NOW() + INTERVAL '1 hour', 'pending', 'Hi Amanda, I wanted to circle back on your Salesforce integration question. Our team has confirmed full bi-directional sync is available on the Pro plan. Can I send over the technical spec sheet?'),
-- (gen_random_uuid(), 'Priya Sharma', 'WhatsApp', 'post_demo', NOW() + INTERVAL '1 day' + INTERVAL '9 hours', 'pending', 'Hi Priya! It was great speaking with you about the compliance features. As promised, here is the SOC2 documentation link. Let me know if your team has any questions!');

-- ============================================
-- Workspaces
-- ============================================
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name TEXT NOT NULL,
  business_type TEXT,
  plan TEXT DEFAULT 'pro',
  avatar_color TEXT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Workspaces Data
-- INSERT INTO workspaces (id, name, business_type, plan, avatar_color, is_active) VALUES
-- (gen_random_uuid(), 'Spice Garden', 'Restaurant', 'pro', '#7c3aed', TRUE),
-- (gen_random_uuid(), 'TechFlow Agency', 'Agency', 'growth', '#0891b2', FALSE),
-- (gen_random_uuid(), 'Bloom Salon', 'Retail', 'starter', '#db2777', FALSE);

-- ============================================
-- Payment Attempts (Razorpay Audit Trail)
-- ============================================
CREATE TABLE IF NOT EXISTS payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  product_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  razorpay_link_id TEXT,
  razorpay_payment_link_url TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payment_attempts_conversation ON payment_attempts(conversation_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_user ON payment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_status ON payment_attempts(status);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_created ON payment_attempts(created_at DESC);

ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own payment attempts" ON payment_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payment attempts" ON payment_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own payment attempts" ON payment_attempts FOR UPDATE USING (auth.uid() = user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE payment_attempts;
