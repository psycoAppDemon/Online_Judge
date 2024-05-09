const express = require("express");
const dotenv = require('dotenv').config();
const app = express();

app.get("/", (req,res) =>{
    res.status(200)
        .json({
            "message": "Hello from server!",
        })
})

app.listen(4000,(req,res)=>{
    console.log(`Server is running at PORT ${process.env.PORT}`);
})