import Navbar from "./components/Navbar";
import "./app.css";

// import Post from "./pages/Post";
import LoginSignup from "./pages/LoginSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = useState(null);
  const getUser = () => {
    fetch("http://localhost:5000/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        console.log(response);
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
  console.log(user);
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
            element={user ? <Home user={user}></Home> : <LoginSignup />}
          />

          <Route
            path="/home"
            element={user ? <Home user={user} /> : <Landing />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
