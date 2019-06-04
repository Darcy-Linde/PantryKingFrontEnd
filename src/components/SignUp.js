import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Container
} from "semantic-ui-react";

const SignUp = () => (
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
        <Form>
          <Form.Field inline>
            <label>Username</label>
            <input placeholder="Username" />
          </Form.Field>
          <Form.Field inline>
            <label>Password</label>
            <input placeholder="Password" />
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

export default SignUp;
