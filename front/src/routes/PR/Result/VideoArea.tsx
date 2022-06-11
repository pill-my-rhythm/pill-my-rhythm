import React from "react";

const VideoArea = () => {
  return (
    <div className="hero min-h-screen bg-[#5ae1dc]">
      <div className="hero-overlay bg-opacity-10"></div>
      <div className="flex flex-col lg:flex-row-reverse p-2">
        <div className="p-4">
          <iframe className="w-full aspect-video rounded-lg shadow-2xl" src="https://www.youtube.com/embed/LTdLVar1FUU"></iframe>
        </div>
        <div className="content-center flex-row place-items-center">
          <h1 className="text-5xl font-bold text-white mr-6 ml-6">
            영양제, 복용하기 전에
            <br />
            정확하게 알고 먹자!
          </h1>
          <p className="py-6 break-words m-6">
            당신에게 가장 필요한 영양제는 “something” 이예요. <br />
            “something”을 섭취하기 전에 주의할 점을 영상을 통해 확인해보세요😃
          </p>
        </div>
      </div>
    </div>
  );
};
export default VideoArea;
