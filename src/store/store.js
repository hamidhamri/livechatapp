import { createStore } from "redux";
import reducers from "../reducers/";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const theme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "light";

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  theme: { theme },
};
const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  store.getState().userLogin.userInfo?.data?.name &&
    localStorage.setItem(
      "userInfo",
      JSON.stringify(store.getState().userLogin.userInfo)
    );
});

export default store;
