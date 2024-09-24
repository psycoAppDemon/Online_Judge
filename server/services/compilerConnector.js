import axios from "axios";

export const execute = async (code, language, input) => {
  try {
    const response = await axios.post("http://localhost:2020/run", {
      code: code,
      input: input,
    });
    console.log(response.message);
    return response.data;
  }catch(error){
    console.log(error.message);
  }  
};
