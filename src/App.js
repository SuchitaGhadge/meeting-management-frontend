import React, { useEffect } from "react"
import './App.css';
import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom"
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Meetings from "./components/meeting/Meetings";
import AddMeeting from "./components/meeting/AddMeeting";
import MeetingId from "./components/meeting/MeetingId";
function App() {
  const getApp = async () => {
    const data = await axios.get("/api/notes", {
      email:"suchi@me.com",
      password: "123456"
    })
    console.log(data)
  }

  // useEffect(() => {
  //   getApp()
  // }, [])
  return (
    <BrowserRouter>
      <main>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/meetings' element={<Meetings />} >
          <Route path=":/meetingid" element={<MeetingId />} />
          <Route path="addmeeting" element={<AddMeeting />} />
        </Route>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
