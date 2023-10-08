import React, { useState } from "react";
import { useParams } from "react-router-dom";
const RoomMemberList = () => {
  const params = useParams();
  const [memberDetails, setMemberDetails] = useState([]);
  const [message, setMessage] = useState("");
  const getMemberList = async () => {
    setMessage("");
    const response = await fetch(
      `${process.env.REACT_APP_LOCALHOST}/user/roommemberlist/${params.roomid}`,
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
      setMessage("error");
    } else {
      setMemberDetails(data);
    }
  };
  const modals = document.getElementsByClassName("modal");
  for (const modal of modals) {
    modal.addEventListener("click", (e) => {
      console.log("member");
      e.stopPropagation();
    });
  }
  return (
    <div>
      <button
        type="button"
        className="edit-btn"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={(e) => {
          getMemberList();
          e.stopPropagation();
        }}
      >
        Member List
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Room member list
              </h1>
              <button
                type="button"
                className="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=".overflow-member-table">
                <table className="table">
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    {memberDetails.map((elem) => {
                      return (
                        <>
                          <tr>
                            <td className="user-info">
                              <img
                                src={elem.image}
                                alt="user-icon"
                                className="avatar"
                              />
                              <span className="member-name">
                                {" "}
                                {elem.name}
                                {elem.id === params.roomadminid ? (
                                  <p>Admin</p>
                                ) : (
                                  ""
                                )}
                              </span>
                            </td>
                          </tr>
                          <div className="row-gap"></div>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomMemberList;
