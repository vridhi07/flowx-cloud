import React, { useEffect, useState } from "react";
import WeeklyMultipleDataGraph from "../../../WeeklyMultipleDataGraph";
import { OverallChallenges } from "../../../../Constant/challenges";
import avgCalculation from "../../../../Utils/AvgCalculation";
import PercentageChanges from "../../../../Utils/PercentageChanges";
import weeklyData from '../../../../Utils/getWeeklyGraphData';
import useMediaQuery from '@mui/material/useMediaQuery';
function WeeklyCharts({
  avgOfAllSprintFedList,
  avgOfAllSprintPhList,
  AllWeek,
  Weekly,
  matches,
}) {
  const [allweekData, setAllWeekData] = useState([]);
  const [firstWeekpercentageData, setFirstWeekpercentageData] = useState({
    flow: 0,
    coherance: 0,
    flowPercentChange: 0,
    coherencePercentChange: 0,
    graphData: [],
  });

  const [secondWeekpercentageData, setSecondWeekpercentageData] = useState({
    flow: 0,
    coherance: 0,
    flowPercentChange: 0,
    coherencePercentChange: 0,
    graphData: [],
  });
  const [thirdWeekpercentageData, setThirdWeekpercentageData] = useState({
    flow: 0,
    coherance: 0,
    flowPercentChange: 0,
    coherencePercentChange: 0,
    graphData: [],
  });
  const [fourthWeekpercentageData, setFourthWeekpercentageData] = useState({
    flow: 0,
    coherance: 0,
    flowPercentChange: 0,
    coherencePercentChange: 0,
    graphData: [],
  });
  const [allWeekPercentageData, setAllWeekPercentageData] = useState({
    flow: 0,
    coherance: 0,
    flowPercentChange: 0,
    coherencePercentChange: 0,
    graphData: [],
  });

  useEffect(() => {
    if (allweekData.length) {
      let lastThreeWeekFlowList = [];
      let lastThreeWeekCoheranceList = [];
      let allWeekFlowList = [];
      let allWeekCoheranceList = [];
      allweekData.map((val) => {
        allWeekFlowList.push(val.flowPercent);
        allWeekCoheranceList.push(val.coherencePercent);
        if (val.week.split(" ").pop() > 1) {
          lastThreeWeekCoheranceList.push(val.coherencePercent);
          lastThreeWeekFlowList.push(val.flowPercent);
        }
      });
      let avgOfLastThreeWeekFlow = avgCalculation(lastThreeWeekFlowList);
      let avgOfLastThreeWeekCoherance = avgCalculation(
        lastThreeWeekCoheranceList
      );

      let avgOfAllWeekFlow = avgCalculation(allWeekFlowList);
      let avgOfAllWeekCoherance = avgCalculation(allWeekCoheranceList);

      let allWeekFlowPercentageChange = PercentageChanges(
        allweekData[0].flowPercent,
        avgOfLastThreeWeekFlow
      );
      let allWeekCoherancePercentageChange = PercentageChanges(
        allweekData[0].coherencePercent,
        avgOfLastThreeWeekCoherance
      );

      if (avgOfAllWeekFlow.length &&  avgOfAllWeekCoherance.length) {
        let allWeekData = weeklyData(
          AllWeek,
          avgOfAllWeekFlow,
          avgOfAllWeekCoherance,
          allWeekFlowPercentageChange ? allWeekFlowPercentageChange : 0,
          allWeekCoherancePercentageChange ? allWeekCoherancePercentageChange : 0
          );
           
        setAllWeekPercentageData({
          ...allWeekPercentageData,
          flow: avgOfAllWeekFlow,
          coherance: avgOfAllWeekCoherance,
          flowPercentChange: allWeekFlowPercentageChange ? allWeekFlowPercentageChange : 0,
          coherencePercentChange: allWeekCoherancePercentageChange ? allWeekCoherancePercentageChange : 0,
          graphData: allWeekData,
        });
      }
    }
  }, [allweekData]);

  useEffect(() => {
    if (avgOfAllSprintFedList?.length || avgOfAllSprintPhList?.length) {
      let weekList = ["Week 1", "Week 2", "Week 3", "Week 4"];
      let weekWiseDataList = [];
      weekList.map((val, i) => {
        if (avgOfAllSprintFedList[i] && avgOfAllSprintPhList[i]) {
          let weeklyData = {};
          let firstWeekFlowList = [];
          let firstWeekCoheranceList = [];
          firstWeekFlowList.push(avgOfAllSprintFedList[i].flowPercent);
          firstWeekFlowList.push(avgOfAllSprintPhList[i].flowPercent);
          firstWeekCoheranceList.push(
            avgOfAllSprintFedList[i].coherencePercent
          );
          firstWeekCoheranceList.push(avgOfAllSprintPhList[i].coherencePercent);
          let avgOfFirstWeekFlow = avgCalculation(firstWeekFlowList);
          let avgOfFirstWeekCoherance = avgCalculation(firstWeekCoheranceList);
          weeklyData.flowPercent = avgOfFirstWeekFlow;
          weeklyData.coherencePercent = avgOfFirstWeekCoherance;
          weeklyData.week = val;
          weekWiseDataList.push(weeklyData);
        }
      });
      weekWiseDataList.sort(function (a, b) {
        return a.week.split(" ").pop() - b.week.split(" ").pop();
      });
      setAllWeekData(weekWiseDataList);
      let firstWeekData = weeklyData(
        Weekly,
        weekWiseDataList[0]?.flowPercent ? weekWiseDataList[0]?.flowPercent : 0,
        weekWiseDataList[0]?.coherencePercent
          ? weekWiseDataList[0]?.coherencePercent
          : 0,
        0,
        0
      );

      setFirstWeekpercentageData({
        ...firstWeekpercentageData,
        flow: weekWiseDataList[0]?.flowPercent
          ? weekWiseDataList[0]?.flowPercent
          : 0,
        coherance: weekWiseDataList[0]?.coherencePercent
          ? weekWiseDataList[0]?.coherencePercent
          : 0,
        flowPercentChange: 0,
        coherencePercentChange: 0,
        graphData: firstWeekData,
      });

      let secondWeekFlowPercentageChange = 0;
      let secondWeekCoherancePercentageChange = 0;
      if (weekWiseDataList[1]?.flowPercent) {
        secondWeekFlowPercentageChange = PercentageChanges(
          weekWiseDataList[0]?.flowPercent,
          weekWiseDataList[1]?.flowPercent
            ? weekWiseDataList[1]?.flowPercent
            : 0
        );

        secondWeekCoherancePercentageChange = PercentageChanges(
          weekWiseDataList[0]?.coherencePercent,
          weekWiseDataList[1]?.coherencePercent
            ? weekWiseDataList[1]?.coherencePercent
            : 0
        );
      }
      let secondWeekData = weeklyData(
        Weekly,
        weekWiseDataList[1]?.flowPercent ? weekWiseDataList[1]?.flowPercent : 0,
        weekWiseDataList[1]?.coherencePercent
          ? weekWiseDataList[1]?.coherencePercent
          : 0,
        secondWeekFlowPercentageChange,
        secondWeekCoherancePercentageChange
      );
      setSecondWeekpercentageData({
        ...secondWeekpercentageData,
        flow: weekWiseDataList[1]?.flowPercent
          ? weekWiseDataList[1]?.flowPercent
          : 0,
        coherance: weekWiseDataList[1]?.coherencePercent
          ? weekWiseDataList[1]?.coherencePercent
          : 0,
        flowPercentChange: secondWeekFlowPercentageChange,
        coherencePercentChange: secondWeekCoherancePercentageChange,
        graphData: secondWeekData,
      });
      // }
      let thirdWeekFlowPercentageChange = 0;
      let thirdWeekCoherancePercentageChange = 0;
      if (weekWiseDataList[2]?.flowPercent) {
        thirdWeekFlowPercentageChange = PercentageChanges(
          weekWiseDataList[0]?.flowPercent,
          weekWiseDataList[2]?.flowPercent
        );
        thirdWeekCoherancePercentageChange = PercentageChanges(
          weekWiseDataList[0]?.coherencePercent,
          weekWiseDataList[2]?.coherencePercent
        );
      }
      let thirdWeekData = weeklyData(
        Weekly,
        weekWiseDataList[2]?.flowPercent ? weekWiseDataList[2]?.flowPercent : 0,
        weekWiseDataList[2]?.coherencePercent
          ? weekWiseDataList[2]?.coherencePercent
          : 0,
        thirdWeekFlowPercentageChange,
        thirdWeekCoherancePercentageChange
      );
      setThirdWeekpercentageData({
        ...thirdWeekpercentageData,
        flow: weekWiseDataList[2]?.flowPercent
          ? weekWiseDataList[2]?.flowPercent
          : 0,
        coherance: weekWiseDataList[2]?.coherencePercent
          ? weekWiseDataList[2]?.coherencePercent
          : 0,
        flowPercentChange: thirdWeekFlowPercentageChange,
        coherencePercentChange: thirdWeekCoherancePercentageChange,
        graphData: thirdWeekData,
      });
      // }

      let fourthWeekFlowPercentageChange = 0;
      let fourthWeekCoherancePercentageChange = 0;
      if (weekWiseDataList[3]?.flowPercent) {
        fourthWeekFlowPercentageChange = PercentageChanges(
          weekWiseDataList[0]?.flowPercent,
          weekWiseDataList[3]?.flowPercent
        );
        fourthWeekCoherancePercentageChange = PercentageChanges(
          weekWiseDataList[0]?.coherencePercent,
          weekWiseDataList[3]?.coherencePercent
        );
      }
      let fourthWeekData = weeklyData(
        Weekly,
        weekWiseDataList[3]?.flowPercent ? weekWiseDataList[3]?.flowPercent : 0,
        weekWiseDataList[3]?.coherencePercent
          ? weekWiseDataList[3]?.coherencePercent
          : 0,
        fourthWeekFlowPercentageChange,
        fourthWeekCoherancePercentageChange
      );
      setFourthWeekpercentageData({
        ...fourthWeekpercentageData,
        flow: weekWiseDataList[3]?.flowPercent
          ? weekWiseDataList[3].flowPercent
          : 0,
        coherance: weekWiseDataList[3]?.coherencePercent
          ? weekWiseDataList[3].coherencePercent
          : 0,
        flowPercentChange: fourthWeekFlowPercentageChange,
        coherencePercentChange: fourthWeekCoherancePercentageChange,
        graphData: fourthWeekData,
      });
      // }
    }
  }, [avgOfAllSprintFedList, avgOfAllSprintPhList]);


  const handleGraphData=()=>{
    return Weekly
  }
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const handleWellness = () => {};
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap justify-content-center":"d-flex flex-wrap"}>
    <WeeklyMultipleDataGraph
      matches={matches}
      handleWellness={handleWellness}
      graphData={fourthWeekpercentageData.graphData}
      cardName="Weekly 4"
      cardSize="small"
      cardCX={125}
      cardCY={125}
      percentageChangeData={fourthWeekpercentageData}
    />
    <WeeklyMultipleDataGraph
      matches={matches}
      handleWellness={handleWellness}
      graphData={thirdWeekpercentageData.graphData}
      cardName="Weekly 3"
      cardSize="small"
      cardCX={125}
      cardCY={125}
      percentageChangeData={thirdWeekpercentageData}
    />
    <WeeklyMultipleDataGraph
      matches={matches}
      handleWellness={handleWellness}
      graphData={secondWeekpercentageData.graphData}
      cardName="Weekly 2"
      cardSize="small"
      cardCX={125}
      cardCY={125}
      percentageChangeData={Weekly}
      percentageChangeData={secondWeekpercentageData}
    />
    <WeeklyMultipleDataGraph
      matches={matches}
      handleWellness={handleWellness}
      graphData={firstWeekpercentageData.graphData}
      cardName="Weekly 1"
      cardSize="small"
      cardCX={125}
      cardCY={125}
      percentageChangeData={firstWeekpercentageData}
    />
  </div>
    // <div className="row g-0">
    //   <div className="col-4">
    //     <WeeklyMultipleDataGraph
    //       matches={matches}
    //       handleWellness={handleWellness}
    //       // graphData={allWeekPercentageData.graphData}
    //       graphData={handleGraphData()} 
    //       cardName="Weekly"
    //       cardSize="large"
    //       cardCX={150}
    //       cardCY={170}
    //       percentageChangeData={allWeekPercentageData}
    //     />
    //   </div>
    //   <div className="col-8">
      
    //   </div>
    // </div>
  );
}
export default WeeklyCharts;
