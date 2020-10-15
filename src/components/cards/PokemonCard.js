import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import Hidden from "@material-ui/core/Hidden";

import SelectedPokemon from "./SelectedPokemon";

import {
  setSelectedPokemon,
  setIsPokemonSelected,
} from "../../redux/actions/actions";
import { useStylesTypeColors } from "../common/TypeColors";

const useStyles = makeStyles({
  pokemonCardContainer: {
    maxWidth: 180,
  },
  pokemonCardContent: {
    cursor: "pointer",
  },
  typesContainer: {
    display: "flex",
    flexWrap: "wrap",
  },
  typesItem: {
    color: "white",
    padding: 5,
    borderRadius: 7,
  },
});

const PokemonCard = ({
  name,
  types,
  totalMoves,
  stats,
  weight,
  img,
  isPokemonSelected,
  setSelectedPokemon,
  setIsPokemonSelected,
}) => {
  const classes = useStyles();
  const typeColors = useStylesTypeColors();

  const onPokemonClick = () => {
    setSelectedPokemon({
      name,
      types,
      totalMoves,
      stats,
      weight,
      img,
    });

    setIsPokemonSelected(true);
  };

  const onPokemonDataClose = () => {
    setIsPokemonSelected(false);
  };

  return (
    <Card className={classes.pokemonCardContainer}>
      <Box
        component="span"
        onClick={onPokemonClick}
        className={classes.pokemonCardContent}
      >
        <CardContent align="center">
          <img src={img} alt="pokemon appearance" />
          <Typography variant="h6" gutterBottom>
            {name}
          </Typography>
          <Box component="div" className={classes.typesContainer}>
            {types.map((type) => (
              <Box m={1} component="span" key={type}>
                <span className={`${classes.typesItem} ${typeColors[type]}`}>
                  {type}
                </span>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Box>
      {name && (
        <Hidden mdUp>
          <Dialog
            onClose={onPokemonDataClose}
            aria-labelledby="simple-dialog-title"
            open={isPokemonSelected}
          >
            <SelectedPokemon />
          </Dialog>
        </Hidden>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    isPokemonSelected: state.pokemon.isPokemonSelected,
  };
};

export default connect(mapStateToProps, {
  setSelectedPokemon,
  setIsPokemonSelected,
})(PokemonCard);
