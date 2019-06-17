import React from "react";
import Recipes from "./Recipes";
import Pantry from "./Pantry";
import Meals from "./Meals";
import { connect } from "react-redux";

const Body = props => {
  switch (props.nav_item) {
    case "PANTRY":
      return <Pantry />;
    case "RECIPES":
      return <Recipes />;
    case "MEALS":
      return <Meals />;
    default:
      return <Pantry />;
  }
};

let mapStateToProps = state => {
  return { nav_item: state.nav.activeItem };
};

export default connect(mapStateToProps)(Body);
