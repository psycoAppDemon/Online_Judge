import { problem } from "../models/problem.js";

export const problemList = async () => {
  try {
    const problems = await problem.find();
    return problems;
  } catch (error) {
    throw new Error("Failed to fetch problems");
  }
};
