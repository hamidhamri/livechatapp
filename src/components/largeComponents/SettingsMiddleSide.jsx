import React from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAccountAction,
  updateUserToUnActiveAction,
} from "../../actions/userAction";
import { themeAction } from "../../actions/themeAction";

const label = { inputProps: { "aria-label": "Switch demo" } };

const SettingsMiddleSide = () => {
  const dispatch = useDispatch();

  // const { success, error } = useSelector((state) => state.updateUserToUnActive);
  const { theme } = useSelector((state) => state.theme);

  const desactivateHandler = () => {
    dispatch(updateUserToUnActiveAction());
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccountAction());
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "LOGIN_RESET" });
  };

  const themeHandler = () => {
    if (theme === "light") {
      dispatch(themeAction("dark"));
      localStorage.setItem("theme", "dark");
    } else {
      dispatch(themeAction("light"));
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      className={`relative z-10 ${
        theme === "light" ? "bg-[#f3f3f3] " : "bg-[#202124] text-white"
      } p-12`}
    >
      <h1 className="mb-4 font-[Poppins] text-5xl font-bold">
        General Settings
      </h1>
      <div className="mb-10 flex items-center">
        <p className="text-3xl">Dark mode</p>
        <Switch
          checked={theme === "dark"}
          onChange={() => dispatch(themeHandler)}
          {...label}
        />
      </div>
      <div className="mb-8 flex items-center gap-2 sm:flex-col sm:items-start">
        <button
          onClick={desactivateHandler}
          className="rounded-lg bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 font-[Poppins] text-2xl font-semibold uppercase text-white"
        >
          Desactivate my account
        </button>
        <p className="text-xl text-gray-500">
          You won't be able to connect again util you reactivate your account
        </p>
      </div>
      <div className="mb-8 flex items-center gap-2 sm:flex-col sm:items-start">
        <button
          onClick={deleteAccountHandler}
          className="rounded-lg bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 font-[Poppins] text-2xl font-semibold uppercase text-white"
        >
          delete my account
        </button>
        <p className="text-xl text-gray-500">
          You won't be able to connect again
        </p>
      </div>
      <div className="flex items-center gap-2 sm:flex-col sm:items-start">
        <button
          onClick={logoutHandler}
          className="rounded-lg bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 font-[Poppins] text-2xl font-semibold uppercase text-white"
        >
          Logout
        </button>
        <p className="text-xl text-gray-500">
          You won't be able to connect again
        </p>
      </div>
    </div>
  );
};

export default SettingsMiddleSide;
