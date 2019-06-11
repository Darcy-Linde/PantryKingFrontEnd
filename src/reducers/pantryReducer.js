export default (state = { formValue: "", searchTable: [] }, action) => {
  switch (action.type) {
    case "FORM_UPDATE":
      return { formValue: action.formValue, searchTable: state.searchTable };
    case "TABLE_UPDATE":
      return { formValue: "", searchTable: action.searchTable };
    default:
      return state;
  }
};
