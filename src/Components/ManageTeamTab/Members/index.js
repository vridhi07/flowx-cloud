import React, {useState} from "react";
import { makeStyles } from "@mui/styles";
import MemberChallenges from './MemberChallenges'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#F1F4F5",
        minHeight: "100vh",
        paddingLeft: "30px",
    },
    titleContainer: {
        display: "flex",
        paddingTop: "30px",
    },
    title: {
        fontSize: "18px",
        fontWeight: "700",
        color: "#000", 
    },
    activeTitle : {
        fontSize: "18px",
        fontWeight: "700",
        color: "#0687D9",
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
        cursor :  'pointer' 
    },
   

}));

const pageList = [
    {
        name: 'Session',
        img: '/session.png'
    },
    {
        name: 'Challenge',
        img: '/challenge.png'
    }
]

function Members({handleSetCreateTeamBox}) {
    const [selectSession, setSession ] = useState('Challenge')
    const classes = useStyles()
    const handleSelectSetion = (name ) =>{
      setSession(name)
    }

  return (
    <div className={classes.root}>
      
      <MemberChallenges handleSetCreateTeamBox={handleSetCreateTeamBox} />
    </div>
  );
}
export default Members;
