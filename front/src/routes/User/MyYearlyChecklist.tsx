import React from "react";
import YearlyChecklist from "../Schedule/YearlyChecklist";

const MyYearlyChecklist = () => {
  return (
    <div className="min-h-full bg-gradient-to-br from-[#7FDCDC] to-[#E3F2ED] flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-[68.75rem] space-y-8">
        <div>
          <h2 className="mt-6 mb-3 text-3xl font-extrabold text-gray-900">My Rhythm CheckList</h2>
          <hr />
          <p className="m-3 text-sm text-gray-600">나는 올해 얼마나 건강한 생활 습관을 지켰을까? 확인해보세요!</p>
        </div>
        <div className="invisible md:visible flex flex-row flex-wrap justify-center">
          <YearlyChecklist />
          <span className="visible md:invisible text-2xl font-bold text-zinc-700">PC에서만 확인하실 수 있어요😂</span>
        </div>
      </div>
    </div>
  );
};

export default MyYearlyChecklist;
