import React, {useState} from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";


const accordionHeadings = {
  problemName: "Problem Name",
  problemStatement: "Problem Statement",
  Constraints: "Constraints",
  IOformatDescription: "I/O Description",
  input: "Sample Input",
  output: "Sample Output",
  category: "Category",
};



const ProblemListItem = ({ accordionSummary, accordionDetails, handleListItemEdits, index }) => {
  const [textDetails, setTextDetails] = useState(accordionDetails);
  const { role } = useSelector((state) => state.auth);
  const handleChange = (event) => {
    console.log(accordionDetails);
    setTextDetails(event.target.value);
    if(accordionSummary=="input"|| accordionSummary=="output" || accordionSummary =="category"){
      handleListItemEdits(accordionSummary,event.target.value,index);
    }else{
      handleListItemEdits(accordionSummary,event.target.value);
    }
    
  };

  return (
    <Accordion
      defaultExpanded
      sx={{
        backgroundColor: "#2e2e2e",
        borderRadius: "8px",
        marginBottom: "8px", // Added margin to always have space between accordions
        "&:before": {
          display: "none",
        },
        "&.Mui-expanded": {
          marginBottom: "8px", // Margin when expanded
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#FFD700" }} />}
        sx={{
          backgroundColor: "#3d3d3d",
          color: "#FFD700",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          "&.Mui-expanded": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        <Typography variant="subtitle1" fontWeight="Bold">
          {accordionHeadings[accordionSummary]}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "#3d3d3d",
          color: "#f5f5f5",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        {
          role==="admin" ? (
            <TextField
              value={textDetails}
              onChange={handleChange}
              fullWidth
              multiline
              variant="outlined"
              sx={{ backgroundColor: "#f5f5f5", borderRadius: "4px" }}
            />
          ) : (
            <Typography>{accordionDetails}</Typography>
          )
        }
      </AccordionDetails>
    </Accordion>
  );
};

export default ProblemListItem;
