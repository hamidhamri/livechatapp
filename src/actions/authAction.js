import axios from "axios";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      { email, password },
      config
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: err.response.data.message
        ? err.response.data.message
        : err.message,
    });
  }
};

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      { name, email, password },
      config
    );
    dispatch({ type: "REGISTER_SUCCESS", payload: data });
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: err?.response?.data?.message
        ? err.response.data.message
        : err.message,
    });
  }
};
