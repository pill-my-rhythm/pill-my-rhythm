import React, { useState } from "react";
import MockupData from "./MockupData";
import PRCard from "./PRCard";

export interface PillData {
  pr: {
    id: number;
    name: string;
    caution: string;
    company: string;
    functuion: string;
    how_to_eat: string;
    raw?: string;
    img: string;
    shop: string;
  };
}

const PRList = () => {
  const [pillResult, setPillResult] = useState(MockupData);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {pillResult.map((pr) => (
        <PRCard pr={pr} key={pr.id} />
      ))}
    </div>
  );
};
export default PRList;
