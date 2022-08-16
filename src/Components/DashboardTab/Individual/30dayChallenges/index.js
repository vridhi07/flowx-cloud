import React, { useEffect, useState } from "react";
import TotalCharts from "./TotalCharts";
import DayCharts from "./DayCharts";
import WeeklyCharts from "./WeeklyCharts";
import {
  AllWeek,
  Weekly,
  fedListForDailyGraph,
  flowListForDailyGraph,
  overallListForDailyGraph,
  coherenceListForDailyGraph,
} from "../../../../Constant/challenges";
import calculateAvgOfPerWeekData from "../../../../Utils/CalculateAvgofPerWeekData";
import AvgofAllSprintsperWeek from "../../../../Utils/AvgofAllSprintsperWeek";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FilterSelect } from "../../filterSelect";

const useStyles = makeStyles((theme) => ({
  button_group: {
    height: "40px",
    boxShadow: "none",
    margin: "20px 0px",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 5px",
    width: "180px",
    borderRadius: "20px",
  },

  select_group: {
    display: "flex",
    gap: 12,
  },
  mobile_button_group: {
    height: "40px",
    boxShadow: "none",
    margin: "20px 0px",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 5px",
    width: "180px",
    borderRadius: "20px",
    marginLeft: "20px",
  },
  overview: {
    backgroundColor: "#FFF",
    borderColor: "none",
    border: "none",
    color: "#000",
    width: "50px",
    fontSize: "12px",
    lineHeight: "16px",
    "&:hover": {
      backgroundColor: "#FFF",
    },
  },
  active: {
    borderRadius: "50px",
    backgroundColor: theme.color.blue,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#ffff",
    border: "none",
    "&:hover": {
      backgroundColor: "#00A4E8",
      border: "none",
    },
  },
}));
const tabList = ["Total", "Weekly", "Days"];

function Challenges({ matches, allPhList, fedlist, handleSelectedChallenges }) {
  const [avgOfAllSprintFedList, setAvgOfAllSprintFedList] = useState([]);
  const [avgOfAllSprintPhList, setAvgOfAllSprintPhList] = useState([]);
  const [selectTab, setSelectTab] = useState(0);
  const classes = useStyles();
  const [filter30days, setFilter30days] = React.useState("30 Days Challenge");
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");
  const handleSelectTab = (index) => {
    setSelectTab(index);
  };

  const handleSelectChange30days = (event) => {
    setFilter30days(event.target.value);
  };
  useEffect(() => {
    if (fedlist?.length) {
      let avgofAllSprintPerWeekOfFed = AvgofAllSprintsperWeek(fedlist);
      setAvgOfAllSprintFedList(avgofAllSprintPerWeekOfFed);
    } else {
      setAvgOfAllSprintFedList([]);
    }
  }, [fedlist]);

  useEffect(() => {
    if (allPhList.length) {
      let allWeekPhList = [];
      allPhList.map((val) => {
        let weelyAvgPh = calculateAvgOfPerWeekData(
          val.ph,
          val.week,
          "Power Hour"
        );
        if (
          weelyAvgPh["sprint 0"] ||
          weelyAvgPh["sprint 1"] ||
          weelyAvgPh["sprint 2"] ||
          weelyAvgPh["sprint 3"] ||
          weelyAvgPh["sprint 4"]
        ) {
          allWeekPhList.push(weelyAvgPh);
        }
      });
      if (allWeekPhList.length) {
        let avgofAllSprintPerWeekOfPh = AvgofAllSprintsperWeek(allWeekPhList);
        setAvgOfAllSprintPhList(avgofAllSprintPerWeekOfPh);
      }
    } else {
      setAvgOfAllSprintPhList([]);
      setSelectTab(0);
    }
  }, [allPhList]);

  useEffect(() => {
    handleSelectedChallenges(filter30days);
  }, [filter30days]);

  return (
    <div>
      <div className={classes.select_group}>
        <div
          className={
            mobileMediaQuery
              ? classes.mobile_button_group
              : classes.button_group
          }
        >
          {tabList.map((val, index) => (
            <button
              onClick={() => handleSelectTab(index)}
              className={`${selectTab == index && classes.active} ${
                classes.overview
              }`}
            >
              {val}
            </button>
          ))}
        </div>

        <FilterSelect
          value={filter30days}
          onChange={handleSelectChange30days}
          data={["30 Days Challenge", "30 Days Challenge 1"]}
        />
      </div>
      {selectTab == 0 ? (
        <TotalCharts
          matches={matches}
          avgOfAllSprintFedList={avgOfAllSprintFedList}
          avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ) : selectTab == 1 ? (
        <WeeklyCharts
          AllWeek={AllWeek}
          Weekly={Weekly}
          matches={matches}
          avgOfAllSprintFedList={avgOfAllSprintFedList}
          avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ) : (
        <>
          <DayCharts
            matches={matches}
            avgOfAllSprintFedList={avgOfAllSprintFedList}
            avgOfAllSprintPhList={avgOfAllSprintPhList}
            allPhList={allPhList}
            fedlist={fedlist}
            fedListForDailyGraph={fedListForDailyGraph}
            flowListForDailyGraph={flowListForDailyGraph}
            overallListForDailyGraph={overallListForDailyGraph}
            coherenceListForDailyGraph={coherenceListForDailyGraph}
          />
        </>
      )}
    </div>
  );
}
export default Challenges;
