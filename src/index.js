import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import "./index.css";
import "semantic-ui/dist/semantic.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" render={App} />
        <Route exact path="/login" render={LogIn} />
        <Route exact path="/signup" render={SignUp} />
      </React.Fragment>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
