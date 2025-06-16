-- 🗄️ DAILYMINT - Complete Database Schema with RLS Policies
-- Production-ready Supabase schema for DailyMint miniapp

-- ============================================================================
-- 📋 TABLES
-- ============================================================================

-- Users table (comprehensive user data)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fid BIGINT UNIQUE NOT NULL,
  username TEXT,
  display_name TEXT,
  pfp_url TEXT,
  wallet_address TEXT,
  total_coins_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily prompts table (AI generated and community prompts)
CREATE TABLE daily_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  prompt_text TEXT NOT NULL,
  prompt_type TEXT NOT NULL CHECK (prompt_type IN ('text', 'visual', 'idea', 'micro_fiction')),
  created_by_user_id UUID REFERENCES users(id),
  is_community_generated BOOLEAN DEFAULT FALSE,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User creations table (all user-generated content)
CREATE TABLE creations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  prompt_id UUID REFERENCES daily_prompts(id) NOT NULL,
  content TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text',
  zora_token_id BIGINT,
  zora_contract_address TEXT,
  mint_hash TEXT,
  is_minted BOOLEAN DEFAULT FALSE,
  coins_earned INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  
  -- Ensure one creation per user per day
  UNIQUE(user_id, prompt_id)
);

-- User streaks table (gamification and habit tracking)
CREATE TABLE user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_creation_date DATE,
  total_creations INTEGER DEFAULT 0,
  streak_start_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collections table (user-organized content)
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  zora_collection_address TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  creation_count INTEGER DEFAULT 0,
  total_coins_value INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Collection items junction table
CREATE TABLE collection_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  creation_id UUID REFERENCES creations(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sort_order INTEGER DEFAULT 0,
  
  UNIQUE(collection_id, creation_id)
);

-- User tokens table (Coins v4 integration)
CREATE TABLE user_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) UNIQUE NOT NULL,
  token_balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token transactions table (complete audit trail)
CREATE TABLE token_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'spent', 'bonus')),
  amount INTEGER NOT NULL,
  description TEXT NOT NULL,
  creation_id UUID REFERENCES creations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table (in-app and push notifications)
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('streak', 'reward', 'social', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data JSONB -- Additional notification data
);

-- ============================================================================
-- 📊 INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_users_fid ON users(fid);
CREATE INDEX idx_creations_user_date ON creations(user_id, created_at);
CREATE INDEX idx_creations_public ON creations(is_public, created_at) WHERE is_public = true;
CREATE INDEX idx_daily_prompts_date ON daily_prompts(date);
CREATE INDEX idx_token_transactions_user ON token_transactions(user_id, created_at);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read, created_at);

-- New indexes for soft delete and metadata
CREATE INDEX idx_creations_deleted_at ON creations(deleted_at) WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_collections_deleted_at ON collections(deleted_at) WHERE deleted_at IS NOT NULL;
CREATE INDEX idx_creations_metadata ON creations USING GIN (metadata);

-- ============================================================================
-- 🔧 HELPER FUNCTIONS
-- ============================================================================

-- Function to check if user owns a creation
CREATE OR REPLACE FUNCTION user_owns_creation(creation_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM creations 
    WHERE id = creation_uuid 
    AND user_id = auth.uid()::uuid
    AND deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if collection is accessible (owned or public)
CREATE OR REPLACE FUNCTION collection_accessible(collection_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM collections 
    WHERE id = collection_uuid 
    AND (user_id = auth.uid()::uuid OR is_public = true)
    AND deleted_at IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- ============================================================================
-- 🔄 TRIGGERS
-- ============================================================================

-- Create triggers for updated_at on relevant tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creations_updated_at
    BEFORE UPDATE ON creations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collections_updated_at
    BEFORE UPDATE ON collections
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 🔐 ENABLE ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 🔒 ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- -----------------------------------------------------------------------------
-- USERS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view own profile
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (auth.uid()::text = id::text);

-- Users can update own profile
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow public access to basic profile info for social features
CREATE POLICY "Public profiles visible" ON users 
  FOR SELECT USING (true);

-- Prevent user creation/deletion (handled by auth system)
CREATE POLICY "No direct user creation" ON users 
  FOR INSERT WITH CHECK (false);

-- -----------------------------------------------------------------------------
-- DAILY_PROMPTS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Everyone can read daily prompts
CREATE POLICY "Daily prompts public read" ON daily_prompts 
  FOR SELECT USING (true);

-- Users can create community prompts
CREATE POLICY "Users can suggest prompts" ON daily_prompts 
  FOR INSERT WITH CHECK (created_by_user_id = auth.uid()::uuid);

-- Users can update their own prompts
CREATE POLICY "Users can edit own prompts" ON daily_prompts 
  FOR UPDATE USING (created_by_user_id = auth.uid()::uuid);

-- -----------------------------------------------------------------------------
-- CREATIONS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view own creations
CREATE POLICY "Users can view own creations" ON creations 
  FOR SELECT USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- Users can insert own creations
CREATE POLICY "Users can insert own creations" ON creations 
  FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Anyone can view public creations
CREATE POLICY "Anyone can view public creations" ON creations 
  FOR SELECT USING (
    is_public = true 
    AND deleted_at IS NULL
  );

-- Users can update their own creations
CREATE POLICY "Users can update own creations" ON creations 
  FOR UPDATE USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- Users can soft delete their own creations
CREATE POLICY "Users can delete own creations" ON creations 
  FOR UPDATE USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- -----------------------------------------------------------------------------
-- USER_STREAKS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view their own streaks
CREATE POLICY "Users can view own streaks" ON user_streaks 
  FOR SELECT USING (user_id = auth.uid()::uuid);

-- Users can insert their own streak data
CREATE POLICY "Users can create own streaks" ON user_streaks 
  FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Users can update their own streaks
CREATE POLICY "Users can update own streaks" ON user_streaks 
  FOR UPDATE USING (user_id = auth.uid()::uuid);

-- Public read for leaderboards (optional - remove if you want streaks private)
CREATE POLICY "Public streak leaderboard" ON user_streaks 
  FOR SELECT USING (true);

-- -----------------------------------------------------------------------------
-- COLLECTIONS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view their own collections
CREATE POLICY "Users can view own collections" ON collections 
  FOR SELECT USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- Anyone can view public collections
CREATE POLICY "Public collections visible" ON collections 
  FOR SELECT USING (
    is_public = true 
    AND deleted_at IS NULL
  );

-- Users can create collections
CREATE POLICY "Users can create collections" ON collections 
  FOR INSERT WITH CHECK (user_id = auth.uid()::uuid);

-- Users can update their own collections
CREATE POLICY "Users can update own collections" ON collections 
  FOR UPDATE USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- Users can soft delete their own collections
CREATE POLICY "Users can delete own collections" ON collections 
  FOR UPDATE USING (
    user_id = auth.uid()::uuid 
    AND deleted_at IS NULL
  );

-- -----------------------------------------------------------------------------
-- COLLECTION_ITEMS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view items in their own collections
CREATE POLICY "Users can view own collection items" ON collection_items 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_id 
      AND collections.user_id = auth.uid()::uuid
      AND collections.deleted_at IS NULL
    )
  );

-- Anyone can view items in public collections
CREATE POLICY "Public collection items visible" ON collection_items 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_id 
      AND collections.is_public = true
      AND collections.deleted_at IS NULL
    )
  );

-- Users can add items to their own collections
CREATE POLICY "Users can add to own collections" ON collection_items 
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_id 
      AND collections.user_id = auth.uid()::uuid
      AND collections.deleted_at IS NULL
    )
  );

-- Users can update items in their own collections
CREATE POLICY "Users can update own collection items" ON collection_items 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_id 
      AND collections.user_id = auth.uid()::uuid
      AND collections.deleted_at IS NULL
    )
  );

-- Users can remove items from their own collections
CREATE POLICY "Users can remove from own collections" ON collection_items 
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM collections 
      WHERE collections.id = collection_id 
      AND collections.user_id = auth.uid()::uuid
      AND collections.deleted_at IS NULL
    )
  );

-- -----------------------------------------------------------------------------
-- USER_TOKENS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can only view their own token data
CREATE POLICY "Users can view own tokens" ON user_tokens 
  FOR SELECT USING (user_id = auth.uid()::uuid);

-- Only system can modify token balances (use service role)
CREATE POLICY "System can update tokens" ON user_tokens 
  FOR ALL USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- TOKEN_TRANSACTIONS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view their own transaction history
CREATE POLICY "Users can view own transactions" ON token_transactions 
  FOR SELECT USING (user_id = auth.uid()::uuid);

-- Only system can create transactions (audit trail protection)
CREATE POLICY "System can insert transactions" ON token_transactions 
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- No updates or deletes allowed (maintain audit trail integrity)

-- -----------------------------------------------------------------------------
-- NOTIFICATIONS TABLE POLICIES
-- -----------------------------------------------------------------------------

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications" ON notifications 
  FOR SELECT USING (user_id = auth.uid()::uuid);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications" ON notifications 
  FOR UPDATE USING (user_id = auth.uid()::uuid);

-- Users can delete their own notifications
CREATE POLICY "Users can delete own notifications" ON notifications 
  FOR DELETE USING (user_id = auth.uid()::uuid);

-- System can create notifications
CREATE POLICY "System can create notifications" ON notifications 
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- 🎯 SECURITY SUMMARY
-- ============================================================================

/*
KEY SECURITY FEATURES:
✅ Users can only access their own data
✅ Public content is accessible to all (creations, collections, profiles)
✅ System operations protected with service role
✅ Audit trails are insert-only (token_transactions)
✅ Cross-table ownership validation (collection_items)
✅ Helper functions for common security checks
✅ No direct user creation (auth system handles)
✅ Leaderboards enabled via public streak access
✅ Soft delete support for creations and collections
✅ Automatic updated_at timestamp management
✅ Metadata support for future extensibility

USAGE NOTES:
- Use service role for backend operations (token updates, notifications)
- Client operations use authenticated user context
- Public collections enable social discovery features
- Token transactions maintain complete audit trail
- Notifications support real-time engagement features
- Soft deletes maintain data integrity while allowing "deletion"
- Metadata column enables future feature additions without schema changes
*/ 