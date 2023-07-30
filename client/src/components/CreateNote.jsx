import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
const CreateNote = (props) => {
  const params = useParams();
  const [NoteDetails, setNoteDetails] = useState({
    id: uuidv4(),
    name: "",
    roomid: params.roomid,
    adminid: props.adminId,
  });
  const [message, setMessage] = useState("");
  const [showConfrim, setShowConfrim] = useState(true);
  const CreateNote = async () => {
    setMessage("");
    if (NoteDetails.name.length == 0) {
      setMessage("Please fil the details");
    } else {
      const response = await fetch("http://localhost:5000/user/addNote", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(NoteDetails),
      });
      if (response.status == 200) {
        setMessage("Note created");
        setNoteDetails({
          id: uuidv4(),
          name: "",
          adminId: props.adminId,
        });
        // props.getNote();
        setShowConfrim(false);
      } else setMessage("An error has occurred");
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
                Create Note
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setShowConfrim(true);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Note Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="xyz"
                  value={NoteDetails.name || ""}
                  onChange={(e) =>
                    setNoteDetails({ ...NoteDetails, name: e.target.value })
                  }
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
                  setShowConfrim(true);
                }}
              >
                Close
              </button>
              {showConfrim ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={CreateNote}
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

export default CreateNote;
