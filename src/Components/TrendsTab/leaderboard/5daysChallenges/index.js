import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import TotalChart from "./TotalCharts";
import DaysChart from "./DaysChart";
import useGetIndiviuallyUserDataOfTeams from '../../../../CustomHooks/useGetIndiviuallyUserDataOfTeams';
import useMediaQuery from '@mui/material/useMediaQuery';
const useStyles = makeStyles((theme) => ({
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
      mobilebutton_group :{
        height: "40px",
        boxShadow: "none",
        margin : '20px 0px',
        backgroundColor : '#FFF',
        display : 'flex',
        justifyContent : 'space-between',
        padding : '5px 5px',
        width : '120px',
        borderRadius : '20px',
        marginLeft:'15px'
      },
      overview: {
        backgroundColor: "#FFF",
        borderColor: "none",
        border : 'none',
        color: "#000",
        width : '50px',
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

const tabList = ["Total", "Days"];
function LeaderboardFiveDaysChallenges({ matches, 
  allPhList, fedlist }) {
  const [selectedTab, setSelectTab] = useState(0);
  const [weeklyUserData, dayWiseData,avgFedSPrints,avgPhSPrints,allWeekPhData,allWeekFedData] = useGetIndiviuallyUserDataOfTeams('5 Days Challenge');
 
  

  const classes = useStyles();
  const handleSelectTab = (index) => {
    setSelectTab(index);
  };
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  return (
    <div>
      <div className={classes.filterContainer}>
      <div
        className={mobileMediaQuery?classes.mobilebutton_group : classes.button_group}
      >
        {tabList.map((val,index) =>(
           <button
           onClick={() => handleSelectTab(index)}
           className={`${selectedTab == index && classes.active} ${classes.overview
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
      ) : <DaysChart
      matches={matches}
      allPhList={allPhList}
      fedlist={fedlist}
      dayWiseData={dayWiseData?.length ? dayWiseData : []}
    />}
      
    </div>
  );
}
export default LeaderboardFiveDaysChallenges;
