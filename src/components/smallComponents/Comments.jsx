import { CircularProgress, Skeleton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EachComment from "./EachComment";

const Comments = () => {
  const { comments, loading } = useSelector((state) => state.comments);

  return (
    <div className="Comments h-full overflow-scroll">
      {comments &&
        comments?.data.map((comment) => (
          <EachComment key={comment?.id} comment={comment} />
        ))}
    </div>
  );
};

export default Comments;

// [...Array(12)].map((_, index) => (
{/* <Stack
  marginBottom={2}
  spacing={1}
  alignItems="center"
>
  <Skeleton variant="circular" width={40} height={40} />
  <Stack>
    <Skeleton variant="text" width={100} />
    <Skeleton variant="text" width={70} />
  </Stack>
</Stack> */}
