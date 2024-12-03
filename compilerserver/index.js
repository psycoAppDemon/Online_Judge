const express = require("express");
const app = express();
const { generateInputFile, generateCodeFile } = require("./generateFile.js");
const { executeCPP, deleteOutputFile } = require("./runCode.js");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
// CORS setup
const corsOptions = {
  origin: `http://localhost:${process.env.CORSPORT}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/run", async (req, res) => {
  console.log("In compiler");

  try {
    const { code, input } = req.body;

    if (!code || code.trim() === "" || !input || input.trim() === "") {
      return res
        .status(200)
        .json({ message: "Code or input is missing or empty" });
    }

    // Generate code and input files
    const codeFilePath = await generateCodeFile("cpp", code);
    const inputFilePath = await generateInputFile(input);

    // Execute C++ code
    try {
      const output = await executeCPP(codeFilePath, inputFilePath);
      console.log(`${output}`);

      // Cleanup code and input files
      fs.unlink(codeFilePath, (err) => {
        if (err) console.error("Error deleting code file:", err);
      });

      fs.unlink(inputFilePath, (err) => {
        if (err) console.error("Error deleting input file:", err);
      });

      deleteOutputFile(codeFilePath);

      res.status(200).json({ message: "Success", output: output });
    } catch (executionError) {
      // Handle errors from executeCPP function
      const formattedError = handleExecutionError(
        executionError.error || executionError.stderr
      );
      console.error("]Error:", formattedError);

      // Clean up files
      fs.unlink(codeFilePath, (err) => {
        if (err) console.error("Error deleting code file:", err);
      });

      fs.unlink(inputFilePath, (err) => {
        if (err) console.error("Error deleting input file:", err);
      });

      res.status(200).json({
        message: formattedError.ErrorType,
        error: formattedError.ErrorVerdict, // Display both error and stderr
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ message: `Compiler Server Error: ${error.message}` });
  }
});

function handleExecutionError(error) {
  // Check for "maxBuffer" error (time limit exceeded)
  //console.log(error);
  if (error === 'stdout maxBuffer length exceeded') {
    return {ErrorType: "Time Limit Exceeded", ErrorVerdict: "Time Limit Exceeded"};  // Custom message
  }else{
    return formatExecutionError(error);
  }
}

function formatExecutionError(stderr) {
  // Match lines in the format: <file_path>:<line>:<column>: <error_message>
  const errorPattern = /(?:.*?)(\d+):(\d+):\s(error.*)/g;

  let formattedError = "";

  let match;
  while ((match = errorPattern.exec(stderr)) !== null) {
    // match[1] -> line number
    // match[2] -> column number
    // match[3] -> error message

    // Now we format it like: In function 'int main()': 6:13: error: 'y' was not declared in this scope
    formattedError += `In function 'int main()': ${match[1]}:${match[2]}: ${match[3]}\n`;
  }
  if(formattedError.trim()===''){
    return {ErrorType: "Runtime Error", ErrorVerdict: ''};
  }
  return {ErrorType: "Compilation Error", ErrorVerdict: formattedError.trim()};
}

app.use((req, res) => {
  res.status(404).json({ message: "Not Found!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Compiler server running on port ${process.env.PORT}`);
});
