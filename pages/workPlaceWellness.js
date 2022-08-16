import React from "react";
// import WorkplaceWellness from "../src/Components/dashboard/WorkplaceWellness";
import useMediaQuery from "@mui/material/useMediaQuery";

function WorkPlaceWellness() {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div>
      {/* <WorkplaceWellness matches={matches} /> */}
    </div>
  );
}
export default WorkPlaceWellness;
