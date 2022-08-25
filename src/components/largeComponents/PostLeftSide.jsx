import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostLeftSide = ({ post }) => {
  const navigate = useNavigate();

  const [imageLoaded, setImageLoaded] = React.useState(false);

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <div
        className={`LeftSide relative  ${
          theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
        } `}
      >
        {post?.data.image ? (
          <div
            style={{ display: `${imageLoaded ? "block" : "none"}` }}
            className="Image mx-auto h-full  max-w-[92rem]"
          >
            <img
              onLoad={() => setImageLoaded(true)}
              className=" h-full w-full object-contain"
              src={post?.data.image}
              alt="profile"
            />
          </div>
        ) : (
          <Stack>
            <Skeleton variant="rect" width="100%" height="100%" />
          </Stack>
        )}
        <IconButton
          onClick={() => navigate("/")}
          style={{ position: "absolute", top: "0", left: "0" }}
        >
          <ClearIcon sx={{ fontSize: "3rem", color: "black" }} />
        </IconButton>
      </div>
    </>
  );
};

export default PostLeftSide;
