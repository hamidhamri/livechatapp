import React, { useEffect } from "react";
import axios from "axios";
import { Skeleton, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const EachContact = ({ chat, currentUser, token, onlineUserHandler }) => {
  const [user, setUser] = React.useState(null);

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const userId = chat.members.find((user) => user !== currentUser);
    const fetchUser = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getOneUser/${userId}`,
        config
      );
      setUser(data);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      {user ? (
        <div
          className={`eachChat relative mb-2 flex cursor-pointer items-center gap-4 rounded-lg p-4 hover:bg-[#cac7c7a4] ${
            theme === "light" ? "" : " text-white"
          }`}
        >
          <div className="image h-20 w-20 overflow-hidden rounded-full">
            <img
              className="h-full w-full object-cover object-top"
              src={user?.data.profilePicture}
              alt="chat"
            />
          </div>
          {onlineUserHandler(user?.data._id) && (
            <div className="absolute top-[4.2rem] left-[4.5rem] flex items-center justify-center rounded-full bg-[#333333c9] p-[0.2rem]">
              <div className="rounded-full bg-[#00f349] p-3"></div>
            </div>
          )}
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">{user?.data.name}</h3>
            <h3
              className={`text-2xl font-light ${
                onlineUserHandler(user?.data._id)
                  ? "text-green-500 "
                  : "text-gray-600"
              } `}
            >
              {onlineUserHandler(user?.data._id) ? "Online" : "Offline"}
            </h3>
          </div>
        </div>
      ) : (
        <Stack direction={"row"} spacing={1} alignItems="center">
          <Skeleton variant="circular" width={50} height={50} />
          <Stack>
            <Skeleton variant="text" width={100} height={16} />
            <Skeleton variant="text" width={70} height={16} />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default EachContact;
