import React from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  horizentalRow : {
    border: '1px solid #CBD4DA',
    margin : '20px 0px',
  },
  designFooter:{
    padding:' 0px 20px'
  },
  footerPolicy :{
    fontSize : '15px',
    fontWeight : '700',
    color : '#4F4F4F'
  },
  footerTradeMark : {
    fontSize : '13px',
    fontWeight : '700',
    color : '#CBD4DA'
  }
}));
 function SidebarFooter() {
  const classes = useStyles();
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <div  className={matches ? classes.designFooter : ''}>
      <hr className={classes.horizentalRow} />
      <div className="d-flex">
        <div className={classes.footerPolicy}>Privacy Policy contact us</div>
        <div className="d-flex">
          <img
            src={"/mailIcon.png"}
            alt="mailIcon"
            height="30px"
            width="30px"
          />
          <img
            src={"/twitterIcon.png"}
            alt="mailIcon"
            height="30px"
            width="30px"
          />
        </div>
      </div>
        <div className={`my-3 ${classes.footerTradeMark}`}> © 2021 FocusBand is a registered Trademark of FocusBand Technologies (T 2 Green Pty Ltd)
       </div>
    </div>
  );
}

export default SidebarFooter
