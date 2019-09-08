import React from "react";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    </BrowserRouter>
  );
}

export default App;
