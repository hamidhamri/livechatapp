import React, { useEffect } from "react";
import LeftSide from "../components/largeComponents/HomeLeftSide";
import MiddleSide from "../components/largeComponents/HomeMiddleSide";
import RightSide from "../components/largeComponents/HomeRightSide";
import SharePostDrawer from "../components/smallComponents/SharePostDrawer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import BottomNavBar from "../components/smallComponents/BottomNavBar";

export const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Home = () => {
  const navigate = useNavigate();

  const [sharePostSuccess, setSharePostSuccess] = React.useState(false);
  const [sharePostError, setSharePostError] = React.useState(false);

  const [onFollow, setOnFollow] = React.useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successAddPost, error: errorAddPost } = useSelector(
    (state) => state.addPost
  );

  console.log(process.env)

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    const fetchUserCredentials = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/getUserCredentials`,
          config
        );

        userInfo.data = data;
      } catch (err) {
        console.log(err);
      }
    };

    if (userInfo?.data) {
      fetchUserCredentials();
    }
  }, []);

  useEffect(() => {
    if (successAddPost) {
      toast.success("Post added successfully", toastOptions);
    } else if (errorAddPost) {
      toast.error("There was an error adding post", toastOptions);
    } else if (sharePostSuccess) {
      toast.success("Message has been send successfully", toastOptions);
      setSharePostSuccess(false);
    } else if (sharePostError) {
      toast.error("There was an error sending a message", toastOptions);
      setSharePostError(false);
    } else if (onFollow) {
      toast.info(`${onFollow} has started following you`, toastOptions);
      setOnFollow(false);
    }
  }, [
    successAddPost,
    errorAddPost,
    sharePostSuccess,
    sharePostError,
    onFollow,
  ]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.data]);
  // grid h-full grid-cols-[auto,_40rem] grid-rows-[100%] gap-x-12 p-4 1400:grid-cols-[25rem,_auto,_30rem] xl:grid-cols-[25rem,_1fr] xlg:grid-cols-[1fr]
  return (
    <>
      {userInfo?.data && (
        <div data-aos="fade-right">
          <div className="flex justify-center xl:ml-[20rem] lg:ml-[25rem] xlg:ml-0 ">
            <MiddleSide />
          </div>
        </div>
      )}
      <LeftSide onFollow={onFollow} setOnFollow={setOnFollow} />
      <RightSide />
      <SharePostDrawer
        setSharePostError={setSharePostError}
        setSharePostSuccess={setSharePostSuccess}
      />
      <BottomNavBar />
    </>
  );
};
export default Home;
