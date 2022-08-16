import React, { useEffect, useState } from "react";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
import {
  PersonalWellness,
  Overall,
  Kpi,
  Interventions,
  lifestylePillars,
  Questionaires,
  Exercise,
  Education,
} from "../../../../Constant/dashboardGraphData";
import useMediaQuery from "@mui/material/useMediaQuery";

function Allview({
  handleSelectPage,
  matches,
  updatedWorkPlaceDGraph,
  updatedFlowGraph,
  updatedCoheranceGraph,
}) {
  const [allState, setAllState] = useState([]);
  useEffect(() => {
    let arr = [];
    arr.push(
      Overall,
      updatedWorkPlaceDGraph,
      PersonalWellness,
      updatedFlowGraph,
      updatedCoheranceGraph,
      Kpi,
      Interventions,
      lifestylePillars,
      Questionaires,
      Exercise,
      Education
    );
    setAllState(arr);
  }, []);
  const mobileMediaQuery = useMediaQuery("(max-width:600px)");
  return (
    <div
      className={
        mobileMediaQuery
          ? "d-flex flex-wrap justify-content-center"
          : "d-flex flex-wrap"
      }
    >
      {allState.map((val) => (
        <MultipleDataGraph
          matches={matches}
          handleSelectPage={handleSelectPage}
          graphData={val}
        />
      ))}
    </div>
  );
}
export default Allview;
