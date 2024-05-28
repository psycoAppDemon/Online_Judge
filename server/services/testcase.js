import { testcase } from "../models/testcase.js";

export const getTestCase = async (testcaseId) => {
  try {
    const reqTestCase = await testcase.findById(testcaseId);
    return reqTestCase;
  } catch (error) {
    throw new Error("Failed to fetch testcases");
  }
};

export const getSampleTestCase = async (testcaseId) => {
  try {
    const reqTestCase = await testcase.findOne({
      _id: testcaseId,
      category: "sample",
    });
    return reqTestCase;
  } catch (error) {
    throw new Error("Failed to fetch testcases");
  }
};

export const getIO = async (testcaseId) => {
  try {
    const reqIO = await testcase.findOne(
      { _id: testcaseId },
      { input: 1, output: 1, _id: 0 }
    );
    return reqIO;
  } catch (error) {
    throw new Error("Failed to fetch testcases");
  }
};
