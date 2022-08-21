import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAction,
  notificationsAction,
} from "../../actions/userAction";
import EachFollower from "./EachFollower";
import { Link, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import "react-toastify/dist/ReactToastify.css";
import { Howl, Howler } from "howler";
import facebookSound from "../../sounds/facebook.mp3";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const FollowersCard = ({ setOnFollow }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { users, loading } = useSelector((state) => state.getAllUsers);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { socket } = useSelector((state) => state.onlineUsers);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    dispatch(getAllUsersAction());
  }, []);

  const soundPlay = () => {
    const sound = new Howl({
      src: facebookSound,
      volume: 0.8,
    });
    sound.play();
  };

  useEffect(() => {
    if (socket) {
      socket.on("followReceive", (data) => {
        if (data.following === userInfo?.data._id) {
          soundPlay();
          setOnFollow(data.name);
          dispatch(
            notificationsAction({
              type: "follow",
              text: "started following you",
              senderId: data.follower,
              userId: data.following,
              createdAt: new Date(Date.now()),
            })
          );
        }
      });
    }

    return () => socket && socket.off("followReceive");
  }, [socket]);

  const handleFollow = () => {
    return users?.data
      .filter((user) => !user.followers.includes(userInfo?.data._id))
      .map((follower, index) => (
        <EachFollower follower={follower} key={index} />
      ));
  };

  return (
    <div
      className={`FollowersCard z-10  p-2 ${
        location.pathname.includes("/people") && "h-full overflow-scroll  "
      }  ${theme === "light" ? "" : "bg-[#202124] text-white"}`}
    >
      <Link to="/people">
        <h2 className="FollowersCardText mb-10 text-3xl font-bold transition-all duration-500 hover:underline hover:underline-offset-1">
          People you may know
        </h2>
      </Link>

      <div className="AllFollowers mb-4 flex flex-col gap-y-4 ">
        {!loading
          ? handleFollow()
          : loading && !location.pathname.includes("/people")
          ? [("1", "2", "3", "4", "5")].map((el, index) => (
              <Stack
                key={index}
                direction={"row"}
                spacing={1}
                alignItems={"center"}
                justifyContent="space-around"
              >
                <Skeleton variant="circular" width={60} height={60} />
                <Stack>
                  <Skeleton width={120} height={18} />
                  <Skeleton width={100} height={18} />
                </Stack>
                <Skeleton variant="text" width={70} height={45} />
              </Stack>
            ))
          : loading &&
            location.pathname.includes("/people") &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="circular" width={50} height={50} />
                  <Stack>
                    <Skeleton variant="text" width={100} height={16} />
                    <Skeleton variant="text" width={70} height={16} />
                  </Stack>
                </Stack>
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={30}
                  sx={{ borderRadius: "8px" }}
                />
              </Stack>
            ))}
      </div>
    </div>
  );
};

export default FollowersCard;
