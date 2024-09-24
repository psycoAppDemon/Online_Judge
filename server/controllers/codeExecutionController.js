import { execute } from "../services/compilerConnector.js";
import { generateCodeFile } from "../services/generateFiles.js";
import { getProblemTestCaseList } from "../services/problem.js";
import { getIO } from "../services/testcase.js";
import { submission } from "../models/submission.js";
import path from "path";
import { getUser } from "../services/auth.js";
import { User } from "../models/user.js";

export const run = async (req, res) => {
  const { language = "cpp", code, input } = req.body; // default language is cpp

  if (!code) {
    return res.status(400).json({
      message: "Code is empty",
    });
  }
  try {
    const response = await execute(code, language , input);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submit = async (req, res) => {
  try {
    const reqtoken = req.cookies["token"];
    const userDetail = getUser(reqtoken);
    if (userDetail) {
      const problemId = req.body.problemId;
      const code = req.body.code;
      const language = req.body.language;
      const testcaseList = await getProblemTestCaseList(problemId);
      const codeFilePath = await generateCodeFile(language, code);
      const newsubmission = await submission.create({
        problemId,
        codefilepath: path.basename(codeFilePath),
        language,
        submissionTime: Date.now(),
        userId: userDetail._id,
        verdict: "pending",
      });
      console.log(`${newsubmission}`);
      try {
        const submissionlistResult = await User.updateOne(
          { _id: userDetail._id },
          { $push: { submission: newsubmission._id } }
        );
        console.log("Update submission list:", submissionlistResult);
      } catch (error) {
        console.error("Error updating problem:", error);
      }

      for (let i = 0; i < testcaseList.length; i++) {
        console.log("hii");
        let testcase = await getIO(testcaseList[i]);
        try {
          
          const response = await execute(code, "cpp", testcase.input);
          console.log(response);
          if (response.message === "Success") {
            if (response.output !== testcase.output) {
              try {
                const result = await submission.updateOne(
                  { _id: newsubmission._id },
                  { $set: { verdict: "Wrong Answer" } }
                );
                console.log("Update verdict:", result);
              } catch (error) {
                console.error("Error updating verdict:", error);
              }
              return res.json({
                verdict: "Failed on testcase",
                input: testcase.input,
                output: response.output,
                expected: testcase.output,
              });
            }
          }
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
      try {
        const result = await submission.updateOne(
          { _id: newsubmission._id },
          { $set: { verdict: "Accepted" } }
        );
        console.log("Update verdict:", result);
      } catch (error) {
        console.error("Error updating verdict:", error);
      }
      return res.json({
        verdict: "Accepted",
      });
    }else{
        res.status(300).json({
            message: "User not logged in"
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
