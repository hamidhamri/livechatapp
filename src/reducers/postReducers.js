export const addPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_POST_REQUEST":
      return {
        loading: true,
      };
    case "ADD_POST_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "ADD_POST_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    case "RESET_POST":
      return {};
    default:
      return state;
  }
};

export const getTimeLineReducer = (state = { post: [] }, action) => {
  switch (action.type) {
    case "GET_TIMELINE_REQUEST":
      return {
        loading: true,
      };
    case "GET_TIMELINE_SUCCESS":
      return {
        loading: false,
        posts: action.payload,
      };
    case "GET_TIMELINE_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const likePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "LIKE_POST_REQUEST":
      return {
        loading: true,
      };
    case "LIKE_POST_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "LIKE_POST_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getCommentFromPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_COMMENT_FROM_POST_REQUEST":
      return {
        loading: true,
      };
    case "GET_COMMENT_FROM_POST_SUCCESS":
      return {
        loading: false,
        comments: action.payload,
      };
    case "GET_COMMENT_FROM_POST_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_POST_REQUEST":
      return {
        loading: true,
      };
    case "GET_POST_SUCCESS":
      return {
        loading: false,
        post: action.payload,
      };
    case "GET_POST_FAILURE":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const sharePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "SHARE_POST":
      return {
        sharePost: action.payload ? action.payload : false,
      };

    default:
      return state;
  }
};
