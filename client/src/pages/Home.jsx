import React from "react";
import RoomList from "../components/RoomList";

const Home = ({ user }) => {
  return (
    <>
      <RoomList roomAdminId={user.id}> </RoomList>
    </>
  );
};

export default Home;
