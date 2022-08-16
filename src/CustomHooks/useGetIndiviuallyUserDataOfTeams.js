import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import filterWeekwiseFedData from "../Utils/filterWeekwiseFedData";
import AvgofAllSprintsperWeek from "../Utils/AvgofAllSprintsperWeek";
import calculateAvgOfPerWeekData from "../Utils/CalculateAvgofPerWeekData";
import avgCalculation from "../Utils/AvgCalculation";
import calculateAvgandFilteredPhWise from "../Utils/calculateAvgandFilteredPhWise";

function useGetIndiviuallyUserDataOfTeams(dayChallenges) {
  const [userIdList, setUserIdList] = useState([
    "X1uoGXCTJuSaX8DYddN54W96ow13",
    "2dHS5UJzXvWM2UO0Z12NmiCcLd02",
  ]);
  const [userDataList, setUserDataList] = useState([]);
  const [userFilteredData, setUserFilteredData] = useState([]);
  const [weeklyUserData, setWeeklyUserData] = useState([]);
  const [dayWiseData, setDayWiseData] = useState([]);
  const [avgFedSPrints, setAvgFedSPrints] = useState([]);
  const [avgPhSPrints, setAvgPhSPrints] = useState([]);
  const [allWeekPhData, setAllWeekPhData] = useState([]);
  const [allWeekFedData, setAllWeekFedData] = useState([]);

  useEffect(() => {
    if (avgPhSPrints?.length) {
      let updatedData = avgPhSPrints.map((val) => {
        let updatedph = val.ph.map((kl) => {
          return {
            ...kl,
            week: val.week,
          };
        });
        return {
          ...val,
          ph: updatedph,
        };
      });
      let allWeekPhList = [];
      updatedData.map((val) => {
        let weelyAvgPh = calculateAvgOfPerWeekData(
          val.ph,
          val.week,
          "Power Hour"
        );
        if (
          weelyAvgPh["sprint 0"] ||
          weelyAvgPh["sprint 1"] ||
          weelyAvgPh["sprint 2"] ||
          weelyAvgPh["sprint 3"] ||
          weelyAvgPh["sprint 4"]
        ) {
          allWeekPhList.push(weelyAvgPh);
        }
      });
      setAllWeekPhData(allWeekPhList);
    }
  }, [avgPhSPrints]);

  useEffect(() => {
    if (avgFedSPrints.length) {
      let avgData = AvgofAllSprintsperWeek(avgFedSPrints);
      setAllWeekFedData(avgData);
    }
  }, [avgFedSPrints]);

  const getAllUserOfTeam = async () => {
    let userId = [];
    let userList = await db
      .collection("Organisation")
      .doc("ke0z1G4lACIj3rbQRXQi")
      .collection("Developers")
      .get();
    userList.docs.map((doc) => {
      userId.push(doc.id);
    });
    return userId;
  };
  useEffect(async () => {
    let userList = await getAllUserOfTeam();
  }, []);

  useEffect(() => {
    if (userIdList?.length) {
      userListData(userIdList);
    }
  }, [dayChallenges]);

  const userListData = async (userIdList) => {
    let allUserData = [];
    let weekList = ["Week 1", "Week 2", "Week 3", "Week 4"];
    await Promise.all(
      userIdList.map(async (val) => {
        let dataDetails = {
          name: "",
          data: "",
        };
        let userDetails = await db.collection("Users").doc(val).get();
        let dataValue = await db
          .collection("Users")
          .doc(val)
          .collection("WorkplaceWellness")
          .doc(dayChallenges)
          .collection("Programs")
          .get();
        let userData = await Promise.all(dataValue.docs.map((kl) => kl.data()));
        dataDetails.name = userDetails.data()?.userInfo?.Name;
        dataDetails.data = userData;
        if (userData?.length) {
          allUserData.push(dataDetails);
        }
        return allUserData;
      })
    );

    setUserDataList(allUserData);

    let filterWeeklyUserData = allUserData.map((val) => {
      let weeklyData = weekList.map((kl) => {
        let filterWeekly = val.data.filter((ul) => ul.week == kl);
        if (filterWeekly.length > 0) {
          return {
            week: kl,
            data: filterWeekly,
          };
        }
      });
      weeklyData.filter((ul) => ul !== undefined);
      return {
        ...val,
        data: weeklyData.filter((ul) => ul !== undefined),
      };
    });

    setUserFilteredData(filterWeeklyUserData);
  };

  let calculateAvgPhWeekly = (avgOfAllPh) => {
    let totalFlowValue = 0;
    let totalCoheranceValue = 0;
    let avgPhDetails = {};
    if (avgOfAllPh.length > 0) {
      avgOfAllPh.map((val) => {
        totalFlowValue = totalFlowValue + val.flowPercent;
        (totalCoheranceValue = totalCoheranceValue + val.coherencePercent),
          (avgPhDetails.week = val.week);
      });
    }
    let avgFlow = totalFlowValue / avgOfAllPh.length;
    let avgCoherance = totalCoheranceValue / avgOfAllPh.length;

    avgPhDetails.flowPercent = avgOfAllPh.length > 0 ? avgFlow : 0;
    avgPhDetails.coherencePercent = avgOfAllPh.length > 0 ? avgCoherance : 0;
    avgPhDetails.program = "Power Hour";

    return avgPhDetails;
  };

  let calculateAvgData = (data) => {
    let flowList = [];
    let coheranceList = [];
    let finalData = {};
    data.map((kl) => {
      coheranceList.push(kl.coherencePercent);
      flowList.push(kl.flowPercent);
    });
    let avgFlow = avgCalculation(flowList);
    let avgCoherance = avgCalculation(coheranceList);
    finalData.flowPercent = avgFlow;
    finalData.coherencePercent = avgCoherance;
    finalData.week = data[0].week;
    return finalData;
  };

  const mergeMultipleArrays = (userDataItem) => {
    let allData = userDataItem.reduce((total, value) => {
      return total.concat(value);
    }, []);
    return allData;
  };

  useEffect(() => {
    if (userFilteredData.length > 0) {
      let dataForDayWiseAllUser = [];
      let dataForWeeklyAndTotalWiseAllUser = [];
      let allUserWeeklyFedSprintData = [];
      let allUserWeeklyPhSprintData = [];
      userFilteredData.map((ul) => {
        let dataForDayWisePerUser = [];
        let dataDetailsForDayWiseAllUser = {};
        let dataDetailsForWeeklyAndTotalsUser = {};
        let individualUserData = ul.data.map((val) => {
          let weeklyAvgFedAndPhData = [];
          let fedData = val.data.filter((kl) => kl.program == "FED");
          let phData = val.data.filter((kl) => kl.program !== "FED");

          if (fedData.length > 0) {
            let fedWeek = filterWeekwiseFedData(fedData);
            allUserWeeklyFedSprintData.push(fedWeek[0]);

            let avgOfAllFed = AvgofAllSprintsperWeek(fedWeek);
            weeklyAvgFedAndPhData.push(avgOfAllFed[0]);
            dataForDayWisePerUser.push(avgOfAllFed[0]);
          }
          if (phData.length > 0) {
            let weelyPhData = {
              data: [],
              week: "",
            };
            let phWeek = calculateAvgandFilteredPhWise(phData, val.week);

            (weelyPhData.data = phWeek), (weelyPhData.week = val.week);
            allUserWeeklyPhSprintData.push(weelyPhData);
            let avgOfAllPh = AvgofAllSprintsperWeek(phWeek);
            avgOfAllPh.map((val) => dataForDayWisePerUser.push(val));

            let weeklyAvgPh = calculateAvgPhWeekly(avgOfAllPh);
            weeklyAvgFedAndPhData.push(weeklyAvgPh);
          }

          let avgWeeklyData = calculateAvgData(weeklyAvgFedAndPhData);

          return avgWeeklyData;
        });
        dataDetailsForDayWiseAllUser.name = ul.name;
        dataDetailsForDayWiseAllUser.data = dataForDayWisePerUser;
        dataForDayWiseAllUser.push(dataDetailsForDayWiseAllUser);
        dataDetailsForWeeklyAndTotalsUser.name = ul.name;
        dataDetailsForWeeklyAndTotalsUser["dataItem"] = individualUserData;
        dataForWeeklyAndTotalWiseAllUser.push(
          dataDetailsForWeeklyAndTotalsUser
        );
      });
      if (allUserWeeklyPhSprintData?.length) {
        let firstWeekData = {
          week: "Week 1",
          ph: [],
        };
        let secondWeekData = {
          week: "Week 2",
          ph: [],
        };
        let thirdWeekData = {
          week: "Week 3",
          ph: [],
        };
        let fourthWeekData = {
          week: "Week 4",
          ph: [],
        };

        allUserWeeklyPhSprintData.map((val) => {
          if (val.week == "Week 1") {
            firstWeekData.ph.push(val.data);
          }
          if (val.week == "Week 2") {
            secondWeekData.ph.push(val.data);
          }
          if (val.week == "Week 3") {
            thirdWeekData.ph.push(val.data);
          }
          if (val.week == "Week 4") {
            fourthWeekData.ph.push(val.data);
          }
        });

        let allUserAvgWeeklyPhSprintData = [];
        let firstWeekSprintData = mergeMultipleArrays(firstWeekData.ph);
        firstWeekData.ph = calculateAvgandFilteredPhWise(firstWeekSprintData);
        allUserAvgWeeklyPhSprintData.push(firstWeekData);

        let secondWeekSprintData = mergeMultipleArrays(secondWeekData.ph);
        secondWeekData.ph = calculateAvgandFilteredPhWise(secondWeekSprintData);
        allUserAvgWeeklyPhSprintData.push(secondWeekData);

        let thirdWeekSprintData = mergeMultipleArrays(thirdWeekData.ph);
        thirdWeekData.ph = calculateAvgandFilteredPhWise(thirdWeekSprintData);
        allUserAvgWeeklyPhSprintData.push(thirdWeekData);

        let fourthWeekSprintData = mergeMultipleArrays(fourthWeekData.ph);
        fourthWeekData.ph = calculateAvgandFilteredPhWise(fourthWeekSprintData);
        allUserAvgWeeklyPhSprintData.push(fourthWeekData);
        setAvgPhSPrints(allUserAvgWeeklyPhSprintData);
      }
      if (allUserWeeklyFedSprintData?.length) {
        let allUserAvgWeeklyFedSprintData = filterWeekwiseFedData(
          allUserWeeklyFedSprintData
        );
        setAvgFedSPrints(allUserAvgWeeklyFedSprintData);
      }

      setDayWiseData(dataForDayWiseAllUser);
      setWeeklyUserData(dataForWeeklyAndTotalWiseAllUser);
    }
  }, [userFilteredData]);

  return [
    weeklyUserData,
    dayWiseData,
    avgFedSPrints,
    avgPhSPrints,
    allWeekPhData,
    allWeekFedData,
  ];
}

export default useGetIndiviuallyUserDataOfTeams;
