import { IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { format } from "timeago.js";
import BottomNavBar from "../components/smallComponents/BottomNavBar";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.theme);
  const { notifications } = useSelector((state) => state.notifications);
  return (
    <div className="min-h-screen p-4">
      {notifications.map((notification) => (
        <div
          onClick={() =>
            notification.type === "follow"
              ? navigate(`/profile/${notification.senderId._id}`)
              : navigate("/chat")
          }
          className={`relative flex w-full items-center p-2 ${
            theme === "light" ? "#text-[#333]" : "text-[#fff]"
          }`}
        >
          <div className=" flex  h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            <img
              className="h-full w-full"
              src={`${process.env.REACT_APP_IMAGE_URL}${notification.senderId.profilePicture}`}
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
          ) : (
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
          )}
          <div className="ml-4">
            <div className="text-xl font-light">
              <span className="font-bold">{notification.senderId.name}</span>{" "}
              {notification.type === "message"
                ? "has sent you a message"
                : "has started following you"}
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
      ))}
      <BottomNavBar />
    </div>
  );
};

export default Notifications;
