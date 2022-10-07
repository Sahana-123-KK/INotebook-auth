import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/Notes/noteContext";
import "./Modal.css";
const Modal = () => {
  const { toggleEdit, setToggleEdit, editb, setEditb, editNote } =
    useContext(noteContext);
  const updateNote = () => {
    setToggleEdit(false);
    editNote(enote.id, enote.etitle, enote.edescription, enote.etag);
  };
  const [enote, setEnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  console.log(enote.id);

  useEffect(() => {
    setEnote({
      id: editb._id,

      etitle: editb.title,
      edescription: editb.description,
      etag: editb.tag,
    });
    console.log(enote);
  }, [toggleEdit]);

  const changeEdit = (e) => {
    const { name, value } = e.target;
    setEnote({ ...enote, [name]: value });
    console.log(enote);
  };
  return (
    <div className={!toggleEdit ? "d-none " : "modaldisplay"}>
      <div className="flexrow">
        <h2>Edit Note</h2>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => {
            setToggleEdit(false);
          }}
        >
          ❌
        </button>
      </div>
      <input
        value={enote.etitle}
        onChange={changeEdit}
        type="text"
        name="etitle"
        id=""
        placeholder="Enter Title"
      />
      <input
        value={enote.edescription}
        onChange={changeEdit}
        type="text"
        name="edescription"
        placeholder="Enter Description"
        id=""
      />
      <input
        value={enote.etag}
        onChange={changeEdit}
        type="text"
        name="etag"
        placeholder="Enter Tag"
        id=""
      />

      <button onClick={updateNote} className="btn-primary btn btn-sm">
        Update
      </button>
    </div>
  );
};

export default Modal;
