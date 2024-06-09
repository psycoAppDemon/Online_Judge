import express from "express";
import dotenv from "dotenv";
import DBConnection from "./database/db.js";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/', router);

DBConnection();
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
