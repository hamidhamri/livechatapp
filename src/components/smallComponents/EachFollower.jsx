import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createChatAction } from "../../actions/chatAction";
import { followUserAction, unFollowUserAction } from "../../actions/userAction";

import axios from "axios";

const EachFollower = ({ follower }) => {
  const dispatch = useDispatch();

  const [followToast, setFollowToast] = React.useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { socket } = useSelector((state) => state.onlineUsers);
  const [followed, setFollowed] = React.useState(
    follower.followers.includes(userInfo?.data._id)
  );

  const handleFollowUser = async () => {
    dispatch(followUserAction(follower._id));
    setFollowed((prev) => !prev);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/notifications/createNotification/${follower._id}`,
        {
          senderId: userInfo?.data._id,
          type: "follow",
          text: "started following you",
        },
        config
      );
      socket.emit("follow", {
        follower: userInfo?.data._id,
        following: follower._id,
        name: userInfo?.data.name,
      });
    } catch (err) {
      console.log(err);
    }

    if (userInfo?.data.followers.includes(follower._id)) {
      dispatch(createChatAction(userInfo?.data._id, follower._id));
    }
  };

  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(follower._id));
    setFollowed((prev) => !prev);
  };

  return (
    <>
      {follower ? (
        <div className="eachFollower mb-2  flex cursor-pointer items-center gap-4 p-2 transition-all hover:bg-[#b1abab50]">
          <Link
            className="flex items-center gap-4"
            to={`/profile/${follower._id}`}
          >
            <div className="max-h-24 max-w-[6rem] overflow-hidden rounded-full">
              <img
                className="object-cover object-center"
                src={`${process.env.REACT_APP_IMAGE_URL}${follower.profilePicture}`}
                alt="follower"
              />
            </div>
            <div className="Name">
              <h3 className="text-2xl font-bold">{follower.name}</h3>
              <h5 className="text-xl font-light">{follower.name}</h5>
            </div>
          </Link>
          {follower._id === userInfo?.data._id ? null : (
            <button
              onClick={followed ? handleUnFollowUser : handleFollowUser}
              className="ml-auto rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 text-2xl text-white"
            >
              {followed ? "unfollow" : "Follow"}
            </button>
          )}
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default EachFollower;
