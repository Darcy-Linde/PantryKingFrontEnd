export default (
  state = { recipeFormValue: "", searchTable: [], userTable: [] },
  action
) => {
  switch (action.type) {
    case "RECIPE_FORM_UPDATE":
      return {
        ...state,
        recipeFormValue: action.recipeFormValue
      };
    case "TABLE_UPDATE":
      return { ...state, searchTable: action.searchTable };
    case "USER_TABLE":
      return { ...state, userTable: action.userTable };
    default:
      return state;
  }
};
