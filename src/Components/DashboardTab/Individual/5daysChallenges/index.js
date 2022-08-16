import React, { useEffect, useState } from "react";
import TotalCharts from "../30dayChallenges/TotalCharts";
import DayCharts from "./DayCharts";
// import WeeklyCharts from "../30dayChallenges/WeeklyCharts";
import { db } from "../../../../firebaseConfig";
import {
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
import Error from "next/error";

const useStyles = makeStyles((theme) => ({
  button_group: {
    height: "40px",
    boxShadow: "none",
    margin: "20px 0px",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 5px",
    width: "120px",
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
    width: "120px",
    borderRadius: "20px",
    marginLeft: "18px",
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
  selectItems: {
    fontSize: 12,
  },
}));
const tabList = ["Total", "Days"];

function FiveDaysChallenges({
  matches,
  allPhList,
  fedlist,
  handleSelectedChallenges,
  userData,
}) {
  const [avgOfAllSprintFedList, setAvgOfAllSprintFedList] = useState([]);
  const [avgOfAllSprintPhList, setAvgOfAllSprintPhList] = useState([]);
  const [selectTab, setSelectTab] = useState(0);
  const classes = useStyles();
  const [filter5days, setFilter5days] = React.useState("5 Days Challenge");

  const handleSelectTab = (index) => {
    setSelectTab(index);
  };
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");

  const handleSelectChange5days = (event) => {
    setFilter5days(event.target.value);
  };

  useEffect(() => {
    if (fedlist?.length) {
      let avgofAllSprintPerWeekOfFed = AvgofAllSprintsperWeek(fedlist);
      setAvgOfAllSprintFedList(avgofAllSprintPerWeekOfFed);
    } else {
      setAvgOfAllSprintFedList([]);
      setSelectTab(0);
    }
  }, [fedlist, setSelectTab]);

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
  }, [allPhList, setSelectTab]);

  useEffect(() => {
    handleSelectedChallenges(filter5days);
  }, [filter5days]);

  const get5daysOverviewData = async (userData) => {
    try {
      if (userData) {
        const events = await db
          .collection("Users")
          .doc(`${userData}`)
          .collection("WorkplaceWellness")
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.map((doc) => {
              const dataSet = doc.data();
              console.log(dataSet[0], dataSet[1], "kkkkkkkkkkkk");

              return doc.data();
            });
          });
        console.log("LOG 2", events);
        return events;
      }
    } catch (error) {
      console.log(error, "errorskkk");
    }
  };

  useEffect(() => {
    get5daysOverviewData(userData);
  }, []);

  return (
    <div>
      <div className={classes.select_group}>
        {" "}
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
          value={filter5days}
          onChange={handleSelectChange5days}
          data={["5 Days Challenge"]}
        />
      </div>

      {selectTab == 0 ? (
        <TotalCharts
          matches={matches}
          avgOfAllSprintFedList={avgOfAllSprintFedList}
          avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ) : (
        <DayCharts
          flowListForDailyGraph={flowListForDailyGraph}
          fedListForDailyGraph={fedListForDailyGraph}
          overallListForDailyGraph={overallListForDailyGraph}
          coherenceListForDailyGraph={coherenceListForDailyGraph}
          matches={matches}
          avgOfAllSprintFedList={avgOfAllSprintFedList}
          avgOfAllSprintPhList={avgOfAllSprintPhList}
          allPhList={allPhList}
          fedlist={fedlist}
        />
      )}
    </div>
  );
}
export default FiveDaysChallenges;
