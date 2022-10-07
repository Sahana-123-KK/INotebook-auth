import React from "react";
import "./noteitem.css";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";

const Noteitem = (props) => {
  const { deleteNote, editNote, toggleEdit, setToggleEdit, editb, setEditb } =
    useContext(noteContext);
  const { note } = props;
  return (
    <div>
      <div className="card noteitem m-3">
        <div className="card-body">
          <div className="d-flex alignitems-center">
            <h5 className="card-title"> {note.title} </h5>
            <i
              className="fa-solid fa-trash mx-4"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square "
              onClick={() => {
                setToggleEdit(true);
                setEditb(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
