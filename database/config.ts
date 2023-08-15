import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_HOST = process.env.MONGO_HOST || '';
const MONGO_USER = process.env.MONGO_INITDB_ROOT_USERNAME || '';
const MONGO_PASS = process.env.MONGO_INITDB_ROOT_PASSWORD || '';

export const dbConnection = async() => {
    try {
        const url = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/cards?authSource=admin`;
        await mongoose.connect(url);

        console.log('Base de datos online');
    } catch (error) {
        throw new Error(`Error al iniciar la base de datos: ${error}`);
    }
}