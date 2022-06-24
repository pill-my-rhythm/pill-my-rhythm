import React, { useState, useEffect } from "react";
import PRCard from "../PR/Result/PRCard";
import { get } from "../../Api";
import { PillData } from "../PR/Result/PRList";

const UserBookMarkList = () => {
  const [userBookMark, setUserBookMark] = useState([]);
  const [pillResult, setPillResult] = useState([]);

  const LoadBookMarkList = async () => {
    try {
      const res = await get("bookmark");
      console.log("#res", res);
      setUserBookMark(res.data);
      setPillResult(res.data);
      console.log("#userBookMark", userBookMark);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadBookMarkList();
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {pillResult.map((pr: PillData["pr"]) => (
        <PRCard pr={pr} key={pr.pk_supplement_id} />
      ))}
    </div>
  );
};
export default UserBookMarkList;
