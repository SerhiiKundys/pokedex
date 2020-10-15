import {
  SET_FETCHING_IN_PROCESS,
  POKEMONS_SET_POKEMONS,
  POKEMONS_SET_NEXT_CHUNK,
  POKEMONS_SET_IS_SELECTED,
  POKEMONS_SET_SELECTED,
} from "../types/types";

const initialState = {
  pokemons: [],
  fetchingInProcess: false,
  nextChunk: null,
  isPokemonSelected: false,
  selectedPokemon: {
    name: null,
    stats: [],
    types: [],
    weight: null,
    totalMoves: null,
    img: null,
  },
};

export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING_IN_PROCESS:
      return Object.assign({}, state, {
        fetchingInProcess: action.fetchingInProcess,
      });
    case POKEMONS_SET_POKEMONS:
      return Object.assign({}, state, {
        pokemons: [...state.pokemons, ...action.pokemons],
      });
    case POKEMONS_SET_NEXT_CHUNK:
      return Object.assign({}, state, {
        nextChunk: action.nextChunk,
      });
    case POKEMONS_SET_IS_SELECTED:
      return Object.assign({}, state, {
        isPokemonSelected: action.isPokemonSelected,
      });
    case POKEMONS_SET_SELECTED:
      return Object.assign({}, state, {
        selectedPokemon: action.selectedPokemon,
      });

    default:
      return state;
  }
};
