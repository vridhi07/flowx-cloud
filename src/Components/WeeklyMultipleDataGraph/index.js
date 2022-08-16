import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PieChart, Pie, Label, Cell } from "recharts";

const useStyles = makeStyles((themes) => ({
  graphCard: {
    borderRadius: "8px",
    boxShadow: "0 0 5px 0 #BDBDBD",
    borderRadius: "10px",
    padding: "10px 10px 40px 10px",
    backgroundColor: "#FFF",
  },
  smallCard: {
    width: "290px",
    height: "350px",
    position: "relative",
  },
  largeCard: {
    width: "325px",
    height: "480px",
    position: "relative",
  },
  grpah: {
    cursor: "pointer",
  },
  cardTitleBox: {
    borderBottom: "1px solid #E0E0E0",
  },
  cardTittle: {
    color: "#333",
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "18px",
    paddingBottom: "10px",
  },
  setting: {
    "& img": {
      height: "15px",
    },
    cursor: "pointer",
  },
  percentage: {
    fontWeight: "bold",
    fontSize: "25px",
    lineHeight: "36px",
  },
  mobilePercentage: {
    fontWeight: "bold",
    fontSize: "15px",
    lineHeight: "36px",
  },
  arrowUp: {
    width: "0",
    height: "0",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    borderBottom: "15px solid #00A4E8",
  },
  CustomModal: {
    height: "90px",
    width: "159px",
    borderRadius: "10px",
    backgroundColor: "#00A4E8",
    zIndex: "-1",
    marginRight: "20px",
  },
  dropDownMainDiv: {
    paddingTop: "10px",
  },
  dropDownDimensions: {
    height: "34px",
    width: "165px",
    color: "white",
  },
  highlightWhite: {
    backgroundColor: "#FFF",
    color: "black",
  },
  highlightInherit: {
    color: "white",
  },
  mainCustomModal: {
    display: "none",
  },
  cardDetails: {
    width: "95%",
    position: "absolute",
    bottom: 10,
  },
  dot: {
    height: "10px",
    width: "10px",
    borderRadius: "50%",
  },
  coherance: {
    backgroundColor: "#E79D2D",
  },
  flowPercent: {
    backgroundColor: "#4A9529",
  },
  flow: {
    backgroundColor: "#8BCA2B",
  },
  coherancePercent: {
    backgroundColor: "#FF8000",
  },
  graphValue : {
    fontSize : '13px'
  }
}));

export default function WeeklyMultipleDataGraph({
  percentageChangeData,
  matches,
  cardCX,
  cardCY,
  cardName,
  graphData,
  cardSize,
  handleWellness,
}) {
  const classes = useStyles();

  const percentageCalculate = (values) => {
    let totalPercentage = 0;
    values.map((val) => {
      totalPercentage = totalPercentage + val.data[1].value;
    });
    const avgPercentage = totalPercentage / graphData[0]?.dataItem?.length;
    return `${avgPercentage.toFixed(0)}%`;
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(true);
  return (
    <div
      className={`${
        cardSize == "small" ? classes.smallCard : classes.largeCard
      } ${classes.graphCard} mx-2 my-2`}
    >
      <div className={`${classes.cardTitleBox} d-flex justify-content-between`}>
        <div className={classes.cardTittle}>{cardName}</div>
        <div className={classes.setting}>
          <img
            src={"/blockSetting.png"}
            onClick={() => {
              setModalOpen((prevState) => !prevState);
            }}
          />
        </div>
        <div className={classes.mainCustomModal}>
          <div className={classes.arrowUp}></div>
          <div className={classes.CustomModal}>
            <div className={classes.dropDownMainDiv}>
              <div
                className={classes.dropDownDimensions}
                onMouseOver={() => setIsHover(true)}
                className={
                  isHover
                    ? `${classes.highlightWhite} ${classes.dropDownDimensions}`
                    : `${classes.dropDownDimensions}`
                }
              >
                <img src="./editIcon.png" />
                <span>Edit / Delete</span>
              </div>
              <div
                onMouseOver={() => setIsHover(false)}
                className={
                  isHover
                    ? `${classes.dropDownDimensions}`
                    : `${classes.highlightWhite} ${classes.dropDownDimensions}`
                }
              >
                <img src="./eyeIcon.png" />
                <span> Hide </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.grpah} onClick={handleWellness}>
        <PieChart width={matches ? 250 : 350} height={matches ? 250 : 350}>
          {graphData &&
            graphData[0]?.dataItem?.map((val, index) => (
              <Pie
                data={val?.data}
                cx={matches ? 120 : cardCX}
                cy={matches ? 120 : cardCY}
                innerRadius={matches ? val.innerRadius : val.desktopInnerRadius}
                outerRadius={matches ? val.outerRadius : val.desktopOuterRadius}
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
                    cardSize == "small"
                      ? classes.mobilePercentage
                      : classes.percentage
                  }
                >
                  {/* {index == 0
                    ? percentageCalculate(graphData[0]?.dataItem)
                    : ""} */}
                    {`${percentageChangeData &&
                    percentageChangeData?.flowPercentChange?.toFixed(0)}%`}
                </Label>
              </Pie>
            ))}
        </PieChart>
      </div>
      <div className={classes.cardDetails}>
        <div className="d-flex justify-content-around">
          <div>
            <div className="d-flex align-items-center">
              <div className={`${classes.flow}  ${classes.dot}`}></div>
              <div className={`px-1 ${classes.graphValue}`}>
                flow %
                <span className="px-1">
                  {percentageChangeData &&
                    percentageChangeData?.flow?.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
          |
          <div className="px-1">
            <div className="d-flex align-items-center">
              <div className={`${classes.flowPercent}  ${classes.dot}`}></div>
              <div className={`px-1 ${classes.graphValue}`}>
                % change
                <span className="px-1">
                  {percentageChangeData &&
                    percentageChangeData?.flowPercentChange?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-around">
          <div>
            <div className="d-flex align-items-center">
              <div className={`${classes.coherance}  ${classes.dot}`}></div>
              <div className={`px-1 ${classes.graphValue}`}>
                Coherance %
                <span className="px-1">
                  {percentageChangeData &&
                    percentageChangeData?.coherance?.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
          |
          <div className="pl-1">
            <div className="d-flex align-items-center">
              <div
                className={`${classes.coherancePercent}  ${classes.dot}`}
              ></div>
              <div className={`px-1 ${classes.graphValue}`}>
              % change 
                <span className="px-1">
                  {percentageChangeData &&
                    percentageChangeData?.coherencePercentChange?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
