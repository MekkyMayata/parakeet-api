import dotenv from 'dotenv';
import fs from 'fs';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';

dotenv.config();

const secret = fs.readFileSync(__dirname + '/private.key', 'utf-8');

const development = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL,
    SECRET: secret,
    PORT: process.env.PORT
}

export default development;
