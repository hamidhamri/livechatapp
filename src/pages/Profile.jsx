import React, { useEffect } from "react";
import ProfileLeftSide from "../components/largeComponents/ProfileLeftSide";
import ProfileMiddleSide from "../components/largeComponents/ProfileMiddleSide";
import ProfileRightSide from "../components/largeComponents/ProfileRightSide";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import BottomNavBar from "../components/smallComponents/BottomNavBar";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successPictureUpdate, error: errorPictureUpdate } =
    useSelector((state) => state.updateUserPictures);
  const { success: successProfileUpdate, error: errorProfileUpdate } =
    useSelector((state) => state.updateUserInfo);
  const { success: successAddPost, error: errorAddPost } = useSelector(
    (state) => state.addPost
  );

  console.log(userInfo)
  useEffect(() => {
    if (!userInfo?.data) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (successPictureUpdate) {
      dispatch({ type: "UPDATE_USER_PICTURES_RESET" });
      toast.success("Picture updated successfully", toastOptions);
    } else if (errorPictureUpdate) {
      dispatch({ type: "UPDATE_USER_PICTURES_RESET" });
      toast.error("There was an updating picture", toastOptions);
    } else if (successProfileUpdate) {
      dispatch({ type: "UPDATE_USER_INFO_RESET" });
      toast.success("Profile updated successfully", toastOptions);
    } else if (errorProfileUpdate) {
      dispatch({ type: "UPDATE_USER_INFO_RESET" });
      toast.error("There was an error while updating profile " + (errorProfileUpdate ?? "") , toastOptions);
    } else if (successAddPost) {
      dispatch({ type: "RESET_POST" });
      toast.success("Post added successfully", toastOptions);
    } else if (errorAddPost) {
      dispatch({ type: "RESET_POST" });
      toast.error("There was an adding post", toastOptions);
    }
  }, [
    errorPictureUpdate,
    successPictureUpdate,
    successProfileUpdate,
    errorProfileUpdate,
    successAddPost,
    errorAddPost,
  ]);

  return (
    <>
      <div
        data-aos="fade-right"
        className="flex justify-center xl:ml-[20rem] lg:ml-[30rem] xlg:ml-0"
      >
        <ProfileMiddleSide />
        <ToastContainer style={{ fontSize: "1.5rem" }} {...toastOptions} />
      </div>
      <ProfileLeftSide />
      <ProfileRightSide />
      <BottomNavBar />
    </>
  );
};

export default MyProfile;
