import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DailySpritListGraph from "../../../Graph/DailySpritListGraph";
import AvgofAllSprintsperWeek from "../../../../Utils/AvgofAllSprintsperWeek";
import avgCalculation from "../../../../Utils/AvgCalculation";
import { fedListForFiveDaysGraph } from "../../../../Constant/5daysChallenges";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles((themes) => ({
  card: {
    borderRadius: "8px",
    boxShadow: "0 0 5px 0 #BDBDBD",
    borderRadius: "10px",
    padding: "10px 20px 10px 20px",
    minHeight: 500,
    backgroundColor: "#FFF",
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
  verticalLine: {
    border: "1px solid #BDBDBD",
    height: "390px",
    marginTop: "10px",
  },
  mobileverticalLine: {
    border: "none",
    height: "14px",
    marginTop: "10px",
  },
  horizentalLine: {
    border: "1px solid #BDBDBD",
    height: "0px",
    marginTop: "10px",
  },
  detailsVerticalLine: {
    border: "1px solid #BDBDBD",
    height: "390px",
    marginTop: "10px",
    width: "0px",
  },
}));

function DayCharts({
  matches,
  fedListForDailyGraph,
  flowListForDailyGraph,
  overallListForDailyGraph,
  coherenceListForDailyGraph,
  avgOfAllSprintFedList,
  allPhList,
  fedlist,
}) {
  const [fedGraphData, setFedGraphData] = useState([]);
  const [allWeekPhDataList, setAllWeekPhDataList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [selectedGraph, setSelectedGraph] = useState("FED 1");
  const [displayGraphNumber, setDisplayGraphNumber] = useState("FED 1");
  const [flowGraphData, setFlowGraphData] = useState([]);
  const [coheranceGraphData, setCoheranceGraphData] = useState([]);
  const [overallGraphData, setoverallGraphData] = useState([]);

  useEffect(() => {
    if (allPhList.length) {
      let avgofSprintofeachPh = allPhList.map((val) => {
        return {
          ...val,
          ph: AvgofAllSprintsperWeek(val.ph),
        };
      });
      let allweeklyPhListGraph = [];

      avgofSprintofeachPh.map((val) => {
        let weekwisePhData = getGraphDayData(
          fedListForDailyGraph,
          val.ph,
          "flowData",
          true,
          "powerHours"
        );
        allweeklyPhListGraph.push(weekwisePhData);
      });

      setAllWeekPhDataList(allweeklyPhListGraph);
    }
  }, [allPhList]);

  useEffect(() => {
    if (selectedGraph) {
      let selectedDataDetails = [];
      if (selectedGraph.includes("FED")) {
        if (fedlist.length) {
          let selectedFdData = fedlist.find((val) => val.week == selectedWeek);
          selectedDataDetails.push(selectedFdData);
        } else {
          selectedDataDetails.push([]);
        }
      } else {
        allPhList.map((val) => {
          if (val.week == selectedWeek) {
            let selectedPhList = val.ph.find(
              (kl) => kl.program == selectedGraph
            );
            selectedDataDetails.push(selectedPhList);
          }
        });
      }
      if (selectedDataDetails || selectedDataDetails) {
        let flowDataGraph = getGraphDetailsData(
          flowListForDailyGraph,
          selectedDataDetails,
          "flowData"
        );
        let overallDataGraph = getGraphDetailsData(
          overallListForDailyGraph,
          selectedDataDetails,
          "flowData"
        );
        let coheranceDataGraph = getGraphDetailsData(
          coherenceListForDailyGraph,
          selectedDataDetails,
          "coheranceData"
        );

        setoverallGraphData(overallDataGraph);
        setCoheranceGraphData(coheranceDataGraph);
        setFlowGraphData(flowDataGraph);
      }
    }
  }, [selectedWeek, selectedGraph]);

  // calculating overall, flow , coherence, kpi graph data

  const getGraphDetailsData = (grpahdata, dataList, typeData) => {
    //grpahdata = structure of data of graph
    //dataList = final calculated data for flow/coherence/overall
    //typeData = type of graph (currently flow and overall are same )

    let filnalGraphData = grpahdata.map((val, index) => {
      return {
        ...val,
        data: [
          {
            name: "Group A",
            value:
              100 -
              (typeData == "flowData"
                ? dataList[0]?.program
                  ? dataList[0][`sprint ${index}`]?.flowPercent
                  : 0
                : typeData == "coheranceData"
                ? dataList[0]?.program
                  ? dataList[0][`sprint ${index}`]?.coherencePercent
                  : 0
                : (dataList[0]?.program &&
                    dataList[0][`sprint ${index}`]?.coherencePercent +
                      dataList[0]?.program &&
                    dataList[0][`sprint ${index}`]?.flowPercent) / 2),
          },
          {
            name: "Group B",
            value:
              typeData == "flowData"
                ? dataList[0]?.program
                  ? dataList[0][`sprint ${index}`]?.flowPercent
                  : 0
                : typeData == "coheranceData"
                ? dataList[0]?.program
                  ? dataList[0][`sprint ${index}`]?.coherencePercent
                  : 0
                : (dataList[0]?.program &&
                    dataList[0][`sprint ${index}`]?.coherencePercent +
                      dataList[0]?.program &&
                    dataList[0][`sprint ${index}`]?.flowPercent) / 2,
          },
        ],
      };
    });
    if (selectedGraph.includes("Power Hour")) {
      return filnalGraphData.slice(0, -3);
    } else {
      return filnalGraphData.slice(0, -2);
    }
  };

  // power hour and fed calculating

  const getGraphDayData = (
    grpahdata,
    dataList,
    typeData,
    colorVariation,
    kl
  ) => {
    let filnalGraphData = grpahdata.map((val, index) => {
      return {
        ...val,
        data: [
          {
            name: "Group A",
            value:
              index == 0
                ? 100 -
                  (typeData == "flowData"
                    ? dataList[0]?.flowPercent
                      ? dataList[0]?.flowPercent
                      : 0
                    : typeData == "coheranceData"
                    ? dataList[0]?.coherencePercent
                      ? dataList[0]?.coherencePercent
                      : 0
                    : (dataList[0]?.coherencePercent +
                        dataList[0]?.flowPercent) /
                      2)
                : index == 1
                ? 100 -
                  (typeData == "flowData"
                    ? dataList[1]?.flowPercent
                      ? dataList[1]?.flowPercent
                      : 0
                    : typeData == "coheranceData"
                    ? dataList[1]?.coherencePercent
                      ? dataList[1]?.coherencePercent
                      : 0
                    : (dataList[1]?.coherencePercent +
                        dataList[1]?.flowPercent) /
                      2)
                : index == 2
                ? 100 -
                  (typeData == "flowData"
                    ? dataList[2]?.flowPercent
                      ? dataList[2]?.flowPercent
                      : 0
                    : typeData == "coheranceData"
                    ? dataList[2]?.coherencePercent
                      ? dataList[2]?.coherencePercent
                      : 0
                    : (dataList[2]?.coherencePercent +
                        dataList[2]?.flowPercent) /
                      2)
                : index == 3
                ? 100 -
                  (typeData == "flowData"
                    ? dataList[3]?.flowPercent
                      ? dataList[3]?.flowPercent
                      : 0
                    : typeData == "coheranceData"
                    ? dataList[3]?.coherencePercent
                      ? dataList[3]?.coherencePercent
                      : 0
                    : (dataList[3]?.coherencePercent +
                        dataList[3]?.flowPercent) /
                      2)
                : 100 -
                  (typeData == "flowData"
                    ? dataList[4]?.flowPercent
                      ? dataList[4]?.flowPercent
                      : 0
                    : typeData == "coheranceData"
                    ? dataList[4]?.coherencePercent
                      ? dataList[4]?.coherencePercent
                      : 0
                    : (dataList[4]?.coherencePercent +
                        dataList[4]?.flowPercent) /
                      2),
          },
          {
            name: "Group B",
            value:
              index == 0
                ? typeData == "flowData"
                  ? dataList[0]?.flowPercent
                    ? dataList[0]?.flowPercent
                    : 0
                  : typeData == "coheranceData"
                  ? dataList[0]?.coherencePercent
                    ? dataList[0]?.coherencePercent
                    : 0
                  : (dataList[0]?.coherencePercent + dataList[0]?.flowPercent) /
                    2
                : index == 1
                ? typeData == "flowData"
                  ? dataList[1]?.flowPercent
                    ? dataList[1]?.flowPercent
                    : 0
                  : typeData == "coheranceData"
                  ? dataList[1]?.coherencePercent
                    ? dataList[1]?.coherencePercent
                    : 0
                  : (dataList[1]?.coherencePercent + dataList[1]?.flowPercent) /
                    2
                : index == 2
                ? typeData == "flowData"
                  ? dataList[2]?.flowPercent
                    ? dataList[2]?.flowPercent
                    : 0
                  : typeData == "coheranceData"
                  ? dataList[2]?.coherencePercent
                    ? dataList[2]?.coherencePercent
                    : 0
                  : (dataList[2]?.coherencePercent + dataList[2]?.flowPercent) /
                    2
                : index == 3
                ? typeData == "flowData"
                  ? dataList[3]?.flowPercent
                    ? dataList[3]?.flowPercent
                    : 0
                  : typeData == "coheranceData"
                  ? dataList[3]?.coherencePercent
                    ? dataList[3]?.coherencePercent
                    : 0
                  : (dataList[3]?.coherencePercent + dataList[3]?.flowPercent) /
                    2
                : typeData == "flowData"
                ? dataList[3]?.flowPercent
                  ? dataList[3]?.flowPercent
                  : 0
                : typeData == "coheranceData"
                ? dataList[4]?.coherencePercent
                  ? dataList[4]?.coherencePercent
                  : 0
                : (dataList[4]?.coherencePercent + dataList[2]?.flowPercent) /
                  2,
          },
        ],
        COLORS:
          colorVariation == true
            ? dataList[index]?.flowPercent <= 20
              ? ["#E2E9EE", "#F0504B"]
              : dataList[index]?.flowPercent > 21 &&
                dataList[index]?.flowPercent <= 40
              ? ["#E2E9EE", "#E79D2D"]
              : dataList[index]?.flowPercent > 41 &&
                dataList[index]?.flowPercent <= 60
              ? ["#E2E9EE", "#FFFF00"]
              : dataList[index]?.flowPercent > 61 &&
                dataList[index]?.flowPercent <= 80
              ? ["#E2E9EE", "#A0D300"]
              : ["#E2E9EE", "#739900"]
            : val.COLORS,
      };
    });
    if (kl == "fed") {
      return filnalGraphData.slice(0, -3);
    } else {
      return filnalGraphData;
    }
  };

  useEffect(() => {
    let fedWeekData = getGraphDayData(
      fedListForDailyGraph,
      avgOfAllSprintFedList,
      "flowData",
      true,
      "fed"
    );
    setFedGraphData(fedWeekData);
  }, [avgOfAllSprintFedList]);

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

  const classes = useStyles();
  const mobileMediaQuery = useMediaQuery("(max-width:990px)");
  const mobileMediaGraph = useMediaQuery("(max-width:425px)");
  const removemx0 = useMediaQuery("(max-width:340px");
  return (
    <div className={removemx0 ? "row" : "row mx-0"}>
      <div
        className={
          mobileMediaQuery
            ? "col-12 col-md-12 col-lg-5 mb-5"
            : "col-12 col-md-12 col-lg-5"
        }
      >
        <div className={classes.card}>
          <div className="d-flex justify-content-between align-items-center">
            <div className={classes.cardTittle}>Days</div>
            <div className={classes.setting}>
              <img src={"/blockSetting.png"} />
            </div>
          </div>
          <hr />
          <div className="row g-0 ">
            <div
              className={
                mobileMediaGraph
                  ? "col-12 col-md-4 col-lg-4"
                  : "col-3 col-md-4 col-lg-4"
              }
            >
              <div className={`text-center ${classes.cardTittle}`}>FED</div>
              <div className="row no-gutter">
                <div className="col-9">
                  {[1].map((val) => (
                    <DailySpritListGraph
                      matches={matches}
                      dataItemList={fedGraphData ? fedGraphData : []}
                      cardCX={25}
                      cardCY={25}
                      detailsCard={false}
                      graphType="FED"
                      handleSelectGraph={handleSelectGraph}
                    />
                  ))}
                </div>
                <div className="col-2">
                  <div
                    className={
                      mobileMediaGraph
                        ? classes.mobileverticalLine
                        : classes.verticalLine
                    }
                  ></div>
                </div>
              </div>
            </div>
            <div
              className={
                mobileMediaGraph
                  ? "col-12 col-md-8 col-lg-8"
                  : "col-9 col-md-8 col-lg-8"
              }
            >
              <div className={`text-center ${classes.cardTittle}`}>
                Power Hour
              </div>
              {[1].map((val) => (
                <DailySpritListGraph
                  matches={matches}
                  dataItemList={
                    val == 1
                      ? allWeekPhDataList[0]
                      : val == 2
                      ? allWeekPhDataList[1]
                      : val == 3
                      ? allWeekPhDataList[2]
                      : allWeekPhDataList[3]
                  }
                  cardCX={25}
                  cardCY={25}
                  detailsCard={false}
                  powerHour={true}
                  graphType="Power Hour"
                  handleSelectGraph={handleSelectGraph}
                  week={val}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 col-lg-7">
        <div className={classes.card}>
          <div className="d-flex justify-content-between align-items-center">
            <div className={classes.cardTittle}>
              Details <span className="px-4">{displayGraphNumber}</span>
            </div>
            <div className={classes.setting}>
              <img src={"/blockSetting.png"} />
            </div>
          </div>
          <hr />
          <div className="row g-0">
            <div className="col-6 px-1 ">
              <div className={classes.cardTittle}>Overall</div>
              <div>
                {[1].map((val) => (
                  <DailySpritListGraph
                    matches={matches}
                    dataItemList={overallGraphData ? overallGraphData : []}
                    cardCX={35}
                    cardCY={35}
                    detailsCard={true}
                    graphType="Overall"
                    handleSelectGraph={handleSelectGraph}
                  />
                ))}
              </div>
              <div className={classes.horizentalLine}></div>
            </div>
            <div className="col-6 px-1">
              <div className={classes.cardTittle}>Flow</div>
              <div>
                {[1].map((val) => (
                  <DailySpritListGraph
                    matches={matches}
                    dataItemList={flowGraphData ? flowGraphData : []}
                    cardCX={35}
                    cardCY={35}
                    detailsCard={true}
                    graphType="Flow"
                    handleSelectGraph={handleSelectGraph}
                  />
                ))}
              </div>
              <div className={classes.horizentalLine}></div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6">
              <div className={`${classes.cardTittle} mt-2`}>Coherance</div>
              <div>
                {[1].map((val) => (
                  <DailySpritListGraph
                    matches={matches}
                    dataItemList={
                      coheranceGraphData
                        ? coheranceGraphData
                        : flowListForDailyGraph
                    }
                    cardCX={35}
                    cardCY={35}
                    detailsCard={true}
                    graphType="Coherance"
                    handleSelectGraph={handleSelectGraph}
                  />
                ))}
              </div>
            </div>
            <div className="col-6">
              <div className={`${classes.cardTittle} mt-2`}>KPI Data</div>
              {/* <div>
                {[1].map((val) => (
                  <DailySpritListGraph
                    matches={matches}
                    dataItemList={
                      flowListForDailyGraph ? flowListForDailyGraph : []
                    }
                    cardCX={35}
                    cardCY={35}
                    detailsCard={true}
                    graphType="Kpi"
                    handleSelectGraph={handleSelectGraph}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DayCharts;
