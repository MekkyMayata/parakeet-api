import dotenv from 'dotenv';
import fs from 'fs';

const privateKey = fs.readFileSync(__dirname + '/private.key', 'utf-8');
const publicKey = fs.readFileSync(__dirname + '/public.key', 'utf-8');

dotenv.config();

const credentials = {
    ENVIRONMENT: 'development',
    PRIVATEKEY: privateKey,
    PUBLICKEY: publicKey,
    DATABASE_URL: process.env.DATABASE_URL,
    PARAKEET_TEST_DATABASE_URL: process.env.PARAKEET_TEST_DATABASE_URL,
    PARAKEET_DEV_DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL,
    PORT: process.env.PORT,
}

export default credentials;