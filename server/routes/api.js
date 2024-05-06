require("dotenv").config();
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
// auth related apis

router.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    })
    .send({ success: true });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", { maxAge: 0 }).send({ success: true });
});

//Get request

router.get("/notes/:userEmail", verifyToken, async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    if (req.user.email !== userEmail) {
      return res.status(403).send({ message: "forbideen access" });
    }
    const user = await User.findOne({ email: userEmail });
    const notes = await Note.find({ user: user._id });
    res.status(201).json(notes);
  } catch (error) {
    console.log(error);
  }
});

//Post requests

router.post("/users", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({
      email: email,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
  }
});

router.post("/notes", async (req, res) => {
  try {
    const { title, note, email } = req.body;
    const user = await User.findOne({ email: email });
    const newNote = new Note({
      title: title,
      note: note,
      user: user._id,
    });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.log(error);
  }
});

router.put("/notes/:noteId", async (req, res) => {
  const id = req.params.noteId;
  const { title, note } = req.body;
  const newNote = await Note.findByIdAndUpdate(
    id,
    { title, note },
    { new: true },
  );
  res.status(201).json(newNote);
});

// Delete a post

router.delete("/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
