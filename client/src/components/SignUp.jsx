import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confrimPass, setConfrimPass] = useState("");
  const [message, setMessage] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    setMessage("");
    if (user.password != confrimPass) {
      setMessage("Password is not matching");
    } else if (confrimPass.length < 4) {
      setMessage("Password should be greater then 4 characters");
      console.log("calling");
    } else {
      setMessage("");
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (data.status == 404) {
        setMessage(data.message);
      } else {
        navigate("/home");
      }
    }
  };
  return (
    <form onSubmit={signup}>
      <div className="right">
        <p className="error-message">{message}</p>
        <input
          type="text"
          placeholder="Username"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confrim Password"
          value={confrimPass}
          onChange={(e) => setConfrimPass(e.target.value)}
        />
        <button className="submit">Sign Up</button>
      </div>
    </form>
  );
};
export default SignUp;
