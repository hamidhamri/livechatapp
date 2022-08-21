import React, { useEffect } from "react";
import SearchBar from "../components/smallComponents/SearchBar";
import ProfileCard from "../components/smallComponents/ProfileCard";
import BottomNavBar from "../components/smallComponents/BottomNavBar";
import HomeRightSide from "../components/largeComponents/HomeRightSide";
import AllFollowings from "../components/smallComponents/AllFollowings";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const Friends = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo?.data]);

  return (
    <>
      <div
        data-aos="fade-right"
        className={`relative grid min-h-screen grid-cols-[40rem_1fr_42rem] p-6 xl:grid-cols-[40rem_1fr] xlg:block ${
          theme === "light" ? "text-gray-600" : "text-white "
        } `}
      >
        <div className="mb-12 hidden xlg:block">
          <SearchBar />
        </div>
        <div className="z-10 col-[2/3] mx-20 xlg:col-[1/2]">
          <div className=" mb-20 w-full max-w-full">
            <AllFollowings />
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 flex flex-col gap-y-12 p-4 xlg:hidden">
        <SearchBar />
        <ProfileCard />
      </div>
      <HomeRightSide />
      <BottomNavBar />
    </>
  );
};

export default Friends;
