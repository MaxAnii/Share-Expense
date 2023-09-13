import React from "react";
import Google from "../img/google.png";
import Github from "../img/github.png";
import ChangePassword from "../components/ChangePassword";
const PersonalInformation = ({ user }) => {
  return (
    <div className="form-container">
      <div className="basic-information">
        <div className="user-avatar-container">
          <img src={user.image} alt="" className="user-avatar" />
        </div>
        <div className="user-name-container">
          <div className="user-name">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              value={user.name}
              className="form-control form-control-lg"
              readOnly
            />
          </div>
          <div className="user-bio">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Bio
            </label>
            <input
              type="text"
              placeholder="xyz"
              className="form-control form-control-lg"
            />
          </div>
        </div>
      </div>
      <div className="other-details">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Image Url
        </label>
        <input
          type="text"
          value={user.image}
          className="form-control form-control-lg"
          readOnly
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
              value={user.email}
              className="form-control"
              readOnly
            />
          </div>
          <ChangePassword userId={user.id}></ChangePassword>
        </>
      ) : (
        <div className="inforamtion">
          <div class="alert alert-dark" role="alert">
            You can't change Password or email because you have signed up using{" "}
            {user.editFlag}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;
