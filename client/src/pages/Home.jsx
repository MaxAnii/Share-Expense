import React from "react";
import RoomList from "../components/RoomList";
import CreateRoom from "../components/CreateRoom";

const Home = ({ user }) => {
  console.log(user);
  return (
    <>
      <RoomList></RoomList>
      <CreateRoom adminId={user.id}></CreateRoom>
    </>
  );
};

export default Home;
