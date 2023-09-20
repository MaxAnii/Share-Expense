import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "./Offcanvas";
const Navbar = ({ user }) => {
  const navigate = useNavigate();
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
              src={user.image}
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
