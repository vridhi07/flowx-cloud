import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { PieChart, Pie, Label, Cell } from "recharts";

const useStyles = makeStyles((themes) => ({
  graphCard: {
    borderRadius: "8px",
    boxShadow: "0 0 5px 0 #BDBDBD",
    borderRadius: "10px",
    padding: "10px 20px 40px 20px",
    position : 'relative',
    backgroundColor : '#FFF'
  },
  mobileGraphCard: {
    width: "300px",
    minHeight: "300px",
  },
  desktopGraphCard: {
    width: "300px",
    height: "300px",
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
    fontSize: "30px",
    lineHeight: "36px",
  },
  mobilePercentage: {
    fontWeight: "bold",
    fontSize: "16px",
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
  cardInfo : {
    position: "absolute",
    bottom: 20,
    left : '33%'
  }
}));

function MultipleDataGraph({
  matches,
  graphData,
  handleSelectPage,
  handleWellness,
  goal
}) {
  const classes = useStyles();
  const percentageCalculate = (values) => {
    let totalPercentage = 0;
    values.map((val) => {
      totalPercentage = totalPercentage + val.data[1].value;
    });
    const avgPercentage = totalPercentage / graphData[0]?.dataItem?.length;
    return `${avgPercentage > 0  ?  avgPercentage.toFixed(0) : - avgPercentage.toFixed(0) }%`;
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(true);
  return (
    <div
      className={`${
        matches ? classes.mobileGraphCard : classes.desktopGraphCard
      } ${classes.graphCard} mx-2  my-2`}
    >
      <div className={`${classes.cardTitleBox} d-flex justify-content-between`}>
        <div className={classes.cardTittle}>
          {graphData && graphData[0]?.cardName}
        </div>
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
                // className={
                //   isHover
                //     ? `${classes.highlightWhite} ${classes.dropDownDimensions}`
                //     : `${classes.dropDownDimensions}`
                // }
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
                cx={matches ? 120: 110}
                cy={matches ? 120 : 110}
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
                    matches ? classes.mobilePercentage : classes.percentage
                  }
                >
                  {index == 0
                    ? percentageCalculate(graphData[0]?.dataItem)
                    : ""}
                </Label>
              </Pie>
            ))}
        </PieChart>
      </div>
      <div className={classes.cardInfo}>
       {goal ?  <div className='text-center'>{goal}</div> : null }
      </div>
    </div>
  );
}
export default MultipleDataGraph;