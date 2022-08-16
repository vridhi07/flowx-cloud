import avgCalculation from "./AvgCalculation";

const avgCalculationOfSprints = (sprintListsOfEachFed) => {
  let coheranceListOfSprint = [];
  let flowListofSprint = [];
  let avgofSprint = {
    flowPercent: 0,
    coherencePercent: 0,
  };
  sprintListsOfEachFed.map((val) => {
    flowListofSprint.push(val.flowPercent);
    coheranceListOfSprint.push(val.coherencePercent);
  });
  let avgOfFlowOfFirstSprint = avgCalculation(flowListofSprint);
  let avgOfCoheranceOfFirstSprint = avgCalculation(coheranceListOfSprint);
  avgofSprint.flowPercent = avgOfFlowOfFirstSprint;
  avgofSprint.coherencePercent = avgOfCoheranceOfFirstSprint;
  return avgofSprint;
};
export default avgCalculationOfSprints;
