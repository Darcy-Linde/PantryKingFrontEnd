import React, { Component } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { connect } from "react-redux";

class Nav extends Component {
  state = { activeItem: "pantry" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon="labeled" widths={4}>
        <Menu.Item
          name="pantry"
          active={activeItem === "pantry"}
          onClick={this.handleItemClick}
        >
          <Icon name="home" color="green" />
          Pantry
        </Menu.Item>

        <Menu.Item
          name="recipes"
          active={activeItem === "recipes"}
          onClick={this.handleItemClick}
        >
          <Icon name="book" color="yellow" />
          Recipes
        </Menu.Item>

        <Menu.Item
          name="shopping list"
          active={activeItem === "shopping list"}
          onClick={this.handleItemClick}
        >
          <Icon name="list alternate outline" color="olive" />
          Shopping List
        </Menu.Item>

        <Menu.Item
          name="log out"
          active={activeItem === "log out"}
          onClick={this.handleItemClick}
        >
          <Icon name="power off" color="teal" />
          Log Out
        </Menu.Item>
      </Menu>
    );
  }
}

export default connect()(Nav);
