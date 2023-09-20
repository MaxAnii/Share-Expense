import React, { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import { Link, useNavigate } from "react-router-dom";

const RoomList = (props) => {
  const color = ["black", "dimgray", "darkgray", "silver", "gray"];
  var colorIndex = 0;

  const index = () => {
    colorIndex++;
    if (colorIndex >= color.length) colorIndex = 0;
    return colorIndex;
  };
  const [message, setMessage] = useState("");
  const [roomDetails, setRoomDeetails] = useState([]);
  const getRoom = async () => {
    setMessage("loading...");
    const response = await fetch(
      `http://localhost:5000/user/getroom/${props.userid}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === 400) setMessage("Create a room");
    else {
      setRoomDeetails(data);
      setMessage("");
    }
  };
  const Navigate = useNavigate();
  useEffect(() => {
    getRoom();
  }, []);
  return (
    <>
      <div className="room-table">
        {message.length ? (
          <div className="room-list-details">{message}</div>
        ) : (
          ""
        )}
        <table className="table table-light  table-hover">
          <tbody>
            {roomDetails.map((elem, i) => {
              return (
                <tr
                  key={i}
                  className="table-row room-row"
                  onClick={() => {
                    Navigate(`/room/${elem.name}/${elem.id}/${elem.adminid}`);
                  }}
                >
                  <td>
                    <button
                      className="room-image"
                      style={{ backgroundColor: color[index()] }}
                    >
                      {elem.name[0].toUpperCase()}
                    </button>
                  </td>
                  <td className="room-details">
                    <p className="room-name">{elem.name.toUpperCase()}</p>
                    <p className="room-description">{elem.description}</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CreateRoom userid={props.userid} getRoom={getRoom}></CreateRoom>
    </>
  );
};

export default RoomList;
