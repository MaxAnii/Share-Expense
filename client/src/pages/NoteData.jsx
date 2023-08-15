import React, { useState } from "react";
import ViewExpense from "../components/ViewExpense";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
const NoteData = ({ user }) => {
  const params = useParams();
  const [noteData, setNoteData] = useState({
    noteid: params.noteid,
    roomid: params.roomid,
    expenseid: uuid(),
    reason: "",
    amount: "",
  });
  const [getNewData, setGetNewData] = useState(false);

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
      setGetNewData(!getNewData);
      setMessage("Expense added");
      setNoteData({
        noteid: params.noteid,
        expenseid: uuid(),
        reason: "",
        amount: "",
        roomid: params.roomid,
      });
    } else {
      setMessage("An error has occurred try again");
    }
  };
  return (
    <>
      <div className="note-data">
        <h3 className="note-name">{params.notename.toLocaleUpperCase()}</h3>

        <div>
          {params.usernoteid === user.id ? (
            <form onSubmit={addExpense} className="form">
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
              <button type="submit" className="btn btn-dark add-expense-btn">
                Submit
              </button>
            </form>
          ) : (
            ""
          )}
          <div className="error-message">{message}</div>
        </div>
        <ViewExpense
          loginUser={user.id}
          noteid={params.noteid}
          functionCall={getNewData}
        ></ViewExpense>
      </div>
    </>
  );
};

export default NoteData;
