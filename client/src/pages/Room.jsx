import React from "react";
import CreateNote from "../components/CreateNote";

const Room = ({ user }) => {
  return (
    <>
      <CreateNote adminId={user.id}></CreateNote>
    </>
  );
};

export default Room;
