/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS user_followers (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users (id),
    follower_id INT NOT NULL REFERENCES users (id)
);