import React from "react";
import NoteList from "../components/NoteList";
import AddMember from "../components/AddMember";
import { useParams } from "react-router-dom";

const Room = ({ user }) => {
  const params = useParams();

  return (
    <>
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
