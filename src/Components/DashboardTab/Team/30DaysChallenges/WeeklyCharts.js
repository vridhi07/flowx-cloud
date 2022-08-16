import React, { useEffect, useState } from "react";
import WeeklyMultipleDataGraph from "../../../WeeklyMultipleDataGraph";
import weeklyData from '../../../../Utils/getWeeklyGraphData';
import useMediaQuery from '@mui/material/useMediaQuery';
function WeeklyCharts({
  Weekly,
  matches,
  weeklyAvgData
}) {
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


  useEffect(() =>{
    if(weeklyAvgData?.length){
      let firstWeekData = weeklyData(
        Weekly,
        weeklyAvgData[0]?.flowPercent ? weeklyAvgData[0]?.flowPercent : 0,
        weeklyAvgData[0]?.coherencePercent
          ? weeklyAvgData[0]?.coherencePercent
          : 0,
        0,
        0
      );

      setFirstWeekpercentageData({
        ...firstWeekpercentageData,
        flow: weeklyAvgData[0]?.flowPercent
          ? weeklyAvgData[0]?.flowPercent
          : 0,
        coherance: weeklyAvgData[0]?.coherencePercent
          ? weeklyAvgData[0]?.coherencePercent
          : 0,
        flowPercentChange: 0,
        coherencePercentChange: 0,
        graphData: firstWeekData,
      }); 

      let secondWeekData = weeklyData(
        Weekly,
        weeklyAvgData[1]?.flowPercent ? weeklyAvgData[1]?.flowPercent : 0,
        weeklyAvgData[1]?.coherencePercent
          ? weeklyAvgData[1]?.coherencePercent
          : 0,
          weeklyAvgData[1]?.flowPercentageChange ? weeklyAvgData[1]?.flowPercentageChange : 0,
        weeklyAvgData[1]?.coherencePercentChange
        ? weeklyAvgData[1]?.coherencePercentChange
        : 0,
      );
      setSecondWeekpercentageData({
        ...secondWeekpercentageData,
        flow: weeklyAvgData[1]?.flowPercent
          ? weeklyAvgData[1]?.flowPercent
          : 0,
        coherance: weeklyAvgData[1]?.coherencePercent
          ? weeklyAvgData[1]?.coherencePercent
          : 0,
        flowPercentChange: weeklyAvgData[1]?.flowPercentageChange
        ? weeklyAvgData[1]?.flowPercentageChange
        : 0,
        coherencePercentChange: weeklyAvgData[1]?.coherencePercentChange
        ? weeklyAvgData[1]?.coherencePercentChange
        : 0,
        graphData: secondWeekData,
      });

      let thirdWeekData = weeklyData(
        Weekly,
        weeklyAvgData[2]?.flowPercent ? weeklyAvgData[2]?.flowPercent : 0,
        weeklyAvgData[2]?.coherencePercent
          ? weeklyAvgData[2]?.coherencePercent
          : 0,
          weeklyAvgData[2]?.flowPercentageChange ? weeklyAvgData[2]?.flowPercentageChange : 0,
          weeklyAvgData[2]?.coherencePercentChange ? weeklyAvgData[2]?.coherencePercentChange : 0,
      );
      setThirdWeekpercentageData({
        ...thirdWeekpercentageData,
        flow: weeklyAvgData[2]?.flowPercent
          ? weeklyAvgData[2]?.flowPercent
          : 0,
        coherance: weeklyAvgData[2]?.coherencePercent
          ? weeklyAvgData[2]?.coherencePercent
          : 0,
        flowPercentChange:  weeklyAvgData[2]?.flowPercentageChange
        ? weeklyAvgData[2]?.flowPercentageChange
        : 0,
        coherencePercentChange:  weeklyAvgData[2]?.coherencePercentChange
        ? weeklyAvgData[2]?.coherencePercentChange
        : 0,
        graphData: thirdWeekData,
      });

      let fourthWeekData = weeklyData(
        Weekly,
        weeklyAvgData[3]?.flowPercent ? weeklyAvgData[3]?.flowPercent : 0,
        weeklyAvgData[3]?.coherencePercent
          ? weeklyAvgData[3]?.coherencePercent
          : 0,
          weeklyAvgData[3]?.flowPercentageChange ? weeklyAvgData[3]?.flowPercentageChange : 0,
          weeklyAvgData[3]?.coherencePercentChange
          ? weeklyAvgData[3]?.coherencePercentChange
          : 0,
      );
      setFourthWeekpercentageData({
        ...fourthWeekpercentageData,
        flow: weeklyAvgData[3]?.flowPercent
          ? weeklyAvgData[3].flowPercent
          : 0,
        coherance: weeklyAvgData[3]?.coherencePercent
          ? weeklyAvgData[3].coherencePercent
          : 0,
        flowPercentChange:  weeklyAvgData[3]?.flowPercentageChange
        ? weeklyAvgData[3].flowPercentageChange
        : 0,
        coherencePercentChange:  weeklyAvgData[3]?.coherencePercentChange
        ? weeklyAvgData[3].coherencePercentChange
        : 0,
        graphData: fourthWeekData,
      });
    }

  },[weeklyAvgData])
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const handleWellness = () => {};
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap justify-content-center" :"d-flex flex-wrap"}>
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
