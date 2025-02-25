import { createSlice } from "@reduxjs/toolkit";

const colorData = JSON.parse(localStorage.getItem("colordata")) || {
  textColor: 'black',
  modeColor: 'white',
};

const colorSlice = createSlice({
  name: "colorData",
  initialState: colorData,
  reducers: {
    backgroundColor: (state, action) => {

    
        state.modeColor = action.payload;
      localStorage.setItem("colordata", JSON.stringify(state));
    },
    textColor: (state, action) => {
      console.log(action.payload)
      
      state.textColor = action.payload;
      localStorage.setItem("colordata", JSON.stringify(state));
    },
  },
});

export const colorSliceAction = colorSlice.actions;
export default colorSlice;
