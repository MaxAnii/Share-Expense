import React from "react";
import RoomList from "../components/RoomList";
import CreateRoom from "../components/CreateRoom";

const Home = ({ user }) => {
  return (
    <>
      <RoomList adminId={user.id}> </RoomList>
    </>
  );
};

export default Home;
