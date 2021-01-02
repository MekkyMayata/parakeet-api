/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL,
  user_id VARCHAR(100) NOT NULL REFERENCES users (id),
  post_id VARCHAR(100) NOT NULL REFERENCES posts (post_id),
  like_value BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);
