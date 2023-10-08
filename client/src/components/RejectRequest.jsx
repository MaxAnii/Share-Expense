import React from "react";
import { useState } from "react";
const RejectRequest = (props) => {
  const [requestDetails, setRequestDetails] = useState({
    roomid: props.roomid,
    userid: props.userid,
  });
  const rejectRoomRequest = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_LOCALHOST}/user/rejectrequest`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(requestDetails),
      }
    );
    const data = await response.json();
    props.getRequestList();
    if (data.status === 200) {
      // alert("Rejected");
    } else {
      // alert("Error");
    }
  };
  return (
    <button className="reject-btn" onClick={rejectRoomRequest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="100"
        fill="currentColor"
        className="bi bi-x-square"
        viewBox="0 0 16 16"
      >
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
  );
};

export default RejectRequest;
