import "./App.css";
import Home from "./components/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import About from "./components/about/About";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="*" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
