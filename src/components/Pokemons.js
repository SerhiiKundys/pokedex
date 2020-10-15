import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

import PokemonCard from "./cards/PokemonCard";
import SelectedPokemon from "./cards/SelectedPokemon";
import TypesFilter from "./TypesFilter";
import Preloader from "./common/Preloader";

import { fetchPokemons, setIsFilterOpened } from "../redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  pokemonsContainer: {
    display: "flex",
    justifyContent: "center",
  },
  blueButton: {
    backgroundColor: "#0095bf",
    color: "white",
    "&:hover": {
      backgroundColor: "#11add9",
    },
  },
  selectedPokemon: {
    position: "sticky",
    top: 0,
  },
}));

const Pokemons = ({
  fetchPokemons,
  pokemons,
  nextChunk,
  fetchingInProcess,
  isPokemonSelected,
  types,
  setIsFilterOpened,
}) => {
  const [selectedTypes, setSelectedTypes] = React.useState([]);
  React.useEffect(() => {
    fetchPokemons();
  }, []);

  React.useEffect(() => {
    const entries = Object.entries(types);
    let appropriateTypes = [];
    for (let type of entries) {
      if (type[1] === true) {
        appropriateTypes.push(type[0]);
      }
    }
    setSelectedTypes(appropriateTypes);
  }, [types]);

  const classes = useStyles();

  const onLoadMore = () => {
    fetchPokemons(nextChunk);
  };

  const onFilterClick = () => {
    setIsFilterOpened(true);
  };

  const includingTypes = (superset, subset) => {
    return subset.every((value) => superset.indexOf(value) >= 0);
  };

  return (
    <div className={classes.pokemonsContainer}>
      <Grid
        container
        item
        spacing={2}
        xs={12}
        sm={8}
        md={10}
        xl={8}
        align="center"
      >
        <Grid item xs={12}>
          <Box m={3} maxWidth={450}>
            <header>
              <Paper variant="outlined" square>
                <Typography variant="h3">Pokedex</Typography>
              </Paper>
            </header>
          </Box>
          <Button
            variant="contained"
            className={classes.blueButton}
            onClick={onFilterClick}
          >
            Filter
          </Button>
        </Grid>
        <Grid item container xs={12} md={9} spacing={3}>
          {pokemons
            .filter((pokemon) => includingTypes(pokemon.types, selectedTypes))
            .map((pokemon) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name}>
                <PokemonCard
                  name={pokemon.name}
                  types={pokemon.types}
                  weight={pokemon.weight}
                  totalMoves={pokemon.totalMoves}
                  stats={pokemon.stats}
                  img={pokemon.img}
                />
              </Grid>
            ))}
          {fetchingInProcess && (
            <Grid item container xs={12} spacing={3}>
              <Grid item xs={12}>
                <Preloader />
              </Grid>
            </Grid>
          )}
          {!fetchingInProcess && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.blueButton}
                onClick={onLoadMore}
                fullWidth
              >
                Load More
              </Button>
            </Grid>
          )}
        </Grid>
        {isPokemonSelected && (
          <Hidden smDown>
            <Grid item xs={12} md={3}>
              <div className={classes.selectedPokemon}>
                <SelectedPokemon />
              </div>
            </Grid>
          </Hidden>
        )}
      </Grid>
      <TypesFilter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pokemons: state.pokemon.pokemons,
    fetchingInProcess: state.pokemon.fetchingInProcess,
    nextChunk: state.pokemon.nextChunk,
    isPokemonSelected: state.pokemon.isPokemonSelected,
    types: state.filter.types,
  };
};

export default connect(mapStateToProps, {
  fetchPokemons,
  setIsFilterOpened,
})(Pokemons);
