import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Sidebar from "../Sidebar";
import MobileSidebar from "../Sidebar/mobileSidebar";
import useMediaQuery from '@mui/material/useMediaQuery';
import { db } from "../../../firebaseConfig";
import Error from "next/error";
import BrainData from "./Data/BrainData";
import filterWeekWisePowerHourData from "../../../Utils/filterWeekWisePh";
import filterWeekwiseFedData from "../../../Utils/filterWeekwiseFedData";
import calculateAvgandFilteredPhWise from "../../../Utils/calculateAvgandFilteredPhWise";
import HomePage from "./Home";
import Individual from "./Individual";
import Members from "./ManageTeam/Members";
import Leaderboard from "./leaderboard";
import Team from "./team";
import Group from "../../Group";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#F1F4F5",
    width: "100%",
  },
  
}));

function WorkplaceWellness({ matches, handleSelectPage }) {
  const [active, setActive] = useState(0);
  const [selectTab, setSelectTab] = useState("Overview");
  const [overView, setOverView] = useState([]);
  const [fedlist, setFedList] = useState([]);
  const [weeklyPhList, setWeeklyPhList] = useState([]);
  const [allPhList, setAllPhList] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedChallenges, setSelectedChallenges] =
    useState("30 Days Challenge");
  const [userId, setUserId] = useState("");
  const [openSidbar, setSidebar] = useState({
    isSelected: true,
    selectedIndex: 0,
  });
  const [selectedSideItem, setSelectedSideItem] = useState({
    selectedList: [0],
    currentSelected: 0,
  });
  const [subSideItem, setSubSideItem] = useState(0);
  const [addTeamData , setAddTeamData] = useState({
    organisationList : {},
    allOrgUserList : [],
    orgName: {}
  })
  const tabletMediaQuery = useMediaQuery('(max-width:1200px)');
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  const handleSelectSideIdtem = (index) => {
    let selectedSideBar = [...selectedSideItem.selectedList];
    if (selectedSideBar.includes(index)) {
      let filterValue = selectedSideBar.filter((val) => val !== index);
      setSelectedSideItem({
        ...selectedSideItem,
        selectedList: filterValue,
        currentSelected: index,
      });
    } else {
      selectedSideBar.push(index);
      setSelectedSideItem({
        ...selectedSideItem,
        selectedList: selectedSideBar,
        currentSelected: index,
      });
    }
    setSubSideItem(0);
    // setSidebar({
    //   ...openSidbar,
    //   isSelected:
    //     openSidbar.selectedIndex == index && openSidbar.isSelected == true
    //       ? false
    //       : true,
    //   selectedIndex: index,
    // });
  };

  const handleSelectSubSideItem = (i, index) => {
    // setSubSideItem(i);
    let selectedSideBar = [...selectedSideItem.selectedList];
    if (selectedSideBar.includes(index)) {
      // let filterValue = selectedSideBar.filter((val) => val !== index);
      setSelectedSideItem({
        ...selectedSideItem,
        selectedList: selectedSideBar,
        currentSelected: index,
      });
    } else {
      selectedSideBar.push(index);
      setSelectedSideItem({
        ...selectedSideItem,
        selectedList: selectedSideBar,
        currentSelected: index,
      });
    }
    setSubSideItem(i);
  };

  const classes = useStyles();

  const getDataWeekWise = async (weeknumber, selectedChallengesValues) => {
    if (userId) {
      let powerHour = [];
      let weekwiseData = await db
        .collection("Users")
        .doc(`${JSON.parse(localStorage.getItem("currentUser"))}`)
        .collection("WorkplaceWellness")
        .doc(selectedChallengesValues)
        .collection("Programs")
        .where("week", "==", `Week ${weeknumber}`)
        .get();
      if (weekwiseData?.docs?.length) {
        weekwiseData.docs.map((doc) => {
          if (doc.data().program.includes("Power Hour")) {
            powerHour.push(doc.data());
          }
        });
      } else {
        powerHour.length = 0;
      }

      if (powerHour.length) {
        let filteredPhList = calculateAvgandFilteredPhWise(
          powerHour,
          `Week ${weeknumber}`
        );
        setWeeklyPhList(filteredPhList);
      } else {
        setWeeklyPhList([]);
      }
    }
  };

  useEffect(() => {
    if (selectedChallenges) {
      getOverViewData();
    }
    return () => {
      getOverViewData(); //whenever the component removes it will executes
    };
  }, [selectedChallenges]);

  useEffect(() => {
    if (selectedWeek) {
      getDataWeekWise(selectedWeek, selectedChallenges);
    }
  }, [selectedWeek]);

  useEffect(() => {
    if (active == 0) {
      setSelectTab("Overview");
    } else if (active == 1) {
      setSelectTab("Total");
    } else {
      setSelectTab("Single");
    }
  }, [active]);

  const getOverViewData = async () => {
    try {
      if (userId) {
        let fed = [];
        let weeklyPowerHour = [];
        let allPowerHour = [];
        let overViewRef = await db
          .collection("Users")
          .doc(`${userId}`)
          .collection("WorkplaceWellness")
          .doc(selectedChallenges)
          .collection("Programs")
          .get();
        if (overViewRef?.docs?.length) {
          overViewRef.docs.map((doc) => {
            if (doc.data().program == "FED") {
              fed.push(doc.data());
            }
            if (
              doc.data().program.includes("Power Hour") &&
              doc.data().week == "Week 1"
            ) {
              weeklyPowerHour.push(doc.data());
            }
            if (doc.data().program.includes("Power Hour")) {
              allPowerHour.push(doc.data());
            }
          });
        } else {
          fed.length = 0;
          allPowerHour.length = 0;
          weeklyPowerHour.length = 0;
        }

        if (fed.length) {
          let allWeeekFilterFed = filterWeekwiseFedData(fed);
          setFedList(allWeeekFilterFed);
        } else {
          setFedList([]);
        }

        if (weeklyPowerHour.length) {
          let filteredPhList = calculateAvgandFilteredPhWise(
            weeklyPowerHour,
            "Week 1"
          );
          setWeeklyPhList(filteredPhList);
        } else {
          setWeeklyPhList([]);
        }

        if (allPowerHour.length) {
          let allFilteredweekisePhList =
            filterWeekWisePowerHourData(allPowerHour);
          setAllPhList(allFilteredweekisePhList);
        } else {
          setAllPhList([]);
        }
        let totalFlow = [];
        if (overViewData?.length) {
          overViewData.map((val) => {
            if (val["sprint 0"]) {
              totalFlow.push({ ...val["sprint 0"], week: val.week });
            }
            if (val["sprint 1"]) {
              totalFlow.push({ ...val["sprint 1"], week: val.week });
            }
            if (val["sprint 2"]) {
              totalFlow.push({ ...val["sprint 2"], week: val.week });
            }
            if (val["sprint 3"]) {
              totalFlow.push({ ...val["sprint 3"], week: val.week });
            }
            if (val["sprint 4"]) {
              totalFlow.push({ ...val["sprint 4"], week: val.week });
            }
          });
        }
        setOverView(totalFlow);
      } else {
        setOverView([]);
      }
    } catch (error) {
      <Error statusCode={error} />;
    }
  };

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    if (userId) {
      getOverViewData();
    }
  }, [userId]);

  const handleSelectedChallenges = (value) => {
    setSelectedChallenges(value);
  };

  const handleSetCreateTeamBox = async (organisationList,orgName, index) =>{
    let  selectedSideBar = [...selectedSideItem.selectedList];
    setSelectedSideItem({
      ...selectedSideItem,
      selectedList: selectedSideBar,
      currentSelected: index,
    });

    setSubSideItem(2) 
    setAddTeamData({...addTeamData,
      organisationList : organisationList,
      orgName : orgName
    })
  }
  const handleBackOrganization = () =>{


    setSelectedSideItem({
      ...selectedSideItem,
      currentSelected: 3,
    });
    setSubSideItem(0)
  }
  return (
  <div className="row g-0">
      {mobileMediaQuery? 
      <div className="col-12 mx-0 px-0" style={{backgroundColor: "#F1F4F5" ,overflow: "hidden"}}> 
      <MobileSidebar
          subSideItem={subSideItem}
          selectedSideItem={selectedSideItem}
          handleSelectSubSideItem={handleSelectSubSideItem}
          handleSelectSideIdtem={handleSelectSideIdtem}
      />
       <div>
          {selectedSideItem.currentSelected == 0 && subSideItem == 0 ? (
            <Individual
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
              handleSelectedChallenges={handleSelectedChallenges}
            />
          ) : null}
          {selectedSideItem.currentSelected == 3 && subSideItem == 0 ? (
            <Members  handleSetCreateTeamBox={handleSetCreateTeamBox}/>
          ) : null}
          {selectedSideItem.currentSelected == 3 && subSideItem == 2 ? (
            <Group 
            organisationList = {addTeamData.organisationList}
            orgName = {addTeamData.orgName} 
            handleBackOrganization={handleBackOrganization}
            />
          ) : null}
          {selectedSideItem.currentSelected == 0 && subSideItem == 1 ? (
            <Leaderboard
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
            />
          ) : null}
          {selectedSideItem.currentSelected == 0 && subSideItem == 2 ? (
            <Team
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
            />
          ) : null}
          {selectedSideItem.currentSelected == 2 && subSideItem == 0  ? (
            <BrainData />
          ) : null}
        </div>
      </div>
      :
      <>
       <div className={tabletMediaQuery?"col-4 col-md-3 col-lg-3 mx-0 px-0":"col-4 col-md-3 col-lg-2 mx-0 px-0"}>
      <Sidebar
        subSideItem={subSideItem}
        selectedSideItem={selectedSideItem}
        // selectedItemIndex={selectedItemIndex}
        // openSidbar={openSidbar}
        handleSelectSubSideItem={handleSelectSubSideItem}
        handleSelectSideIdtem={handleSelectSideIdtem}
       />   
      </div>
      <div className={tabletMediaQuery?"col-8 col-md-9 col-lg-9 mx-0 px-0":"col-8 col-md-9 col-lg-10 mx-0 px-0"} style={{overflow:"hidden"}}>
        <div>
          {selectedSideItem.currentSelected == 0 && subSideItem == 0 ? (
            <Individual
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
              handleSelectedChallenges={handleSelectedChallenges}
            />
          ) : null}
          {selectedSideItem.currentSelected == 3 && subSideItem == 0 ? (
            <Members  handleSetCreateTeamBox={handleSetCreateTeamBox}/>
          ) : null}
          {selectedSideItem.currentSelected == 3 && subSideItem == 2 ? (
            <Group 
            organisationList = {addTeamData.organisationList}
            orgName = {addTeamData.orgName} 
            handleBackOrganization={handleBackOrganization}
            />
          ) : null}
          {selectedSideItem.currentSelected == 0 && subSideItem == 1 ? (
            <Leaderboard
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
            />
          ) : null}
          {selectedSideItem.currentSelected == 0 && subSideItem == 2 ? (
            <Team
              selectTab={selectTab}
              matches={matches}
              allPhList={allPhList}
              fedlist={fedlist}
            />
          ) : null}
          {selectedSideItem.currentSelected == 2 && subSideItem == 0  ? (
            <BrainData />
          ) : null}
        </div>
      </div> 
      </> }
    </div>
  );
}
export default WorkplaceWellness;
