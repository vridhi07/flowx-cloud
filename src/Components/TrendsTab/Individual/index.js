import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Challenges from "./30dayChallenges";
import FiveDaysChallenges from "./5daysChallenges";
import Overall from "./Overall";
import useMediaQuery from "@mui/material/useMediaQuery";
import WorkPlaceWellnessGraph from "./workplaceWellness";
import PersonalWellnessGraph from "./PersonalWellness";

const useStyles = makeStyles((theme) => ({
  individualdiv: {
    backgroundColor: "#F1F4F5",
    minHeight: "100vh",
    paddingLeft: "30px",
  },
  mobileIndividual: {
    backgroundColor: "#F1F4F5",
    minHeight: "100vh",
    paddingLeft: "8px",
  },
  titleContainer: {
    display: "flex",
    paddingTop: "30px",
  },
  title: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#AEAEAE",
    textAlign: "center",
  },
  activeTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#0687D9",
    textAlign: "center",
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
    margin: "0px 10px",
    width: "100px",
  },
}));

const pageList = [
  {
    name: "Overall",
    img: "/overall_icon.png",
  },
  {
    name: "Workplace Wellness",
    img: "/workplace_wellness_icon.png",
  },
  {
    name: "30 Days Challenge",
    img: "/challenge.png",
  },
  {
    name: "5 Days Challenge",
    img: "/5daysChallenges_icon.png",
  },
  {
    name: "Personal Wellness",
    img: "/personal_wellness_icon.png",
  },
];

function Individual({ matches, allPhList, fedlist, handleSelectedChallenges }) {
  const [selectSession, setSession] = useState("Overall");
  const classes = useStyles();
  const handleSelectSetion = (name) => {
    setSession(name);
    handleSelectedChallenges(name);
  };
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");
  return (
    <div
      className={
        mobileMediaQuery ? classes.mobileIndividual : classes.individualdiv
      }
    >
      <div className={classes.titleContainer}>
        {pageList.map((val) => (
          <div
            className={
              mobileMediaQuery
                ? `${classes.session} mx-0`
                : `${classes.session} mx-3`
            }
            onClick={() => handleSelectSetion(val.name)}
          >
            <img src={val.img} alt="sessionIcon" height="45px" width="45px" />
            {mobileMediaQuery ? (
              <p
                className={
                  selectSession == val.name
                    ? classes.activeTitle
                    : classes.title
                }
              >
                {" "}
                {val.name}{" "}
              </p>
            ) : (
              <p
                className={
                  selectSession == val.name
                    ? classes.activeTitle
                    : classes.title
                }
              >
                {" "}
                {val.name}{" "}
              </p>
            )}
          </div>
        ))}
      </div>
      <div>
        {selectSession == "30 Days Challenge" ? (
          <Challenges
            matches={matches}
            allPhList={allPhList}
            fedlist={fedlist}
          />
        ) : selectSession == "5 Days Challenge" ? (
          <FiveDaysChallenges
            matches={matches}
            allPhList={allPhList}
            fedlist={fedlist}
          />
        ) : selectSession == "Overall" ? (
          <Overall />
        ) : selectSession == "Personal Wellness" ? (
          <PersonalWellnessGraph />
        ) : (
          <WorkPlaceWellnessGraph />
        )}
      </div>
    </div>
  );
}
export default Individual;
