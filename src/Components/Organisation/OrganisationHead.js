import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((themes) => ({
  root: {
    paddingTop: "10px",
    marginBottom: "25px",
  },
  breadcrumb: {
    color: "#00A4E8",
    fontSize: "14px",
    lineHeight: "16px",
    "& span": {
      color: "#000000",
    },
  },
  pageTitle: {
    color: "#4F4F4F",
    fontSize: "30px",
    lineHeight: "35px",
    paddingTop: "10px",
  },
  group: {
    marginLeft: "12px",
  },
}));
function OrganisationHead() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.breadcrumb}>
        <span> Add Organisation & Participants</span>{" "}
      </div>
      {/* <div className={classes.pageTitle}> <img src={"/back.png"}/><span className={classes.group}>Group</span></div> */}
    </div>
  );
}
export default OrganisationHead;
