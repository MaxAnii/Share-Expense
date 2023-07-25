import { Link } from "react-router-dom";
// const logo = "./i"
const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
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
          <li className="listItem log" onClick={logout}>
            Logout
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
