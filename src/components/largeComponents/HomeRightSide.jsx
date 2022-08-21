import React from "react";
import Options from "../smallComponents/Options";
import Trends from "../smallComponents/Trends";
import ShareModal from "../smallComponents/ShareModal";

const RightSide = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="fixed right-0 top-0 z-10 mr-8 min-w-[400px] max-w-[350px] p-4 1400:min-w-[300px] xl:hidden">
      <Options />
      <Trends />
      <button
        onClick={() => setOpen(true)}
        className="ml-auto w-full rounded-md bg-gradient-to-t from-orange-500 to-orange-400 py-2 px-4 text-2xl text-white"
      >
        Share
      </button>
      <ShareModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default RightSide;
