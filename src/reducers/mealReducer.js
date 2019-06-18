export default (state = { mealTable: [] }, action) => {
  switch (action.type) {
    case "TABLE_UPDATE":
      return {
        mealTable: action.mealTable
      };
    default:
      return state;
  }
};
