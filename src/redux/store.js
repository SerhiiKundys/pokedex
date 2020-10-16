import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { pokemonReducer } from "./reducers/pokemonReducer";
import { filterReducer } from "./reducers/filterReducer";

let reducers = combineReducers({
  pokemon: pokemonReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducers,
  applyMiddleware(thunk),
);
