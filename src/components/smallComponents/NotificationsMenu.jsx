import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";
import {
  makeAllNotificationRead,
  updateNotificationsAction,
} from "../../actions/notificationsAction";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import InfiniteScroll from "react-infinite-scroll-component";

const NotificationsMenu = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.notifications);
  const { theme } = useSelector((state) => state.theme);

  const handleOnClickNotification = (notification) => {
    dispatch(updateNotificationsAction(notification._id));
    if (notification.type === "follow") {
      navigate(`/profile/${notification.senderId._id}`);
    } else if (notification.type === "message") {
      navigate("/chat");
    } else if (notification.type === "likePost") {
      navigate(`/post/${notification.postId}`);
    } else if (notification.type === "commentPost") {
      navigate(`/post/${notification.postId}`);
    }
    handleClose();
  };

  const handleOnClickAll = () => {
    dispatch(makeAllNotificationRead());
  };

  return (
    <Menu
      getContentAnchorEl={null}
      disableEnforceFocus
      disableRestoreFocus
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      sx={{
        ".MuiMenu-paper": {
          backgroundColor: theme === "light" ? "#fff" : "#242526",
        },
      }}
      PaperProps={{
        style: {
          height: "90%",
          maxHeight: "90%",
          maxWidth: "360px",
          width: "100%",
        },
      }}
    >
      {notifications.length > 0 && (
        <div className="ml-2 flex items-center justify-around">
          <p
            className={`p-4 text-2xl ${
              theme === "light" ? "#text-[#333]" : "text-[#fff]"
            }`}
          >
            Make all the notifications as read
          </p>
          <button
            onClick={() => handleOnClickAll()}
            className="rounded-xl bg-[rgb(46,136,253)] p-3 px-6 font-[Poppins] text-xl tracking-wider text-white"
          >
            ALL
          </button>
        </div>
      )}
      {/* <InfiniteScroll> */}
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <MenuItem
            style={{ cursor: "pointer" }}
            onClick={() => handleOnClickNotification(notification)}
            key={notification._id}
          >
            <div
              className={`relative flex w-full items-center p-2 ${
                theme === "light" ? "#text-[#333]" : "text-[#fff]"
              }`}
            >
              <div className=" flex  h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                <img
                  className="h-full w-full"
                  src={`${process.env.REACT_APP_IMAGE_URL}${
                    notification?.senderId?.profilePicture
                      ? notification.senderId.profilePicture
                      : "/images/default.jpg"
                  }`}
                  alt="comment"
                />
              </div>
              {notification.type === "message" ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "25px",
                    color: "rgb(46,136,253)",
                  }}
                >
                  <MessageIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              ) : notification.type === "follow" ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "25px",
                    color: "rgb(46,136,253)",
                  }}
                >
                  <BookmarkIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              ) : notification.type === "likePost" ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "25px",
                    color: "rgb(46,136,253)",
                  }}
                >
                  <ThumbUpIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "-5px",
                    left: "25px",
                    color: "rgb(46,136,253)",
                  }}
                >
                  <CommentBankIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              )}
              <div className="ml-4">
                <div className="text-xl font-light">
                  <span className="font-bold">
                    {notification.senderId.name}
                  </span>{" "}
                  {notification.type === "message"
                    ? "has sent you a message"
                    : notification.type === "follow"
                    ? "has started following you"
                    : notification.type === "likePost"
                    ? "has liked your post"
                    : "has commented on your post"}
                </div>
                {notification.type === "message" && (
                  <div
                    className={`text-xl ${
                      theme === "light" ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    "{notification.text.slice(0, 20) + "..."}"
                  </div>
                )}
                <div className="text-xl text-[rgb(46,136,253)] ">
                  {format(notification.createdAt)}
                </div>
              </div>
              {!notification.read && (
                <div className="absolute right-0 rounded-full bg-[rgb(46,136,253)] p-2"></div>
              )}
            </div>
          </MenuItem>
        ))}
      {/* </InfiniteScroll> */}
      {notifications.length === 0 && (
        <MenuItem>
          <div
            className={`flex items-center text-3xl ${
              theme === "light" ? "text-gray-600" : "text-white"
            }`}
          >
            No notifications
          </div>
        </MenuItem>
      )}
    </Menu>
  );
};

export default NotificationsMenu;
