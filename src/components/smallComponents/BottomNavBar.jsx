import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "@mui/icons-material/Message";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { notifications } = useSelector((state) => state.notifications);
  const [numberOfUnreadNotifications, setNumberOfUnreadNotifications] =
    React.useState(0);

  // useEffect(() => {
  //   if (window.innerWidth >= 1279) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    const data = notifications.filter(
      (notification) => notification.read === false
    );
    setNumberOfUnreadNotifications(data.length);
  }, [notifications]);

  return (
    <div
      className={`fixed bottom-0 left-0 z-50 hidden w-[100%] items-center justify-evenly ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#181818]"
      } p-4 xl:flex`}
    >
      <IconButton onClick={() => navigate("/")}>
        <HomeIcon
          sx={{
            color: theme === "light" ? "#333" : "#f3f3f3",
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
      <IconButton onClick={() => navigate("/people")}>
        <PeopleIcon
          sx={{
            color: theme === "light" ? "#333" : "#f3f3f3",
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
      <IconButton onClick={() => navigate("/chat")}>
        <MessageIcon
          sx={{
            color: theme === "light" ? "#333" : "#f3f3f3",
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
      <IconButton onClick={() => navigate(`/profile/${userInfo?.data._id}`)}>
        <AccountCircleIcon
          sx={{
            color: theme === "light" ? "#333" : "#f3f3f3",
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
      <IconButton onClick={() => navigate("/settings")}>
        <SettingsIcon
          sx={{
            color: theme === "light" ? "#333" : "#f3f3f3",
            fontSize: "2.5rem",
          }}
        />
      </IconButton>
      <IconButton
        onClick={() => navigate("/notifications")}
        style={{ position: "relative" }}
      >
        <NotificationsIcon
          sx={{
            fontSize: "3rem",
            color: `${theme === "light" ? "black" : "white"}`,
          }}
        />
        <NotificationBadge
          containerStyle={{ position: "absolute", top: "5px", right: "5px" }}
          effect={Effect.SCALE}
          count={numberOfUnreadNotifications}
        />
      </IconButton>
    </div>
  );
};

export default BottomNavBar;
