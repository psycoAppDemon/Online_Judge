const fs = require("fs");
const path = require("path");
//const { v4: uuid } = require('uuid'); // rename v4 as uuid

const dirCodes = path.join(__dirname, 'code'); // __dirname gives the path to current path

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true }); // mkdirSync
}

const dirInputs = path.join(__dirname, 'input'); // __dirname gives the path to current path

if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true }); // mkdirSync
}

const dirOutput = path.join(__dirname, "output"); // __dirname gives the path to current path

// if (!fs.existsSync(dirOutput)) {
//   fs.mkdirSync(dirOutput, { recursive: true }); //mkdirSync
// }

const generateCodeFile = async (language, code) => {
  const submissionId = `code_${Date.now()}.${language}`;
  const fileName = `${submissionId}.${language}`;
  const filePath = path.join(dirCodes, fileName);
  await fs.promises.writeFile(filePath, code); // use fs.promises.writeFile for async operation
  return filePath;
};

const generateInputFile = async (input) => {
  const fileName = `input_${Date.now()}.txt`;
  const filePath = path.join(dirInputs, fileName);
  await fs.promises.writeFile(filePath, input); // use fs.promises.writeFile for async operation
  return filePath;
};

// const generateOutputFile = async () => {
//   const fileName = `output_${Date.now()}.out`;
//   const filePath = path.join(dirOutput, fileName);
//   return filePath;
// };


module.exports = { generateInputFile , generateCodeFile };
