-- ============================================
-- Migration: Create payment_attempts audit table
-- For Razorpay Payment Link flow (SellQ AI)
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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_attempts_conversation ON payment_attempts(conversation_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_user ON payment_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_status ON payment_attempts(status);
CREATE INDEX IF NOT EXISTS idx_payment_attempts_created ON payment_attempts(created_at DESC);

-- Row Level Security
ALTER TABLE payment_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payment attempts" ON payment_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own payment attempts" ON payment_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own payment attempts" ON payment_attempts FOR UPDATE USING (auth.uid() = user_id);

-- Enable realtime
DO $$ BEGIN ALTER PUBLICATION supabase_realtime ADD TABLE payment_attempts; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
