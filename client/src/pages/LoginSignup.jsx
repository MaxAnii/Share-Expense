import Google from "../img/google.png";
import Github from "../img/github.png";
import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
const LoginSignup = (props) => {
  const [show, setShow] = useState(true);
  const google = () => {
<<<<<<< HEAD
    window.open(`${process.env.REACT_APP_LOCALHOST}/auth/google`, "_self");
  };
  const github = () => {
    window.open(`${process.env.REACT_APP_LOCALHOST}/auth/github`, "_self");
=======
    window.open(`${process.env.REACT_APP_URL}/auth/google`, "_self");
  };
  const github = () => {
    window.open(`${process.env.REACT_APP_URL}/auth/github`, "_self");
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
  };
  return (
    <div className="login">
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
        <div className="right">
          {show ? (
            <>
              <Login setReload={props.setReload}></Login>
              <div className="signup-link">
                Don't have an account?{" "}
                <button
                  className="signup-link-btn"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              <SignUp setShow={setShow}></SignUp>
              <div className="signup-link">
                Already have an account?
                <button
                  className="signup-link-btn"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
