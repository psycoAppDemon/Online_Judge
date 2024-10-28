import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const code = `#include <bits/stdc++.h> 
using namespace std;
// Define the main function
int main() { 
    cout<<"Hello Muggle!";
    return 0;  
}`;

  const handleCodeChange = (code) => {};

  return (
    
      <Editor
        height="60%"
        language="cpp"
        value={code}
        onChange={handleCodeChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
        }}
      />
  );
};

export default CodeEditor;
