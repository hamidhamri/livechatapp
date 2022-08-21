import React, { useEffect } from "react";
import SearchBar from "../components/smallComponents/SearchBar";
import ProfileCard from "../components/smallComponents/ProfileCard";
import FollowersCard from "../components/smallComponents/FollowersCard";
import BottomNavBar from "../components/smallComponents/BottomNavBar";
import HomeRightSide from "../components/largeComponents/HomeRightSide";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Friends = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos="fade-right"
      className="relative grid h-screen grid-cols-[32rem,_auto,_40rem] gap-x-52 p-6 1400:grid-cols-[25rem,_auto,_30rem] xl:grid-cols-[40rem,_1fr] xlg:grid-cols-[1fr] xlg:grid-rows-[min-content,_1fr]"
    >
      <div className="mb-12 hidden xlg:block">
        <SearchBar />
      </div>
      <div className="flex flex-col gap-y-12 xlg:hidden">
        <SearchBar />
        <ProfileCard />
      </div>
      <BottomNavBar />
      <div className="z-10">
        <FollowersCard />
      </div>
      <HomeRightSide />
    </div>
  );
};

export default Friends;
