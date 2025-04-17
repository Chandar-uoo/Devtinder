import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { BaseURL } from '../utils/Constants'
import {removeUser} from '../Store/Slices/Userslice'
const NavBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const logout = async () => {
    try {
      await axios.post(BaseURL + "/logout", {}, { withCredentials: true });
      console.log("Logged out successfully");
      nav("/login");
      dispatch(removeUser())
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };
  const user = useSelector((state) => state.User);
  return (
    <div>
      <div className="navbar bg-neutral text-black-50 shadow-sm">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl text-fuchsia-700">👨‍💻 Devtinder</Link>
        </div>
        {user ? (< div className="flex gap-2">
          <p className='mt-1 text-cyan-100'>{"Welcome  " + user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photo} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li><Link to={"/connection"}>connection</Link></li>
              <li><Link to={"/requests"} className="justify-between hover:bg-gray-800 rounded-md p-2">
                    Requests 
                  </Link></li>
              <li><a onClick={logout}>Logout</a></li>
            </ul>
          </div>
        </div>) : null}
      </div>
    </div>
  )
}

export default NavBar
