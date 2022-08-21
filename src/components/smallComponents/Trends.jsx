import React from "react";
import { useSelector } from "react-redux";
import { TrendData } from "../../Data/TrendData";

const Trends = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`mb-10 rounded-2xl  ${
        theme === "light"
          ? "bg-[#f3f3f3] shadow-md shadow-gray-400"
          : "bg-[#202124] text-white shadow-[0_12px_8px_-14px_rgba(0,0,0,0.3)] "
      } p-16 `}
    >
      <h2 className="mb-6 text-3xl font-bold tracking-wider">Trends for you</h2>
      <div className="AllTrends">
        {TrendData.map((trend, index) => (
          <div
            key={trend + index}
            className="eachTrend mb-4 flex flex-col justify-center gap-y-4"
          >
            <span className="text-2xl font-bold">#{trend.name}</span>
            <span className="text-xl font-light text-gray-500 ">
              {trend.shares}K shares
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;
