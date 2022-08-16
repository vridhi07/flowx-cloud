import avgCalculation from "./AvgCalculation";

const CalculateAvgOfSameProgramAndWeek = (data) => {
  let flowList = [];
  let coheranceList = [];
  let finalData = {
    week: "",
    program: "",
    flowPercent: 0,
    coherencePercent: 0,
  };
  data.map((val) => {
    flowList.push(val.flowPercent);
    coheranceList.push(val.coherencePercent);
  });

  let flowAvg = avgCalculation(flowList);
  let cohenranceAvg = avgCalculation(coheranceList);
  finalData.week = data[0]?.week;
  finalData.program = data[0]?.program;
  finalData.flowPercent = flowAvg;
  finalData.coherencePercent = cohenranceAvg;
  return finalData;
};

export default CalculateAvgOfSameProgramAndWeek;
