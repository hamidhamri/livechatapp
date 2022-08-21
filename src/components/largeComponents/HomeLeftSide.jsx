import React from "react";
import SearchBar from "../smallComponents/SearchBar";
import ProfileCard from "../smallComponents/ProfileCard";
import FollowersCard from "../smallComponents/FollowersCard";
import { useSelector } from "react-redux";

const LeftSide = ({ setOnFollow }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={` fixed top-0 left-0 z-50 flex  h-screen max-w-[350px]  flex-col gap-y-12 p-2  1400:max-w-[300px] xlg:hidden ${
        theme === "light" ? "" : "bg-[#202124]"
      }`}
    >
      <div className="h-[5%]">
        <SearchBar />
      </div>
      <div className="">
        <ProfileCard />
      </div>
      <div className="overflow-scroll">
        <FollowersCard setOnFollow={setOnFollow} />
      </div>
    </div>
  );
};

export default LeftSide;
