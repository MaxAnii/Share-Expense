import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import CreateNote from "./CreateNote";
import DeleteNote from "./DeleteNote";
const NoteList = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [noteList, setNoteList] = useState([]);
  const [message, setMessage] = useState("");
  const getNote = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_URL}/user/getnote/${params.roomid}`,
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
    if (response.status === 200) {
      // check whether user belong to room or not
      // {
      //   let flag = false;
      //   data.map((elem) => {
      //     if (elem.adminid === props.userid || elem.memberid === props.userid)
      //       flag = true;
      //   });
      //   if (!flag) {
      //     navigate("/home");
      //   }
      // }

      setNoteList(data);
    } else setMessage(data.message);
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <>
      <CreateNote userid={props.userid} getNote={getNote}></CreateNote>
      <div className="row text-center row-cols-2 row-cols-md-4 g-4 m-4">
        {noteList.map((elem, index) => {
          return (
            <div className="col" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="note-conatainer">
                    <h5 className="card-title">
                      {elem.noteName.toUpperCase()}
                    </h5>
                    <div className="note-delete">
                      {props.userid === elem.adminid ? (
                        <DeleteNote
                          noteid={elem.id}
                          getNote={getNote}
                        ></DeleteNote>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate(
                        `/room/${params.roomid}/${params.roomadminid}/notedata/${elem.id}/${elem.adminid}/${elem.noteName}`
                      );
                    }}
                  >
                    open
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    created on {"' " + elem.creationdate.slice(0, 10) + " '"}
                    {" by " + "' " + elem.name + "'"}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NoteList;
