/* Replace with your SQL commands */
ALTER TABLE users ADD IF NOT EXISTS password_reset_token TEXT;
ALTER TABLE users ADD IF NOT EXISTS password_reset_token_date TIMESTAMPTZ;