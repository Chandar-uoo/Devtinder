import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
    name:"requests",
    initialState:null,
    reducers:{
        addrequests:(state,action)=>{
            return action.payload;
        },
        removerequests:()=>{
            return null;
        }
    }
})
export const {addrequests,removerequests} = requests.actions;
 export default requests.reducer;