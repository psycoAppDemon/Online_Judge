import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection established!");
    }catch(error){
        console.error("DB connection failed", error.message);
    }
};

export default DBConnection;
