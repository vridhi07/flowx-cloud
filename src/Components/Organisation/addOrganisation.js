import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@mui/material/TextField";
import { auth, db } from "../../firebaseConfig";

const useStyles = makeStyles((theme) => ({
  invitationDialogBox: {
    width: "500px",
    minHeight: "150px",
    boxShadow : '0 0 20px 0 #7D8B9B'
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
  },
  login_inputbox: {
    margin: "10px 0",
    padding: "20px 15px",
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
  crossIcon : {
    marginLeft : 'auto',
    cursor : 'pointer'
  }
}));

function AddOrganisation({
  orgValidation,
  modalStatus,
  handleAddOrganisation,
  handleChangeOrgName,
  handleCloseAddOrgModel,
}) {
  const classes = useStyles();

  return (
    <Dialog open={modalStatus}>
      <DialogContent
        className={classes.invitationDialogBox}
        style={{ overflow: "hidden" }}
      >
        <DialogContentText id="alert-dialog-slide-description">
          {orgValidation ? (
            <div className="d-flex flex-column">
            <div className={classes.crossIcon} onClick={handleCloseAddOrgModel}><img src={'/crossIcon.png'}/></div>
            <div className="text-center">{orgValidation}</div>
         </div>
          ) : (
            <div className={classes.formContent}>
              <input
                name="lastName"
                type="text"
                className={classes.login_inputbox}
                placeholder="Organisation name..."
                onChange={(e) => handleChangeOrgName(e)}
              />
              <div className={classes.invitationMessage}></div>
              <div className="d-flex justify-content-between">
                <button
                  className={`${classes.btn} ${classes.close}`}
                  onClick={handleCloseAddOrgModel}
                >
                  Close
                </button>
                <button
                  className={`${classes.btn} ${classes.addOrgBtn}`}
                  onClick={handleAddOrganisation}
                >
                  Add Organisation
                </button>
              </div>
            </div>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default AddOrganisation;
