import dotenv from 'dotenv';

dotenv.config();

const production = {
    ENVIRONMENT: 'production',
    DATABASE_URL: process.env.DATABASE_URL
}

export default production;
