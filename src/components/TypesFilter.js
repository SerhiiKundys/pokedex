import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { setSelectedTypes, setIsFilterOpened } from "../redux/actions/actions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const TypesFilter = ({
  types,
  isOpened,
  setSelectedTypes,
  setIsFilterOpened,
}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedTypes({ type: event.target.name, value: event.target.checked });
  };

  return (
    <Dialog
      onClose={() => setIsFilterOpened(false)}
      aria-labelledby="dialog-title"
      open={isOpened}
    >
      <DialogTitle id="dialog-title">Types filter</DialogTitle>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormGroup>
            {Object.keys(types).map((type) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={types[type]}
                    onChange={handleChange}
                    name={type}
                  />
                }
                label={type}
                key={type}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpened: state.filter.isOpened,
    types: state.filter.types,
  };
};

export default connect(mapStateToProps, {
  setSelectedTypes,
  setIsFilterOpened,
})(TypesFilter);
