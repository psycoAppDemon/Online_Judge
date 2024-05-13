import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", signUpUser);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
