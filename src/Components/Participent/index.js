import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { auth, db } from "../../firebaseConfig";
import axios from "axios";
import getName from "../../Utils/getName";

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
  crossIcon: {
    marginLeft: "auto",
    cursor: "pointer",
  },
}));

function Participate({
  participentBox,
  handleCloseAddInvitationBox,
  handleCloseAfterAddGroup,
  orgName,
  groupName,
}) {
  const [email, setEmail] = useState("");
  const [userValidation, setUserValidation] = useState(false);
  const [sendInvitationStatus, setSendInvitationStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const organisationName = (orgNameValue) => {
    let orgNameList = getName(orgNameValue);
    if (orgNameList?.length > 1) {
      return `${orgNameList[0]}%20${orgNameList[1]}`;
    } else {
      return orgNameList;
    }
  };

  const handleInvitation = async () => {
    setIsLoading(true);
    let dwdfew = await db
      .collection("Users")
      .where(`userInfo.Email`, "==", `${email}`)
      .get();

    let userInfo = dwdfew?.docs[0]?.data()?.userInfo;

    if (userInfo) {
      const [firstName, ...lastName] = userInfo.Name?.split(" ");
      axios({
        method: "post",
        // url: "http://localhost:5001/flowx-2be91/us-central1/sendEmail",
        url: "https://us-central1-flowx-2be91.cloudfunctions.net/sendEmail",
        data: {
          email: email,
          name: userInfo.Name,
          message: "Successfuly message sent!",
          url: `${`https://flowx-2be91.web.app/invitation?orgId=ke0z1G4lACIj3rbQRXQi&orgName=${organisationName(
            orgName.Name
          )}&team=${groupName}&role=Participant&name=${firstName}&id=${
            dwdfew.docs[0].id
          }`}`,
        },
      }).then(
        (response) => {
          if (response?.status == 200) {
            setSendInvitationStatus(true);
            setIsLoading(false);
          } else {
          }
        },
        (error) => {}
      );
    } else {
      setUserValidation(true);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setUserValidation(false);
  };

  useEffect(() => {
    if (sendInvitationStatus) {
      setTimeout(handleCloseAddInvitationBox, 3000);
    }
  }, [sendInvitationStatus]);
  return (
    <Dialog open={participentBox}>
      <DialogContent
        className={classes.invitationDialogBox}
        style={{ overflow: "hidden" }}
      >
        <DialogContentText id="alert-dialog-slide-description">
          {sendInvitationStatus ? (
            <div className="d-flex flex-column">
              <div
                className={classes.crossIcon}
                onClick={handleCloseAddInvitationBox}
              >
                <img src={"/crossIcon1.png"} />
              </div>
              <div className="m-auto mt-2">
                <img src={"/successIcons.gif"} height="50px" width="50px" />
              </div>
              <div className="text-center">Invitation Sent Successfully</div>
            </div>
          ) : (
            <div className={classes.formContent}>
              <input
                name="lastName"
                type="email"
                className={classes.login_inputbox}
                placeholder="Enter email here ..."
                onChange={(e) => handleChange(e)}
              />
              {userValidation ? (
                <div className={`${classes.validationText} text-danger`}>
                  This user is not exist{" "}
                </div>
              ) : null}

              <div className="d-flex justify-content-between">
                <button
                  className={`${classes.btn} ${classes.close}`}
                  onClick={handleCloseAddInvitationBox}
                >
                  Close
                </button>
                <button
                  className={`${classes.btn} ${classes.addOrgBtn}`}
                  onClick={handleInvitation}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    <>Send Invitation</>
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
export default Participate;
