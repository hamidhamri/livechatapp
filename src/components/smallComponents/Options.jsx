import React, { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import { useSelector } from "react-redux";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import axios from "axios";
import NotificationsMenu from "./NotificationsMenu";

const Options = () => {
  const { theme } = useSelector((state) => state.theme);
  const { notifications } = useSelector((state) => state.notifications);
  const { notifications: state } = useSelector((state) => state);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.makeAllNotificationRead);

  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] =
    React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/notifications/getAllNotifications`,
          config
        );
        const unreadNotification = data.filter(
          (notification) => notification.read === false
        );
        console.log("WELCOME TO HAMID HAMRI");
        setNumberOfUnreadNotifications(unreadNotification.length);
        state.notifications = data;
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotifications();
  }, [userInfo?.data, notifications, success]);

  return (
    <>
      <NotificationsMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
      <div className="mb-8 flex items-center justify-between px-6">
        <div className="relative">
          <IconButton onClick={(e) => handleClick(e)}>
            <NotificationsIcon
              sx={{
                fontSize: "3rem",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
            <NotificationBadge
              containerStyle={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
              effect={Effect.SCALE}
              count={numberOfUnreadNotifications}
            />
          </IconButton>
        </div>
        <Link to="/">
          <IconButton>
            <img className="max-h-[2.5rem]" src="/images/home.png" alt="home" />
          </IconButton>
        </Link>

        <Link to="/people">
          <IconButton>
            <PeopleIcon
              sx={{
                fontSize: "3rem",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
        </Link>
        <Link to="/chat">
          <IconButton>
            {theme === "light" ? (
              <img
                className="max-h-[2.5rem]"
                src="/images/comment.png"
                alt="comment"
              />
            ) : (
              <MessageIcon
                sx={{
                  fontSize: "3rem",
                  color: `${theme === "light" ? "black" : "white"}`,
                }}
              />
            )}
          </IconButton>
        </Link>
        <Link to="/settings">
          <IconButton>
            <SettingsIcon
              sx={{
                fontSize: "3rem",
                color: `${theme === "light" ? "black" : "white"}`,
              }}
            />
          </IconButton>
        </Link>
      </div>
    </>
  );
};

export default Options;
