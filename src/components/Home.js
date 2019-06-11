import React, { Component, Fragment } from "react";
import Nav from "./Nav";
import Body from "./Body";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    {
      if (localStorage.getItem("token")) {
        return (
          <Fragment>
            <Nav />
            <Body />
          </Fragment>
        );
      } else return <h1>You need to be logged in to see this page!</h1>;
    }
  }
}

export default connect()(Home);
