export const createChatReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CHAT_REQUEST":
      return {
        loading: true,
      };
    case "CREATE_CHAT_SUCCESS":
      return {
        loading: false,
        chat: action.payload,
      };
    case "CREATE_CHAT_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "CREATE_CHAT_RESET":
      return {};
    default:
      return state;
  }
};
