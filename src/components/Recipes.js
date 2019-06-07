import React, { Component } from "react";
import { Container, Grid, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

const api =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=";
const exampleIngredientArray = ["apples", "2Cflour", "2Csugar"];
let url =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=apples%2Cflour%2Csugar";
class Recipes extends Component {
  fetchRecipesByIngredients = array => {
    return fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "4e6e42e316msh9131f236a4faeb3p1b9bd7jsn9fd909c6c020"
      }
    }).then(response => response.json());
  };

  render() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <Menu text vertical>
              <Menu.Item header>Sort By</Menu.Item>
              <Menu.Item name="My Recipes" />
              <Menu.Item name="Search Recipes" />
            </Menu>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect()(Recipes);
