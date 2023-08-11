import React from "react";
import NoteList from "../components/NoteList";
import AddMember from "../components/AddMember";
import { useParams } from "react-router-dom";
import RoomOption from "../components/RoomOption";

const Room = ({ user }) => {
  const params = useParams();

  return (
    <>
      <div className="room-name">
        <h3>{params.roomname.toUpperCase()}</h3>
        <div className="room-option">
          <RoomOption userid={user.id}></RoomOption>
        </div>
      </div>
      <hr></hr>
      <NoteList userid={user.id}></NoteList>
      {params.roomadminid === user.id ? (
        <AddMember roomid={params.roomid} userid={user.id}></AddMember>
      ) : (
        ""
      )}
    </>
  );
};

export default Room;
