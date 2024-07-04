import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { sharePostAction } from "../../actions/postAction";

export const EachSharePostDrawer = ({
  chat,
  setSharePostSuccess,
  setSharePostError,
}) => {
  const dispatch = useDispatch();

  const [user, setUser] = React.useState(null);
  const [loadingSending, setLoadingSending] = React.useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { sharePost } = useSelector((state) => state.sharePost);

  const handleSendMessage = async () => {
    let loading = true;
    setLoadingSending(loading);
    try {
      let loading = true;
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/messages/createMessage`,
        {
          text: `${process.env.REACT_APP_REAL_URL}/post/${sharePost}`,
          chatId: chat._id,
          senderId: userInfo?.data._id,
        },
        config
      );

      if (data.text) {
        loading = false;
        setLoadingSending(loading);
      }
      if (!loading) {
        setSharePostSuccess(true);
        dispatch(sharePostAction(false));
      }
      if (loading) {
        setSharePostError(true);
        dispatch(sharePostAction(false));
        setLoadingSending(false);
      }
    } catch (err) {
      console.log(err);
      setSharePostError(true);
    }
  };

  useEffect(() => {
    const userId = chat.members.find((user) => user !== userInfo?.data._id);
    const fetchUser = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getOneUser/${userId}`,
        config
      );
      setUser(data);
    };
    fetchUser();
  }, [userInfo?.data._id]);

  return (
    <>
      {user && (
        <div
          className={`eachFollower mb-4  cursor-pointer  gap-4 p-2 px-4 transition-all hover:bg-[#b1abab50] ${
            theme === "light" ? "text-gray-600" : "text-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="f-20 h-20 max-h-20 max-w-[5rem] overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover object-center"
                src={user?.data.profilePicture}
                alt="follower"
              />
            </div>
            <div className="Name">
              <h3 className="text-2xl font-bold">{user?.data.name}</h3>
              <h5 className="text-xl font-light">{user?.data.name}</h5>
            </div>

            <button
              disabled={loadingSending}
              onClick={handleSendMessage}
              className="disabledButton ml-auto rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 text-2xl text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};
