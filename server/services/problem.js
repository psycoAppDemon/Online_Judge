import { problem } from "../models/problem.js";

export const getProblem = async (problemId) => {
  try {
    const reqProblem = await problem.findById(problemId);
    return reqProblem;
  } catch (error) {
    throw new Error("Failed to fetch problems");
  }
};

export const getProblemTestCaseList = async (problemId) => {
  try {
    console.log(problemId);
    const reqProblem = await problem.findOne(
      { _id: problemId },
      { testcaseList: 1, _id: 0 }
    );
    console.log(reqProblem);
    return reqProblem.testcaseList;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch problem test case list");
  }
};
