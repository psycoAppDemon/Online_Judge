import { getProblem } from "../services/problem.js";
import { getTestCase } from "../services/testcase.js";

export const practiceWindow = async (req,res) =>{
    console.log("Fetching data in server");
    try {
        const  problemId  = req.params.problemId;
        //console.log(problemId);
        let problem = await getProblem(problemId);
        problem = problem.toObject(); // Convert to a regular object
        let testcaseList = [];
        for(let i = 0; i < problem.testcaseList.length; i++) {
            let testcase = await getTestCase(problem.testcaseList[i]);
            testcase = testcase.toObject(); // Convert to a regular object
            delete testcase._id;
            delete testcase.problemId;
            delete testcase.category;
            testcaseList.push(testcase);
        }
        delete problem.testcaseList;
        return res.status(200).json({ 
            problemName:problem.problemName,
            problemStatement: problem.problemStatement,
            IOformatDescription: problem.IOformatDescription,
            Constraints: problem.constraints,
            testcaseList
         }); 
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
};
