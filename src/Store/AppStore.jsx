import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slices/Userslice"
import Userfeeds from "./Slices/Feedslice"
import Connection from "./Slices/ConnectionSlice";
import Request from "./Slices/RequestSlice";
 const AppStore = configureStore({
    reducer:{
        User:UserReducer,
        Feeds:Userfeeds,
        Connection:Connection,
        Request:Request

    }
})
export default AppStore