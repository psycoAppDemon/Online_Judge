import { getUser } from "../services/auth.js";
import { problem } from "../models/problem.js";
import { testcase } from "../models/testcase.js";
import mongoose from "mongoose";
export const addProblem = async (req, res) => {
  try {
    const reqtoken = req.cookies["token"];
    const userDetail = getUser(reqtoken);
    if (userDetail) {
      if (userDetail.role !== "admin") {
        return res.status(400).json({
          message: "Only admins have the access for this",
        });
      }
      const {
        problemName,
        problemStatement,
        constraints,
        IOformatDescription,
        testcaseList
      } = req.body;
      
      // Log the received values for debugging
      console.log("Received problemName:", problemName);
      console.log("Received problemStatement:", problemStatement);
      console.log("Received constraints:", constraints);
      console.log("Received IOformatDescription:", IOformatDescription);
      console.log("Received testcaseList:", testcaseList);
      
      if (
        !problemName ||
        !problemStatement ||
        !constraints ||
        !IOformatDescription ||
        !testcaseList 
      ) {
        return res.status(400).json({
          message: "Some parameters are empty",
          problemName, problemStatement, constraints, IOformatDescription, testcaseList
        });
      }
      
      for (let i = 0; i <testcaseList.length; i++) {
        const currentTestcase = testcaseList[i];
        if (!currentTestcase.input || !currentTestcase.output) {
          return res.status(400).json({
            message: "Some parameters are empty"
          });
        }
        if (
          !(
            currentTestcase.category === "sample" ||
            currentTestcase.category === "hidden"
          )
        ) {
          return res.status(400).json({
            message: "Testcase category must be 'sample' or 'hidden'"
          }
          );
        }
      }

      // Proceed with the rest of your logic
      
      const newProblem = await problem.create({
        problemName,
        problemStatement,
        constraints,
        IOformatDescription,
        testcaseList: [],
      });

      // Create test cases in the database
      const createdTestcases = await Promise.all(
        testcaseList.map((tc) =>
          testcase.create({
            problemId: newProblem._id,
            input: tc.input,
            output: tc.output,
            category: tc.category ? tc.category : "sample",
          })
        )
      );
      const testcaseIds = createdTestcases.map((tc) => tc._id);
      const testCaseUpdateResult = await problem.updateOne(
        { _id: newProblem._id },
        { testcaseList: testcaseIds }
      );

      console.log(`${testCaseUpdateResult}`);

      return res.status(200).json({
        verdict: "Problem added successfully!",
      });
    } else {
      res.status(300).json({
        message: "User not logged in",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    const reqtoken = req.cookies["token"];
    const userDetail = getUser(reqtoken);
    if (userDetail) {
      if (userDetail.role !== "admin") {
        return res.status(400).json({
          message: "Only admins have the access for this",
        });
      }

      try {
        const problemId = req.body.problemId;
        const isValidId = mongoose.Types.ObjectId.isValid(problemId);
        if (!isValidId) {
          return res.status(300).json({
            message: "Invalid problem ID",
          });
        }
        const result = await problem.deleteOne({ _id: problemId });
        if (result.deletedCount === 0) {
          return res.status(300).json({
            message: "Problem not found or already deleted",
          });
        }
        return res.status(300).json({
          message: "Problem successfully deleted",
        });
      } catch (error) {
        console.error("Error deleting problem:", error);
        return res.status(300).json({
          message: "An error occurred while deleting the problem",
        });
      }
    } else {
      console.log(reqtoken);
      res.status(300).json({
        message: "User not logged in",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProblem = async (req, res) => {
  try {
    const reqtoken = req.cookies["token"];
    const userDetail = getUser(reqtoken);
    if (userDetail) {
      if (userDetail.role !== "admin") {
        return res.status(400).json({
          message: "Only admins have the access for this",
        });
      }
      const {
        problemName,
        problemStatement,
        constraints,
        IOformatDescription,
        testcaseList,
        problemId
      } = req.body;
      console.log(`${problemName} ${problemStatement} ${constraints} ${IOformatDescription} ${testcaseList} ${problemId}`)
      if (
        !problemName ||
        !problemStatement ||
        !constraints ||
        !IOformatDescription ||
        !testcaseList ||
        !problemId
      ) {
        return res.status(400).json({
          message: "Some parameters are empty",
        });
      }
      
      const result = await deleteTestcase(problemId);
      if(result===0){
        return res.status(404).json({
          message: "Error in deleting TCs"
        });
      }
      // Create test cases in the database
      const createdTestcases = await Promise.all(
        testcaseList.map((tc) =>
          testcase.create({
            problemId: problemId,
            input: tc.input,
            output: tc.output,
            category: tc.category ? tc.category : "sample",
          })
        )
      );
      console.log(createdTestcases);
      const testcaseIds = createdTestcases.map((tc) => tc._id);
      const testCaseUpdateResult = await problem.updateOne(
        { _id: problemId },
        { testcaseList: testcaseIds }
      );
      const updateFields = {
        problemName,
        problemStatement,
        constraints,
        IOformatDescription,
        testCaseUpdateResult
      };
      try {
        const result = await problem.updateOne(
          { _id: problemId },
          { $set: updateFields }
        );
        console.log("Update result:", result);
      } catch (err) {
        console.error("Error updating problem:", err);
      }

      console.log(`${testCaseUpdateResult}`);

      return res.status(200).json({
        verdict: "Problem added successfully!",
      });
    } else {
      res.status(300).json({
        message: "User not logged in",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

async function deleteTestcase (problemId) {
  try {
    const problemToBeDeleted = await problem.findById(problemId);
    console.log('Problem Title:', problemToBeDeleted.testcaseList);
    let deleteCount = 0;
    if(problemToBeDeleted.testcaseList.length==0)return 1;
    await Promise.all(
      problemToBeDeleted.testcaseList.map(async (testcaseId) => {
        const deleteResult = await testcase.findByIdAndDelete(testcaseId);
        if (deleteResult) {
          deleteCount++;
        }
      })
    );
    if (deleteCount === 0) {
      return 0;
    }
    return 1;   
  } catch (error) {
    console.error("Error deleting problem:", error);
    return 0;
  }
};
