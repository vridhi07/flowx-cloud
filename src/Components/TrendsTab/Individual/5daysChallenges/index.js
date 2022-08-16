import React, { useEffect, useState } from "react";
import TotalCharts from "../30dayChallenges/TotalCharts";
import DayCharts from "./DayCharts";
// import WeeklyCharts from "../30dayChallenges/WeeklyCharts";
import {fedListForDailyGraph,flowListForDailyGraph,overallListForDailyGraph,coherenceListForDailyGraph} from "../../../../Constant/challenges";
import calculateAvgOfPerWeekData from "../../../../Utils/CalculateAvgofPerWeekData";
import AvgofAllSprintsperWeek from "../../../../Utils/AvgofAllSprintsperWeek";
import { makeStyles } from "@mui/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    button_group: {
      height: "40px",
      boxShadow: "none",
      margin : '20px 0px',
      backgroundColor : '#FFF',
      display : 'flex',
      justifyContent : 'space-between',
      padding : '5px 5px',
      width : '120px',
      borderRadius : '20px'
    },
    mobile_button_group: {
      height: "40px",
      boxShadow: "none",
      margin : '20px 0px',
      backgroundColor : '#FFF',
      display : 'flex',
      justifyContent : 'space-between',
      padding : '5px 5px',
      width : '120px',
      borderRadius : '20px',
      marginLeft:'18px',
    },
    overview: {
      backgroundColor: "#FFF",
      borderColor: "none",
      border : 'none',
      color: "#000",
      width : '50px',
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
const tabList = ['Total','Days']

function FiveDaysChallenges({  matches, allPhList, fedlist }) {
  const [avgOfAllSprintFedList, setAvgOfAllSprintFedList] = useState([]);
  const [avgOfAllSprintPhList, setAvgOfAllSprintPhList] = useState([]);
  const [selectTab , setSelectTab] = useState(0)

  useEffect(() => {
    if (fedlist?.length) {
      let avgofAllSprintPerWeekOfFed = AvgofAllSprintsperWeek(fedlist);
      setAvgOfAllSprintFedList(avgofAllSprintPerWeekOfFed);
    }else{
      setAvgOfAllSprintFedList([])
      setSelectTab(0)

    }
  }, [fedlist,setSelectTab]);

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
    }else{
      setAvgOfAllSprintPhList([])
      setSelectTab(0)
    }
  }, [allPhList,setSelectTab]);

const handleSelectTab = (index) =>{
  setSelectTab(index)
}
const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const classes = useStyles()
  return (
    <div>
      <div
       className={mobileMediaQuery?classes.mobile_button_group:classes.button_group}
      >
        {tabList.map((val,index) =>(
           <button
           onClick={() => handleSelectTab(index)}
           className={`${selectTab == index && classes.active} ${classes.overview
             }`}
         >
           {val}
         </button>
        ))}
      </div>
      {selectTab == 0 ? (
        <TotalCharts
          matches={matches}
          avgOfAllSprintFedList={avgOfAllSprintFedList}
          avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ): (
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
