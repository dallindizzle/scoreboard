import React from "react";

import Scoreboard from "./Scoreboard";

const names = ["Dad", "Mom", "Dallin", "Brandon", "Kortney", "Karli"];

const MainPane = () => {
  return <Scoreboard names={names} />;
};

export default MainPane;
