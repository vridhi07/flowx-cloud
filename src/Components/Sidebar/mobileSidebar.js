import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import WelcomeBack from "./welcomeBack";
import SidebarFooter from "./sidebarFooter";
import Box from "@material-ui/core/Box";
import { sidebarContent } from "../../Constant/sidebarContent";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawermaindiv: {
    display: "flex",
    marginLeft: "33px",
    marginTop: "12px",
  },
  dashboardItem: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
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
  dash_icon: {
    paddingRight: "5px",
  },
  divstyle: {
    paddingLeft: "13px",
    paddingRight: "13px",
  },
  sidebarItemStyle: {
    paddingLeft: "3px",
  },
}));

export default function MobileSidebar({
  selectedItemIndex,
  selectedSideItem,
  handleSelectSubSideItem,
  handleSelectSideIdtem,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = (e) => {
    if (
      e?.target?.attributes["alt"]?.value === "openIcon" ||
      e?.target?.attributes["data-openclose"]?.value === "true"
    ) {
      return;
    } else {
      setOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut().then(() => {
        localStorage.removeItem("currentUser");
        router.push("/login");
      });
    } catch (error) {}
  };

  return (
    <div className={classes.drawermaindiv}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        className={clsx(open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClick={(e) => handleDrawerClose(e)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          <Box>
            <WelcomeBack />
          </Box>
          <div className={classes.divstyle}>
            {sidebarContent.map((val, index) => (
              <div key={index} className={classes.dashboard}>
                <div
                  className={classes.dashboardTitle}
                  onClick={() => {
                    handleSelectSideIdtem(index);
                  }}
                  data-openclose
                >
                  <span className={classes.sidebarItemStyle} data-openclose>
                    {" "}
                    {val.sidebarItem}
                  </span>
                  {selectedSideItem.selectedList.includes(index) ? (
                    <img
                      className={classes.dash_icon}
                      src={"/dash_icon.png"}
                      alt="closeIcon"
                    />
                  ) : (
                    <img src={"/openIcon.png"} alt="openIcon" />
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
                                : handleSelectSubSideItem(i, index),
                                handleDrawerClose();
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
          <Box onClick={handleDrawerClose}>
            <SidebarFooter />
          </Box>
        </List>
      </Drawer>
    </div>
  );
}
