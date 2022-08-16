import avgCalculationOfSprints from "./AvgCalculationOfSprints";

const calculateAvgOfPerWeekData = (allEveyWeekFed, week, program) => {
  let avgFed = {
    program: "",
    week: "",
  };
  let zeroSpritntsListOfEachFed = [];
  let firstSpritntsListOfEachFed = [];
  let secondSpritntsListOfEachFed = [];
  let thirdSpritntsListOfEachFed = [];
  let fourthSpritntsListOfEachFed = [];
  allEveyWeekFed.map((val) => {
    if (val["sprint 0"]) {
      zeroSpritntsListOfEachFed.push(val["sprint 0"]);
    }
    if (val["sprint 1"]) {
      firstSpritntsListOfEachFed.push(val["sprint 1"]);
    }
    if (val["sprint 2"]) {
      secondSpritntsListOfEachFed.push(val["sprint 2"]);
    }
    if (val["sprint 3"]) {
      thirdSpritntsListOfEachFed.push(val["sprint 3"]);
    }
    if (val["sprint 4"]) {
      fourthSpritntsListOfEachFed.push(val["sprint 4"]);
    }
  });
  if (zeroSpritntsListOfEachFed.length) {
    let avgofZerothSprintOfAllFed = avgCalculationOfSprints(
      zeroSpritntsListOfEachFed
    );
    avgFed["sprint 0"] = avgofZerothSprintOfAllFed;
  }
  if (firstSpritntsListOfEachFed.length) {
    let avgofFirstSprintOfAllFed = avgCalculationOfSprints(
      firstSpritntsListOfEachFed
    );
    avgFed["sprint 1"] = avgofFirstSprintOfAllFed;
  }
  if (secondSpritntsListOfEachFed.length) {
    let avgofSecondSprintOfAllFed = avgCalculationOfSprints(
      secondSpritntsListOfEachFed
    );
    avgFed["sprint 2"] = avgofSecondSprintOfAllFed;
  }
  if (thirdSpritntsListOfEachFed.length) {
    let avgofThirdSprintOfAllFed = avgCalculationOfSprints(
      thirdSpritntsListOfEachFed
    );
    avgFed["sprint 3"] = avgofThirdSprintOfAllFed;
  }
  if (fourthSpritntsListOfEachFed.length) {
    let avgofFourthSprintOfAllFed = avgCalculationOfSprints(
      fourthSpritntsListOfEachFed
    );
    avgFed["sprint 4"] = avgofFourthSprintOfAllFed;
  }
  avgFed.program = program;
  avgFed.week = week;
  return avgFed;
};

export default calculateAvgOfPerWeekData;
