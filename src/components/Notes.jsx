import React from "react";
import { useContext, useEffect } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import "./notes.css";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    if (localStorage.getItem("jwtoken")) {
      getNotes();
    }
  }, []);

  return (
    <>
      <AddNote />
      <div className=" my-3">
        <h2>Your Note</h2>
          <p>{notes.length === 0 && "No notes to Display"} </p>
        <div className="notesflex">
          {notes.map((note) => {
            return <Noteitem key={note._id} note={note} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
