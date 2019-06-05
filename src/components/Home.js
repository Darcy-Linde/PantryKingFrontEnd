import React, { Component } from "react";
import Nav from "./Nav";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(data => this.props.dispatch({ type: "TEST", data: data }));
  }

  fetchUser4Data = () => {
    fetch("http://localhost:3000/api/v1/users/4")
      .then(res => res.json())
      .then(data => console.log);
  };

  render() {
    return <Nav />;
  }
}

export default connect()(Home);
