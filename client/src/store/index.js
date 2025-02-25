import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import colorSlice from "./colorSlice";
import textSize, { textSizeSLiceAction } from "./textSize";
import textSlice from "./textSize";

const finalStore = configureStore({
    reducer:{
        loginData:loginSlice.reducer,
        colorData:colorSlice.reducer,
        textData :textSlice.reducer
    }})










export default finalStore