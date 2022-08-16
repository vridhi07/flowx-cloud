import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import LineGraph from "./LineGraph";
import { auth, db } from "../../firebaseConfig";

const useStyles = makeStyles((themes) => ({
  graphCard: {
    borderRadius: "8px",
    boxShadow: "0 0 5px 0 #BDBDBD",
    minHeight: "270px",
    // maxWidth: "270px",
    borderRadius: "10px",
    padding: "10px 20px 40px 20px",
    marginTop : '60px'
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
  },
}));

function LineChart({ cardName }) {
  const classes = useStyles();
  const [brainData, setBrainData] = useState()

  const getData = async () => {
    const AllBrainData = []
    if (auth && auth?.currentUser) {
      const brainDataRef = await db.collection("Users").doc(`${auth?.currentUser?.uid}`).collection("BrainTrainingSessions")
      brainDataRef.get().then((getBrainData) => {
        getBrainData.forEach((doc) => {
          AllBrainData.push(doc.data())
        });

        let shortedAllBrainData = AllBrainData.sort(function (x, y) {
          return x.date - y.date;
        });

        setBrainData(shortedAllBrainData)
      });
    }
  }

  useEffect(() => {
    getData()
  }, [auth?.currentUser])
  return (
    
    <div className={`${classes.graphCard} mx-3`}>
      <div className={`${classes.cardTitleBox} d-flex justify-content-between`}>
        <div className={classes.cardTittle}>{cardName}</div>
        <div className={classes.setting}>
          <img src={'/blockSetting.png'} />
        </div>
      </div>
      <div>
        <LineGraph brainData={brainData && brainData[0]} />
      </div>
    </div>
  );
}
export default LineChart;
