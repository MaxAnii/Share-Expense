import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Offcanvas = () => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };
  const Navigate = useNavigate();
  return (
    <>
      <button
        className="btn burger"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="35"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <ul className="menu">
              <li
                className="menu-item"
                onClick={() => Navigate("/home")}
                data-bs-dismiss="offcanvas"
              >
                Home
              </li>
              <li
                className="menu-item"
                onClick={() => Navigate("/home/roomrequest")}
                data-bs-dismiss="offcanvas"
              >
                Room Request
              </li>
            </ul>
          </div>
          <li className="listItem log">
            <button className="offcanvas-footer" onClick={logout}>
              Logout
            </button>
          </li>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Offcanvas;
