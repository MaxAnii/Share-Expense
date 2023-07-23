import { useState } from "react";
const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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
      </div>
    </form>
  );
};

export default Login;
