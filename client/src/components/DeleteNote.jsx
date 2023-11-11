import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteNote = (props) => {
  const navigate = useNavigate();

  const noteid = props.noteid;
  const deleteNote = async () => {
    const response = await fetch(
 
      `${process.env.REACT_APP_LOCALHOST}/user/deletenote/${noteid}`,

      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      navigate(-1);
    } else {
      alert("error");
    }
  };
  return (
    <>
      <div>
        <button
          className="delete-btn btn btn-outline-danger"
          data-bs-toggle="modal"
          data-bs-target="#delete-Note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="40"
            fill="currentColor"
            className="bi bi-trash"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
          </svg>
        </button>

        <div
          className="modal fade"
          id="delete-Note"
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
                <h2>All the note data will be deleted.</h2>
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
                  onClick={deleteNote}
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

export default DeleteNote;
