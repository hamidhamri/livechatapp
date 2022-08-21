import { Skeleton, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const EachComment = ({ comment }) => {
  const scrollComment = useRef();
  const { theme } = useSelector((state) => state.theme);
  const [imageloaded, setimageloaded] = React.useState(false);

  useEffect(() => {
    scrollComment?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {comment?.userId && (
        <>
          <Stack style={{ display: `${!imageloaded ? "block" : "none"}` }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Stack>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={70} />
            </Stack>
          </Stack>
          <div
            style={{ display: imageloaded ? "block" : "none" }}
            ref={scrollComment}
            className="eachComment mb-4 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-[4rem] w-[4rem] overflow-hidden rounded-full">
                <img
                  onLoad={() => setimageloaded(true)}
                  className="h-full w-full object-cover object-top"
                  src={`${process.env.REACT_APP_IMAGE_URL}${comment?.userId?.profilePicture}`}
                  alt="profile"
                />
              </div>
              <div
                className={`flex flex-col justify-between overflow-hidden rounded-3xl px-4 py-2 ${
                  theme === "light" ? " bg-[#dbd2d2]" : "bg-[#3A3B3C]"
                } `}
              >
                <p className="text-xl font-bold">{comment?.userId?.name}</p>
                <p className="max-w-[25rem] break-words text-xl">
                  {comment?.description}
                </p>
              </div>
              <p className="text-lg text-gray-500">
                {format(comment?.createdAt)}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EachComment;
