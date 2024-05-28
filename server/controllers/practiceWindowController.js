import { getProblem } from "../services/problem.js";
import { getTestCase } from "../services/testcase.js";

export const practiceWindow = async (req,res) =>{
    try {
        const  problemId  = req.body.problemId;
        let problem = await getProblem(problemId);
        problem = problem.toObject(); // Convert to a regular object
        let testcaseList = [];
        for(let i = 0; i < problem.testcaseList.length; i++) {
            let testcase = await getTestCase(problem.testcaseList[i]);
            testcase = testcase.toObject(); // Convert to a regular object
            delete testcase._id;
            delete testcase.problemId;
            testcaseList.push(testcase);
        }
        delete problem.testcaseList;
        return res.status(200).json({ 
            problem,
            testcaseList
         });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
};
