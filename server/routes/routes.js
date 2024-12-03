import express from "express";
import {
  signUpUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";

import { homeWindow } from "../controllers/homeWindowController.js";
import { practiceWindow } from "../controllers/practiceWindowController.js";
import { run, submit } from "../controllers/codeExecutionController.js";
import { addProblem, deleteProblem, updateProblem } from "../controllers/adminController.js";
import { getSubmission } from "../controllers/userController.js";
const router = express.Router();

router.post("/register", signUpUser);
router.get("/home", homeWindow);
router.get("/submission", getSubmission);
// router.get("/home", (req,res) =>{
//   return res.send({
//     problem: 
//   });
// })
router.get("/:problemId", practiceWindow);
router.post("/run",run);
router.post("/submit", submit);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/addProblem",addProblem);
router.delete("/deleteProblem",deleteProblem);
router.put("/updateProblem", updateProblem);

export default router;
