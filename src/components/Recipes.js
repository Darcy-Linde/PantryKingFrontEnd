import React, { Component } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Button,
  Menu,
  Table
} from "semantic-ui-react";
import { connect } from "react-redux";
import RecipeTable from "./recipeTable";

class Recipes extends Component {
  state = {
    activeItem: "Keyword Search",
    ingredients: []
  };

  fetchRecipesByKeyword = () => {
    console.log("fetching...");
  };

  fetchRecipesByIngredients = () => {
    const ingredients = this.state.ingredients.join("%2C");
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=10&ranking=1&ignorePantry=false&ingredients=${ingredients}`;
    return fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "4e6e42e316msh9131f236a4faeb3p1b9bd7jsn9fd909c6c020"
      }
    })
      .then(response => response.json())
      .then(data =>
        this.props.dispatch({
          type: "RECIPE_TABLE_UPDATE",
          recipeSearchTable: data
        })
      );
  };

  updateRecipeFormValue = e => {
    this.props.dispatch({
      type: "RECIPE_FORM_UPDATE",
      recipeFormValue: e.target.value
    });
  };

  handleItemClick = e => {
    this.setState({ activeItem: e.target.innerText });
  };

  updateIngredientsArray = name => {
    const array = this.state.ingredients;
    if (array.includes(name)) {
      this.setState({ ingredients: array.filter(word => word !== name) });
    } else this.setState({ ingredients: [...array, name] });
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={8} className="userRecipeColumn">
          <Header as="h2">
            <Icon name="food" color="grey" />
            <Header.Content>Your Recipes</Header.Content>
          </Header>
          <Table color="yellow" inverted>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Quick Info</Table.HeaderCell>
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Example Recipe</Table.Cell>
                <Table.Cell>Information at a glance</Table.Cell>
                <Table.Cell>
                  <Button color="yellow" fluid>
                    <Icon name="eye" /> View
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button color="yellow" fluid>
                    <Icon name="remove bookmark" /> Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={5} className="userRecipeColumn">
          <Menu color="yellow" inverted widths={2}>
            <Menu.Item
              name="Keyword Search"
              active={this.state.activeItem === "Keyword Search"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Ingredient Search"
              active={this.state.activeItem === "Ingredient Search"}
              onClick={this.handleItemClick}
            />
          </Menu>
          {this.state.activeItem === "Keyword Search" ? (
            <Form onSubmit={this.fetchRecipesByKeyword}>
              <Form.Group inline>
                <Form.Field>
                  <label>Search For Recipe</label>
                  <input onChange={e => this.updateRecipeFormValue(e)} />
                </Form.Field>
                <Button type="submit" color="yellow">
                  Search
                </Button>
              </Form.Group>
            </Form>
          ) : (
            <Form onSubmit={this.fetchRecipesByIngredients}>
              <Form.Group grouped>
                <label>Select Ingredients</label>
                {this.props.ingredientUserTable.map(item => {
                  return (
                    <Form.Field
                      label={item.info.name}
                      control="input"
                      type="checkbox"
                      onChange={() =>
                        this.updateIngredientsArray(item.info.name)
                      }
                    />
                  );
                })}
              </Form.Group>
              <Button type="submit" color="yellow">
                Search
              </Button>
            </Form>
          )}
          <RecipeTable />
        </Grid.Column>
      </Grid>
    );
  }
}

let mapStateToProps = state => {
  return {
    recipeSearchTable: state.recipe.recipeSearchTable,
    recipeFormValue: state.recipe.recipeFormValue,
    ingredientUserTable: state.pantry.ingredientUserTable
  };
};

export default connect(mapStateToProps)(Recipes);
