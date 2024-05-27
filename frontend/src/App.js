import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import SendOTP from './components/SendOTP';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ShowComplaint from './components/ShowComplaint';
import AddComplaint from "./components/AddComplaint";
import ContactUs from "./components/ContactUs"
import { useState } from 'react';
import ViewProfile from './components/ViewProfile';
import AddNewUser from "./components/AddNewUser"

function App() {
  const [token, setToken] = useState("")
  const [profileDetails, setProfileDetails] = useState({})
  const [complaintData, setComplaintData] = useState()
  return (
    
    <Router>
      <Navbar setToken={setToken} setProfileDetails={setProfileDetails} />
      <Routes>
        <Route path='/' element={<Homepage token={token} profileDetails={profileDetails} complaintData={complaintData}/>}></Route>
        <Route path='/sendotp' element={<SendOTP />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/showcomplaints' element={<ShowComplaint setComplaintData={setComplaintData} />}></Route>
        <Route path='/addcomplaint' element={<AddComplaint />}></Route>
        <Route path='/contactus' element={<ContactUs />}></Route>
        <Route path='/viewprofile' element={<ViewProfile profileDetails={profileDetails} token={token}/>}></Route>
        <Route path='/addnewuser' element={<AddNewUser token={token}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
