import React, { useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { CircularProgress, IconButton } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AOS from "aos";
import "aos/dist/aos.css";

const ChatBox = ({ chatSelected, setChatSelected }) => {
  const [newMessage, setNewMessage] = React.useState("");
  const scroll = React.useRef();
  const input = React.useRef();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { onlineUsers, socket } = useSelector((state) => state.onlineUsers);

  const [user, setUser] = React.useState(null);
  const [messages, setMessages] = React.useState(null);
  const [arrivalMessage, setArrivalMessage] = React.useState(null);
  const [sendMessageHelper, setSendMessageHelper] = React.useState(null);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isTypingHelper, setIsTypingHelper] = React.useState(false);
  const [isStopTypingHelper, setIsStopTypingHelper] = React.useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (chatSelected && user && scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    input.current = document.querySelector(".react-input-emoji--container");
    if (theme === "light") {
      input.current.classList.add("input-modified-white");
    } else {
      input.current.classList.add("input-modified-dark");
    }
  }, [theme]);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = chatSelected.members.find(
        (user) => user !== userInfo?.data._id
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/getOneUser/${userId}`,
          config
        );
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chatSelected) {
      fetchUser();
    }
  }, [chatSelected, userInfo?.data]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/messages/${chatSelected._id}`,
          config
        );
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chatSelected) {
      fetchMessages();
    }
  }, [chatSelected, userInfo?.data]);

  useEffect(() => {
    if (user?.data) {
      socket.emit("isTyping", {
        chatId: chatSelected._id,
        senderId: userInfo?.data._id,
        receiverId: user?.data._id,
      });
    }
  }, [isTypingHelper]);

  useEffect(() => {
    socket.on("heIsTyping", (data) => {
      if (data.chatId === chatSelected._id) {
        setIsTyping(true);
      }
    });
    return () => {
      socket.off("heIsTyping");
    };
  }, [chatSelected._id]);

  useEffect(() => {
    socket.on("heIsNotTyping", (data) => {
      if (data.chatId === chatSelected._id) {
        setIsTyping(false);
      }
    });
    return () => {
      socket.off("heIsNotTyping");
    };
  }, [chatSelected._id]);

  const handleSendMessage = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      if (newMessage.length > 0) {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/messages/createMessage`,
          {
            text: newMessage,
            chatId: chatSelected._id,
            senderId: userInfo?.data._id,
          },
          config
        );

        setMessages([...messages, data]);
        setNewMessage("");
        const { data: notifData } = await axios.post(
          `${process.env.REACT_APP_API_URL}/notifications/createNotification/${user?.data._id}`,
          {
            senderId: userInfo?.data._id,
            type: "message",
            text: newMessage,
          },
          config
        );
      }
    } catch (err) {
      console.log(err);
    }

    const receiverId = chatSelected.members.find(
      (user) => user !== userInfo?.data._id
    );
    setSendMessageHelper({
      text: newMessage,
      chatId: chatSelected._id,
      senderId: userInfo?.data._id,
      receiverId,
      name: userInfo?.data.name,
    });
  };

  useEffect(() => {
    if (sendMessageHelper !== null) {
      socket.emit("sendMessage", sendMessageHelper);
    }
  }, [sendMessageHelper]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const receiverId = chatSelected.members.find(
        (user) => user !== userInfo?.data._id
      );

      socket.emit("isNotTyping", {
        text: newMessage,
        chatId: chatSelected._id,
        senderId: userInfo?.data._id,
        receiverId,
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [isStopTypingHelper]);

  useEffect(() => {
    const handler = (data) => {
      if (data.chatId === chatSelected._id) {
        setArrivalMessage(data);
      }
    };

    socket.on("newMessage", handler);

    return () => socket.off("newMessage", handler);
  }, [chatSelected?._id]);

  useEffect(() => {
    setNewMessage("");
  }, [chatSelected?._id]);

  useEffect(() => {
    if (arrivalMessage !== null && arrivalMessage.chatId === chatSelected._id) {
      setMessages([...messages, arrivalMessage]);
    }
  }, [arrivalMessage]);

  return (
    <div
      data-aos="fade-right"
      className={`relative z-10 grid grid-rows-[min-content_1fr_min-content] ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      }  `}
    >
      <Link to={`/profile/${user?.data._id}`}>
        <div
          className={`Profile flex items-center ${
            theme === "light"
              ? "bg-[#f3f3f3] text-gray-600"
              : "bg-[#202124] text-white"
          } p-2`}
        >
          <Link className="hidden md:block" to={`/chat`}>
            <IconButton onClick={() => setChatSelected(null)}>
              <KeyboardBackspaceIcon
                sx={{ color: "#333", fontSize: "2.5rem" }}
              />
            </IconButton>
          </Link>
          <div className="flex w-max cursor-pointer items-center gap-2 rounded-md p-2 px-4 hover:bg-[#cac7c7a4]">
            <div className="image h-20 w-20 overflow-hidden rounded-full">
              {user?.data ? (
                <img
                  className="h-full w-full object-cover object-top"
                  src={user?.data.profilePicture}
                  alt="chat"
                />
              ) : (
                <CircularProgress />
              )}
            </div>
            <h3 className="text-2xl font-bold">{user?.data.name}</h3>
          </div>
        </div>
      </Link>
      <div
        className={`messages overflow-scroll p-4 font-[Poppins] ${
          theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
        }`}
      >
        {messages?.map((message, index) =>
          ["http", "www", "https"].some((el) => message.text.includes(el)) ? (
            <a
              href={
                message.text.includes("http")
                  ? message.text
                  : `https://${message.text}`
              }
            >
              <div
                key={index}
                ref={scroll}
                className={`MessageFromMe mb-4 flex ${
                  message.senderId === userInfo?.data._id && "justify-end"
                }`}
              >
                <div
                  className={`  bg-gradient-to-bl  ${
                    message.senderId !== userInfo?.data._id
                      ? " rounded-t-3xl rounded-br-3xl from-orange-500 to-orange-400"
                      : "rounded-t-3xl rounded-bl-3xl from-green-500 to-blue-400"
                  } p-4`}
                >
                  <p className="mb-2 max-w-[30rem] break-words text-2xl font-medium text-white xlg:max-w-[20rem]">
                    {message?.text}
                  </p>
                  <p className="text-xl text-white">
                    {format(message.createdAt)}
                  </p>
                </div>
              </div>
            </a>
          ) : (
            <div
              key={index}
              ref={scroll}
              className={`MessageFromMe mb-4 flex  ${
                message.senderId === userInfo?.data._id && "justify-end"
              }`}
            >
              <div
                className={` bg-gradient-to-bl ${
                  message.senderId !== userInfo?.data._id
                    ? " rounded-t-3xl rounded-br-3xl from-orange-500 to-orange-400"
                    : "rounded-t-3xl rounded-bl-3xl from-green-500 to-blue-400"
                } p-4`}
              >
                <p className="mb-2 max-w-[30rem] break-words text-2xl font-medium text-white xlg:max-w-[20rem]">
                  {message?.text}
                </p>
                <p className="text-xl text-white">
                  {format(message.createdAt)}
                </p>
              </div>
            </div>
          )
        )}
        {isTyping && theme === "dark" && (
          <img src="/images/typing.gif" className="h-20 w-28" alt="dots" />
        )}
        {isTyping && theme === "light" && (
          <img src="/images/dots.gif" className="h-20 w-28" alt="dots" />
        )}
      </div>

      <form
        className={`inputs flex gap-2 px-4 ${
          theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
        }`}
      >
        <InputEmoji
          theme={theme === "light" ? "light" : "dark"}
          value={newMessage}
          onEnter={handleSendMessage}
          onChange={(message) => {
            setNewMessage(message);
            setIsTypingHelper(message);
            setIsStopTypingHelper(message);
          }}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          type="submit"
          className="self-center rounded-lg bg-orange-500 py-4 px-4 text-2xl font-bold text-white hover:bg-orange-400"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
