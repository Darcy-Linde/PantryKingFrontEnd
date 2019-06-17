import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

class Nav extends Component {
  handleItemClick = (e, { name }) => this.props.dispatch({ type: name });

  render() {
    return (
      <Menu icon="labeled" widths={4}>
        <Menu.Item
          name="PANTRY"
          active={this.props.nav_item === "PANTRY"}
          onClick={this.handleItemClick}
        >
          <Icon name="home" color="green" />
          Pantry
        </Menu.Item>

        <Menu.Item
          name="RECIPES"
          active={this.props.nav_item === "RECIPES"}
          onClick={this.handleItemClick}
        >
          <Icon name="book" color="yellow" />
          Recipes
        </Menu.Item>

        <Menu.Item
          name="MEALS"
          active={this.props.nav_item === "MEALS"}
          onClick={this.handleItemClick}
        >
          <Icon name="checked calendar" color="olive" />
          Meals
        </Menu.Item>

        <Menu.Item
          name="log out"
          href="/login"
          onClick={e => localStorage.clear()}
        >
          <Icon name="power off" color="teal" />
          Log Out
        </Menu.Item>
      </Menu>
    );
  }
}

let mapStateToProps = state => {
  return { nav_item: state.nav.activeItem };
};

export default connect(mapStateToProps)(Nav);
