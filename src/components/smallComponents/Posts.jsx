import { Alert, CircularProgress, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { toast } from "react-toastify";
import { notificationsAction } from "../../actions/userAction";

const toastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Posts = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  let [allPosts, setAllPosts] = React.useState([]);
  const [hasMore, setHasMore] = React.useState(true);
  const [page, setPage] = React.useState(0);

  const { socket } = useSelector((state) => state.onlineUsers);
  const [loading, setLoading] = React.useState(true);
  const { success } = useSelector((state) => state.addPost);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success: successUpdatePicture } = useSelector(
    (state) => state.updateUserPictures
  );

  const fetchMoreData = async () => {
    setPage(page + 1);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts/getTimeLine?limit=5&page=${
        page + 1
      }`,
      config
    );
    setLoading(false);
    if (data.data.length > 0) {
      setAllPosts([...allPosts, ...data.data]);
    } else {
      setHasMore(false);
      setPage(1);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, [id]);

  useEffect(() => {
    if (success || successUpdatePicture) {
      dispatch({ type: "RESET_POST" });
      dispatch({ type: "UPDATE_USER_PICTURES_RESET" });
      if (success) {
        window.location.href = "http://192.168.1.254:3000";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, allPosts, successUpdatePicture]);

  if (allPosts && id === userInfo?.data._id) {
    allPosts = allPosts.filter((post) => post.userId === userInfo?.data._id);
  }

  if (allPosts && id && id !== userInfo?.data._id) {
    allPosts = allPosts.filter((post) => post.userId === id);
  }

  useEffect(() => {
    if (socket) {
      socket.on("likeReceive", (data) => {
        console.log(data);
        toast.info(`${data.senderId.name} liked your post`, toastOptions);
        dispatch(notificationsAction(data));
      });
    }
    return () => socket && socket.off("likeReceive");
  }, [socket]);

  return (
    <div className="sm:max-w-[100%] sm:overflow-visible">
      {/* {error && <Alert severity="error">{error}</Alert>} */}
      {loading &&
        allPosts.length === 0 &&
        [...Array(2)].map((el, index) => (
          <Stack key={index + 2} sx={{ mb: 4 }} direction="column">
            <Stack
              direction={"row"}
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <Skeleton variant="circular" width={50} height={50} />
              <Skeleton variant="text" width={100} height={23} />
            </Stack>
            <Skeleton variant="rounded" width="100%" height={400} />
          </Stack>
        ))}
      <InfiniteScroll
        dataLength={allPosts?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        }
      >
        {!loading &&
          allPosts &&
          allPosts.length > 0 &&
          allPosts.map((post, index) => {
            if (post) {
              return <Post key={index + post} post={post} />;
            }
          })}
      </InfiniteScroll>
    </div>
  );
};

export default Posts;
