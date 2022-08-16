import React, { useEffect, useState } from "react";
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
  deleteMessage : {
    fontSize : '20px',
    color : '#4F4F4F',
    lineHeight : '23px'
    
  }
}));

function DeleteUser({
  deleteUserBox,
  orgName,
  handleCloseDeleteUserBox,
  handleUpdateUserDetailsFromTeam,
  selected
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')  
  
  const classes = useStyles();
   const handleDeleteUser  = async () =>{
    setIsLoading(true)
      let orgData = await db
    .collection("Organisation")
    .where(`organisationInfo.Name`, "==", `${orgName.Name}`)
    .get();
     let orgId = orgData.docs[0].id;
     if(selected.length > 0){
         selected.map(val =>{
           let user_query = db.collection("Organisation").doc(orgId).collection('Developers').where(`id`, "==", val);
             user_query.get().then(function (querySnapshot) {
               querySnapshot.forEach(function (doc) {
                 doc.ref.delete();
               });
             });
             handleUpdateUserDetailsFromTeam()
             handleCloseDeleteUserBox()
         })
     }else{
        setError('Please Select Atleast One User')
     }
    setIsLoading(false)
   }
//   const handleAddTeam = async () => {
//     setIsLoading(true);
//     const orgCollectionList = await db.collection("Organisation").where(`organisationInfo.Name`, "==", `${orgName.Name}`).get();
//     let teamList = orgCollectionList.docs[0].data().teamList;

//     if (team) {
//       if (!teamList.includes(team)) {
//         let perviousData = await db.collection("Organisation").doc(organisationList.id[1]).get();
//         let newCollectionList = perviousData.data();
//         newCollectionList.teamList.push(team);
//         db.collection("Organisation").doc(organisationList.id[1]).update(newCollectionList);
//         setTeamValidation('addedTeam');
//       } else {
//         setTeamValidation("This Team is already added in this organisation ");
//       }
//     } else {
//       setTeamValidation("Please enter the team name here");
//     }

//     setIsLoading(false);
//   };

 
  return (
    <Dialog open={deleteUserBox}>
      <DialogContent
        className={classes.invitationDialogBox}
        style={{ overflow: "hidden" }}
      >
        <DialogContentText id="alert-dialog-slide-description">
         
            <div className={classes.formContent}>
                <div className={classes.deleteMessage}>Are you sure want to delete all selected users ?</div> 
                {error  ?<div className="text-danger" >{error}</div> : null}
              <div className="d-flex justify-content-between">
                <button
                  className={`${classes.btn} ${classes.close}`}
                  onClick={handleCloseDeleteUserBox}
                >
                  Close
                </button>
                <button
                  className={`${classes.btn} ${classes.addOrgBtn}`}
                  onClick={handleDeleteUser}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <> Delete Users</>
                  )}
                </button>
              </div>
            </div>
          
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default DeleteUser;
