import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("textSizeData")) || 16; 

const textSlice = createSlice({
  name: "textData",
  initialState,
  reducers: {
    fontSize: (state, action) => {
      const newSize = action.payload.value;
      localStorage.setItem("textSizeData", JSON.stringify(newSize)); 
      return newSize;  
       },
  },
});

export const textSizeSLiceAction = textSlice.actions;
export default textSlice;
