import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import { auth, db } from "../../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  invitationDialogBox: {
    width: "500px",
    minHeight: "150px",
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
  },
  login_inputbox: {
    margin: "10px 0",
    padding: "20px 30px",
    outline: "none",
    boxSizing: "border-box",
    height: "45px",
    minWidth: "26%",
    borderRadius: "3px",
    border: "1px solid #B6C2CF",
  },
  btn: {
    padding: "12px 30px",
    borderRadius: "22px",
    border: "hidden",
    fontWeight: "500",
    marginTop: "16px",
    color: "#FFF",
    fontFamily: "Century Gothic",
    fontSize: "14px",
  },
  addOrgBtn: {
    backgroundColor: "#0687D9",
  },
  close: {
    backgroundColor: "#F45656",
  },
  invitationMessage: {
    color: "grey",
    fontFamily: "Century Gothic",
    fontSize: "12px",
    textAlign: "end",
  },
  validationText: {
    fontSize: "12px",
  },
  crossIcon: {
    marginLeft: "auto",
    cursor: "pointer",
  },
}));

function AddTeam({
  orgName,
  addTeamBox,
  handleCloseAddGroup,
  organisationList,
}) {
  const [team, setTeam] = useState("");
  const [teamValidation, setTeamValidation] = useState(false);
  const [addedTeamStatus, setAddedTeamStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const classes = useStyles();
  const handleAddTeam = async () => {
    setIsLoading(true);
    const orgCollectionList = await db.collection("Organisation").where(`organisationInfo.Name`, "==", `${orgName.Name}`).get();
    let teamList = orgCollectionList.docs[0].data().teamList;

    if (team) {
      if (!teamList.includes(team)) {
        let perviousData = await db.collection("Organisation").doc(organisationList.id[1]).get();
        let newCollectionList = perviousData.data();
        newCollectionList.teamList.push(team);
        db.collection("Organisation").doc(organisationList.id[1]).update(newCollectionList);
        setTeamValidation('addedTeam');
      } else {
        setTeamValidation("This Team is already added in this organisation ");
      }
    } else {
      setTeamValidation("Please enter the team name here");
    }

    setIsLoading(false);
  };

  const handleChange = (e) => {
    setTeam(e.target.value);
    setTeamValidation('');
  };
  return (
    <Dialog open={addTeamBox}>
      <DialogContent
        className={classes.invitationDialogBox}
        style={{ overflow: "hidden" }}
      >
        <DialogContentText id="alert-dialog-slide-description">
          {teamValidation == 'addedTeam' ? (
            <div className="d-flex flex-column">
              <div className={classes.crossIcon} onClick={handleCloseAddGroup}>
                <img src={"/crossIcon.png"} />
              </div>
              <div className="m-auto mt-2">
                <img src={"/successIcons.gif"} height="50px" width="50px" />
              </div>
              <div className="text-center">Added a new Team in {orgName.Name} Origanisation</div>
            </div>
          ) : (
            <div className={classes.formContent}>
              <input
                name="teamName"
                type="text"
                className={classes.login_inputbox}
                placeholder="Enter Team Name..."
                onChange={(e) => handleChange(e)}
              />
              {teamValidation ? (
                <div className={`${classes.validationText} text-danger`}>
                  {teamValidation}{" "}
                </div>
              ) : null}

              <div className="d-flex justify-content-between">
                <button
                  className={`${classes.btn} ${classes.close}`}
                  onClick={handleCloseAddGroup}
                >
                  Close
                </button>
                <button
                  className={`${classes.btn} ${classes.addOrgBtn}`}
                  onClick={handleAddTeam}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <>Add Team</>
                  )}
                </button>
              </div>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default AddTeam;
