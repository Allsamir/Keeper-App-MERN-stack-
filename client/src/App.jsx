import { useCallback, useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { Navbar } from "./components/Navbar";
import Notes from "./components/Notes";
import { AuthContext } from "./Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const fetchNotes = useCallback(() => {
    axios
      .get(`http://localhost:3000/notes/${user.email}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleFetchNotes = () => {
    fetchNotes();
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/notes/${id}`)
          .then((res) => {
            if (res.data) {
              Swal.fire({
                title: "Successfully Deleted",
                icon: "success",
                confirmButtonText: "Close",
              }).then(() => {
                setNotes(notes.filter((note) => note._id !== id));
              });
            }
          })
          .catch((err) => console.error(err));
      }
    });
  };
  const showModal = () => {
    document.getElementById("my_modal_1").showModal();
  };
  const updateNote = () => {
    console.log("Hello World");
  };
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-screen">
        <Form handleFetchNotes={handleFetchNotes} />
        {notes.length === 0 && (
          <div className="text-center">
            <h1 className="text-3xl font-pop">Add notes</h1>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8">
          {notes.map((note, index) => (
            <Notes
              key={index}
              note={note}
              handleDelete={handleDelete}
              showModal={showModal}
            />
          ))}
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn" onClick={updateNote}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <Footer />
    </>
  );
}

export default App;
