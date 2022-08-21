import axios from "axios";

export const createChatAction =
  (senderId, receiverId) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_CHAT_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/chats/createChat`,
        { senderId, receiverId },
        config
      );
      dispatch({ type: "CREATE_CHAT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "CREATE_CHAT_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };
