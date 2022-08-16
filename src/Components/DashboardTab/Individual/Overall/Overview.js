import React from "react";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
import {
  PersonalWellness,
  Overall,
} from "../../../../Constant/dashboardGraphData";
import useMediaQuery from '@mui/material/useMediaQuery';
function Overview({ updatedWorkPlaceDGraph, matches }) {
  
  const handleWorkplaceWellness = () => {
  };
  const handlePersonalWellness = () => {
  };
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap justify-content-center":"d-flex flex-wrap"}>
      <MultipleDataGraph
        matches={matches}
        handleWellness={handleWorkplaceWellness}
        graphData={Overall}
      />
      <MultipleDataGraph
        matches={matches}
        handleWellness={handleWorkplaceWellness}
        graphData={updatedWorkPlaceDGraph}
      />
      <MultipleDataGraph
        matches={matches}
        handleWellness={handlePersonalWellness}
        graphData={PersonalWellness}
      />
    </div>
  );
}
export default Overview;
