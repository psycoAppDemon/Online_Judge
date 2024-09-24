const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const dirOutput = path.join(__dirname, "output");

if (!fs.existsSync(dirOutput)) {
  fs.mkdirSync(dirOutput, { recursive: true });
}

const executeCPP = async (codeFilePath, inputFilePath) => {
  const submissionId = path.basename(codeFilePath).split(".")[0];
  const outPath = path.join(dirOutput, `${submissionId}.exe`); // Use .exe for Windows

  return new Promise((resolve, reject) => {
    exec(
      `g++ "${codeFilePath}" -o "${outPath}" && "${outPath}" < "${inputFilePath}"`, // Adjusted command for Windows
      (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        }
        if (stderr) {
          return reject(stderr);
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
