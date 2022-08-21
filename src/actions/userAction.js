import axios from "axios";

export const getUserInfoAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_USER_INFO_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/getOneUser/${id}`,
      config
    );

    dispatch({ type: "GET_USER_INFO_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "GET_USER_INFO_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const updateUserInfoAction =
  (name, status, living, working, relationship, about, email, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "UPDATE_USER_INFO_REQUEST" });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data: dataUpdated } = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/updateUserInfo`,
        { name, status, living, working, relationship, about, email, password },
        config
      );

      dispatch({ type: "UPDATE_USER_INFO_SUCCESS", payload: dataUpdated });
      dispatch({ type: "LOGIN_SUCCESS", payload: dataUpdated });
      localStorage.setItem("userInfo", JSON.stringify(dataUpdated));
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_INFO_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const updateUserPicturesAction =
  (profilePicture, coverPicture) => async (dispatch, getState) => {
    try {
      dispatch({ type: "UPDATE_USER_PICTURES_REQUEST" });

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
        `${process.env.REACT_APP_API_URL}/users/updateUserPictures`,
        { profilePicture, coverPicture },
        config
      );

      dispatch({ type: "UPDATE_USER_PICTURES_SUCCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_PICTURES_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/getAllUsers`,
      config
    );

    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "GET_ALL_USERS_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const followUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "FOLLOW_USER_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/follow/${id}`,
      {},
      config
    );

    dispatch({ type: "FOLLOW_USER_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "FOLLOW_USER_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const unFollowUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "UNFOLLOW_USER_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/unfollow/${id}`,
      {},
      config
    );

    dispatch({ type: "UNFOLLOW_USER_SUCCESS", payload: data });
    console.log(data);
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  } catch (err) {
    dispatch({
      type: "UNFOLLOW_USER_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const updateUserToActiveAction =
  (email, password) => async (dispatch, getState) => {
    try {
      dispatch({ type: "UPDATE_USER_TO_ACTIVE_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/updateUserToActive`,
        { email, password },
        config
      );

      dispatch({ type: "UPDATE_USER_TO_ACTIVE_SUCCESS", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (err) {
      dispatch({
        type: "UPDATE_USER_TO_ACTIVE_FAILURE",
        payload: err.response.data.message
          ? err.response.data.message
          : err.message,
      });
    }
  };

export const updateUserToUnActiveAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "UPDATE_USER_TO_UNACTIVE_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/users/updateUserToUnActive`,
      {},
      config
    );

    dispatch({ type: "UPDATE_USER_TO_UNACTIVE_SUCCESS", payload: data });
    localStorage.removeItem("userInfo");
    dispatch({ type: "LOGIN_RESET" });
  } catch (err) {
    dispatch({
      type: "UPDATE_USER_TO_UNACTIVE_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const deleteAccountAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "DELETE_ACCOUNT_REQUEST" });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/deleteAccount`,
      config
    );

    dispatch({ type: "DELETE_ACCOUNT_SUCCESS", payload: data });
    localStorage.removeItem("userInfo");
    dispatch({ type: "LOGIN_RESET" });
  } catch (err) {
    dispatch({
      type: "DELETE_ACCOUNT_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const onlineUsersAction = (data, socket) => {
  return {
    type: "ONLINE_USERS",
    payload: data,
    socket,
  };
};

export const notificationsAction = (data) => {
  return {
    type: "NOTIFICATIONS",
    payload: data,
  };
};
