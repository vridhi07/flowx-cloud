import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ProtectRoute from '../src/services/ProtectRoute';
import DashboardPage from '../src/Components/DashboardPage'

function Home() {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <DashboardPage matches={matches} />
      {/* <WorkplaceWellness matches={matches} /> */}
    </div>
  );
}
export default ProtectRoute(Home);


