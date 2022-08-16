import React from "react";
import { makeStyles } from "@mui/styles";
import { PieChart, Pie, Label, Cell } from "recharts";

const useStyles = makeStyles((themes) => ({
  percentage: {
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "36px",
  },
  mobilePercentage: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "36px",
  },
  dailyCard: {
    backgroundColor: "#FFF",
  },
  Sprints: {
    textAlign: "center",
    marginTop: "10px",
  },
  cursorActive: {
    cursor: "pointer",
  },
}));

function DailySpritListGraph({
  matches,
  powerHour,
  cardCX,
  cardCY,
  detailsCard,
  dataItemList,
  graphType,
  handleSelectGraph,
  week,
}) {
  const classes = useStyles();

  const calculateSprintValue = (index) => {
    let finalValue = 0;
    if (week == 1) {
      finalValue = week + index;
    } else if (week == 2) {
      finalValue = 4 + (index + 1);
    } else if (week == 3) {
      finalValue = 8 + (index + 1);
    } else if (week == 4) {
      finalValue = 12 + (index + 1);
    } else {
    }

    return finalValue;
  };
  const calculateselection = (graphType, week, i) => {
    let selectedData = {};
    if (graphType == "FED") {
      selectedData.week = `Week ${i + 1}`;
      selectedData.selectedGraph = `FED ${i + 1}`;

      // selectedData.ph = 'Power Hour 1'
    } else if (graphType == "Power Hour") {
      selectedData.week = `Week ${week}`;
      selectedData.selectedGraph = `${graphType} ${i + 1}`;
      // selectedData.ph = `${graphType} ${i + 1}`
    } else {
    }

    if (selectedData.week) {
      return selectedData;
    }
  };

  return (
    <div
      className={` ${
        powerHour ? "d-flex justify-content-center" : "d-flex flex-wrap"
      }`}
    >
      {dataItemList &&
        dataItemList.map((val, i) => {
          return (
            <div
              className={`${classes.Sprints} ${
                graphType == "FED" || graphType == "Power Hour"
                  ? classes.cursorActive
                  : ""
              }`}
              onClick={() =>
                handleSelectGraph(
                  calculateselection(graphType, week, i),
                  calculateSprintValue(i)
                )
              }
            >
              <PieChart
                width={detailsCard ? 80 : 65}
                height={detailsCard ? 84 : 65}
              >
                <Pie
                  data={val?.data}
                  cx={matches ? 35 : cardCX}
                  cy={matches ? 35 : cardCY}
                  innerRadius={val.innerRadius}
                  outerRadius={val.outerRadius}
                  fill="red"
                  paddingAngle={1}
                  dataKey="value"
                >
                  {val?.data?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={val?.COLORS[index % val?.COLORS?.length]}
                    />
                  ))}
                  <Label
                    width={30}
                    position="center"
                    className={
                      matches ? classes.mobilePercentage : classes.percentage
                    }
                  >
                    {`${val?.data[1]?.value?.toFixed(0)}%`}
                  </Label>
                </Pie>
              </PieChart>

              <span>
                {detailsCard && dataItemList.length > 2
                  ? `Sprint ${i}`
                  : dataItemList.length == 2
                  ? `Sprint ${i + 1}`
                  : powerHour
                  ? calculateSprintValue(i)
                  : i + 1}
              </span>
            </div>
          );
        })}
    </div>
  );
}
export default DailySpritListGraph;
