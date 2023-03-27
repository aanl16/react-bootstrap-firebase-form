import React from "react";
import { Route, Routes } from "react-router-dom";
import { Completed } from "./Components/Completed";
import { LoginPage } from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";

export const App = () => {

  return (
      <Routes>
        <Route exact path="/registration" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/completed" element={<Completed/>}/>
      </Routes>
  );
};
