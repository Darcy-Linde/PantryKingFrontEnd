import React, { createRef, Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Popup
} from "semantic-ui-react";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    error: false,
    errorMessage: "Invalid Username-Password Combination"
  };

  contextRef = createRef();

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
        if (data.message) {
          this.setState({ error: true });
          return null;
        } else {
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
                error={this.state.error}
              />
              <p ref={this.contextRef} />
              <Popup
                context={this.contextRef}
                content={this.state.errorMessage}
                position="right center"
                open={this.state.error}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="Password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                error={this.state.error}
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
