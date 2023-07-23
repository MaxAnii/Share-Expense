import React from "react";
const SignUp = () => {
  return (
    <div className="right">
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confrim Password" />
      <button className="submit">Sign Up</button>
    </div>
  );
};
export default SignUp;
