export default (
  state = { formValue: "", searchTable: [], userTable: [] },
  action
) => {
  switch (action.type) {
    case "FORM_UPDATE":
      return {
        ...state,
        formValue: action.formValue,
        searchTable: state.searchTable
      };
    case "TABLE_UPDATE":
      return { ...state, formValue: "", searchTable: action.searchTable };
    case "USER_TABLE":
      return { ...state, userTable: action.userTable };
    default:
      return state;
  }
};
