import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./app/component/Login/login";
import Signup from "./app/component/Signup/Signup";
import Password from "./app/component/updateProfile/Password";
import Profile from "./app/component/updateProfile/Profile";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route exact path="/signup" element={<Signup />}></Route>
      <Route exact path="/profile" element={<Profile />}></Route>
      <Route exact path="/profile/changePass" element={<Password />}></Route>
    </Routes>
  );
};

export default App;