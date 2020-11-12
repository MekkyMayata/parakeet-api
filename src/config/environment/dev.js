import dotenv from 'dotenv';

dotenv.config();

const development = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL
}

export default development;
