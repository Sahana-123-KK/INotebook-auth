import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const displayAlert = (type, message) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);
  };
  const [toggleEdit, setToggleEdit] = useState(false);
  const url = "http://localhost:5000/";

  const [notes, setNotes] = useState([]);
  const [editb, setEditb] = useState({});
  const [user, setUser] = useState({});

  const getNotes = async () => {
    try {
      const response = await fetch(`${url}api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwtoken"),
        },
      });
      const json = await response.json();

      console.log(json);
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${url}api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwtoken"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      console.log(response);
      const json = await response.json();
      setNotes([...notes, json]);
      displayAlert("success", "Note Added Successfully");

      // getNotes();
    } catch (error) {
      console.log(error);
      displayAlert("danger", "Note not added");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${url}api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwtoken"),
        },
      });

      console.log(await response.json());
      console.log("Deleting the note with id : " + id);
      let newnotes = notes.filter((note) => {
        return note._id !== id;
      });

      setNotes(newnotes);
      displayAlert("success", "Note Deleted Successfully");
    } catch (error) {
      console.log(error);
      displayAlert("danger", "Note Couldn't get Deleted.");
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${url}api/auth/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwtoken"),
        },
      });

      const json = await response.json();
      console.log(json);
      setUser(json);
    } catch (error) {
      console.log(error);
    }
  };
  const editNote = async (id, title, description, tag) => {
    console.log("Editing Note");
    console.log(id);

    try {
      const response = await fetch(`${url}api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("jwtoken"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();
      console.log(json);
      displayAlert("success", "Note Updated Successfully");
    } catch (error) {
      console.log(error);
      displayAlert("success", "Note Couldn't get Updated ");
    }

    let notescopy = JSON.parse(JSON.stringify(notes));
    // let notescopy = notes;
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (id === element._id) {
        notescopy[index].title = title;
        notescopy[index].description = description;
        notescopy[index].tag = tag;
        break;
      }
    }
    setNotes(notescopy);

    console.log(notes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        toggleEdit,
        setToggleEdit,
        editb,
        setEditb,
        alert,
        setAlert,
        displayAlert,
        getUser,
        user,
        setUser,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
