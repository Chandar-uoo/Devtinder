import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import {addUser} from "../Store/Slices/Userslice"
import { BaseURL } from '../utils/Constants';
const EditProfile = () => {
  const user = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const[error,seterror] = useState("");

  // Wait for user to load, then set state
  useEffect(() => {
    if (user) {
      setFirstname(user.firstName || "");
      setLastName(user.lastName || "");
      setPhoto(user.photo || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
    }
  }, [user]);

  if (!user) return <p className="p-8">Loading...</p>;
  
  const saveProfile = async () => {
    try {
      seterror("");
      const res = await axios.patch(BaseURL+"/profile/update",{firstName,lastName,photo,age,gender,about,skills},{withCredentials:true});
      console.log(res.data)
      dispatch(addUser(res.data));
    } catch (err) {
      seterror(err.response.data);
    
    }
    
  }

  return (

    user && (<div className="min-h-screen flex justify-center items-start p-6 bg-base-200">
      <form
        /* onSubmit={handleSubmit} */
        className="flex flex-col md:flex-row bg-neutral text-white-content w-full max-w-4xl rounded-lg shadow-lg overflow-hidden"
      >
        {/* Left side - profile image */}
        <div className="md:w-1/3 flex flex-col items-center justify-start p-6 bg-base-100">
        {photo ? (
  <img
    src={photo}
    alt="User Avatar"
    className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-4"
  />
) : (
  <div className="w-32 h-32 rounded-full border-4 border-blue-500 bg-gray-300 mb-4 flex items-center justify-center text-sm text-gray-600">
    No Image
  </div>
)}

          <div className="w-full">
            <label className="block text-sm mb-1">Photo URL</label>
            <input
              type="text"
              name="photo"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
        </div>

        {/* Right side - form fields */}
        <div className="md:w-2/3 p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                className="input input-bordered w-full text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Gender</label>
              <input
                type="text"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-full text-white"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">About</label>
            <textarea
              name="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value.split(","))}
              className="input input-bordered w-full text-white"
            />
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <button
            type="button"
            className="btn bg-blue-600 hover:bg-blue-700 text-white mt-4 w-full"
            onClick={saveProfile}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>)
    
  )
}

export default EditProfile
