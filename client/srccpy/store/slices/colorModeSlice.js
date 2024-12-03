import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: "light"
};

const colorModeSlice = createSlice({
  name: 'color_mode',
  initialState,
  reducers: {
    toggleColorMode: (state) => {
        state.mode = state.mode === "dark"? "light": "dark";
    },
  }
});

export const { toggleColorMode } = colorModeSlice.actions;
export default colorModeSlice.reducer;
