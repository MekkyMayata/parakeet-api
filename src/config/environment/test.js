require('dotenv').config();

const test = {
    ENVIRONMENT: 'test',
    DATABASE_URL: process.env.DATABASE_URL
}

export default test;
