import React, { useState } from "react";
import ViewExpense from "./ViewExpense";
import { v4 as uuid } from "uuid";
const NoteData = (props) => {
  const [noteData, setNoteData] = useState({
    noteid: props.noteid,
    expenseid: uuid(),
    reason: "",
    amount: "",
  });
  const [message, setMessage] = useState("");
  const addExpense = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await fetch("http://localhost:5000/user/addexpense", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if (response.status === 200) {
      setMessage("Expense added");
      setNoteData({
        noteid: props.noteid,
        expenseid: uuid(),
        reason: "",
        amount: "",
      });
    } else {
      setMessage("An error has occurred try again");
    }
  };
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-target={`#myModal${props.noteid}`}
        data-bs-toggle="modal"
      >
        Open
      </button>

      <div
        className="modal fade"
        id={`myModal${props.noteid}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {props.name.toUpperCase()}
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                {props.userid === props.adminId ? (
                  <form onSubmit={addExpense}>
                    <div class="input-group mb-3 input-group-lg">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Reason Expense made for"
                        value={noteData.reason}
                        onChange={(e) => {
                          setNoteData({ ...noteData, reason: e.target.value });
                        }}
                        required
                      />

                      <input
                        type="number"
                        class="form-control"
                        placeholder="Amount you spend"
                        aria-label="Server"
                        value={noteData.amount}
                        onChange={(e) => {
                          setNoteData({ ...noteData, amount: e.target.value });
                        }}
                        required
                      />
                    </div>
                    <button type="submit" class="btn btn-dark">
                      Submit
                    </button>
                  </form>
                ) : (
                  ""
                )}
                <div className="error-message">{message}</div>
                <hr></hr>
              </div>
              <ViewExpense noteid={props.noteid}></ViewExpense>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteData;
