import React, {useState} from 'react'
import Navbar from './Components/Navbar'
import Home from './Components/Home';
import NoteState from './context/notes/NoteState.js'
import Alert from './Components/Alert';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp';


const App = () => {

  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
}
  const [alert, setAlert] = useState(null)

  return (
    <>
      <NoteState>

      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>

        <Route path="/" element={<Home showAlert={showAlert}/>} />
        <Route path="/login" element={<Login showAlert={showAlert}/>} />
        <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />

        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  )
}

export default App
