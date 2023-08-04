import React, { useState } from "react";

const AcceptRequest = (props) => {
  const [requestDetails, setRequestDetails] = useState({
    roomid: props.roomid,
    userid: props.userid,
  });
  const acceptRequest = async () => {
    const response = await fetch("http://localhost:5000/user/acceptrequest", {
      method: "PUT",
      credentials: "include",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(requestDetails),
    });
    const data = await response.json();
    props.getRequestList();
    if (data.status === 200) alert("Room Added");
    else alert("Error");
  };
  return (
    <div>
      <button className="accept-btn" onClick={acceptRequest}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="39"
          height="100"
          fill="currentColor"
          class="bi bi-check2-circle"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
        </svg>
      </button>
    </div>
  );
};

export default AcceptRequest;
