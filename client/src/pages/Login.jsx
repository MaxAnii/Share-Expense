import Google from "../img/google.png";

import Github from "../img/github.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  const localLogin = async () => {
    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>

          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <form onSubmit={localLogin}>
          <div className="right">
            <input
              type="text"
              placeholder="Username"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="text"
              placeholder="Password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button className="submit">Login</button>
            <div className="signup-link">
              Don't have an account?<Link to="/signup">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
