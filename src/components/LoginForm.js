import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) return null;
        else {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user_id", data.user_id);
          this.props.history.push("/home");
        }
      });
  };

  render() {
    return (
      <Grid
        className="loginPage"
        textAlign="center"
        style={{ height: "110vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header block as="h2" textAlign="center">
            <Image src="/images/PantryKingLogo.png" /> Log in to your pantry
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                name="username"
                placeholder="Username"
                onChange={e => this.setState({ username: e.target.value })}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Button id="loginFormButton" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Header id="bottomHeader" bottom="true" attached>
            Don't have a pantry? <a href="/signup">Sign Up</a>
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginForm;
