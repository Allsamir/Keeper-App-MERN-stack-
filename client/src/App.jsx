import Footer from "./components/Footer";
import Form from "./components/Form";
import { Navbar } from "./components/Navbar";
import Note from "./components/Note";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-screen">
        <Form />
        <div>
          <Note />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
