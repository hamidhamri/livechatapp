import React, { useEffect } from "react";
import PostRightSide from "../components/largeComponents/PostRightSide";
import PostLeftSide from "../components/largeComponents/PostLeftSide";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommentFromPostAction, getPostAction } from "../actions/postAction";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    if (!userInfo?.data) {
      navigate("/login");
    }
  }, [userInfo?.data, dispatch, navigate]);

  useEffect(() => {
    dispatch(getPostAction(id));
    dispatch(getCommentFromPostAction(id));
  }, [id, dispatch]);

  return (
    <>
      <div
        className={`z-10 h-screen rounded-lg ${
          theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
        }`}
      >
        <div className="grid h-screen grid-cols-[1fr,_40rem] grid-rows-[100%] lg:grid-cols-1 lg:grid-rows-[60%]">
          <PostLeftSide post={post} />
          <PostRightSide post={post} />
        </div>
      </div>
    </>
  );
};

export default Post;
