import { useContext, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Form from "./components/Form";
import { Navbar } from "./components/Navbar";
import Notes from "./components/Notes";
import { AuthContext } from "./Provider/AuthProvider";
import axios from "axios";

function App() {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/notes/${user.email}`)
      .then((res) => setNotes(res.data))
      .catch((err) => console.error(err));
  }, [user.email]);
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-screen">
        <Form />
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {notes.length === 0 ? (
            <div className="text-center">
              <h1 className="text-3xl font-pop">Add notes</h1>
            </div>
          ) : (
            notes.map((note, index) => <Notes key={index} />)
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
