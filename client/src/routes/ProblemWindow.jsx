import { useParams } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProblemWindow = () => {
  const { id } = useParams();

  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3050/${id}`);
        setProblemData(response.data);
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };

    fetchData();
  }, []);

  if (!problemData) {
    return <div>Loading...</div>;
  }

  const { problemName, testcaseList } = problemData;

  return (
    <div>
      <h1>{problemName}</h1>
      <h2>Test Cases:</h2>
      <ul>
        {testcaseList.map((testcase, index) => (
          <li key={index}>
            <h3>Test Case {index + 1}</h3>
            <p>Input: {testcase.input}</p>
            <p>Output: {testcase.output}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProblemWindow;
