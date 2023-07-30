import React from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const Room = ({ user }) => {
  return (
    <>
      <NoteList adminId={user.id}></NoteList>
    </>
  );
};

export default Room;
