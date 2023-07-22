import Navbar from "./components/Navbar";
import "./app.css";

// import Post from "./pages/Post";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    getUser();
  }, []);
  console.log(user);
  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={user ? <Home></Home> : <Landing />} />
          <Route path="/login" element={user ? <Home></Home> : <Login />} />
          {/* <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          /> */}
          <Route path="/signup" element={user ? <Home></Home> : <SignUp />} />
          <Route path="/home" element={user ? <Home /> : <Landing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
