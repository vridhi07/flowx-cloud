import React from "react";
import MultipleDataGraph from "../../../Graph/MultipleDataGraph";
import {PersonalWellness } from "../../../../Constant/dashboardGraphData";
import { useRouter } from "next/router";
import useMediaQuery from '@mui/material/useMediaQuery';
function PersonalWellnessGraph({  matches }) {
  const router = useRouter();

  const handlePersonalWellness = () => {
  };
  const mobileMediaQuery = useMediaQuery('(max-width:600px)');
  return (
    <div className={mobileMediaQuery?"d-flex flex-wrap mt-2 justify-content-center":"d-flex flex-wrap mt-2"}>
      <MultipleDataGraph
        matches={matches}
        handleWellness={handlePersonalWellness}
        graphData={PersonalWellness}
      />
    </div>
  );
}
export default PersonalWellnessGraph;

