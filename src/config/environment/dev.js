require('dotenv').config();

const development = {
    ENVIRONMENT: 'development',
    DATABASE_URL: process.env.DATABASE_URL
}

export default development;
