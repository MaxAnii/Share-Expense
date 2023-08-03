import React from "react";
import ListRoomRequest from "../components/ListRoomRequest";

const RoomRequest = ({ user }) => {
  return <ListRoomRequest userid={user.id}></ListRoomRequest>;
};

export default RoomRequest;
