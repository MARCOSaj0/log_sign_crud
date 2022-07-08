import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./app/component/Login/login";
import Signup from "./app/component/Signup/Signup";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
    </Routes>
  );
};

export default App;