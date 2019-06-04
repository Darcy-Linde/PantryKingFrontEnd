import React from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";

const LogIn = () => (
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
      <Form size="large">
        <Segment stacked>
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            placeholder="Username"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />

          <Button id="loginFormButton" fluid size="large">
            Login
          </Button>
        </Segment>
      </Form>
      <Header id="bottomHeader" bottom attached>
        Don't have a pantry? <a href="/signup">Sign Up</a>
      </Header>
    </Grid.Column>
  </Grid>
);

export default LogIn;
