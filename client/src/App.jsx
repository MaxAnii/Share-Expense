import Navbar from "./components/Navbar";
import "./app.css";
import LoginSignup from "./pages/LoginSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Room from "./pages/Room";
import RoomRequest from "./pages/RoomRequest";
import NoteData from "./pages/NoteData";
import PersonalInformation from "./pages/PersonalInformation";

const App = () => {
  const [user, setUser] = useState(null);
  const getUser = () => {
    fetch(`${process.env.REACT_APP_URL}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route
            path="/"
            element={user ? <Home user={user}> </Home> : <Landing />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Home user={user}></Home>
              ) : (
                <LoginSignup getUser={getUser} />
              )
            }
          />

          <Route
            path="/home"
            element={user ? <Home user={user} /> : <Landing />}
          />
          <Route
            path="/room/:roomname/:roomid/:roomadminid"
            element={user ? <Room user={user} /> : <Landing />}
          />
          <Route
            path="/home/roomrequest"
            element={user ? <RoomRequest user={user} /> : <Landing />}
          />
          <Route
            path="/home/personalinformation"
            element={user ? <PersonalInformation user={user} /> : <Landing />}
          />
          <Route
            path="/room/:roomid/:roomadminid/notedata/:noteid/:usernoteid/:notename"
            element={user ? <NoteData user={user} /> : <Landing />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
