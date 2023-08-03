import React, { useState } from "react";

const AddMember = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const searchMember = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await fetch(
      `http://localhost:5000/user/getmember/${username}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.status === 400) {
      setMessage("No such user exists");
    } else {
      setUserDetails(data);
      setUsername("");
    }
  };
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        className="bi bi-plus-circle-fill btn btn-dark add-member"
        viewBox="0 0 16 16"
        data-bs-toggle="modal"
        data-bs-target="#addmember"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </svg>
      <div
        className="modal fade "
        id="addmember"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Add Member
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setMessage("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={searchMember}>
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  User Name
                </label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by username"
                    value={username || ""}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <button
                    type="submit"
                    class="input-group-text"
                    id="basic-addon1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              <p className="error-message"> {message}</p>
              <div className="overflow-table">
                <table class="table">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {userDetails.map((elem) => {
                      return (
                        <>
                          <tr>
                            <td className="user-info">
                              <img
                                src={elem.image}
                                alt="user-image"
                                className="avatar"
                              />
                              <span className="member-name"> {elem.name}</span>
                            </td>

                            <td>
                              <button className="add-btn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="50"
                                  fill="currentColor"
                                  class="bi bi-person-plus-fill"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                  <path
                                    fill-rule="evenodd"
                                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                          <div className="row-gap"></div>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setMessage("");
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMember;
