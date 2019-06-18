import React, { createRef, Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Container,
  Popup
} from "semantic-ui-react";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    errorMessage: "",
    error: false
  };

  contextRef = createRef();

  createUser = () => {
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => this.handleError(data));
  };

  handleError = data => {
    if (data.errorMessage === "Username Already Taken")
      this.setState({ errorMessage: "Username Already Taken", error: true });
    else this.props.history.push("/login");
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
          <Container className="signUp" fluid>
            <Header className="SignUpLogo" block as="h2" textAlign="center">
              <Image src="/images/PantryKingLogo.png" /> Sign up for a pantry
            </Header>
            <Form onSubmit={this.createUser} className={this.state.error}>
              <Form.Field inline error={this.state.error}>
                <label>Username</label>
                <input
                  placeholder="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                />
                <p ref={this.contextRef} />
                <Popup
                  context={this.contextRef}
                  content={this.state.errorMessage}
                  position="right center"
                  open={this.state.error}
                />
              </Form.Field>
              <Form.Field inline>
                <label>Password</label>
                <input
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password"
                />
              </Form.Field>
              <Button id="signUpButton" type="submit">
                Submit
              </Button>
              <Header id="bottomHeader" bottom attached>
                <a href="/login">Return to Log In page</a>
              </Header>
            </Form>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

export default SignUp;
