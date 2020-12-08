import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const secret = fs.readFileSync(__dirname + '/private.key', 'utf-8') || 'tests-secret';

const development = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL,
    SECRET: secret,
    APP_URL: 'https://parakeetapi.com',
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    SENDER_EMAIL: 'okpallannaemeka@gmail.com',
    PORT: process.env.PORT
}

export default development;
