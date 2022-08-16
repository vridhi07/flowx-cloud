import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { db } from "../../firebaseConfig";

const useStyles = makeStyles((themes) => ({
  root: {
    marginBottom: "25px",
  },
  breadcrumb: {
    color: "#00A4E8",
    fontSize: "14px",
    lineHeight: "16px",
    "& span": {
      color: "#000000",
    },
    marginBottom: "25px",
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
  span: {
    paddingLeft : '10px',
    cursor : 'pointer'
  },
  back :{
   cursor : 'pointer',
   padding : '10px 0px 20px 0px'
  }
}));

function GroupHead({handleBackOrganization}) {
  const classes = useStyles();



  useEffect(() =>{

  },[])
 
  return (
    <div className={`${classes.root} mx-3`}>
      <img  className={classes.back}  src={"/back.png"} 
        onClick={handleBackOrganization}
        />
      <div className={classes.breadcrumb}>
        <span> Add Team & Participants</span>{" "}
      </div>
    </div>
  );
}
export default GroupHead;
