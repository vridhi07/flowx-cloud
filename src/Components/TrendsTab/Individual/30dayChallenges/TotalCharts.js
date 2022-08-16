import React, { useEffect, useState } from "react";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
// import MultipleDataGraph from "../../../dashboard/DashboardPage/MultipleDataGraph";
import {
  OverallChallenges,
  CoheranceTotal,
  FlowTotal,
} from "../../../../Constant/challenges";
import avgCalculation from "../../../../Utils/AvgCalculation";
import PercentageChanges from "../../../../Utils/PercentageChanges";
import useMediaQuery from '@mui/material/useMediaQuery';

function TotalCharts({ avgOfAllSprintFedList, avgOfAllSprintPhList, matches }) {
  const [avgOfAllWeekFedFlow, setAvgOfAllWeekFedFlow] = useState(0);
  const [avgOfAllWeekFedCoherance, setAvgOfAllWeekFedCoherance] = useState(0);
  const [fedFLowPercentageChanges, setFedFLowPercentageChanges] = useState(0);
  const [fedCoherancePercentageChanges, setFedCoherancePercentageChanges] =
    useState(0);
  const [avgOfAllWeekPhFlow, setAvgOfAllWeekPhFlow] = useState(0);
  const [avgOfAllWeekPhCoherance, setAvgOfAllWeekPhCoherance] = useState(0);
  const [phFlowPercentageChanges, setphFlowPercentageChanges] = useState(0);
  const [phCoherancePercentageChanges, setPhCoherancePercentageChanges] =
    useState(0);
  const [updatedFLowData, setUpdatedFLowData] = useState([]);
  const [updateCoheranceData, setUpdateCoheranceData] = useState([]);
  const [updateOverallData, setUpdateOverallData] = useState([]);

  useEffect(() => {
    if (avgOfAllSprintFedList.length) {
      let lastThirdweekFlowPrcentage = [];
      let lastThirdweekCoherancePrcentage = [];
      let allweekFlowPrcentage = [];
      let allweekCoherancePrcentage = [];
      avgOfAllSprintFedList.map((val,index) => {
        allweekFlowPrcentage.push(val.flowPercent);
        allweekCoherancePrcentage.push(val.coherencePercent);
        if (val.week.split(" ").pop() > 1) {
          lastThirdweekCoherancePrcentage.push(val.coherencePercent);
          lastThirdweekFlowPrcentage.push(val.flowPercent);
        }
      });
      let avgOfLastThreeWeekFlowPrcentage = avgCalculation(
        lastThirdweekFlowPrcentage
      );
      let avgOfLastThreeWeekCoherancePrcentage = avgCalculation(
        lastThirdweekCoherancePrcentage
      );
      let avgOfAllWeekFlowPrcentage = avgCalculation(allweekFlowPrcentage);
      let avgOfAllWeekCoherancePrcentage = avgCalculation(
        allweekCoherancePrcentage
      );
      setAvgOfAllWeekFedFlow(avgOfAllWeekFlowPrcentage);
      setAvgOfAllWeekFedCoherance(avgOfAllWeekCoherancePrcentage);
      // FedFlowPercentage
      if (avgOfLastThreeWeekFlowPrcentage) {
        let fedFlowPercentageChange = PercentageChanges(
          avgOfAllSprintFedList[0].flowPercent,
          avgOfLastThreeWeekFlowPrcentage
        );
        setFedFLowPercentageChanges(fedFlowPercentageChange);
      }
      //FedCoherancePercentage
      if (avgOfLastThreeWeekCoherancePrcentage) {
        let fedCoherancePercentageChange = PercentageChanges(
          avgOfAllSprintFedList[0].coherencePercent,
          avgOfLastThreeWeekCoherancePrcentage
        );
        setFedCoherancePercentageChanges(fedCoherancePercentageChange);
      }
    }else{
      setAvgOfAllWeekFedFlow(0);
      setAvgOfAllWeekFedCoherance(0);
      setFedCoherancePercentageChanges(0);
      setFedFLowPercentageChanges(0);


    }
  }, [avgOfAllSprintFedList]);

  useEffect(() => {
    if (avgOfAllSprintPhList.length) {
      let lastThreeWeekPhFlow = [];
      let lastThreeWeekPhCoherance = [];
      let allWeekPhFlowList = [];
      let allWeekPhCoheranceList = [];
      avgOfAllSprintPhList.map((val) => {
        allWeekPhFlowList.push(val.flowPercent);
        allWeekPhCoheranceList.push(val.coherencePercent);
        if (val.week.split(" ").pop() > 1) {
          lastThreeWeekPhCoherance.push(val.coherencePercent);
          lastThreeWeekPhFlow.push(val.flowPercent);
        }
      });
      let avgOfLastThreeWeekPhFlow = avgCalculation(lastThreeWeekPhFlow);
      let avgOfLastThreeWeekPhCoherance = avgCalculation(
        lastThreeWeekPhCoherance
      );

      let avgOfAllWeekPhFlow = avgCalculation(allWeekPhFlowList);
      let avgOfAllWeekPhCoherance = avgCalculation(allWeekPhCoheranceList);
      setAvgOfAllWeekPhFlow(avgOfAllWeekPhFlow);
      setAvgOfAllWeekPhCoherance(avgOfAllWeekPhCoherance);

      if (avgOfLastThreeWeekPhFlow) {
        let phFlowPercentageChange = PercentageChanges(
          avgOfAllSprintPhList[0].flowPercent,
          avgOfLastThreeWeekPhFlow
        );
        setphFlowPercentageChanges(phFlowPercentageChange);
      }
      if (avgOfLastThreeWeekPhCoherance) {
        let phCoherancePercentageChange = PercentageChanges(
          avgOfAllSprintPhList[0].coherencePercent,
          avgOfLastThreeWeekPhCoherance
        );
        setPhCoherancePercentageChanges(phCoherancePercentageChange);
      }
    }else {
      setAvgOfAllWeekPhFlow(0);
      setAvgOfAllWeekPhCoherance(0);
      setPhCoherancePercentageChanges(0);
      setphFlowPercentageChanges(0);
    }
  }, [avgOfAllSprintPhList]);

  useEffect(() => {
    if (avgOfAllWeekFedFlow && avgOfAllWeekPhFlow) {
      const totalAvgFlow = (avgOfAllWeekFedFlow + avgOfAllWeekPhFlow) / 2;
      const totalAvgCoherance =
        (avgOfAllWeekFedCoherance + avgOfAllWeekPhCoherance) / 2;
      const totalFlowPercentageChange =
        (fedFLowPercentageChanges + phFlowPercentageChanges) / 2;
      const totalCohernacePercentageChange =
        (fedCoherancePercentageChanges + phCoherancePercentageChanges) / 2;

      const updatedfedGraph = FlowTotal[0].dataItem.map((val, index) => {
        return {
          ...val,
          data: [
            {
              name: "Group A",
              value: 100 - totalAvgFlow,
            },
            {
              name: "Group B",
              value: totalAvgFlow,
            },
          ],
        };
      });
      let updateFlowGraphhData = FlowTotal.map((el) => {
        return {
          ...el,
          dataItem: updatedfedGraph,
        };
      });
      setUpdatedFLowData(updateFlowGraphhData);

      const updatedCoheranceGraph = CoheranceTotal[0].dataItem.map(
        (val, index) => {
          return {
            ...val,
            data: [
              {
                name: "Group A",
                value: 100 - totalAvgCoherance,
              },
              {
                name: "Group B",
                value: totalAvgCoherance,
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
      setUpdateCoheranceData(updateCoheranceGraphhData);

      const updatedOverallGraph = OverallChallenges[0].dataItem.map(
        (val, index) => {
          return {
            ...val,
            data: [
              {
                name: "Group A",
                value: 100 - totalFlowPercentageChange,
              },
              {
                name: "Group B",
                value: totalFlowPercentageChange,
              },
            ],
          };
        }
      );
      let updateOverallGraphhData = OverallChallenges.map((el) => {
        return {
          ...el,
          dataItem: updatedOverallGraph,
        };
      });

      setUpdateOverallData(updateOverallGraphhData);
    }else{
      setUpdatedFLowData([]);
      setUpdateCoheranceData([])
      setUpdateOverallData([])
    }
   
  }, [avgOfAllWeekFedFlow, avgOfAllWeekPhFlow]);
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const handleWorkplaceWellness = () => {};
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap justify-content-center":"d-flex flex-wrap "}>
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
        graphData={updateCoheranceData.length ? updateCoheranceData : CoheranceTotal}
        goal={"Goal 30-50 %"}
      />
    </div>
  );
}
export default TotalCharts;
