import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const secret = fs.readFileSync(__dirname + '/private.key', 'utf-8');

const test = {
    ENVIRONMENT: 'test',
    DATABASE_URL: process.env.PARAKEET_TEST_DATABASE_URL,
    SECRET: secret,
    PORT: process.env.PORT
}

export default test;
