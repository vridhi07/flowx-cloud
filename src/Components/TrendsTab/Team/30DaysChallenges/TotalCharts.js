import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
import avgCalculation from "../../../../Utils/AvgCalculation";
import useMediaQuery from '@mui/material/useMediaQuery';
import { CoheranceTotal, FlowTotal } from "../../../../Constant/challenges";

const useStyles = makeStyles((themes) => ({}));

function TotalCharts({ matches, weeklyAvgData }) {
  const classes = useStyles();
  const [updatedFLowData, setUpdatedFLowData] = useState([]);
  const [updateCoheranceData, setUpdateCoheranceData] = useState([]);
  const [updateOverallData, setUpdateOverallData] = useState([]);

  useEffect(() => {
    if (weeklyAvgData?.length) {
      let flowPercentList = [];
      let flowPercentChangeList = [];
      let coherancePercentageList = [];
      weeklyAvgData.map((val) => {
        flowPercentList.push(val.flowPercent);
        coherancePercentageList.push(val.coherencePercent);
        flowPercentChangeList.push(val.flowPercentageChange);
      });
      let allWeekFlowAvg = avgCalculation(flowPercentList);
      let allWeekCoheranceAvg = avgCalculation(coherancePercentageList);
      let flowPercentChangeMaxValue = Math.max(...flowPercentChangeList);

      const updatedfedGraph = FlowTotal[0].dataItem.map((val, index) => {
        return {
          ...val,
          data: [
            {
              name: "Group A",
              value: 100 - allWeekFlowAvg,
            },
            {
              name: "Group B",
              value: allWeekFlowAvg,
            },
          ],
        };
      });
      let updateFlowGraphData = FlowTotal.map((el) => {
        return {
          ...el,
          dataItem: updatedfedGraph,
        };
      });
      setUpdatedFLowData(updateFlowGraphData)


      const updatedOverAllGraph = FlowTotal[0].dataItem.map((val, index) => {
        return {
          ...val,
          data: [
            {
              name: "Group A",
              value: 100 - flowPercentChangeMaxValue,
            },
            {
              name: "Group B",
              value: flowPercentChangeMaxValue,
            },
          ],
        };
      });
      let updateOverAllDataGraph = FlowTotal.map((el) => {
        return {
          ...el,
          dataItem: updatedOverAllGraph,
        };
      });
      setUpdateOverallData(updateOverAllDataGraph)

      //coherance

      const updatedCoheranceGraph = CoheranceTotal[0].dataItem.map(
        (val, index) => {
          return {
            ...val,
            data: [
              {
                name: "Group A",
                value: 100 - allWeekCoheranceAvg,
              },
              {
                name: "Group B",
                value: allWeekCoheranceAvg,
              },
            ],
          };
        }
      );
      let updateCoheranceGraphhData = CoheranceTotal.map((el) => {
        return {
          ...el,
          dataItem: updatedCoheranceGraph,
        };
      });
      setUpdateCoheranceData(updateCoheranceGraphhData)
    }
  }, [weeklyAvgData]);
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const handleWorkplaceWellness = () => {};
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap justify-content-center" :"d-flex flex-wrap"}>
      <MultipleDataGraph
        matches={matches}
        handleWellness={handleWorkplaceWellness}
        graphData={updateOverallData.length ? updateOverallData : FlowTotal}
        goal={"Goal 20%"}
      />

      <MultipleDataGraph
        matches={matches}
        handleWellness={handleWorkplaceWellness}
        graphData={updatedFLowData.length ? updatedFLowData : FlowTotal}
        goal={"Goal 30-50 %"}
      />

      <MultipleDataGraph
        matches={matches}
        handleWellness={handleWorkplaceWellness}
        graphData={
          updateCoheranceData.length ? updateCoheranceData : CoheranceTotal
        }
        goal={"Goal 30-50 %"}
      />
    </div>
  );
}
export default TotalCharts;
