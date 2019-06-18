import React, { Component } from "react";
import DatePicker from "react-date-picker";
import { Grid, Icon, Header } from "semantic-ui-react";
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
    date: new Date()
  };

  onChange = date => this.setState({ date });

  handleAddMeal = () => {
    console.log("adding...");
  };

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={5} className="dateTable">
            <h3>Meal Calendar</h3>
            <DatePicker onChange={this.onChange} value={this.state.date} />
          </Grid.Column>
          <Grid.Column width={6}>
            <h3>
              Meals for {daysOfWeek[this.state.date.getDay()]},{" "}
              {monthsOfYear[this.state.date.getMonth()]}{" "}
              {this.state.date.getDate()}
            </h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header as="h3">
              <Icon
                name="calendar plus outline"
                color="olive"
                size="big"
                link
                onClick={this.handleAddMeal}
              />
              Add Meal
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

let mapStateToProps = state => {
  return {
    mealTable: state.meal.mealTable
  };
};

export default connect(mapStateToProps)(Meals);
