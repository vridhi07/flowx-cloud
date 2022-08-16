import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { db, storage, auth } from "../../firebaseConfig";
import { Avatar } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const useStyles = makeStyles(() => ({
  welcomeTxt: {
    color: "#AEAEAE",
    fontWeight: "bold",
    fontSize: "13px",
  },
  name: {
    color: "#4F4F4F",
    fontSize: "15px",
  },
  avatarImg: {
    height: "55px",
    width: "55px",
    position: "relative",
    cursor: "Pointer",
  },
  welcomeBackMobile: {
    paddingRight: "13px",
    paddingLeft: "13px",
    display: "flex",
    alignItems: "center",
  },
  profileUploader: {
    opacity: 0,
    top: "5px",
    position: "absolute",
    left: "0px",
    height: "50px",
    width: "50px",
  },
}));

export default function WelcomeBack() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");
  const [userName, setUserName] = useState({
    firstName: "",
    lastName: "",
    imgUrl: "",
  });

  const getData = async () => {
    const userDetaildata = await db
      .collection("Users")
      .doc(auth?.currentUser?.uid)
      .get();
    const useDatas = userDetaildata?.data()?.userInfo;
    if (useDatas) {
      const { Name, Email, imgUrl } = await useDatas;
      const fullName = Name;
      const [firstName, lastName] = fullName.split(" ");
      setUserName((prev) => {
        return {
          ...prev,
          firstName,
          lastName,
          imgUrl,
        };
      });
    }
  };
  useEffect(() => {
    if (auth.currentUser?.uid) {
      getData();
    }
  }, [auth.currentUser?.uid]);

  const fileUploader = (file) => {
    if (file) {
      const storageRef = storage.ref(file.name);
      var uploadTask = storageRef.child("images/" + file.name).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (types.includes(selectedFile.type)) {
        setError(null);
        fileUploader(selectedFile);
      } else {
        setError("Please select an image file (png or jpg)");
      }
    }
  };
  useEffect(async () => {
    if (url) {
      const imgurl = {
        imgUrl: url,
      };
      const data = await db
        .collection("Users")
        .doc(auth?.currentUser.uid)
        .get();
      const useData = data?.data()?.userInfo;
      const newObject = { ...useData, ...imgurl };
      db.collection("Users")
        .doc(auth?.currentUser.uid)
        .set({ userInfo: newObject });
      getData();
    }
  }, [url]);

  return (
    <>
      <div className="d-flex justify-content-center my-2">
        <img src={"/logo.png"} width="165px" height="105px" alt="logo" />
      </div>
      <div className={classes.user}>
        <hr />
        <div className="row no-gutters align-items-center">
          <div
            className={
              mobileMediaQuery
                ? classes.welcomeBackMobile
                : "row no-gutters align-items-center"
            }
          >
            <div className="col-8 px-3 py-3">
              <div className={classes.welcomeTxt}>Welcome Back,</div>
              <div className={classes.name}>{userName.firstName}</div>
              <div className={classes.name}>{userName.lastName}</div>
            </div>
            <div className="col-4 px-0" style={{ position: "relative" }}>
              {userName.imgUrl ? (
                <>
                  <img
                    src={userName.imgUrl}
                    alt="user_pic"
                    height="70px"
                    width="70px"
                    className={`${classes.avatarImg} rounded-circle`}
                  />
                  <input
                    type="file"
                    className={classes.profileUploader}
                    onChange={handleChange}
                    style={{ opacity: 0 }}
                  />
                </>
              ) : (
                <>
                  <Avatar className={`${classes.avatarImg}`} alt="Avatar">
                    <input
                      type="file"
                      className={classes.profileUploader}
                      onChange={handleChange}
                      style={{ opacity: 0 }}
                    />
                    <span className="text-capitalize">
                      {userName?.firstName && userName.firstName[0]}
                    </span>
                  </Avatar>
                </>
              )}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}
