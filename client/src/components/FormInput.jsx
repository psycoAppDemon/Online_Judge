import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

const ErrorMessage = styled("span")(({ theme }) => ({
  color: "red",
  fontStyle: "italic",
  marginTop: theme.spacing(1),
}));

//let isPlaceHolderSet = false;

const FormInput = ({
  inputState,
  onInputChangeHandler,
  inputValues,
  placeHolderDummy,
  validateInputs,
}) => {
  const [staticPlaceHolder, setStaticPlaceHolder] = useState("");
  const [staticType, setStaticType] = useState("text");
  const [staticId, setStaticId] = useState("text");
  const [isValid, setIsValid] = useState(true);
  useEffect(() => {
    setStaticPlaceHolder(inputValues[inputState].placeHolder);
    setStaticType(inputValues[inputState].type);
    setStaticId(inputValues[inputState].id);
  }, [placeHolderDummy]);

  const handleChange = (e) => {
    const value = e.target.value;
    onInputChangeHandler(e);
    setIsValid(validateInputs[staticId](value));
  };

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space input
    }
  };

  return (
    <Grid item xs={12} sm={staticId == "password" ? 0 : 6}>
      <TextField
        required
        fullWidth
        name={inputState}
        label={staticPlaceHolder}
        id={staticId}
        type={staticType}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          handleChange(e);
        }}
        error={!isValid}
        helperText={
          !isValid ? (
            <span className={ErrorMessage}>This field is not valid</span>
          ) : (
            ""
          )
        }
      />
    </Grid>
  );
};

export default FormInput;
