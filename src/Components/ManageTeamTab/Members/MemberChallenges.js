import React, { useState } from "react";
import Organisation from '../../Organisation';

function MemberChallenges({handleSetCreateTeamBox}) {
  return (
    <div>
       <Organisation handleSetCreateTeamBox={handleSetCreateTeamBox} />
    </div>
  );
}
export default MemberChallenges;
