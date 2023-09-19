import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const LeaveRoom = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const roomDetails = {
    userid: props.userid,
    roomid: params.roomid,
  };
  const leaveRoom = async () => {
    const response = await fetch("http://localhost:5000/user/leaveroom", {
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
          data-bs-target="#leave-room"
        >
          Leave Room
        </button>

        <div
          class="modal fade"
          id="leave-room"
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
                You won't be able to access the room any more and your note will
                not be deleted.
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
                  onClick={leaveRoom}
                >
                  Leave Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRoom;
