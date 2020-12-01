import dotenv from 'dotenv';

dotenv.config();

const test = {
    ENVIRONMENT: 'test',
    DATABASE_URL: process.env.PARAKEET_TEST_DATABASE_URL,
    
}

export default test;
