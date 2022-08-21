import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EachFollowerOfUser from "./EachFollowerOfUser";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Skeleton, Stack } from "@mui/material";

const AllFollowersOfUser = () => {
  const [followers, setFollowers] = React.useState([]);
  const renderOnce = React.useRef(true);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { id } = useParams();

  useEffect(() => {
    const fetchFollowers = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data: dataUser } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getOneUser/${id}`,
        config
      );

      dataUser?.data.followers.map(async (id) => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/getOneUser/${id}`,
          config
        );
        setFollowers((prev) => [...prev, data.data]);
      });
    };
    if (renderOnce.current) {
      fetchFollowers();
    }

    return () => {
      renderOnce.current = false;
    };
  }, [id]);

  return (
    <div className="FollowersCard z-10">
      <h2 className="FollowersCardText mb-10 text-3xl font-bold">
        People who followed you
      </h2>
      <div className="AllFollowers flex max-w-[80vh] flex-col gap-y-4 overflow-scroll">
        {followers && followers.length > 0
          ? followers.map((follower) => (
              <EachFollowerOfUser key={follower._id} follower={follower} />
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton variant="circular" width={50} height={50} />
                  <Stack>
                    <Skeleton variant="text" width={100} height={16} />
                    <Skeleton variant="text" width={70} height={16} />
                  </Stack>
                </Stack>
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={30}
                  sx={{ borderRadius: "8px" }}
                />
              </Stack>
            ))}
      </div>
    </div>
  );
};

export default AllFollowersOfUser;
