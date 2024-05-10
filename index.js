import express from "express";
import dotenv from "dotenv";
import DBConnection from "./database/db.js";
import router from "./routes/routes.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from server!",
  });
});

app.post("/register", router);
DBConnection();
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
