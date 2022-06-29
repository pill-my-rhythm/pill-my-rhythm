import React, { useEffect, useState } from "react";
import Promotion from "./Promotion";
import PRCard from "../../_shared/PRCard";
import { useLocation } from "react-router";
import Blankresult from "./Blankresult";

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
  const [pillResult, setPillResult] = useState<Array<PillData["pr"]>>(pillResultList);
  const [resultData, setResultData] = useState<Boolean>(true);

  console.log("#pillResultList", pillResultList);
  console.log("#pillResult", pillResult);

  const CheckResult = () => {
    if (pillResult.length === 0) {
      console.log("빈배열");
      setResultData(false);
    } else setResultData(true);
  };

  useEffect(() => {
    setPillResult(pillResultList);
    CheckResult();
  }, [pillResult, pillResultList, resultData]);

  return resultData ? (
    <div className="flex flex-row flex-wrap justify-center">
      {pillResult.map((pr: PillData["pr"]) => (
        <PRCard pr={pr} key={pr.pk_supplement_id} />
      ))}
      <Promotion />
    </div>
  ) : (
    <Blankresult />
  );
};
export default PRList;
