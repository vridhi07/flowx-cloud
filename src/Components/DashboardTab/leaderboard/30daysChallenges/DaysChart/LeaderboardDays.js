import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import DailySpritListGraph from "../../../../Graph/DailySpritListGraph";
// import DailySpritListGraph from "../../../../DailySpritListGraph";
import AvgofAllSprintsperWeek from "../../../../../Utils/AvgofAllSprintsperWeek";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fedListForDailyGraph } from "../../../../../Constant/challenges";
import { fedListForFiveDaysGraph } from "../../../../../Constant/5daysChallenges";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: "8px",
    boxShadow: "0 0 5px 0 #BDBDBD",
    borderRadius: "10px",
    padding: "10px 20px 10px 20px",
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
  horizentalLine: {
    border: "1px solid #BDBDBD",
    height: "0px",
    marginTop: "10px",
  },
  mobileverticalLine: {
    border: "none",
    height: "14px",
    marginTop: "10px",
  },
  detailsVerticalLine: {
    border: "1px solid #BDBDBD",
    height: "390px",
    marginTop: "10px",
    width: "0px",
  },
}));

function LeaderboardDays({
  daysGraphData,
  matches,
  handleSelectGraph,
  weeklyList,
  fedlist,
}) {
  const classes = useStyles();
  const [fedGraphData, setFedGraphData] = useState([]);
  const [avgOfAllSprintFedList, setAvgOfAllSprintFedList] = useState([]);
  const [allWeekPhDataList, setAllWeekPhDataList] = useState([]);

  useEffect(() => {
    if (fedlist) {
      let avgofAllSprintPerWeekOfFed = AvgofAllSprintsperWeek(fedlist);
      setAvgOfAllSprintFedList(avgofAllSprintPerWeekOfFed);
    }
  }, [fedlist]);

  useEffect(() => {
    if (daysGraphData?.length) {
      let allFedData = daysGraphData.filter((val) => val.program == "FED");
      let fedWeekData = getGraphData(
        weeklyList.length > 1 ? fedListForDailyGraph : fedListForFiveDaysGraph,
        allFedData,
        "flowData"
      );
      setFedGraphData(fedWeekData);

      let allPhData = daysGraphData.filter((val) => val.program !== "FED");
      if (allPhData.length) {
        // let weeklyList = ["Week 1", "Week 2", "Week 3", "Week 4"];
        let weeklyAllPhData = weeklyList.map((kl) => {
          let weeklyPhData = allPhData.filter((ul) => ul.week == kl);
          return {
            week: kl,
            ph: weeklyPhData,
          };
        });
        let allweeklyPhListGraph = [];
        weeklyAllPhData.map((val) => {
          let weekwisePhData = getGraphData(
            fedListForDailyGraph,
            val.ph,
            "flowData"
          );

          allweeklyPhListGraph.push(weekwisePhData);
        });
        setAllWeekPhDataList(allweeklyPhListGraph);
      }
    }
  }, [daysGraphData]);

  const getGraphData = (grpahdata, dataList, typeData) => {
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
      };
    });
    return filnalGraphData;
  };
  const mobileMediaGraph = useMediaQuery("(max-width:500px)");
  return (
    <div className={classes.card}>
      <div className="d-flex justify-content-between align-items-center">
        <div className={classes.cardTittle}>Days</div>
        <div className={classes.setting}>
          <img src={"/blockSetting.png"} />
        </div>
      </div>
      <hr />
      <div className="row g-0 ">
        <div className={mobileMediaGraph ? "col-12" : "col-4"}>
          <div className={`text-center ${classes.cardTittle}`}>FED</div>
          <div className="row no-gutter">
            <div className={mobileMediaGraph ? "col-12" : "col-9"}>
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
        <div className={mobileMediaGraph ? "col-12" : "col-8"}>
          <div className={`text-center ${classes.cardTittle}`}>Power Hour</div>
          {[1, 2, 3, 4].map((val) => (
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
  );
}
export default LeaderboardDays;
