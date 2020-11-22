/* Replace with your SQL commands */
-- CREATE DOMAIN gender CHAR(1)
--     CHECK (VALUE IN ( 'M', 'F'));

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) NOT NULL PRIMARY KEY,
    name VARCHAR, 
    username VARCHAR ( 50 ) UNIQUE NOT NULL,
    password VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    telephone TEXT,
    gender CHAR,
    website TEXT,
    bio TEXT,
    category VARCHAR ( 20 ) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    unique (id)
);