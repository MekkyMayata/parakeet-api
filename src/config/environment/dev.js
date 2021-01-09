import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

let secret = ''
let publicKey = ''

const checker = () => {
    if (!(fs.existsSync(__dirname + '/private.key'))) {
        secret = fs.readFileSync(__dirname + '/test_privates.key', 'utf-8');
        publicKey = fs.readFileSync(__dirname + '/test_publics.key', 'utf-8');

    }
    else {
        secret = fs.readFileSync(__dirname + '/private.key', 'utf-8');
        publicKey = fs.readFileSync(__dirname + '/public.key', 'utf-8');
    }
    return {
        secret_key: secret,
        public_key: publicKey
    }
}

const checkerResult = checker();

const development = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL,
    SECRET: checkerResult.secret_key,
    PUBLICKEY: checkerResult.public_key,
    APP_URL: 'https://parakeetapi.com',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    SENDER_EMAIL: 'okpallannaemeka@gmail.com',
    PORT: process.env.PORT
}

export default development;
