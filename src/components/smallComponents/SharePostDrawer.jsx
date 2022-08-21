import { Drawer } from "@mui/material";
import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { EachSharePostDrawer } from "./EachSharePostDrawer";
import { sharePostAction } from "../../actions/postAction";

const SharePostDrawer = ({ setSharePostSuccess, setSharePostError }) => {
  const dispatch = useDispatch();

  const [chats, setChats] = React.useState([]);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { sharePost } = useSelector((state) => state.sharePost);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    dispatch(sharePostAction(open));
  };

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

  return (
    <Drawer
      sx={{
        ".css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
          backgroundColor: theme === "light" ? "#f3f3f3" : "#202124",
        },
      }}
      anchor={"right"}
      open={sharePost}
      onClose={toggleDrawer(false)}
    >
      <p
        className={`p-4 text-2xl ${
          theme === "light" ? "text-[#202124]" : "text-[#f3f3f3]"
        }`}
      >
        To whom you want to send this post ?
      </p>
      {chats && chats.length > 0 ? (
        chats.map((el) => {
          return (
            <EachSharePostDrawer
              setSharePostError={setSharePostError}
              setSharePostSuccess={setSharePostSuccess}
              key={el._id}
              chat={el}
            />
          );
        })
      ) : (
        <div className="p-4">
          <h1 className="text-2xl">No Chats available</h1>
        </div>
      )}
    </Drawer>
  );
};

export default SharePostDrawer;
