const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const dirOutput = path.join(__dirname, "output");

if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true });
}

const executeCPP = async (codeFilePath, inputFilePath) => {
  console.log("Executing code");
  const submissionId = path.basename(codeFilePath).split(".")[0];
  const outputFileNme = `${submissionId}.exe`;
  const outPath = path.join(dirOutput, outputFileNme); // Use .exe for Windows
  //console.log(outPath, codeFilePath, inputFilePath);
  return new Promise((resolve, reject) => {
    exec(
      //`g++ ${codeFilePath} -o ${outPath} && cd ${outPath} && ..\\${inputFilePath}`, // Adjusted command for Windows
      `g++ ${codeFilePath} -o ${outPath} && cd ${dirOutput} && .\\${outputFileNme} < ${inputFilePath}`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("Execution Error:", err);
          return reject({ error: err.message, stderr });
        }
        if (stderr) {
          console.error("Standard Error Output:", stderr);
          return reject({ error: "Compilation Error", stderr });
        }
        resolve(stdout);
      }
    );
  });
};

const deleteOutputFile = (codeFilePath) => {
  const submissionId = path.basename(codeFilePath).split(".")[0];
  const outPath = path.join(dirOutput, `${submissionId}.exe`);

  try {
    fs.unlink(outPath, (err) => {
      if (err) {
        console.error("Error deleting output file:", err);
      }
    });
  } catch (err) {
    console.error("Output file doesn't exist:", err);
  }
};

module.exports = { executeCPP, deleteOutputFile };
