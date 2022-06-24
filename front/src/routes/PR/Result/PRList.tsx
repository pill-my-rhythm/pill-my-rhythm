import React, { useState } from "react";
import PRCard from "./PRCard";
import { useLocation } from "react-router";

export interface PillData {
  pr: {
    caution: string;
    company: string;
    function: string;
    how_to_eat: string;
    img_link: string;
    link: string;
    name: string;
    pk_supplement_id: number;
    raw: string;
    shape: string;
    update_date: number;
  };
}

const PRList = () => {
  const { state }: any = useLocation();
  const pillResultList = state.results;
  const [pillResult, setPillResult] = useState(pillResultList);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {pillResult.map((pr: PillData["pr"]) => (
        <PRCard pr={pr} key={pr.pk_supplement_id} />
      ))}
    </div>
  );
};
export default PRList;
