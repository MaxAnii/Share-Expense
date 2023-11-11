import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import CreateNote from "./CreateNote";
import DeleteNote from "./DeleteNote";
import Spinner from "./Spinner";
const NoteList = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [noteList, setNoteList] = useState([]);
  const [message, setMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const getNote = async () => {
    setNoteList([]);
    setShowSpinner(true);
    const response = await fetch(
<<<<<<< HEAD
      `${process.env.REACT_APP_LOCALHOST}/user/getnote/${params.roomid}`,
=======
      `${process.env.REACT_APP_URL}/user/getnote/${params.roomid}`,
>>>>>>> adfb086a38e11df6a1b5ac3fcc248b7c80b4f98a
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
      setNoteList(data);
    } else setMessage(data.message);
    setShowSpinner(false);
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <>
      {showSpinner ? <Spinner></Spinner> : ""}
      <CreateNote userid={props.userid} getNote={getNote}></CreateNote>
      <div className="row text-center row-cols-2 row-cols-md-4 g-4 m-4">
        {noteList.map((elem, index) => {
          return (
            <div className="col" key={index} style={{ zIndex: props.zIndex }}>
              <div className="card">
                <div className="card-body">
                  <div className="note-conatainer">
                    <h5 className="card-title">
                      {elem.noteName.toUpperCase()}
                    </h5>
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
                    created on {"'" + elem.creationdate.slice(0, 10) + "' "}
                    by <br></br> <b>{"'" + elem.name + "'"} </b>
                    <br></br>and total amount spent till now is <br></br>
                    <b> {elem.total_amount || 0} </b>
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
