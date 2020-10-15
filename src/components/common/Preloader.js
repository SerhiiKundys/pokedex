import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() => ({
  preloaderContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 100,
  },
}));

const Preloader = () => {
  const classes = useStyles();

  return (
    <div className={classes.preloaderContainer}>
      <CircularProgress />
    </div>
  );
};

export default Preloader;
