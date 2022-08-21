import React from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Alert, IconButton, Skeleton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CropIcon from "@mui/icons-material/Crop";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPostAction } from "../../actions/postAction";
import CropModal from "./CropModal";

const PostCard = () => {
  const postCardRef = React.useRef();
  const dispatch = useDispatch();

  const [openCrop, setOpenCrop] = React.useState(false);
  const [trackOfImage, setTrackOfImage] = React.useState(null);
  const [imageToDisplay, setImageToDisplay] = React.useState(null);
  const [imageToUpload, setImageToUpload] = React.useState(null);

  const [errorLoadingProfilePicture, setErrorLoadingProfilePicture] =
    React.useState(false);

  const [description, setDescription] = React.useState("");
  const [dimensions, setDimensions] = React.useState({});

  const [errorAddPost, setErrorAddPost] = React.useState(null);
  const [errorImageUpload, setErrorImageUpload] = React.useState(false);

  const { error, loading } = useSelector((state) => state.addPost);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { theme } = useSelector((state) => state.theme);

  // console.log(imageToDisplay, imageToUpload, openCrop);

  const handleImageChange = (e) => {
    if (e.target?.files[0]) {
      setTrackOfImage(e.target.files[0]);
      setOpenCrop(true);
      let img = e.target.files[0];
      img = URL.createObjectURL(img);
      const image = new Image();
      image.src = img;
      image.onload = () => {
        setDimensions({
          width: image.width,
          height: image.height,
        });
      };
      setImageToDisplay(img);
      setImageToUpload(e.target.files[0]);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    if (!imageToUpload || !description) {
      setErrorAddPost("Both Image and Description are required");
    }
    if (imageToUpload && description && dimensions) {
      const newPost = new FormData();
      newPost.append("postImage", imageToUpload);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/images/upload`,
          newPost
        );
        dispatch(addPostAction(description, data, dimensions));
        setErrorImageUpload(false);
        setErrorAddPost(null);
        setDescription("");
        setImageToDisplay(null);
        setImageToUpload(null);
      } catch (err) {
        setErrorImageUpload(err.message);
      }
    }
  };

  console.log(imageToDisplay);

  return (
    <div
      className={`PostCard shadow- z-10 mb-10 flex flex-col overflow-hidden rounded-lg p-2 ${
        theme === "light"
          ? "bg-[#f3f3f3] shadow-lg shadow-gray-300"
          : "bg-[#202124] shadow-[0_12px_8px_-15px_rgba(0,0,0,0.3)]"
      } `}
    >
      <div className="mb-6 flex gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full">
          {!errorLoadingProfilePicture ? (
            <img
              onError={() => setErrorLoadingProfilePicture(true)}
              className="h-full w-full object-cover object-top"
              src={`${process.env.REACT_APP_IMAGE_URL}${userInfo?.data.profilePicture}`}
              alt="profile"
            />
          ) : (
            <Skeleton variant="circular" width="100%" height="100%" />
          )}
        </div>
        <input
          id="myTextArea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`basis-full rounded-full  px-6 text-[16px] outline-none sm:break-words ${
            theme === "light"
              ? " bg-gray-300 text-gray-600"
              : " bg-[#3A3B3C] text-white"
          }`}
          type="text"
          placeholder="What's happening?"
        />
      </div>
      <div className="mb-4 flex gap-8 sm:flex-col sm:gap-0">
        <div className="flex items-center">
          <IconButton onClick={() => postCardRef.current.click()}>
            <AddPhotoAlternateIcon
              sx={{ fontSize: "3rem", color: "#4cb256" }}
            />
          </IconButton>
          <input
            onChange={handleImageChange}
            ref={postCardRef}
            hidden
            type="file"
          />
          <span className="text-2xl text-[#4cb256]">Photo</span>
        </div>
        <div className="flex items-center">
          <IconButton>
            <VideoLibraryIcon sx={{ fontSize: "3rem", color: "#4a4eb7" }} />
          </IconButton>
          <span className="text-2xl text-[#4a4eb7]">Video</span>
        </div>
        <div className="flex items-center">
          <IconButton>
            <LocationOnIcon sx={{ fontSize: "3rem", color: "#ef5757" }} />
          </IconButton>
          <span className="text-2xl text-[#ef5757]">Location</span>
        </div>
        <button
          disabled={loading}
          onClick={handleShare}
          className="disabledButton ml-auto mb-4 self-center rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-3 px-6 text-2xl text-white sm:ml-0 sm:self-stretch"
        >
          Share
        </button>
      </div>
      {error && (
        <Alert sx={{ fontSize: "2rem" }} severity="error">
          {error}
        </Alert>
      )}
      {errorImageUpload && <Alert severity="error">{errorImageUpload}</Alert>}
      {errorAddPost && (
        <Alert sx={{ fontSize: "1.5rem" }} severity="error">
          {errorAddPost}
        </Alert>
      )}
      {openCrop && (
        <CropModal
          {...{
            setDimensions,
            dimensions,
            setOpenCrop,
            imageToDisplay,
            setImageToDisplay,
            setImageToUpload,
          }}
        />
      )}
      {imageToDisplay && !openCrop && (
        <div className="relative max-h-[587.5px] w-full max-w-full  overflow-hidden bg-red-500 ">
          <img
            className="max-h-[587.5px] w-full object-contain object-center"
            src={imageToDisplay && imageToDisplay}
            alt="post"
          />
          <IconButton
            onClick={() => {
              setImageToDisplay(null);
              setImageToUpload(null);
            }}
            size="large"
            sx={{ position: "absolute", top: "0", right: "0" }}
          >
            <ClearIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <IconButton
            onClick={() => {
              setImageToDisplay(URL.createObjectURL(trackOfImage));
              setImageToUpload(trackOfImage);
              setOpenCrop(true);
            }}
            size="large"
            sx={{ position: "absolute", top: "0", left: "0" }}
          >
            <CropIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default PostCard;
