import React, { Component } from "react";
import { Grid, Table, Header, Icon, Button, Form } from "semantic-ui-react";
import IngredientTable from "./ingredientTable";
import { connect } from "react-redux";

class Pantry extends Component {
  fetchIngredients = () => {
    return fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/autocomplete?number=10&&query=${
        this.props.formValue
      }`,
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "X-RapidAPI-Key": "4e6e42e316msh9131f236a4faeb3p1b9bd7jsn9fd909c6c020"
        }
      }
    )
      .then(response => response.json())
      .then(data =>
        this.props.dispatch({ type: "TABLE_UPDATE", searchTable: data })
      );
  };

  updateFormValue = e => {
    this.props.dispatch({ type: "FORM_UPDATE", formValue: e.target.value });
  };

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={8} className="ingredientColumn">
            <Header as="h2">
              <Icon name="lemon outline" color="green" />
              <Header.Content>Your Ingredients</Header.Content>
            </Header>
            <Table color="green" inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Ingredient</Table.HeaderCell>
                  <Table.HeaderCell>Quantity</Table.HeaderCell>
                  <Table.HeaderCell>Unit</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Apples</Table.Cell>
                  <Table.Cell>200</Table.Cell>
                  <Table.Cell>0g</Table.Cell>
                  <Table.Cell>
                    <Button fluid color="green">
                      <Icon name="edit outline" /> Edit
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button fluid color="green">
                      <Icon name="trash alternate outline" /> Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={5} className="ingredientColumn">
            <Header as="h2">
              <Icon name="search plus" color="green" />
              <Header.Content>Search & Add Ingredients</Header.Content>
            </Header>
            <Form onSubmit={this.fetchIngredients}>
              <Form.Group inline>
                <Form.Field>
                  <label>Search For Ingredient</label>
                  <input onChange={e => this.updateFormValue(e)} />
                </Form.Field>
                <Button type="submit" color="green">
                  Search
                </Button>
              </Form.Group>
            </Form>
            <IngredientTable />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    searchTable: state.pantry.searchTable,
    formValue: state.pantry.formValue
  };
};

export default connect(mapStateToProps)(Pantry);
