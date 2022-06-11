import React from "react";
import PRCard from "./PRCard";

const RecommendationArea = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div>
        <h2>다음에</h2>
      </div>
      <div className="flex flex-row">
        <PRCard />
        <PRCard />
        <PRCard />
        <PRCard />
        <PRCard />
      </div>
    </div>
  );
};
export default RecommendationArea;
