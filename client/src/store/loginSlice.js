import {createSlice} from "@reduxjs/toolkit" 

const auth = JSON.parse(localStorage.getItem("diary_Login_User"))  ||  {user: null  , token : "" }

const loginSlice = createSlice( {
name: "loginData",
initialState:auth ,

reducers:{

    login : (state ,action )=>{
state.user = action.payload.user
state.token = action.payload.token
return localStorage.setItem("diary_Login_User"  ,  JSON.stringify(state))
},
logout: (state,action)=> {
    state.user= null  
    state.token = ""
    return localStorage.setItem("diary_Login_User"  ,  JSON.stringify(state) )
 }

}  
}


)

export const loginSliceAction = loginSlice.actions 
export default  loginSlice