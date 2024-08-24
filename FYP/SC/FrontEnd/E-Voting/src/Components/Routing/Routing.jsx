import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Home from '../Home/Home'
import User from '../User/UserDashboard'
import Signin from '../Registration/Signin'
import Signup from '../Registration/Signup'
import Result from '../Result/Result'
import VotingRegistration from '../VotingRegitration/VotingRegistration'
import VoteArea from '../VoteArea/VoteArea'
import Setting from '../Setting/Setting'
import OTP from '../OPTP/OTP'
import AdminLogin from '../Admin/Admin-Login/AdminLogin'
import Admindashboard from '../Admin/Admin-Dashboard/Admindashboard'
import AdminRegister from '../Admin/Admin-Login/AdminRegister'
import AddCandidate from '../Admin/AddCandidate/AddCandidate'
import adminSetting from '../Admin/Setting/adminSetting'
import CandidateDetails from '../Admin/CandidateDetail/CandidateDetails'
import NotFound from '../404 Not Found/NotFound'
const Routing = () => {
  return (
<>
<Routes>
<Route exact path='/' Component={Home}/>
<Route exact path='/user-dashboard/:id' Component={User}/>
<Route exact path='/signin' Component={Signin}/>
<Route exact path='/signup' Component={Signup}/>
<Route exact path='/result' Component={Result}/>
<Route exact path='/voting-registration' Component={VotingRegistration}/>
<Route exact path='/vote' Component={VoteArea}/>
<Route exact path='/setting' Component={Setting}/>
<Route exact path='/verify-otp' Component={OTP}/>
<Route exact path='/admin/admin-dashboard' Component={Admindashboard}/>
<Route exact path='/admin/admin-register' Component={AdminRegister}/>
<Route exact path='/admin/admin-login' Component={AdminLogin}/>
<Route exact path='/add-Candidate' Component={AddCandidate}/>
<Route exact path='/adminSetting' Component={adminSetting}/>
<Route exact path='/admin-dashboard/candidates' Component={CandidateDetails}/>
<Route exact path='*' Component={NotFound}/>
</Routes>
</>
  )
}

export default Routing