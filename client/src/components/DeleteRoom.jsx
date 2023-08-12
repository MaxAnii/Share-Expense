import React from "react";
import { useNavigate, useParams } from "react-router-dom";
const DeleteRoom = () => {
  const params = useParams();
  const navigate = useNavigate();
  const roomDetails = {
    roomid: params.roomid,
  };
  const deleteRoom = async () => {
    const response = await fetch("http://localhost:5000/user/deleteroom", {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(roomDetails),
    });
    const data = await response.json();
    if (data.status === 200) {
      navigate("/home");
    } else {
      alert("error");
    }
  };
  return (
    <>
      <button className="btn leave-room" onClick={deleteRoom}>
        DeleteRoom
      </button>
    </>
  );
};
export default DeleteRoom;
