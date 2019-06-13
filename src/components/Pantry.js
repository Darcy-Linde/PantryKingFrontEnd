import React, { Component, Fragment } from "react";
import {
  Grid,
  Table,
  Header,
  Icon,
  Button,
  Form,
  Image,
  Modal
} from "semantic-ui-react";
import IngredientTable from "./ingredientTable";
import { connect } from "react-redux";

const measurements = [
  "teaspoon",
  "tablespoon",
  "fluid ounce",
  "cup",
  "pint",
  "quart",
  "gallon",
  "milliliter",
  "liter",
  "pound",
  "ounce",
  "milligram",
  "gram",
  "kilogram"
];

class Pantry extends Component {
  componentDidMount() {
    this.fetchUserIngredients();
  }

  generate100 = () => {
    const array = [];
    for (let i = 1; i <= 100; i++) array.push(i);
    return array;
  };

  state = {
    editId: 0,
    name: "",
    image: "",
    quantity: 1,
    unit: "teaspoon",
    modalOpen: false
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };

  resetState = (name, image, id) => {
    this.setState({
      editId: id,
      name: name,
      image: image,
      quantity: 1,
      unit: "teaspoon",
      modalOpen: true
    });
  };

  handleSubmit = () => {
    this.modalClose();
    fetch(`http://localhost:3000/api/v1/pantries/${this.state.editId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        amount: this.state.quantity,
        unit: this.state.unit
      })
    })
      .then(() => this.fetchUserIngredients())
      .catch(error => console.log(error));
  };

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

  fetchUserIngredients = () => {
    fetch("http://localhost:3000/api/v1/pantries", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data =>
        this.props.dispatch({ type: "USER_TABLE", userTable: data })
      );
  };

  deleteUserIngredient = id => {
    fetch(`http://localhost:3000/api/v1/pantries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(() => this.fetchUserIngredients());
  };

  render() {
    return (
      <Fragment>
        <Modal
          closeIcon
          size="tiny"
          open={this.state.modalOpen}
          onClose={this.modalClose}
        >
          <Modal.Header>Select New Quantity and Unit Measurement</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src={`https://spoonacular.com/cdn/ingredients_100x100/${
                this.state.image
              }`}
            />

            <Form onSubmit={this.handleSubmit}>
              <Form.Field
                label="Select Quantity"
                control="select"
                onChange={e => this.setState({ quantity: e.target.value })}
              >
                {this.generate100().map(num => {
                  return <option value={num}>{num}</option>;
                })}
              </Form.Field>
              <Form.Field
                label="Select Unit Measurement"
                control="select"
                onChange={e => this.setState({ unit: e.target.value })}
              >
                {measurements.map(unit => {
                  return <option value={unit}>{unit}</option>;
                })}
              </Form.Field>
              <Button type="submit" color="green">
                Update Ingredient
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
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
                  {this.props.userTable.map(item => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Image
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${
                              item.info.image
                            }`}
                            size="mini"
                          />
                          {item.info.name}
                        </Table.Cell>
                        <Table.Cell>{item.amount}</Table.Cell>
                        <Table.Cell>{item.unit}</Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            color="green"
                            onClick={() =>
                              this.resetState(
                                item.info.name,
                                item.info.image,
                                item.id
                              )
                            }
                          >
                            <Icon name="edit outline" /> Edit
                          </Button>
                        </Table.Cell>
                        <Table.Cell>
                          <Button
                            fluid
                            color="green"
                            onClick={() => this.deleteUserIngredient(item.id)}
                          >
                            <Icon name="trash alternate outline" /> Delete
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
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
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    searchTable: state.pantry.searchTable,
    formValue: state.pantry.formValue,
    userTable: state.pantry.userTable
  };
};

export default connect(mapStateToProps)(Pantry);
