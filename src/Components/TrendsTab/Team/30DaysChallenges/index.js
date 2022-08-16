import React, { useEffect, useState } from "react";
import TotalCharts from "./TotalCharts";
import DayCharts from "./DayCharts";
import WeeklyCharts from "./WeeklyCharts";
import avgCalculation from '../../../../Utils/AvgCalculation';
import PercentageChanges from "../../../../Utils/PercentageChanges";
import {Weekly,fedListForDailyGraph,flowListForDailyGraph,overallListForDailyGraph,coherenceListForDailyGraph} from "../../../../Constant/challenges";
import { makeStyles } from "@mui/styles";
import useGetIndiviuallyUserDataOfTeams from "../../../../CustomHooks/useGetIndiviuallyUserDataOfTeams";

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

function Challenges({ matches }) {
  const [selectTab, setSelectTab] = useState(0);
  const [weeklyAvgData, setWeeklyAvgData] = useState([])
  const [weeklyUserData, dayWiseData,avgFedSPrints,avgPhSPrints,allWeekPhData,allWeekFedData] = useGetIndiviuallyUserDataOfTeams('30 Days Challenge');

  const weeklyAvg = (data) =>{
      let flowValueList = []
      let coheranceValueList = []
      let avgAllData ={
      }

    data.map(val =>{
        flowValueList.push(val.flowPercent)
        coheranceValueList.push(val.coherencePercent)
    })
    let avgFlow = avgCalculation(flowValueList)
    let avgCoherance = avgCalculation(coheranceValueList)
    avgAllData.flowPercent = avgFlow
    avgAllData.coherencePercent = avgCoherance
    avgAllData.week = data[0]?.week
    return avgAllData
  }

  const getPercentageChangeValue = (userData) => {

    let updatedDataWithPercentangeChange =
      userData.length &&
      userData?.map((kl) => {
        if (kl.week !== "Week 1") {
          let flowPercentageChange = PercentageChanges(
            userData[0].flowPercent,
            kl.flowPercent
          );
          let coherencePercentChange = PercentageChanges(
            userData[0].coherencePercent,
            kl.coherencePercent
          );
          return {
            ...kl,
            flowPercentageChange: flowPercentageChange,
            coherencePercentChange: coherencePercentChange,
          };
        } else {
          return {
            ...kl,
            flowPercentageChange: 0,
            coherencePercentChange: 0,
          };
        }
      });

    return updatedDataWithPercentangeChange;
  };

  useEffect(() => {
    if (weeklyUserData?.length) {
      let firstWeekData = [];
      let secondWeekData = [];
      let thirdWeekData = [];
      let fourthWeekData = [];
      let allWeeklyData = []
      weeklyUserData.map((val) => {
        let firstWeek = val.dataItem.find((kl) => kl.week == "Week 1");
        if (firstWeek) {
          firstWeekData.push(firstWeek);
        }
        let secondWeek = val.dataItem.find((kl) => kl.week == "Week 2");
        if (secondWeek) {
          secondWeekData.push(secondWeek);
        }
        let thirdWeek = val.dataItem.find((kl) => kl.week == "Week 3");
        if (thirdWeek) {
            thirdWeekData.push(thirdWeek);
        }
        let fourthWeek = val.dataItem.find((kl) => kl.week == "Week 4");
        if (fourthWeek) {
          fourthWeekData.push(fourthWeek);
        }
      });

      allWeeklyData.push(weeklyAvg(firstWeekData))
      allWeeklyData.push(weeklyAvg(secondWeekData))
      allWeeklyData.push(weeklyAvg(thirdWeekData))
      allWeeklyData.push(weeklyAvg(fourthWeekData))

      let finalData = getPercentageChangeValue(allWeeklyData)
      setWeeklyAvgData(finalData)
    }
  }, [weeklyUserData]);

  const handleSelectTab = (index) => {
    setSelectTab(index);
  };

  //dayDataCalculation 

  const classes = useStyles();
  return (
    <div>
      <div className={classes.button_group}>
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
      {selectTab == 0 ? (
        <TotalCharts
          matches={matches}
            weeklyAvgData={weeklyAvgData}
          //   avgOfAllSprintFedList={avgOfAllSprintFedList}
          //   avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ) : selectTab == 1 ? (
        <WeeklyCharts
          //   matches={matches}
          //   AllWeek={AllWeek}
          weeklyAvgData={weeklyAvgData}
          Weekly={Weekly}
          //   avgOfAllSprintFedList={avgOfAllSprintFedList}
          //   avgOfAllSprintPhList={avgOfAllSprintPhList}
        />
      ) : (
        <DayCharts
          matches={matches}
          avgOfAllSprintFedList={allWeekFedData ? allWeekFedData : []}
          avgOfAllSprintPhList={allWeekPhData ? allWeekPhData : []}
          allPhList={avgPhSPrints ? avgPhSPrints : []}
          fedlist={avgFedSPrints ? avgFedSPrints : []}
          fedListForDailyGraph={fedListForDailyGraph}
          flowListForDailyGraph={flowListForDailyGraph}
          overallListForDailyGraph={overallListForDailyGraph}
          coherenceListForDailyGraph={coherenceListForDailyGraph}
        />
      )}
    </div>
  );
}
export default Challenges;
