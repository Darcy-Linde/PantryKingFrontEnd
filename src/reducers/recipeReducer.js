export default (state = { recipeFormValue: "" }, action) => {
  switch (action.type) {
    case "RECIPE_FORM_UPDATE":
      return {
        recipeFormValue: action.recipeFormValue
      };
    default:
      return state;
  }
};
