import React, { useState } from "react";
import { useParams } from "react-router-dom";

const EditExpense = (props) => {
  const params = useParams();
  const [noteData, setNoteData] = useState({
    noteid: params.noteid,
    roomid: params.roomid,
    expenseid: props.expenseid,
    reason: props.reason,
    amount: props.amount,
  });
  const [message, setMessage] = useState("");
  const updateExpense = async () => {
    setMessage("");
    const response = await fetch(

      `${process.env.REACT_APP_LOCALHOST}/user/updateexpense`,


      {
        method: "PUT",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(noteData),
      }
    );
    const data = await response.json();
    if (data.status === 200) {
      setMessage("Expense updated");
    } else alert("error");
  };
  return (
    <div>
      <button
        className="edit-btn btn btn-outline-warning"
        data-bs-toggle="modal"
        data-bs-target={"#" + "edit" + props.expenseid}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="40"
          fill="currentColor"
          className="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
          />
        </svg>
      </button>
      <div
        className="modal fade"
        id={"edit" + props.expenseid}
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
                Eidt Expense
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => props.getExpense()}
              ></button>
            </div>
            <div className="modal-body">
              <form className="form">
                <div className="input-group mb-3 input-group-lg">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason Expense made for"
                    value={noteData.reason}
                    onChange={(e) => {
                      setNoteData({ ...noteData, reason: e.target.value });
                    }}
                    required
                  />

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Amount you spend"
                    aria-label="Server"
                    value={noteData.amount}
                    onChange={(e) => {
                      setNoteData({ ...noteData, amount: e.target.value });
                    }}
                    required
                  />
                </div>
              </form>
              <div className="error-message">{message}</div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={updateExpense}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
