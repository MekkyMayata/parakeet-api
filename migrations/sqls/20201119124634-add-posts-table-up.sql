/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS posts (
    post_id VARCHAR(100) NOT NULL,
    user_id VARCHAR(100) NOT NULL REFERENCES users (id),
    post_path TEXT NOT NULL,
    post_caption TEXT,
    post_latitude NUMERIC,
    post_longitude NUMERIC,
    post_date TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (post_id)
);