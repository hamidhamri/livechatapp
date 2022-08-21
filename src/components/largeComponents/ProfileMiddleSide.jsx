import React from "react";
import ProfileCard from "../smallComponents/ProfileCard";
import Posts from "../smallComponents/Posts";
import PostCard from "../smallComponents/PostCard";
import { useSelector } from "react-redux";

const ProfileMiddleSide = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div
      className={`relative z-10 h-full  min-h-screen min-w-[470px] max-w-[470px] sm:min-w-full  ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      }`}
    >
      <div className="flex flex-col gap-y-20  sm:gap-4">
        <ProfileCard location="profile" />
        <div>
          <PostCard />
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default ProfileMiddleSide;
