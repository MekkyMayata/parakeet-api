/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS user_followers (
    user_follower_id SERIAL,
    user_id VARCHAR(100),
    follower_id VARCHAR(100),
    PRIMARY KEY (user_follower_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (follower_id) REFERENCES users(id)
);