import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { db } from "../src/firebaseConfig";
import CircularProgress from "@mui/material/CircularProgress";
import getName from "../src/Utils/getName";

const useStyles = makeStyles((theme) => ({
  invitation_card: {
    width: "310px",
    // height: "350px",
    boxShadow: "0 0 20px 0 #7D8B9B",
    borderRadius: "12px",
    marginTop: "10px",
  },
  logo_avtar: {
    textAlign: "",
  },
  boxText: {
    color: "#4F4F4F",
    fontSize: "17px",
  },
  name: {
    color: "#000",
    fontSize: "17px",
    fontWeight: "700",
    textTransform: "capitalize",
  },
  orgBox: {
    // backgroundColor : '#bdbdbd',
    border: "1px solid #B6C2CF",
    borderRadius: "3px",
    margin: "0px 30px",

    borderRadius: "5px",
  },
  organisationName: {
    fontSize: "18px",
    color: "#8A9DB3",
    fontWeight: "700",
    padding: "12px 0px",
    lineHeight: "16px",
  },
  horizentalRow: {
    margin: "10px 15px 10px 15px",
    border: "1.5px solid #b2bfcd",
    boxSizing: "border-box",
  },
  headingDesc: {
    color: "#AEAEAE",
    fontWeight: "700",
  },
  team: {
    fontSize: "14px",
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    borderRadius: "25px",
    padding: "12px 32px",
    color: "#fff",
  },
  cancel: {
    backgroundColor: "#F45656",
  },
  accept: {
    backgroundColor: "#0687D9",
  },
}));

function InvitationPage() {
  const [userValidation, setUserValidation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let router = useRouter();
  const classes = useStyles();

  const handleAcceptance = async () => {
    setIsLoading(true);
    let queryData = router.query;
    let userCollection = await db.collection("Users").doc(queryData.id).get();
    let userInfo = userCollection.data().userInfo;
    let { Email, Name } = userInfo;

    let teamUserCollection = await db
      .collection("Organisation")
      .doc(queryData.orgId)
      .collection(router.query.team)
      .where("id", "==", queryData.id)
      .get();
    if (teamUserCollection?.docs[0]?.data().invitationStatus === "accepted") {
      setIsLoading(false);
      setUserValidation("you are already added in this group");
    } else {
      if (queryData) {
        db.collection("Organisation")
          .doc(queryData.orgId)
          .collection(router.query.team)
          .doc(queryData.id)
          .set({
            email: Email,
            id: queryData.id,
            firstName: getName(Name)[0],
            lastName: getName.length > 1 ? getName(Name)[1] : "",
            team: router.query.team,
            role: router.query.role,
            reports: "Leadership",
            invitationStatus: "accepted",
          })
          .then((data) => {
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error("Error writing document: ", error);
          });
      }
      router.push("/login");
      // setUserValidation("Now you are added in this group");
    }
  };
  const handleCancel = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-center ">
        <div className={classes.invitation_card}>
          <div className=" pt-2 d-flex justify-content-center">
            <img className={classes.logo_avtar} src={"/logo.png"} />
          </div>
          <hr className={classes.horizentalRow} />
          {!userValidation ? (
            <div>
              <div className={`text-center  ${classes.boxText}`}>
                Hi <span className={classes.name}>{router.query.name}</span> ,{" "}
              </div>
              <div className={`text-center  ${classes.boxText}`}>The</div>
              <div
                className={`d-flex justify-content-center ${classes.orgBox}`}
              >
                <div className={`text-center ${classes.organisationName}`}>
                  {router.query.orgName}
                </div>
              </div>
              <div className={`text-center pt-1 ${classes.boxText}`}>
                Organisation
              </div>
              <div className={`text-center pt-3 mx-4 ${classes.boxText}`}>
                has invited you to become a member of the
              </div>
              <div
                className={`d-flex justify-content-center mt-2 ${classes.orgBox}`}
              >
                <div className={`text-center ${classes.organisationName}`}>
                  {router.query.team}
                </div>
              </div>
              <div className="text-center mt-2">Team</div>
              <div className="text-center mt-2 mx-4">
                Please press the accept button below to join the team
              </div>

              <div className="d-flex justify-content-around align-items-end py-4">
                <button
                  onClick={handleCancel}
                  className={`border-0 ${classes.button} ${classes.cancel}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAcceptance}
                  className={`border-0 ${classes.button} ${classes.accept}`}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Accept"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className={`m-5 text-center ${classes.headingDesc}`}>
                {userValidation}
              </div>
              <div className="d-flex justify-content-center my-3">
                <button
                  onClick={handleCancel}
                  className={` border-0  ${classes.button}  ${classes.accept}`}
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default InvitationPage;
