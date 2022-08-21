import React, { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const SearchComponent = ({ setClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init();
    window.document.body.style.zoom = 1;
  }, []);

  const [searchResults, setSearchResults] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const { theme } = useSelector((state) => state.theme);
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleOnSearch = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/users/getUsersFilter?filter=${search}`,
      config
    );
    setSearchResults(data);
  };

  useEffect(() => {
    let timer;
    if (search) {
      timer = setTimeout(() => {
        handleOnSearch();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div
      data-aos="fade-right"
      className={`flex h-full w-full flex-col ${
        theme === "light" ? "bg-[#f3f3f3]" : "bg-[#202124]"
      } `}
    >
      <div className="mb-4 flex gap-4">
        <div>
          <IconButton onClick={() => setClick(false)}>
            <KeyboardBackspaceIcon
              sx={{
                color: theme === "light" ? "#333" : "#f3f3f3",
                fontSize: "2.5rem",
              }}
            />
          </IconButton>
        </div>
        <form className="basis-full" onSubmit={handleOnSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            id="myTextArea"
            className={`w-full rounded-full p-4 text-[16px] outline-none ${
              theme === "light"
                ? "bg-[#f3f3f3] text-gray-600"
                : "bg-[#3A3B3C] text-white"
            } `}
            type="text"
            placeholder="Search for a user"
          />
        </form>
      </div>
      <div className="basis-full overflow-scroll">
        {searchResults &&
          searchResults.map((result) => (
            <div
              onClick={() => {
                setSearch("");
                navigate(`/profile/${result._id}`);
              }}
              className={`eachFollower mb-4  flex cursor-pointer items-center gap-4 p-2 px-4 transition-all hover:bg-[#b1abab50] ${
                theme === "light" ? " text-gray-600" : " text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="f-20 h-20 max-h-20 max-w-[5rem] overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={`${process.env.REACT_APP_IMAGE_URL}${result?.profilePicture}`}
                    alt="follower"
                  />
                </div>
                <div className="Name">
                  <h3 className="text-2xl font-bold">{result?.name}</h3>
                  <h5 className="text-xl font-light">{result?.name}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
