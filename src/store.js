import { createStore, combineReducers } from "redux";
import signUpReducer from "./reducers/signUpReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
