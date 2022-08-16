import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";


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

  validationText: {
    fontSize: "12px",
  },
  crossIcon : {
    marginLeft : 'auto',
    cursor : 'pointer'
  }
}));

function SentConfirmationModal({
  sentEmailStatus,
  handleCloseEmailBox,
}) {
  const classes = useStyles();

  useEffect(() =>{
    if(sentEmailStatus == true){
      setTimeout(handleCloseEmailBox, 3000)
    }
  },[sentEmailStatus])
  return (
    <Dialog open={sentEmailStatus}>
      <DialogContent
        className={classes.invitationDialogBox}
        style={{ overflow: "hidden" }}
      >
        <DialogContentText id="alert-dialog-slide-description">
            <div className="d-flex flex-column">
               <div className={classes.crossIcon} onClick={handleCloseEmailBox}><img src={'/crossIcon1.png'}/></div>
               <div className="m-auto mt-2"><img src={'/successIcons.gif'} height='50px' width='50px' /></div>
               <div className="text-center">Invitation Sent Successfully</div>
            </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
export default SentConfirmationModal;
