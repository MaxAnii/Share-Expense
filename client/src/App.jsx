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
  const [updateUser, setUpdateUser] = useState(false);
  const [reload, setReload] = useState(false);
  const getUser = () => {
<<<<<<< HEAD
    fetch(`${process.env.REACT_APP_LOCALHOST}/auth/login/success`, {
=======
    fetch(`${process.env.REACT_APP_URL}/check`, {
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
      method: "GET",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
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
<<<<<<< HEAD
    if (reload) window.location.reload();
  }, [reload]);
=======
  }, []);
  console.log(user);
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} updateUser={updateUser} />
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
                <LoginSignup setReload={setReload} />
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
            element={
              user ? (
                <PersonalInformation
                  user={user}
                  setUpdateUser={setUpdateUser}
                />
              ) : (
                <Landing />
              )
            }
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
