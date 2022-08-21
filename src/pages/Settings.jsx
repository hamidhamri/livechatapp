import React, { useEffect } from "react";
import SearchBar from "../components/smallComponents/SearchBar";
import ProfileCard from "../components/smallComponents/ProfileCard";
import ProfileRightSide from "../components/largeComponents/ProfileRightSide";
import SettingsMiddleSide from "../components/largeComponents/SettingsMiddleSide";
import BottomNavBar from "../components/smallComponents/BottomNavBar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Settings = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (!userInfo?.data) {
      navigate("/login");
    }
  }, [userInfo?.data]);

  return (
    <>
      {userInfo?.data && (
        <div
          data-aos="fade-right"
          className="relative grid h-screen grid-cols-[32rem,_auto,_40rem] gap-x-12 p-4 1400:grid-cols-[25rem,_auto,_30rem] xl:grid-cols-[25rem,_1fr] xlg:grid-cols-[1fr]"
        >
          <div className="flex flex-col gap-y-12 xlg:hidden">
            <SearchBar />
            <ProfileCard />
          </div>
          <SettingsMiddleSide />
          <ProfileRightSide />
          <BottomNavBar />
        </div>
      )}
    </>
  );
};

export default Settings;
