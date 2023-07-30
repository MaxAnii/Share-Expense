import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteData from "./NoteData";
const NoteList = (props) => {
  const params = useParams();
  const [noteList, setNoteList] = useState([]);
  const [message, setMessage] = useState("");
  const getNote = async () => {
    const response = await fetch(
      `http://localhost:5000/user/getnote/${params.roomid}`,
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
  };
  useEffect(() => {
    getNote();
  }, []);
  return (
    <>
      <div className="row text-center row-cols-2 row-cols-md-4 g-4 m-4">
        {noteList.map((elem, index) => {
          return (
            <>
              <div className="col" id={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">
                      {elem.noteName.toUpperCase()}
                    </h5>
                    <NoteData noteid={elem.id} name={elem.noteName}></NoteData>
                  </div>
                  <div className="card-footer">
                    <small className="text-body-secondary">
                      created on {"' " + elem.creationdate.slice(0, 10) + " '"}
                      {" by " + "' " + elem.name + "'"}
                    </small>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default NoteList;
