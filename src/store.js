import { createStore, combineReducers } from "redux";
import signUpReducer from "./reducers/signUpReducer";
import navReducer from "./reducers/navReducer";
import pantryReducer from "./reducers/pantryReducer";
import recipeReducer from "./reducers/recipeReducer";

const rootReducer = combineReducers({
  signUp: signUpReducer,
  nav: navReducer,
  pantry: pantryReducer,
  recipe: recipeReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
