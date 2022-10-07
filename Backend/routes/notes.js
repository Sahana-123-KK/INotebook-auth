const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Note = require("../models/notes");
const mongoose = require("mongoose");
const fetchUser = require("../middleware/fetchuser");

// router.post("/", (req, res) => {
//   const users = user(req.body);
//   users.save();
//   res.json({ message: "well" });
// });

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const allnotes = await Note.find({ user: req.user.id });
    res.json(allnotes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addnote", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    if (!title || !description) {
      return res.status(402).json({ error: "Fill all fields" });
    }
    // karan's
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyOThlYzI0YjAzM2Y5ZDdmZDU3MjM2In0sImlhdCI6MTY2MzY2ODMxOH0.8rabjgpGA_C8wLYWSGn5GNwq2vTlDfXdetVls4A4vpI

    // rishabh
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMyOThmNWQ0YjAzM2Y5ZDdmZDU3MjQzIn0sImlhdCI6MTY2MzY2ODQ3MX0.TdqPp5AHOxI2_16TlNc9Ah3fEMx19xyglJWAnjB8E4c

    const newnote = new Note({ title, description, tag, user: req.user.id });
    const addednote = await newnote.save();

    res.json(addednote);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let note = {};
    if (title) {
      note.title = title;
    }
    if (description) {
      note.description = description;
    }
    if (tag) {
      note.tag = tag;
    }

    let idnote = await Note.findById(req.params.id);
    if (!idnote) {
      return res.status(404).send("Not found");
    }

    if (idnote.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    idnote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: note },
      { new: true }
    );

    res.json(idnote);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
