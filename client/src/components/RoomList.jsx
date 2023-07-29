import React, { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";

const RoomList = (props) => {
  var rowCount = 1;
  const [roomDetails, setRoomDeetails] = useState([]);
  const getRoom = async () => {
    const response = await fetch(
      `http://localhost:5000/user/getroom/${props.adminId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 400) return;
    else {
      const data = await response.json();
      setRoomDeetails(data);
    }
  };
  useEffect(() => {
    getRoom();
  }, []);
  console.log(roomDetails);
  return (
    <div>
      <table className="table table-light table-striped">
        <tbody>
          {roomDetails.map((elem) => {
            return (
              <>
                <tr id={rowCount}>
                  <td>{elem.name}</td>
                  <td>{elem.description}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <CreateRoom adminId={props.adminId} getRoom={getRoom}></CreateRoom>
    </div>
  );
};

export default RoomList;
