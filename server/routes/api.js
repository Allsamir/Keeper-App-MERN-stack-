const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

//Get request

router.get("/notes", async (req, res) => {
          try {
                    const notes = await Note.find();
                    res.json(notes);

          } catch (error) {
                    console.log(error)
          }
          
})

//Post request 

router.post("/notes", async (req, res) => {
          try {
                    const {title, content} = req.body;
                    const newNote = Note({
                              title: title,
                              content: content
                    });
                    const savedNote = await newNote.save();
                    res.json(savedNote);

          } catch (error) {
                    console.log(error)
          }
})

// Delete a post 

router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(deletedNote);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;