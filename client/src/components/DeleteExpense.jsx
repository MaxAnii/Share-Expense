import React from "react";
import { useParams } from "react-router-dom";

const DeleteExpense = (props) => {
  const params = useParams();
  const noteid = params.noteid;
  const deleteExpense = async () => {
    const response = await fetch(
      `http://localhost:5000/user/deleteexpense/${noteid}/${props.expenseid}/`,
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
      props.getExpense();
    } else {
      alert("error");
    }
  };
  return (
    <div>
      <button
        className="delete-btn btn btn-outline-danger"
        onClick={deleteExpense}
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
    </div>
  );
};

export default DeleteExpense;
