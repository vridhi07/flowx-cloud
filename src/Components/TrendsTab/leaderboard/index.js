import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";
import LeaderboardChallenges from './30daysChallenges';
import LeaderboardFiveDaysChallenges from './5daysChallenges';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F1F4F5",
        height: "100%",
        paddingLeft: "60px",
    },
    mobileDataroot:{
        backgroundColor: "#F1F4F5",
        height: "100%",
        paddingLeft: "7px",
    },
    titleContainer: {
        display: "flex",
        paddingTop: "30px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#4F4F4F",
    },
    secondTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#4F4F4F",
        marginLeft: "22px",
    },
    session: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor : 'pointer'

    },
}));

const pageList = [
    {
        name: "30 Days Challenge",
        img: "/challenge.png",
      },
      {
        name: "5 Days Challenge",
        img: "/5daysChallenges_icon.png",
      },
]

function Leaderboard({ matches, allPhList, fedlist }) {
    const classes = useStyles();
    const [selectSession, setSession ] = useState('30 Days Challenge');
    const handleSelectSetion = (name ) =>{
        setSession(name)
    }
    const mobileMediaQuery = useMediaQuery('(max-width:600px)');


    return (
        <div className={mobileMediaQuery?classes.mobileDataroot : classes.root}>
            <div className={classes.titleContainer}>
                {pageList.map((val,index) => (
                    <div key={index} className={`${classes.session} mx-3`} onClick={() =>handleSelectSetion(val.name)}>
                        <img src={val.img} alt="sessionIcon" height="45px" width="45px" />
                        <p className={classes.title}> {val.name} </p>
                    </div>
                ))}
            </div>
            <div>
            {selectSession == '30 Days Challenge' ? 
            <LeaderboardChallenges
             matches={matches}
             allPhList={allPhList}
             fedlist={fedlist}/> :
              <LeaderboardFiveDaysChallenges 
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
             />}
            </div>
        </div>
    )
}

export default Leaderboard;