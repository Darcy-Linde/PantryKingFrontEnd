import React from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
