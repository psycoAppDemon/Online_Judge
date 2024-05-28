import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

import { homeWindow } from "../controllers/homeWindowController.js";
import { practiceWindow } from "../controllers/practiceWindowController.js";
import { run, submit } from "../controllers/codeExecutionController.js";

const router = express.Router();

router.post("/register", signUpUser);
router.get("/home", homeWindow);
router.get("/problemId", practiceWindow);
router.post("/run",run);
router.post("/submit", submit);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
