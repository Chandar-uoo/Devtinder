import axios from 'axios';
import { React, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BaseURL} from "../utils/Constants"
import { addConnection } from "../Store/Slices/ConnectionSlice"

const Connection = () => {
    const connection = useSelector((state) => state.Connection);
    const dispatch = useDispatch();
    const connectionrequest = async () => {
        try {
            const res = await axios.get(BaseURL + "/user/connection", { withCredentials: true });
            dispatch(addConnection(res.data.pending));
        } catch (err) {
            console.log(err);

        }
    }
    useEffect(() => {
        connectionrequest();
    }, []);
    if (!connection) return;
    if (connection.length == 0)
        return (
            <>
                <h1 className="flex justify-center text-2xl my-10 text-green-300">
                    No conections found
                </h1>
            </>
        );

    return (
        <div className=" text-center my-10">
        <h1 className="font-bold text-3xl text-pink-400">Connections ({connection.length})</h1>
        {connection.map((connection) => {
          const {_id, firstName, lastName, photoURL, age, gender, about } =
            connection;
  
          return (
            <div key={_id} className="flex items-center m-2 p-2  rounded-lg bg-base-300 w-1/2 mx-auto">
              <div>
                <img
                  alt="photo"
                  className="w-14 h-14 rounded-full object-contain"
                  src={photoURL}
                />
              </div>
              <div className="text-left m-4 p-4 ">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    )
}

export default Connection
