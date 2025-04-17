import React from 'react'
import NavBar from './components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { addUser } from './Store/Slices/Userslice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const AppBody = () => {
  const user = useSelector((state)=>state.User)
  const dispatch = useDispatch();
  const nav = useNavigate();
  // token with relod err prevent
  const fetechuser = async () => {
    try {
      let res = await axios.get("http://localhost:5000/profile",{
        withCredentials:true,
      });
      dispatch(addUser(res.data))
    } catch (err) {
      if(err.response && err.response.status === 404){
        // 401 unauthorized
        nav("/login")
      }
      console.log(err.message)
    }
  }
  useEffect(() => {
    if(!user){
      fetechuser()
    }
  }, []);
  return (
    <div className='h-[1200px]'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default AppBody
