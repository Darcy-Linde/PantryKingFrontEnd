export default (
  state = {
    ingredientFormValue: "",
    ingredientSearchTable: [],
    ingredientUserTable: []
  },
  action
) => {
  switch (action.type) {
    case "INGREDIENT_FORM_UPDATE":
      return {
        ...state,
        ingredientFormValue: action.ingredientFormValue,
        ingredientSearchTable: state.ingredientSearchTable
      };
    case "INGREDIENT_TABLE_UPDATE":
      return {
        ...state,
        ingredientFormValue: "",
        ingredientSearchTable: action.ingredientSearchTable
      };
    case "INGREDIENT_USER_TABLE":
      return { ...state, ingredientUserTable: action.ingredientUserTable };
    default:
      return state;
  }
};
