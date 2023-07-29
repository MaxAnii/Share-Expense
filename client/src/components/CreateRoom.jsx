import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const CreateRoom = (props) => {
  const [roomDetails, setRoomDetails] = useState({
    id: uuidv4(),
    name: "",
    desc: "",
    adminId: props.adminId,
  });
  const [message, setMessage] = useState("");
  const createRoom = () => {
    setMessage("");
    if (roomDetails.name.length == 0 || roomDetails.desc.length == 0) {
      setMessage("Please fil the details");
    } else {
    }
  };
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="currentColor"
        className="bi bi-plus-circle-fill btn btn-dark add-room"
        viewBox="0 0 16 16"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
      </svg>

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
                Create Room
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Room Name
                </label>
                <input type="text" className="form-control" placeholder="xyz" />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Room Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="For what purpose the room is created"
                ></textarea>
              </div>
              <p className="error-message"> {message}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={createRoom}
              >
                Confrim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
