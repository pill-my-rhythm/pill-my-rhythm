import React, { useState, useEffect } from "react";
import { get } from "../../Api";
import AnalysisCard from "../_shared/AnalysisCard";

export interface AnalysisData {
  pk_analysis_id: number;
  keyword: number;
  gender: string;
  age: string;
  name: string;
  link: string;
  img_link: string;
}

const UserRecommendPage = () => {
  const [pillResult, setPillResult] = useState<Array<AnalysisData>>([]);
  const [user, setUser] = useState([]);

  const loadAnalysisData = async () => {
    try {
      const res = await get("user/analysis-supplement");
      setPillResult(res.data);
      setUser(res.data);
      console.log("pillResult", pillResult);
      console.log("#user", user);
    } catch (error) {
      console.log(error);
    }
  };

  const translateGender = (e: any) => {
    if (e === "f") return "여성";
    else if (e === "m") return "남성";
    else return "";
  };

  useEffect(() => {
    loadAnalysisData();
    console.log("@user", user);
  }, []);

  return (
    <div className="min-h-full bg-gradient-to-tr from-[#7FDCDC] to-[#E3F2ED] flex py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">
            {/* {user?.age}대, {translateGender(user?.gender)}에게는 주로 이런 영양제를 추천합니다. */}
            당신에게는 주로 이런 영양제를 추천합니다.
          </h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">내 또래, 내 성별이 자주 찾은 영양제를 알아보세요.</p>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          {pillResult.map((pr: any) => (
            <AnalysisCard pr={pr} key={pr.pk_analysis_id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserRecommendPage;
