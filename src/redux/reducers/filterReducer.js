import {
  TYPES_FILTER_SET_TYPE,
  TYPES_FILTER_SET_IS_OPEN,
} from "../types/types";

const initialState = {
  isOpened: false,
  types: {
    normal: false,
    fighting: false,
    flying: false,
    poison: false,
    ground: false,
    rock: false,
    bug: false,
    ghost: false,
    steel: false,
    fire: false,
    water: false,
    grass: false,
    electric: false,
    psychic: false,
    ice: false,
    dragon: false,
    dark: false,
    fairy: false,
    unknown: false,
    shadow: false,
  },
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES_FILTER_SET_TYPE:
      return Object.assign({}, state, {
        types: Object.assign({}, state.types, {
          [action.selectedType.type]: action.selectedType.value,
        }),
      });
    case TYPES_FILTER_SET_IS_OPEN:
      return Object.assign({}, state, { isOpened: action.isOpened });
    default:
      return state;
  }
};
