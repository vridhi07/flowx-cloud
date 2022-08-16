import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import MobileSidebar from "../Sidebar/mobileSidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { db } from "../../firebaseConfig";
import Error from "next/error";
import filterWeekWisePowerHourData from "../../Utils/filterWeekWisePh";
import filterWeekwiseFedData from "../../Utils/filterWeekwiseFedData";
import BrainData from "../DataTab/BrainData";
import Individual from "../DashboardTab/Individual";
import Team from "../DashboardTab/Team";
import Members from "../ManageTeamTab/Members";
import Leaderboard from "../DashboardTab/leaderboard";
import Group from "../Group";

import TrendsIndividual from "../TrendsTab/Individual";
import TrendsLeaderboard from "../TrendsTab/leaderboard";
import TrendsTeam from "../TrendsTab/Team";

function DashboardPage({ matches }) {
  const [overView, setOverView] = useState([]);
  const [fedlist, setFedList] = useState([]);
  const [allPhList, setAllPhList] = useState([]);
  const [selectedChallenges, setSelectedChallenges] =
    useState("30 Days Challenge");
  const [userId, setUserId] = useState("");
  //for sidebar open or close
  const [selectedSideItem, setSelectedSideItem] = useState({
    selectedList: [0],
    currentSelected: 0,
  });
  //for sidebar open or close
  const [subSideItem, setSubSideItem] = useState(0);
  const [addTeamData, setAddTeamData] = useState({
    organisationList: {},
    allOrgUserList: [],
    orgName: {},
  });
  const tabletMediaQuery = useMediaQuery("(max-width:1200px)");
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");
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
  };

  const handleSelectSubSideItem = (i, index) => {
    let selectedSideBar = [...selectedSideItem.selectedList];
    if (selectedSideBar.includes(index)) {
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

  useEffect(() => {
    if (selectedChallenges) {
      getOverViewData();
    }
    return () => {
      getOverViewData();
    };
  }, [selectedChallenges]);

  const getOverViewData = async () => {
    try {
      if (userId) {
        let fed = [];
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

            if (doc.data().program.includes("Power Hour")) {
              allPowerHour.push(doc.data());
            }
          });
        } else {
          fed.length = 0;
          allPowerHour.length = 0;
        }

        if (fed.length) {
          let allWeeekFilterFed = filterWeekwiseFedData(fed);
          setFedList(allWeeekFilterFed);
        } else {
          setFedList([]);
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

  const handleSetCreateTeamBox = async (organisationList, orgName, index) => {
    let selectedSideBar = [...selectedSideItem.selectedList];
    setSelectedSideItem({
      ...selectedSideItem,
      selectedList: selectedSideBar,
      currentSelected: index,
    });

    setSubSideItem(2);
    setAddTeamData({
      ...addTeamData,
      organisationList: organisationList,
      orgName: orgName,
    });
  };
  const handleBackOrganization = () => {
    setSelectedSideItem({
      ...selectedSideItem,
      currentSelected: 3,
    });
    setSubSideItem(0);
  };
  return (
    <div className="row g-0">
      {mobileMediaQuery ? (
        <div
          className="col-12 mx-0 px-0"
          style={{ backgroundColor: "#F1F4F5", overflow: "hidden" }}
        >
          <MobileSidebar
            subSideItem={subSideItem}
            selectedSideItem={selectedSideItem}
            handleSelectSubSideItem={handleSelectSubSideItem}
            handleSelectSideIdtem={handleSelectSideIdtem}
          />
          <div>
            {selectedSideItem.currentSelected == 0 && subSideItem == 0 ? (
              <Individual
                matches={matches}
                allPhList={allPhList}
                fedlist={fedlist}
                handleSelectedChallenges={handleSelectedChallenges}
              />
            ) : null}
            {selectedSideItem.currentSelected == 1 && subSideItem == 0 ? (
              <TrendsIndividual
                matches={matches}
                allPhList={allPhList}
                fedlist={fedlist}
                handleSelectedChallenges={handleSelectedChallenges}
              />
            ) : null}
            {selectedSideItem.currentSelected == 3 && subSideItem == 0 ? (
              <Members handleSetCreateTeamBox={handleSetCreateTeamBox} />
            ) : null}
            {selectedSideItem.currentSelected == 3 && subSideItem == 2 ? (
              <Group
                organisationList={addTeamData.organisationList}
                orgName={addTeamData.orgName}
                handleBackOrganization={handleBackOrganization}
              />
            ) : null}
            {selectedSideItem.currentSelected == 0 && subSideItem == 1 ? (
              <Leaderboard
                matches={matches}
                allPhList={allPhList}
                fedlist={fedlist}
              />
            ) : null}
            {selectedSideItem.currentSelected == 1 && subSideItem == 1 ? (
              <TrendsLeaderboard
                matches={matches}
                allPhList={allPhList}
                fedlist={fedlist}
              />
            ) : null}
            {selectedSideItem.currentSelected == 0 && subSideItem == 2 ? (
              <Team matches={matches} allPhList={allPhList} fedlist={fedlist} />
            ) : null}
            {selectedSideItem.currentSelected == 1 && subSideItem == 2 ? (
              <TrendsTeam
                matches={matches}
                allPhList={allPhList}
                fedlist={fedlist}
              />
            ) : null}
            {selectedSideItem.currentSelected == 2 && subSideItem == 0 ? (
              <BrainData />
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div
            className={
              tabletMediaQuery
                ? "col-4 col-md-3 col-lg-3 mx-0 px-0"
                : "col-4 col-md-3 col-lg-2 mx-0 px-0"
            }
          >
            <Sidebar
              subSideItem={subSideItem}
              selectedSideItem={selectedSideItem}
              handleSelectSubSideItem={handleSelectSubSideItem}
              handleSelectSideIdtem={handleSelectSideIdtem}
            />
          </div>
          <div
            className={
              tabletMediaQuery
                ? "col-8 col-md-9 col-lg-9 mx-0 px-0"
                : "col-8 col-md-9 col-lg-10 mx-0 px-0"
            }
            style={{ overflow: "hidden" }}
          >
            <div>
              {selectedSideItem.currentSelected == 0 && subSideItem == 0 ? (
                <Individual
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                  handleSelectedChallenges={handleSelectedChallenges}
                />
              ) : null}
              {selectedSideItem.currentSelected == 1 && subSideItem == 0 ? (
                <TrendsIndividual
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                  handleSelectedChallenges={handleSelectedChallenges}
                />
              ) : null}
              {selectedSideItem.currentSelected == 3 && subSideItem == 0 ? (
                <Members handleSetCreateTeamBox={handleSetCreateTeamBox} />
              ) : null}
              {selectedSideItem.currentSelected == 3 && subSideItem == 2 ? (
                <Group
                  organisationList={addTeamData.organisationList}
                  orgName={addTeamData.orgName}
                  handleBackOrganization={handleBackOrganization}
                />
              ) : null}
              {selectedSideItem.currentSelected == 0 && subSideItem == 1 ? (
                <Leaderboard
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                />
              ) : null}
              {selectedSideItem.currentSelected == 1 && subSideItem == 1 ? (
                <TrendsLeaderboard
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                />
              ) : null}
              {selectedSideItem.currentSelected == 0 && subSideItem == 2 ? (
                <Team
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                />
              ) : null}
              {selectedSideItem.currentSelected == 1 && subSideItem == 2 ? (
                <TrendsTeam
                  matches={matches}
                  allPhList={allPhList}
                  fedlist={fedlist}
                />
              ) : null}
              {selectedSideItem.currentSelected == 2 && subSideItem == 0 ? (
                <BrainData />
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export default DashboardPage;
