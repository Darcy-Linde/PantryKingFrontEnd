import React, { Component, Fragment } from "react";
import {
  Grid,
  Header,
  Icon,
  Form,
  Button,
  Menu,
  Table,
  Image,
  Modal,
  List
} from "semantic-ui-react";
import { connect } from "react-redux";
import RecipeTable from "./recipeTable";

class Recipes extends Component {
  componentDidMount() {
    this.fetchUserRecipes();
  }

  state = {
    activeItem: "Keyword Search",
    ingredients: [],
    apiId: 0,
    title: "",
    image: "",
    instructions: "",
    servings: 0,
    preparationMinutes: 0,
    readyInMinutes: 0,
    cookingMinutes: 0,
    pricePerServing: 0,
    sourceUrl: "",
    extendedIngredients: [],
    modalOpen: false,
    user_id: localStorage.user_id
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };

  fetchUserRecipes = () => {
    fetch("http://localhost:3000/api/v1/cookbooks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data =>
        this.props.dispatch({
          type: "RECIPE_USER_TABLE",
          recipeUserTable: data
        })
      );
  };

  fetchRecipesByKeyword = () => {
    const query = this.props.recipeFormValue;
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=${query}&limitLicense=false&offset=0&number=10`;
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
          recipeSearchTable: data.results
        })
      );
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

  fetchRecipe = id => {
    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`;
    return fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "4e6e42e316msh9131f236a4faeb3p1b9bd7jsn9fd909c6c020"
      }
    })
      .then(response => response.json())
      .then(data => this.viewRecipe(data));
  };

  viewRecipe = data => {
    this.setState({
      apiId: data.id,
      title: data.title,
      image: data.image,
      instructions: data.instructions,
      servings: data.servings,
      preparationMinutes: data.preparationMinutes,
      cookingMinutes: data.cookingMinutes,
      readyInMinutes: data.readyInMinutes,
      pricePerServing: data.pricePerServing,
      sourceUrl: data.sourceUrl,
      extendedIngredients: data.extendedIngredients,
      modalOpen: true
    });
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

  removeUserRecipe = id => {
    fetch(`http://localhost:3000/api/v1/cookbooks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(() => this.fetchUserRecipes());
  };

  render() {
    return (
      <Fragment>
        <Modal
          closeIcon
          size="tiny"
          open={this.state.modalOpen}
          onClose={this.modalClose}
          scrolling
        >
          <Modal.Header>{this.state.title}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={this.state.image} />
          </Modal.Content>
          <Modal.Content>
            <a
              href={this.state.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.state.sourceUrl}
            </a>
          </Modal.Content>
          <Modal.Content>
            <Modal.Content>
              <Icon name="clock outline" color="black" />
              {this.state.readyInMinutes} Minutes
              <br />
              <Icon name="food" color="black" />
              Serves {this.state.servings}
            </Modal.Content>
            <h2>Ingredients</h2>
            <List divided verticalAlign="middle">
              {this.state.extendedIngredients.map(item => (
                <List.Item>
                  <Image
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${
                      item.image
                    }`}
                    size="mini"
                  />
                  <List.Content>
                    <List.Header>{item.name}</List.Header>
                    <List.Description>
                      {item.amount} {item.unit}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Modal.Content>
          <Modal.Content>
            <h2>Instructions</h2>
            <p>{this.state.instructions}</p>
          </Modal.Content>
        </Modal>
        <Grid>
          <Grid.Column width={8} className="userRecipeColumn">
            <Header as="h2">
              <Icon name="food" color="grey" />
              <Header.Content>Your Recipes</Header.Content>
            </Header>
            <Table color="yellow" inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Recipe</Table.HeaderCell>

                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.recipeUserTable.map(item => {
                  return (
                    <Table.Row>
                      <Table.Cell>
                        <List horizontal relaxed>
                          <List.Item>
                            <Image src={item.info.image} size="mini" />
                            <List.Content>
                              <List.Header>{item.info.title}</List.Header>
                            </List.Content>
                          </List.Item>
                        </List>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="yellow"
                          fluid
                          onClick={() => this.fetchRecipe(item.info.api_id)}
                        >
                          <Icon name="eye" /> View
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="yellow"
                          fluid
                          onClick={() => this.removeUserRecipe(item.id)}
                        >
                          <Icon name="remove bookmark" /> Remove
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
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
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    recipeSearchTable: state.recipe.recipeSearchTable,
    recipeFormValue: state.recipe.recipeFormValue,
    recipeUserTable: state.recipe.recipeUserTable,
    ingredientUserTable: state.pantry.ingredientUserTable
  };
};

export default connect(mapStateToProps)(Recipes);
