import { useCallback, useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { Navbar } from "./components/Navbar";
import Notes from "./components/Notes";
import { AuthContext } from "./Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useAxios from "./Hooks/useAxios";

function App() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const fetchNotes = useCallback(() => {
    axiosSecure
      // .get(`https://server-dun-pi.vercel.app/notes/${user.email}`)
      .get(`/notes/${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.status === 201) {
          setNotes(res.data);
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed to load data",
          icon: "error",
          confirmButtonText: "Close",
        });
        console.error(err);
      });
  }, [user.email, axiosSecure]);
  useEffect(() => {
    fetchNotes();
    setLoading(false);
  }, [fetchNotes]);

  const handleFetchNotes = () => {
    fetchNotes();
    setLoading(false);
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
          .delete(`https://server-dun-pi.vercel.app/notes/${id}`)
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-screen">
        <Form handleFetchNotes={handleFetchNotes} />
        {loading && (
          <div className="min-h-screen text-center flex flex-col justify-center items-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        )}
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
              handleFetchNotes={handleFetchNotes}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
