import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './database/db.js';

dotenv.config();
const app = express();



app.get("/", (req,res) =>{
    res.status(200)
        .json({
            "message": "Hello from server!",
        })
})
DBConnection();
app.listen(4000,(req,res)=>{
    console.log(`Server is running at PORT ${process.env.PORT}`);
})