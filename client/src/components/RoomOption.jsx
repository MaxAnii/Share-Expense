import React, { useState } from "react";
import RoomMemberList from "./RoomMemberList";
import LeaveRoom from "./LeaveRoom";
import { useParams } from "react-router-dom";
import DeleteRoom from "./DeleteRoom";

const RoomOption = (props) => {
  const params = useParams();
  const [show, setShow] = useState(false);
  return (
    <>
      <div class="btn-group">
        <button
          className="edit-btn btn btn-outline-dark"
          onClick={() => setShow(!show)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="40"
            fill="currentColor"
            class="bi bi-sliders"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"
            />
          </svg>
        </button>

        {show ? (
          <div className="drop-menu">
            <ul className="drop-menu-list">
              <li class="option-item">
                <RoomMemberList></RoomMemberList>
              </li>

              <li class="option-item">
                {params.roomadminid === props.userid ? (
                  <DeleteRoom></DeleteRoom>
                ) : (
                  <LeaveRoom userid={props.userid}></LeaveRoom>
                )}
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default RoomOption;
