import avgCalculation from "./AvgCalculation";

const AvgofAllSprintsperWeek = (fedListItems) => {
  let avgOfSprintsFedList = [];
  if(fedListItems?.length > 0){
  fedListItems.map((val) => {
    let avgofSprint = {};
    let flowListofallSprint = [];
    let coheranceListOfAllSprint = [];
    if (val["sprint 0"]) {
      flowListofallSprint.push(val["sprint 0"].flowPercent);
      coheranceListOfAllSprint.push(val["sprint 0"].coherencePercent);
    }
    if (val["sprint 1"]) {
      flowListofallSprint.push(val["sprint 1"].flowPercent);
      coheranceListOfAllSprint.push(val["sprint 1"].coherencePercent);
    }
    if (val["sprint 2"]) {
      flowListofallSprint.push(val["sprint 2"].flowPercent);
      coheranceListOfAllSprint.push(val["sprint 2"].coherencePercent);
    }
    if (val["sprint 3"]) {
      flowListofallSprint.push(val["sprint 3"].flowPercent);
      coheranceListOfAllSprint.push(val["sprint 3"].coherencePercent);
    }
    if (val["sprint 4"]) {
      flowListofallSprint.push(val["sprint 4"].flowPercent);
      coheranceListOfAllSprint.push(val["sprint 4"].coherencePercent);
    }
    let avgOfFlowList = avgCalculation(flowListofallSprint);
    let avgOfCoheranceList = avgCalculation(coheranceListOfAllSprint);

    avgofSprint.week = val.week;
    avgofSprint.program = val.program;
    avgofSprint.flowPercent = avgOfFlowList;
    avgofSprint.coherencePercent = avgOfCoheranceList;
    avgOfSprintsFedList.push(avgofSprint);
  });
}
  avgOfSprintsFedList.sort(function (a, b) {
    return a.week.split(" ").pop() - b.week.split(" ").pop();
  });
  
  return avgOfSprintsFedList
};

export default AvgofAllSprintsperWeek;
