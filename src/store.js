import { createStore, combineReducers } from "redux";
import signUpReducer from "./reducers/signUpReducer";
import navReducer from "./reducers/navReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer,
  nav: navReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
