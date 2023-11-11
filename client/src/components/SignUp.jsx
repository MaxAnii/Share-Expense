import React, { useState } from "react";

import SignupSuccess from "./SignupSuccess";
import LoadingButton from "./LoadingButton";

const SignUp = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confrimPass, setConfrimPass] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const signup = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowSpinner(true);
    if (user.password !== confrimPass) {
      setMessage("Password is not matching");
    } else if (confrimPass.length < 4) {
      setMessage("Password should be greater then 4 characters");
    } else {
      setMessage("");
 
      const res = await fetch(
        `${process.env.REACT_APP_LOCALHOST}/auth/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );
 
 
      const data = await res.json();

      if (data.status === 404) {
        setMessage(data.message);
      } else {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        setConfrimPass("");
        setShowSuccess(true);
      }
    }
    setShowSpinner(false);
  };
  return (
    <>
      <form onSubmit={signup}>
        <div className="right">
          <p className="error-message">{message}</p>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            className="input"
            type="password"
            placeholder="Confrim Password"
            value={confrimPass}
            onChange={(e) => setConfrimPass(e.target.value)}
          />
          {showSpinner ? (
            <LoadingButton></LoadingButton>
          ) : (
            <button className="submit">Sign Up</button>
          )}
        </div>
      </form>
      {showSuccess ? <SignupSuccess></SignupSuccess> : ""}
    </>
  );
};
export default SignUp;
