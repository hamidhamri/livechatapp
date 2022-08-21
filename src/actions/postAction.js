import axios from "axios";

export const addPostAction =
  (description, image, dimensions) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ADD_POST_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(image);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/createPost`,
        { description, image, dimensions },
        config
      );

      dispatch({ type: "ADD_POST_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "ADD_POST_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const getTimeLineAction =
  (page, limit) => async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_TIMELINE_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/getTimeLine?page=${page}&limit=${limit}`,
        config
      );

      dispatch({ type: "GET_TIMELINE_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "GET_TIMELINE_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const LikePostAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "LIKE_POST_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/posts/likePost/${postId}`,
      {},
      config
    );

    dispatch({ type: "LIKE_POST_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "LIKE_POST_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const getCommentFromPostAction =
  (postId) => async (dispatch, getState) => {
    try {
      dispatch({ type: "GET_COMMENT_FROM_POST_REQUEST" });
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/getCommentFromPost/${postId}`,
        config
      );

      dispatch({ type: "GET_COMMENT_FROM_POST_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "GET_COMMENT_FROM_POST_FAILURE",
        payload: err?.response?.data?.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const getPostAction = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_POST_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts/getPost/${postId}`,
      config
    );

    dispatch({ type: "GET_POST_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "GET_POST_FAILURE",
      payload: err?.response?.data?.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const createCommentAction =
  (postId, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CREATE_COMMENT_REQUEST" });
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
        `${process.env.REACT_APP_API_URL}/comments/createComment/${postId}`,
        { description },
        config
      );

      dispatch({ type: "CREATE_COMMENT_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "CREATE_COMMENT_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const sharePostAction = (data) => {
  return {
    type: "SHARE_POST",
    payload: data,
  };
};
