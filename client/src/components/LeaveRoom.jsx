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
    const response = await fetch(
<<<<<<< HEAD
      `${process.env.REACT_APP_LOCALHOST}/user/leaveroom`,
=======
      `${process.env.REACT_APP_URL}/user/leaveroom`,
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(roomDetails),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      navigate("/home");
    } else {
      alert("error");
    }
  };
  const modals = document.getElementsByClassName("modal");
  for (const modal of modals) {
    modal.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
  return (
    <>
      <div>
        <button
          type="button"
          className="edit-btn leave-room"
          data-bs-toggle="modal"
          data-bs-target="#leave-room"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Leave Room
        </button>

        <div
          className="modal fade"
          id="leave-room"
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
                You won't be able to access the room any more and your note will
                not be deleted.
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
                  onClick={(e) => {
                    leaveRoom();
                    e.stopPropagation();
                  }}
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
