import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import SignOut from '../pages/SignOut'
import Conf from '../pages/Conf'
import TestDebug from '../pages/TesteDebug'
import Profile from '../pages/profile/profile';
import ComingSoon from '../pages/ComingSoon';
import TokenFetcher from '../pages/profile/test'
import ProtectedRoute from '../services/ProtectedRoute';
import MatrixPage from '../pages/matrix/MatrixPage';
import ListeMatrix from '../pages/listmatrix/ListeMatrix';
import EditMatrix from '../pages/listmatrix/EditMatrix';
// import GetAllUsers from '../pages/alluser';
import '../App.css'

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestDebug />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:dom/:code" element={<Register />} />
        <Route path="/" element={<Register />} />
        {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />  */}
        <Route path="/dashboard" element={<Dashboard />}/> 
        <Route path="/matrix-list" element={<ListeMatrix />}/> 
        <Route path="/matrices/:id/edit" element={<EditMatrix />}/>
        <Route path="/matrix" element={<MatrixPage />}/> 
        <Route path="/signout" element={<ProtectedRoute element={<SignOut />} />} /> 
        <Route path="/conf" element={<ProtectedRoute element={<Conf />} />} /> 
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/TokenFetcher" element={<ProtectedRoute element={<TokenFetcher />} />} /> 
        <Route path="/coming/:planet" element={<ProtectedRoute element={<ComingSoon />} />} />
        <Route path="/*" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default AppRoute;
