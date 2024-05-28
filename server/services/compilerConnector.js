import axios from "axios";

export const execute = async (code, language, input) => {
  try {
    const response = await axios.post("http://127.0.0.1:2020/run", {
      code: code,
      input: input,
    });
    //console.log(response);
    return response.data;
  }catch(error){
    console.log(error.message);
  }  
};
