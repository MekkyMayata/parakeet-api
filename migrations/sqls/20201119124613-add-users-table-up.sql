/* Replace with your SQL commands */
-- CREATE DOMAIN gender CHAR(1)
--     CHECK (VALUE IN ( 'M', 'F'));

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) NOT NULL,
    name VARCHAR, 
    username VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL,
    email VARCHAR (255) NOT NULL,
    telephone VARCHAR(15),
    gender VARCHAR(50),
    website TEXT,
    bio TEXT,
    category VARCHAR (20) NOT NULL,
    salt VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);