import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createChatAction } from "../../actions/chatAction";
import { followUserAction, unFollowUserAction } from "../../actions/userAction";

const EachFollowing = ({ follower }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);
  const [followed, setFollowed] = React.useState(
    follower.followers.includes(userInfo?.data._id)
  );

  const handleFollowUser = () => {
    dispatch(followUserAction(follower._id));
    setFollowed((prev) => !prev);
    if (userInfo?.data.followers.includes(follower._id)) {
      dispatch(createChatAction(userInfo?.data._id, follower._id));
    }
  };
  const handleUnFollowUser = () => {
    dispatch(unFollowUserAction(follower._id));
    setFollowed((prev) => !prev);
  };

  return (
    <div className="EachFollowerOfUser mb-2  flex items-center gap-4">
      <Link className="flex items-center gap-4" to={`/profile/${follower._id}`}>
        <div className="max-h-24 max-w-[6rem] overflow-hidden rounded-full">
          <img
            className="object-cover object-center"
            src={`${process.env.REACT_APP_IMAGE_URL}${follower.profilePicture}`}
            alt="follower"
          />
        </div>
        <div className="Name">
          <h3 className="text-2xl font-bold">{follower.name}</h3>
          <h5 className="text-xl font-light">{follower.name}</h5>
        </div>
      </Link>
      {follower._id === userInfo?.data._id ? null : (
        <button
          onClick={followed ? handleUnFollowUser : handleFollowUser}
          className="ml-auto rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 text-2xl text-white"
        >
          {followed ? "unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default EachFollowing;
