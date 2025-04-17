import axios from 'axios';
import React from 'react'
import {BaseURL} from "../utils/Constants"
import {removeUserFeed} from "../Store/Slices/Feedslice"
import { useDispatch } from 'react-redux';
const Card = ({ feed }) => {
  const dispatch = useDispatch();
  const sendrequest = async (status,id)=>{
   try {
    const res = await axios.post(BaseURL+ "/connectionrequest" + "/" + status+"/"+id,{},{ withCredentials: true } );
    dispatch(removeUserFeed(id));
   } catch (err) {
    console.log(err);
   }
  }
    return (
        <div className="flex justify-center items-center min-h-screen bg-base-200 px-4">
        <div className="card w-full max-w-xs bg-base-100 shadow-md rounded-xl overflow-hidden relative">
          {/* Image container with name & age overlay */}
          <figure className="relative h-60 w-full flex justify-center items-center bg-gray-100">
            <img className="h-full w-full object-cover" src={feed.photo} alt="User" />
      
            {/* Overlay with name & age */}
            <div className="absolute bottom-2 left-2 bg-transparent text-black text-sm px-2 py-1 rounded">
              <h2 className="font-semibold">{feed.firstName}</h2>
              <p>Age: {feed.age}</p>
            </div>
          </figure>
      
          {/* Card content */}
          <div className="card-body p-3">
            <p className="text-xs text-base-content truncate">{feed.about}</p>
      
            {/* Buttons in a row */}
            <div className="card-actions mt-3 flex flex-row gap-2">
              <button className="btn btn-primary btn-sm flex-1" onClick={()=>sendrequest("Interested",feed._id)}>Interested</button>
              <button className="btn btn-secondary btn-sm flex-1" onClick={()=>{
                sendrequest("Igonore",feed._id)
              }}>Not Interested</button>
            </div>
          </div>
        </div>
      </div>
      
      
      
      
    )      
}

export default Card
