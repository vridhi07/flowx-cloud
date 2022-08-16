import calculateAvgandFilteredPhWise from "./calculateAvgandFilteredPhWise";

const filterWeekWisePowerHourData = (allPowerHour) => {
  let allweeklyPhList = [];
  let weekList = ["Week 1", "Week 2", "Week 3", "Week 4"];
  weekList.forEach((val, index) => {
    let weeklyPh = {
      ph: [],
      week: val,
    };
    let filtereWeeklyPh = allPowerHour.filter((el) => el.week == val);
    let calculateAvgofSamePh = calculateAvgandFilteredPhWise(
      filtereWeeklyPh,
      val
    );
    weeklyPh.ph = calculateAvgofSamePh;
    allweeklyPhList.push(weeklyPh);
  });
  allweeklyPhList.sort(function (a, b) {
    return a.week.split(" ").pop() - b.week.split(" ").pop();
  });

  return allweeklyPhList;
};

export default filterWeekWisePowerHourData;
