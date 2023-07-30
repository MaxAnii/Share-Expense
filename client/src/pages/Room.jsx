import React from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const Room = ({ user }) => {
  return (
    <>
      <NoteList></NoteList>
      <CreateNote adminId={user.id}></CreateNote>
    </>
  );
};

export default Room;
