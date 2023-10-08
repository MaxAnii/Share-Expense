import React, { useState } from "react";
import ViewExpense from "../components/ViewExpense";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import DeleteNote from "../components/DeleteNote";
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
    const response = await fetch(
      `${process.env.REACT_APP_LOCALHOST}/user/addexpense`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteData),
      }
    );
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
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <>
      <div className="note-data">
        <h3 className="room-name">{params.notename.toLocaleUpperCase()}</h3>

        {params.usernoteid === user.id ? (
          <>
            <div className="room-option">
              <DeleteNote noteid={params.noteid}></DeleteNote>
            </div>
            <form onSubmit={addExpense} className="add-expense">
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
                  ViewExpense
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
              <button type="submit" className="btn btn-dark add-expense-btn">
                Submit
              </button>
            </form>
          </>
        ) : (
          ""
        )}
        <div className="error-message">{message}</div>

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
