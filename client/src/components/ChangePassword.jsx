import React, { useState } from "react";
const ChangePassword = (props) => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confrimPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showConfrim, setShowConfrim] = useState(true);
  const changePassword = async () => {
    setMessage("");
    if (
      password.oldPassword.length == 0 ||
      password.newPassword.length == 0 ||
      password.confrimPassword.length == 0
    ) {
      setMessage("Please fil the details");
    } else if (password.confrimPassword !== password.newPassword) {
      setMessage("Password is not matching");
    } else if (password.oldPassword !== props.oldPassword) {
      setMessage("Password is incorrect");
    } else {
      const response = await fetch(
        "http://localhost:5000/user/updatepassword",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: props.id,
            newPassword: password.newPassword,
          }),
        }
      );
      if (response.status == 200) {
        setMessage("Password Changed");
        setPassword({
          ...password,
          oldPassword: "",
          newPassword: "",
          confrimPassword: "",
        });
        setShowConfrim(false);
      } else setMessage("An error has occurred");
    }
  };
  return (
    <div>
      <button
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className="change-password"
      >
        Change Password
      </button>
      <div
        className="modal fade "
        id="staticBackdrop"
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
                Change Password
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setPassword({
                    ...password,
                    oldPassword: "",
                    newPassword: "",
                    confrimPassword: "",
                  });
                  setShowConfrim(true);
                  setMessage("");
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="*******"
                  value={password.oldPassword}
                  onChange={(e) => {
                    setPassword({ ...password, oldPassword: e.target.value });
                  }}
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="*******"
                  value={password.newPassword}
                  onChange={(e) => {
                    setPassword({ ...password, newPassword: e.target.value });
                  }}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Confrim Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="*******"
                  value={password.confrimPassword}
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      confrimPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <p className="error-message"> {message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setPassword({
                    ...password,
                    oldPassword: "",
                    newPassword: "",
                    confrimPassword: "",
                  });
                  setShowConfrim(true);
                  setMessage("");
                }}
              >
                Close
              </button>
              {showConfrim ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={changePassword}
                >
                  Confrim
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
