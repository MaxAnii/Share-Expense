import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "./Offcanvas";
const Navbar = ({ user, updateUser }) => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const getUserDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCALHOST}/user/getuserdetails/${user.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status !== 400) setUserDetails(data);
    else alert("Error in fetching details");
  };
  useEffect(() => {
    if (user) getUserDetails();
  }, [user, updateUser]);
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Share Expense
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={userDetails.image || ""}
              alt=""
              className="avatar"
              onClick={() => navigate("/home/personalinformation")}
            />
          </li>

          <Offcanvas></Offcanvas>
        </ul>
      ) : (
        <Link className="link login-link" to="login">
          Sign Up / Log In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
