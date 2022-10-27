import React, { useState, useEffect } from "react";
import { Routes, Route,  Navigate } from "react-router-dom";
import Login from "./login/Login";

import AppRouter from "./Router/AppRouter";

const App = () => {
  const [logged, setLoggedIn] =useState("false");
  
  useEffect(() =>{
    setLoggedIn(sessionStorage.getItem("accessToken"));
  }, [logged])

  function signIn(){
    setLoggedIn("true");
  }

  function signOut(){
    setLoggedIn();
    sessionStorage.removeItem("accessToken");
    console.log("signOut");
  }

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={logged ? <AppRouter signOut={signOut}/> : <Navigate to="/" />}
      />
      
      <Route path="/" element={!logged ?<Login signIn={signIn}/> : <Navigate to="/admin/"  />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;

function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
    </div>
  );
}
