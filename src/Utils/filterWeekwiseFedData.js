import calculateAvgOfPerWeekData from './CalculateAvgofPerWeekData';

const filterWeekwiseFedData = (fed) => {
  let allFirstWeekFed = [];
  let allSecondWeekFed = [];
  let allThirdWeekFed = [];
  let allFourthWeekFed = [];
  ["Week 1", "Week 2", "Week 3", "Week 4"].map((val, index) => {
    let weeklyFed = fed.filter((el) => el.week == val);
    index == 0
      ? allFirstWeekFed.push(weeklyFed)
      : index == 1
      ? allSecondWeekFed.push(weeklyFed)
      : index == 2
      ? allThirdWeekFed.push(weeklyFed)
      : allFourthWeekFed.push(weeklyFed);
  });
  let allWeekFedList = [];
  if (allFirstWeekFed[0].length) {
    let firstWeekAvgOfAllFed = calculateAvgOfPerWeekData(
      allFirstWeekFed[0],
      "Week 1",
      "FED"
    );
    allWeekFedList.push(firstWeekAvgOfAllFed);
  }
  if (allSecondWeekFed[0].length) {
    let secondWeekAvgOfAllFed = calculateAvgOfPerWeekData(
      allSecondWeekFed[0],
      "Week 2",
      "FED"
    );
    allWeekFedList.push(secondWeekAvgOfAllFed);
  }
  if (allThirdWeekFed[0].length) {
    let thirdWeekAvgOfAllFed = calculateAvgOfPerWeekData(
      allThirdWeekFed[0],
      "Week 3",
      "FED"
    );
    allWeekFedList.push(thirdWeekAvgOfAllFed);
  }
  if (allFourthWeekFed[0].length) {
    let fourthWeekAvgOfAllFed = calculateAvgOfPerWeekData(
      allFourthWeekFed[0],
      "Week 4",
      "FED"
    );
    allWeekFedList.push(fourthWeekAvgOfAllFed);
  }

  return allWeekFedList;
};

export default filterWeekwiseFedData