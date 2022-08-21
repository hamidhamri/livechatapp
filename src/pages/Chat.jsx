import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/smallComponents/SearchBar";
import Options from "../components/smallComponents/Options";
import EachContact from "../components/smallComponents/EachContact";
import ChatBox from "../components/largeComponents/ChatBox";
import { CircularProgress, Divider, IconButton, Skeleton } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Chat = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { onlineUsers } = useSelector((state) => state.onlineUsers);

  const [chats, setChats] = React.useState([]);
  const [chatSelected, setChatSelected] = React.useState(null);
  // const [onlineUsers, setOnlineUsers] = React.useState([]);
  const [errorLoadingProfilePicture, setErrorLoadingProfilePicture] =
    React.useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo?.data]);

  // useEffect(() => {
  //   socket = io("http://192.168.1.254:8900");
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.emit("addUser", userInfo?.data._id);
  //   socket.on("activeUsers", (data) => {
  //     setOnlineUsers(data);
  //     console.log("activeUsers", data);
  //   });

  //   return () => {
  //     socket.emit("removeUser", userInfo?.data._id);
  //   };
  // }, [userInfo]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/chats/${userInfo?.data._id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      setChats(data);
    };
    fetchChats();
  }, [userInfo?.data]);

  const onlineUserHandler = (id) => {
    const user = onlineUsers && onlineUsers.find((user) => user.userId === id);
    return user ? true : false;
  };

  return (
    <div
      className={`relative z-10 h-screen p-4 md:p-0 ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      }`}
    >
      <div className="mb-4 flex h-[8%] justify-between border-b border-gray-300 md:hidden">
        <SearchBar />
        <Options />
      </div>
      <div
        className={`grid h-[92%] grid-cols-[30rem_1fr] grid-rows-[100%_100%] gap-x-10 md:h-full sm:grid-cols-[1fr] ${
          theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
        } ${window.innerWidth <= 800 && chatSelected && "grid-cols-[1fr]"} `}
      >
        <div
          className={`${
            window.innerWidth <= 800 && chatSelected && "hidden"
          } z-10 grid  grid-rows-[min-content_min-content_1fr_min-content_min-content] ${
            theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
          } md:p-4`}
        >
          <div>
            <IconButton onClick={() => navigate("/")}>
              <KeyboardBackspaceIcon
                sx={{
                  fontSize: "3rem",
                  color: theme === "light" ? "#333" : "#f3f3f3",
                }}
              />
            </IconButton>
          </div>
          <h1
            className={`text-4xl font-bold ${
              theme === "light" ? " text-gray-600" : "bg-[#202124] text-white"
            }`}
          >
            Chats
          </h1>

          <div
            className={`Chats z-10 overflow-scroll py-4 ${
              theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
            }`}
          >
            {chats.map((chat, index) => (
              <div key={index} onClick={() => setChatSelected(chat)}>
                <EachContact
                  onlineUserHandler={onlineUserHandler}
                  chat={chat}
                  currentUser={userInfo?.data._id}
                  token={userInfo?.token}
                />
              </div>
            ))}
          </div>
          <Divider sx={{ mb: 1 }} />
          {userInfo?.data ? (
            <Link
              className={`${
                theme === "light" ? "bg-[#f3f3f3] " : "bg-[#202124] text-white"
              } `}
              to={`/profile/${userInfo?.data._id}`}
            >
              <div
                className={`eachChat z-10 mb-2 flex cursor-pointer items-center gap-4 rounded-lg ${
                  theme === "light"
                    ? "bg-[#f3f3f3] "
                    : "bg-[#202124] text-white"
                } p-4 hover:bg-[#cac7c7a4]`}
              >
                <div className="image h-20 w-20 overflow-hidden rounded-full">
                  {!errorLoadingProfilePicture ? (
                    <img
                      onError={() => setErrorLoadingProfilePicture(true)}
                      className="h-full w-full object-cover object-top"
                      src={`${process.env.REACT_APP_IMAGE_URL}${userInfo?.data.profilePicture}`}
                      alt="chat"
                    />
                  ) : (
                    <Skeleton
                      variant="circular"
                      width={"100%"}
                      height={"100%"}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">{userInfo?.data.name}</h3>
                  <h3 className="text-2xl font-light text-green-600">Online</h3>
                </div>
              </div>
            </Link>
          ) : (
            <CircularProgress />
          )}
        </div>
        {chatSelected ? (
          <ChatBox
            setChatSelected={setChatSelected}
            chatSelected={chatSelected}
          />
        ) : (
          <div className="flex items-center justify-center sm:hidden">
            <p
              className={`text-center font-[Poppins] text-5xl ${
                theme === "light" ? "text-gray-600" : "text-white"
              }`}
            >
              Please select a chat to talk ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
