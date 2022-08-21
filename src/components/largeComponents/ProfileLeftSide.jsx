import FollowersCard from "../smallComponents/FollowersCard";
import SearchBar from "../smallComponents/SearchBar";
import YourInfo from "../smallComponents/YourInfo";
import React from "react";
import { useSelector } from "react-redux";

const ProfileLeftSide = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className={` fixed top-0 left-0 z-50 flex  h-screen max-w-[350px]  flex-col gap-y-12 p-4  1400:max-w-[300px] xlg:hidden ${
        theme === "light" ? "" : "bg-[#202124]"
      }`}
    >
      <SearchBar />
      <YourInfo />
      <div className="overflow-scroll">
        <FollowersCard />
      </div>
    </div>
  );
};

export default ProfileLeftSide;
