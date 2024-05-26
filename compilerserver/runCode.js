const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const dirOutput = path.join(__dirname, "output"); // __dirname gives the path to current path

if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true }); //mkdirSync
}

const executeCPP = async (codeFilePath, inputFilePath) => {
  const submissionId = path.basename(codeFilePath).split(".")[0];
  const outPath = path.join(dirOutput, `${submissionId}.out`);
  //console.log(outPath,dirOutput,submissionId);
  
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${codeFilePath} -o ${outPath} && cd ${dirOutput} && ./${submissionId}.out < ${inputFilePath}`,// .out for linux
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

const deleteOutputFile = (codeFilePath) => {
  const submissionId = path.basename(codeFilePath).split(".")[0];
  const outPath = path.join(dirOutput, `${submissionId}.exe`);
  
  fs.unlink(outPath, (err) => {
    if (err) {
      console.error("Error deleting output file:", err);
    }
  });
};

module.exports = { executeCPP, deleteOutputFile };
