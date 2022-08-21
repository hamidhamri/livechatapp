import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Tes = () => {
  const [page, setPage] = React.useState(0);
  const hamidRef = React.useRef("Techus");

  useEffect(() => {
    hamidRef.current = "Lhamruss";
  }, []);

  return (
    <div id="scrollableDiv" className="z-50 h-[50rem] overflow-scroll bg-[red]">
      <input
        type="text"
        value={page}
        onChange={(e) => setPage(e.target.value)}
      />
    </div>
  );
};

export default Tes;
