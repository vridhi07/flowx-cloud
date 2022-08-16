import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Overview from "../DashboardPage/Overview";
import Allview from "../DashboardPage/Allview";
import useMediaQuery from '@mui/material/useMediaQuery';
import { auth, db } from "../../../firebaseConfig";
import {
  WorkplaceWellness,
  Flow,
  Coherance,
} from "../../../Constant/dashboardGraphData";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "170px",
  },
  desktopRoot: {
    marginLeft: "0px",
    minHeight: "77vh",
  },
  mobiledesktopRoot: {
    marginLeft: "0px",
    minHeight: "77vh",
  },
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
  overview: {
    backgroundColor: "#FFF",
    borderColor: "none",
    border : 'none',
    color: "#000",
    // width : '50px',
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
    padding : '0px 10px',
    "&:hover": {
      backgroundColor: "#00A4E8",
      border: "none",
    },
  }
}));

const tabList = ['Overview','All']


function DashboardPage({ matches, handleSelectPage }) {
  const [selectTab, setSelectTab] = useState(0);
  const [allSprint, setAllSprint] = useState([]);
  const [updatedWorkPlaceDGraph, setUpdatedWorkPlaceDGraph] = useState([]);
  const [updatedFlowGraph, setUpdatedFlowGraph] = useState([]);
  const [updatedCoheranceGraph, setUpdatedCoheranceGraph] = useState([]);
  const [userId, setUserId] = useState("");
  const classes = useStyles();
  const handleSelectTab = (index) => {
    setSelectTab(index);
  };
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
        // const ProcessValue = avgFlowValue + avgCoherenceValue / 2; with coherance
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
        setUpdatedFlowGraph(updateFlowValue);

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
        setUpdatedCoheranceGraph(updatedCoheranceValue);
      }
    }
  }, [allSprint]);
 
  return (
    <div className={matches ? classes.root : classes.desktopRoot}>
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
        <Overview
          updatedWorkPlaceDGraph={updatedWorkPlaceDGraph}
          matches={matches}
          handleSelectPage={handleSelectPage}
        />
      ) : (
        <Allview
          updatedWorkPlaceDGraph={updatedWorkPlaceDGraph}
          matches={matches}
          handleSelectPage={handleSelectPage}
          updatedFlowGraph={updatedFlowGraph}
          updatedCoheranceGraph={updatedCoheranceGraph}
        />
      )}
    </div>
  );
}
export default DashboardPage;
 st