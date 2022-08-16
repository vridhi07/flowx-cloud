import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import LeaderboardDays from "./LeaderboardDays";
import BarGraph from "../BarChart";
import PercentageChanges from "../../../../../Utils/PercentageChanges";
import CalculateAvgOfSameProgramAndWeek from "../../../../../Utils/CalculateAvgOfSameProgramAndWeek";
import { fedListForDailyGraph } from "../../../../../Constant/challenges";
import useMediaQuery from "@mui/material/useMediaQuery";
const useStyles = makeStyles((theme) => ({
  OverallDaysContainer: {
    display: "flex",
  },
  GraphContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
  },
  GraphTitle: {
    borderBottom: "1px solid gray",
    color: "#333",
    fontSize: "22px",
    fontWeight: "bold",
  },
  overallContainer: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    minHeight: 500,
  },
  cardTittle: {
    color: "#333",
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "18px",
  },
  setting: {
    "& img": {
      height: "15px",
    },
    cursor: "pointer",
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

const weeklyList = ["Week 1", "Week 2", "Week 3", "Week 4"];

function DaysChart({ dayWiseData, matches, allPhList, fedlist }) {
  const classes = useStyles();
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedGraph, setSelectedGraph] = useState("Power Hour 1");
  const [displayGraphNumber, setDisplayGraphNumber] = useState("FED 1");
  const [updatedData, setUpdatedData] = useState([]);
  const [flowData, setflowData] = useState([]);
  const [coheranceData, setCoheranceData] = useState([]);
  const [overAllData, setOverAllData] = useState([]);
  const [flowPercentageChangeData, setFlowPercentageChangeData] = useState([]);
  const [coherancePercentageChangeData, setCoherancePercentageChangeData] =
    useState([]);
  const [daysGraphData, setDaysGraphData] = useState([]);
  const mobileMediaQuery = useMediaQuery("(max-width:990px)");
  let filteredData = () => {
    let filterUserData = dayWiseData.map((val) => {
      let finalUserData = {
        week: selectedWeek,
        program: selectedGraph.includes("FED") ? "FED" : selectedGraph,
        flowPercent: 0,
        coherencePercent: 0,
        flowPercentageChange: 0,
        coherancePercentageChange: 0,
      };
      let selectWeekData = val.data.find(
        (kl) =>
          kl.week == selectedWeek &&
          kl.program == (selectedGraph.includes("FED") ? "FED" : selectedGraph)
      );
      let firstWeekSelectedData = val.data.find(
        (kl) =>
          kl.week == "Week 1" &&
          kl.program == (selectedGraph.includes("FED") ? "FED" : selectedGraph)
      );

      if (firstWeekSelectedData && selectWeekData) {
        let flowPercentageChange = PercentageChanges(
          firstWeekSelectedData.flowPercent.toFixed(),
          selectWeekData.flowPercent.toFixed()
        );
        let coherancePercentageChange = PercentageChanges(
          firstWeekSelectedData.coherencePercent.toFixed(),
          selectWeekData.coherencePercent.toFixed()
        );
        selectWeekData.flowPercentageChange = flowPercentageChange;
        selectWeekData.coherancePercentageChange = coherancePercentageChange;
        finalUserData = selectWeekData;
      } else {
        (finalUserData.week = selectedWeek),
          (finalUserData.program = selectedGraph),
          (finalUserData.flowPercent = firstWeekSelectedData?.flowPercent
            ? firstWeekSelectedData.flowPercent
            : 0),
          (finalUserData.coherencePercent =
            firstWeekSelectedData?.coherencePercent
              ? firstWeekSelectedData.coherencePercent
              : 0),
          (finalUserData.flowPercentageChange = 0),
          (finalUserData.coherancePercentageChange = 0);
      }
      return {
        ...val,
        data: finalUserData,
      };
    });

    return filterUserData;
  };
  let getDataList = (dataList) => {
    let finalData = [];
    let week1fed = dataList.filter(
      (val) => val.week == "Week 1" && val.program == "FED"
    );
    if (week1fed.length) {
      let week1fedData = CalculateAvgOfSameProgramAndWeek(week1fed);
      finalData.push(week1fedData);
    }

    let week2fed = dataList.filter(
      (val) => val.week == "Week 2" && val.program == "FED"
    );
    if (week2fed.length) {
      let week2fedData = CalculateAvgOfSameProgramAndWeek(week2fed);
      finalData.push(week2fedData);
    }

    let week3fed = dataList.filter(
      (val) => val.week == "Week 3" && val.program == "FED"
    );
    if (week3fed.length) {
      let week3fedData = CalculateAvgOfSameProgramAndWeek(week3fed);
      finalData.push(week3fedData);
    }

    let week4fed = dataList.filter(
      (val) => val.week == "Week 4" && val.program == "FED"
    );
    if (week3fed.length) {
      let week4fedData = CalculateAvgOfSameProgramAndWeek(week4fed);
      finalData.push(week4fedData);
    }

    let phList = [
      "Power Hour 1",
      "Power Hour 2",
      "Power Hour 3",
      "Power Hour 4",
    ];
    let week1ph = dataList.filter(
      (val) => val.week == "Week 1" && val.program !== "FED"
    );

    let week1phData = phList.map((kl) => {
      let filteredPh = week1ph.filter((el) => el.program == kl);
      if (filteredPh?.length) {
        let avgData = CalculateAvgOfSameProgramAndWeek(filteredPh);
        return avgData;
      }
    });

    week1phData.map((val) => finalData.push(val));

    let week2ph = dataList.filter(
      (val) => val.week == "Week 2" && val.program !== "FED"
    );

    let week2phData = phList.map((kl) => {
      let filteredPh = week2ph.filter((el) => el.program == kl);
      let avgData = CalculateAvgOfSameProgramAndWeek(filteredPh);
      return avgData;
    });
    week2phData.map((val) => finalData.push(val));

    let week3ph = dataList.filter(
      (val) => val.week == "Week 3" && val.program !== "FED"
    );

    let week3phData = phList.map((kl) => {
      let filteredPh = week3ph.filter((el) => el.program == kl);
      let avgData = CalculateAvgOfSameProgramAndWeek(filteredPh);
      return avgData;
    });

    week3phData.map((val) => finalData.push(val));

    let week4ph = dataList.filter(
      (val) => val.week == "Week 4" && val.program !== "FED"
    );

    let week4phData = phList.map((kl) => {
      let filteredPh = week4ph.filter((el) => el.program == kl);
      let avgData = CalculateAvgOfSameProgramAndWeek(filteredPh);
      return avgData;
    });
    week4phData.map((val) => finalData.push(val));
    return finalData;
  };

  useEffect(() => {
    let data = filteredData();
    setUpdatedData(data);
  }, [selectedWeek, selectedGraph]);

  useEffect(() => {
    if (dayWiseData?.length) {
      let data = filteredData();
      setUpdatedData(data);
      let userDataItem = [];
      dayWiseData.map((val) => {
        userDataItem.push(val.data);
      });
      let allData = userDataItem.reduce((total, value) => {
        return total.concat(value);
      }, []);

      let finalMergredData = getDataList(allData);
      setDaysGraphData(finalMergredData);
    }
  }, [dayWiseData]);

  useEffect(() => {
    if (updatedData.length > 0) {
      let flowDataSort = updatedData.sort(function (a, b) {
        return b.data.flowPercent - a.data.flowPercent;
      });

      let coheranceDataSort = updatedData.sort(function (a, b) {
        return b.data.coherencePercent - a.data.coherencePercent;
      });

      let flow = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.flowPercent?.toFixed(),
        };
      });

      setflowData(flow);

      //Overall
      let overAll = flowDataSort.map((val) => {
        // console.log(val,'flowPercentageChangeflowPercentageChangeflowPercentageChange');
        return {
          name: val?.name,
          pv: val.data.flowPercent?.toFixed(),
          uv: val?.data?.flowPercentageChange?.toFixed(),
        };
      });

      setOverAllData(overAll);

      //Coherance Value
      let Coherance = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val.data.coherencePercent?.toFixed(),
        };
      });
      setCoheranceData(Coherance);

      //flowPercantage Change
      let flowPercentageChangeData = flowDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data?.flowPercentageChange?.toFixed(),
        };
      });
      setFlowPercentageChangeData(flowPercentageChangeData);

      //coherancePercentageData

      let coherancePercentageChangeValue = coheranceDataSort.map((val) => {
        return {
          name: val?.name,
          pv: val?.data.coherancePercentageChange?.toFixed(),
        };
      });
      setCoherancePercentageChangeData(coherancePercentageChangeValue);
    }
  }, [updatedData]);

  const handleSelectGraph = (selectedData, sprintValue) => {
    if (selectedData) {
      setSelectedWeek(selectedData.week);
      setSelectedGraph(selectedData.selectedGraph);
    }
    if (selectedData.selectedGraph.includes("Power Hour")) {
      setDisplayGraphNumber(`Power Hour ${sprintValue}`);
    } else {
      setDisplayGraphNumber(selectedData.selectedGraph);
    }
  };
  const removemx0 = useMediaQuery("(max-width:340px");
  return (
    <div>
      <div className={removemx0 ? "row" : "row mx-0"}>
        <div
          className={
            mobileMediaQuery
              ? "col-12 col-md-12 col-lg-5 mb-5"
              : "col-12 col-md-12 col-lg-5"
          }
        >
          <LeaderboardDays
            matches={matches}
            allPhList={allPhList}
            fedlist={fedlist}
            daysGraphData={daysGraphData}
            handleSelectGraph={handleSelectGraph}
            fedListForDailyGraph={fedListForDailyGraph}
            weeklyList={weeklyList}
          />
        </div>

        <div className="col-12 col-md-12 col-lg-7">
          <div className={classes.overallContainer}>
            <div className="d-flex justify-content-between align-items-center">
              <div className={classes.cardTittle}>
                Overall <span className="px-3">{displayGraphNumber}</span>
              </div>
              <div className={classes.setting}>
                <img src={"/blockSetting.png"} />
              </div>
            </div>
            <hr />
            <BarGraph data={overAllData} height={365} barSize={45} />
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.GraphContainer}>
            <p className="border-bottom text-xxl-start">Flow %</p>
            <BarGraph data={flowData} height={205} barSize={22} />
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.GraphContainer}>
            <p className="border-bottom text-xxl-start">Flow % change</p>
            <BarGraph
              data={flowPercentageChangeData}
              height={205}
              barSize={22}
            />
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.GraphContainer}>
            <p className="border-bottom text-xxl-start">Coherance</p>
            <BarGraph data={coheranceData} height={205} barSize={22} />
          </div>
        </div>
        <div className="col-12 col-md-12 col-lg-6 my-2">
          <div className={classes.GraphContainer}>
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
  );
}

export default DaysChart;
