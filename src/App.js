import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;