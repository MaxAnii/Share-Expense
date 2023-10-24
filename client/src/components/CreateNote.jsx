import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
const CreateNote = (props) => {
  const params = useParams();
  const [NoteDetails, setNoteDetails] = useState({
    id: uuidv4(),
    name: "",
    roomid: params.roomid,
    adminid: props.userid,
  });
  const [message, setMessage] = useState("");
  const [showConfrim, setShowConfrim] = useState(true);
  const CreateNote = async () => {
    setMessage("");
    if (NoteDetails.name.length == 0) {
      setMessage("Please fil the details");
    } else if (NoteDetails.name.length > 15) {
      setMessage("Note name should be less then 15 characters");
    } else {
      const response = await fetch(
        `${process.env.REACT_APP_LOCALHOST}/user/addNote`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(NoteDetails),
        }
      );
      if (response.status == 200) {
        setMessage("Note created");
        setNoteDetails({ ...NoteDetails, id: uuidv4(), name: "" });
        props.getNote();
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
        data-bs-target="#addnote"
      >
        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
      </svg>
      <div
        className="modal fade "
        id="addnote"
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
                  setMessage("");
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
                  setMessage("");
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
