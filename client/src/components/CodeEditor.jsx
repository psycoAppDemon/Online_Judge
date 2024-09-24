import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ handleCode }) => {
  const code = `#include <bits/stdc++.h> 
using namespace std;
// Define the main function
int main() { 
    cout<<"Hello Muggle!";
    return 0;  
}`;
  useEffect(() => {
    handleCode(code);
  }, []);

  const handleCodeChange = (code) => {
    handleCode(code);
  };

  return (
    <div
      style={{
        border: "1px solid #FFD700",
        height: "100%",
        borderRadius: "4px",
        padding: "1px",
      }}
    >
      {" "}
      {/* Add border to the wrapping div */}
      <Editor
        height="48vh"
        width="100%"
        language="cpp"
        value={code}
        onChange={(e) => {
          handleCodeChange(e);
        }}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: "line",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
