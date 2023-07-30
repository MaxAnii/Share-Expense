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
  const Navigate = useNavigate();
  useEffect(() => {
    getRoom();
  }, []);
  return (
    <>
      <div className="room-table">
        <table className="table table-light  table-hover">
          <tbody>
            {roomDetails.map((elem) => {
              return (
                <>
                  <tr
                    id={rowCount}
                    className="table-row room-row"
                    onClick={() => {
                      Navigate(`/room/${elem.id}`);
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
                    <td>
                      <p className="room-name">{elem.name.toUpperCase()}</p>
                      <p className="room-description">{elem.description}</p>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <CreateRoom adminId={props.adminId} getRoom={getRoom}></CreateRoom>
    </>
  );
};

export default RoomList;
