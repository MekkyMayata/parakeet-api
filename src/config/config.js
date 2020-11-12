import dotenv from 'dotenv';

dotenv.config();

const credentials = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    PARAKEET_TEST_DATABASE_URL: process.env.PARAKEET_TEST_DATABASE_URL,
    PARAKEET_DEV_DATABASE_URL: process.env.PARAKEET_DEV_DATABASE_URL,
    PORT: process.env.PORT
}

export default credentials;