export default (state = { activeItem: "PANTRY" }, action) => {
  switch (action.type) {
    case "PANTRY":
      return { activeItem: "PANTRY" };
    case "RECIPES":
      return { activeItem: "RECIPES" };
    case "MEALS":
      return { activeItem: "MEALS" };
    default:
      return state;
  }
};
