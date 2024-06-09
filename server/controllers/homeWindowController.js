import { problemList } from '../services/problemList.js';
import { getUser } from '../services/auth.js';

export const homeWindow = async (req, res) => {
  let loginStatus;
  try{
    const reqtoken = req.cookies["token"];
    loginStatus = getUser(reqtoken);
  }catch(error){
    console.error("Error in vrifying token in home window");
  }


  try {
    const problems = await problemList(); // Ensure the result is awaited
    const responseData = problems.map(({ _id, problemName }) => ({ _id, problemName }));
    //console.log(responseData);
    return res.status(200).json({ responseData,
      loginStatus
     });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
