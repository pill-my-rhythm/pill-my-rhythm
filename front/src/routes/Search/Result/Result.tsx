import React from "react";
import VideoArea from "./VideoArea";
import RecommendationArea from "./RecommendationArea";

const Result = () => {
  return (
    <div className="overflow-scroll:hidden pb-20 bg-base-200">
      <VideoArea />
      <RecommendationArea />
    </div>
  );
};
export default Result;
