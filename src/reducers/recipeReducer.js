export default (
  state = { recipeFormValue: "", recipeSearchTable: [], recipeUserTable: [] },
  action
) => {
  switch (action.type) {
    case "RECIPE_FORM_UPDATE":
      return {
        ...state,
        recipeFormValue: action.recipeFormValue
      };
    case "RECIPE_TABLE_UPDATE":
      return { ...state, recipeSearchTable: action.recipeSearchTable };
    case "RECIPE_USER_TABLE":
      return { ...state, recipeUserTable: action.recipeUserTable };
    default:
      return state;
  }
};
