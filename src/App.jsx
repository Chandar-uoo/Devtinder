import React from 'react'
import { Route, Routes} from 'react-router-dom'
import AppBody from './AppBody'
import Login from './components/Login'
import Feed from './components/Feed'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Connection from './components/Connection'
import Requests from './components/Requests'
import SignUp from './components/SignUp'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AppBody />}>
          <Route path='/' element={<Feed />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/Editprofile' element={<EditProfile />} />
          <Route path='/connection' element={< Connection/>} />
          <Route path='/requests' element={< Requests/>} />
          <Route path='/SignUp' element={< SignUp/>} />
        </Route>
       
      </Routes>
    </div>
  )
}

export default App
