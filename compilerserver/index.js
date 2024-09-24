const http = require('http');
const { generateInputFile, generateCodeFile } = require('./generateFile.js');
const { executeCPP, deleteOutputFile } = require('./runCode.js');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/run') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const { code, input } = JSON.parse(body);

        if (!code || code.trim() === '' || !input || input.trim() === '') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Code or input is missing or empty' }));
          return;
        }

        const codeFilePath = await generateCodeFile('cpp', code);
        const inputFilePath = await generateInputFile(input);
        const output = await executeCPP(codeFilePath, inputFilePath);

        fs.unlink(codeFilePath, (err) => {
          if (err) {
            console.error('Error deleting code file:', err);
          }
        });

        fs.unlink(inputFilePath, (err) => {
          if (err) {
            console.error('Error deleting input file:', err);
          }
        });

        deleteOutputFile(codeFilePath);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Success', output: output }));
      } catch (error) {
        console.error('Error:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `Compiler Server Error: ${error.message}` }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found!' }));
  }
});

server.listen(2020, () => {
  console.log('Compiler server running on port 2020');
});
