import React, { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Skeleton, Stack } from "@mui/material";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { followUserAction, unFollowUserAction } from "../../actions/userAction";

const YourInfo = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const { theme } = useSelector((state) => state.theme);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoOther } = useSelector((state) => state.getUserInfo);
  const { success, loading } = useSelector((state) => state.updateUserInfo);

  const [profile, setProfile] = React.useState(null);
  const [followed, setFollowed] = React.useState();
  const { id } = useParams();

  useEffect(() => {
    setFollowed(userInfoOther?.data?.followers.includes(userInfo?.data._id));
    if (id === userInfo?.data._id) {
      setProfile(userInfo?.data);
    } else {
      setProfile(userInfoOther?.data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, userInfoOther, id]);

  return (
    <>
      {loading || !profile ? (
        <Stack direction="column" align="center" justify="center">
          <Skeleton
            variant="rounded"
            width={300}
            height={320}
            sx={{ borderRadius: "8px" }}
          />
        </Stack>
      ) : (
        <div
          className={`rounded-xl ${
            theme === "light"
              ? "bg-[#f3f3f3] shadow-lg shadow-gray-300"
              : "bg-[#202124] text-white shadow-[0_12px_8px_-14px_rgba(0,0,0,0.3)]"
          } p-10 `}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Your Info</h2>
            {userInfo?.data._id === id && (
              <IconButton onClick={() => setOpen(true)}>
                <EditIcon
                  sx={{
                    fontSize: "2.5rem",
                    color: `${theme === "light" ? "black" : "white"}`,
                  }}
                />
              </IconButton>
            )}
          </div>
          <ProfileModal user={profile} setOpen={setOpen} open={open} />
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">Status</h3>
              <h4 className="text-2xl font-light">{profile.relationship}</h4>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">Lives in</h3>
              <h4 className="text-2xl font-light">{profile.living}</h4>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">works at</h3>
              <h4 className="text-2xl font-light">{profile.working}</h4>
            </div>
            {userInfo?.data._id !== id && (
              <button
                onClick={() => {
                  followed
                    ? dispatch(unFollowUserAction(id))
                    : dispatch(followUserAction(id));
                  setFollowed((prev) => !prev);
                }}
                className="mt-40 ml-auto rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-8 text-2xl text-white"
              >
                {followed ? "unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default YourInfo;
