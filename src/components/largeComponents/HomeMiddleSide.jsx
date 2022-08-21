import React from "react";
import PostCard from "../smallComponents/PostCard";
import Posts from "../smallComponents/Posts";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import SearchComponent from "./SearchComponent";

const MiddleSide = () => {
  const { theme } = useSelector((state) => state.theme);
  const [click, setClick] = React.useState(false);

  return (
    <>
      {!click ? (
        <div
          className={`z-10 h-full  min-h-screen w-[470px] max-w-[470px]  ${
            theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
          }`}
        >
          <div className="hidden  xlg:block">
            <IconButton onClick={() => setClick(true)}>
              <SearchIcon
                sx={{
                  color: theme === "light" ? "#333" : "#f3f3f3",
                  fontSize: "2.5rem",
                }}
              />
            </IconButton>
          </div>
          <div>
            <PostCard />
            <Posts />
          </div>
        </div>
      ) : (
        <SearchComponent setClick={setClick} />
      )}
    </>
  );
};

export default MiddleSide;
