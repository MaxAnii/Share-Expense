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
          class="edit-btn leave-room"
          data-bs-toggle="modal"
          data-bs-target="#delete-room"
        >
          Delete Room
        </button>

        <div
          class="modal fade"
          id="delete-room"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Warning
                </h1>
                <button
                  type="button"
                  class="btn-close modal-close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                All the room details will be deleted from you as well as from
                the room members.
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
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
