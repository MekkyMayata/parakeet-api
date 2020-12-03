import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const secret = fs.readFileSync(__dirname + '/private.key', 'utf-8');

const production = {
    ENVIRONMENT: 'production',
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET: secret,
    PORT: process.env.PORT
}

export default production;
