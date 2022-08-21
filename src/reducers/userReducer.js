export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_INFO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_USER_INFO_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case "GET_USER_INFO_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_INFO_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_USER_INFO_SUCCESS":
      return {
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case "UPDATE_USER_INFO_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_USER_INFO_RESET":
      return {};
    default:
      return state;
  }
};

export const updateUserPicturesReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_PICTURES_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_USER_PICTURES_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATE_USER_PICTURES_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_USER_PICTURES_RESET":
      return {};
    default:
      return state;
  }
};

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return {
        loading: true,
      };
    case "GET_ALL_USERS_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };
    case "GET_ALL_USERS_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const followUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW_USER_REQUEST":
      return {
        loading: true,
      };
    case "FOLLOW_USER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "FOLLOW_USER_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const unFollowUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "UNFOLLOW_USER_REQUEST":
      return {
        loading: true,
      };
    case "UNFOLLOW_USER_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UNFOLLOW_USER_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateUserToActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_TO_ACTIVE_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_USER_TO_ACTIVE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATE_USER_TO_ACTIVE_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_USER_TO_ACTIVE_RESET":
      return {};
    default:
      return state;
  }
};

export const updateUserToUnActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER_TO_UNACTIVE_REQUEST":
      return {
        loading: true,
      };
    case "UPDATE_USER_TO_UNACTIVE_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "UPDATE_USER_TO_UNACTIVE_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "UPDATE_USER_TO_UNACTIVE_RESET":
      return {};
    default:
      return state;
  }
};

export const deleteAccountReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ACCOUNT_REQUEST":
      return {
        loading: true,
      };
    case "DELETE_ACCOUNT_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "DELETE_ACCOUNT_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "DELETE_ACCOUNT_RESET":
      return {};
    default:
      return state;
  }
};

export const onlineUsersReducer = (state = { onlineUsers: [] }, action) => {
  switch (action.type) {
    case "ONLINE_USERS":
      return {
        onlineUsers: action.payload ? action.payload : [],
        socket: action.socket ? action.socket : null,
      };

    default:
      return state;
  }
};

export const notificationReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case "NOTIFICATIONS":
      return {
        notifications: [...state.notifications, action.payload],
      };
    default:
      return state;
  }
};
