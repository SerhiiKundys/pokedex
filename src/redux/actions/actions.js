import {
  SET_FETCHING_IN_PROCESS,
  POKEMONS_SET_POKEMONS,
  POKEMONS_SET_NEXT_CHUNK,
  POKEMONS_SET_IS_SELECTED,
  POKEMONS_SET_SELECTED,
  TYPES_FILTER_SET_TYPE,
  TYPES_FILTER_SET_IS_OPEN,
} from "../types/types";

import { requestAPI } from "../../api/requestApi";

const initialFetchRequest =
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12";

export const setFetchingInProcess = (fetchingInProcess) => ({
  type: SET_FETCHING_IN_PROCESS,
  fetchingInProcess,
});

export const setPokemons = (pokemons) => ({
  type: POKEMONS_SET_POKEMONS,
  pokemons,
});

export const setNextChunk = (nextChunk) => ({
  type: POKEMONS_SET_NEXT_CHUNK,
  nextChunk,
});

export const setSelectedPokemon = (selectedPokemon) => ({
  type: POKEMONS_SET_SELECTED,
  selectedPokemon,
});

export const setIsPokemonSelected = (isPokemonSelected) => ({
  type: POKEMONS_SET_IS_SELECTED,
  isPokemonSelected,
});

const fetchPokemonData = async (url) => {
  const pokemonData = await requestAPI.request(url, "GET", null);
  return pokemonData;
};

async function getPokemonsData(pokemons) {
  let pokemonsData = [];
  for (const pokemon of pokemons) {
    const pokemonData = await fetchPokemonData(pokemon.url);

    const pokemonTypes = pokemonData.types.map((type) => type.type.name);

    const pokemonStats = {
      [pokemonData.stats[1].stat.name]: pokemonData.stats[1].base_stat,
      [pokemonData.stats[2].stat.name]: pokemonData.stats[2].base_stat,
      [pokemonData.stats[0].stat.name]: pokemonData.stats[0].base_stat,
      [pokemonData.stats[3].stat.name]: pokemonData.stats[3].base_stat,
      [pokemonData.stats[4].stat.name]: pokemonData.stats[4].base_stat,
      [pokemonData.stats[5].stat.name]: pokemonData.stats[5].base_stat,
    };

    pokemonsData.push({
      name: pokemonData.name,
      weight: pokemonData.weight,
      totalMoves: pokemonData.moves.length,
      types: pokemonTypes,
      stats: pokemonStats,
      img: pokemonData.sprites.front_default,
    });
  }

  return pokemonsData;
}

export const fetchPokemons = (url = initialFetchRequest) => async (
  dispatch
) => {
  try {
    dispatch(setFetchingInProcess(true));

    const fetchedPokemons = await requestAPI.request(url, "GET", null);

    const data = await getPokemonsData(fetchedPokemons.results);

    dispatch(setPokemons(data));

    dispatch(setNextChunk(fetchedPokemons.next));

    dispatch(setFetchingInProcess(false));
  } catch (e) {
    console.error(e.message);
    dispatch(setFetchingInProcess(false));
  }
};

export const setSelectedTypes = (selectedType) => ({
  type: TYPES_FILTER_SET_TYPE,
  selectedType,
});

export const setIsFilterOpened = (isOpened) => ({
  type: TYPES_FILTER_SET_IS_OPEN,
  isOpened,
});
