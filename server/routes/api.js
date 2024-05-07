require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Note = require("../models/Note");
const User = require("../models/User");
const cookieOptions = {
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  secure: process.env.NODE_ENV === "production" ? true : false,
};

//Get request

router.get("/notes", verifyToken, async (req, res) => {
  try {
    const userEmail = req.query.email;
    if (req.user.email !== userEmail) {
      return res.status(403).send({ message: "Forbideen Access" });
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

// auth related apis

router.post("/jwt", async (req, res) => {
  const userEmail = req.body;
  const token = jwt.sign(userEmail, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, cookieOptions).send({ success: true });
});

router.post("/logout", async (req, res) => {
  const user = req.body;
  res
    .clearCookie("token", { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});

module.exports = router;
