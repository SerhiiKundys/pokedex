import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { pokemonReducer } from "./reducers/pokemonReducer";
import { filterReducer } from "./reducers/filterReducer";

let reducers = combineReducers({
  pokemon: pokemonReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
