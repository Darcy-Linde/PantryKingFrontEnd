import React, { Component, Fragment } from "react";
import { Modal, Image, Table, Button, Icon, List } from "semantic-ui-react";
import { connect } from "react-redux";

class RecipeTable extends Component {
  state = {
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

  handleBookmark = () => {
    this.modalClose();
    fetch("http://localhost:3000/api/v1/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        api_id: this.state.apiId,
        title: this.state.title,
        image: this.state.image,
        instructions: this.state.instructions,
        servings: this.state.servings,
        preparation_minutes: this.state.preparationMinutes,
        cooking_minutes: this.state.cookingMinutes,
        ready_in_minutes: this.state.readyInMinutes,
        price_per_serving: this.state.pricePerServing,
        source_url: this.state.sourceUrl,
        vegetarian: false,
        vegan: false,
        gluten_free: false,
        dairy_free: false
      })
    })
      .then(res => res.json())
      .then(data => this.postCookbook(data.id));
  };

  postCookbook = id => {
    fetch("http://localhost:3000/api/v1/cookbooks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        recipe_id: id,
        user_id: this.state.user_id
      })
    }).then(() => this.fetchUserRecipes());
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
          <Modal.Content>
            <Button color="yellow" onClick={() => this.handleBookmark()}>
              Bookmark This Recipe!
            </Button>
          </Modal.Content>
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
        <Table color="yellow">
          <Table.Body>
            {this.props.recipeSearchTable.map(item => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <Image src={item.image} size="mini" />
                  </Table.Cell>
                  <Table.Cell>{item.title}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="yellow"
                      fluid
                      onClick={() => this.fetchRecipe(item.id)}
                    >
                      View
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    recipeFormValue: state.recipe.recipeFormValue,
    recipeSearchTable: state.recipe.recipeSearchTable
  };
};

export default connect(mapStateToProps)(RecipeTable);
