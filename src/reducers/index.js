import { combineReducers } from "redux";
import { loginReducer, registerReducer } from "./AuthReducer";
import { createChatReducer } from "./chatReducer";
import {
  makeAllNotificationReadReducer,
  messageNotificationReducer,
  updateNotificationsReducer,
} from "./notificationsReducer";
import {
  addPostReducer,
  getCommentFromPostReducer,
  getPostReducer,
  getTimeLineReducer,
  likePostReducer,
  sharePostReducer,
} from "./postReducers";
import { themeReducer } from "./themeReducer";
import {
  followUserReducer,
  getAllUsersReducer,
  getUserReducer,
  notificationReducer,
  onlineUsersReducer,
  unFollowUserReducer,
  updateUserInfoReducer,
  updateUserPicturesReducer,
  updateUserToActiveReducer,
  updateUserToUnActiveReducer,
} from "./userReducer";

export default combineReducers({
  userLogin: loginReducer,
  userRegister: registerReducer,
  addPost: addPostReducer,
  TimeLinePosts: getTimeLineReducer,
  likePost: likePostReducer,
  getUserInfo: getUserReducer,
  getAllUsers: getAllUsersReducer,
  updateUserInfo: updateUserInfoReducer,
  updateUserPictures: updateUserPicturesReducer,
  followUser: followUserReducer,
  unFollowUser: unFollowUserReducer,
  comments: getCommentFromPostReducer,
  post: getPostReducer,
  chat: createChatReducer,
  updateUserToActive: updateUserToActiveReducer,
  updateUserToUnActive: updateUserToUnActiveReducer,
  theme: themeReducer,
  sharePost: sharePostReducer,
  onlineUsers: onlineUsersReducer,
  notifications: notificationReducer,
  updateNotification: updateNotificationsReducer,
  makeAllNotificationRead: makeAllNotificationReadReducer,
  messageNotification: messageNotificationReducer,
});
