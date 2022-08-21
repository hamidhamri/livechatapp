import React from "react";
import Trends from "../smallComponents/Trends";
import Options from "../smallComponents/Options";

const ProfileRightSide = () => {
  return (
    <div className="fixed right-0 top-0 z-10 mr-8 min-w-[390px] max-w-[350px] p-4 1400:min-w-[300px] xl:hidden">
      <Options />
      <Trends />
    </div>
  );
};

export default ProfileRightSide;
