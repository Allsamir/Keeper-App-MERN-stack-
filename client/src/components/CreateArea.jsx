import React, { useState, useEffect } from 'react';
import axios from 'axios'; // this module will connect or communicate with the server.
import Note from "./Note";
import AddIcon from '@mui/icons-material/Add';
import { Fab, Zoom } from "@mui/material";

// To understand the full code you need to see and compare server/routes/api.js file where the get,post,delete Method is coded by me.

const CreateArea = () => {

          const [note, setNote] = useState({
                    title: "",
                    content: ""
          });

          const [noteToRender, setNoteToRender] = useState([])

          const [init, change] = useState(false);

          useEffect(() => {
          fetchNotes();
          }, []);

          const fetchNotes = async () => {
          try {
          const response = await axios.get('http://localhost:3001/notes');
          setNoteToRender(response.data); // coming {title, content} from our database
          } catch (error) {
          console.error('Error fetching notes:', error);
          }};


          const handleChange = (event) => {
                    const {name, value} = event.target
                    setNote({
                              ...note,
                              [name]: value
                    });
          };

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    try {
                    const response = await axios.post('http://localhost:3001/notes', note);          
                    setNoteToRender([
                              ...noteToRender,
                              response.data
                    ]);
                    setNote({
                    title: "",
                    content: ""
                    })
                    } catch (error) {
                              console.error('Error adding note:', error);
                    }
          }

          const expand = () => {
                    change(true)
          }

          const DeleteNote = async (id) => {

                    try {

                    const response = await axios.delete(`http://localhost:3001/notes/${id}`);

                    setNoteToRender(noteToRender.filter((note) => (note._id !== id))) // this(note._id) is the id of the note from database.

                    } catch (error) {
                              console.error('Error deleting note:', error);
                    }
          }
 
          return(
                    <>
                              <form onSubmit={handleSubmit} className="create-note">
                                        {init && <input onChange={handleChange} name="title" placeholder="Title" value={note.title}/>}
                                        <textarea onClick={expand} onChange={handleChange} name="content" placeholder="Take a note..." rows={init ? "3" : "1"} value={note.content}></textarea>
                                        <Zoom in={init}>
                                        <Fab type="submit"><AddIcon fontSize="large"/></Fab>
                                        </Zoom>
                              </form>
                              {noteToRender.map((note, index) => (
                                        <Note key={index} id={note._id} title={note.title} content={note.content} handleDelete={DeleteNote}/>
                              ))}
                              
                    </>
          )
}
export default CreateArea;