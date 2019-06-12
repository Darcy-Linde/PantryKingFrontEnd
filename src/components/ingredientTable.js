import React, { Component, Fragment } from "react";
import { Table, Image, Form, Button, Modal } from "semantic-ui-react";
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

class IngredientTable extends Component {
  generate100 = () => {
    const array = [];
    for (let i = 1; i <= 100; i++) array.push(i);
    return array;
  };

  state = {
    name: "",
    image: "",
    quantity: 1,
    unit: "teaspoon",
    modalOpen: false,
    user_id: localStorage.user_id
  };

  modalClose = () => {
    this.setState({ modalOpen: false });
  };

  resetState = (name, image) => {
    this.setState({
      name: name,
      image: image,
      quantity: 1,
      unit: "teaspoon",
      modalOpen: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.modalClose();
    console.log(this.state.ingredient);
    console.log(this.state.quantity);
    console.log(this.state.unit);
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:3000/api/v1/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => this.postPantry(data));
  };

  postPantry = data => {
    console.log(data);
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
          <Modal.Header>
            Select Quantity and Unit Measurement to Add
          </Modal.Header>
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
                Add Ingredient
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Table color="green">
          <Table.Body>
            {this.props.searchTable.map(item => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <Image
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${
                        item.image
                      }`}
                      size="mini"
                    />
                  </Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="green"
                      fluid
                      onClick={() => this.resetState(item.name, item.image)}
                    >
                      Add Ingredient
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
    searchTable: state.pantry.searchTable,
    formValue: state.pantry.formValue
  };
};

export default connect(mapStateToProps)(IngredientTable);
