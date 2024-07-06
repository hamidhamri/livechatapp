import { refreshToken } from "../actions/authAction";

export const loginReducer = (state = { userInfo: [],loading:true }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        loading: false,
        userInfo: action.payload,
      };
    case "REFETCH_TOKEN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "REFETCH_TOKEN":
      let newData = {
        ...state,
        loading: false,
        userInfo:{...state.userInfo, token:action.payload.token, refreshToken:action.payload.token}
      };
      console.log(newData)
      return newData;
    case "REFETCH_TOKEN_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "LOGIN_RESET":
      return { userInfo: null };
    default:
      return state;
  }
};


export const registerReducer = (state = { userInfo: [] }, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
