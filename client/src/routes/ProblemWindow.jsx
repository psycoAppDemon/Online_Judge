import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProblemWindow = () => {
  const { id } = useParams();

  const [problemData, setProblemData] = useState(null);
  if (id) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3050/${id}`);
          setProblemData(response.data);
        } catch (error) {
          console.error("Error fetching problem data:", error);
        }
      };
      fetchData();
    }, []);
  }

  if (!problemData && id) {
    return <div>Loading...</div>;
  }

  const { problemName, testcaseList } = problemData;

  return (
    <Grid item xs={8}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Problem Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.problemName}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Problem Statement</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.problemStatement}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Constraints</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.constraints}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Input/Output Format Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.IOformatDescription}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Input</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.input}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Output</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.output}</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{selectedProblem.category}</Typography>
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default ProblemWindow;
