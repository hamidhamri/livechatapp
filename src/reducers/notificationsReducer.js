export const updateNotificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_NOTIFICATIONS_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_NOTIFICATIONS_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATE_NOTIFICATIONS_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_NOTIFICATIONS_RESET":
      return {};
    default:
      return state;
  }
};

export const makeAllNotificationReadReducer = (state = {}, action) => {
  switch (action.type) {
    case "MAKE_ALL_NOTIFICATIONS_READ_REQUEST":
      return {
        loading: true,
      };
    case "MAKE_ALL_NOTIFICATIONS_READ_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "MAKE_ALL_NOTIFICATIONS_READ_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "MAKE_ALL_NOTIFICATIONS_READ_RESET":
      return {};
    default:
      return state;
  }
};

export const messageNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "MESSAGE_NOTIFICATION":
      return {
        messageNotification: action.payload ? action.payload : false,
      };
    default:
      return state;
  }
};
