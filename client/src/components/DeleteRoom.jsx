import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const DeleteRoom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const roomDetails = {
    roomid: params.roomid,
  };
  const deleteRoom = async () => {
    const response = await fetch("http://localhost:5000/user/deleteroom", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(roomDetails),
    });
    const data = await response.json();
    if (data.status === 200) {
      navigate("/home");
    } else {
      alert("error");
    }
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="edit-btn leave-room"
          data-bs-toggle="modal"
          data-bs-target="#delete-room"
        >
          Delete Room
        </button>

        <div
          className="modal fade"
          id="delete-room"
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
                  Warning
                </h1>
                <button
                  type="button"
                  className="btn-close modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                All the room details will be deleted from you as well as from
                the room members.
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
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={deleteRoom}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DeleteRoom;
