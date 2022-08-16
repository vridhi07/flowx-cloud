import { ClassNames } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import BarGraph from "../30daysChallenges/BarChart";
import PercentageChanges from "../../../../Utils/PercentageChanges";
import avgCalculation from "../../../../Utils/AvgCalculation";

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    padding: "20px",
    backgroundColor: "white",
    width: "98%",
    borderRadius: "10px",
  },
}));

const data = [
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Alex Smith",
    pv: 100,
  },
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Peter Lee",
    pv: 85,
  },
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Lotte Williams",
    pv: 67,
  },
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Kassie Thompson",
    pv: 60,
  },
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Lucy Moore",
    pv: 55,
  },
  {
    parentViewBox: <img src={"/user1.png"} alt="scscd" />,
    name: "Daragh Clark",
    pv: 50,
  },
];

function TotalChart({ weeklyUserData }) {
  const classes = useStyles();
  const [allUserListData, setAllUserListData] = useState([]);
  const [flowData, setflowData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const [coheranceData, setCoheranceData] = useState([]);
  const [flowPercentageChangeData , setFlowPercentageChangeData] = useState([])
  const [coherancePercentageChangeData , setCoherancePercentageChangeData] = useState([])
   

  useEffect(() => {
    if (allUserListData.length > 0) {

      let flowDataSort = allUserListData.sort(function(a,b){
        return b.avgFlowPercentage -a.avgFlowPercentage
      })

      let coheranceDataSort = allUserListData.sort(function(a,b){
        return b.avgCoherancePercentage -a.avgCoherancePercentage
      })
      let flow = flowDataSort.map((val) => { 
        return {
          name: val?.name,
          pv: val?.avgFlowPercentage.toFixed(),
        };
      });
     
      setflowData(flow);

      let overAll = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.avgFlowPercentage.toFixed(),
          uv : val?.avgFlowPercentageChange.toFixed()
        };
      });

      setOverAllData(overAll)

      //Coherance Value
      let Coherance = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.avgCoherancePercentage.toFixed(),
        };
      });
    
      setCoheranceData(Coherance);

      //flowPercantage Change
      let flowPercentageChange = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.avgFlowPercentageChange.toFixed(),
        };
      });
     

      setFlowPercentageChangeData(flowPercentageChange)

      //coherancePercentageData

      let coherancePercentageChange = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.avgCoherancePercentageChange.toFixed(),
        };
      });
     
      setCoherancePercentageChangeData(coherancePercentageChange)
    }
  }, [allUserListData]);

  const getPercentageChangeValue = (userData) => {
    let updatedDataWithPercentangeChange =
      userData?.dataItem?.length &&
      userData?.dataItem?.map((kl) => {
        if (kl.week !== "Week 1") {
          let flowPercentageChange = PercentageChanges(
            userData.dataItem[0].flowPercent,
            kl.flowPercent
          );
          let coherencePercentChange = PercentageChanges(
            userData.dataItem[0].coherencePercent,
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

  const getAvgValueOfAllWeekData = (updatedData, val) => {
    let flowPercentList = [];
    let flowPercentChangeList = [];
    let coherancePercentList = [];
    let allData = {};

    let coherancePercentChangeList = [];
    updatedData?.length &&
      updatedData?.map((ul) => {
        flowPercentList.push(ul.flowPercent);
        coherancePercentList.push(ul.coherencePercent);
        flowPercentChangeList.push(ul.flowPercentageChange);
        coherancePercentChangeList.push(ul.coherencePercentChange);
      });
     
    let avgFlowPercentage = avgCalculation(flowPercentList);
    let avgCoherancePercentage = avgCalculation(coherancePercentList);
   

    allData.avgFlowPercentage = avgFlowPercentage;
    allData.avgFlowPercentageChange = Math.max(...flowPercentChangeList);
    allData.avgCoherancePercentageChange = Math.max(...coherancePercentList);
    allData.avgCoherancePercentage = avgCoherancePercentage;

    return allData;
  };

  useEffect(() => {
    if (weeklyUserData.length) {
      let userAllData = weeklyUserData?.map((val) => {
        let updatedData = getPercentageChangeValue(val);
        if (updatedData?.length) {
          let avgDataOfAllWeek = getAvgValueOfAllWeekData(updatedData);

          // let flowPercentList = [];
          // let flowPercentChangeList = [];
          // let coherancePercentList = [];
          // let coherancePercentChangeList = [];
          // updatedData?.length && updatedData?.map((ul) => {
          //   flowPercentList.push(ul.flowPercent);
          //   coherancePercentList.push(ul.coherencePercent);
          //   flowPercentChangeList.push(ul.flowPercentageChange);
          //   coherancePercentChangeList.push(ul.coherencePercentChange);
          // });
          // let avgFlowPercentage = avgCalculation(flowPercentList);
          // let avgFlowPercentageChange = avgCalculation(flowPercentChangeList);
          // let avgCoherancePercentage = avgCalculation(coherancePercentList);
          // let avgCoherancePercentageChange = avgCalculation(
          //   coherancePercentChangeList
          // );

          delete val.data;

          return {
            ...val,
            avgFlowPercentage: avgDataOfAllWeek.avgFlowPercentage,
            avgFlowPercentageChange: avgDataOfAllWeek.avgFlowPercentageChange,
            avgCoherancePercentage: avgDataOfAllWeek.avgCoherancePercentage,
            avgCoherancePercentageChange:
              avgDataOfAllWeek.avgCoherancePercentageChange,
          };
        }
      });
      setAllUserListData(userAllData);
    }
  }, [weeklyUserData]);

  return (
    <div className="my-4">
      <div className={classes.graphContainer}>
        <p className="border-bottom text-xxl-start"> Overall</p>
        <BarGraph data={overAllData} height={350} barSize={40} />
      </div>
      <div className="row g-0 my-4">
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.graphContainer}>
            <p className="border-bottom text-xxl-start">Flow %</p>
            <BarGraph data={flowData} height={205} barSize={22} />
          </div>
        </div>
        {/* <div className="col-6 my-2">
          <div className={classes.graphContainer}>
            <p className="border-bottom text-xxl-start">Flow % change</p>
            <BarGraph data={flowPercentageChangeData} height={205} barSize={22} />
          </div>
        </div> */}
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.graphContainer}>
            <p className="border-bottom text-xxl-start">Coherance</p>
            <BarGraph data={coheranceData} height={205} barSize={22} />
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.graphContainer}>
            <p className="border-bottom text-xxl-start">Coherance % Change</p>
            <BarGraph data={coherancePercentageChangeData} height={205} barSize={22} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default TotalChart;
