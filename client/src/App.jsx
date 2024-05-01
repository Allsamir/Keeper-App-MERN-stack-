import Footer from "./components/Footer";
import Form from "./components/Form";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 min-h-screen">
        <Form />
      </div>
      <Footer />
    </>
  );
}

export default App;
