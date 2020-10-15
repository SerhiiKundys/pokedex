import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  selectedPokemonContainer: {
    maxWidth: 220,
  },
});

const createData = (name, value) => ({ name, value });

const SelectedPokemon = ({ selectedPokemon }) => {
  const classes = useStyles();

  const rows = [
    createData("Type", selectedPokemon.types.join(", ")),
    createData("Attack", selectedPokemon.stats.attack),
    createData("Defense", selectedPokemon.stats.defense),
    createData("HP", selectedPokemon.stats.hp),
    createData("SP Attack", selectedPokemon.stats["special-attack"]),
    createData("SP Defense", selectedPokemon.stats["special-defense"]),
    createData("Speed", selectedPokemon.stats.speed),
    createData("Weight", selectedPokemon.weight),
    createData("Total moves", selectedPokemon.totalMoves),
  ];

  return (
    <Card className={classes.selectedPokemonContainer}>
      <CardContent align="center">
        <img src={selectedPokemon.img} alt="pokemon appearance" />
        <Typography variant="h6" gutterBottom>
          {selectedPokemon.name}
        </Typography>
        <TableContainer component={Paper} style={{ overflow: "hidden" }}>
          <Table size="small" aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedPokemon: state.pokemon.selectedPokemon,
  };
};

export default connect(mapStateToProps, null)(SelectedPokemon);
