import { Divider, Skeleton, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../smallComponents/Comments";
import { format } from "timeago.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  getCommentFromPostAction,
  LikePostAction,
} from "../../actions/postAction";

const PostRightSide = ({ post }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const autoFocusRef = useRef();

  const [likes, setLikes] = React.useState(null);
  const [liked, setLiked] = React.useState(null);
  const [description, setDescription] = React.useState();
  const [successComment, setSuccessComment] = React.useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);
  const { socket } = useSelector((state) => state.onlineUsers);

  useEffect(() => {
    setLiked(post?.data.likes.includes(userInfo?.data._id));
    setLikes(post?.data.likes.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  useEffect(() => {
    setSuccessComment(false);
    dispatch(getCommentFromPostAction(id));
  }, [successComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/comments/createComment/${id}`,
        {
          description,
        },
        config
      );
      const { data: newComment } = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/addComment/${id}`,
        {
          commentId: data,
        },
        config
      );
      setSuccessComment(true);
      setDescription("");

      await axios.post(
        `${process.env.REACT_APP_API_URL}/notifications/createNotification/${post?.data.userIdToPopulate._id}`,
        {
          senderId: userInfo?.data._id,
          type: "commentPost",
          text: "has commented to your post",
          postId: post?.data._id,
        },
        config
      );

      socket.emit("comment", {
        postId: id,
        description,
        senderId: {
          _id: userInfo?.data._id,
          name: userInfo?.data.name,
          profilePicture: userInfo?.data.profilePicture,
        },
        receiverId: post?.data.userIdToPopulate._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  //xlg:grid-rows-[min-content_min-content_min-content_40rem_min-content_min-content_min-content]
  return (
    <div
      className={`RightSide z-10 grid grid-rows-[min-content_min-content_min-content_fit-content(100%)_min-content_min-content_min-content] p-6 shadow-lg lg:grid-rows-[min-content_min-content_min-content_minmax(68rem,_20rem)_min-content_min-content_min-content]  ${
        theme === "light"
          ? "bg-[#f3f3f3] text-gray-600"
          : "bg-[#202124]  text-white"
      }   `}
    >
      <div className="mb-6 flex items-center gap-4">
        <div className="h-[5rem] w-[5rem] overflow-hidden rounded-full">
          {post?.data.userIdToPopulate.profilePicture ? (
            <img
              className="h-full w-full object-cover object-top"
              src={post?.data.userIdToPopulate.profilePicture}
              alt="profile"
            />
          ) : (
            <Stack>
              <Skeleton variant="circle" width={50} height={50} />
            </Stack>
          )}
        </div>
        <div className="flex flex-col gap-y-2">
          {post?.data.userIdToPopulate.name ? (
            <p className="text-2xl font-bold">
              {post?.data.userIdToPopulate.name}
            </p>
          ) : (
            <Skeleton variant="text" width={200} />
          )}
          {post?.data.createdAt ? (
            <p className="text-xl text-gray-500">
              {" "}
              {format(post?.data.createdAt)}
            </p>
          ) : (
            <Skeleton variant="text" width={130} />
          )}
        </div>
      </div>
      {post?.data.description ? (
        <p className="Description mb-6 text-2xl">{post?.data.description}</p>
      ) : (
        <Skeleton sx={{ mb: 1 }} variant="text" width={200} />
      )}
      <Divider sx={{ mb: 1 }} />
      <Comments />
      <form onSubmit={handleSubmit} className="mb-4 p-2">
        <input
          ref={autoFocusRef}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={`w-full rounded-full px-4 py-2 text-2xl outline-none ${
            theme === "light" ? " bg-[#f3f3f3]" : "bg-[#3A3B3C]  "
          }`}
          type="text"
          placeholder="Add a comment"
        />
      </form>
      <div className="mb-4 flex gap-8">
        {liked ? (
          <img
            onClick={() => {
              dispatch(LikePostAction(id));
              setLikes((prev) => prev - 1);
              setLiked((prev) => !prev);
            }}
            className="h-[2.7rem] w-[2.7rem] cursor-pointer"
            src="/images/like.png"
            alt="notlike"
          />
        ) : (
          <img
            onClick={() => {
              dispatch(LikePostAction(id));
              setLikes((prev) => prev + 1);
              setLiked((prev) => !prev);
            }}
            className="h-[2.7rem] w-[2.7rem] cursor-pointer"
            src="/images/notlike.png"
            alt="like"
          />
        )}
        <img
          onClick={() => autoFocusRef.current.focus()}
          className="h-[2.7rem] w-[2.7rem] cursor-pointer"
          src="/images/comment.png"
          alt="comment"
        />
        <img
          className="h-[2.7rem] w-[2.7rem] cursor-pointer"
          src="/images/share.png"
          alt="share"
        />
      </div>
      <p className="text-xl">
        <span className="font-bold">{likes} </span>
        {`${
          likes === 1 ? "person liked this post" : " people liked this post"
        }`}
      </p>
    </div>
  );
};

export default PostRightSide;
