import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ setCode }) => {
  const code = `#include <bits/stdc++.h> 
using namespace std;
// Define the main function
int main() { 
    cout<<"Hello Muggle!";
    return 0;  
}`;

  useEffect(()=>{
    setCode(code);
  },[]);

  const handleCodeChange = (code) => {
    setCode(code);
  };

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: 1,
        overflow: "hidden",
        py: 1,
        marginTop:1,
        backgroundColor: "#1E1E1E",
      }}
    >
      <Editor
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
    </Box>
  );
};

export default CodeEditor;
