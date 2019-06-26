import React, { createRef, Component } from "react";
import DatePicker from "react-date-picker";
import {
  Grid,
  Icon,
  Header,
  Table,
  List,
  Button,
  Image,
  Form,
  Popup
} from "semantic-ui-react";
import { connect } from "react-redux";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const monthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class Meals extends Component {
  state = {
    date: new Date(),
    image: "",
    title: "",
    api_id: 0,
    user_id: localStorage.user_id,
    noRecipes: false,
    message: "Make a recipe selection"
  };

  componentDidMount() {
    this.fetchMeals();
    this.fetchUserRecipes();
  }

  onChange = date => this.setState({ date });

  contextRef = createRef();

  filterMeals = array => {
    const day = this.dayFormatter(this.state.date.getDate());
    const month = this.monthFormatter(this.state.date.getMonth());
    const year = `${this.state.date.getFullYear()}`;

    const newArray = array.filter(
      meal =>
        meal.date.slice(0, 4) === year &&
        meal.date.slice(5, 7) === month &&
        meal.date.slice(8) === day
    );
    return newArray;
  };

  monthFormatter = month => {
    const newMonth = month + 1;
    if (newMonth < 10) return `0${newMonth}`;
    else return `${newMonth}`;
  };

  dayFormatter = day => {
    if (day < 10) return `0${day}`;
    else return `${day}`;
  };

  dateFormatter = date => {
    const year = date.getFullYear();
    const month = this.monthFormatter(date.getMonth());
    const day = date.getDate();

    const dateString = `${year}-${month}-${day}`;
    return dateString;
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
      )
      .then(() => {
        if (this.props.recipeUserTable.length === 0)
          this.setState({ message: "You have no recipes to add!" });
      });
  };

  fetchMeals = () => {
    fetch("http://localhost:3000/api/v1/meals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(data =>
        this.props.dispatch({
          type: "TABLE_UPDATE",
          mealTable: data
        })
      );
  };

  updateSelectedRecipe = (image, title, api_id) => {
    this.setState({ image: image, title: title, api_id: api_id });
  };

  handleAddMeal = () => {
    if (this.state.image === "") {
      this.setState({ noRecipes: true });
      return null;
    } else {
      fetch("http://localhost:3000/api/v1/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token")
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          image: this.state.image,
          title: this.state.title,
          api_id: this.state.api_id,
          date: this.dateFormatter(this.state.date)
        })
      }).then(() => this.fetchMeals());
    }
  };
  removeMeal = id => {
    fetch(`http://localhost:3000/api/v1/meals/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      }
    }).then(() => this.fetchMeals());
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4} className="dateTable">
            <h3>Meal Calendar</h3>
            <DatePicker
              onChange={this.onChange}
              value={this.state.date}
              clearIcon={null}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <h3>
              Meals for {daysOfWeek[this.state.date.getDay()]},{" "}
              {monthsOfYear[this.state.date.getMonth()]}{" "}
              {this.state.date.getDate()}
            </h3>
            <Table color="olive" inverted>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
            </Table>
            <List divided verticalAlign="middle">
              {this.filterMeals(this.props.mealTable).map(item => {
                return (
                  <List.Item>
                    <List.Content floated="right">
                      <Button
                        color="olive"
                        fluid
                        onClick={() => this.removeMeal(item.id)}
                      >
                        <Icon name="remove bookmark" /> Remove
                      </Button>
                    </List.Content>
                    <Image size="mini" rounded src={item.image} />
                    <List.Content>{item.title}</List.Content>
                  </List.Item>
                );
              })}
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form onSubmit={() => this.handleAddMeal()}>
              <Header as="h3">
                <Icon name="calendar plus outline" color="olive" size="big" />
                <Header.Content>
                  <Button color="olive" type="submit">
                    Add Meal
                  </Button>
                  <p ref={this.contextRef} />
                  <Popup
                    context={this.contextRef}
                    content={this.state.message}
                    position="right center"
                    open={this.state.noRecipes}
                  />
                </Header.Content>
              </Header>
              <Form.Group grouped>
                {this.props.recipeUserTable.map(item => {
                  return (
                    <Form.Field
                      label={item.info.title}
                      control="input"
                      type="radio"
                      name="htmlRadios"
                      onChange={() =>
                        this.updateSelectedRecipe(
                          item.info.image,
                          item.info.title,
                          item.info.api_id
                        )
                      }
                    />
                  );
                })}
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

let mapStateToProps = state => {
  return {
    mealTable: state.meal.mealTable,
    recipeUserTable: state.recipe.recipeUserTable
  };
};

export default connect(mapStateToProps)(Meals);
