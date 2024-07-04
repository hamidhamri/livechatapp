import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, Menu } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const inputRef = React.useRef();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const open = Boolean(anchorEl);

  const { userInfo } = useSelector((state) => state.userLogin);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    inputRef.current.focus();
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSearch("");
  };

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
    <form className="flex items-center gap-x-4">
      <a href={`/`}>
        <img src="/images/logo.png" alt="logo" />
      </a>
      <div className="SearchInput basis-auto">
        <input
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
          onMouseDown={(e) => {
            handleClick(e);
          }}
          placeholder="#Explore"
          type="text"
          className="Input w-full py-4 px-2 text-2xl outline-none"
        />
      </div>
      <div className="SearchButton basis-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-400">
        <IconButton onClick={handleOnSearch} size="medium">
          <SearchIcon sx={{ fontSize: "2.5rem", color: "white" }} />
        </IconButton>
      </div>
      <Menu
        disableEnforceFocus
        disableRestoreFocus
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            maxHeight: "250px",
            maxWidth: "250px",
            width: "250px",
          },
        }}
      >
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <div
              key={result + index}
              className="eachFollower mb-2  flex cursor-pointer items-center gap-4 p-2 px-4 transition-all hover:bg-[#b1abab50]"
            >
              <Link
                onClick={() => {
                  setSearch("");
                  handleClose();
                }}
                className="flex items-center gap-4"
                to={`/profile/${result?._id}`}
              >
                <div className="f-20 h-20 max-h-20 max-w-[5rem] overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={result?.profilePicture}
                    alt="follower"
                  />
                </div>
                <div className="Name">
                  <h3 className="text-2xl font-bold">{result?.name}</h3>
                  <h5 className="text-xl font-light">{result?.name}</h5>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center">No Result</div>
        )}
      </Menu>
    </form>
  );
};

export default SearchBar;
