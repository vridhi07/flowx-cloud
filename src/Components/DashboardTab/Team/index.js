import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Challenges from "./30DaysChallenges";
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F1F4F5",
    minHeight: "100vh",
    paddingLeft: "30px",
  },
  mobileroot:{
    backgroundColor: "#F1F4F5",
    minHeight: "100vh",
    paddingLeft: "8px",
  },
  titleContainer: {
    display: "flex",
    paddingTop: "30px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
  },
  activeTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#0687D9",
  },
  secondTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#4F4F4F",
    marginLeft: "22px",
  },
  session: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
  },
}));

const pageList = [
  {
    name: "Challenge",
    img: "/challenge.png",
  },
];

function Team() {
  const [selectSession, setSession] = useState("Challenge");
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const classes = useStyles();
  const handleSelectSetion = (name) => {
    setSession(name);
  };

  return (
    <div className={mobileMediaQuery ?classes.mobileroot : classes.root}>
      <div className={classes.titleContainer}>
        {pageList.map((val, i) => (
          <div
            key={i}
            className={`${classes.session} mx-3`}
            onClick={() => handleSelectSetion(val.name)}
          >
            <img src={val.img} alt="sessionIcon" height="45px" width="45px" />
            <p
              className={
                selectSession == val.name ? classes.activeTitle : classes.title
              }
            >
              {" "}
              {val.name}{" "}
            </p>
          </div>
        ))}
      </div>
      <div>
        {selectSession == "Challenge" ? (
          <Challenges
            // weeklyUserData={weeklyUserData?.length ? weeklyUserData : []}
            // dayWiseDatas={dayWiseData?.length ? dayWiseData : []}
          />
        ) : (
          <div>session</div>
        )}
      </div>
    </div>
  );
}
export default Team;
