import dotenv from 'dotenv';

dotenv.config();

const baseConfig = {
    mongoUri: process.env.MONGO_URI,
    port: process.env.PORT,
    jwtSecret: process.env.JWT_SECRET,
};

export { baseConfig };