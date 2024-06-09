import React from "react";
import { Link } from "react-router-dom";

const ProblemListItem = ({ problemName, problemId }) => {
  return (
    <nav>
      <Link to={`/problems/${problemId}`}>{problemName}</Link>
    </nav>
  );
};

export default ProblemListItem;
