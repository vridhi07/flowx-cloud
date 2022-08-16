import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@mui/styles";
import { InputType } from "./inputtype";

const useStyles = makeStyles((theme) => ({
  formControl: {
    alignItems: "baseline",
    marginTop: "20px !important",
  },

  selectItems: {
    fontSize: "12px !important",
  },
}));

export const FilterSelect = ({ value, onChange, data }) => {
  const classes = useStyles();
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          value={value}
          onChange={onChange}
          input={<InputType />}
          className={classes.selectItems}
        >
          {data.map((datas, key) => {
            return (
              <MenuItem value={datas} className={classes.selectItems}>
                Challenge {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};
