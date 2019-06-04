import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    fetch("http://localhost:3000/")
      .then(res => res.json())
      .then(data => this.props.dispatch({ type: "TEST", data: data }));
  }

  render() {
    return <Fragment>Test</Fragment>;
  }
}

export default connect()(Home);
