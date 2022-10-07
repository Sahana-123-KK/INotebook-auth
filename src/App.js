import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/Notes/NoteState";
import "./App.css";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useContext } from "react";
import noteContext from "./context/Notes/noteContext";
import NotFound from "./components/NotFound";

function App() {
  const { setAlert, alert } = useContext(noteContext);
  return (
    <Router>
      <div className="App">
        {/* <h1 className="heading">This is iNotebook</h1> */}
        <Navbar />
        <Alert message={alert.message} type={alert.type} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
