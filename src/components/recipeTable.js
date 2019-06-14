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

  handleSubmit = () => {
    console.log("submitting...");
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
            <Button color="yellow">Bookmark This Recipe!</Button>
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
                      View Recipe
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
