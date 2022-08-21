import axios from "axios";

export const updateNotificationsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "UPDATE_NOTIFICATIONS_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/notifications/updateNotification/${id}`,
      {},
      config
    );
    dispatch({
      type: "UPDATE_NOTIFICATIONS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "UPDATE_NOTIFICATIONS_FAILURE",
      payload: err.response?.data.message
        ? err.response?.data.message
        : err.response.data,
    });
  }
};

export const makeAllNotificationRead = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "MAKE_ALL_NOTIFICATIONS_READ_REQUEST",
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/notifications/makeAllNotificationRead`,
      {},
      config
    );
    dispatch({
      type: "MAKE_ALL_NOTIFICATIONS_READ_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "MAKE_ALL_NOTIFICATIONS_READ_FAILURE",
      payload: err.response?.data.message
        ? err.response?.data.message
        : err.response.data,
    });
  }
};

export const messageNotificationAction = (data) => {
  return {
    type: "MESSAGE_NOTIFICATION",
    payload: data,
  };
};
