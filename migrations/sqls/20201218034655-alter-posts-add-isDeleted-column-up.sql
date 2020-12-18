/* Replace with your SQL commands */
ALTER TABLE posts ADD COLUMN IF NOT EXISTS isDeleted BOOL NOT NULL DEFAULT FALSE;