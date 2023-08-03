import { Link } from "react-router-dom";
import Offcanvas from "./Offcanvas";
const Navbar = ({ user }) => {
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
            <img src={user.image} alt="" className="avatar" />
          </li>

          <li>
            <Offcanvas></Offcanvas>
          </li>
        </ul>
      ) : (
        <Link className="link log" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
