import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

class Pantry extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={3}>
          <Header as="h2" icon="food" content="Your Recipes" />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Pantry;
