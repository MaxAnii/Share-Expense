import { useState } from "react";
import LoadingButton from "./LoadingButton";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const localLogin = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    setMessage("");
    const response = await fetch(
 
      `${process.env.REACT_APP_LOCALHOST}/auth/login/local`,
 
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
    const data = await response.json();
    if (data.status === 200) {
      props.setReload((prev) => !prev);
      navigate("/home");
    } else {
      setMessage("Invalid Credentials");
    }
    setShowSpinner(false);
  };
  return (
    <form onSubmit={localLogin}>
      <div className="right">
        <p style={{ color: "red" }}>{message}</p>
        <input
          className="input"
          type="email"
          placeholder="Email"
          required
          value={user.username}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          required
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {showSpinner ? (
          <LoadingButton></LoadingButton>
        ) : (
          <button className="submit">Login</button>
        )}
      </div>
    </form>
  );
};

export default Login;
