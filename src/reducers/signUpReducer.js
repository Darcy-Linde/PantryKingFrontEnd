export default (state = { username: "Hi" }, action) => {
  switch (action.type) {
    case "TEST":
      return state;
    default:
      return state;
  }
};
