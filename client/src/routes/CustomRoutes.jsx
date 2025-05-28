import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../forms/Login'
import Signup from '../forms/signup'
import ViewProfile from '../pages/ViewProfile'
import EditProfile from '../pages/EditProfile'

const CustomRoutes = () => {
  return (
    <Routes>
        <Route path = "/" element = { <HomePage />} />
        <Route path = "/signin" element = { <Login />} />
        <Route path = "/signup" element = { <Signup />} />
        <Route path = "/user" element = { <ViewProfile />} />
        <Route path="/user/update" element = { <EditProfile /> } />
    </Routes>
  )
}

export default CustomRoutes