import React from "react";
import { useParams } from "react-router-dom";

const LeaveRoom = (props) => {
  const params = useParams();
  const roomDetails = {
    userid: props.userid,
    rooomid: params.roomid,
  };
  const leaveRoom = async () => {
    const response = await fetch("http://localhost:5000/user/leaveroom", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(roomDetails),
    });
  };
  return (
    <>
      <button className="btn leave-room" onClick={leaveRoom}>
        Leave Room
      </button>
    </>
  );
};

export default LeaveRoom;
