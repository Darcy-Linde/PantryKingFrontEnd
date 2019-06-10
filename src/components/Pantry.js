import React, { Component } from "react";
import {
  Grid,
  Table,
  Header,
  Icon,
  Button,
  Image,
  Form,
  Modal
} from "semantic-ui-react";

class Pantry extends Component {
  state = { formValue: "" };

  updateFormValue = e => {
    this.setState({ formValue: e.target.value });
  };

  searchSubmit = () => {
    console.log(this.state.formValue);
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
            <Form onSubmit={this.searchSubmit}>
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
            <Table color="green">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Image
                      src="https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"
                      size="mini"
                    />
                  </Table.Cell>
                  <Table.Cell>Apple</Table.Cell>
                  <Table.Cell>
                    <Modal
                      trigger={
                        <Button color="green" fluid>
                          Add Ingredient
                        </Button>
                      }
                      closeIcon
                    >
                      <Header icon="archive" content="Archive Old Messages" />
                      <Modal.Content>
                        <p>
                          Your inbox is getting full, would you like us to
                          enable automatic archiving of old messages?
                        </p>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="red">
                          <Icon name="remove" /> No
                        </Button>
                        <Button color="green">
                          <Icon name="checkmark" /> Yes
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Pantry;
