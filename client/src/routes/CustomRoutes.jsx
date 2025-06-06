import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Login from '../forms/Login'
import Signup from '../forms/signup'
import ViewProfile from '../pages/ViewProfile'
import EditProfile from '../pages/EditProfile'
import Feed from '../pages/Feed'
import Developers from '../pages/Developers'
import AdminDashBoard from '../pages/AdminDashBoard'

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/user" element={<ViewProfile />} />
      <Route path="/user/update" element={<EditProfile />} />
      <Route path="/posts" element={<Feed />} />
      <Route path="/developers" element={< Developers />} />

      <Route path="/admin/dashboard" element={<AdminDashBoard />} />



    </Routes>
  )
}

export default CustomRoutes