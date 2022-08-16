import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import PercentageChanges from "../../../../Utils/PercentageChanges";
import BarGraph from "./BarChart";

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    padding: "20px",
    backgroundColor: "white",
    width: "98%",
    borderRadius: "10px",
  },
  dayContainer: {
    display: "flex",
    marginTop: "27px",
  },

  weekButton: {
    borderRadius: "50px",
    fontSize: "14px",
    lineHeight: "16px",
    height: "30px",
    width: "71px",
    marginRight: "3px",
    fontWeight: "700",
    border: "none",
  },
  active: {
    backgroundColor: "#00A4E8",
    color: "white",
  },
  inactive: {
    backgroundColor: "#CBD4DA",
    color: "#4F4F4F",
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

const WeekName = ["Week 4", "Week 3", "Week 2", "Week 1"];

function WeeklyChart({ weeklyUserData }) {
  const [selectedWeek, setSelectedWeek] = useState("Week 4");
  const [selectedWeekData, setSelectedWeekData] = useState([]);
  const [flowData, setflowData] = useState([]);
  const [coheranceData, setCoheranceData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const [flowPercentageChangeData, setFlowPercentageChangeData] = useState([]);
  const [coherancePercentageChangeData, setCoherancePercentageChangeData] =
    useState([]);

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

  const getDataCalculationWeekwise = (weeklyUserData) => {
    let updatedDataWithPercentageChange = weeklyUserData?.map((val) => {
      let addPercentageChange = getPercentageChangeValue(val);
      return {
        ...val,
        data: addPercentageChange,
      };
    });
    if (updatedDataWithPercentageChange?.length > 0) {
      let selectedWeekData = updatedDataWithPercentageChange?.map((val) => {
        return {
          ...val,
          data: val?.data?.filter((kl) => kl.week == selectedWeek),
        };
      });

      setSelectedWeekData(selectedWeekData);
    }
  };

  const classes = useStyles();
  const handleSelectedWeek = (week) => {
    setSelectedWeek(week);
  };

  useEffect(() => {
    if (weeklyUserData.length) {
      getDataCalculationWeekwise(weeklyUserData);
    }
  }, [selectedWeek]);

  useEffect(() => {
    if (selectedWeekData.length > 0) {
      let flowDataSort = selectedWeekData.sort(function (a, b) {
        return b.data[0].flowPercent - a.data[0].flowPercent;
      });

      let coheranceDataSort = selectedWeekData.sort(function (a, b) {
        return b.data[0].coherencePercent - a.data[0].coherencePercent;
      });

      let flow = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.length ? val?.data[0]?.flowPercent?.toFixed() : 0,
        };
      });
      setflowData(flow);

      // Overall
      let overAll = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.length ? val?.data[0]?.flowPercent?.toFixed() : 0,
          uv: val?.data?.length
            ? val?.data[0]?.flowPercentageChange?.toFixed()
            : 0,
        };
      });

      setOverAllData(overAll);

      //Coherance Value
      let Coherance = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.length ? val?.data[0]?.coherencePercent?.toFixed() : 0,
        };
      });
      setCoheranceData(Coherance);
      //flowPercantage Change
      let flowPercentageChange = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.length
            ? val?.data[0]?.flowPercentageChange?.toFixed()
            : 0,
        };
      });

      setFlowPercentageChangeData(flowPercentageChange);

      //coherancePercentageData

      let coherancePercentageChange = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.length
            ? val?.data[0]?.coherencePercentChange?.toFixed()
            : 0,
        };
      });

      setCoherancePercentageChangeData(coherancePercentageChange);
    }
  }, [selectedWeekData]);

  useEffect(() => {
    if (weeklyUserData?.length) {
      getDataCalculationWeekwise(weeklyUserData);
    }
  }, [weeklyUserData]);
  return (
    <div>
      <div className={classes.dayContainer}>
        {WeekName.map((value, index) => {
          return (
            <button
              key={index}
              className={`${
                selectedWeek == value ? classes.active : classes.inactive
              } ${classes.weekButton}`}
              onClick={() => handleSelectedWeek(value)}
            >
              {value}
            </button>
          );
        })}
      </div>
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
          <div className="col-12 col-md-12 col-lg-6 my-2">
            <div className={classes.graphContainer}>
              <p className="border-bottom text-xxl-start">Flow % change</p>
              <BarGraph
                data={flowPercentageChangeData}
                height={205}
                barSize={22}
              />
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 my-2">
            <div className={classes.graphContainer}>
              <p className="border-bottom text-xxl-start">Coherance</p>
              <BarGraph data={coheranceData} height={205} barSize={22} />
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 my-2">
            <div className={classes.graphContainer}>
              <p className="border-bottom text-xxl-start">Coherance % Change</p>
              <BarGraph
                data={coherancePercentageChangeData}
                height={205}
                barSize={22}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeeklyChart;
