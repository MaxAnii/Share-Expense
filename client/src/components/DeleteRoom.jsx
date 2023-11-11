import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const DeleteRoom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const roomDetails = {
    roomid: params.roomid,
  };
  const deleteRoom = async () => {
    const response = await fetch(
<<<<<<< HEAD
      `${process.env.REACT_APP_LOCALHOST}/user/deleteroom`,
=======
      `${process.env.REACT_APP_URL}/user/deleteroom`,
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
      console.log("delete");
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
          data-bs-target="#delete-room"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete Room
        </button>

        <div
          className="modal fade"
          id="delete-room"
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
                  onClick={(e) => {
                    deleteRoom();
                    e.stopPropagation();
                  }}
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
