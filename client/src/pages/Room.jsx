import React from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const Room = ({ user }) => {
  return (
    <>
      <NoteList userid={user.id}></NoteList>
    </>
  );
};

export default Room;
