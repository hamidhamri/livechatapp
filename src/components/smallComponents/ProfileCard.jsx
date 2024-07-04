import { Box, Divider, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  getUserInfoAction,
  updateUserPicturesAction,
} from "../../actions/userAction";
import { useParams, useNavigate } from "react-router-dom";
import CropModal from "../smallComponents/CropModal";
import Modal from "@mui/material/Modal";

const ProfileCard = ({ location }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /// MODAL PROPERTIES
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [imageToDisplay, setImageToDisplay] = React.useState(null);
  const [imageToUploadProfile, setImageToUploadProfile] = React.useState(null);
  const [imageToUploadCover, setImageToUploadCover] = React.useState(null);

  const profileRef = React.useRef();
  const coverRef = React.useRef();
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/getTimeLine`,
        config
      );
      setPosts(data?.data);
    };
    fetchPosts();
  }, []);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoOther } = useSelector((state) => state.getUserInfo);
  const { theme } = useSelector((state) => state.theme);
  const { success, error } = useSelector((state) => state.updateUserPictures);
  const { success: successFollowing } = useSelector(
    (state) => state.followUser
  );
  const { success: successUnFollowing } = useSelector(
    (state) => state.unFollowUser
  );


  const { id } = useParams();

  const [profile, setProfile] = React.useState(userInfoOther?.data);

  const [profileImageLoading, setProfileImageLoading] = React.useState(false);
  const [coverImageLoading, setCoverImageLoading] = React.useState(false);

  // const [followers, setFollowers] = React.useState(
  //   userInfo?.data.followers.length
  // );
  const [followings, setFollowings] = React.useState(
    userInfo?.data.following.length
  );

  useEffect(() => {
    setProfile(userInfoOther?.data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoOther]);

  useEffect(() => {
    if (id && userInfo?.data._id === id) {
      setProfile(userInfo?.data);
    } else if (id && userInfo?.data._id !== id) {
      dispatch(getUserInfoAction(id));
    } else if (!id) {
      setProfile(userInfo?.data);
    }
  }, [id, success]);

  useEffect(() => {
    if (successUnFollowing) {
      setFollowings((prev) => prev - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successUnFollowing]);

  useEffect(() => {
    if (successFollowing) {
      setFollowings((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successFollowing]);

  const handleCoverPicture = async (e) => {
    if (e.target.files[0]) {
      setImageToDisplay(URL.createObjectURL(e.target.files[0]));
      setImageToUploadCover({
        file: e.target.files[0],
        type: "coverPic",
      });
      handleOpen();
    }
  };

  const handleProfilePicture = async (e) => {
    if (e.target.files[0]) {
      setImageToDisplay(URL.createObjectURL(e.target.files[0]));
      setImageToUploadProfile({
        file: e.target.files[0],
        type: "profilePic",
      });
      handleOpen();
    }
  };

  const sendImage = async (imageToUpload) => {
    if (imageToUpload) {
      try {
        const formData = new FormData();
        formData.append('file', imageToUpload.file);
        formData.append('upload_preset', 'c7f4fucz');

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dnnaq2dbk/image/upload`,
          formData
        );
        const data = response.data.secure_url;
        // const blob = await new Promise((resolve, reject) => {
        //   const reader = new FileReader();
        //   reader.onload = (e) => resolve(e.target.result);
        //   reader.onerror = (e) => reject(e);
        //   reader.readAsArrayBuffer(imageToUpload.file);
        // });
        // const now = Date.now() + userInfo.data._id;
        // await axios.put(
        //   `https://hamidhamrichatapp.blob.core.windows.net/chatapp/${now}.jpg?sv=2021-06-08&ss=bf&srt=o&sp=rwdactfx&se=2023-08-30T21:17:22Z&st=2022-08-30T13:17:22Z&spr=https&sig=zMcLJ%2FVsNyETLwe29lkHy9WcfrgIpHpUxJS59n1JLV8%3D`,
        //   blob,
        //   {
        //     headers: {
        //       "x-ms-blob-type": "BlockBlob",
        //       "Content-Type": "image/jpeg",
        //     },
        //   }
        // );
        // const data = `https://hamidhamrichatapp.blob.core.windows.net/chatapp/${now}.jpg`;
        if (imageToUpload.type === "coverPic") {
          dispatch(updateUserPicturesAction(undefined, data));
        } else {
          dispatch(updateUserPicturesAction(data, undefined));
        }
      } catch (err) {
        console.log(err);
      }
      setImageToUploadCover(null);
      setImageToUploadProfile(null);
      setImageToDisplay(null);
    }
  };

  if (profile?._id !== userInfo?.data._id && userInfoOther?.status !== "success") {
    return (
      <div className="max-h-80 flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">User Not Found</h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
            We're sorry, but we couldn't find the user you're looking for.
          </p>
        </div>
      </div>
    );
  }



  return (
    <div
      className={`ProfileCard z-10 overflow-hidden rounded-3xl  ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      }`}
    >
      <div className="ProfileImages relative ">
        <div
          className={`${
            location === "profile" ? "h-[25rem]" : "h-[15rem]"
          } max-w-full overflow-hidden`}
        >
          <img
            style={{
              display: coverImageLoading ? "display: none" : "display: block",
            }}
            onLoad={() => setCoverImageLoading(true)}
            onClick={() =>
              location === "profile" &&
              profile?._id === userInfo?.data._id &&
              coverRef.current.click()
            }
            name="coverPicture"
            className={`CoverPic ${
              location === "profile" && "cursor-pointer"
            } h-full w-full object-cover object-top`}
            src={profile?.coverPicture && profile?.coverPicture}
            alt="cover"
          />

          <Skeleton
            style={{
              display: coverImageLoading ? "display: block" : "display: none",
            }}
            variant="rect"
            width="100%"
            height="100%"
          />
        </div>
        <div
          className={`absolute left-[50%] h-40 w-40 -translate-x-2/4 overflow-hidden rounded-full ${
            location === "profile" ? "top-[80%]" : "top-[50%] "
          }`}
        >
          <img
            style={{
              display: profileImageLoading ? "display: none" : "display: block",
            }}
            onLoad={() => setProfileImageLoading(true)}
            onClick={() =>
              location === "profile" &&
              profile._id === userInfo?.data._id &&
              profileRef.current.click()
            }
            name="profilePicture"
            className={`ProfilePic h-full w-full object-cover object-top  ${
              location === "profile" && "cursor-pointer"
            }  shadow-md shadow-gray-500`}
            src={profile?.profilePicture && profile?.profilePicture}
            alt="profile"
          />

          <Skeleton
            style={{
              display: profileImageLoading ? "display: block" : "display: none",
            }}
            variant="circular"
            width={100}
            height={100}
          />
        </div>
        <input
          ref={profileRef}
          type="file"
          onChange={handleProfilePicture}
          hidden
        />
        <input
          ref={coverRef}
          type="file"
          onChange={handleCoverPicture}
          hidden
        />
      </div>
      <div
        className={`ProfileInfo mt-24 flex flex-col items-center gap-y-4 ${
          theme === "light" ? "" : "text-white"
        } `}
      >
        <span className="text-2xl font-semibold">{profile?.name}</span>
        <span className="text-2xl">
          {profile?.working ? profile?.working : "write about yourself"}
        </span>
      </div>
      <div className="mt-12 flex h-2 justify-center">
        <hr
          style={{
            width: "80%",
            backgroundColor: "rgb(156 163 175)",
          }}
        />
      </div>
      <div
        className={`FollowersCard flex justify-around px-4 py-6 ${
          theme === "light" ? "" : "text-white"
        }`}
      >
        <div
          onClick={() => navigate(`/profile/${profile?._id}/followers`)}
          className="Followers flex cursor-pointer flex-col gap-y-4"
        >
          <span className="text-center text-3xl font-bold ">
            {location === "profile"
              ? profile?.followers.length
              : userInfo?.data.followers.length}
          </span>
          <span className="text-2xl text-gray-400">Followers</span>
        </div>
        <Divider orientation="vertical" flexItem />
        <div
          onClick={() => navigate(`/profile/${profile?._id}/followings`)}
          className="Followings flex cursor-pointer flex-col  gap-y-4 "
        >
          <span className="text-center text-3xl font-bold">
            {" "}
            {location === "profile"
              ? profile?.following.length
              : userInfo?.data.following.length}
          </span>
          <span className="text-2xl text-gray-400">Followings</span>
        </div>
        {location === "profile" ? (
          <>
            <Divider orientation="vertical" flexItem />
            <div className="Followings flex flex-col gap-y-4">
              <span className="text-center text-3xl font-bold">
                {!posts
                  ? "0"
                  : posts?.filter((post) => post.userId === profile?._id)
                      .length}
              </span>
              <span className="text-2xl text-gray-400">Posts</span>
            </div>
          </>
        ) : null}
      </div>
      <div className="flex h-2 justify-center">
        <hr
          style={{
            width: "80%",
            height: "2px",
            backgroundColor: "rgb(156 163 175)",
          }}
        />
      </div>
      {location === "profile" ? (
        ""
      ) : (
        <Link to={`/profile/${userInfo?.data._id}`}>
          <div className="Button mt-10 cursor-pointer text-center">
            <div className="fill rounded bg-gradient-to-t from-orange-500 to-orange-400 bg-clip-text py-6 px-4 text-3xl font-bold text-orange-400">
              My Profile
            </div>
          </div>
        </Link>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          maxWidth: "500px",
          backgroundColor: "#333",
          marginY: "0",
          marginX: "auto",
        }}
      >
        <Box>
          <CropModal
            {...{
              setOpenCrop: setOpen,

              imageToDisplay: imageToDisplay,
              setImageToUpload: setImageToUploadCover
                ? setImageToUploadCover
                : setImageToUploadProfile,
              imageToUpload: imageToUploadCover
                ? imageToUploadCover
                : imageToUploadProfile,
              sendImage: sendImage,
            }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileCard;
