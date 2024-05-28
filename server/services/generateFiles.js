import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid'; // rename v4 as uuid
import { fileURLToPath } from 'url';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, 'code'); // __dirname gives the path to current path

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true }); // mkdirSync
}

// const dirInputs = path.join(__dirname, 'input'); // __dirname gives the path to current path

// if (!fs.existsSync(dirInputs)) {
//   fs.mkdirSync(dirInputs, { recursive: true }); // mkdirSync
// }

export const generateCodeFile = async (language, code) => {
  const submissionId = uuid();
  const fileName = `${submissionId}.${language}`;
  const filePath = path.join(dirCodes, fileName);
  fs.writeFileSync(filePath, code); // Use async method
  return filePath;
};

// export const generateInputFile = async (input) => {
//   const inputId = uuid();
//   const fileName = `${inputId}.txt`;
//   const filePath = path.join(dirInputs, fileName);
//   console.log(filePath);
//   fs.writeFileSync(filePath, input); // Use async method
//   return filePath;
// };
