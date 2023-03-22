import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginPage.js";
import Register from "./components/RegisterPage.js";
import Home from "./components/HomePage.js";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
};

export default App;
