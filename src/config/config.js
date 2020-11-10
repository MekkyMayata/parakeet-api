import dotenv from 'dotenv';

dotenv.config();

const credentials = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT
}

export default credentials;