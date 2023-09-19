import { useState } from "react";
const Login = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const localLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await fetch("http://localhost:5000/auth/login/local", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.status === 200) {
      props.getUser();
      window.location.reload();
    } else {
      setMessage("Invalid Credentials");
    }
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
        <button className="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
