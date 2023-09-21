import React, { useEffect, useState } from "react";
import ChangePassword from "../components/ChangePassword";
const PersonalInformation = ({ user }) => {
  const [userDetails, setUserDetails] = useState({});
  const [readOnly, setReadOnly] = useState(true);
  const getUserDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/user/getuserdetails/${user.id}`,
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
  const updateDetails = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/user/updatedetails`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(userDetails),
      }
    );
    const data = await response.json();
    getUserDetails();
    alert(data.message);
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="form-container">
        {readOnly ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-pencil btn btn-dark edit-details"
            viewBox="0 0 16 16"
            onClick={() => {
              setReadOnly(false);
            }}
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-check2-all btn btn-success edit-details"
            viewBox="0 0 16 16"
            onClick={() => {
              updateDetails();
              setReadOnly(true);
            }}
          >
            <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
            <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
          </svg>
        )}

        <div className="basic-information">
          <div className="user-avatar-container">
            <img
              src={userDetails.image || ""}
              alt="user profile"
              className="user-avatar"
            />
          </div>
          <div className="user-name-container">
            <div className="user-name">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={userDetails.name || ""}
                className="form-control form-control-lg"
                readOnly={readOnly}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, name: e.target.value });
                }}
              />
            </div>
            <div className="user-bio">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Bio
              </label>
              <textarea
                className="form-control  form-control-lg"
                id="exampleFormControlTextarea1"
                rows="3"
                cols="60"
                readOnly={readOnly}
                value={userDetails.bio || ""}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, bio: e.target.value });
                }}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="other-details">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Image Url
          </label>
          <input
            type="text"
            value={userDetails.image || ""}
            className="form-control form-control-lg"
            readOnly={readOnly}
            onChange={(e) => {
              setUserDetails({ ...userDetails, image: e.target.value });
            }}
          />
        </div>
        {user.editFlag === "editable" ? (
          <>
            <div className="other-details">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email
              </label>
              <input
                type="text"
                value={userDetails.email || ""}
                className="form-control form-control-lg"
                readOnly={readOnly}
                onChange={(e) => {
                  setUserDetails({ ...userDetails, email: e.target.value });
                }}
              />
            </div>
            <ChangePassword
              oldPassword={userDetails.password}
              id={user.id}
            ></ChangePassword>
          </>
        ) : (
          <div className="inforamtion">
            <div className="alert alert-dark" role="alert">
              You can't change Password or email because you have signed up
              using <b className="edit-flag">{user.editFlag}</b>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalInformation;
