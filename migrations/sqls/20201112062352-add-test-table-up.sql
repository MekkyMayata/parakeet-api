/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS testUsers (
    id SERIAL,
    name VARCHAR(255)
);

INSERT INTO testUsers (name)
    VALUES ('Alice'), ('Jenny'), ('Winston'), ('Jane');