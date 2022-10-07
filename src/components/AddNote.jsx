import React from "react";
import { useContext, useState } from "react";
import noteContext from "../context/Notes/noteContext";

const AddNote = () => {
  const { addNote } = useContext(noteContext);
  const [defaultnote, setDefaultnote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const submit = (e) => {
    e.preventDefault();
    addNote(defaultnote.title, defaultnote.description, defaultnote.tag);
    setDefaultnote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDefaultnote({ ...defaultnote, [name]: value });
    console.log(defaultnote);
  };
  return (
    <div className="container my-3">
      <h2>Add notes</h2>
      <form>
        <div className="form-group my-3">
          <label htmlFor="title"> Title</label>
          <input
            value={defaultnote.title}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            name="title"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input
            value={defaultnote.description}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            name="description"
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="tag">Tag</label>
          <input
            value={defaultnote.tag}
            onChange={handleChange}
            type="text"
            className="form-control"
            id="tag"
            placeholder="Tag"
            name="tag"
          />
        </div>

        <button
          disabled={
            defaultnote.title.length >= 5 && defaultnote.description.length >= 5
              ? false
              : true
          }
          onClick={submit}
          type="submit"
          className="btn btn-primary my-3"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
