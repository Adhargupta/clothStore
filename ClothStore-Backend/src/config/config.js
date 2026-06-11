import dotenv from 'dotenv';
dotenv.config();

export const OS_CONFIG = {
    port: process.env.PORT || 8000,
    corsOrigin: process.env.CORS_ORIGIN,
    dbUri: process.env.MONGODB_URI
};