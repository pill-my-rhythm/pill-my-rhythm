import React, { useState, useEffect } from "react";
import PRCard from "../_shared/PRCard";
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
    } catch (error) {
      console.log(error);
    }
  };

  // console.log("#pillResult", pillResult);
  // console.log("#userBookMark", userBookMark);

  useEffect(() => {
    LoadBookMarkList();
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-br from-[#7FDCDC] to-[#E3F2ED] flex py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">My Bookmarks List</h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">당신이 북마크한 영양제 리스트를 확인해보세요!</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {pillResult.map((pr: any) => (
            <PRCard pr={pr.Supplement} key={pr.fk_supplement_id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserBookMarkList;
