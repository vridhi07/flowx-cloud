import React from "react";
import { makeStyles } from "@mui/styles";
import { auth } from "../../firebaseConfig";
import { sidebarContent } from "../../Constant/sidebarContent";
import WelcomeBack from "./welcomeBack";
import SidebarFooter from "./sidebarFooter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    padding: "10px 35px",
  },
  name: {
    color: "#4F4F4F",
    fontSize: "15px",
  },
  avatarImg: {
    height: "55px",
    width: "55px",
    // margin: "6px 22px",
  },
  hr: {
    backgroundColor: "#000",
  },
  dashboardTitle: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    color: "#AEBCC6",
    lineHeight: "18px",
    cursor: "pointer",
    fontWeight: "700",
    padding: "7px 0px",
  },

  dashboardItem: {
    display: "flex",
    alignItems: "center",
  },
  itemName: {
    marginLeft: "3px",
    fontSize: "15px",
    color: "#4F4F4F",
    fontWeight: "700",
    cursor: "pointer",
  },
  selectedItemName: {
    marginLeft: "3px",
    fontSize: "15px",
    color: "#0687D9",
    fontWeight: "700",
    cursor: "pointer",
  },
  contactContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  dash_icon: {
    paddingRight: "5px",
  },
}));

function Sidebar({
  selectedItemIndex,
  selectedSideItem,
  handleSelectSubSideItem,
  handleSelectSideIdtem,
}) {
  const classes = useStyles();

  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => {
        localStorage.removeItem("currentUser");
        router.push("/login");
      });
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.root}>
        <WelcomeBack />
        <div>
          {sidebarContent.map((val, index) => (
            <div key={index} className={classes.dashboard}>
              <div
                className={classes.dashboardTitle}
                onClick={() => {
                  handleSelectSideIdtem(index);
                }}
              >
                <span> {val.sidebarItem}</span>
                {selectedSideItem.selectedList.includes(index) ? (
                  <img
                    style={{ height: "max-content" }}
                    className={classes.dash_icon}
                    src={"/dash_icon.png"}
                    alt="openIcon"
                  />
                ) : (
                  <img
                    style={{ height: "max-content" }}
                    src={"/openIcon.png"}
                    alt="openIcon"
                  />
                )}
              </div>
              {selectedSideItem.selectedList.includes(index) && (
                <div>
                  {val.sidebarSubItem.length &&
                    val.sidebarSubItem.map((kl, i) => (
                      <div className={classes.dashboardItem}>
                        {kl.img ? <img src={kl.img} alt="openIcon" /> : null}
                        <span
                          className={
                            selectedItemIndex == i &&
                            selectedSideItem.currentSelected == index
                              ? classes.selectedItemName
                              : classes.itemName
                          }
                          onClick={() => {
                            kl.name == "Logout"
                              ? handleLogout()
                              : handleSelectSubSideItem(i, index);
                          }}
                        >
                          {kl.name}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <SidebarFooter />
      </div>
    </>
  );
}
export default Sidebar;
