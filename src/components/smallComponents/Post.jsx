import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LikePostAction, sharePostAction } from "../../actions/postAction";
import { format } from "timeago.js";
import { useLocation } from "react-router-dom";
import { Skeleton } from "@mui/material";
import axios from "axios";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [likes, setLikes] = React.useState(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { socket } = useSelector((state) => state.onlineUsers);
  const { theme } = useSelector((state) => state.theme);
  const [liked, setLiked] = React.useState(null);

  useEffect(() => {
    setLiked(post.likes.includes(userInfo?.data._id));
    setLikes(post.likes.length);
  }, [location.pathname]);

  const sendLikeNotificationToAccount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/notifications/createNotification/${post?.userIdToPopulate._id}`,
        {
          senderId: userInfo?.data._id,
          type: "likePost",
          text: "liked your post",
          postId: post?._id,
          like: true,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`eachPost mb-10 rounded-3xl ${
        theme === "light"
          ? "bg-[#f3f3f3] shadow-xl shadow-gray-300"
          : "bg-[#202124] text-white shadow-[0_15px_10px_-14px_rgba(0,0,0,0.3)]"
      } `}
    >
      <Link to={`/profile/${post.userId}`}>
        <div className="flex items-center gap-4 pb-3">
          <div className="h-[4rem] w-[4rem] overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover object-top"
              src={post?.userIdToPopulate?.profilePicture}
              alt="img1"
            />
          </div>
          <span className="text-xl font-semibold">
            {post?.userIdToPopulate?.name}
          </span>
        </div>
      </Link>
      <div className="relative max-h-[587.5px] overflow-hidden ">
        <div
          style={{
            background: `${theme === "light" ? "#202124" : "#f3f3f3"}`,
            paddingBottom: `${
              (post.dimensions.width / post.dimensions.height) * 100
            }%`,
          }}
        >
          <img
            style={{ display: `${imageLoaded ? "block" : "none"}` }}
            onLoad={() => setImageLoaded(true)}
            className="absolute top-0 left-0  w-full object-contain object-center"
            src={post.image}
            alt="img2"
          />
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100%"}
            animation="wave"
            sx={{ display: `${!imageLoaded ? "block" : "none"}` }}
          />
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-6 py-4">
          {liked ? (
            <img
              onClick={() => {
                dispatch(LikePostAction(post._id));
                setLikes((prev) => prev - 1);
                setLiked((prev) => !prev);
              }}
              className="max-h-full cursor-pointer"
              src="/images/like.png"
              alt="like"
            />
          ) : (
            <img
              onClick={() => {
                dispatch(LikePostAction(post._id));
                setLikes((prev) => prev + 1);
                setLiked((prev) => !prev);
                sendLikeNotificationToAccount();
                socket.emit("like", {
                  postId: post._id,
                  senderId: {
                    name: userInfo?.data.name,
                    profilePicture: userInfo?.data.profilePicture,
                    _id: userInfo?.data._id,
                  },
                  receiverId: post?.userIdToPopulate?._id,
                });
              }}
              className="max-h-full cursor-pointer"
              src="/images/notlike.png"
              alt="notlike"
            />
          )}
          <Link to={`/post/${post._id}`}>
            <img
              className="max-h-full"
              src="/images/comment.png"
              alt="comment"
            />
          </Link>
          <img
            onClick={() => dispatch(sharePostAction(post._id))}
            className="max-h-full cursor-pointer"
            src="/images/share.png"
            alt="share"
          />
        </div>
        <p className="py-4 text-lg font-semibold text-gray-400">
          {likes} Likes
        </p>
        <div className="mb-2 flex gap-2">
          <span className="text-xl font-bold">
            {post?.userIdToPopulate?.name}
          </span>
          <p className="text-xl">{post.description}</p>
        </div>
        {post.comments.length === 0 ? null : (
          <Link to={`/post/${post._id}`}>
            <div>
              <p className="mb-2 text-2xl font-light text-gray-400">{`See all ${post.comments.length} comments`}</p>
            </div>
          </Link>
        )}
        <div>
          <p className="text-lg tracking-wider text-gray-400">
            {format(post.createdAt).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
