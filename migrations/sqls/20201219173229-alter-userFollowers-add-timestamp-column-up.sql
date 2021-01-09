/* Replace with your SQL commands */
ALTER TABLE user_followers ADD COLUMN IF NOT EXISTS followed_at TIMESTAMPTZ DEFAULT NOW();