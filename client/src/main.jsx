import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";


import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Register from "./pages/Register";


ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <BrowserRouter>

    <Routes>
      <Route
      path="/"
      element={<Dashboard/>}
    />

      <Route 
        path="/register" 
        element={<Register />} 
      />
      <Route
       path="/login"
       element={<Login/>}
       />
       <Route
       path="/dashboard"

       element={<Dashboard/>}
       />

    </Routes>

  </BrowserRouter>

);