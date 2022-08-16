import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { auth, db } from "../../../../firebaseConfig";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
import {WorkplaceWellness,Flow,Coherance } from "../../../../Constant/dashboardGraphData";
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((themes) => ({
  root: {
    marginBottom: "170px",
  },
  desktopRoot: {
    marginLeft: "10px",
    minHeight: "77vh",
  },
}));

function WorkPlaceWellnessGraph({ matches }) {
  const uid = auth?.currentUser?.uid;
  const [allSprint, setAllSprint] = useState([]);
  const [userId, setUserId] = useState("");
  const [updatedWorkPlaceDGraph, setUpdatedWorkPlaceDGraph] = useState([]);
  const classes = useStyles();
  const getOverViewData = async () => {
    if (userId) {
      const overViewData = [];
      const overViewRef = await db
        .collection("Users")
        .doc(`${userId}`)
        .collection("WorkplaceWellness")
        .doc("30 Days Challenge")
        .collection("Programs")
        .get();
      overViewRef.docs.map((doc) => {
        overViewData.push(doc.data());
      });
      let totalFlow = [];
      if (overViewData?.length) {
        overViewData.map((val) => {
          if (val["sprint 0"]) {
            totalFlow.push({ ...val["sprint 0"], week: val.week });
          }
          if (val["sprint 1"]) {
            totalFlow.push({ ...val["sprint 1"], week: val.week });
          }
          if (val["sprint 2"]) {
            totalFlow.push({ ...val["sprint 2"], week: val.week });
          }
          if (val["sprint 3"]) {
            totalFlow.push({ ...val["sprint 3"], week: val.week });
          }
          if (val["sprint 4"]) {
            totalFlow.push({ ...val["sprint 4"], week: val.week });
          }
        });
      }
      setAllSprint(totalFlow);
    }
  };

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    if (userId) {
      getOverViewData();
    }
  }, [userId]);

  useEffect(() => {
    if (allSprint?.length) {
      let flowValue = 0;
      let coherenceValue = 0;
      let avgFlowValue = 0;
      let avgCoherenceValue = 0;
      allSprint.map((el) => {
        flowValue = flowValue + el?.flowPercent;
        avgFlowValue = flowValue / allSprint?.length;
        coherenceValue = coherenceValue + el.coherencePercent;
        avgCoherenceValue = coherenceValue / allSprint?.length;
      });
      if (avgCoherenceValue || avgFlowValue) {
        // const overAllValue = avgFlowValue + avgCoherenceValue / 2 + 0; with coherance
        const overAllValue = avgFlowValue;
        const ProcessValue = avgFlowValue;
        const workPlaceWellnessValue = WorkplaceWellness[0].dataItem.map(
          (val) => {
            return {
              ...val,
              data:
                val.graphName == "Overall"
                  ? [
                      { name: "Group A", value: 100 - overAllValue },
                      { name: "Group B", value: overAllValue },
                    ]
                  : val.graphName == "Process"
                  ? [
                      { name: "Group A", value: 100 - ProcessValue },
                      { name: "Group B", value: ProcessValue },
                    ]
                  : [
                      { name: "Group A", value: 100 },
                      { name: "Group B", value: 0 },
                    ],
            };
          }
        );
        let updatedWorkPlaceDate = WorkplaceWellness.map((el) => {
          return {
            ...el,
            dataItem: workPlaceWellnessValue,
          };
        });
        setUpdatedWorkPlaceDGraph(updatedWorkPlaceDate);

        //FLOW

        const flowValues = Flow[0].dataItem.map((val) => {
          return {
            ...val,
            data: [
              { name: "Group A", value: 100 - avgFlowValue },
              { name: "Group B", value: avgFlowValue },
            ],
          };
        });
        let updateFlowValue = Flow.map((el) => {
          return {
            ...el,
            dataItem: flowValues,
          };
        });

        //Coherance

        const coheranceValues = Coherance[0].dataItem.map((val) => {
          return {
            ...val,
            data: [
              { name: "Group A", value: 100 },
              { name: "Group B", value: 0 },
            ],
          };
        });
        let updatedCoheranceValue = Coherance.map((el) => {
          return {
            ...el,
            dataItem: coheranceValues,
          };
        });
      }
    }
  }, [allSprint]);

  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  return (
    <div className={matches ? classes.root : classes.desktopRoot}>
        <div className={mobileMediaQuery?"d-flex flex-wrap mt-2 justify-content-center":"d-flex flex-wrap mt-2"}>
        <MultipleDataGraph 
             matches={matches}
             graphData={updatedWorkPlaceDGraph}
        />
        </div>
    </div>
  );
}
export default WorkPlaceWellnessGraph;
