/* Replace with your SQL commands */
-- CREATE SCHEMA tmp;
-- SET search_path=tmp;

-- CREATE DOMAIN gender CHAR(1)
--     CHECK (VALUE IN ( 'M', 'F'));

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR, 
    username VARCHAR ( 50 ) UNIQUE NOT NULL,
    password VARCHAR ( 50 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    telephone TEXT,
    sex CHAR,
    -- sex tmp.gender,
    website TEXT,
    bio TEXT,
    category VARCHAR ( 20 ) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);