import React, { useEffect, useState } from "react";
import AcceptRequest from "./AcceptRequest";
import RejectRequest from "./RejectRequest";

const ListRoomRequest = (props) => {
  const color = ["black", "dimgray", "darkgray", "silver", "gray"];
  var colorIndex = 0;
  const index = () => {
    colorIndex++;
    if (colorIndex >= color.length) colorIndex = 0;
    return colorIndex;
  };
  const [requestList, setRequestList] = useState([]);
  const [message, setMessage] = useState("");
  const getRequestList = async () => {
    setRequestList([]);
    setMessage("Loading...");
    const response = await fetch(
 
      `${process.env.REACT_APP_LOCALHOST}/user/roomrequest/${props.userid}`,
 
 
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
      }
    );
    const data = await response.json();

    if (data.status === 400) {
      setMessage("No request");
    } else {
      setMessage("");
      setRequestList(data);
    }
  };
  useEffect(() => {
    getRequestList();
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
            {requestList.map((elem, i) => {
              return (
                <tr className="table-row room-row" key={i}>
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
                  <td>
                    <AcceptRequest
                      userid={elem.memberid}
                      roomid={elem.roomid}
                      getRequestList={getRequestList}
                    ></AcceptRequest>
                  </td>
                  <td>
                    <RejectRequest
                      userid={elem.memberid}
                      roomid={elem.roomid}
                      getRequestList={getRequestList}
                    ></RejectRequest>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListRoomRequest;
