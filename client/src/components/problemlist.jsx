import React from "react";
import ProblemListItem from "./problemListItem.jsx";

const ProblemList = ({ problems }) => {
  return (
    <div id="problems">
      <ol>
        {problems.map((problem) => (
          <li key={problem._id}>
            <ProblemListItem
              problemName={problem.problemName}
              problemId={problem._id}
            ></ProblemListItem>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProblemList;
