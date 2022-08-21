import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Post from "./pages/Post";
import Chat from "./pages/Chat";
import PeopleYouMayKnow from "./pages/PeopleYouMayKnow";
import Followers from "./pages/Followers";
import Followings from "./pages/Followings";
import Settings from "./pages/Settings";
import Active from "./pages/Active";
import Tes from "./pages/Tes";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { notificationsAction, onlineUsersAction } from "./actions/userAction";
import messengerSound from "./sounds/messenger.mp3";
import { Howl, Howler } from "howler";
import { messageNotificationAction } from "./actions/notificationsAction";
import { toast, ToastContainer } from "react-toastify";
import Notifications from "./pages/Notifications";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

let socket;
const App = () => {
  const dispatch = useDispatch();
  const refButton = React.useRef();

  const { theme } = useSelector((state) => state.theme);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { messageNotification } = useSelector(
    (state) => state.messageNotification
  );

  useEffect(() => {
    if (userInfo?.data) {
      socket = io(`${process.env.REACT_APP_SOCKET}`);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userInfo?.data]);

  useEffect(() => {
    if (userInfo?.data && socket) {
      socket.emit("addUser", userInfo?.data._id);
      socket.on("activeUsers", (data) => {
        dispatch(onlineUsersAction(data, socket));
      });
    }
    return () => {
      if (socket) {
        socket.emit("removeUser", userInfo?.data._id);
      }
    };
  }, [userInfo?.data]);

  const soundPlay = () => {
    const sound = new Howl({
      src: messengerSound,
      volume: 1.0,
    });
    sound.play();
  };

  useEffect(() => {
    if (messageNotification) {
      refButton.current.click();
    }
  }, [messageNotification]);

  useEffect(() => {
    if (socket) {
      socket.on("notificationMessage", (data) => {
        if (data.receiverId === userInfo?.data._id) {
          dispatch(messageNotificationAction(data.name));
          dispatch(notificationsAction(data));
        }
      });
    }

    return () => socket && socket.off("notificationMessage");
  }, [socket]);

  useEffect(() => {
    if (messageNotification) {
      toast.info(`${messageNotification} has sent you a message`, toastOptions);
    }
  }, [messageNotification]);

  useEffect(() => {
    if (socket) {
      socket.on("commentReceive", (data) => {
        console.log(data);
        dispatch(notificationsAction(data));
        toast.info(
          `${data.senderId.name} commented on your post`,
          toastOptions
        );
      });
    }

    return () => socket && socket.off("commentReceive");
  }, [socket]);

  return (
    <div
      className={`relative ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      } md:p-0`}
    >
      {theme === "light" && (
        <>
          <div className="absolute -top-10 right-[20rem] h-[40rem] w-[40rem] rounded-full bg-[#a6ddf0] blur-3xl"></div>
          <div className="absolute top-[30rem] -left-20 h-[40rem] w-[40rem] rounded-full bg-[#a6ddf0] blur-3xl"></div>
        </>
      )}
      <button
        className="hidden"
        onClick={() => soundPlay()}
        ref={refButton}
      ></button>
      <ToastContainer style={{ fontSize: "1.5rem" }} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/people" element={<PeopleYouMayKnow />} />
          <Route path="/profile/:id/followers" element={<Followers />} />
          <Route path="/profile/:id/followings" element={<Followings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/active" element={<Active />} />
          <Route path="/test" element={<Tes />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
