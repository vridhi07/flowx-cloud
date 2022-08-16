import calculateAvgOfPerWeekData  from './CalculateAvgofPerWeekData';

const calculateAvgandFilteredPhWise = (powerHour,week) => {
  let firstPowerHour = [];
  let secondPowerHourSecond = [];
  let thirdPowerHourThird = [];
  let fourthPowerHourFourth = [];
  ["Power Hour 1", "Power Hour 2", "Power Hour 3", "Power Hour 4"].map(
    (val, index) => {
      let filteredPh = powerHour.filter((el) => el.program == val);
      index == 0
        ? firstPowerHour.push(filteredPh)
        : index == 1
        ? secondPowerHourSecond.push(filteredPh)
        : index == 2
        ? thirdPowerHourThird.push(filteredPh)
        : fourthPowerHourFourth.push(filteredPh);
    }
  );
  let allPhList = [];
  if (firstPowerHour[0].length) {
    let firstPhAvg = calculateAvgOfPerWeekData(
      firstPowerHour[0],
      week,
      "Power Hour 1"
    );
    allPhList.push(firstPhAvg);
  }
  if (secondPowerHourSecond[0].length) {
    let secondPhAvg = calculateAvgOfPerWeekData(
      secondPowerHourSecond[0],
      week,
      "Power Hour 2"
    );
    allPhList.push(secondPhAvg);
  }
  if (thirdPowerHourThird[0].length) {
    let thirdPhAvg = calculateAvgOfPerWeekData(
      thirdPowerHourThird[0],
      week,
      "Power Hour 3"
    );
    allPhList.push(thirdPhAvg);
  }
  if (fourthPowerHourFourth[0].length) {
    let fourthPhAvg = calculateAvgOfPerWeekData(
      fourthPowerHourFourth[0],
      week,
      "Power Hour 4"
    );
    allPhList.push(fourthPhAvg);
  }

  return allPhList;
};

export default calculateAvgandFilteredPhWise