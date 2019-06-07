export default (state = { activeItem: "PANTRY" }, action) => {
  switch (action.type) {
    case "PANTRY":
      return { activeItem: "PANTRY" };
    case "RECIPES":
      return { activeItem: "RECIPES" };
    case "SHOPPING_LIST":
      return { activeItem: "SHOPPING_LIST" };
    default:
      return state;
  }
};
