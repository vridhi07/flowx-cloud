import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import TotalChart from "./TotalChart";
import WeeklyChart from "./WeeklyChart";
import DaysChart from "./DaysChart";
import useGetIndiviuallyUserDataOfTeams from '../../../../CustomHooks/useGetIndiviuallyUserDataOfTeams';

const useStyles = makeStyles((theme) => ({
  button_group: {
    height: "40px",
    boxShadow: "none",
    margin: "20px 0px",
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "space-between",
    padding: "5px 5px",
    width: "180px",
    borderRadius: "20px",
  },
  overview: {
    backgroundColor: "#FFF",
    borderColor: "none",
    border: "none",
    color: "#000",
    width: "50px",
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
    "&:hover": {
      backgroundColor: "#00A4E8",
      border: "none",
    },
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
  },
  filter: {
    marginLeft: "18px",
  },
}));

const tabList = ["Total", "Weekly", "Days"];
function LeaderboardChallenges({ matches, allPhList, fedlist }) {
  const [selectedTab, setSelectTab] = useState(0);
  const [weeklyUserData, dayWiseData,avgFedSPrints,avgPhSPrints,allWeekPhData,allWeekFedData] = useGetIndiviuallyUserDataOfTeams('30 Days Challenge');
  
  const classes = useStyles();
  const handleSelectTab = (index) => {
    setSelectTab(index);
  };

  return (
    <div>
      <div className={classes.filterContainer}>
        <div className={classes.button_group}>
          {tabList.map((val, index) => (
            <button
              key={index}
              onClick={() => handleSelectTab(index)}
              className={`${selectedTab == index && classes.active} ${
                classes.overview
              }`}
            >
              {val}
            </button>
          ))}
        </div>
        <img
          src={"/filter.png"}
          alt="filterIcon"
          height="25px"
          width="25px"
          className={classes.filter}
        />
      </div>

      {selectedTab == 0 ? (
        <TotalChart weeklyUserData={weeklyUserData?.length ? weeklyUserData : []} />
      ) : selectedTab == 1 ? (
        <WeeklyChart weeklyUserData={weeklyUserData?.length ? weeklyUserData : []} />
      ) : (
        <DaysChart
          matches={matches}
          allPhList={allPhList}
          fedlist={fedlist}
          dayWiseData={dayWiseData?.length ? dayWiseData : []}
        />
      )}
    </div>
  );
}
export default LeaderboardChallenges;
