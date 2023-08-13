import React, { useState } from "react";
import { useParams } from "react-router-dom";
const RoomMemberList = () => {
  const params = useParams();
  const [memberDetails, setMemberDetails] = useState([]);
  const [message, setMessage] = useState("");
  const getMemberList = async () => {
    setMessage("");
    const response = await fetch(
      `http://localhost:5000/user/roommemberlist/${params.roomid}`,
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
  return (
    <div>
      <button
        type="button"
        class="edit-btn"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={getMemberList}
      >
        Member List
      </button>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Room member list
              </h1>
              <button
                type="button"
                class="btn-close modal-close-btn"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className=".overflow-member-table">
                <table class="table">
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
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
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
