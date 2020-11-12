/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    name VARCHAR(255)
);

INSERT INTO users (name)
    VALUES ('Alice'), ('Jenny'), ('Winston'), ('Jane');