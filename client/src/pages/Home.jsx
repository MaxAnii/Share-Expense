import React from "react";
import RoomList from "../components/RoomList";

const Home = ({ user }) => {
  return (
    <>
      <RoomList userid={user.id}> </RoomList>
    </>
  );
};

export default Home;
