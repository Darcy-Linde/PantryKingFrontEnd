import React, { Component } from "react";
import { Table, Image, Form, Button, Header, Modal } from "semantic-ui-react";
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

  render() {
    return (
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
                  <Modal
                    trigger={
                      <Button color="green" fluid>
                        Add Ingredient
                      </Button>
                    }
                    closeIcon
                    size="tiny"
                  >
                    <Modal.Header>
                      Select Quantity and Unit Measurement to Add
                    </Modal.Header>
                    <Modal.Content image>
                      <Image
                        wrapped
                        size="medium"
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${
                          item.image
                        }`}
                      />

                      <Form>
                        <Form.Field label="Select Quantity" control="select">
                          {this.generate100().map(num => {
                            return <option value={num}>{num}</option>;
                          })}
                        </Form.Field>
                        <Form.Field
                          label="Select Unit Measurement"
                          control="select"
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
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
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
