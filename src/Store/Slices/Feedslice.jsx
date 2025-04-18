import { createSlice } from "@reduxjs/toolkit";

const Userfeeds = createSlice({
    name:"Feeds",
    initialState:[],
    reducers:{
        addfeed:(state,action)=> {
            return action.payload;
        },
        removeUserFeed:(state,action)=>{
            const newfeed = state.filter((i)=>i._id != action.payload);
            return newfeed;
        },
        removefeed:()=>{
            return null;
        }
    }
})
export const {addfeed,removeUserFeed,removefeed} = Userfeeds.actions;
 export default Userfeeds.reducer;