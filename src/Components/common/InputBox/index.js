import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  inputBox: {
    border: `1px solid ${theme.color.greyLight}`,
    borderRadius: 5,
    padding: "5px 0px",
    outline: "none",
    width : '80px'
  },
}));

const InputBox = (props) => {
  const { onChange, value, className } = props;
  const classes = useStyles();
  return (
    <input
      className={`${classes.inputBox} ${className ? className : ""}`}
      onChange={(e) =>onChange(e)}
      value={value}
    />
  );
};

export default InputBox;
