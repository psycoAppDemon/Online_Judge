import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import colorModeSlice from "./slices/colorModeSlice.js";
import problemSlice from "./slices/problemSlice.js";
import currentProblemSlice from "./slices/currentProblemSlice.js"
import runCodeSlice from "./slices/runCodeSlice.js"
import submitCodeSlice from "./slices/submitCodeSlice.js"

const store = configureStore({
  reducer: {
    auth: authSlice,
    color_mode: colorModeSlice,
    problem: problemSlice,
    currentProblem: currentProblemSlice,
    runCode: runCodeSlice,
    submitCode: submitCodeSlice
  },
});

export default store;
