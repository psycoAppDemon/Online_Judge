import axios from "axios";

export const execute = async (code, language, input) => {
  try {
    const response = await axios.post(process.env.COMPILER_URL, {
      code: code,
      input: input,
    });
    //console.log(`In Execution: ${JSON.stringify(response.data)}`);
    return response.data;
  }catch(error){
    //console.log(`In Execution Error: ${error}`);
    return (`Error in code execution: ${error}`);
  }  
};
